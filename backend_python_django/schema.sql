-- =========================================================
-- JOBSKÜL DATABASE SCHEMA (MySQL 8.0+)
-- Hire • Train • Deploy
-- Database Name: jobskul_db
-- =========================================================

CREATE DATABASE IF NOT EXISTS jobskul_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE jobskul_db;

-- 1. Users Table (Candidates, Recruiters, Admins)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('candidate', 'recruiter', 'admin') DEFAULT 'candidate',
    phone VARCHAR(20),
    location VARCHAR(100),
    qualification VARCHAR(150),
    experience_years INT DEFAULT 0,
    headline VARCHAR(255),
    about TEXT,
    skills JSON,
    company_name VARCHAR(150),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    resume_url VARCHAR(255),
    preferred_role VARCHAR(150),
    preferred_location VARCHAR(100),
    expected_salary VARCHAR(50),
    notice_period VARCHAR(50),
    work_preference ENUM('Remote', 'Hybrid', 'Work from office', 'Flexible') DEFAULT 'Hybrid',
    profile_completion INT DEFAULT 70,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_role (role),
    INDEX idx_user_email (email)
) ENGINE=InnoDB;

-- 2. Companies Table
CREATE TABLE IF NOT EXISTS companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    logo_url VARCHAR(255),
    industry VARCHAR(100),
    location VARCHAR(100),
    company_size VARCHAR(50),
    website VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE,
    about TEXT,
    benefits JSON,
    rating DECIMAL(2,1) DEFAULT 4.5,
    reviews_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_company_verified (verified),
    INDEX idx_company_industry (industry)
) ENGINE=InnoDB;

-- 3. Job Listings Table
CREATE TABLE IF NOT EXISTS jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recruiter_id INT NOT NULL,
    company_id INT,
    title VARCHAR(200) NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    location VARCHAR(100) NOT NULL,
    salary_min INT NOT NULL,
    salary_max INT NOT NULL,
    salary_display VARCHAR(100),
    experience_level ENUM('Fresher', '1-3 Years', '3-5 Years', '5-8 Years', '8+ Years') NOT NULL,
    experience_years_required INT DEFAULT 1,
    employment_type ENUM('Full-time', 'Part-time', 'Contract', 'Internship') DEFAULT 'Full-time',
    work_mode ENUM('Remote', 'Hybrid', 'Work from office') DEFAULT 'Hybrid',
    industry VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description LONGTEXT NOT NULL,
    responsibilities JSON,
    required_skills JSON NOT NULL,
    preferred_skills JSON,
    education_requirements VARCHAR(255),
    benefits JSON,
    openings INT DEFAULT 1,
    posted_date DATE,
    application_deadline DATE,
    status ENUM('active', 'pending_approval', 'closed') DEFAULT 'active',
    applicant_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recruiter_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL,
    INDEX idx_job_category (category),
    INDEX idx_job_work_mode (work_mode),
    INDEX idx_job_exp (experience_level),
    INDEX idx_job_status (status),
    FULLTEXT INDEX ft_job_search (title, description, company_name)
) ENGINE=InnoDB;

-- 4. Job Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    candidate_id INT NOT NULL,
    status ENUM('applied', 'application_received', 'under_review', 'shortlisted', 'interview', 'selected', 'rejected') DEFAULT 'applied',
    resume_url VARCHAR(255),
    cover_letter TEXT,
    screening_answers JSON,
    ai_match_score INT DEFAULT 85,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (candidate_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uq_job_candidate (job_id, candidate_id),
    INDEX idx_app_status (status)
) ENGINE=InnoDB;

-- 5. Interviews Table
CREATE TABLE IF NOT EXISTS interviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    interview_date DATE NOT NULL,
    interview_time VARCHAR(50) NOT NULL,
    interview_type ENUM('Technical', 'HR', 'Coding Round', 'Managerial') DEFAULT 'Technical',
    interview_mode ENUM('Online (Google Meet)', 'Online (Zoom)', 'In-Person / Office') DEFAULT 'Online (Google Meet)',
    meeting_link VARCHAR(255),
    interviewer_name VARCHAR(150),
    interviewer_role VARCHAR(150),
    notes TEXT,
    status ENUM('scheduled', 'completed', 'cancelled', 'rescheduled') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Learning Projects & Certificates
CREATE TABLE IF NOT EXISTS learning_projects (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    difficulty ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Intermediate',
    duration VARCHAR(50),
    technology JSON,
    description TEXT,
    learning_objectives JSON,
    architecture TEXT,
    database_design TEXT,
    lessons_count INT DEFAULT 10,
    tasks_count INT DEFAULT 15,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS certificates (
    id VARCHAR(50) PRIMARY KEY,
    user_id INT NOT NULL,
    project_id VARCHAR(50) NOT NULL,
    candidate_name VARCHAR(150) NOT NULL,
    issue_date DATE NOT NULL,
    verification_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES learning_projects(id) ON DELETE CASCADE
) ENGINE=InnoDB;
