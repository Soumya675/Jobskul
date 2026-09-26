export type UserRole = 'candidate' | 'recruiter' | 'admin' | 'partner' | 'college';

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
  organization?: string;
  team?: string;
  partnerRole?: 'Super Admin' | 'Partnerships Team' | 'Recruiter' | 'Hiring Manager' | 'Viewer';
  cgpa?: number;
  collegeName?: string;
  graduationYear?: number;
  points?: number;
  streakDays?: number;
  badges?: string[];
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

export interface PlacedCandidate {
  id: string;
  name: string;
  imageUrl?: string;
  company: string;
  companyLogo?: string;
  role: string;
  packageLPA: string;
  college: string;
  batch: string;
  skills: string[];
  story?: string;
  placedDate: string;
  featuredInHero?: boolean;
  verified: boolean;
}

// --- COURSE & LEARNING TYPES ---
export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  videoEmbed?: string;
  pdfNotesUrl?: string;
  summary: string;
  completed?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: CourseLesson[];
  quiz?: {
    id: string;
    title: string;
    questionsCount: number;
    passingScore: number;
  };
  assignment?: {
    id: string;
    title: string;
    instructions: string;
    starterCode?: string;
    dueDays: number;
  };
}

export interface CourseItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    company: string;
  };
  price: number;
  originalPrice: number;
  durationHours: number;
  lessonsCount: number;
  thumbnail: string;
  tags: string[];
  description: string;
  learningOutcomes: string[];
  modules: CourseModule[];
  hasLiveClasses?: boolean;
  certificateEligible: boolean;
}

export interface LiveClassSession {
  id: string;
  courseTitle: string;
  topic: string;
  instructor: string;
  instructorAvatar: string;
  date: string;
  time: string;
  status: 'upcoming' | 'live' | 'completed';
  meetingUrl: string;
  recordingUrl?: string;
  attendeesCount: number;
}

// --- SKILL ASSESSMENT & PRACTICE LAB TYPES ---
export interface AssessmentQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  acceptanceRate: string;
  description: string;
  starterCode: {
    javascript: string;
    python: string;
    sql?: string;
  };
  sampleTestCases: {
    input: string;
    expectedOutput: string;
  }[];
  hints: string[];
}

export interface SkillGapAnalysis {
  targetRole: string;
  readinessScore: number;
  strongSkills: { skill: string; score: number }[];
  gapSkills: { skill: string; currentScore: number; requiredScore: number; recommendedCourse: string }[];
  aiAdvice: string;
}

// --- PLACEMENT DRIVE & TRACKING ---
export interface PlacementDrive {
  id: string;
  companyName: string;
  companyLogo?: string;
  role: string;
  driveType: 'Campus Drive' | 'Off-Campus Drive' | 'Pool Drive' | 'Referral';
  packageLPA: string;
  location: string;
  minCGPA: number;
  eligibleBatches: string[];
  deadline: string;
  driveDate: string;
  openings: number;
  registeredCount: number;
  hiringProcess: string[];
  skillsRequired: string[];
  status: 'Upcoming' | 'Registration Open' | 'Ongoing' | 'Completed';
}

export interface StudentPlacementStage {
  stage: 'Applied' | 'Shortlisted' | 'Assessment Test' | 'Technical Round 1' | 'HR Interview' | 'Offer Issued' | 'Rejected';
  completed: boolean;
  current: boolean;
  date?: string;
  score?: string;
  notes?: string;
}

export interface ApplicationTrackerItem {
  id: string;
  company: string;
  role: string;
  appliedDate: string;
  currentStage: string;
  packageLPA: string;
  stages: StudentPlacementStage[];
  nextAction?: string;
  actionDeadline?: string;
}

// --- PARTNER / JOBSKUL HIREAI RECRUITMENT TYPES ---
export type PartnerPositionStatus = 'Draft' | 'Open' | 'On Hold' | 'Closed' | 'Archived';
export type JDRequestStatus = 'Pending' | 'In Review' | 'Approved' | 'Rejected' | 'Completed';

export interface PartnerPosition {
  id: string;
  jobId: string;
  title: string;
  company: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  experience: string;
  salaryRange: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  openings: number;
  status: PartnerPositionStatus;
  createdDate: string;
  deadline: string;
  assignedRecruiter: string;
  applicantsCount: number;
  shortlistedCount: number;
  interviewCount: number;
}

export interface JDRequest {
  id: string;
  requestNumber: string;
  clientName: string;
  jobTitle: string;
  department: string;
  location: string;
  experienceRequired: string;
  salaryMin: number;
  salaryMax: number;
  openings: number;
  requiredSkills: string[];
  jobDescription: string;
  responsibilities: string;
  status: JDRequestStatus;
  requestedBy: string;
  assignedTo?: string;
  createdDate: string;
  approvedDate?: string;
  convertedPositionId?: string;
  feedback?: string;
}

export interface PartnerInterview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  positionTitle: string;
  company: string;
  interviewerName: string;
  date: string;
  time: string;
  interviewType: 'Technical' | 'HR' | 'System Design' | 'Managerial';
  meetingLink: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled' | 'No Show';
  notes?: string;
  feedback?: string;
  rating?: number;
}

// --- MENTORSHIP & COMMUNITY TYPES ---
export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  experienceYears: number;
  expertise: string[];
  hourlyRate: string;
  rating: number;
  sessionsCompleted: number;
  bio: string;
  availableDays: string[];
}

export interface ForumTopic {
  id: string;
  title: string;
  category: 'Tech Doubts' | 'LeetCode & DSA' | 'Interview Experiences' | 'Resume Review' | 'Alumni Network';
  author: {
    name: string;
    avatar?: string;
    role: string;
    college?: string;
  };
  content: string;
  tags: string[];
  createdAt: string;
  upvotes: number;
  repliesCount: number;
  isSolved: boolean;
  replies?: {
    id: string;
    author: string;
    role: string;
    avatar?: string;
    text: string;
    createdAt: string;
    isAcceptedSolution?: boolean;
  }[];
}

// --- PAYMENTS & BILLING ---
export interface PaymentHistoryItem {
  id: string;
  invoiceNumber: string;
  date: string;
  description: string;
  planOrCourse: string;
  amount: number;
  tax: number;
  total: number;
  status: 'Paid' | 'Processing' | 'Refunded';
  pdfDownloadUrl?: string;
}

