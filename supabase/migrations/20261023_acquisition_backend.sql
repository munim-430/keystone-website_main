-- Keystone Overseas acquisition backend
-- Public website writes go through the ingest-lead Edge Function using the service role.
-- Browser users are not granted direct INSERT access to lead tables.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  dedupe_key text not null unique,
  name text,
  phone text,
  phone_normalized text,
  email text,
  lead_type text not null default 'general' check (lead_type in ('student','manpower','visa_score','general','partnership')),
  status text not null default 'new' check (status in ('new','contacted','qualified','application','closed','spam')),
  source text not null default 'website',
  source_path text,
  country_interest text,
  language text not null default 'en',
  consent boolean not null default false,
  consent_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.visa_score_profiles (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  study_gap text not null,
  english_status text not null,
  budget_band text not null,
  score smallint not null check (score between 0 and 100),
  score_band text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  inquiry_type text not null default 'general',
  preferred_destination text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.lead_events (
  id bigserial primary key,
  lead_id uuid references public.leads(id) on delete set null,
  session_id text,
  event_name text not null,
  path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.staff_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'staff' check (role in ('staff','manager','admin')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists leads_status_idx on public.leads(status, created_at desc);
create index if not exists leads_phone_idx on public.leads(phone_normalized);
create index if not exists leads_email_idx on public.leads(lower(email));
create index if not exists leads_source_idx on public.leads(source, created_at desc);
create index if not exists visa_score_profiles_lead_idx on public.visa_score_profiles(lead_id, created_at desc);
create index if not exists contact_inquiries_lead_idx on public.contact_inquiries(lead_id, created_at desc);
create index if not exists lead_events_lead_idx on public.lead_events(lead_id, created_at desc);
create index if not exists lead_events_name_idx on public.lead_events(event_name, created_at desc);

create or replace function public.keystone_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.keystone_set_updated_at() from public, anon, authenticated;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.keystone_set_updated_at();

alter table public.leads enable row level security;
alter table public.visa_score_profiles enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.lead_events enable row level security;
alter table public.staff_members enable row level security;

-- Explicit Data API grants. This is intentional because automatic exposure is being phased out.
revoke all on public.leads from anon, authenticated;
revoke all on public.visa_score_profiles from anon, authenticated;
revoke all on public.contact_inquiries from anon, authenticated;
revoke all on public.lead_events from anon, authenticated;
revoke all on public.staff_members from anon, authenticated;

-- Edge Functions use service_role. Staff read/update through authenticated RLS.
grant select, insert, update, delete on public.leads to service_role;
grant select, insert, update, delete on public.visa_score_profiles to service_role;
grant select, insert, update, delete on public.contact_inquiries to service_role;
grant select, insert, update, delete on public.lead_events to service_role;
grant select, insert, update, delete on public.staff_members to service_role;
grant usage, select on sequence public.lead_events_id_seq to service_role;

grant select, update on public.leads to authenticated;
grant select on public.visa_score_profiles to authenticated;
grant select on public.contact_inquiries to authenticated;
grant select on public.lead_events to authenticated;
grant select on public.staff_members to authenticated;

create policy "staff can read own staff record"
on public.staff_members
for select
to authenticated
using ((select auth.uid()) = user_id and active = true);

create policy "staff can read leads"
on public.leads
for select
to authenticated
using (
  exists (
    select 1 from public.staff_members sm
    where sm.user_id = (select auth.uid()) and sm.active = true
  )
);

create policy "staff can update leads"
on public.leads
for update
to authenticated
using (
  exists (
    select 1 from public.staff_members sm
    where sm.user_id = (select auth.uid()) and sm.active = true
  )
)
with check (
  exists (
    select 1 from public.staff_members sm
    where sm.user_id = (select auth.uid()) and sm.active = true
  )
);

create policy "staff can read visa scores"
on public.visa_score_profiles
for select
to authenticated
using (
  exists (
    select 1 from public.staff_members sm
    where sm.user_id = (select auth.uid()) and sm.active = true
  )
);

create policy "staff can read contact inquiries"
on public.contact_inquiries
for select
to authenticated
using (
  exists (
    select 1 from public.staff_members sm
    where sm.user_id = (select auth.uid()) and sm.active = true
  )
);

create policy "staff can read lead events"
on public.lead_events
for select
to authenticated
using (
  exists (
    select 1 from public.staff_members sm
    where sm.user_id = (select auth.uid()) and sm.active = true
  )
);

-- Public brochure bucket. Public means downloads are public; uploads remain restricted.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('company-assets', 'company-assets', true, 20971520, array['application/pdf'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- Do not grant public uploads to company-assets. Upload the brochure using a trusted client/service role.
