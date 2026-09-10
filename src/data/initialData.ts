import { JobListing, Company, ProjectLearning, User, JobApplication, CareerArticle } from '../types';
import { ALL_JOBS } from './allJobs';
import {
  OFFICIAL_BLOG_ARTICLES,
  TEAM_MEMBERS,
  JOBSKUL_MILESTONES,
  CORE_VALUES,
  JOBSKUL_STATS,
  FAQS_DATA,
  GALLERY_ITEMS,
  CONTACT_INFO,
  CORPORATE_SERVICES,
  INSTITUTIONAL_SERVICES,
  INDIVIDUAL_SERVICES,
  JOB_CATEGORIES,
  STATES_COVERED
} from './jobskulContent';

export {
  ALL_JOBS,
  OFFICIAL_BLOG_ARTICLES,
  TEAM_MEMBERS,
  JOBSKUL_MILESTONES,
  CORE_VALUES,
  JOBSKUL_STATS,
  FAQS_DATA,
  GALLERY_ITEMS,
  CONTACT_INFO,
  CORPORATE_SERVICES,
  INSTITUTIONAL_SERVICES,
  INDIVIDUAL_SERVICES,
  JOB_CATEGORIES,
  STATES_COVERED
};

export const INITIAL_USERS: User[] = [
  {
    id: 'user-cand-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    role: 'candidate',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    headline: 'Full Stack Engineer | React, Node.js & Python AI Enthusiast',
    about: 'Passionate software developer with 2+ years of hands-on experience building scalable web applications and AI-enabled workflows. Completed Jobskül Python & React Project tracks.',
    qualification: 'B.Tech in Computer Science & Engineering',
    experienceYears: 2,
    skills: ['Python', 'React', 'JavaScript', 'TypeScript', 'Node.js', 'MySQL', 'Tailwind CSS', 'Docker', 'REST APIs', 'Git'],
    preferredRole: 'Full Stack Developer / Python Engineer',
    preferredLocation: 'Bengaluru / Remote',
    expectedSalary: '₹12,00,000 - ₹16,00,000',
    noticePeriod: '15 Days',
    workPreference: 'Hybrid',
    profileCompletion: 85,
    githubUrl: 'https://github.com/priyasharma-dev',
    linkedinUrl: 'https://linkedin.com/in/priyasharma-dev',
    portfolioUrl: 'https://priyasharma.me',
    resumeUrl: '/sample-resume.pdf'
  },
  {
    id: 'user-rec-1',
    name: 'Arun Mehta',
    email: 'arun.mehta@cloudsphere.io',
    role: 'recruiter',
    phone: '+91 91234 56789',
    location: 'Hyderabad, India',
    companyName: 'CloudSphere Technologies',
    companyId: 'comp-1',
    companyVerified: true,
    headline: 'Lead Technical Recruiter at CloudSphere Tech'
  },
  {
    id: 'user-admin-1',
    name: 'Admin Moderator',
    email: 'admin@jobskul.com',
    role: 'admin',
    phone: '+91 99999 88888',
    location: 'New Delhi, India',
    headline: 'Jobskül Platform Administrator & Quality Lead'
  }
];

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-jobskul',
    name: 'Jobskul Consulting Services',
    logo: '/jobskul-square.png',
    industry: 'HR Consultancy & Talent Solutions',
    location: 'Bhubaneswar, Odisha / Pan-India',
    size: '100 - 250 Employees',
    website: 'https://jobskul.com',
    verified: true,
    about: 'Jobskul Consulting Services is an HR consultancy startup founded in 2022 that operates on a strategic Hire, Train, Deploy model bridging educational institutions and modern enterprise talent needs.',
    benefits: ['Live Project Capstones', 'Structured Mentorship', 'Fast-Track Placement Pipeline', 'POSH Certified Workplace'],
    rating: 4.9,
    reviewsCount: 310,
    openJobsCount: 5,
    hiringHistory: 'Pioneered JILP placement programs with 5,000+ candidates placed nationwide.'
  },
  {
    id: 'comp-1',
    name: 'CloudSphere Technologies',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Software & Cloud Computing',
    location: 'Bengaluru, Karnataka',
    size: '500 - 1,000 Employees',
    website: 'https://cloudsphere.io',
    verified: true,
    about: 'CloudSphere provides modern enterprise cloud infrastructure, hybrid container orchestration, and developer tooling for global Fortune 500 enterprises.',
    benefits: ['Comprehensive Health Insurance', 'Annual Learning & Certification Budget', 'Remote Work Flexibility', 'Stock Equity Options'],
    rating: 4.8,
    reviewsCount: 340,
    openJobsCount: 6,
    hiringHistory: 'Over 140 candidates hired through Jobskül in the last 12 months.'
  },
  {
    id: 'comp-2',
    name: 'NexGen AI Labs',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Software & Artificial Intelligence',
    location: 'Pune, Maharashtra',
    size: '150 - 300 Employees',
    website: 'https://nexgenailabs.ai',
    verified: true,
    about: 'Building generative AI co-pilots and neural enterprise search systems to accelerate workplace productivity and deep customer intelligence.',
    benefits: ['Cutting-edge GPU clusters', 'Flexible Work Hours', 'Wellness & Mental Health Support', 'Patent Bonuses'],
    rating: 4.9,
    reviewsCount: 180,
    openJobsCount: 4,
    hiringHistory: 'Consistently top rated by engineering candidates for R&D culture.'
  },
  {
    id: 'comp-3',
    name: 'FinFlow Global Services',
    logo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Finance & Banking',
    location: 'Mumbai, Maharashtra',
    size: '2,000 - 5,000 Employees',
    website: 'https://finflowservices.com',
    verified: true,
    about: 'Next-generation payment gateway and multi-currency remittance network processing millions in real-time transactions daily.',
    benefits: ['Competitive Performance Bonuses', 'Premium Medical Cover for Family', 'Gym & Fitness Reimbursements'],
    rating: 4.6,
    reviewsCount: 520,
    openJobsCount: 5,
    hiringHistory: 'Active campus and lateral recruitment partner with Jobskül.'
  },
  {
    id: 'comp-4',
    name: 'Tata Consultancy Services (TCS)',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Software & IT Services',
    location: 'Hyderabad, Telangana / Pan-India',
    size: '10,000+ Employees',
    website: 'https://tcs.com',
    verified: true,
    about: 'A world-leading information technology, consulting, and business solutions organization delivering tangible outcomes for enterprise clients.',
    benefits: ['Structured Career Growth Paths', 'Global Mobility Opportunities', 'Retirement & Provident Fund matching'],
    rating: 4.5,
    reviewsCount: 12400,
    openJobsCount: 12,
    hiringHistory: 'Major placement partner with special hiring drives for Jobskül project graduates.'
  },
  {
    id: 'comp-5',
    name: 'Razorpay Technologies',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Finance & Payments Infrastructure',
    location: 'Bengaluru, Karnataka',
    size: '1,000 - 2,500 Employees',
    website: 'https://razorpay.com',
    verified: true,
    about: 'Razorpay is the premier payments solution in India allowing businesses to accept, process and disburse payments effortlessly.',
    benefits: ['MacBook Pro M3 Hardware', 'Zero-Downtime Insurance', 'Generous Paternity/Maternity Leave', 'Free Food & Snacks'],
    rating: 4.7,
    reviewsCount: 890,
    openJobsCount: 8,
    hiringHistory: 'Hires top-tier full-stack engineers and backend developers.'
  },
  {
    id: 'comp-6',
    name: 'Zoho Corporation',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Software & Enterprise Cloud',
    location: 'Chennai, Tamil Nadu',
    size: '10,000+ Employees',
    website: 'https://zoho.com',
    verified: true,
    about: 'Zoho offers beautifully smart software to help you grow your business, trusted by over 100 million users worldwide.',
    benefits: ['Rural Campus Initiatives', 'Subsidized Housing & Transit', 'Continuous Upskilling'],
    rating: 4.7,
    reviewsCount: 4200,
    openJobsCount: 7,
    hiringHistory: 'Values hands-on building and project portfolios over mere degrees.'
  },
  {
    id: 'comp-7',
    name: 'Swiggy Commerce Tech',
    logo: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Retail & Products',
    location: 'Bengaluru, Karnataka',
    size: '5,000+ Employees',
    website: 'https://swiggy.com',
    verified: true,
    about: 'India leading on-demand convenience platform connecting millions of consumers with restaurants, grocery stores, and essential services.',
    benefits: ['Employee Discounts', 'ESOPs', 'Comprehensive Wellness Cover'],
    rating: 4.5,
    reviewsCount: 1600,
    openJobsCount: 4,
    hiringHistory: 'Regularly recruits product managers and operations leaders.'
  },
  {
    id: 'comp-8',
    name: 'Nykaa E-Retail Limited',
    logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Retail & Products',
    location: 'Gurugram, Haryana / Mumbai',
    size: '3,000+ Employees',
    website: 'https://nykaa.com',
    verified: true,
    about: 'Premier omnichannel beauty, wellness and fashion destination with nationwide retail stores and warehouse infrastructure.',
    benefits: ['Product Allowances', 'Health Cover', 'Fast-Track Promotions'],
    rating: 4.4,
    reviewsCount: 980,
    openJobsCount: 3,
    hiringHistory: 'Partners with Jobskül for retail operations & merchandising hires.'
  },
  {
    id: 'comp-9',
    name: 'Zomato Enterprise Solutions',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Marketing & Sales',
    location: 'New Delhi, Delhi NCR',
    size: '4,500+ Employees',
    website: 'https://zomato.com',
    verified: true,
    about: 'Tech-driven platform empowering restaurants and enterprise dining partners with predictive supply chain and direct marketing tools.',
    benefits: ['Competitive Commission Structure', 'Travel Allowance', 'Health Benefits'],
    rating: 4.6,
    reviewsCount: 2100,
    openJobsCount: 5,
    hiringHistory: 'Employs regional sales managers and marketing executives.'
  },
  {
    id: 'comp-10',
    name: 'KPMG India Advisory',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Finance & Management Consulting',
    location: 'Kolkata, West Bengal / Gurugram',
    size: '8,000+ Employees',
    website: 'https://kpmg.com/in',
    verified: true,
    about: 'Global advisory, tax, and audit network helping organizations navigate financial risk, organizational restructuring, and statutory compliance.',
    benefits: ['Executive Coaching', 'Certification Reimbursement', 'International Secondments'],
    rating: 4.6,
    reviewsCount: 3800,
    openJobsCount: 6,
    hiringHistory: 'Recruits corporate financial analysts and audit managers.'
  },
  {
    id: 'comp-11',
    name: 'PeopleMatters HR Solutions',
    logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Human Resource',
    location: 'Bengaluru, Karnataka',
    size: '250 - 500 Employees',
    website: 'https://peoplematters.in',
    verified: true,
    about: 'Leading HR media, talent strategy, and workplace transformation consultancy helping HR leaders build equitable workplaces.',
    benefits: ['Hybrid Work Culture', 'Conclave Passes', 'Health Insurance'],
    rating: 4.7,
    reviewsCount: 410,
    openJobsCount: 3,
    hiringHistory: 'Collaborates with Jobskül on HR conclaves and POSH training drives.'
  },
  {
    id: 'comp-12',
    name: 'Gartner India Research & Advisory',
    logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Market Research',
    location: 'Gurugram, Haryana',
    size: '2,000+ Employees',
    website: 'https://gartner.com',
    verified: true,
    about: 'The world leading research and advisory company equipping business leaders with indispensable insights, advice, and tools.',
    benefits: ['Global Research Exposure', 'Premium Medical Plan', 'Flexible Leave'],
    rating: 4.8,
    reviewsCount: 1400,
    openJobsCount: 4,
    hiringHistory: 'Regularly recruits market research associates and industry analysts.'
  },
  {
    id: 'comp-13',
    name: 'Freshdesk & Freshworks',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Customer Help & SaaS',
    location: 'Chennai, Tamil Nadu',
    size: '4,000+ Employees',
    website: 'https://freshworks.com',
    verified: true,
    about: 'Cloud-based customer support software provider empowering businesses to deliver delightful customer service experiences.',
    benefits: ['Stock Grants', 'Free Meals', 'Learning Reimbursement'],
    rating: 4.6,
    reviewsCount: 2300,
    openJobsCount: 5,
    hiringHistory: 'Recruits customer support engineers and client success managers.'
  },
  {
    id: 'comp-14',
    name: 'L&T Infotech (LTIMindtree)',
    logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Software & Embedded Systems',
    location: 'Bhubaneswar, Odisha / Pune',
    size: '10,000+ Employees',
    website: 'https://ltimindtree.com',
    verified: true,
    about: 'Global technology consulting and digital solutions company enabling enterprises to reimagine business models and accelerate growth.',
    benefits: ['Onsite Opportunities', 'Medical Insurance', 'Provident Fund'],
    rating: 4.5,
    reviewsCount: 8900,
    openJobsCount: 9,
    hiringHistory: 'Major recruiter from Jobskül institutional campus recruitment drives.'
  },
  {
    id: 'comp-15',
    name: 'Delhivery Supply Chain',
    logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Management & Operations',
    location: 'Jaipur, Rajasthan / Gurugram',
    size: '15,000+ Employees',
    website: 'https://delhivery.com',
    verified: true,
    about: 'India largest fully integrated logistics provider operating infrastructure across 18,000+ pin codes.',
    benefits: ['Performance Incentive', 'Accident Insurance', 'Fast Career Track'],
    rating: 4.3,
    reviewsCount: 4600,
    openJobsCount: 6,
    hiringHistory: 'Recruits supply chain operations managers and hub executives.'
  },
  {
    id: 'comp-16',
    name: 'Infosys BPM & IT Services',
    logo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Customer Help & BPM',
    location: 'Bhubaneswar, Odisha / Bengaluru',
    size: '10,000+ Employees',
    website: 'https://infosysbpm.com',
    verified: true,
    about: 'Business process management subsidiary of Infosys providing end-to-end transformative services across banking and telecom.',
    benefits: ['Transport Facilities', 'Subsidized Food', 'Healthcare Insurance'],
    rating: 4.4,
    reviewsCount: 11200,
    openJobsCount: 10,
    hiringHistory: 'Long-standing partnership for fresh graduate customer help roles.'
  },
  {
    id: 'comp-17',
    name: 'Wipro Digital Technologies',
    logo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Software',
    location: 'Kochi, Kerala / Hyderabad',
    size: '10,000+ Employees',
    website: 'https://wipro.com',
    verified: true,
    about: 'Leading technology services and consulting company focused on building innovative solutions addressing clients digital transformation needs.',
    benefits: ['Continuous Learning Credit', 'Health Insurance', 'Retirement Gratuity'],
    rating: 4.4,
    reviewsCount: 9400,
    openJobsCount: 8,
    hiringHistory: 'Active participant in Jobskül Job Fairs and CRT placement training.'
  },
  {
    id: 'comp-18',
    name: 'Adani Digital Labs',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Software & Infrastructure',
    location: 'Ahmedabad, Gujarat',
    size: '1,000 - 2,500 Employees',
    website: 'https://adanidigital.com',
    verified: true,
    about: 'Digital transformation engine of Adani Group building consumer applications for travel, airport ecosystems, and utilities.',
    benefits: ['Competitive Compensation', 'Family Medical Care', 'Relocation Assistance'],
    rating: 4.6,
    reviewsCount: 720,
    openJobsCount: 4,
    hiringHistory: 'Hires senior lateral developers through Jobskül lateral solutions.'
  },
  {
    id: 'comp-19',
    name: 'Apollo Health & Retail',
    logo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Retail & Products',
    location: 'Hyderabad, Telangana / Pan-India',
    size: '8,000+ Employees',
    website: 'https://apollo247.com',
    verified: true,
    about: 'Omnichannel healthcare and pharmaceutical retail network providing round-the-clock delivery and diagnostic services.',
    benefits: ['Pharmacy Discount', 'Family Health Coverage', 'Attendance Incentives'],
    rating: 4.5,
    reviewsCount: 3100,
    openJobsCount: 5,
    hiringHistory: 'Hires retail store supervisors and inventory product managers.'
  },
  {
    id: 'comp-20',
    name: 'ICICI Bank Corporate Talent',
    logo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Finance',
    location: 'Mumbai, Maharashtra / Lucknow, UP',
    size: '10,000+ Employees',
    website: 'https://icicibank.com',
    verified: true,
    about: 'Pioneering private banking institution offering retail, corporate, and investment banking products across India.',
    benefits: ['Concessional Loans', 'Medical Insurance', 'Pension Benefit'],
    rating: 4.5,
    reviewsCount: 15800,
    openJobsCount: 11,
    hiringHistory: 'Recruits finance associates through Jobskül Commercial Traineeship (CMT).'
  },
  {
    id: 'comp-21',
    name: 'NielsenIQ Consumer Intelligence',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Market Research',
    location: 'Mumbai, Maharashtra / Delhi NCR',
    size: '3,000+ Employees',
    website: 'https://nielseniq.com',
    verified: true,
    about: 'The gold standard in consumer intelligence and retail measurement providing the most complete view of retail trends.',
    benefits: ['Hybrid Work Hours', 'Comprehensive Health Plan', 'Learning Subsidies'],
    rating: 4.6,
    reviewsCount: 1200,
    openJobsCount: 3,
    hiringHistory: 'Employs market research associates and econometric analysts.'
  },
  {
    id: 'comp-22',
    name: 'Tech Mahindra Telecom Solutions',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Software & Customer Help',
    location: 'Noida, Uttar Pradesh / Pune',
    size: '10,000+ Employees',
    website: 'https://techmahindra.com',
    verified: true,
    about: 'Connected world specialist offering digital transformation, consulting and business re-engineering services.',
    benefits: ['Global Projects', 'Healthcare Insurance', 'Reward Points'],
    rating: 4.4,
    reviewsCount: 8100,
    openJobsCount: 7,
    hiringHistory: 'Frequent recruiter for telecom support and customer engineering roles.'
  },
  {
    id: 'comp-23',
    name: 'Bajaj Finserv Direct',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Finance',
    location: 'Pune, Maharashtra',
    size: '4,000+ Employees',
    website: 'https://bajajfinserv.in',
    verified: true,
    about: 'Leading non-banking financial company catering to millions of customers across lending, insurance, and wealth advisory.',
    benefits: ['Performance Linked Pay', 'Group Health Cover', 'Daycare Support'],
    rating: 4.5,
    reviewsCount: 4900,
    openJobsCount: 5,
    hiringHistory: 'Partners with Jobskül for fresher and lateral financial analyst roles.'
  },
  {
    id: 'comp-24',
    name: 'Reliance Retail Ventures',
    logo: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Retail & Products',
    location: 'Pan-India (Bhubaneswar, Mumbai, Ahmedabad)',
    size: '10,000+ Employees',
    website: 'https://relianceretail.com',
    verified: true,
    about: 'India largest and most profitable retailer serving over 300 million customers across grocery, electronics, and apparel.',
    benefits: ['Store Discounts', 'Medical Insurance', 'Statutory Bonus'],
    rating: 4.4,
    reviewsCount: 14200,
    openJobsCount: 8,
    hiringHistory: 'Bulk recruitment drives conducted across tier-2 and tier-3 colleges.'
  },
  {
    id: 'comp-25',
    name: 'Myntra Fashion Designs',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Marketing & Sales',
    location: 'Bengaluru, Karnataka',
    size: '2,500+ Employees',
    website: 'https://myntra.com',
    verified: true,
    about: 'Major fashion e-commerce portal known for cutting-edge digital marketing campaigns and trend forecasting.',
    benefits: ['Fashion Allowance', 'Flexible Leave Policy', 'Catered Snacks'],
    rating: 4.6,
    reviewsCount: 1800,
    openJobsCount: 4,
    hiringHistory: 'Recruits digital marketers and social commerce managers.'
  },
  {
    id: 'comp-26',
    name: 'Aon Hewitt Human Capital',
    logo: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Human Resource',
    location: 'Gurugram, Haryana',
    size: '3,500+ Employees',
    website: 'https://aon.com',
    verified: true,
    about: 'Global professional services firm providing a broad range of risk, retirement, and human capital solutions.',
    benefits: ['Wellness Allowances', 'Global Learning Hub', 'Flexi Benefits'],
    rating: 4.7,
    reviewsCount: 1100,
    openJobsCount: 3,
    hiringHistory: 'Collaborates on HR compensation studies and POSH compliance.'
  },
  {
    id: 'comp-27',
    name: 'Cognizant Technology Solutions',
    logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Software & IT Consulting',
    location: 'Kolkata, West Bengal / Chennai',
    size: '10,000+ Employees',
    website: 'https://cognizant.com',
    verified: true,
    about: 'Leading technology company transforming clients business, operating, and technology models for the digital era.',
    benefits: ['Higher Education Support', 'Healthcare Insurance', 'Transport Facility'],
    rating: 4.4,
    reviewsCount: 16500,
    openJobsCount: 9,
    hiringHistory: 'Major placement partner across engineering institutions.'
  },
  {
    id: 'comp-28',
    name: 'Ipsos Market Research India',
    logo: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Market Research',
    location: 'New Delhi, Delhi NCR',
    size: '1,500+ Employees',
    website: 'https://ipsos.com/en-in',
    verified: true,
    about: 'One of the largest market research and polling companies worldwide delivering reliable information for true understanding of society.',
    benefits: ['Field Allowances', 'Health Coverage', 'Global Methodology Training'],
    rating: 4.6,
    reviewsCount: 650,
    openJobsCount: 2,
    hiringHistory: 'Hires quantitative survey analysts and brand track specialists.'
  },
  {
    id: 'comp-29',
    name: 'Tata Steel Industrial Management',
    logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Management',
    location: 'Jamshedpur / Bhubaneswar, Odisha',
    size: '10,000+ Employees',
    website: 'https://tatasteel.com',
    verified: true,
    about: 'Among the top global steel companies with an annual crude steel capacity of 35 million tonnes per annum.',
    benefits: ['Subsidized Housing', 'Medical Care at Tata Main Hospital', 'Retirement Pension'],
    rating: 4.7,
    reviewsCount: 7800,
    openJobsCount: 4,
    hiringHistory: 'Hires commercial management trainees and project supervisors.'
  },
  {
    id: 'comp-30',
    name: 'Titan Company Limited',
    logo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Retail & Products',
    location: 'Bengaluru, Karnataka',
    size: '5,000+ Employees',
    website: 'https://titancompany.in',
    verified: true,
    about: 'Tata Group enterprise bringing excellence to watches, jewelry, eyewear, and fragrance retail categories.',
    benefits: ['Product Concessions', 'Comprehensive Medical Cover', 'Scholarship Schemes'],
    rating: 4.7,
    reviewsCount: 3200,
    openJobsCount: 3,
    hiringHistory: 'Regularly recruits retail store managers and customer experience specialists.'
  },
  {
    id: 'comp-31',
    name: 'Justdial Help & Client Services',
    logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Customer Help',
    location: 'Mumbai, Maharashtra / Jaipur',
    size: '8,000+ Employees',
    website: 'https://justdial.com',
    verified: true,
    about: 'India No. 1 local search engine providing comprehensive local search services to users across multiple platforms.',
    benefits: ['Daily Incentives', 'Health Insurance', 'Day Shifts Available'],
    rating: 4.3,
    reviewsCount: 6400,
    openJobsCount: 6,
    hiringHistory: 'Hires tele-support executives and customer help specialists.'
  },
  {
    id: 'comp-32',
    name: 'Airtel Enterprise Business',
    logo: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Marketing & Sales',
    location: 'Gurugram, Haryana / Bhubaneswar',
    size: '10,000+ Employees',
    website: 'https://airtel.in/business',
    verified: true,
    about: 'India leading provider of ICT services offering cloud, cybersecurity, IoT, and data connectivity to 1,200+ global enterprises.',
    benefits: ['Subsidized Connectivity', 'Performance Bonus', 'Executive Health Checkup'],
    rating: 4.5,
    reviewsCount: 9200,
    openJobsCount: 7,
    hiringHistory: 'Key hiring partner for B2B corporate sales and marketing programs.'
  }
];

export const INITIAL_JOBS: JobListing[] = ALL_JOBS;

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior Full Stack Python & React Developer',
    company: 'CloudSphere Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&h=120&q=80',
    candidateId: 'user-cand-1',
    candidateName: 'Priya Sharma',
    candidateEmail: 'priya.sharma@example.com',
    candidatePhone: '+91 98765 43210',
    candidateHeadline: 'Full Stack Engineer | React, Node.js & Python AI Enthusiast',
    candidateExperienceYears: 2,
    candidateSkills: ['Python', 'React', 'JavaScript', 'TypeScript', 'Node.js', 'MySQL', 'Docker'],
    status: 'interview',
    appliedAt: '2026-08-31',
    updatedAt: '2026-09-02',
    aiMatchScore: 94,
    interview: {
      id: 'int-1',
      date: '2026-09-05',
      time: '03:30 PM IST',
      type: 'Technical',
      mode: 'Online (Google Meet)',
      meetingLink: 'https://meet.google.com/xyz-jobskul-tech',
      interviewerName: 'Arun Mehta',
      interviewerRole: 'Lead Architect & Talent Lead',
      notes: 'Prepare to discuss your Python E-Commerce API capstone and React state management architecture.',
      status: 'scheduled'
    }
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    jobTitle: 'Junior Python Backend Developer (Fresher Welcome)',
    company: 'NexGen AI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
    candidateId: 'user-cand-1',
    candidateName: 'Priya Sharma',
    candidateEmail: 'priya.sharma@example.com',
    candidatePhone: '+91 98765 43210',
    candidateHeadline: 'Full Stack Engineer | React, Node.js & Python AI Enthusiast',
    candidateExperienceYears: 2,
    candidateSkills: ['Python', 'SQL', 'MySQL', 'Git', 'OOP'],
    status: 'shortlisted',
    appliedAt: '2026-09-01',
    updatedAt: '2026-09-02',
    aiMatchScore: 96
  }
];

export const INITIAL_PROJECTS: ProjectLearning[] = [
  {
    id: 'proj-python-1',
    title: 'Enterprise Job Portal & Recruitment Engine (Django + MySQL)',
    category: 'Python',
    difficulty: 'Intermediate',
    duration: '4 Weeks (28 Hours)',
    technology: ['Python', 'Django', 'MySQL', 'Django REST Framework', 'JWT Auth', 'Celery'],
    description: 'Build a production-grade multi-role Job & Recruitment portal with candidate applicant tracking, recruiter job posting, and automated email notifications using Python and MySQL.',
    learningObjectives: [
      'Master Django models with relational MySQL tables (OneToMany, ManyToMany).',
      'Implement role-based access control (RBAC) for Candidates, Recruiters, and Admins.',
      'Build secure RESTful endpoints with pagination, filters, and JWT authentication.',
      'Write optimized MySQL queries using Django ORM select_related and prefetch_related.'
    ],
    prerequisites: ['Python syntax & OOP fundamentals', 'Basic SQL queries (SELECT, JOIN, WHERE)'],
    architecture: 'Client-Server Architecture: Frontend (HTML/JS or React) <-> REST API (Django REST Framework) <-> ORM Layer <-> MySQL Relational Database. Background tasks handled via Celery + Redis.',
    databaseDesign: `TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(120) UNIQUE, role ENUM('candidate', 'recruiter', 'admin'), password_hash VARCHAR(255));
TABLE jobs (id INT AUTO_INCREMENT PRIMARY KEY, recruiter_id INT, title VARCHAR(150), description TEXT, salary_min INT, salary_max INT, location VARCHAR(100), work_mode ENUM('remote', 'hybrid', 'office'));
TABLE applications (id INT AUTO_INCREMENT PRIMARY KEY, job_id INT, candidate_id INT, status ENUM('applied', 'shortlisted', 'interview', 'selected', 'rejected'), resume_url VARCHAR(255), applied_at TIMESTAMP);`,
    stepByStepGuide: [
      {
        step: 1,
        title: 'Project Setup & MySQL Database Configuration',
        description: 'Initialize Django project and connect with MySQL server using mysqlclient or pymysql.',
        codeSnippet: `# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'jobskul_db',
        'USER': 'root',
        'PASSWORD': 'secure_password',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    }
}`,
        explanation: 'Configures Django to persist data directly into MySQL with strict ACID transaction guarantees.'
      },
      {
        step: 2,
        title: 'Define Job & Application Relational Models',
        description: 'Create models for Job listings, Company verification, and Candidate Applications.',
        codeSnippet: `# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (('candidate', 'Candidate'), ('recruiter', 'Recruiter'), ('admin', 'Admin'))
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='candidate')
    phone = models.CharField(max_length=15, blank=True)

class Job(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=150)
    recruiter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posted_jobs')
    location = models.CharField(max_length=100)
    salary_min = models.IntegerField()
    salary_max = models.IntegerField()
    skills = models.TextField(help_text="Comma separated skills")
    created_at = models.DateTimeField(auto_now_add=True)

class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    candidate = models.ForeignKey(User, on_delete=models.CASCADE, related_name='job_applications')
    status = models.CharField(max_length=30, default='applied')
    resume = models.FileField(upload_to='resumes/')
    created_at = models.DateTimeField(auto_now_add=True)`,
        explanation: 'Establishes foreign-key relationships ensuring integrity across candidates, jobs, and applications.'
      },
      {
        step: 3,
        title: 'Implement Search, Filters & Application Pipeline Endpoints',
        description: 'Build DRF views for keyword search, multi-faceted filtering, and status updates.',
        codeSnippet: `# views.py
from rest_framework import viewsets, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import Job, Application
from .serializers import JobSerializer, ApplicationSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-created_at')
    serializer_class = JobSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['location', 'category']
    search_fields = ['title', 'skills', 'company']`,
        explanation: 'Enables high-performance searching across job titles, skills, and locations with database indexing.'
      }
    ],
    lessonsCount: 12,
    tasksCount: 20,
    certificateEligible: true
  },
  {
    id: 'proj-python-2',
    title: 'E-Commerce Microservices Backend (FastAPI + MySQL)',
    category: 'Python',
    difficulty: 'Advanced',
    duration: '3 Weeks (20 Hours)',
    technology: ['Python', 'FastAPI', 'MySQL', 'SQLAlchemy', 'Pydantic', 'Stripe'],
    description: 'Build high-performance asynchronous e-commerce microservices with product cataloging, transactional cart management, inventory locks, and webhook order fulfillment.',
    learningObjectives: [
      'Understand asynchronous Python with async/await and FastAPI.',
      'Implement SQLAlchemy 2.0 async sessions with MySQL.',
      'Prevent race conditions using pessimistic locking during stock checkout.',
      'Integrate Stripe payment intent webhooks.'
    ],
    prerequisites: ['Python basics', 'Relational database schema principles'],
    architecture: 'Microservices architecture with API Gateway -> Product Service -> Cart & Order Service -> Payment Webhooks -> MySQL master/replica.',
    databaseDesign: `TABLE products (id INT PRIMARY KEY, title VARCHAR(200), price DECIMAL(10,2), stock INT);
TABLE orders (id INT PRIMARY KEY, user_id INT, total DECIMAL(10,2), status VARCHAR(50), payment_id VARCHAR(100));`,
    stepByStepGuide: [
      {
        step: 1,
        title: 'Asynchronous SQLAlchemy Engine with MySQL',
        description: 'Configure aiomysql driver for non-blocking concurrent database requests.',
        codeSnippet: `from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+aiomysql://user:password@localhost/ecommerce_db"
engine = create_async_engine(DATABASE_URL, echo=True, pool_size=20)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)`,
        explanation: 'Ensures database I/O does not block the FastAPI event loop.'
      }
    ],
    lessonsCount: 10,
    tasksCount: 16,
    certificateEligible: true
  },
  {
    id: 'proj-react-1',
    title: 'Admin Dashboard & Analytics Engine (React + TypeScript)',
    category: 'React',
    difficulty: 'Intermediate',
    duration: '2.5 Weeks (16 Hours)',
    technology: ['React 18', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'Motion'],
    description: 'Design and build an enterprise-level SaaS administration dashboard with real-time chart visualizers, dark/light theme switching, data tables, and CSV export.',
    learningObjectives: [
      'Master advanced React component composition and layout hierarchy.',
      'Leverage Tailwind CSS utility tokens for scalable design systems.',
      'Build responsive data tables with sorting, filtering, and pagination.',
      'Incorporate fluid micro-interactions with Framer Motion.'
    ],
    prerequisites: ['Basic JavaScript and HTML/CSS'],
    architecture: 'Modular Single Page Application architecture with custom hooks for state management and decoupled UI components.',
    databaseDesign: 'Local client cache synchronized with REST endpoints.',
    stepByStepGuide: [
      {
        step: 1,
        title: 'Layout Shell & Collapsible Sidebar Navigation',
        description: 'Construct the persistent desktop sidebar and mobile responsive drawer.',
        codeSnippet: `export const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
};`,
        explanation: 'Provides intuitive navigation across metrics, users, jobs, and settings.'
      }
    ],
    lessonsCount: 8,
    tasksCount: 14,
    certificateEligible: true
  },
  {
    id: 'proj-java-1',
    title: 'Core Banking & Transaction System (Spring Boot + MySQL)',
    category: 'Java',
    difficulty: 'Advanced',
    duration: '4 Weeks (26 Hours)',
    technology: ['Java 21', 'Spring Boot 3', 'MySQL', 'Hibernate', 'Spring Security', 'JUnit 5'],
    description: 'Architect a secure banking backend with double-entry ledger bookkeeping, customer KYC verification, fund transfers, and strict fraud detection checks.',
    learningObjectives: [
      'Understand Spring Boot enterprise patterns and dependency injection.',
      'Implement atomic fund transfers using @Transactional isolation levels.',
      'Enforce Spring Security with JWT and role-based permissions.',
      'Write exhaustive integration tests with Testcontainers and MySQL.'
    ],
    prerequisites: ['Java OOP syntax', 'SQL fundamentals'],
    architecture: 'Layered architecture: Controller Layer -> Service Layer -> Repository Layer -> MySQL with database connection pooling (HikariCP).',
    databaseDesign: `TABLE accounts (account_number VARCHAR(20) PRIMARY KEY, user_id BIGINT, balance DECIMAL(15,2), currency VARCHAR(3));
TABLE ledger_entries (id BIGINT AUTO_INCREMENT PRIMARY KEY, transaction_ref VARCHAR(64), from_acc VARCHAR(20), to_acc VARCHAR(20), amount DECIMAL(15,2), timestamp TIMESTAMP);`,
    stepByStepGuide: [
      {
        step: 1,
        title: 'Atomic Fund Transfer Service',
        description: 'Execute thread-safe fund transfer preventing overdrafts.',
        codeSnippet: `@Service
public class TransferService {
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public TransactionReceipt transferFunds(String fromAcc, String toAcc, BigDecimal amount) {
        Account source = accountRepo.findByAccountNumberForUpdate(fromAcc)
            .orElseThrow(() -> new AccountNotFoundException());
        if (source.getBalance().compareTo(amount) < 0) {
            throw new InsufficientFundsException("Balance too low");
        }
        Account target = accountRepo.findByAccountNumberForUpdate(toAcc)
            .orElseThrow(() -> new AccountNotFoundException());
        source.setBalance(source.getBalance().subtract(amount));
        target.setBalance(target.getBalance().add(amount));
        return receiptRepo.save(new TransactionReceipt(source, target, amount));
    }
}`,
        explanation: 'Ensures strict atomic balance deduction and addition without race conditions.'
      }
    ],
    lessonsCount: 11,
    tasksCount: 18,
    certificateEligible: true
  },
  {
    id: 'proj-ai-1',
    title: 'AI Resume Screener & Skill-Gap Matcher (Python + LLM API)',
    category: 'AI/ML',
    difficulty: 'Intermediate',
    duration: '2.5 Weeks (18 Hours)',
    technology: ['Python', 'Gemini API', 'PDFplumber', 'FastAPI', 'NumPy'],
    description: 'Build an automated resume parser and applicant scoring system that calculates semantic match scores against job descriptions and produces instant skill gap reports.',
    learningObjectives: [
      'Extract structured metadata from unstructured PDF and Word resumes.',
      'Engineer prompts for detailed technical skill extraction and scoring.',
      'Calculate match percentages and format recommendations.',
      'Deploy the model as a lightweight REST service.'
    ],
    prerequisites: ['Python basics', 'Basic understanding of LLMs'],
    architecture: 'Document Ingestion -> Text Normalizer -> LLM Semantic Scorer -> Structured JSON Output -> Candidate Feedback UI.',
    databaseDesign: 'Stores candidate resumes, extracted skill vectors, and computed job match scores.',
    stepByStepGuide: [
      {
        step: 1,
        title: 'PDF Text Extraction & Schema Definition',
        description: 'Read resume files and normalize text into structured candidate features.',
        codeSnippet: `import pdfplumber

def extract_resume_text(pdf_path: str) -> str:
    with pdfplumber.open(pdf_path) as pdf:
        return " ".join([page.extract_text() or "" for page in pdf.pages])`,
        explanation: 'Safely extracts resume text cleanly across multiple columns.'
      }
    ],
    lessonsCount: 9,
    tasksCount: 15,
    certificateEligible: true
  }
];

export const INITIAL_BLOG_POSTS: CareerArticle[] = OFFICIAL_BLOG_ARTICLES;
