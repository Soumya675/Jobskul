import { JobListing, Company, ProjectLearning, User, JobApplication, CareerArticle } from '../types';

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
    id: 'comp-1',
    name: 'CloudSphere Technologies',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Cloud Computing & SaaS',
    location: 'Bengaluru / Hyderabad',
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
    industry: 'Artificial Intelligence & Data',
    location: 'Bengaluru / Pune',
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
    industry: 'FinTech & Banking',
    location: 'Mumbai / Chennai',
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
    industry: 'IT Services & Consulting',
    location: 'Pan India (Hyderabad, Chennai, Pune, Noida)',
    size: '10,000+ Employees',
    website: 'https://tcs.com',
    verified: true,
    about: 'A world-leading information technology, consulting, and business solutions organization that delivers real results to global businesses.',
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
    industry: 'Payments & Financial Infrastructure',
    location: 'Bengaluru',
    size: '1,000 - 2,500 Employees',
    website: 'https://razorpay.com',
    verified: true,
    about: 'Razorpay is the premier payments solution in India which allows businesses to accept, process and disburse payments effortlessly.',
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
    location: 'Chennai / Tenkasi / Remote',
    size: '10,000+ Employees',
    website: 'https://zoho.com',
    verified: true,
    about: 'Zoho offers beautifully smart software to help you grow your business. With over 100 million users worldwide.',
    benefits: ['Rural Campus Initiatives', 'Subsidized Housing & Transit', 'Continuous Upskilling'],
    rating: 4.7,
    reviewsCount: 4200,
    openJobsCount: 7,
    hiringHistory: 'Values hands-on building and project portfolios over mere degrees.'
  }
];

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Python & React Developer',
    company: 'CloudSphere Technologies',
    companyId: 'comp-1',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&h=120&q=80',
    companyVerified: true,
    location: 'Bengaluru, India',
    salaryMin: 14,
    salaryMax: 22,
    salaryDisplay: '₹14,00,000 - ₹22,00,000 LPA',
    experienceLevel: '3-5 Years',
    experienceYearsRequired: 3,
    employmentType: 'Full-time',
    workMode: 'Hybrid',
    industry: 'Software & Tech',
    category: 'Full Stack',
    description: 'We are seeking an experienced Full Stack Developer to build out our high-throughput cloud automation portals. You will architect robust Django/FastAPI microservices and modern React user interfaces with seamless UX.',
    responsibilities: [
      'Design, implement, and maintain RESTful and GraphQL APIs using Python (Django / FastAPI).',
      'Develop modern, performant web applications using React, TypeScript, and Tailwind CSS.',
      'Optimize database queries and schema designs on MySQL and PostgreSQL.',
      'Collaborate with cloud architects to deploy services using Docker, Kubernetes, and AWS/GCP pipelines.',
      'Mentor junior engineers and participate in code reviews.'
    ],
    requiredSkills: ['Python', 'React', 'TypeScript', 'MySQL', 'Docker', 'REST APIs'],
    preferredSkills: ['FastAPI', 'Redis', 'AWS', 'Tailwind CSS', 'CI/CD'],
    educationRequirements: 'B.Tech / B.E. / MCA or equivalent practical demonstration',
    benefits: ['Health Insurance', 'WFH Stipend', 'Learning Allowance', 'PF & Gratuity'],
    openings: 3,
    postedDate: '2026-08-30',
    applicationDeadline: '2026-09-30',
    status: 'active',
    applicantCount: 28
  },
  {
    id: 'job-2',
    title: 'Junior Python Backend Developer (Fresher Welcome)',
    company: 'NexGen AI Labs',
    companyId: 'comp-2',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
    companyVerified: true,
    location: 'Pune / Remote',
    salaryMin: 6,
    salaryMax: 10,
    salaryDisplay: '₹6,00,000 - ₹10,00,000 LPA',
    experienceLevel: 'Fresher',
    experienceYearsRequired: 0,
    employmentType: 'Full-time',
    workMode: 'Remote',
    industry: 'AI & Data Science',
    category: 'Software & Tech',
    description: 'Great opportunity for enthusiastic freshers or early career developers who have built real Python projects. You will work on data ingestion pipelines, backend REST APIs, and integrations with LLM foundation models.',
    responsibilities: [
      'Write clean, testable Python code using Django or Flask.',
      'Build CRUD endpoints and integrate with relational databases (MySQL/Postgres).',
      'Participate in building AI prompt chaining pipelines and vector database integrations.',
      'Assist in documentation and API testing using Postman.'
    ],
    requiredSkills: ['Python', 'SQL', 'MySQL', 'Git', 'Data Structures', 'OOP'],
    preferredSkills: ['Django', 'FastAPI', 'Pandas', 'Basic Machine Learning'],
    educationRequirements: 'Bachelor degree in CS/IT/ECE or Jobskül Certified Project completion',
    benefits: ['100% Remote', 'MacBook Provided', 'Mentorship Program', 'Annual Team Offsites'],
    openings: 4,
    postedDate: '2026-09-01',
    applicationDeadline: '2026-10-15',
    status: 'active',
    applicantCount: 54
  },
  {
    id: 'job-3',
    title: 'AI/ML Engineer - NLP & Recommendation Systems',
    company: 'NexGen AI Labs',
    companyId: 'comp-2',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
    companyVerified: true,
    location: 'Bengaluru, India',
    salaryMin: 18,
    salaryMax: 30,
    salaryDisplay: '₹18,00,000 - ₹30,00,000 LPA',
    experienceLevel: '3-5 Years',
    experienceYearsRequired: 3,
    employmentType: 'Full-time',
    workMode: 'Hybrid',
    industry: 'AI & Data Science',
    category: 'AI & Data Science',
    description: 'Join our core AI research and engineering team building contextual recommendation engines and enterprise intelligence copilots using modern transformer architectures.',
    responsibilities: [
      'Train, fine-tune, and evaluate deep learning and transformer models.',
      'Build scalable embedding search indexes using Milvus / Pinecone.',
      'Deploy models as low-latency microservices using Triton Inference Server or FastAPI.',
      'Analyze model latency, token economy, and hallucination reduction.'
    ],
    requiredSkills: ['Python', 'PyTorch', 'Transformers', 'NLP', 'Docker', 'Vector Databases'],
    preferredSkills: ['LangChain', 'vLLM', 'Kubernetes', 'MLOps'],
    educationRequirements: 'B.Tech/M.Tech in CS/AI or equivalent research experience',
    benefits: ['High-performance GPU cluster access', 'Research Publication support', 'Stock Options'],
    openings: 2,
    postedDate: '2026-08-28',
    applicationDeadline: '2026-09-25',
    status: 'active',
    applicantCount: 41
  },
  {
    id: 'job-4',
    title: 'Java Backend Microservices Engineer',
    company: 'FinFlow Global Services',
    companyId: 'comp-3',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=120&h=120&q=80',
    companyVerified: true,
    location: 'Mumbai, India',
    salaryMin: 12,
    salaryMax: 18,
    salaryDisplay: '₹12,00,000 - ₹18,00,000 LPA',
    experienceLevel: '1-3 Years',
    experienceYearsRequired: 2,
    employmentType: 'Full-time',
    workMode: 'Work from office',
    industry: 'FinTech & Banking',
    category: 'Software & Tech',
    description: 'Build enterprise-grade payment settlement engines that handle millions of micro-transactions per second with zero tolerance for inconsistency.',
    responsibilities: [
      'Develop reactive microservices using Java 17+, Spring Boot, and Spring Cloud.',
      'Design ACID-compliant database transactions on MySQL and relational storage.',
      'Implement asynchronous messaging pipelines via Apache Kafka.',
      'Write comprehensive unit and integration test suites using JUnit and Mockito.'
    ],
    requiredSkills: ['Java', 'Spring Boot', 'MySQL', 'Kafka', 'Microservices', 'REST APIs'],
    preferredSkills: ['Docker', 'Hibernate/JPA', 'Redis', 'Kubernetes'],
    educationRequirements: 'B.Tech in CS/IT or MCA',
    benefits: ['Banking Perks', 'Full Family Health Cover', 'Performance Bonus', 'Subsidized Cafeteria'],
    openings: 5,
    postedDate: '2026-08-25',
    applicationDeadline: '2026-10-01',
    status: 'active',
    applicantCount: 39
  },
  {
    id: 'job-5',
    title: 'Frontend React Developer - UI/UX Engineering',
    company: 'Razorpay Technologies',
    companyId: 'comp-5',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&h=120&q=80',
    companyVerified: true,
    location: 'Bengaluru, India',
    salaryMin: 15,
    salaryMax: 24,
    salaryDisplay: '₹15,00,000 - ₹24,00,000 LPA',
    experienceLevel: '3-5 Years',
    experienceYearsRequired: 3,
    employmentType: 'Full-time',
    workMode: 'Hybrid',
    industry: 'FinTech',
    category: 'Product & Design',
    description: 'Build slick, accessible, and ultra-reliable merchant dashboards that power over 8 million businesses. Passion for animations, design systems, and frontend performance is key.',
    responsibilities: [
      'Build reusable UI components in React, TypeScript, and Tailwind CSS.',
      'Optimize web performance, Core Web Vitals, and bundle size.',
      'Collaborate with Product Designers to build accessible WCAG AA interfaces.',
      'Integrate frontend state with REST/GraphQL backends.'
    ],
    requiredSkills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML/CSS', 'State Management'],
    preferredSkills: ['Next.js', 'Framer Motion', 'Web Accessibility', 'Storybook'],
    educationRequirements: 'Any Graduate with proven design/engineering portfolio',
    benefits: ['Top-tier ESOPs', 'Wellness Leaves', 'Gadget Allowance', 'Flexible Leave Policy'],
    openings: 2,
    postedDate: '2026-08-29',
    applicationDeadline: '2026-09-28',
    status: 'active',
    applicantCount: 62
  },
  {
    id: 'job-6',
    title: 'SAP MM / SD Associate Consultant',
    company: 'Tata Consultancy Services (TCS)',
    companyId: 'comp-4',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&h=120&q=80',
    companyVerified: true,
    location: 'Hyderabad / Chennai',
    salaryMin: 8,
    salaryMax: 14,
    salaryDisplay: '₹8,00,000 - ₹14,00,000 LPA',
    experienceLevel: '1-3 Years',
    experienceYearsRequired: 1,
    employmentType: 'Full-time',
    workMode: 'Hybrid',
    industry: 'Enterprise ERP',
    category: 'SAP & ERP',
    description: 'Looking for enthusiastic consultants certified in SAP Materials Management (MM) or Sales & Distribution (SD) to support international supply chain transformation implementations.',
    responsibilities: [
      'Configure SAP MM/SD enterprise structure, purchasing, inventory, and billing workflows.',
      'Draft functional specifications for custom ABAP reports and interfaces.',
      'Conduct user acceptance testing (UAT) and end-user training.',
      'Resolve L2/L3 functional issues during rollouts.'
    ],
    requiredSkills: ['SAP MM', 'SAP SD', 'ERP', 'Business Processes', 'Procurement'],
    preferredSkills: ['S/4HANA', 'ABAP Debugging', 'Fiori Apps', 'Integration with FICO'],
    educationRequirements: 'B.Tech / MBA in Supply Chain or SAP Certified',
    benefits: ['Corporate Travel Allowance', 'Higher Education Sponsorship', 'Gratuity'],
    openings: 6,
    postedDate: '2026-08-22',
    applicationDeadline: '2026-10-10',
    status: 'active',
    applicantCount: 45
  },
  {
    id: 'job-7',
    title: 'Cloud DevOps & Site Reliability Engineer (SRE)',
    company: 'Zoho Corporation',
    companyId: 'comp-6',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=120&h=120&q=80',
    companyVerified: true,
    location: 'Chennai / Remote',
    salaryMin: 12,
    salaryMax: 20,
    salaryDisplay: '₹12,00,000 - ₹20,00,000 LPA',
    experienceLevel: '3-5 Years',
    experienceYearsRequired: 3,
    employmentType: 'Full-time',
    workMode: 'Remote',
    industry: 'Cloud Infrastructure',
    category: 'Cloud & DevOps',
    description: 'Help manage Zoho private and public cloud infrastructure supporting 100M+ active users. You will build GitOps pipelines, monitoring dashboards, and disaster recovery automations.',
    responsibilities: [
      'Manage multi-region Kubernetes clusters and bare-metal server infrastructure.',
      'Automate cloud provisioning using Terraform and Ansible.',
      'Build CI/CD pipelines with GitHub Actions and GitLab CI.',
      'Maintain Prometheus, Grafana, and ELK observability stacks.'
    ],
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Bash/Python Scripting', 'Git'],
    preferredSkills: ['Terraform', 'Prometheus', 'Grafana', 'Nginx', 'Networking'],
    educationRequirements: 'Degree in Engineering or Computer Applications',
    benefits: ['Remote Work Stipend', 'Health Benefits', 'Retirement Bonus', 'Catered Meals'],
    openings: 3,
    postedDate: '2026-09-02',
    applicationDeadline: '2026-10-20',
    status: 'active',
    applicantCount: 22
  },
  {
    id: 'job-8',
    title: 'Software Development Engineering Intern (Summer/Winter)',
    company: 'CloudSphere Technologies',
    companyId: 'comp-1',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&h=120&q=80',
    companyVerified: true,
    location: 'Bengaluru, India',
    salaryMin: 3,
    salaryMax: 5,
    salaryDisplay: '₹30,000 - ₹45,000 / Month Internship',
    experienceLevel: 'Fresher',
    experienceYearsRequired: 0,
    employmentType: 'Internship',
    workMode: 'Hybrid',
    industry: 'Software & Tech',
    category: 'Full Stack',
    description: 'Intensive 6-month internship with high PPO (Pre-Placement Offer) conversion rate. Designed specifically for college students and recent graduates who have built full-stack projects.',
    responsibilities: [
      'Collaborate with senior developers on building real customer-facing features.',
      'Write unit tests and documentation.',
      'Participate in sprint planning and daily standups.',
      'Deliver an end-to-end capstone project reviewed by tech leaders.'
    ],
    requiredSkills: ['Python or JavaScript', 'HTML/CSS', 'Git', 'SQL Basics'],
    preferredSkills: ['React', 'Django', 'REST APIs', 'Postman'],
    educationRequirements: 'Pre-final or Final year B.Tech/BCA/MCA students',
    benefits: ['Full PPO Opportunity (₹10 - 14 LPA)', 'Direct 1:1 Mentorship', 'Free Lunch & Transport'],
    openings: 8,
    postedDate: '2026-09-02',
    applicationDeadline: '2026-10-05',
    status: 'active',
    applicantCount: 88
  }
];

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

export const INITIAL_BLOG_POSTS: CareerArticle[] = [
  {
    id: 'blog-1',
    title: 'How to Crack Top Tech Interviews in 2026: The Portfolio-First Strategy',
    category: 'Interview Tips',
    author: 'Sunil Rao, Ex-VP Engineering',
    readTime: '6 min read',
    date: 'Aug 28, 2026',
    summary: 'Why recruiters are shifting away from pure leetcode memorization toward real-world project portfolios, clean GitHub code, and system design clarity.',
    content: `Recruiters at top companies receive hundreds of resumes daily. The candidates who stand out aren't just reciting algorithms—they showcase deployed projects, demonstrable database design choices, and clean code repositories. In this guide, we walk you through how to construct a project portfolio that proves your capabilities immediately.`,
    tags: ['Interviews', 'Portfolio', 'Career Growth', 'Recruitment']
  },
  {
    id: 'blog-2',
    title: 'Top 7 ATS Resume Mistakes That Get 75% of Resumes Screened Out',
    category: 'Resume Tips',
    author: 'Neha Deshmukh, Talent Acquisition Specialist',
    readTime: '5 min read',
    date: 'Aug 24, 2026',
    summary: 'Discover the exact formatting and keyword mismatches that confuse Applicant Tracking Systems (ATS) and how to optimize your score.',
    content: `Most large companies use ATS systems to pre-filter applicants before human eyes ever see a resume. Common pitfalls include multi-column graphic tables, missing standard skill keywords, lack of measurable metrics, and unconventional section titles. Learn how Jobskül ATS templates guarantee 90%+ parse accuracy.`,
    tags: ['Resume', 'ATS', 'Job Search', 'Tips']
  },
  {
    id: 'blog-3',
    title: 'The Rise of Full Stack Python: Why Django & FastAPI Dominate Modern Enterprise',
    category: 'Skill Trends',
    author: 'Karthik Ramanathan, Chief Architect',
    readTime: '7 min read',
    date: 'Aug 19, 2026',
    summary: 'From AI copilot backends to rapid API microservices, see why Python paired with MySQL/Postgres and React is one of the highest-paying skill stacks.',
    content: `Python is no longer just for data scripts. With the rapid expansion of enterprise AI, backend engineering teams require unified stacks where API services, machine learning pipelines, and relational database workflows share common tooling.`,
    tags: ['Python', 'Django', 'FastAPI', 'FullStack']
  }
];
