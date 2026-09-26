import React, { useState } from 'react';
import { CourseItem, CourseLesson, LiveClassSession, User } from '../types';
import {
  BookOpen,
  Video,
  FileText,
  Play,
  CheckCircle2,
  Clock,
  Award,
  Users,
  Star,
  ChevronRight,
  Download,
  Calendar,
  Sparkles,
  ExternalLink,
  Search,
  Filter,
  Check,
  X,
  Radio,
  Share2
} from 'lucide-react';

interface CourseLearningHubProps {
  courses: CourseItem[];
  liveClasses: LiveClassSession[];
  currentUser: User | null;
  onEnrollCourse?: (course: CourseItem) => void;
  onNavigateToJobs?: () => void;
  onNavigateToAssessment?: () => void;
}

export const CourseLearningHub: React.FC<CourseLearningHubProps> = ({
  courses,
  liveClasses,
  currentUser,
  onEnrollCourse,
  onNavigateToJobs,
  onNavigateToAssessment
}) => {
  const [activeTab, setActiveTab] = useState<'all-courses' | 'live-classes' | 'my-learning'>('all-courses');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected course for detailed view or video playback
  const [activeCourse, setActiveCourse] = useState<CourseItem | null>(null);
  const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([
    'course-fs-python',
    'course-genai-data'
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const categories = ['All', 'Full Stack Engineering', 'AI & Data Science', 'Competitive Programming', 'Enterprise ERP'];

  const filteredCourses = courses.filter((c) => {
    if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        c.title.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.description.toLowerCase().includes(q) ||
        c.instructor.name.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));

  const handleEnroll = (course: CourseItem) => {
    if (!enrolledCourseIds.includes(course.id)) {
      setEnrolledCourseIds([...enrolledCourseIds, course.id]);
      showToast(`Enrolled successfully in ${course.title}!`);
    } else {
      showToast(`You are already enrolled. Continuing course...`);
    }
    setActiveCourse(course);
    if (course.modules[0]?.lessons[0]) {
      setActiveLesson(course.modules[0].lessons[0]);
    }
    if (onEnrollCourse) onEnrollCourse(course);
  };

  const handleOpenVideoLesson = (course: CourseItem, lesson: CourseLesson) => {
    setActiveCourse(course);
    setActiveLesson(lesson);
    setVideoModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-geometric-mono font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>LEARN • PRACTICE • GET PLACED</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Industry-Grade Video Courses, Live Cohorts & Placements
          </h1>
          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            Curated by enterprise staff architects and FAANG leaders. Learn high-demand technologies,
            attend live interactive doubt-solving masterclasses, download structured PDF notes, and crack direct corporate hiring drives.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('all-courses')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all-courses'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Explore 4+ Verified Courses
            </button>
            <button
              onClick={() => setActiveTab('live-classes')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'live-classes'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
              <span>Live Classes & Recordings</span>
            </button>
            <button
              onClick={() => setActiveTab('my-learning')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'my-learning'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              My Enrolled Learning ({enrolledCourseIds.length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: ALL COURSES */}
      {activeTab === 'all-courses' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, instructors..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.includes(course.id);
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col group"
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-xs text-white text-[10px] font-geometric-mono font-bold px-2.5 py-1 rounded-md">
                      {course.category}
                    </div>
                    {course.hasLiveClasses && (
                      <div className="absolute top-3 right-3 bg-rose-600/95 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center space-x-1">
                        <Radio className="w-3 h-3 animate-pulse" />
                        <span>Live Cohort Included</span>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-medium text-slate-300">Instructor: {course.instructor.name}</p>
                      <p className="text-[11px] text-slate-400 font-geometric-mono">{course.instructor.role}</p>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center space-x-1 font-bold text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{course.rating}</span>
                          <span className="text-slate-400 font-normal">({course.reviewsCount})</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{course.durationHours} Hours • {course.lessonsCount} Lessons</span>
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {course.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-lg font-black text-slate-900">₹{course.price.toLocaleString()}</span>
                          <span className="text-xs text-slate-400 line-through">₹{course.originalPrice.toLocaleString()}</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600">66% Off Career Subsidy</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setActiveCourse(course);
                            if (course.modules[0]?.lessons[0]) {
                              setActiveLesson(course.modules[0].lessons[0]);
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          View Syllabus
                        </button>
                        <button
                          onClick={() => handleEnroll(course)}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                            isEnrolled
                              ? 'bg-emerald-600 text-white shadow-2xs hover:bg-emerald-700'
                              : 'bg-blue-600 text-white shadow-2xs hover:bg-blue-700'
                          }`}
                        >
                          {isEnrolled ? (
                            <>
                              <Play className="w-3 h-3 fill-white" />
                              <span>Resume Course</span>
                            </>
                          ) : (
                            <>
                              <span>Enroll Now</span>
                              <ChevronRight className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE CLASSES & RECORDED SESSIONS */}
      {activeTab === 'live-classes' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2">
                  <Radio className="w-5 h-5 text-rose-600 animate-pulse" />
                  <span>Live Interactive Cohort Schedule</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Attend live video classes with senior corporate architects, ask live doubts, and access high-definition recorded archives anytime.
                </p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200/80">
                Google Meet Live Powered
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {liveClasses.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-geometric-mono font-bold uppercase tracking-wider ${
                          item.status === 'upcoming'
                            ? 'bg-amber-100 text-amber-800'
                            : item.status === 'live'
                            ? 'bg-rose-100 text-rose-700 animate-pulse'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.status === 'upcoming' ? 'Scheduled Live' : item.status === 'live' ? 'LIVE NOW' : 'Recorded Archive'}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.attendeesCount} Students</span>
                      </span>
                    </div>

                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                      {item.courseTitle}
                    </p>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.topic}
                    </h4>

                    <div className="flex items-center space-x-2.5 pt-1">
                      <img
                        src={item.instructorAvatar}
                        alt={item.instructor}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div className="text-[11px]">
                        <p className="font-bold text-slate-900 leading-none">{item.instructor}</p>
                        <p className="text-slate-500 text-[10px]">{item.date} • {item.time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    {item.status === 'completed' && item.recordingUrl ? (
                      <button
                        onClick={() => {
                          setActiveLesson({
                            id: item.id,
                            title: item.topic,
                            duration: item.time,
                            videoEmbed: item.recordingUrl,
                            summary: `Recorded masterclass on ${item.topic} with ${item.instructor}`
                          });
                          setVideoModalOpen(true);
                        }}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Watch Recording</span>
                      </button>
                    ) : (
                      <a
                        href={item.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Live Classroom</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MY LEARNING */}
      {activeTab === 'my-learning' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
            <h2 className="text-lg font-black text-slate-900 mb-4">
              My Active Enrolled Courses ({enrolledCourses.length})
            </h2>

            {enrolledCourses.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-semibold">You have not enrolled in any courses yet.</p>
                <button
                  onClick={() => setActiveTab('all-courses')}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Browse Available Courses
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                          {c.category}
                        </span>
                        <span className="text-xs font-bold text-emerald-600">65% Completed</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900">{c.title}</h3>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-emerald-500 h-2 rounded-full w-[65%]" />
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                        <span>32 of {c.lessonsCount} lessons finished</span>
                        <span>12 Quizzes Completed</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setActiveCourse(c);
                          if (c.modules[0]?.lessons[0]) {
                            setActiveLesson(c.modules[0].lessons[0]);
                          }
                          setVideoModalOpen(true);
                        }}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Continue Playing</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveCourse(c);
                          setQuizModalOpen(true);
                        }}
                        className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                        title="Take Module Quiz"
                      >
                        Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* COURSE SYLLABUS / DETAIL DRAWER MODAL */}
      {activeCourse && !videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-geometric-mono font-bold uppercase">
                  {activeCourse.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{activeCourse.title}</h2>
                <p className="text-xs text-slate-500 mt-1">Instructor: {activeCourse.instructor.name} ({activeCourse.instructor.company})</p>
              </div>
              <button
                onClick={() => setActiveCourse(null)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Learning Outcomes */}
            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>What You Will Master:</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {activeCourse.learningOutcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modules Syllabus */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">Curriculum & Video Lessons</h4>
              {activeCourse.modules.map((mod, modIdx) => (
                <div key={mod.id} className="border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                    <span>{mod.title}</span>
                    <span className="text-slate-400 font-normal">{mod.duration}</span>
                  </div>

                  <div className="space-y-2">
                    {mod.lessons.map((les) => (
                      <div
                        key={les.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors text-xs"
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <button
                            onClick={() => handleOpenVideoLesson(activeCourse, les)}
                            className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 hover:bg-blue-700"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                          </button>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-800 truncate">{les.title}</p>
                            <p className="text-[11px] text-slate-400">{les.duration}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          {les.pdfNotesUrl && (
                            <button
                              onClick={() => showToast(`Downloaded PDF Lecture Notes for ${les.title}`)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-white"
                              title="Download PDF Notes"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                          {les.completed && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Module Quiz & Assignment triggers */}
                  <div className="pt-2 flex items-center gap-3">
                    {mod.quiz && (
                      <button
                        onClick={() => setQuizModalOpen(true)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Take {mod.quiz.title} ({mod.quiz.questionsCount} MCQs)</span>
                      </button>
                    )}
                    {mod.assignment && (
                      <button
                        onClick={() => setAssignmentModalOpen(true)}
                        className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center space-x-1"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Submit Project Assignment</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveCourse(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleEnroll(activeCourse);
                  if (activeCourse.modules[0]?.lessons[0]) {
                    handleOpenVideoLesson(activeCourse, activeCourse.modules[0].lessons[0]);
                  }
                }}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md"
              >
                Start Learning Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO PLAYER MODAL WITH LESSON LIST & NOTES */}
      {videoModalOpen && activeLesson && activeCourse && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col shadow-2xl border border-slate-800">
            {/* Modal Header */}
            <div className="p-4 sm:px-6 flex items-center justify-between border-b border-slate-800 bg-slate-900/90">
              <div className="min-w-0 pr-4">
                <span className="text-[10px] font-geometric-mono text-blue-400 font-bold uppercase">
                  {activeCourse.title}
                </span>
                <h3 className="text-sm sm:text-base font-bold truncate text-white">
                  {activeLesson.title}
                </h3>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Viewport & Lesson Sidebar */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
              {/* Video Player (8 cols) */}
              <div className="lg:col-span-8 bg-black flex flex-col justify-center">
                <div className="relative aspect-video w-full bg-slate-950">
                  {activeLesson.videoEmbed ? (
                    <iframe
                      src={activeLesson.videoEmbed}
                      title={activeLesson.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                      <Play className="w-12 h-12 mb-2 text-slate-600" />
                      <p className="text-sm font-semibold text-slate-300">Streaming Interactive HD Lecture</p>
                      <p className="text-xs text-slate-500 mt-1">{activeLesson.summary}</p>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-900 space-y-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Duration: {activeLesson.duration}</span>
                    <button
                      onClick={() => showToast(`Downloaded PDF Reference Notes for ${activeLesson.title}`)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF Notes</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{activeLesson.summary}</p>
                </div>
              </div>

              {/* Lesson Playlist Sidebar (4 cols) */}
              <div className="lg:col-span-4 bg-slate-900/95 border-l border-slate-800 p-4 space-y-3 overflow-y-auto max-h-[500px] lg:max-h-none">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-geometric-mono">
                  Course Lessons
                </h4>
                <div className="space-y-1.5">
                  {activeCourse.modules.flatMap((m) => m.lessons).map((les, i) => (
                    <button
                      key={les.id}
                      onClick={() => setActiveLesson(les)}
                      className={`w-full text-left p-3 rounded-xl text-xs transition-colors flex items-start space-x-2.5 cursor-pointer ${
                        activeLesson.id === les.id
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px] shrink-0">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate leading-snug">{les.title}</p>
                        <p className="text-[10px] opacity-75">{les.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <button
                    onClick={() => {
                      setVideoModalOpen(false);
                      setQuizModalOpen(true);
                    }}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
                  >
                    Take Chapter Quiz
                  </button>
                  <button
                    onClick={() => {
                      setVideoModalOpen(false);
                      setAssignmentModalOpen(true);
                    }}
                    className="w-full py-2 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 rounded-xl text-xs font-bold transition-colors"
                  >
                    Submit Project Assignment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUIZ MODAL */}
      {quizModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-geometric-mono text-blue-600 font-bold uppercase">
                  Module Evaluation Quiz
                </span>
                <h3 className="text-base font-bold text-slate-900">Python Architecture & Concurrency Test</h3>
              </div>
              <button onClick={() => setQuizModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  q: 'Which asyncio primitive allows waiting for multiple coroutines concurrently and returns their results in order?',
                  options: ['asyncio.sleep()', 'asyncio.gather()', 'asyncio.run_forever()', 'asyncio.lock()'],
                  correct: 1
                },
                {
                  id: 2,
                  q: 'In relational databases, what does an execution plan with "Seq Scan" mean?',
                  options: ['The index was fully utilized', 'The database engine read every single row in the table sequentially', 'The query was resolved purely from buffer cache', 'Deadlock was detected'],
                  correct: 1
                }
              ].map((item, idx) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="text-xs font-bold text-slate-900">Q{idx + 1}: {item.q}</p>
                  <div className="space-y-1.5">
                    {item.options.map((opt, optIdx) => (
                      <label
                        key={optIdx}
                        className={`flex items-center space-x-2 p-2 rounded-lg text-xs cursor-pointer border ${
                          quizAnswers[item.id] === optIdx
                            ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`quiz-${item.id}`}
                          checked={quizAnswers[item.id] === optIdx}
                          onChange={() => setQuizAnswers({ ...quizAnswers, [item.id]: optIdx })}
                          className="text-blue-600"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {quizSubmitted ? (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Quiz Passed! Score: 100%</h4>
                <p className="text-xs text-emerald-700">XP points +50 added to your Student Profile Leaderboard.</p>
              </div>
            ) : null}

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setQuizModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Close
              </button>
              {!quizSubmitted && (
                <button
                  onClick={() => {
                    setQuizSubmitted(true);
                    showToast('Quiz submitted! +50 XP awarded.');
                  }}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
                >
                  Submit Answers
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ASSIGNMENT MODAL */}
      {assignmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-geometric-mono text-purple-600 font-bold uppercase">
                  Capstone Assignment Submission
                </span>
                <h3 className="text-base font-bold text-slate-900">High-Concurrency Web Crawler with Rate Limiting</h3>
              </div>
              <button onClick={() => setAssignmentModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Paste your GitHub repository link or code snippet below. Our automated test runner and mentor panel will evaluate your submission for code quality and test coverage.
            </p>

            <textarea
              rows={4}
              value={assignmentText}
              onChange={(e) => setAssignmentText(e.target.value)}
              placeholder="https://github.com/my-profile/async-rate-limited-crawler or paste code..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-geometric-mono focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />

            {assignmentSubmitted && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Assignment received! Mentor review status: In Progress.</span>
              </div>
            )}

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setAssignmentModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
              {!assignmentSubmitted && (
                <button
                  onClick={() => {
                    setAssignmentSubmitted(true);
                    showToast('Assignment submitted for mentor review!');
                  }}
                  className="px-5 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700"
                >
                  Submit for Evaluation
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
