import { Country } from './types';

export const countries: Country[] = [
  {
    id: 'cyprus',
    name: 'Cyprus (EU)',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop',
    shortDescription: 'Highest visa success in Europe with zero Indian transit hassles.',
    fullDescription: 'The Republic of Cyprus provides an accessible European Union educational corridor for Bangladeshi students. Admissions and Entry Permits (CRMD Blue Paper) are issued directly by the university and Cyprus Migration Department in Nicosia, allowing students to fly directly from Dhaka to Larnaca with no embassy interview in India.',
    benefits: [
      'No IELTS mandatory (Medium of Instruction or internal placement test)',
      'High study gap tolerance (3 to 8+ years accepted)',
      'Zero consular interview in India (Direct CRMD Entry Permit & OKTB)',
      'Affordable tuition fees (€3,000 – €4,000 / year with installment plans)',
      'Legal part-time work rights (20 hrs/week during study terms)'
    ],
    universities: [
      'University of Nicosia',
      'European University Cyprus',
      'Frederick University',
      'Cyprus International University',
      'Near East University'
    ],
    requirements: [
      'SSC & HSC / Diploma Transcripts (Apostilled / Attested)',
      'Valid Passport (minimum 2 years validity)',
      'Bank Solvency Certificate & 6-Month Statement (~€7,000)',
      'Police Clearance Certificate & Medical Screening'
    ],
    visaProcess: [
      'University Offer Letter & Document Verification',
      'Tuition Deposit Transfer to University Account',
      'University submits file to CRMD Nicosia for Entry Permit',
      'Issuance of Entry Clearance & OK-to-Board Letter from Dhaka'
    ],
    capital: 'Nicosia',
    cities: [
      { name: 'Nicosia', x: 60, y: 45, description: 'Capital and academic hub of Cyprus.' },
      { name: 'Limassol', x: 50, y: 70, description: 'Major coastal business, maritime and tourism city.' },
      { name: 'Larnaca', x: 70, y: 60, description: 'Main international airport gateway and university campuses.' }
    ]
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1000&auto=format&fit=crop',
    shortDescription: '95%+ visa success ratio and affordable globally ranked campuses.',
    fullDescription: 'Malaysia is Southeast Asia’s premier education hub, hosting prestigious branch campuses from the UK and Australia alongside globally ranked research universities. Admissions and visa approval letters (eVAL) are processed 100% online through EMGS with rapid turnaround.',
    benefits: [
      '95%+ visa approval ratio through official EMGS system',
      'Very affordable tuition fees ($2,500 – $4,500 / year)',
      'Study gaps up to 5 years accepted for Bachelor and Diploma programs',
      'English-speaking academic environment with modern infrastructure',
      'Visa stamped directly at the High Commission of Malaysia in Dhaka'
    ],
    universities: [
      'University of Malaya (UM)',
      'Taylor’s University',
      'Sunway University',
      'Asia Pacific University (APU)',
      'Lincoln University College'
    ],
    requirements: [
      'HSC / A-Level / Polytechnic Diploma (Minimum GPA 2.50+)',
      'White background passport-size photographs',
      'Passport copy (all pages valid for at least 18 months)',
      'Pre-arrival Health Declaration Form'
    ],
    visaProcess: [
      'Online application lodged with university',
      'Issuance of eVAL (Electronic Visa Approval Letter) via EMGS',
      'Single Entry Visa (SEV) endorsement in Dhaka',
      'Flight to Kuala Lumpur and Student Pass sticker upon arrival'
    ],
    capital: 'Kuala Lumpur',
    cities: [
      { name: 'Kuala Lumpur', x: 45, y: 60, description: 'The vibrant metropolis housing premier international campuses.' },
      { name: 'Penang', x: 40, y: 40, description: 'Historic island hub known for science and engineering universities.' },
      { name: 'Johor Bahru', x: 55, y: 80, description: 'Bordering Singapore, home to EduCity international university cluster.' }
    ]
  },
  {
    id: 'romania',
    name: 'Romania (EU)',
    image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?q=80&w=1000&auto=format&fit=crop',
    shortDescription: 'Official Preparatory Language Year (Anul Pregătitor) with zero IELTS.',
    fullDescription: 'Romania provides an authentic European Union higher education pathway regulated by the Romanian Ministry of Education. Non-EU students have the statutory right to enroll in the 1-year Romanian Language Preparatory Year (Anul Pregătitor de Limba Română) with zero IELTS requirement, transitioning directly into 4-year engineering, computer science, and business degrees.',
    benefits: [
      'Zero IELTS required — official 1-year Preparatory Year (60 ECTS)',
      'Low statutory tuition fees (€2,200 – €2,700 / year)',
      'Accepts study gaps from 3 to 8+ years with professional experience records',
      'Digital e-Apostille integration via apostille.mygov.bd',
      'Authorized consular submission in Kuala Lumpur, Bangkok, and Hanoi (bypassing India)'
    ],
    universities: [
      'POLITEHNICA Bucharest (UNSTPB)',
      'Technical University of Cluj-Napoca (UTCN)',
      'West University of Timișoara (UVT)',
      'University of Bucharest (UB)',
      'Ovidius University of Constanța (UOC)'
    ],
    requirements: [
      'HSC / Alim / Polytechnic Diploma certificate & marksheet',
      'Digital Hague Apostille via Bangladesh MoFA (apostille.mygov.bd)',
      'Bank Solvency (€5,000 – €6,500) and 6-month statement',
      'Valid Passport, Police Clearance & Medical Certificate'
    ],
    visaProcess: [
      'Institutional application and academic verification',
      'Issuance of Scrisoare de Acceptare (Letter of Acceptance) by Ministry of Education',
      '1-Year Tuition Payment via direct international bank transfer',
      'Type D/SD Visa submission via evisa.mae.ro and consular appointment'
    ],
    capital: 'Bucharest',
    cities: [
      { name: 'Bucharest', x: 75, y: 65, description: 'Capital city and technology flagship, home to UNSTPB and UB.' },
      { name: 'Cluj-Napoca', x: 45, y: 35, description: 'Silicon Valley of Eastern Europe, home to UTCN and UBB.' },
      { name: 'Timișoara', x: 25, y: 50, description: 'European Capital of Culture with premier polytechnic and comprehensive faculties.' }
    ]
  },
  {
    id: 'hungary',
    name: 'Hungary (Schengen)',
    image: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?q=80&w=1000&auto=format&fit=crop',
    shortDescription: 'Full 29-Nation Schengen visa processed in Dhaka via VFS Global.',
    fullDescription: 'Hungary is a central European Schengen nation offering world-renowned medical, engineering, and business education. All long-term student visa (Type D) files and biometric appointments are conducted directly inside Dhaka at the VFS Global Application Centre in Gulshan-1.',
    benefits: [
      'Full Schengen visa with unrestricted travel across 29 European countries',
      'Direct in-person submission & biometrics at VFS Global Dhaka (No India trip)',
      'Medium of Instruction (MOI) and internal university language tests accepted',
      'Moderate tuition costs (€2,500 – €4,500 / year)',
      'Comprehensive English-taught Bachelor and Master degree options'
    ],
    universities: [
      'University of Debrecen',
      'Budapest Metropolitan University',
      'Duna College Budapest',
      'Kodolányi János University',
      'International Business School (IBS) Budapest'
    ],
    requirements: [
      'Academic certificates attested by Education Board & MoFA Dhaka',
      'MOI Certificate from previous educational institution or IELTS score',
      'Bank balance certificate and sponsorship declaration (~€8,000)',
      'Detailed Motivation Letter / Statement of Purpose'
    ],
    visaProcess: [
      'Direct admission and conditional offer from Hungarian university',
      'Tuition fee settlement and issuance of final Acceptance Letter',
      'Appointment booking and document submission at VFS Dhaka',
      'Consular interview in Dhaka and Schengen Type D visa issuance'
    ],
    capital: 'Budapest',
    cities: [
      { name: 'Budapest', x: 50, y: 40, description: 'The historic capital renowned for architecture and elite universities.' },
      { name: 'Debrecen', x: 80, y: 45, description: 'Second-largest city and major educational hub of eastern Hungary.' },
      { name: 'Szeged', x: 60, y: 75, description: 'Vibrant university town renowned for scientific research and technology.' }
    ]
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=1000&auto=format&fit=crop',
    shortDescription: 'Official IEQAS Accredited Universities with up to 100% scholarships & streamlined visa.',
    fullDescription: 'South Korea is an elite technological and academic global powerhouse. Keystone Overseas specializes in official IEQAS-certified (교육국제화역량 인증제) universities approved by the Korean Ministry of Education and Ministry of Justice. Students admitted to certified institutions benefit from automated Visa Issuance Confirmation (사증발급인정서 - VIC), simplified financial screening, legal part-time work rights (up to 25–30 hrs/week), and founder insider guidance based on 9 years resident experience in South Korea.',
    benefits: [
      'Official IEQAS Accredited Universities with streamlined visa confirmation (HiKorea)',
      '30% to 100% tuition fee reduction scholarships based on GPA & IELTS / TOPIK',
      'Direct alumni network and founder guidance (9 years resident experience in South Korea)',
      'Legal part-time work rights permitted during semesters (25–30 hrs/week) and full-time in vacations',
      'Affordable flagship national universities (~2,000,000 KRW / semester) and high-tech career pathways'
    ],
    universities: [
      'Korea University (우수인증대학)',
      'Sungkyunkwan University - SKKU (우수인증대학)',
      'Hanyang University (우수인증대학)',
      'Chung-Ang University - CAU (우수인증대학)',
      'Konkuk University (우수인증대학)',
      'Pusan National University - PNU (Flagship National)',
      'Kyungpook National University - KNU (Flagship National)',
      'Sejong University (우수인증대학)',
      'Ajou University (우수인증대학)',
      'University of Seoul (Public National)'
    ],
    requirements: [
      'HSC / A-Level / Bachelor with minimum GPA 3.50/5.00 (or CGPA 2.80+ for Masters)',
      'English Track: IELTS 5.5–6.5 (or Korean Track: TOPIK Level 3+ / D-4 language training)',
      'Statutory Bank Solvency: 20M KRW (~$15,000 USD) for Seoul / 16M-18M KRW for Regional Universities',
      'Attested Academic Certificates (Board, MoE, MoFA Dhaka) & Study Plan'
    ],
    visaProcess: [
      'Academic pre-screening & university admission offer',
      'Confirmation of Visa Issuance (VIC / 사증발급인정서) issued via Korea Immigration Service',
      'Direct visa sticker endorsement at Embassy of the Republic of Korea in Dhaka (Baridhara)',
      'Pre-departure orientation and airport arrival coordination in Incheon / Gimhae'
    ],
    capital: 'Seoul',
    cities: [
      { name: 'Seoul', x: 70, y: 30, description: 'Capital megacity housing top global IEQAS research universities (Korea Univ, SKKU, Hanyang, CAU).' },
      { name: 'Busan', x: 80, y: 70, description: 'Maritime and industrial capital, home to Pusan National University and coastal campuses.' },
      { name: 'Daegu', x: 75, y: 55, description: 'High-tech and industrial hub, home to Kyungpook National University (KNU).' },
      { name: 'Daejeon', x: 65, y: 50, description: 'Korea’s Silicon Valley, home to premier science institutes and national universities.' }
    ]
  },
  {
    id: 'canada',
    name: 'Canada',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop',
    shortDescription: 'World-recognized degrees and post-graduation work permits (PGWP).',
    fullDescription: 'Canada remains a top choice for students with strong academic profiles and verified financial resources seeking prestigious university credentials and post-study employment pathways.',
    benefits: [
      'Post-Graduation Work Permit (PGWP) eligibility',
      'Globally respected degrees from top public universities and colleges',
      'Multicultural society with high quality of life',
      'Spousal work permit options for eligible Master’s degree students',
      'Clear pathways for skilled career advancement'
    ],
    universities: [
      'University of Toronto',
      'University of British Columbia',
      'McGill University',
      'Seneca Polytechnic',
      'Conestoga College'
    ],
    requirements: [
      'Academic Transcripts with strong marks',
      'IELTS Academic (Band 6.0–6.5 minimum) or PTE Academic',
      'Guaranteed Investment Certificate (GIC) / Verified Proof of Funds',
      'Study Permit application and Letter of Explanation'
    ],
    visaProcess: [
      'Letter of Acceptance from a Designated Learning Institution (DLI)',
      'Provincial Attestation Letter (PAL) acquisition',
      'Online Study Permit submission via IRCC portal',
      'Biometrics at VFS Dhaka and medical examination'
    ],
    capital: 'Ottawa',
    cities: [
      { name: 'Toronto', x: 80, y: 80, description: 'Canada’s financial and educational hub.' },
      { name: 'Vancouver', x: 15, y: 75, description: 'Coastal city renowned for natural beauty and research institutions.' },
      { name: 'Montreal', x: 85, y: 75, description: 'Bilingual cultural hub with top international universities.' }
    ]
  }
];
