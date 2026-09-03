from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('candidate', 'Candidate'),
        ('recruiter', 'Recruiter'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='candidate')
    phone = models.CharField(max_length=20, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    qualification = models.CharField(max_length=150, blank=True, null=True)
    experience_years = models.IntegerField(default=0)
    headline = models.CharField(max_length=255, blank=True, null=True)
    about = models.TextField(blank=True, null=True)
    skills = models.JSONField(default=list, blank=True)
    company_name = models.CharField(max_length=150, blank=True, null=True)
    github_url = models.URLField(max_length=255, blank=True, null=True)
    linkedin_url = models.URLField(max_length=255, blank=True, null=True)
    portfolio_url = models.URLField(max_length=255, blank=True, null=True)
    resume_url = models.CharField(max_length=255, blank=True, null=True)
    preferred_role = models.CharField(max_length=150, blank=True, null=True)
    preferred_location = models.CharField(max_length=100, blank=True, null=True)
    expected_salary = models.CharField(max_length=50, blank=True, null=True)
    notice_period = models.CharField(max_length=50, blank=True, null=True)
    work_preference = models.CharField(
        max_length=50,
        choices=(
            ('Remote', 'Remote'),
            ('Hybrid', 'Hybrid'),
            ('Work from office', 'Work from office'),
            ('Flexible', 'Flexible')
        ),
        default='Hybrid'
    )
    profile_completion = models.IntegerField(default=70)

    class Meta:
        db_table = 'users'

class Company(models.Model):
    name = models.CharField(max_length=150)
    logo_url = models.URLField(max_length=255, blank=True, null=True)
    industry = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    company_size = models.CharField(max_length=50)
    website = models.URLField(max_length=255, blank=True, null=True)
    verified = models.BooleanField(default=False)
    about = models.TextField()
    benefits = models.JSONField(default=list, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.5)
    reviews_count = models.IntegerField(default=0)

    class Meta:
        db_table = 'companies'

class Job(models.Model):
    recruiter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posted_jobs')
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=200)
    company_name = models.CharField(max_length=150)
    location = models.CharField(max_length=100)
    salary_min = models.IntegerField()
    salary_max = models.IntegerField()
    salary_display = models.CharField(max_length=100)
    experience_level = models.CharField(max_length=50)
    experience_years_required = models.IntegerField(default=1)
    employment_type = models.CharField(max_length=50, default='Full-time')
    work_mode = models.CharField(max_length=50, default='Hybrid')
    industry = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    description = models.TextField()
    responsibilities = models.JSONField(default=list, blank=True)
    required_skills = models.JSONField(default=list)
    preferred_skills = models.JSONField(default=list, blank=True)
    education_requirements = models.CharField(max_length=255, blank=True, null=True)
    benefits = models.JSONField(default=list, blank=True)
    openings = models.IntegerField(default=1)
    posted_date = models.DateField(auto_now_add=True)
    application_deadline = models.DateField()
    status = models.CharField(max_length=30, default='active')
    applicant_count = models.IntegerField(default=0)

    class Meta:
        db_table = 'jobs'

class Application(models.Model):
    STATUS_CHOICES = (
        ('applied', 'Applied'),
        ('application_received', 'Application Received'),
        ('under_review', 'Under Review'),
        ('shortlisted', 'Shortlisted'),
        ('interview', 'Interview'),
        ('selected', 'Selected'),
        ('rejected', 'Rejected'),
    )
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    candidate = models.ForeignKey(User, on_delete=models.CASCADE, related_name='job_applications')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='applied')
    resume_url = models.CharField(max_length=255, blank=True, null=True)
    cover_letter = models.TextField(blank=True, null=True)
    screening_answers = models.JSONField(default=dict, blank=True)
    ai_match_score = models.IntegerField(default=85)
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'applications'
        unique_together = ('job', 'candidate')

class Interview(models.Model):
    application = models.OneToOneField(Application, on_delete=models.CASCADE, related_name='interview')
    interview_date = models.DateField()
    interview_time = models.CharField(max_length=50)
    interview_type = models.CharField(max_length=50, default='Technical')
    interview_mode = models.CharField(max_length=100, default='Online (Google Meet)')
    meeting_link = models.URLField(max_length=255, blank=True, null=True)
    interviewer_name = models.CharField(max_length=150)
    interviewer_role = models.CharField(max_length=150)
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=30, default='scheduled')

    class Meta:
        db_table = 'interviews'
