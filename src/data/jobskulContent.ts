import { Company, JobListing, CareerArticle } from '../types';

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  id: string;
  category: 'General' | 'For Candidates' | 'For Corporates' | 'For Institutions';
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'HR Conclave' | 'Hackathon' | 'Campus Drive' | 'Workshop' | 'Placement Day';
  date: string;
  image: string;
  description: string;
}

export const JOBSKUL_STATS = {
  liveJobs: '14+',
  verifiedCompanies: '32+',
  candidatesPlaced: '500+',
  candidateRating: '4.8',
  statesCovered: '12+',
  peopleTrained: '1,00,000+',
  clientAssociations: '65+',
  internshipsFacilitated: '10,000+',
  learningInteractions: '2M+',
  certificatesIssued: '8,000+'
};

export const JOB_CATEGORIES = [
  { id: 'Marketing & Sales', name: 'Marketing & Sales', icon: 'TrendingUp', count: 18, desc: 'Enterprise sales, digital growth, B2B demand gen' },
  { id: 'Software', name: 'Software', icon: 'Code', count: 42, desc: 'Full-stack, Python, React, embedded systems & DevOps' },
  { id: 'Retail & Products', name: 'Retail & Products', icon: 'ShoppingBag', count: 14, desc: 'Product operations, merchandising & store management' },
  { id: 'Human Resource', name: 'Human Resource', icon: 'Users', count: 12, desc: 'Talent acquisition, POSH compliance & HR operations' },
  { id: 'Finance', name: 'Finance', icon: 'DollarSign', count: 16, desc: 'Corporate banking, credit analysis, audit & Ind AS' },
  { id: 'Management', name: 'Management', icon: 'Briefcase', count: 15, desc: 'Commercial traineeships, supply chain & operations' },
  { id: 'Customer Help', name: 'Customer Help', icon: 'Headphones', count: 20, desc: 'Technical helpdesk, client support & service SLAs' },
  { id: 'Market Research', name: 'Market Research', icon: 'BarChart3', count: 9, desc: 'Consumer intelligence, market sizing & competitive audit' },
];

export const STATES_COVERED = [
  'Odisha', 'Karnataka', 'Maharashtra', 'Telangana', 'Tamil Nadu', 
  'Delhi NCR', 'West Bengal', 'Gujarat', 'Kerala', 'Haryana', 
  'Uttar Pradesh', 'Rajasthan'
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Sitansu Mishra',
    role: 'Founder, MD & CEO',
    bio: 'Visionary educator and entrepreneur passionate about transforming employability and bridging the industry-academia chasm through live projects, experiential internships, and corporate staffing pipelines.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Soumya Mohanty',
    role: 'Project Manager',
    bio: 'Spearheads execution across university partnerships, student engagement cohorts, and JILP capstone deliveries ensuring world-class curriculum integration and flawless candidate placement metrics.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Manoranjan Mishra',
    role: 'Chief Operating Officer (Projects)',
    bio: 'Oversees operational scale, corporate recruitment linkages, institutional conclaves, and hackathon execution nationwide with over two decades of leadership experience in institutional operations.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
    linkedin: 'https://linkedin.com'
  }
];

export const JOBSKUL_MILESTONES: Milestone[] = [
  {
    year: '2019',
    title: 'Founding & Employability Mission',
    description: 'Jobskül was founded with a foundational commitment to transforming student employability through project-centered learning and industry mentorship.'
  },
  {
    year: '2021',
    title: 'Corporate HR Training & POSH Expansion',
    description: 'Expanded capabilities into enterprise corporate HR training, POSH Act legal compliance sessions, and institutional placement enablement.'
  },
  {
    year: '2023',
    title: 'Strategic Institutional & Enterprise Growth',
    description: 'Partnered with 50+ universities and 15+ corporate enterprises, launching the flagship JILP and Commercial Management Traineeship (CMT).'
  }
];

export const CORE_VALUES: CoreValue[] = [
  {
    title: 'Think Big',
    description: 'Dream expansively to reimagine talent development and create systemic solutions for global workforce empowerment.',
    icon: 'Sparkles'
  },
  {
    title: 'Do the Right Thing',
    description: 'Uphold unwavering ethical standards, total transparency with candidates and recruiters, and statutory excellence.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Make a Difference',
    description: 'Measure success through actual candidate lives transformed, careers launched, and institutional outcomes elevated.',
    icon: 'HeartHandshake'
  },
  {
    title: 'Stronger United',
    description: 'Harness the synergy of students, academia, corporate leaders, and training mentors working toward common prosperity.',
    icon: 'Users'
  },
  {
    title: 'Stay Curious',
    description: 'Continuously adopt emerging technologies, modern pedagogies, AI productivity tools, and industry trends.',
    icon: 'Compass'
  },
  {
    title: 'Deliver with Purpose',
    description: 'Execute with clockwork precision, high empathy, and relentless commitment to measurable candidate placement.',
    icon: 'Target'
  }
];

export const CORPORATE_SERVICES = [
  {
    id: 'lateral-hiring',
    title: 'Lateral Hiring Solutions',
    badge: 'HR & Talent Teams',
    description: 'End-to-end recruitment of verified, pre-screened lateral candidates tailored to specific enterprise tech stack and culture requirements.',
    features: [
      'Pre-screened lateral candidates with verified project track records',
      'Matching based on granular company role requirements and salary benchmarks',
      'Suitable for both agile startups and large-scale enterprise delivery units',
      'Dedicated recruitment account manager and fast-track turnaround'
    ]
  },
  {
    id: 'fresher-hiring',
    title: 'Fresher Hiring Programs',
    badge: 'Campus & Early Career',
    description: 'Organized campus recruitment drives and pre-screened fresher pipelines to deploy job-ready early-career talent with zero bench latency.',
    features: [
      'Structured on-campus and virtual recruitment drives',
      'Pre-screened fresher pipelines with foundational coding and problem-solving audits',
      'Role-specific hiring matching client technical requirements',
      'Hire • Train • Deploy custom onboarding alignment'
    ]
  },
  {
    id: 'posh-training',
    title: 'POSH Training',
    badge: 'Statutory Compliance',
    description: 'Comprehensive Prevention of Sexual Harassment (POSH) compliance training and legal advisory for management, employees, and Internal Committees.',
    features: [
      'Interactive POSH awareness training sessions for employees and managers',
      'External ICC (Internal Complaints Committee) member representation & advisory',
      'Flexible online and on-site delivery models tailored to organizational shift patterns',
      'Digital compliance certification and statutory annual reporting support'
    ]
  },
  {
    id: 'emotional-intelligence',
    title: 'Emotional Intelligence & Workplace Happiness',
    badge: 'Employee Wellbeing',
    description: 'Specialized corporate workshops designed to foster psychological safety, empathetic leadership, conflict resolution, and peak employee engagement.',
    features: [
      'Industry-customised sessions aligned with tech, retail, and corporate environments',
      'Targeted interventions for employee wellbeing and stress mitigation',
      'Dedicated frameworks for hybrid and distributed remote-team culture',
      'Measurable pre-and-post workshop employee engagement index tracking'
    ]
  },
  {
    id: 'jilp-corporate',
    title: 'JILP — Jobskul Internship Live Project Placement Program',
    badge: 'Flagship Pipeline',
    description: 'Connect with talented student cohorts working on live industry-grade capstone projects, creating a direct internship-to-full-time hiring pipeline.',
    features: [
      'Access to vetted live-project interns with hands-on repo experience',
      'Pre-vetted candidates who have solved real problem statements',
      'Smooth, seamless internship-to-full-time hiring conversion pipeline',
      'Zero recruiter agency commission for converted JILP interns'
    ]
  }
];

export const INSTITUTIONAL_SERVICES = [
  {
    id: 'hr-conclave',
    title: 'HR Conclave Support Events',
    badge: 'Colleges & Universities',
    description: 'End-to-end conceptualization, speaker curation, and execution of flagship HR conclaves that bring industry CXOs and recruiters directly to your campus.',
    features: [
      'Eminent speaker and HR leader curation across Fortune 500 enterprises',
      'Comprehensive institutional branding and press coverage support',
      'Complete event logistics, panel orchestration, and stage management',
      'Direct campus hiring and networking opportunities created for students'
    ]
  },
  {
    id: 'hackathon-management',
    title: 'Hackathon Management & Planning',
    badge: 'Technical Competitions',
    description: 'Full-cycle ideation, digital platform orchestration, problem curation, and jury management for high-energy campus hackathons.',
    features: [
      'Industry-relevant problem statements designed with corporate sponsors',
      'Turnkey hackathon portal setup with automated submission & evaluation',
      'Senior industry engineering leaders as jury panels and mentors',
      'Hybrid physical and virtual hackathon formats'
    ]
  },
  {
    id: 'job-fair',
    title: 'Job Fair Planning & Execution',
    badge: 'Mega Placement Drives',
    description: 'Orchestrating large-scale pool campus job fairs bringing dozens of recruiting companies under one roof with automated student slotting.',
    features: [
      'Multi-industry corporate company participation and recruiter outreach',
      'Dedicated Jobskül job-fair registration and slotting portal',
      'On-ground logistics, interview booths, and test lab management',
      'Comprehensive post-drive analytics and verified placement reporting'
    ]
  },
  {
    id: 'crt',
    title: 'Campus Recruitment Training (CRT)',
    badge: 'Employability Training',
    description: 'Intensive placement-season training bridging aptitude, coding, communication, group discussions, and mock interviews for pre-final and final year students.',
    features: [
      'Structured placement-season training modules tailored to company patterns',
      'Digital practice tests, coding sandboxes, and aptitude assessments',
      'Rigorous 1:1 mock interview drills with personalized scorecards',
      'Post-training support and continuous doubt-clearing till placement'
    ]
  },
  {
    id: 'tic2',
    title: 'TIC² — Technical Interview Crash Course',
    badge: 'Fast-Track Technical Prep',
    description: 'High-impact technical interview preparation focusing on data structures, algorithmic problem solving, system design, and database queries.',
    features: [
      'Deep-dive technical interview preparation for product and services companies',
      'Available in both high-velocity online webinars and immersive on-campus bootcamps',
      'Live code reviews and whiteboarding techniques taught by senior developers',
      'Course completion certification recognized by Jobskül hiring partners'
    ]
  },
  {
    id: 'jilp-academic',
    title: 'JILP — Academic Integration',
    badge: 'Curriculum Enhancement',
    description: 'Seamless integration of Jobskül live-project internships into the academic semester calendar, ensuring students fulfill university credit criteria.',
    features: [
      'Live-project internships aligned with AICTE and university credit frameworks',
      'Tailored to college academic calendars (summer, winter, or semester-long)',
      'Multi-domain selection: Full Stack Python, React, Cloud, AI/ML, Embedded Systems',
      'Dedicated TPO coordination dashboard with real-time student tracking'
    ]
  },
  {
    id: 'placement-support',
    title: 'Placement Support Services',
    badge: 'Year-Round Assistance',
    description: 'Dedicated corporate outreach and continuous recruiter connections provided to your institutional Training & Placement Cell (TPO).',
    features: [
      'Year-round placement assistance for both off-campus and on-campus opportunities',
      'Proactive corporate recruiter outreach across diverse industry sectors',
      'Streamlined TPO coordination with single point of contact (SPOC)',
      'Placement drive scheduling, candidate shortlisting, and offer tracking'
    ]
  },
  {
    id: 'excelrate',
    title: 'EXCELRATE + Prompt Pulse Workshops',
    badge: 'Modern Toolkits',
    description: 'Cutting-edge student workshops focusing on modern workplace productivity, advanced Excel modeling, and Generative AI prompt engineering.',
    features: [
      'Hands-on interactive workshops using real business datasets',
      'Comprehensive toolkits, cheat-sheets, and reusable prompt libraries',
      'Practical projects: dynamic financial models, automated reporting, and AI workflows',
      'Verified certificates of completion enhancing student resume credentials'
    ]
  }
];

export const INDIVIDUAL_SERVICES = [
  {
    id: 'cmt',
    title: 'Commercial Management Traineeship (CMT)',
    badge: 'Paid Traineeship',
    description: 'A paid, hands-on traineeship connecting ambitious students and young professionals with real companies, structured executive mentorship, and a manageable weekly time commitment.',
    audience: 'Job Seekers & Management Students',
    highlights: [
      'Real company projects in commercial operations, business development, and market analysis',
      'Structured 1:1 mentorship from seasoned industry leaders',
      'Manageable weekly time commitment designed to balance with college classes',
      'Competitive monthly stipend and Pre-Placement Offer (PPO) opportunities',
      'Official traineeship credential and comprehensive executive recommendation letter'
    ]
  },
  {
    id: 'embedded-systems',
    title: 'Embedded Systems Internship',
    badge: 'Hands-on Hardware & IoT',
    description: 'A paid technical internship providing rigorous, hands-on embedded systems and IoT firmware engineering experience, industry mentor guidance, verified certification, and an end-to-end project report.',
    audience: 'ECE, EEE, CS & Mechatronics Engineers',
    highlights: [
      'Hands-on programming with ARM Cortex, ESP32, STM32, and RTOS environments',
      'Direct industry mentorship from senior embedded systems architects',
      'Verified Jobskül engineering certificate and end-to-end project technical report',
      'Hardware-in-the-loop debugging, circuit simulation, and industrial protocols (CAN, I2C, SPI)',
      'Direct interview referrals with electronics and automotive R&D employers'
    ]
  }
];

export const OFFICIAL_BLOG_ARTICLES: CareerArticle[] = [
  {
    id: 'blog-1',
    title: 'Upskilling in 2026: The Fastest Way to Boost Your Career',
    category: 'Skill Development',
    author: 'Jobskül Academic & Career Advisory',
    readTime: '6 min read',
    date: 'Sep 02, 2026',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    summary: 'Discover the highest-demand technical and business proficiencies in 2026 and how structured live-project learning accelerates your career mobility.',
    content: `The employment landscape in 2026 has irrevocably shifted from credential-based shortlisting to demonstrable capability. Employers across India and global markets are prioritizing candidates who have built, debugged, and deployed tangible projects over those with traditional theoretical certificates.

To rapidly accelerate your marketability:
1. Master Full-Stack Architecture: Combine modern frontend frameworks like React and TypeScript with scalable backends in Python (Django/FastAPI).
2. Embrace Prompt Engineering and AI Assistance: Top performers use AI copilots to multiply their output while maintaining rigorous architectural integrity.
3. Build Verifiable Repositories: Showcase clean git commit histories, comprehensive README files, and live deployment links.

At Jobskül, our Project Learning and JILP initiatives ensure that every learner graduates with an enterprise-grade portfolio that directly addresses modern hiring criteria.`,
    tags: ['Upskilling', 'Skill Development', 'Career Growth', 'Tech 2026']
  },
  {
    id: 'blog-2',
    title: 'How to Prepare for Interviews and Impress Recruiters',
    category: 'Interview Preparation',
    author: 'Talent Acquisition Team, Jobskül',
    readTime: '7 min read',
    date: 'Aug 29, 2026',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    summary: 'A proven masterclass on technical whiteboarding, behavioral STAR responses, and asking impactful questions that convert interviews into offers.',
    content: `Recruiters and hiring managers make initial impressions within the first 5 minutes of an interview. Walking in prepared with structured communication models transforms your candidacy.

Key strategies for interview excellence:
- The STAR Framework: Frame every behavioral response around Situation, Task, Action, and Measurable Result.
- Technical Articulation: When solving coding challenges, verbalize your edge-case thoughts and complexity trade-offs before typing code.
- Reverse Interviewing: Prepare thoughtful questions regarding team engineering velocity, deployment pipelines, and quarterly objectives.

Practice through Jobskül mock interviews and our TIC² Technical Interview Crash Course to refine your timing and executive presence before the real drive.`,
    tags: ['Interviews', 'Preparation', 'STAR Method', 'Career Advice']
  },
  {
    id: 'blog-3',
    title: 'Top 10 Job Search Strategies That Actually Work in 2026',
    category: 'Career Advice',
    author: 'Jobskül Career Advisory Desk',
    readTime: '5 min read',
    date: 'Aug 24, 2026',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    summary: 'Stop blindly applying on generic boards. Learn how direct recruiter outreach, ATS optimization, and project portfolios unlock hidden jobs.',
    content: `Over 70% of high-paying tech and corporate positions are filled through direct referrals, talent pools, and proactive outreach rather than public job boards.

Ten actionable strategies for modern job seekers:
1. Optimize your resume for modern ATS parsers using single-column, clean typography.
2. Build a project portfolio with live demos and clear architectural diagrams.
3. Target verified companies directly on Jobskül rather than outdated aggregators.
4. Customize your application cover note with specific value-add propositions.
5. Participate in institutional hackathons and HR conclaves to meet decision makers.
6. Seek structured traineeships like CMT to acquire verifiable corporate references.
7. Engage with tech communities and share your building journey publicly.
8. Set up instant Job Alerts on Jobskül for immediate notifications.
9. Prepare tailored pitches for the 8 core sectors (Software, Retail, HR, Finance, etc.).
10. Follow up politely 5 to 7 days post-application with updated project metrics.`,
    tags: ['Job Search', 'Career Advice', 'Jobskül', 'ATS Resume']
  },
  {
    id: 'blog-4',
    title: 'Top Soft Skills Employers Look for in 2026',
    category: 'Career Tips',
    author: 'Corporate Learning Group, Jobskül',
    readTime: '6 min read',
    date: 'Aug 18, 2026',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    summary: 'While technical hard skills get you into the room, soft skills dictate long-term promotion, cross-functional trust, and leadership trajectory.',
    content: `In an era increasingly shaped by automation, human-centric competencies represent the ultimate career moat.

Top non-negotiable soft skills identified by our 65+ corporate partners:
- Emotional Intelligence (EQ): Navigating diverse viewpoints and maintaining workplace psychological safety.
- Clear Written & Asynchronous Communication: Crafting concise pull request summaries, client emails, and sprint documentation.
- Adaptability & Continuous Curiosity: The willingness to unlearn legacy methods and master emerging paradigms rapidly.
- Problem Ownership: Stepping up to resolve cross-boundary roadblocks without waiting for explicit supervision.

Jobskül integrates Emotional Intelligence workshops into our corporate and student programs to ensure balanced professional development.`,
    tags: ['Soft Skills', 'Leadership', 'Workplace Culture', 'Career Tips']
  },
  {
    id: 'blog-5',
    title: 'Lateral Hiring vs. Fresher Recruitment',
    category: 'HR Insights',
    author: 'Manoranjan Mishra, COO (Projects)',
    readTime: '8 min read',
    date: 'Aug 12, 2026',
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    summary: 'A strategic guide for talent acquisition heads on balancing experienced lateral additions with cost-effective fresher pipelines and HTD models.',
    content: `Human resource leaders frequently face the dilemma of allocating hiring budgets between expensive lateral professionals and early-career campus graduates.

Strategic comparisons:
1. Time-to-Productivity: Lateral hires deliver immediate output but carry higher attrition risks and salary expectations.
2. Long-term Retention & Loyalty: Freshers recruited via structured Hire, Train, Deploy (HTD) initiatives show significantly higher tenure and culture alignment.
3. Cost of Bench & Sourcing: Combining pre-screened lateral specialists for mission-critical architecture with fresher cohorts trained on your exact tech stack provides optimal financial and organizational balance.

Jobskül offers dual solutions: pre-screened Lateral Hiring for rapid impact, and bespoke Fresher Hiring Programs with university integration.`,
    tags: ['HR Insights', 'Lateral Hiring', 'Fresher Recruitment', 'Talent Strategy']
  },
  {
    id: 'blog-6',
    title: 'POSH Act: What Every Employee and Employer Must Know',
    category: 'Industry News',
    author: 'Legal & Compliance Division, Jobskül',
    readTime: '7 min read',
    date: 'Aug 05, 2026',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    summary: 'Essential legal mandates, Internal Committee responsibilities, and procedural requirements under India’s POSH Act for a safe workplace.',
    content: `The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act) is a mandatory statutory requirement for all organizations employing 10 or more people in India.

Critical compliance pillars:
- Constitution of an Internal Committee (IC): Every office or branch must constitute an IC headed by a senior woman employee, with at least 50% women members and an external independent expert.
- Mandatory Employee Sensitization: Regular, documented training sessions must be conducted for all permanent, contractual, and intern personnel.
- Annual Compliance Filings: Employers must submit statutory annual reports detailing complaints received and resolved to the district officer.

Jobskül POSH Training provides accredited workshops, external ICC member support, and comprehensive digital compliance tracking for modern employers.`,
    tags: ['POSH Act', 'Compliance', 'Workplace Safety', 'Industry News', 'HR']
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is Jobskül and how does the platform work?',
    answer: 'Jobskül is a comprehensive job, training, and talent platform bridging job seekers, higher education institutions, and corporate employers through verified job listings, hands-on project learning, JILP live-project internships, and enterprise HR services.'
  },
  {
    id: 'faq-2',
    category: 'For Candidates',
    question: 'Are job applications and the Resume Builder completely free for candidates?',
    answer: 'Yes! Candidates can create profiles, build ATS-optimized resumes, apply to verified job openings across India, track applications, and utilize the JobskülHireAI tool at zero cost.'
  },
  {
    id: 'faq-3',
    category: 'For Candidates',
    question: 'What is the Commercial Management Traineeship (CMT)?',
    answer: 'The CMT is a paid traineeship connecting students and early-career professionals with real companies, structured executive mentorship, and a manageable weekly time commitment that accommodates college classes.'
  },
  {
    id: 'faq-4',
    category: 'For Candidates',
    question: 'What does the Embedded Systems Internship cover?',
    answer: 'The Embedded Systems Internship is a paid hands-on internship providing programming experience with ARM Cortex, ESP32, STM32, and RTOS, complete with industry mentorship, certification, and an end-to-end project report.'
  },
  {
    id: 'faq-5',
    category: 'For Corporates',
    question: 'How do Jobskül Lateral Hiring and Fresher Hiring Programs work?',
    answer: 'For lateral needs, we provide pre-screened, technically vetted candidates matched to your exact stack. For freshers, we run full campus drives and bespoke Hire-Train-Deploy pipelines to onboard job-ready graduates with zero bench downtime.'
  },
  {
    id: 'faq-6',
    category: 'For Corporates',
    question: 'Does Jobskül provide certified external ICC members for POSH compliance?',
    answer: 'Yes. Jobskül provides certified POSH compliance awareness training for leadership and employees, alongside experienced external independent members for your Internal Complaints Committee (ICC).'
  },
  {
    id: 'faq-7',
    category: 'For Institutions',
    question: 'How does JILP — Academic Integration benefit colleges and TPOs?',
    answer: 'JILP integrates semester-aligned live-project internships into college academic calendars, allowing students to earn university credits while working on real industry problem statements with continuous TPO dashboard visibility.'
  },
  {
    id: 'faq-8',
    category: 'For Institutions',
    question: 'Can Jobskül organize HR Conclaves and campus Hackathons for our university?',
    answer: 'Yes. We provide complete turnkey execution for HR conclaves (speaker curation, branding, logistics) and campus hackathons (problem statements, competition platform, corporate judging panels).'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'National HR Leadership Conclave 2026',
    category: 'HR Conclave',
    date: 'February 2026',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    description: 'Over 40 CXOs and HR Directors gathered in Bhubaneswar to discuss emerging workforce paradigms and campus talent pipelines.'
  },
  {
    id: 'gal-2',
    title: 'Smart Odisha Tech Hackathon',
    category: 'Hackathon',
    date: 'January 2026',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    description: '48-hour continuous student hackathon solving real civic and cloud challenges with corporate jury evaluation.'
  },
  {
    id: 'gal-3',
    title: 'Mega Institutional Placement Drive',
    category: 'Placement Day',
    date: 'December 2025',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    description: 'Pool campus drive facilitating over 240 on-the-spot offers across software, banking, and retail domains.'
  },
  {
    id: 'gal-4',
    title: 'POSH Compliance & Diversity Workshop',
    category: 'Workshop',
    date: 'November 2025',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    description: 'Interactive corporate training session on psychological safety, statutory IC compliance, and gender equity.'
  },
  {
    id: 'gal-5',
    title: 'Prompt Pulse & Modern Toolkits Workshop',
    category: 'Workshop',
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    description: 'Hands-on Generative AI prompt engineering and advanced data analysis masterclass for university students.'
  },
  {
    id: 'gal-6',
    title: 'Campus Recruitment Training (CRT) Boot Camp',
    category: 'Campus Drive',
    date: 'September 2025',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    description: 'Intensive aptitude and technical interview preparation cohort helping pre-final engineering students crack top tech drives.'
  }
];

export const CONTACT_INFO = {
  address: '619, Esplanade One, Rasulgarh Industrial Estate, Bhubaneswar, Odisha 751007',
  phones: ['+91 70081 90970', '+91 78737 90970'],
  emails: ['contact@jobskul.com', 'support@jobskul.com', 'partnerships@jobskul.com'],
  workingHours: [
    { days: 'Monday – Friday', hours: '9:00 AM – 6:00 PM IST' },
    { days: 'Saturday', hours: '10:00 AM – 3:00 PM IST' },
    { days: 'Sunday', hours: 'Closed' }
  ]
};
