# Jobskül — Python (Django) & MySQL Backend

**Hire • Train • Deploy**  
*Learn. Build. Showcase. Get Hired.*

This directory contains the production-ready Python backend powered by **Django**, **Django REST Framework (DRF)**, and **MySQL**.

---

## 🛠️ Tech Stack
- **Language**: Python 3.10+
- **Framework**: Django 5.0 + Django REST Framework
- **Database**: MySQL 8.0+
- **Authentication**: JWT (`djangorestframework-simplejwt`) & Django Auth
- **AI Integration**: JobskulHireAI via Google Gemini API (`@google/genai` or `google-genai` Python SDK)

---

## 🚀 Setup & Installation

### 1. Create MySQL Database
Log in to your MySQL terminal and run:
```sql
CREATE DATABASE jobskul_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
You can initialize tables using the provided schema:
```bash
mysql -u root -p jobskul_db < schema.sql
```

### 2. Configure Environment Variables
Create a `.env` file in this directory:
```env
DEBUG=True
SECRET_KEY=jobskul-secret-key-production-change-me
DB_NAME=jobskul_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=127.0.0.1
DB_PORT=3306
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Install Dependencies & Migrate
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### 4. Run Development Server
```bash
python manage.py runserver 0.0.0.0:8000
```
API endpoints will be live at `http://localhost:8000/api/`.

---

## 📋 REST Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register/` | Register candidate or recruiter |
| `POST` | `/api/auth/login/` | JWT token authentication |
| `GET` | `/api/jobs/` | Advanced job search with filters (skill, role, location, salary) |
| `POST` | `/api/jobs/` | Post a new job (Recruiters only) |
| `GET` | `/api/applications/` | Application tracking pipeline |
| `POST` | `/api/applications/` | One-click apply & resume submission |
| `POST` | `/api/interviews/schedule/` | Schedule online/offline interview |
| `POST` | `/api/ai/job-match/` | AI matching score calculation (JobskulHireAI) |
| `POST` | `/api/ai/resume-analyze/` | ATS resume scoring & suggestions |
