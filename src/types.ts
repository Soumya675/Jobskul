export type UserRole = 'candidate' | 'recruiter' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  location?: string;
  avatar?: string;
  qualification?: string;
  experienceYears?: number;
  skills?: string[];
  headline?: string;
  about?: string;
  companyName?: string;
  companyId?: string;
  companyVerified?: boolean;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  preferredRole?: string;
  preferredLocation?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  workPreference?: 'Remote' | 'Hybrid' | 'Work from office' | 'Flexible';
  profileCompletion?: number;
}

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Traineeship';
export type WorkMode = 'Remote' | 'Hybrid' | 'Work from office' | 'On-site';
export type ExperienceLevel = 'Fresher' | '1-3 Years' | '3-5 Years' | '5-8 Years' | '8+ Years';

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyId: string;
  companyLogo?: string;
  companyVerified: boolean;
  location: string;
  salaryMin: number; // in LPA or USDk
  salaryMax: number;
  salaryDisplay: string;
  experienceLevel: ExperienceLevel;
  experienceYearsRequired: number;
  employmentType: EmploymentType;
  workMode: WorkMode;
  industry: string;
  category: string;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  educationRequirements: string;
  benefits: string[];
  openings: number;
  postedDate: string;
  applicationDeadline: string;
  status: 'active' | 'pending_approval' | 'closed';
  applicantCount: number;
}

export type ApplicationStatus =
  | 'applied'
  | 'application_received'
  | 'under_review'
  | 'shortlisted'
  | 'interview'
  | 'selected'
  | 'rejected';

export interface InterviewDetails {
  id: string;
  date: string;
  time: string;
  type: 'Technical' | 'HR' | 'Coding Round' | 'Managerial';
  mode: 'Online (Google Meet)' | 'Online (Zoom)' | 'In-Person / Office';
  meetingLink?: string;
  interviewerName: string;
  interviewerRole: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo?: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  candidateHeadline?: string;
  candidateExperienceYears?: number;
  candidateSkills: string[];
  resumeUrl?: string;
  coverLetter?: string;
  screeningAnswers?: Record<string, string>;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
  interview?: InterviewDetails;
  aiMatchScore?: number;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  size: string;
  website: string;
  verified: boolean;
  about: string;
  benefits: string[];
  rating: number;
  reviewsCount: number;
  openJobsCount: number;
  hiringHistory: string;
}

export interface ProjectLearning {
  id: string;
  title: string;
  category: 'Python' | 'Java' | 'Web Development' | 'React' | 'SAP' | 'AI/ML';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  technology: string[];
  description: string;
  learningObjectives: string[];
  prerequisites: string[];
  architecture: string;
  databaseDesign: string;
  stepByStepGuide: {
    step: number;
    title: string;
    description: string;
    codeSnippet: string;
    explanation: string;
  }[];
  lessonsCount: number;
  tasksCount: number;
  certificateEligible: boolean;
}

export type ProjectTrack = ProjectLearning;

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  coverImage: string;
  author: string;
  date: string;
}

export interface StudentProgress {
  projectId: string;
  completedLessons: number;
  completedTasks: number;
  projectPercentage: number;
  certificateEarned: boolean;
  certificateId?: string;
  issuedAt?: string;
}

export interface CandidateProjectPortfolio {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  role: string;
  features: string[];
  completedDate: string;
  certificateId?: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string[];
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    location: string;
    year: string;
    score: string;
  }[];
  skills: string[];
  projects: {
    id: string;
    title: string;
    technologies: string;
    description: string;
    link?: string;
  }[];
  certifications: string[];
  languages: string[];
}

export interface JobAlert {
  id: string;
  userId: string;
  title: string;
  keywords: string;
  location: string;
  salaryMin?: number;
  experienceLevel?: string;
  frequency: 'Daily' | 'Weekly';
  active: boolean;
  createdAt: string;
}

export type JobCategory =
  | 'Marketing & Sales'
  | 'Software'
  | 'Retail & Products'
  | 'Human Resource'
  | 'Finance'
  | 'Management'
  | 'Customer Help'
  | 'Market Research'
  | string;

export type BlogCategory =
  | 'General Career Tips'
  | 'Career Tips'
  | 'Industry News'
  | 'HR Insights'
  | 'Career Advice'
  | 'Interview Preparation'
  | 'Skill Development'
  | string;

export interface CareerArticle {
  id: string;
  title: string;
  category: BlogCategory;
  author: string;
  readTime: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  coverImage?: string;
}

export interface ServiceEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  audience: 'Corporate' | 'Institution' | 'Individual';
  serviceName: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}
