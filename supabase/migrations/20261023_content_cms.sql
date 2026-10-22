-- Keystone Overseas lightweight website CMS
-- Apply after 20261023_acquisition_backend.sql.
-- Public visitors may read published content only. Staff writes require an authenticated staff_members record.

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  content_key text not null,
  locale text not null default 'en',
  content_type text not null default 'page',
  route text,
  title text,
  data jsonb not null default '{}'::jsonb,
  seo jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  sort_order integer not null default 0,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (content_key, locale)
);

create index if not exists site_content_route_idx
  on public.site_content(route, locale)
  where published = true;
create index if not exists site_content_type_idx
  on public.site_content(content_type, locale, sort_order);

create or replace function public.keystone_content_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.keystone_content_set_updated_at() from public, anon, authenticated;

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at
before update on public.site_content
for each row execute function public.keystone_content_set_updated_at();

alter table public.site_content enable row level security;

revoke all on public.site_content from anon, authenticated;
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
grant select, insert, update, delete on public.site_content to service_role;

create policy "published website content is public"
on public.site_content
for select
to anon, authenticated
using (published = true);

create policy "staff can insert website content"
on public.site_content
for insert
to authenticated
with check (
  exists (
    select 1 from public.staff_members sm
    where sm.user_id = (select auth.uid()) and sm.active = true
  )
);

create policy "staff can update website content"
on public.site_content
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

create policy "staff can delete website content"
on public.site_content
for delete
to authenticated
using (
  exists (
    select 1 from public.staff_members sm
    where sm.user_id = (select auth.uid()) and sm.active = true
  )
);

-- Canonical brand/contact settings.
insert into public.site_content (content_key, locale, content_type, route, title, data, seo, published, sort_order)
values
(
  'global.brand', 'en', 'settings', null, 'Keystone Overseas',
  jsonb_build_object(
    'brandName', 'Keystone Overseas',
    'slogan', 'Your Pathway Beyond Borders',
    'phone', '+880 1941 646278',
    'whatsapp', '8801941646278',
    'primaryEmail', 'munim@keystoneoverseasbd.com',
    'secondaryEmail', 'Fahim@keystoneoverseasbd.com',
    'officeAddress', '4th Floor, House 5/4, Sobhanbag, Sobhanbag Road No. 16, Dhaka 1207, Bangladesh',
    'officeHours', 'Sat–Thu: 10am–7pm',
    'facebookUrl', 'https://www.facebook.com/share/187gaTjhFD/'
  ),
  '{}'::jsonb, true, 0
),
(
  'page.home', 'en', 'page', '/', 'Keystone Overseas',
  jsonb_build_object(
    'badge', 'Dhaka-based overseas education & recruitment support',
    'headline', 'Two services. Two separate pipelines. No more confusion.',
    'intro', 'Keystone Overseas separates student admissions from manpower recruitment. Students get profile-based university guidance. Manpower candidates are handled through a compliance-first workflow tied to verified job demand and applicable licensed recruiting channels.',
    'studentCta', 'Student Consultancy',
    'manpowerCta', 'Manpower Recruitment'
  ),
  jsonb_build_object(
    'title', 'Keystone Overseas — Student Consultancy & Manpower Recruitment Support Bangladesh',
    'description', 'Keystone Overseas in Dhaka provides study-abroad student consultancy and separate compliance-first manpower recruitment support for Bangladesh.'
  ), true, 10
),
(
  'home.company_profile', 'en', 'section', '/', 'Company Profile',
  jsonb_build_object(
    'eyebrow', 'Company Profile',
    'heading', 'Keystone Overseas',
    'slogan', 'Your Pathway Beyond Borders',
    'summary', 'Keystone Overseas is a Dhaka-based overseas services company focused on two clearly separated areas: international education consultancy for students and compliance-led manpower recruitment support for overseas employment pathways.',
    'detail', 'Our operating model is built around structured intake, document discipline, current requirement checking, transparent communication and evidence-based public claims. We support clients in both English and Bangla and keep education and manpower workflows separate so each case follows the correct process.',
    'headquarters', 'Sobhanbag, Dhaka',
    'operatingPrinciple', 'Evidence First',
    'communication', 'English + Bangla',
    'serviceModel', 'Digital + Office',
    'coreStandard', 'Separate Pipelines'
  ),
  '{}'::jsonb, true, 20
),
(
  'page.about', 'en', 'page', '/about', 'About Keystone Overseas',
  jsonb_build_object(
    'headline', 'Built around clearer decisions, cleaner files and separate operating pipelines.',
    'summary', 'Keystone Overseas is a Dhaka-based overseas education and recruitment-support business. The student side focuses on profile-based university admissions. The manpower side is kept separate and follows employer-demand, documentation and licensing checks appropriate to overseas recruitment.',
    'publicPolicyTitle', 'Evidence-first public policy',
    'publicPolicy', 'Public claims should be traceable to a real source: a verified document, an official requirement, a real review feed or a redacted client outcome. Marketing language is secondary to verifiable evidence.',
    'founderTitle', 'Founder perspective',
    'founderSummary', 'Founder Hasibul Munim spent nine years living and studying in South Korea. That experience informs Keystone’s emphasis on practical preparation, document discipline and realistic expectations rather than destination marketing alone.',
    'principles', jsonb_build_array(
      'Verify eligibility before recommending a study route.',
      'Keep student admissions and manpower recruitment as separate workflows.',
      'Do not publish license numbers until the supporting documents are verified.',
      'Do not publish fabricated review counts, visa-success percentages or success evidence.',
      'Use current institution, employer and destination requirements before filing.'
    )
  ),
  jsonb_build_object(
    'title', 'About Keystone Overseas — Dhaka, Bangladesh',
    'description', 'Learn how Keystone Overseas separates student consultancy from manpower recruitment support and applies an evidence-first approach.'
  ), true, 30
),
(
  'page.contact', 'en', 'page', '/contact', 'Contact Keystone Overseas',
  jsonb_build_object(
    'eyebrow', 'Contact Keystone Overseas',
    'headline', 'Speak with our Dhanmondi team',
    'intro', 'Tell us your study goal, academic background, preferred destination, and target intake. We will review the information before recommending a pathway.',
    'whatsappLabel', 'Fastest channel for a new consultation.',
    'emailLabel', 'For documents and detailed inquiries.',
    'consultationHeading', 'Not sure where you qualify?',
    'consultationCopy', 'Send your academic profile and preferred region. Eligibility depends on the institution, program, intake, and current admission requirements.'
  ),
  jsonb_build_object(
    'title', 'Contact Keystone Overseas — Dhanmondi, Dhaka',
    'description', 'Contact Keystone Overseas in Dhanmondi, Dhaka for study abroad consultation, application support, and document guidance.'
  ), true, 40
),
(
  'service.student_consultancy', 'en', 'service', '/student-consultancy', 'Student Consultancy',
  jsonb_build_object(
    'summary', 'Profile review, country and institution shortlisting, application support, document preparation and visa-stage guidance.',
    'steps', jsonb_build_array(
      'Profile intake and academic review',
      'Country and university shortlisting',
      'Application and document checklist',
      'Offer, payment and visa-stage preparation'
    )
  ), '{}'::jsonb, true, 50
),
(
  'service.manpower', 'en', 'service', '/manpower-recruitment', 'Manpower Recruitment Support',
  jsonb_build_object(
    'summary', 'Candidate intake, job-demand verification, documentation and coordination through applicable licensed recruitment channels.',
    'steps', jsonb_build_array(
      'Employer and job-demand verification',
      'Candidate eligibility and trade screening',
      'Documentation and licensed-channel coordination',
      'Deployment readiness and compliance checks'
    )
  ), '{}'::jsonb, true, 60
),
(
  'tool.visa_success_score', 'en', 'tool', '/visa-success-score', 'Visa Success Score',
  jsonb_build_object(
    'headline', 'Visa Success Score',
    'description', 'A free preliminary study-abroad profile-strength calculator using study gap, English status and available study budget.',
    'disclaimer', 'This is a profile-screening score only. It is not a visa approval probability and does not guarantee admission or a visa.'
  ), '{}'::jsonb, true, 70
),
(
  'asset.company_profile', 'en', 'asset', '/about', 'Keystone Overseas Company Profile',
  jsonb_build_object(
    'bucket', 'company-assets',
    'path', 'keystone-overseas-company-profile.pdf',
    'label', 'View Company Profile',
    'source', 'Keystone Overseas company profile brochure'
  ), '{}'::jsonb, true, 80
),
(
  'destinations.index', 'en', 'collection', '/student-consultancy', 'Study Destinations',
  jsonb_build_object(
    'items', jsonb_build_array(
      jsonb_build_object('id','malaysia','name','Malaysia','slug','study-in-malaysia-from-bangladesh','flag','🇲🇾'),
      jsonb_build_object('id','south-korea','name','South Korea','slug','study-in-south-korea-from-bangladesh','flag','🇰🇷'),
      jsonb_build_object('id','romania','name','Romania','slug','study-in-romania-from-bangladesh','flag','🇷🇴'),
      jsonb_build_object('id','cyprus','name','Cyprus','slug','study-in-cyprus-from-bangladesh','flag','🇨🇾'),
      jsonb_build_object('id','hungary','name','Hungary','slug','study-in-hungary-from-bangladesh','flag','🇭🇺'),
      jsonb_build_object('id','uk','name','United Kingdom','slug','study-in-uk-from-bangladesh','flag','🇬🇧'),
      jsonb_build_object('id','canada','name','Canada','slug','study-in-canada-from-bangladesh','flag','🇨🇦'),
      jsonb_build_object('id','usa','name','United States','slug','study-in-usa-from-bangladesh','flag','🇺🇸'),
      jsonb_build_object('id','greece','name','Greece','slug','study-in-greece-from-bangladesh','flag','🇬🇷')
    )
  ), '{}'::jsonb, true, 90
)
on conflict (content_key, locale) do update
set content_type = excluded.content_type,
    route = excluded.route,
    title = excluded.title,
    data = excluded.data,
    seo = excluded.seo,
    published = excluded.published,
    sort_order = excluded.sort_order,
    updated_at = now();
