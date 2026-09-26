import {
  CourseItem,
  LiveClassSession,
  AssessmentQuestion,
  CodingProblem,
  PlacementDrive,
  ApplicationTrackerItem,
  PartnerPosition,
  JDRequest,
  PartnerInterview,
  Mentor,
  ForumTopic,
  PaymentHistoryItem
} from '../types';

// ==========================================
// 1. COURSES & LEARNING DATA
// ==========================================
export const INITIAL_COURSES: CourseItem[] = [
  {
    id: 'course-fs-python',
    title: 'Full Stack Python & Enterprise Cloud Architecture',
    slug: 'full-stack-python-cloud',
    category: 'Full Stack Engineering',
    level: 'Intermediate',
    rating: 4.9,
    reviewsCount: 1420,
    enrolledCount: 4890,
    instructor: {
      name: 'Dr. Rajesh K. Nair',
      role: 'Ex-Google Staff Engineer & Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      company: 'Google Cloud Certified Fellow'
    },
    price: 4999,
    originalPrice: 14999,
    durationHours: 64,
    lessonsCount: 48,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    tags: ['Python 3.12', 'Django REST', 'React 19', 'PostgreSQL', 'Docker', 'AWS'],
    description: 'Master industry-grade full-stack web engineering from database schema design, asynchronous workers, and RESTful APIs to containerization, CI/CD, and production deployment on AWS.',
    learningOutcomes: [
      'Design high-throughput REST APIs using Django REST framework & FastAPI',
      'Architect relational database schemas with indexing and query optimization',
      'Build responsive, production-ready React SPAs with state management',
      'Containerize microservices with Docker and deploy to AWS Elastic Beanstalk',
      'Build full real-world production projects required for top hiring partner placements'
    ],
    certificateEligible: true,
    hasLiveClasses: true,
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Advanced Python & Asynchronous Patterns',
        duration: '12 Hours',
        lessons: [
          {
            id: 'les-1-1',
            title: '1.1 Deep Dive into Python Metaclasses & Generators',
            duration: '45 mins',
            videoEmbed: 'https://www.youtube-nocookie.com/embed/rfscVS0vtbw',
            pdfNotesUrl: '#download-notes-1',
            summary: 'Understanding iterators, yield expressions, memory profiling, and custom metaclasses for ORM design.',
            completed: true
          },
          {
            id: 'les-1-2',
            title: '1.2 Asyncio Event Loops & Concurrent Task Execution',
            duration: '52 mins',
            videoEmbed: 'https://www.youtube-nocookie.com/embed/tSLdcG1kSWA',
            pdfNotesUrl: '#download-notes-2',
            summary: 'Mastering async/await, non-blocking I/O operations, aiohttp client pooling, and asyncio.gather().',
            completed: true
          }
        ],
        quiz: {
          id: 'quiz-mod-1',
          title: 'Advanced Python Architecture Quiz',
          questionsCount: 10,
          passingScore: 80
        },
        assignment: {
          id: 'assign-mod-1',
          title: 'High-Concurrency Web Crawler with Rate Limiting',
          instructions: 'Implement an asynchronous scraper that respects robots.txt and employs a token bucket rate limiter.',
          dueDays: 4
        }
      },
      {
        id: 'mod-2',
        title: 'Module 2: Enterprise Relational Database Modeling & Indexing',
        duration: '14 Hours',
        lessons: [
          {
            id: 'les-2-1',
            title: '2.1 B-Tree vs Hash Indexing in PostgreSQL and MySQL',
            duration: '58 mins',
            videoEmbed: 'https://www.youtube-nocookie.com/embed/HUBEzKbFL7E',
            pdfNotesUrl: '#download-notes-3',
            summary: 'Detailed inspection of EXPLAIN ANALYZE execution trees, index scans vs sequential scans, and composite index ordering.',
            completed: true
          },
          {
            id: 'les-2-2',
            title: '2.2 ACID Transactions, Isolation Levels & Deadlock Resolution',
            duration: '60 mins',
            videoEmbed: 'https://www.youtube-nocookie.com/embed/5bId3N7QZec',
            pdfNotesUrl: '#download-notes-4',
            summary: 'Row-level locking, optimistic concurrency control, and MVCC internals in enterprise workloads.',
            completed: false
          }
        ],
        quiz: {
          id: 'quiz-mod-2',
          title: 'SQL Indexing & Transaction Internals Test',
          questionsCount: 12,
          passingScore: 75
        },
        assignment: {
          id: 'assign-mod-2',
          title: 'Database Normalization & Query Tuning Benchmark',
          instructions: 'Refactor an unindexed 1M row e-commerce order table to bring p99 query latency from 850ms down to under 12ms.',
          dueDays: 5
        }
      },
      {
        id: 'mod-3',
        title: 'Module 3: React 19 Frontend & State Architecture',
        duration: '18 Hours',
        lessons: [
          {
            id: 'les-3-1',
            title: '3.1 Modern React Patterns, Server Actions & Transitions',
            duration: '65 mins',
            videoEmbed: 'https://www.youtube-nocookie.com/embed/8pDqJVdNa44',
            pdfNotesUrl: '#download-notes-5',
            summary: 'Leveraging concurrent features, useTransition, useDeferredValue, and custom hooks for performant UI rendering.',
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'course-genai-data',
    title: 'Generative AI & Data Science Placement Bootcamp',
    slug: 'genai-data-science',
    category: 'AI & Data Science',
    level: 'All Levels',
    rating: 4.95,
    reviewsCount: 980,
    enrolledCount: 3410,
    instructor: {
      name: 'Ananya Deshmukh',
      role: 'Principal AI Scientist',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
      company: 'Ex-Amazon AI Labs'
    },
    price: 5499,
    originalPrice: 16999,
    durationHours: 56,
    lessonsCount: 42,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    tags: ['Gemini API', 'LangChain', 'Vector DB', 'PyTorch', 'Fine-Tuning', 'FastAPI'],
    description: 'Build enterprise GenAI copilots, retrieval augmented generation (RAG) pipelines, multimodal document search, and agentic workflows with hands-on coding.',
    learningOutcomes: [
      'Implement production-ready RAG with Pinecone, ChromaDB & hybrid search',
      'Deploy Gemini 2.5 Flash agents with function calling and external tool invocation',
      'Optimize LLM inference costs and latency using caching and prompt chaining',
      'Build full-stack AI career and resume evaluation agents'
    ],
    certificateEligible: true,
    hasLiveClasses: true,
    modules: [
      {
        id: 'mod-ai-1',
        title: 'Module 1: Large Language Model Foundations & Prompt Engineering',
        duration: '10 Hours',
        lessons: [
          {
            id: 'les-ai-1',
            title: '1.1 Transformer Attention Mechanisms & Tokenization',
            duration: '50 mins',
            videoEmbed: 'https://www.youtube-nocookie.com/embed/zjkBMFhNj_g',
            pdfNotesUrl: '#download-ai-notes-1',
            summary: 'Self-attention math, embedding spaces, and context window economics in Gemini and modern foundation models.',
            completed: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-dsa-faang',
    title: 'Data Structures, Algorithms & System Design Masterclass',
    slug: 'dsa-system-design',
    category: 'Competitive Programming',
    level: 'Intermediate',
    rating: 4.88,
    reviewsCount: 2150,
    enrolledCount: 7100,
    instructor: {
      name: 'Vikramaditya Verma',
      role: 'Staff Engineer & ICPC Regionalist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      company: 'FAANG Interviewer Panelist'
    },
    price: 3999,
    originalPrice: 12999,
    durationHours: 72,
    lessonsCount: 60,
    thumbnail: 'https://images.unsplash.com/photo-1516116211227-bbc0429f5f02?w=800',
    tags: ['Graphs', 'Dynamic Programming', 'Trie', 'Distributed Systems', 'Caching', 'Kafka'],
    description: 'Ace product company technical screening rounds with deep coverage of 250+ standard coding problems and low-level / high-level system design patterns.',
    learningOutcomes: [
      'Master Dynamic Programming with tabulation, memoization, and space reduction',
      'Solve Hard graph problems: Dijkstra, Bellman-Ford, Tarjan SCC & Topo sort',
      'Design scalable distributed architectures: Rate Limiters, URL Shorteners, WhatsApp chat'
    ],
    certificateEligible: true,
    hasLiveClasses: true,
    modules: [
      {
        id: 'mod-dsa-1',
        title: 'Module 1: Advanced Tree & Graph Algorithms',
        duration: '16 Hours',
        lessons: [
          {
            id: 'les-dsa-1',
            title: '1.1 Segment Trees & Fenwick Trees for Range Queries',
            duration: '55 mins',
            videoEmbed: 'https://www.youtube-nocookie.com/embed/CN0EvXkWZZc',
            pdfNotesUrl: '#download-dsa-notes',
            summary: 'Point updates, range minimum queries, and lazy propagation for competitive programming.',
            completed: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-sap-enterprise',
    title: 'SAP S/4HANA Enterprise Systems & ERP Placement Track',
    slug: 'sap-s4hana-erp',
    category: 'Enterprise ERP',
    level: 'Beginner',
    rating: 4.85,
    reviewsCount: 650,
    enrolledCount: 1820,
    instructor: {
      name: 'Sunil Senapati',
      role: 'Principal SAP Solutions Architect',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      company: 'Deloitte Consulting'
    },
    price: 5999,
    originalPrice: 17999,
    durationHours: 48,
    lessonsCount: 36,
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    tags: ['SAP MM', 'SAP SD', 'FICO Basics', 'Procure-to-Pay', 'Order-to-Cash', 'S/4HANA'],
    description: 'Job-oriented training for SAP functional consultants with direct placement drives across IT services and manufacturing conglomerates.',
    learningOutcomes: [
      'Configure organizational enterprise structures in SAP GUI and Fiori',
      'Execute complete Procure-to-Pay (P2P) and Order-to-Cash (O2C) lifecycles',
      'Prepare for SAP Certified Associate credential and corporate interviews'
    ],
    certificateEligible: true,
    hasLiveClasses: true,
    modules: [
      {
        id: 'mod-sap-1',
        title: 'Module 1: Enterprise Structure & Master Data Setup',
        duration: '10 Hours',
        lessons: [
          {
            id: 'les-sap-1',
            title: '1.1 Defining Plants, Storage Locations & Purchasing Organizations',
            duration: '50 mins',
            videoEmbed: 'https://www.youtube-nocookie.com/embed/v8T_c-30_bY',
            pdfNotesUrl: '#download-sap-notes',
            summary: 'Step-by-step SPRO configuration for multi-location manufacturing clients.',
            completed: true
          }
        ]
      }
    ]
  }
];

// ==========================================
// 2. LIVE CLASSES & RECORDED SESSIONS
// ==========================================
export const INITIAL_LIVE_CLASSES: LiveClassSession[] = [
  {
    id: 'live-1',
    courseTitle: 'Full Stack Python & Enterprise Cloud Architecture',
    topic: 'Live System Design: Building a High-Throughput Notification Gateway (Kafka + Redis)',
    instructor: 'Dr. Rajesh K. Nair',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    date: 'Today, 06:30 PM IST',
    time: '6:30 PM - 8:00 PM',
    status: 'upcoming',
    meetingUrl: 'https://meet.google.com/jbs-live-code',
    attendeesCount: 284
  },
  {
    id: 'live-2',
    courseTitle: 'Generative AI & Data Science Placement Bootcamp',
    topic: 'Multimodal RAG with Vector Search & Gemini 2.5 Flash Live Demo',
    instructor: 'Ananya Deshmukh',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    date: 'Tomorrow, 07:00 PM IST',
    time: '7:00 PM - 8:30 PM',
    status: 'upcoming',
    meetingUrl: 'https://meet.google.com/jbs-genai-lab',
    attendeesCount: 340
  },
  {
    id: 'live-3',
    courseTitle: 'Data Structures, Algorithms & System Design',
    topic: 'Recorded: Graph Hard Problems - Bridges, Articulation Points & Tarjan Algorithm',
    instructor: 'Vikramaditya Verma',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    date: 'Sep 10, 2026',
    time: 'Recorded • 92 Mins',
    status: 'completed',
    meetingUrl: '#',
    recordingUrl: 'https://www.youtube-nocookie.com/embed/rfscVS0vtbw',
    attendeesCount: 412
  }
];

// ==========================================
// 3. SKILL ASSESSMENT & MCQ QUESTIONS
// ==========================================
export const INITIAL_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q-tech-1',
    question: 'In a high-load relational database, which scenario will most likely cause a sequential table scan even when an index exists on the searched column?',
    options: [
      'Searching using an exact equality condition (WHERE id = 502)',
      'Applying a function on the indexed column (WHERE LOWER(email) = "user@domain.com") without a functional index',
      'Performing a multi-table INNER JOIN on foreign key columns',
      'Using the LIMIT 1 clause on an ordered query'
    ],
    correctOptionIndex: 1,
    explanation: 'Applying functions like LOWER() or DATE() on an indexed column prevents the B-Tree index lookup unless an expression/function index has been specifically declared.',
    category: 'Database & SQL Performance',
    difficulty: 'Medium'
  },
  {
    id: 'q-tech-2',
    question: 'What is the primary benefit of HTTP/2 multiplexing compared to HTTP/1.1 pipelining?',
    options: [
      'It encrypts TCP payloads without requiring SSL/TLS certificates',
      'It allows multiple concurrent requests and responses over a single TCP connection, preventing Head-of-Line blocking at the application layer',
      'It increases maximum UDP packet MTU size beyond 1500 bytes',
      'It converts JSON payloads into XML automatically'
    ],
    correctOptionIndex: 1,
    explanation: 'HTTP/2 introduces binary framing and stream identifiers, allowing multiple bidirectional request-response streams interleaved over a single TCP connection.',
    category: 'Computer Networks & Web Architecture',
    difficulty: 'Medium'
  },
  {
    id: 'q-tech-3',
    question: 'In React 19, what does the useTransition hook achieve?',
    options: [
      'It animates CSS transition properties with cubic bezier curves',
      'It marks state updates as non-urgent transitions, keeping the user interface responsive during heavy render computations',
      'It connects React components directly to WebSocket servers',
      'It triggers automated unit tests before DOM mutation'
    ],
    correctOptionIndex: 1,
    explanation: 'useTransition enables developers to mark specific state updates as non-blocking background transitions, keeping user interactions snappy.',
    category: 'Frontend Engineering',
    difficulty: 'Easy'
  },
  {
    id: 'q-tech-4',
    question: 'In Python, what is the time complexity of checking membership (`x in s`) when `s` is a standard set versus when `s` is a standard list of length N?',
    options: [
      'O(1) average for set; O(N) worst-case for list',
      'O(N) for set; O(1) for list',
      'O(log N) for both set and list',
      'O(N^2) for set; O(N) for list'
    ],
    correctOptionIndex: 0,
    explanation: 'Python sets are implemented as hash tables, giving O(1) average time complexity for lookups, whereas lists require linear O(N) traversal.',
    category: 'Python Core & Algorithms',
    difficulty: 'Easy'
  },
  {
    id: 'q-tech-5',
    question: 'A distributed system uses the Raft consensus algorithm. What condition must be met for a log entry to be considered safely committed?',
    options: [
      'All nodes in the cluster must simultaneously acknowledge the log write',
      'The log entry must be replicated across a strict majority (quorum) of active cluster nodes by the elected Leader',
      'The entry must be validated by an external blockchain ledger',
      'The client must send an explicit TCP FIN packet'
    ],
    correctOptionIndex: 1,
    explanation: 'In Raft, an entry is safely committed once the Leader has successfully written and replicated it to a majority (N/2 + 1) of cluster members.',
    category: 'System Design & Distributed Systems',
    difficulty: 'Hard'
  }
];

// ==========================================
// 4. CODING PROBLEMS & LAB SANDBOX
// ==========================================
export const INITIAL_CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'code-1',
    title: 'Two Sum - Target Index Pairs',
    difficulty: 'Easy',
    category: 'Arrays & Hash Tables',
    acceptanceRate: '78.4%',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. Each input will have exactly one solution, and you may not use the same element twice.',
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your O(N) hash map solution here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums, target):
    # Write your O(N) dictionary solution here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`
    },
    sampleTestCases: [
      { input: 'nums = [2, 7, 11, 15], target = 9', expectedOutput: '[0, 1]' },
      { input: 'nums = [3, 2, 4], target = 6', expectedOutput: '[1, 2]' },
      { input: 'nums = [3, 3], target = 6', expectedOutput: '[0, 1]' }
    ],
    hints: [
      'Can you solve it in a single pass instead of nested O(N^2) loops?',
      'Store each number index in a hash map and check if (target - current) has already been seen.'
    ]
  },
  {
    id: 'code-2',
    title: 'Valid Parentheses & Bracket Matching',
    difficulty: 'Easy',
    category: 'Stack',
    acceptanceRate: '82.1%',
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. Open brackets must be closed by the same type of brackets in the correct order.',
    starterCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
      python: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`
    },
    sampleTestCases: [
      { input: 's = "()"', expectedOutput: 'true' },
      { input: 's = "()[]{}"', expectedOutput: 'true' },
      { input: 's = "(]"', expectedOutput: 'false' }
    ],
    hints: [
      'Use a Last-In First-Out (LIFO) stack data structure.',
      'Push opening brackets, and whenever a closing bracket appears, check if the top of the stack matches.'
    ]
  },
  {
    id: 'code-3',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    acceptanceRate: '64.5%',
    description: 'Given a string `s`, find the length of the longest substring without repeating characters using the sliding window algorithm.',
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0;
  const set = new Set();
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}`,
      python: `def length_of_longest_substring(s: str) -> int:
    char_map = {}
    max_len = 0
    start = 0
    for end, char in enumerate(s):
        if char in char_map and char_map[char] >= start:
            start = char_map[char] + 1
        char_map[char] = end
        max_len = max(max_len, end - start + 1)
    return max_len`
    },
    sampleTestCases: [
      { input: 's = "abcabcbb"', expectedOutput: '3' },
      { input: 's = "bbbbb"', expectedOutput: '1' },
      { input: 's = "pwwkew"', expectedOutput: '3' }
    ],
    hints: [
      'Maintain two pointers [left, right] denoting your active candidate substring window.',
      'Expand right until a duplicate is encountered, then shrink from left.'
    ]
  }
];

// ==========================================
// 5. PLACEMENT DRIVES & OFF-CAMPUS DRIVES
// ==========================================
export const INITIAL_PLACEMENT_DRIVES: PlacementDrive[] = [
  {
    id: 'drive-1',
    companyName: 'CloudSphere Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120',
    role: 'Associate Cloud Software Engineer',
    driveType: 'Campus Drive',
    packageLPA: '8.5 - 12.0 LPA',
    location: 'Bengaluru / Pune (Hybrid)',
    minCGPA: 7.0,
    eligibleBatches: ['2025', '2026', '2027'],
    deadline: 'Sep 28, 2026',
    driveDate: 'Oct 04, 2026',
    openings: 24,
    registeredCount: 312,
    hiringProcess: [
      'Online Aptitude & Coding Assessment (60 Mins)',
      'Technical Screening Round 1 (Data Structures & Backend)',
      'System Architecture & Problem Solving Round',
      'HR Cultural Alignment & Offer Rollout'
    ],
    skillsRequired: ['Python', 'Django', 'MySQL', 'React', 'Docker'],
    status: 'Registration Open'
  },
  {
    id: 'drive-2',
    companyName: 'FinVantage Global Bank',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120',
    role: 'Fintech Backend & Distributed Systems Trainee',
    driveType: 'Off-Campus Drive',
    packageLPA: '11.0 - 15.5 LPA',
    location: 'Mumbai / Hyderabad',
    minCGPA: 7.5,
    eligibleBatches: ['2025', '2026'],
    deadline: 'Sep 30, 2026',
    driveDate: 'Oct 08, 2026',
    openings: 15,
    registeredCount: 480,
    hiringProcess: [
      'Cognitive Aptitude & Math MCQ Round',
      'Live Coding Hackathon on Data Structures',
      'Fintech Architecture Round',
      'Director Fitment Interview'
    ],
    skillsRequired: ['Java / Python', 'Microservices', 'PostgreSQL', 'Kafka'],
    status: 'Registration Open'
  },
  {
    id: 'drive-3',
    companyName: 'NextGen AI Automations',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120',
    role: 'Junior GenAI & Data Pipeline Engineer',
    driveType: 'Referral',
    packageLPA: '9.0 - 14.0 LPA',
    location: 'Remote (Pan India)',
    minCGPA: 6.8,
    eligibleBatches: ['2024', '2025', '2026'],
    deadline: 'Oct 02, 2026',
    driveDate: 'Oct 11, 2026',
    openings: 8,
    registeredCount: 195,
    hiringProcess: [
      'Take-Home RAG Pipeline Task',
      'Live Technical Code Review',
      'Leadership Discussion'
    ],
    skillsRequired: ['Python', 'Gemini / OpenAI API', 'Vector Databases', 'LangChain'],
    status: 'Registration Open'
  },
  {
    id: 'drive-4',
    companyName: 'Tata Consultancy Services',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120',
    role: 'SAP S/4HANA Functional Associate',
    driveType: 'Pool Drive',
    packageLPA: '7.0 - 9.5 LPA',
    location: 'Kolkata / Bhubaneswar / Delhi NCR',
    minCGPA: 6.5,
    eligibleBatches: ['2025', '2026'],
    deadline: 'Oct 05, 2026',
    driveDate: 'Oct 15, 2026',
    openings: 35,
    registeredCount: 620,
    hiringProcess: [
      'Aptitude & Verbal Reasoning Test',
      'Domain MCQ (SAP MM/SD Basics)',
      'Technical + HR Combined Round'
    ],
    skillsRequired: ['SAP ERP', 'Procure-to-Pay', 'Order-to-Cash', 'Excel'],
    status: 'Upcoming'
  }
];

// ==========================================
// 6. APPLICATION TRACKER ITEMS
// ==========================================
export const INITIAL_APPLICATION_TRACKERS: ApplicationTrackerItem[] = [
  {
    id: 'track-app-1',
    company: 'CloudSphere Technologies',
    role: 'Associate Cloud Software Engineer',
    appliedDate: 'Sep 02, 2026',
    currentStage: 'Technical Round 1',
    packageLPA: '₹8.5 - 12.0 LPA',
    nextAction: 'Join Google Meet round with Senior Engineering Lead',
    actionDeadline: 'Sep 28, 2026, 03:30 PM IST',
    stages: [
      { stage: 'Applied', completed: true, current: false, date: 'Sep 02' },
      { stage: 'Shortlisted', completed: true, current: false, date: 'Sep 06', notes: 'ATS Score 94/100 verified' },
      { stage: 'Assessment Test', completed: true, current: false, date: 'Sep 12', score: '92% in Coding & SQL' },
      { stage: 'Technical Round 1', completed: false, current: true, date: 'Sep 28', notes: 'Topic: System Design & Python Concurrency' },
      { stage: 'HR Interview', completed: false, current: false },
      { stage: 'Offer Issued', completed: false, current: false }
    ]
  },
  {
    id: 'track-app-2',
    company: 'FinVantage Global Bank',
    role: 'Fintech Backend Trainee',
    appliedDate: 'Sep 08, 2026',
    currentStage: 'Assessment Test',
    packageLPA: '₹11.0 - 15.5 LPA',
    nextAction: 'Complete 60-min Coding Assessment Test',
    actionDeadline: 'Sep 27, 2026, 11:59 PM IST',
    stages: [
      { stage: 'Applied', completed: true, current: false, date: 'Sep 08' },
      { stage: 'Shortlisted', completed: true, current: false, date: 'Sep 14', notes: 'CGPA 8.7 requirement met' },
      { stage: 'Assessment Test', completed: false, current: true, date: 'Pending' },
      { stage: 'Technical Round 1', completed: false, current: false },
      { stage: 'HR Interview', completed: false, current: false },
      { stage: 'Offer Issued', completed: false, current: false }
    ]
  },
  {
    id: 'track-app-3',
    company: 'TechFlow Systems',
    role: 'React Full Stack Developer',
    appliedDate: 'Aug 24, 2026',
    currentStage: 'Offer Issued',
    packageLPA: '₹9.2 LPA',
    nextAction: 'Review & Sign Offer Letter',
    actionDeadline: 'Oct 01, 2026',
    stages: [
      { stage: 'Applied', completed: true, current: false, date: 'Aug 24' },
      { stage: 'Shortlisted', completed: true, current: false, date: 'Aug 27' },
      { stage: 'Assessment Test', completed: true, current: false, date: 'Sep 01', score: '88%' },
      { stage: 'Technical Round 1', completed: true, current: false, date: 'Sep 07', score: 'Exemplary' },
      { stage: 'HR Interview', completed: true, current: false, date: 'Sep 14' },
      { stage: 'Offer Issued', completed: true, current: true, date: 'Sep 18', notes: 'Formal LOI Dispatched' }
    ]
  }
];

// ==========================================
// 7. PARTNER / RECRUITMENT POSITIONS
// ==========================================
export const INITIAL_PARTNER_POSITIONS: PartnerPosition[] = [
  {
    id: 'pos-101',
    jobId: 'JOB-2026-CS-01',
    title: 'Senior Python & React Lead',
    company: 'CloudSphere Technologies',
    department: 'Platform Engineering',
    location: 'Bengaluru, Karnataka',
    employmentType: 'Full-time',
    experience: '3-6 Years',
    salaryRange: '₹18 - ₹26 LPA',
    skills: ['Python', 'Django', 'React', 'Docker', 'PostgreSQL', 'AWS'],
    description: 'Lead backend microservice modernization, collaborate with product managers on high-throughput architecture, and mentor junior engineers.',
    responsibilities: [
      'Design and deploy RESTful microservices with 99.99% uptime',
      'Optimize query execution paths in PostgreSQL and Redis cache layers',
      'Drive engineering sprint reviews and peer code quality'
    ],
    qualifications: ['B.Tech / MCA in Computer Science', 'Proven production deployment experience'],
    benefits: ['Comprehensive Health Insurance', 'Annual Learning Allowance', 'Hybrid Work Options'],
    openings: 3,
    status: 'Open',
    createdDate: '2026-09-01',
    deadline: '2026-10-15',
    assignedRecruiter: 'Arun Mehta (Partnerships Lead)',
    applicantsCount: 48,
    shortlistedCount: 14,
    interviewCount: 6
  },
  {
    id: 'pos-102',
    jobId: 'JOB-2026-FV-02',
    title: 'Fintech Distributed Systems Engineer',
    company: 'FinVantage Global Bank',
    department: 'Core Banking & Payments',
    location: 'Pune / Mumbai (Hybrid)',
    employmentType: 'Full-time',
    experience: '2-4 Years',
    salaryRange: '₹14 - ₹20 LPA',
    skills: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Microservices'],
    description: 'Build real-time payment reconciliation and fraud scoring pipelines handling over 50,000 TPS.',
    responsibilities: [
      'Build idempotent payment ingestion APIs with strict transactional integrity',
      'Deploy event streaming pipelines with Apache Kafka',
      'Implement real-time audit logging and regulatory compliance checks'
    ],
    qualifications: ['Degree in Computer Science / Math', 'Strong background in concurrency'],
    benefits: ['Performance Bonus', 'Stock Options', 'Relocation Allowance'],
    openings: 5,
    status: 'Open',
    createdDate: '2026-09-04',
    deadline: '2026-10-20',
    assignedRecruiter: 'Neha Sengupta (Enterprise Partner)',
    applicantsCount: 62,
    shortlistedCount: 18,
    interviewCount: 8
  },
  {
    id: 'pos-103',
    jobId: 'JOB-2026-AI-03',
    title: 'GenAI & LangChain Solutions Engineer',
    company: 'NextGen AI Automations',
    department: 'Artificial Intelligence',
    location: 'Remote (India)',
    employmentType: 'Full-time',
    experience: '1-3 Years',
    salaryRange: '₹12 - ₹18 LPA',
    skills: ['Python', 'Gemini API', 'LangChain', 'Pinecone', 'FastAPI'],
    description: 'Develop custom domain copilots, semantic retrieval systems, and multimodal ingestion pipelines for enterprise clients.',
    responsibilities: [
      'Construct production RAG architectures with hybrid dense/sparse search',
      'Evaluate model hallucination rates and prompt safety barriers',
      'Maintain FastAPI proxy gateways with token rate-limiting'
    ],
    qualifications: ['Strong algorithmic coding skills', 'Hands-on experience with LLM SDKs'],
    benefits: ['100% Remote flexibility', 'Home Office Stipend', 'Conference Sponsorship'],
    openings: 4,
    status: 'Open',
    createdDate: '2026-09-08',
    deadline: '2026-10-25',
    assignedRecruiter: 'Arun Mehta (Partnerships Lead)',
    applicantsCount: 85,
    shortlistedCount: 22,
    interviewCount: 9
  },
  {
    id: 'pos-104',
    jobId: 'JOB-2026-TCS-04',
    title: 'SAP S/4HANA Associate Consultant',
    company: 'Tata Consultancy Services',
    department: 'Enterprise Applications',
    location: 'Bhubaneswar / Kolkata',
    employmentType: 'Full-time',
    experience: '0-2 Years (Freshers Eligible)',
    salaryRange: '₹6.5 - ₹9 LPA',
    skills: ['SAP MM', 'SAP SD', 'Procure-to-Pay', 'Order-to-Cash', 'ERP'],
    description: 'Configure and support SAP ERP implementations for manufacturing clients, conduct blueprinting sessions, and prepare test scenarios.',
    responsibilities: [
      'Document functional specification documents (FSD)',
      'Assist in integration testing and cutover activities',
      'Provide post-go-live hypercare support'
    ],
    qualifications: ['Any Graduate with analytical aptitude', 'Jobskül SAP Certification preferred'],
    benefits: ['Full Corporate Training', 'Medical Coverage', 'Shuttle Transport'],
    openings: 12,
    status: 'Open',
    createdDate: '2026-09-12',
    deadline: '2026-10-30',
    assignedRecruiter: 'Rohan Deshmukh (Recruiter)',
    applicantsCount: 110,
    shortlistedCount: 30,
    interviewCount: 14
  },
  {
    id: 'pos-105',
    jobId: 'JOB-2026-DF-05',
    title: 'DevOps & Kubernetes Cloud Specialist',
    company: 'Nexus Infotech Solutions',
    department: 'Infrastructure',
    location: 'Noida / Delhi NCR',
    employmentType: 'Full-time',
    experience: '3-5 Years',
    salaryRange: '₹16 - ₹22 LPA',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'CI/CD GitHub Actions', 'Prometheus'],
    description: 'Automate multi-cloud infrastructure deployments using Terraform, manage EKS clusters, and establish observability with Prometheus & Grafana.',
    responsibilities: [
      'Maintain Kubernetes ingress controllers and autoscalers',
      'Implement zero-trust security postures and secret rotation',
      'Optimize AWS compute spend'
    ],
    qualifications: ['CKA / AWS Certified Solutions Architect'],
    benefits: ['Gym Subsidy', 'Quarterly Incentives'],
    openings: 2,
    status: 'On Hold',
    createdDate: '2026-08-20',
    deadline: '2026-09-30',
    assignedRecruiter: 'Arun Mehta',
    applicantsCount: 34,
    shortlistedCount: 8,
    interviewCount: 3
  }
];

// ==========================================
// 8. JD REQUESTS (JOB DESCRIPTION MANAGEMENT)
// ==========================================
export const INITIAL_JD_REQUESTS: JDRequest[] = [
  {
    id: 'jdr-201',
    requestNumber: 'JDR-2026-001',
    clientName: 'Wipro Digital Enterprise',
    jobTitle: 'Full Stack Java & Angular Engineer',
    department: 'Banking & Financial Services',
    location: 'Bengaluru / Hyderabad',
    experienceRequired: '2-4 Years',
    salaryMin: 12,
    salaryMax: 18,
    openings: 6,
    requiredSkills: ['Java 17', 'Spring Boot', 'Angular 17', 'Oracle DB', 'Microservices'],
    jobDescription: 'Client requires 6 certified full-stack engineers with Spring Boot and Angular to work on their international wealth management portal.',
    responsibilities: 'Build secure transactional screens, optimize REST APIs, adhere to PCI-DSS standards.',
    status: 'Approved',
    requestedBy: 'Amitabh Sen (VP Client Partnerships, Wipro)',
    assignedTo: 'Arun Mehta (Partnerships Lead)',
    createdDate: '2026-09-02',
    approvedDate: '2026-09-05',
    convertedPositionId: 'pos-101'
  },
  {
    id: 'jdr-202',
    requestNumber: 'JDR-2026-002',
    clientName: 'Infosys BPM & Cloud Services',
    jobTitle: 'Cloud Data Engineer (Snowflake & PySpark)',
    department: 'Data Analytics & AI',
    location: 'Pune / Chennai',
    experienceRequired: '3-5 Years',
    salaryMin: 15,
    salaryMax: 22,
    openings: 4,
    requiredSkills: ['PySpark', 'Snowflake', 'AWS Glue', 'Airflow', 'SQL'],
    jobDescription: 'Seeking data engineers to build large-scale ETL pipelines processing healthcare patient telemetry datasets.',
    responsibilities: 'Design data lakes, create idempotent Airflow DAGs, optimize Snowflake credit consumption.',
    status: 'In Review',
    requestedBy: 'Pooja Kashyap (Talent Acquisition Partner)',
    assignedTo: 'Neha Sengupta',
    createdDate: '2026-09-08'
  },
  {
    id: 'jdr-203',
    requestNumber: 'JDR-2026-003',
    clientName: 'Zomato Hyperlocal Logistics',
    jobTitle: 'Backend Golang & Distributed Systems Engineer',
    department: 'Fleet & Delivery Tech',
    location: 'Gurugram / Remote',
    experienceRequired: '2-5 Years',
    salaryMin: 22,
    salaryMax: 32,
    openings: 3,
    requiredSkills: ['Golang', 'Redis', 'Kafka', 'PostgreSQL', 'High Concurrency'],
    jobDescription: 'Looking for high-caliber backend engineers to optimize live order dispatch and driver routing microservices.',
    responsibilities: 'Write low-latency Golang services, benchmark memory allocations, scale Redis clusters.',
    status: 'Pending',
    requestedBy: 'Kunal Singhal (Tech Recruiter, Zomato)',
    createdDate: '2026-09-14'
  }
];

// ==========================================
// 9. PARTNER INTERVIEW MANAGEMENT
// ==========================================
export const INITIAL_PARTNER_INTERVIEWS: PartnerInterview[] = [
  {
    id: 'pint-301',
    candidateName: 'Priya Sharma',
    candidateEmail: 'priya.sharma@example.com',
    candidatePhone: '+91 98765 43210',
    positionTitle: 'Senior Python & React Lead',
    company: 'CloudSphere Technologies',
    interviewerName: 'Dr. Rajesh K. Nair (Staff Architect)',
    date: '2026-09-28',
    time: '03:30 PM - 04:30 PM IST',
    interviewType: 'Technical',
    meetingLink: 'https://meet.google.com/jbs-tech-eval',
    status: 'Scheduled',
    notes: 'Candidate completed Jobskül Full Stack Python track with 95% grade. Focus on PostgreSQL partitioning and concurrency.',
    feedback: 'Strong problem-solving instincts. Passed initial coding screener.'
  },
  {
    id: 'pint-302',
    candidateName: 'Rahul Mohapatra',
    candidateEmail: 'rahul.m@example.com',
    candidatePhone: '+91 98111 22334',
    positionTitle: 'Fintech Distributed Systems Engineer',
    company: 'FinVantage Global Bank',
    interviewerName: 'Vikram Joshi (VP Engineering)',
    date: '2026-09-29',
    time: '11:00 AM - 12:00 PM IST',
    interviewType: 'System Design',
    meetingLink: 'https://meet.google.com/fin-sys-arch',
    status: 'Scheduled',
    notes: 'Assessment score 94% in Java and Distributed Systems.',
    feedback: ''
  },
  {
    id: 'pint-303',
    candidateName: 'Sneha Patel',
    candidateEmail: 'sneha.patel@example.com',
    candidatePhone: '+91 99000 55443',
    positionTitle: 'GenAI & LangChain Solutions Engineer',
    company: 'NextGen AI Automations',
    interviewerName: 'Ananya Deshmukh (AI Principal)',
    date: '2026-09-25',
    time: '04:00 PM - 05:00 PM IST',
    interviewType: 'Technical',
    meetingLink: 'https://meet.google.com/genai-interview',
    status: 'Completed',
    notes: 'Candidate demonstrated clear understanding of hybrid vector search and prompt safety guards.',
    feedback: 'Recommended for Hire. Excellent technical depth in RAG pipelines.',
    rating: 4.8
  }
];

// ==========================================
// 10. MENTORSHIP & INDUSTRY EXPERTS
// ==========================================
export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'mentor-1',
    name: 'Gaurav Sen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'Ex-Uber Staff Engineer & System Design Author',
    company: 'Independent Systems Architect',
    experienceYears: 12,
    expertise: ['High Level System Design', 'Distributed Caching', 'FAANG Interview Strategy'],
    hourlyRate: '₹1,499 / 45 Min Session',
    rating: 4.98,
    sessionsCompleted: 420,
    bio: 'Guided over 2,000+ software engineers into top tier product organizations. Specialized in mock interviews and architectural review.',
    availableDays: ['Tuesdays', 'Thursdays', 'Saturdays']
  },
  {
    id: 'mentor-2',
    name: 'Pooja Sundaram',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    role: 'Director of Talent Acquisition',
    company: 'Microsoft India',
    experienceYears: 14,
    expertise: ['HR Behavioral Mastery', 'Salary Negotiation', 'Executive Presence'],
    hourlyRate: '₹999 / 45 Min Session',
    rating: 4.95,
    sessionsCompleted: 580,
    bio: '14+ years spearheading campus and lateral hiring at Microsoft and Cisco. Helping students crack STAR-based behavioral rounds.',
    availableDays: ['Mondays', 'Wednesdays', 'Sundays']
  },
  {
    id: 'mentor-3',
    name: 'Aditya Swaminathan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    role: 'Senior Machine Learning Engineer',
    company: 'Amazon Web Services',
    experienceYears: 9,
    expertise: ['GenAI & RAG', 'PyTorch Optimization', 'AI Career Roadmap'],
    hourlyRate: '₹1,299 / 45 Min Session',
    rating: 4.92,
    sessionsCompleted: 290,
    bio: 'Specialist in scaling transformer inference and generative AI production pipelines. Mentor for aspiring AI and ML engineers.',
    availableDays: ['Fridays', 'Saturdays']
  }
];

// ==========================================
// 11. COMMUNITY & DOUBTS FORUM
// ==========================================
export const INITIAL_FORUM_TOPICS: ForumTopic[] = [
  {
    id: 'post-1',
    title: 'How to tackle N+1 queries in Django ORM with nested serializers in production?',
    category: 'Tech Doubts',
    author: {
      name: 'Rohan Mukherjee',
      role: 'Student Candidate',
      college: 'GIFT University, Bhubaneswar'
    },
    content: 'I noticed my Django API response time spiked to 1.8 seconds when serializing 50 orders with foreign keys to User and OrderItems. Is prefetch_related sufficient or should I write custom raw queries?',
    tags: ['Django', 'Python', 'ORM', 'Database'],
    createdAt: '2 hours ago',
    upvotes: 34,
    repliesCount: 3,
    isSolved: true,
    replies: [
      {
        id: 'rep-1',
        author: 'Dr. Rajesh K. Nair',
        role: 'Ex-Google Staff Engineer',
        text: 'Use select_related() for single foreign key relationships (Order -> User) as it performs an SQL JOIN, and prefetch_related() for many-to-many or reverse foreign keys (Order -> OrderItems). Check connection.queries to confirm your query count drops from 51 down to 2!',
        createdAt: '1 hour ago',
        isAcceptedSolution: true
      },
      {
        id: 'rep-2',
        author: 'Priya Sharma',
        role: 'Candidate',
        text: 'Can confirm! I used Prefetch("order_items", queryset=OrderItem.objects.only("id", "price")) and cut response time down to 42ms.',
        createdAt: '45 mins ago'
      }
    ]
  },
  {
    id: 'post-2',
    title: 'My CloudSphere Technologies Technical Interview Experience - Questions Asked!',
    category: 'Interview Experiences',
    author: {
      name: 'Sneha Rao',
      role: 'Placed at CloudSphere',
      college: 'IIIT Bhubaneswar'
    },
    content: 'Just cracked the Associate Cloud Engineer role through Jobskül campus pool drive! Round 1 had Two Sum variation and a question on Redis TTL cache invalidation. Round 2 asked how to deploy Docker containers behind Nginx reverse proxy. Preparing from the Jobskül practice lab made the difference!',
    tags: ['Interview Experience', 'Placement', 'CloudSphere', 'Docker'],
    createdAt: 'Yesterday',
    upvotes: 89,
    repliesCount: 7,
    isSolved: false
  },
  {
    id: 'post-3',
    title: 'Top 50 LeetCode Patterns: Sliding Window vs 2 Pointers Decision Matrix',
    category: 'LeetCode & DSA',
    author: {
      name: 'Vikramaditya Verma',
      role: 'Staff Engineer & ICPC Regionalist'
    },
    content: 'A handy heuristic guide: Use 2-Pointers when dealing with sorted arrays or finding symmetric pairs. Use Sliding Window whenever the problem states "contiguous subarray" or "longest substring with at most K distinct characters". Full summary attached!',
    tags: ['DSA', 'LeetCode', 'Algorithms', 'Placement Prep'],
    createdAt: '3 days ago',
    upvotes: 142,
    repliesCount: 12,
    isSolved: true
  }
];

// ==========================================
// 12. PAYMENTS & INVOICES
// ==========================================
export const INITIAL_PAYMENT_HISTORY: PaymentHistoryItem[] = [
  {
    id: 'pay-inv-101',
    invoiceNumber: 'INV-2026-0891',
    date: '2026-09-01',
    description: 'Jobskül Pro Career Pass - 1 Year Unlimited Access',
    planOrCourse: 'Pro Placement Pass (All Courses + Mock Tests + AI Review)',
    amount: 7999,
    tax: 1439.82,
    total: 9438.82,
    status: 'Paid',
    pdfDownloadUrl: '#invoice-download-101'
  },
  {
    id: 'pay-inv-102',
    invoiceNumber: 'INV-2026-0744',
    date: '2026-08-15',
    description: 'Course Purchase: Full Stack Python & Enterprise Cloud Architecture',
    planOrCourse: 'Full Stack Python Masterclass',
    amount: 4999,
    tax: 899.82,
    total: 5898.82,
    status: 'Paid',
    pdfDownloadUrl: '#invoice-download-102'
  }
];
