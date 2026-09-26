import React, { useState, useEffect, useRef } from 'react';
import { User, JobListing } from '../types';
import {
  ShieldCheck,
  Target,
  FileText,
  MessageSquare,
  Copy,
  Check,
  RefreshCw,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Sparkles,
  ChevronRight,
  Play,
  RotateCcw,
  Award,
  Globe,
  Star,
  Layers,
  HelpCircle,
  Clock,
  Send
} from 'lucide-react';

export type InterviewLanguage = 'english' | 'hindi' | 'odia';

export interface InterviewQuestion {
  question: string;
  category: string;
  difficulty?: string;
  modelAnswer: string;
  tips: string;
  sampleAnswerHint?: string;
}

export interface JobskulHireAIProps {
  currentUser: User | null;
  jobs: JobListing[];
  onNavigateToLearn: () => void;
  initialSubTab?: 'interview' | 'matcher' | 'coverletter';
  initialLanguage?: InterviewLanguage;
}

// Curated authentic questions in Hindi, Odia, and English
const CURATED_QUESTIONS: Record<InterviewLanguage, Record<string, InterviewQuestion[]>> = {
  english: {
    fullstack: [
      {
        question: "In React, explain how the Virtual DOM and the Reconciliation (Diffing) algorithm optimize rendering compared to direct real DOM mutations.",
        category: "Frontend Architecture",
        difficulty: "Core Technical",
        modelAnswer: "The Virtual DOM is an in-memory lightweight representation of the real DOM tree. When component state changes, React constructs a new Virtual DOM tree and compares it against the previous tree using heuristic O(N) Diffing (same element type, keys on list items). It batches changes and calculates the minimal set of real DOM mutations, eliminating costly browser layout reflows and repaints.",
        tips: "Highlight batching in React 18, key props in lists, and avoiding excessive re-renders with React.memo or useMemo.",
        sampleAnswerHint: "Mention lightweight JS object, diffing algorithm, batch updates, and minimal browser reflows."
      },
      {
        question: "How do you identify and resolve the N+1 query problem when querying relational databases in an ORM or REST microservice?",
        category: "Backend & Database",
        difficulty: "Core Technical",
        modelAnswer: "The N+1 problem occurs when fetching N parent records leads to executing 1 initial query plus N subsequent queries to fetch related child items inside a loop. We resolve it by eager-loading related objects using SQL INNER/LEFT JOINs or ORM utilities (select_related for foreign keys, prefetch_related for M2M in Django, or join fetch / include in Prisma/TypeORM), reducing queries from N+1 down to 1 or 2.",
        tips: "Explain database connection overhead and give a practical example like User -> Orders or Articles -> Comments.",
        sampleAnswerHint: "Explain loop-induced queries, eager loading with JOINs or prefetch_related, reducing database latency."
      },
      {
        question: "Explain the four core pillars of Object-Oriented Programming (OOP) and how Polymorphism is implemented in a production system.",
        category: "Core Software Engineering",
        difficulty: "Foundational",
        modelAnswer: "The four pillars are Encapsulation (hiding internal state behind public methods), Abstraction (exposing only essential interfaces), Inheritance (code reuse across hierarchical classes), and Polymorphism (many forms). In production, Polymorphism allows a generic payment service to call processPayment(amount) on a BasePaymentGateway, where StripeGateway, PayPalGateway, and RazorpayGateway provide specific implementations without changing caller code.",
        tips: "Distinguish between compile-time (overloading) and run-time (overriding/interfaces) polymorphism.",
        sampleAnswerHint: "List encapsulation, abstraction, inheritance, polymorphism, and give an interface/subclass example like PaymentGateway."
      },
      {
        question: "Describe a situation where a critical production bug arose right before a scheduled release. How did you diagnose, resolve, and prevent it? (STAR Method)",
        category: "Behavioral & STAR Method",
        difficulty: "Situational / HR",
        modelAnswer: "Situation: 2 hours before client deployment, an API latency spike occurred in payment reconciliation. Task: Restore service reliability without delaying launch. Action: Analyzed APM logs and DB slow queries, identified an unindexed timestamp column causing table scans, applied a migration hotfix with a B-tree index, verified latency under load, and alerted stakeholders. Result: Release completed on schedule with zero customer disruption, and we added automated DB query linting in CI/CD.",
        tips: "Structure clearly into Situation, Task, Action, Result. Emphasize team communication, root cause analysis, and post-mortem prevention.",
        sampleAnswerHint: "Frame around a real or capstone project bug, show systematic debugging, rollback awareness, and CI/CD test addition."
      }
    ],
    dsa: [
      {
        question: "How does a Hash Table achieve average-case O(1) time complexity, and how do you handle hash collisions?",
        category: "Data Structures & Algorithms",
        difficulty: "Core DSA",
        modelAnswer: "A hash table uses a hash function to map keys to bucket indices in an array. Average lookup, insertion, and deletion run in O(1). Collisions occur when different keys yield the same index. They are resolved via: 1) Separate Chaining (each bucket holds a linked list or red-black tree), or 2) Open Addressing (Linear Probing, Quadratic Probing, or Double Hashing). If load factor exceeds threshold (~0.7), the table dynamically resizes (rehashing).",
        tips: "Discuss worst-case O(N) when all keys collide, and load factor rehashing.",
        sampleAnswerHint: "Hash function calculation, array indexing, chaining vs open addressing, and load factor resizing."
      },
      {
        question: "Compare BFS (Breadth-First Search) and DFS (Depth-First Search) in terms of data structures used, time/space complexity, and practical use cases.",
        category: "Graph & Tree Algorithms",
        difficulty: "Core DSA",
        modelAnswer: "BFS explores level by level using a Queue (FIFO), ideal for finding the shortest path in unweighted graphs or bipartite testing. DFS traverses as deep as possible using a Stack (or recursion LIFO), useful for topological sorting, cycle detection, and maze backtracking. Both have time complexity O(V + E). Space is O(V) for visited set plus queue/recursion stack.",
        tips: "Mention memory trade-offs when trees are very wide vs very deep.",
        sampleAnswerHint: "Queue vs Stack, shortest path vs topological sort, O(V+E) time complexity."
      }
    ],
    fresher: [
      {
        question: "What is the difference between a Process and a Thread in an Operating System? How does Context Switching work?",
        category: "Operating Systems & Core CS",
        difficulty: "Campus Placement / Fresher",
        modelAnswer: "A Process is an executing program with its own dedicated memory space (code, data, heap, stack). A Thread is a lightweight unit of execution within a process that shares the parent process's memory space and resources. Context Switching is the OS scheduler mechanism that saves the CPU state (program counter, registers) of the running process/thread on a PCB/TCB and restores the state of another ready process/thread to allow multitasking.",
        tips: "Highlight overhead: process context switching is heavier due to MMU/TLB cache invalidation compared to thread context switching.",
        sampleAnswerHint: "Memory isolation in processes, shared memory in threads, PCB/TCB state saving during context switch."
      },
      {
        question: "What are ACID properties in Database Management Systems (DBMS)? Explain with a real banking transaction.",
        category: "Database Systems",
        difficulty: "Campus Placement / Fresher",
        modelAnswer: "Atomicity: All operations in a transaction succeed, or none do (debit ₹500 from Account A and credit Account B must both happen). Consistency: Database transitions from one valid state to another satisfying all integrity constraints. Isolation: Concurrent transactions do not interfere with each other (read uncommitted prevention). Durability: Once committed, changes survive even in system crashes (write-ahead logging WAL).",
        tips: "Provide the classic account debit/credit failure scenario to illustrate Atomicity and WAL for Durability.",
        sampleAnswerHint: "Atomicity (all or nothing), Consistency (valid state), Isolation (independent transactions), Durability (persisted post-crash)."
      }
    ]
  },
  hindi: {
    fullstack: [
      {
        question: "रिएक्ट (React) में Virtual DOM क्या है और यह असली ब्राउज़र DOM की तुलना में रेंडरिंग प्रदर्शन (Rendering Performance) को कैसे बेहतर बनाता है? Reconciliation प्रक्रिया कैसे काम करती है?",
        category: "फ्रंटेंड आर्किटेक्चर (Frontend Architecture)",
        difficulty: "कोर तकनीकी (Core Technical)",
        modelAnswer: "Virtual DOM असली ब्राउज़र DOM का एक हल्का (lightweight) इन-मेमोरी जावास्क्रिप्ट ऑब्जेक्ट प्रतिनिधित्व है। जब भी किसी कॉम्पोनेंट का state या props बदलता है, तो React तुरंत एक नया Virtual DOM ट्री बनाता है और पूर्व ट्री के साथ Diffing Algorithm (O(N) समय) का उपयोग करके तुलना करता है। React केवल उन्हीं वास्तविक तत्वों को असली DOM में अपडेट करता है जिनमें बदलाव हुआ है। इस प्रक्रिया को Reconciliation कहते हैं। इससे ब्राउज़र में बार-बार री-फ्लो (reflow) और री-पेंट (repaint) नहीं होता, जिससे गति काफी बढ़ जाती है।",
        tips: "Diffing algorithm, Batching (बैच अपडेट), और लिस्ट में Unique Keys के महत्व का स्पष्ट उल्लेख करें।",
        sampleAnswerHint: "इन-मेमोरी ऑब्जेक्ट, Diffing एल्गोरिथम, केवल बदले हुए भाग का अपडेट, और ब्राउज़र री-फ्लो से बचत।"
      },
      {
        question: "माइएसक्यूएल (MySQL) या रिलेशनल डेटाबेस में N+1 क्वेरी समस्या क्या है और बैकएंड में इसे कैसे पहचाना और ठीक किया जाता है?",
        category: "डेटाबेस और बैकएंड (Database & Backend)",
        difficulty: "कोर तकनीकी (Core Technical)",
        modelAnswer: "N+1 क्वेरी समस्या तब उत्पन्न होती है जब कोड 1 मुख्य क्वेरी चलाकर पैरेंट रिकॉर्ड्स (जैसे 100 उपयोगकर्ता) प्राप्त करता है, और फिर लूप के अंदर प्रत्येक रिकॉर्ड के लिए अलग से एक चाइल्ड क्वेरी (जैसे यूजर के ऑर्डर्स) चलाता है। इससे कुल 1 + N = 101 डेटाबेस क्वेरीज़ चलती हैं, जिससे डेटाबेस पर भारी लोड पड़ता है। इसे हल करने के लिए SQL में INNER/LEFT JOIN का उपयोग करें या ORM में Eager Loading (जैसे Django में select_related / prefetch_related) का उपयोग करें, जिससे पूरा डेटा केवल 1 या 2 क्वेरीज़ में आ जाता है।",
        tips: "नेटवर्क राउंड-ट्रिप लेटेंसी और इंडेक्सिंग के प्रभाव को साक्षात्कारकर्ता के सामने स्पष्ट करें।",
        sampleAnswerHint: "लूप में बार-बार क्वेरी चलना, डेटाबेस लेटेंसी, और SQL JOIN या Eager Loading से 1-2 क्वेरी में समाधान।"
      },
      {
        question: "ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग (OOPs) के चार मुख्य स्तंभ क्या हैं? पॉलीमॉर्फिज्म (Polymorphism) का वास्तविक सॉफ्टवेयर प्रोजेक्ट में क्या उपयोग है?",
        category: "कोर सॉफ्टवेयर इंजीनियरिंग (Core OOPs)",
        difficulty: "फाउंडेशनल (Foundational)",
        modelAnswer: "चार मुख्य स्तंभ हैं: 1) एन्कैप्सुलेशन (Encapsulation - डेटा और विधियों को एक यूनिट में सुरक्षित रखना), 2) एब्स्ट्रैक्शन (Abstraction - केवल जरूरी इंटरफेस दिखाना और जटिलता छिपाना), 3) इनहेरिटेंस (Inheritance - कोड का पुन: उपयोग), और 4) पॉलीमॉर्फिज्म (Polymorphism - एक ही नाम, अनेक रूप)।\n\nवास्तविक सॉफ्टवेयर उदाहरण: एक PaymentService में processPayment(amount) विधि हो सकती है। जब StripePayment, RazorpayPayment, या UPIPayment इस बेस इंटरफेस को लागू करते हैं, तो मुख्य चेकआउट कोड को बदले बिना किसी भी पेमेंट गेटवे को रन-टाइम पर कॉल किया जा सकता है।",
        tips: "मेथड ओवरलोडिंग (कंपाइल-टाइम) और मेथड ओवरराइडिंग (रन-टाइम) का अंतर संक्षेप में बताएं।",
        sampleAnswerHint: "चारों स्तंभों के नाम और Payment Gateway या Notification Service का व्यावहारिक उदाहरण दें।"
      },
      {
        question: "जब किसी प्रोजेक्ट में डिलीवरी की अंतिम तारीख (Deadline) बहुत करीब हो और अचानक कोई गंभीर बग आ जाए, तो आप उसे कैसे संभालते हैं? (STAR विधि द्वारा समझाएं)",
        category: "व्यवहार और स्थिति संबंधी (Behavioral STAR)",
        difficulty: "एचआर और बिहेवियरल (HR Round)",
        modelAnswer: "Situation (स्थिति): क्लाइंट रिलीज से 2 घंटे पहले पेमेंट फ्लो में एपीआई टाइमआउट का बग दिखा।\nTask (कार्य): बिना रिलीज रोके सिस्टम को स्थिर करना और सही रूट कॉज खोजना।\nAction (कदम): मैंने तुरंत सर्वर एरर लॉग्स और डेटाबेस स्लो क्वेरी लॉग्स चेक किए। देखा कि एक अन-इंडेक्स्ड कॉलम पर फुल टेबल स्कैन हो रहा था। टीम लीड को तुरंत सूचित किया, एक सेफ डेटाबेस इंडेक्स माइग्रेशन लागू किया, और स्टेजिंग पर टेस्ट किया।\nResult (परिणाम): लेटेंसी 80% घट गई, रिलीज तय समय पर सफल रही, और भविष्य के लिए हमने ऑटोमेटेड लोड टेस्टिंग जोड़ दी।",
        tips: "शांत रहने, टीम समन्वय, लॉग विश्लेषण, और भविष्य में रोकथाम (Prevention) पर जोर दें।",
        sampleAnswerHint: "STAR: Situation (परिस्थिति), Task (लक्ष्य), Action (उठाए गए कदम), Result (सकारात्मक परिणाम)।"
      }
    ],
    dsa: [
      {
        question: "हैश टेबल (Hash Table) में O(1) टाइम कॉम्प्लेक्सिटी कैसे प्राप्त होती है और हैश टकराव (Collision) को कैसे संभाला जाता है?",
        category: "डेटा स्ट्रक्चर्स और एल्गोरिदम (DSA)",
        difficulty: "कोर डीएसए (Core DSA)",
        modelAnswer: "हैश टेबल एक हैश फंक्शन का उपयोग करके की (Key) को एक एरे इंडेक्स में बदलता है, जिससे औसत स्थिति में सर्च, इंसर्ट, और डिलीट O(1) समय में होता है। टकराव (Collision) तब होता है जब दो अलग-अलग कीज़ एक ही इंडेक्स उत्पन्न करती हैं। इसे संभालने की दो मुख्य विधियां हैं: 1) सेपरेट चेनिंग (Separate Chaining - प्रत्येक बकेट में लिंक्ड लिस्ट या रेड-ब्लैक ट्री जोड़ना), और 2) ओपन एड्रेसिंग (Open Addressing - लीनियर या क्वाड्रेटिक प्रोबिंग)। जब लोड फैक्टर 0.7 से अधिक होता है, तो टेबल रीहैशिंग करके खुद का आकार दोगुना कर लेती है।",
        tips: "खराब हैश फंक्शन के कारण वर्स्ट केस O(N) होने का उल्लेख जरूर करें।",
        sampleAnswerHint: "हैश फंक्शन, सेपरेट चेनिंग लिंक्ड लिस्ट, ओपन एड्रेसिंग, और लोड फैक्टर रीहैशिंग।"
      },
      {
        question: "ग्राफ और ट्री में BFS (Breadth-First Search) और DFS (Depth-First Search) में क्या अंतर है? दोनों का उपयोग कब करना चाहिए?",
        category: "ग्राफ एल्गोरिदम (Graph Algorithms)",
        difficulty: "कोर डीएसए (Core DSA)",
        modelAnswer: "BFS लेवल-बाई-लेवल (स्तर-दर-स्तर) खोज करता है और इसके लिए Queue (FIFO) डेटा स्ट्रक्चर का उपयोग किया जाता है। यह अनवेटेड ग्राफ में सबसे छोटा रास्ता (Shortest Path) खोजने के लिए सर्वोत्तम है।\n\nDFS गहराई तक जाता है और इसके लिए Stack (या रिकर्जन) का उपयोग किया जाता है। यह टोपोलॉजिकल सॉर्टिंग, चक्र पहचान (Cycle Detection), और पाथ फाइंडिंग के लिए उपयुक्त है। दोनों की टाइम कॉम्प्लेक्सिटी O(V + E) होती है।",
        tips: "मेमोरी के लिहाज से चौड़े ट्री में DFS और गहरे ट्री में BFS के फायदे समझाएं।",
        sampleAnswerHint: "Queue बनाम Stack, शॉर्टेस्ट पाथ बनाम बैकट्रैकिंग, O(V+E) समय जटिलता।"
      }
    ],
    fresher: [
      {
        question: "ऑपरेटिंग सिस्टम में प्रोसेस (Process) और थ्रेड (Thread) में क्या अंतर है? कॉन्टेक्स्ट स्विचिंग (Context Switching) क्या होती है?",
        category: "ऑपरेटिंग सिस्टम (Operating Systems)",
        difficulty: "कैंपस फ्रेशर्स (Campus Freshers)",
        modelAnswer: "प्रोसेस एक निष्पादित प्रोग्राम (Program in Execution) है जिसका अपना निजी मेमोरी स्पेस (Code, Data, Heap, Stack) होता है। थ्रेड एक प्रोसेस के भीतर निष्पादन की सबसे छोटी इकाई (Lightweight unit) है जो अपने पैरेंट प्रोसेस की मेमोरी साझा करती है।\n\nकॉन्टेक्स्ट स्विचिंग वह प्रक्रिया है जब सीपीयू एक प्रोसेस/थ्रेड की वर्तमान स्थिति (रजिस्टर्स, प्रोग्राम काउंटर) को PCB/TCB में सुरक्षित करके दूसरे तैयार प्रोसेस/थ्रेड को निष्पादित करना शुरू करता है।",
        tips: "थ्रेड कॉन्टेक्स्ट स्विचिंग प्रोसेस की तुलना में तेज होती है क्योंकि इसमें मेमोरी स्पेस बदलने की आवश्यकता नहीं होती।",
        sampleAnswerHint: "प्रोसेस का स्वतंत्र मेमोरी स्पेस, थ्रेड का साझा मेमोरी स्पेस, PCB में स्टेट सेविंग।"
      },
      {
        question: "डेटाबेस मैनेजमेंट सिस्टम (DBMS) में ACID प्रॉपर्टीज क्या हैं? एक बैंक खाते के ट्रांसफर उदाहरण से समझाएं।",
        category: "डेटाबेस सिस्टम (DBMS Core)",
        difficulty: "कैंपस फ्रेशर्स (Campus Freshers)",
        modelAnswer: "A (Atomicity - परमाणुता): सभी ऑपरेशन पूरे होंगे या कोई नहीं (खाता A से 1000 कटे तो B में जमा होना ही चाहिए, बीच में फेल होने पर रोलबैक होगा)।\nC (Consistency - संगति): डेटाबेस हमेशा वैध नियमों और कंस्ट्रेंट्स का पालन करेगा।\nI (Isolation - पृथक्करण): एक साथ चलने वाले ट्रांजेक्शन एक-दूसरे के डेटा में हस्तक्षेप नहीं करेंगे।\nD (Durability - स्थायित्व): एक बार कमिट (Commit) होने के बाद डेटा सर्वर क्रैश होने पर भी सुरक्षित रहेगा (WAL लॉग्स द्वारा)।",
        tips: "बैंक ट्रांसफर के दौरान बिजली कटने का उदाहरण देकर एटॉमिकिटी और ड्यूरेबिलिटी समझाएं।",
        sampleAnswerHint: "Atomicity (सब या कुछ नहीं), Consistency (नियमों का पालन), Isolation (अलग-अलग रन), Durability (स्थायी डेटा)।"
      }
    ]
  },
  odia: {
    fullstack: [
      {
        question: "ରିଆକ୍ଟ୍ (React) ରେ Virtual DOM କ’ଣ ଏବଂ ଏହା ପ୍ରକୃତ DOM ତୁଳନାରେ କିପରି କାର୍ଯ୍ୟକ୍ଷମତା ବୃଦ୍ଧି କରେ? Reconciliation ପ୍ରକ୍ରିୟା କିପରି କାମ କରେ?",
        category: "ଫ୍ରଣ୍ଟଏଣ୍ଡ୍ ଆର୍କିଟେକ୍ଚର୍ (Frontend Architecture)",
        difficulty: "କୋର୍ ବୈଷୟିକ (Core Technical)",
        modelAnswer: "Virtual DOM ହେଉଛି ପ୍ରକୃତ ବ୍ରାଉଜର୍ DOM ର ଏକ ହାଲୁକା (lightweight) ଇନ୍-ମେମୋରୀ ଜାଭାସ୍କ୍ରିପ୍ଟ୍ ଅବ୍‌ଜେକ୍ଟ୍ ପ୍ରତିରୂପ। ଯେତେବେଳେ କମ୍ପୋନେଣ୍ଟ୍ ର state କିମ୍ବା props ପରିବର୍ତ୍ତିତ ହୁଏ, React ଏକ ନୂତନ Virtual DOM ଟ୍ରି ତିଆରି କରେ ଏବଂ Diffing Algorithm (O(N)) ସାହାଯ୍ୟରେ ପୂର୍ବ ଟ୍ରି ସହିତ ତୁଳନା କରେ। କେବଳ ପରିବର୍ତ୍ତିତ ଅଂଶକୁ ହିଁ ପ୍ରକୃତ DOM ରେ update କରାଯାଏ, ଯାହାକୁ Reconciliation କୁହାଯାଏ। ଏହା ବ୍ରାଉଜର୍‌ରେ ବାରମ୍ବାର reflow ଏବଂ repaint କୁ ରୋକି UI କୁ ଦ୍ରୁତ କରେ।",
        tips: "Diffing algorithm, Batching, ଏବଂ ଲିଷ୍ଟ୍‌ରେ Unique Keys ର ଆବଶ୍ୟକତା ସ୍ପଷ୍ଟ ଭାବେ ବର୍ଣ୍ଣନା କରନ୍ତୁ।",
        sampleAnswerHint: "ଇନ୍-ମେମୋରୀ ଅବଜେକ୍ଟ୍, Diffing ଆଲଗୋରିଦିମ୍, କେବଳ ପରିବର୍ତ୍ତିତ ଅଂଶ ଅପଡେଟ୍, ଏବଂ ଦ୍ରୁତ ରେଣ୍ଡରିଂ।"
      },
      {
        question: "ମାଇଏସକ୍ୟୁଏଲ୍ (MySQL) କିମ୍ବା ରିଲେସନାଲ୍ ଡାଟାବେସ୍‌ରେ N+1 କ୍ୱେରୀ ସମସ୍ୟା କ’ଣ ଏବଂ ବ୍ୟାକଏଣ୍ଡ୍‌ରେ ଏହାକୁ କିପରି ଚିହ୍ନଟ ଓ ସମାଧାନ କରାଯାଏ?",
        category: "ଡାଟାବେସ୍ ଏବଂ ବ୍ୟାକଏଣ୍ଡ୍ (Database & Backend)",
        difficulty: "କୋର୍ ବୈଷୟିକ (Core Technical)",
        modelAnswer: "N+1 ସମସ୍ୟା ସେତେବେଳେ ଦେଖାଦିଏ ଯେତେବେଳେ କୋଡ୍ 1 ଟି କ୍ୱେରୀ ଦ୍ୱାରା ମୁଖ୍ୟ ରେକର୍ଡ୍ (ଯଥା: 50 ଜଣ ୟୁଜର୍) ଆଣିବା ପରେ, ଲୁପ୍ (loop) ଭିତରେ ପ୍ରତ୍ୟେକ ରେକର୍ଡ୍ ପାଇଁ ପୁଣି ଗୋଟିଏ ଲେଖାଏଁ ଅତିରିକ୍ତ କ୍ୱେରୀ ଚଳାଏ। ଫଳରେ ସମୁଦାୟ 1 + N = 51 ଥର ଡାଟାବେସ୍ କଲ୍ ହୁଏ, ଯାହା ସିଷ୍ଟମ୍‌କୁ ଧୀମା କରେ। ଏହାର ସମାଧାନ ପାଇଁ SQL ରେ INNER/LEFT JOIN ବ୍ୟବହାର କରନ୍ତୁ କିମ୍ବା ORM ରେ Eager Loading (ଯଥା: Django ରେ select_related / prefetch_related) ବ୍ୟବହାର କରି କେବଳ 1 କିମ୍ବା 2 ଟି କ୍ୱେରୀରେ ସମସ୍ତ ଡାଟା ପ୍ରାପ୍ତ କରନ୍ତୁ।",
        tips: "ଡାଟାବେସ୍ ଲେଟେନ୍ସି ହ୍ରାସ ଏବଂ ଇଣ୍ଡେକ୍ସିଂର ଉପକାରିତା ଉଲ୍ଲେଖ କରନ୍ତୁ।",
        sampleAnswerHint: "ଲୁପ୍ ଭିତରେ ବାରମ୍ବାର କ୍ୱେରୀ, ଡାଟାବେସ୍ ଉପରେ ଚାପ, ଏବଂ SQL JOIN / Eager Loading ଦ୍ୱାରା ସମାଧାନ।"
      },
      {
        question: "ଅବ୍‌ଜେକ୍ଟ୍-ଓରିଏଣ୍ଟେଡ୍ ପ୍ରୋଗ୍ରାମିଂ (OOPs) ର ମୁଖ୍ୟ ଚାରୋଟି ସ୍ତମ୍ଭ କ’ଣ? Polymorphism ର ଏକ ବାସ୍ତବ ପ୍ରୋଜେକ୍ଟ୍ ଉଦାହରଣ ଦିଅନ୍ତୁ।",
        category: "କୋର୍ ସଫ୍ଟୱେର୍ ଇଞ୍ଜିନିୟରିଂ (Core OOPs)",
        difficulty: "ମୌଳିକ (Foundational)",
        modelAnswer: "ଚାରୋଟି ମୁଖ୍ୟ ସ୍ତମ୍ଭ ହେଲା: 1) Encapsulation (ତଥ୍ୟ ଓ ମେଥଡ୍‌କୁ ଏକତ୍ର ସୁରକ୍ଷିତ ରଖିବା), 2) Abstraction (ଅନାବଶ୍ୟକ ଜଟିଳତା ଲୁଚାଇ କେବଳ ଆବଶ୍ୟକ ଇଣ୍ଟରଫେସ୍ ଦେଖାଇବା), 3) Inheritance (କୋଡ୍ ପୁନଃବ୍ୟବହାର), ଏବଂ 4) Polymorphism (ଏକ ନାମ, ବହୁବିଧ କାର୍ଯ୍ୟରୂପ)।\n\nବାସ୍ତବ ଉଦାହରଣ: ଏକ PaymentGateway ବେସ୍ କ୍ଲାସ୍‌ରେ processPayment() ମେଥଡ୍ ଥାଇପାରେ। StripeGateway, RazorpayGateway ଏବଂ PhonePeGateway ଏହାକୁ ନିଜ ନିଜ ହିସାବରେ କାର୍ଯ୍ୟକାରୀ କରନ୍ତି, ଯାହାଦ୍ୱାରା ମୁଖ୍ୟ ଚେକ୍-ଆଉଟ୍ କୋଡ୍ ନ ବଦଳାଇ ନୂଆ ପେମେଣ୍ଟ୍ ଯୋଡ଼ି ହୁଏ।",
        tips: "Method Overriding ଏବଂ Method Overloading ମଧ୍ୟରେ ପାର୍ଥକ୍ୟ ବୁଝାନ୍ତୁ।",
        sampleAnswerHint: "ଚାରିଟି ନୀତିର ନାମ ଏବଂ ପେମେଣ୍ଟ୍ କିମ୍ବା ନୋଟିଫିକେସନ୍ ସର୍ଭିସ୍ ର ଉଦାହରଣ।"
      },
      {
        question: "ଯଦି ପ୍ରୋଜେକ୍ଟ୍ ରିଲିଜ୍ ପୂର୍ବରୁ କୌଣସି ଜରୁରୀ ସମସ୍ୟା (Critical Bug) ଆସେ ଏବଂ ସମୟ କମ୍ ଥାଏ, ତେବେ ଆପଣ କିପରି ସମାଧାନ କରିବେ? (STAR ପଦ୍ଧତିରେ ବର୍ଣ୍ଣନା କରନ୍ତୁ)",
        category: "ବ୍ୟବହାରିକ ଏବଂ ପରିସ୍ଥିତିଗତ (Behavioral STAR)",
        difficulty: "ଏଚ୍.ଆର୍ ଏବଂ ଆଚରଣ (HR Round)",
        modelAnswer: "Situation (ପରିସ୍ଥିତି): ଲାଇଭ୍ ରିଲିଜ୍ ର 2 ଘଣ୍ଟା ପୂର୍ବରୁ ପେମେଣ୍ଟ୍ ଏପିଆଇ ରେ ଟାଇମ୍-ଆଉଟ୍ ଦେଖାଗଲା।\nTask (ଲକ୍ଷ୍ୟ): ସମୟସୀମା ନ ଭାଙ୍ଗି ବଗ୍ ଠିକ୍ କରିବା ଓ ସିଷ୍ଟମ୍ ସ୍ଥିର ରଖିବା।\nAction (ପଦକ୍ଷେପ): ମୁଁ ତୁରନ୍ତ ସର୍ଭର୍ ଏରର୍ ଲଗ୍ ଯାଞ୍ଚ କଲି ଏବଂ ଦେଖିଲି ଏକ ନୂଆ ଫିଲ୍ଡ୍‌ରେ ଇଣ୍ଡେକ୍ସିଂ ନ ଥିବାରୁ ଟେବୁଲ୍ ସ୍କାନ୍ ହେଉଥିଲା। ଟିମ୍ ଲିଡ୍‌ଙ୍କ ସହ କଥା ହୋଇ ସୁରକ୍ଷିତ ଇଣ୍ଡେକ୍ସିଂ ମାଇଗ୍ରେସନ୍ କଲି ଓ ଟେଷ୍ଟ୍ କଲି।\nResult (ଫଳାଫଳ): ସିଷ୍ଟମ୍ ସ୍ୱାଭାବିକ ହେଲା, ସମୟ ପୂର୍ବରୁ ରିଲିଜ୍ ସଫଳ ହେଲା ଏବଂ ଭବିଷ୍ୟତ ପାଇଁ ଅଟୋମେଟେଡ୍ ଟେଷ୍ଟ୍ ଯୋଡ଼ାଗଲା।",
        tips: "ଦଳଗତ ଆଲୋଚନା, ଧୈର୍ଯ୍ୟ ରକ୍ଷା, ଏବଂ ଭବିଷ୍ୟତ ସୁରକ୍ଷା ଉପରେ ଗୁରୁତ୍ୱ ଦିଅନ୍ତୁ।",
        sampleAnswerHint: "STAR: Situation (ପରିସ୍ଥିତି), Task (କାର୍ଯ୍ୟ), Action (ପଦକ୍ଷେପ), Result (ସଫଳ ଫଳାଫଳ)।"
      }
    ],
    dsa: [
      {
        question: "ହାଶ୍ ଟେବୁଲ୍ (Hash Table) କିପରି ହାରାହାରି O(1) ସମୟରେ ତଥ୍ୟ ସନ୍ଧାନ କରେ ଏବଂ Collision ସମସ୍ୟା କିପରି ପରିଚାଳନା କରାଯାଏ?",
        category: "ଡାଟା ଷ୍ଟ୍ରକଚର୍ସ (Data Structures & DSA)",
        difficulty: "କୋର୍ ଡିଏସଏ (Core DSA)",
        modelAnswer: "ହାଶ୍ ଟେବୁଲ୍ ଏକ ହାଶ୍ ଫଙ୍କସନ୍ ବ୍ୟବହାର କରି କୀ (Key) କୁ ଏରେ ଇଣ୍ଡେକ୍ସରେ ପରିଣତ କରେ, ଫଳରେ ସନ୍ଧାନ, ଯୋଡ଼ିବା ଓ କାଢ଼ିବା ହାରାହାରି O(1) ସମୟରେ ହୋଇଥାଏ। Collision ସେତେବେଳେ ହୁଏ ଯେତେବେଳେ ଦୁଇଟି ଭିନ୍ନ କୀ ସମାନ ଇଣ୍ଡେକ୍ସ ଦିଅନ୍ତି। ଏହାକୁ ଦୁଇଟି ମୁଖ୍ୟ ଉପାୟରେ ସମାଧାନ କରାଯାଏ: 1) Separate Chaining (ପ୍ରତ୍ୟେକ ବକେଟ୍‌ରେ ଲିଙ୍କଡ୍ ଲିଷ୍ଟ୍ ଯୋଡ଼ିବା), ଏବଂ 2) Open Addressing (ଲିନିୟର୍ କିମ୍ବା କ୍ୱାଡ୍ରାଟିକ୍ ପ୍ରୋବିଂ)। ଲୋଡ୍ ଫ୍ୟାକ୍ଟର୍ 0.7 ଅତିକ୍ରମ କଲେ ଟେବୁଲ୍ ରି-ହାସିଂ (rehashing) କରି ନିଜର ଆକାର ଦ୍ୱିଗୁଣିତ କରେ।",
        tips: "ଖରାପ ହାଶ୍ ଫଙ୍କସନ୍ ହେଲେ Worst-case O(N) ହେବାର ସମ୍ଭାବନା ଉଲ୍ଲେଖ କରନ୍ତୁ।",
        sampleAnswerHint: "ହାଶ୍ ଫଙ୍କସନ୍, ସେପାରେଟ୍ ଚେନିଂ, ଓପନ୍ ଆଡ୍ରେସିଂ, ଏବଂ ଲୋଡ୍ ଫ୍ୟାକ୍ଟର୍ ରି-ହାସିଂ।"
      },
      {
        question: "ଗ୍ରାଫ୍ ଏବଂ ଟ୍ରି ରେ BFS (Breadth-First Search) ଏବଂ DFS (Depth-First Search) ମଧ୍ୟରେ ପାର୍ଥକ୍ୟ କ’ଣ?",
        category: "ଗ୍ରାଫ୍ ଆଲଗୋରିଦିମ୍ (Graph Algorithms)",
        difficulty: "କୋର୍ ଡିଏସଏ (Core DSA)",
        modelAnswer: "BFS ସ୍ତର-ଅନୁସାରେ (level by level) ଅନୁସନ୍ଧାନ କରେ ଏବଂ ଏଥିପାଇଁ Queue (FIFO) ଡାଟା ଷ୍ଟ୍ରକଚର୍ ବ୍ୟବହାର କରେ। ଏହା ସର୍ଟେଷ୍ଟ୍ ପାଥ୍ (Shortest Path) ଖୋଜିବା ପାଇଁ ସର୍ବୋତ୍ତମ।\n\nDFS ଗଭୀରତା ପର୍ଯ୍ୟନ୍ତ ଯାଏ ଏବଂ Stack (କିମ୍ବା ରିକର୍ସନ୍) ବ୍ୟବହାର କରେ। ଏହା ଟୋପୋଲୋଜିକାଲ୍ ସର୍ଟିଂ ଏବଂ ସାଇକଲ୍ ଡିଟେକ୍ସନ୍ ପାଇଁ ଉପଯୁକ୍ତ। ଉଭୟଙ୍କ Time Complexity ହେଉଛି O(V + E)।",
        tips: "Queue ବନାମ Stack, Shortest path ବନାମ Backtracking ସ୍ପଷ୍ଟ କରନ୍ତୁ।",
        sampleAnswerHint: "Queue vs Stack, ସର୍ଟେଷ୍ଟ ପାଥ୍ vs ଟୋପୋଲୋଜିକାଲ୍ ସର୍ଟ, O(V+E) ସମୟ ଜଟିଳତା।"
      }
    ],
    fresher: [
      {
        question: "ଅପରେଟିଂ ସିଷ୍ଟମ୍‌ରେ Process ଏବଂ Thread ମଧ୍ୟରେ ପାର୍ଥକ୍ୟ କ’ଣ? Context Switching କିପରି କାମ କରେ?",
        category: "ଅପରେଟିଂ ସିଷ୍ଟମ୍ (Operating Systems)",
        difficulty: "କ୍ୟାମ୍ପସ୍ ଫ୍ରେସର୍ସ (Campus Placement)",
        modelAnswer: "Process ହେଉଛି ଏକ ଚାଲୁଥିବା ପ୍ରୋଗ୍ରାମ୍ (Program in Execution) ଯାହାର ନିଜସ୍ୱ ସ୍ୱତନ୍ତ୍ର ମେମୋରୀ ସ୍ପେସ୍ ଥାଏ। Thread ହେଉଛି process ର ଏକ କ୍ଷୁଦ୍ର ଅଂଶ (Lightweight Unit) ଯାହା ପ୍ୟାରେଣ୍ଟ୍ process ର ମେମୋରୀକୁ ଅଂଶୀଦାର କରେ।\n\nContext Switching ହେଉଛି CPU ର ଏକ ପ୍ରକ୍ରିୟା ଯାହା ବର୍ତ୍ତମାନର process/thread ର ଅବସ୍ଥାକୁ PCB/TCB ରେ ସାଇତି ରଖି ଅନ୍ୟ ଏକ ପ୍ରସ୍ତୁତ ଥିବା process/thread କୁ କାର୍ଯ୍ୟକାରୀ କରେ।",
        tips: "Thread Context Switching ଦ୍ରୁତତର କାରଣ ଏଥିରେ ନୂଆ ମେମୋରୀ ସ୍ପେସ୍ ଲୋଡ୍ କରିବାକୁ ପଡ଼େ ନାହିଁ।",
        sampleAnswerHint: "Process ର ସ୍ୱତନ୍ତ୍ର ମେମୋରୀ, Thread ର ସେୟାର୍ଡ ମେମୋରୀ, ଏବଂ PCB ରେ ଡାଟା ସେଭ୍।"
      },
      {
        question: "ଡାଟାବେସ୍ ମ୍ୟାନେଜମେଣ୍ଟ୍ ସିଷ୍ଟମ୍ (DBMS) ରେ ACID ନୀତିଗୁଡ଼ିକ କ’ଣ? ଏକ ବ୍ୟାଙ୍କ ଟ୍ରାଞ୍ଜାକସନ୍ ଉଦାହରଣ ଦେଇ ବୁଝାନ୍ତୁ।",
        category: "ଡାଟାବେସ୍ ସିଷ୍ଟମ୍ (DBMS Core)",
        difficulty: "କ୍ୟାମ୍ପସ୍ ଫ୍ରେସର୍ସ (Campus Placement)",
        modelAnswer: "A (Atomicity): ସମସ୍ତ କାର୍ଯ୍ୟ ସଫଳ ହେବ କିମ୍ବା କୌଣସିଟି ନୁହେଁ (ଖାତା A ରୁ ଟଙ୍କା କଟିଲେ B ରେ ଜମା ହେବା ବାଧ୍ୟତାମୂଳକ)।\nC (Consistency): ଡାଟାବେସ୍ ସର୍ବଦା ନିର୍ଦ୍ଧାରିତ ନିୟମ ଓ ସର୍ତ୍ତ ମାନିବ।\nI (Isolation): ଏକାସାଙ୍ଗରେ ଚାଲୁଥିବା ଟ୍ରାଞ୍ଜାକସନ୍ ପରସ୍ପର ଉପରେ ହସ୍ତକ୍ଷେପ କରିବେ ନାହିଁ।\nD (Durability): ଥରେ କମିଟ୍ (Commit) ହେବା ପରେ ସର୍ଭର୍ କ୍ରାସ୍ ହେଲେ ମଧ୍ୟ ତଥ୍ୟ ସୁରକ୍ଷିତ ରହିବ।",
        tips: "ବ୍ୟାଙ୍କ ଟ୍ରାନ୍ସଫର୍ ବିଫଳତାର ଉଦାହରଣ ଦେଇ ଆଟୋମିସିଟି ବୁଝାନ୍ତୁ।",
        sampleAnswerHint: "Atomicity (ସବୁ ବା କିଛି ନାହିଁ), Consistency (ସଠିକ୍ ସ୍ଥିତି), Isolation (ସ୍ୱତନ୍ତ୍ର), Durability (ସ୍ଥାୟୀ)।"
      }
    ]
  }
};

export const JobskulHireAI: React.FC<JobskulHireAIProps> = ({
  currentUser,
  jobs,
  onNavigateToLearn,
  initialSubTab = 'interview',
  initialLanguage = 'english'
}) => {
  // Main Subtabs: Default to 'interview' so JobskulHireAI interview is immediately showing!
  const [activeSubTab, setActiveSubTab] = useState<'interview' | 'matcher' | 'coverletter'>(initialSubTab);

  // Multilingual Interview State
  const [interviewLanguage, setInterviewLanguage] = useState<InterviewLanguage>(initialLanguage);
  const [interviewRoleTrack, setInterviewRoleTrack] = useState<'fullstack' | 'dsa' | 'fresher'>('fullstack');
  const [interviewMode, setInterviewMode] = useState<'simulator' | 'bank'>('simulator');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Dynamic AI Generation State
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [prepLoading, setPrepLoading] = useState(false);
  const [activeQuestionList, setActiveQuestionList] = useState<InterviewQuestion[]>(
    CURATED_QUESTIONS[initialLanguage].fullstack
  );

  // Simulator Interactive Answering & Audio/Voice State
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [isSpeakingAudio, setIsSpeakingAudio] = useState(false);
  const [isRecordingMic, setIsRecordingMic] = useState(false);
  const [showAnswerHint, setShowAnswerHint] = useState(false);
  const [evaluationLoading, setEvaluationLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);
  const [answeredScores, setAnsweredScores] = useState<Record<number, number>>({});
  const [copiedQuestionIdx, setCopiedQuestionIdx] = useState<number | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // 1. Role Matcher State
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<any>({
    matchPercentage: 92,
    matchCategory: "Highly Recommended",
    matchingSkills: ["Python", "React", "MySQL", "REST APIs"],
    missingSkills: ["Docker Containerization", "Kubernetes"],
    strengths: [
      "Exceptional proficiency in core Python backend frameworks and MySQL database modeling.",
      "Demonstrated experience building end-to-end full stack workflows in React."
    ],
    improvementSuggestions: [
      "Complete the Jobskül Cloud & Containerization project to bridge the DevOps skill gap.",
      "Quantify API response time improvements in your project portfolio."
    ],
    summary: "Candidate profile exhibits strong technical synergy with the target requirements."
  });

  // 2. Cover Letter State
  const [clJobTitle, setClJobTitle] = useState('Full Stack Software Engineer');
  const [clCompany, setClCompany] = useState('CloudSphere Technologies');
  const [clLoading, setClLoading] = useState(false);
  const [coverLetterResult, setCoverLetterResult] = useState(
    `Dear Hiring Team at CloudSphere Technologies,\n\nI am writing to express my eager interest in the Full Stack Software Engineer role. Having engineered end-to-end production systems using Python, Django, React, and MySQL through Jobskül capstone tracks, I am prepared to contribute immediately to your agile sprint cycles.\n\nMy experience includes building resilient RESTful microservices, optimizing complex relational schemas in MySQL, and writing clean, scalable frontend components. I look forward to discussing how my technical background aligns with CloudSphere's product roadmap.\n\nSincerely,\n${currentUser?.name || 'Priya Sharma'}`
  );
  const [clCopied, setClCopied] = useState(false);

  // Speech Recognition Reference
  const recognitionRef = useRef<any>(null);

  // Synchronize initial subtab if props update
  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Update questions whenever language or role track changes
  useEffect(() => {
    const list = CURATED_QUESTIONS[interviewLanguage]?.[interviewRoleTrack] || CURATED_QUESTIONS[interviewLanguage]?.fullstack || [];
    setActiveQuestionList(list);
    setCurrentQuestionIndex(0);
    setCandidateAnswer('');
    setEvaluationResult(null);
    setShowAnswerHint(false);
    stopAudio();
  }, [interviewLanguage, interviewRoleTrack]);

  // Cleanup speech synthesis and recognition on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      stopMic();
    };
  }, []);

  // Text to Speech (Audio playback in English, Hindi, Odia)
  const playAudioQuestion = (text: string) => {
    if (!('speechSynthesis' in window)) {
      setSpeechError('Text-to-speech audio is not supported in this browser.');
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      // Assign language code for speech engine
      if (interviewLanguage === 'hindi') {
        utterance.lang = 'hi-IN';
      } else if (interviewLanguage === 'odia') {
        // Many browsers support hi-IN or en-IN as fallback for Indic languages if Odia voice is unavailable
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-US';
      }

      utterance.onstart = () => setIsSpeakingAudio(true);
      utterance.onend = () => setIsSpeakingAudio(false);
      utterance.onerror = () => setIsSpeakingAudio(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      setIsSpeakingAudio(false);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingAudio(false);
  };

  // Speech Recognition (Microphone Voice-to-Text)
  const toggleMic = () => {
    if (isRecordingMic) {
      stopMic();
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError('Microphone speech recognition is not supported in this browser. Please type your answer.');
      return;
    }

    try {
      setSpeechError(null);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      if (interviewLanguage === 'hindi') {
        recognition.lang = 'hi-IN';
      } else if (interviewLanguage === 'odia') {
        recognition.lang = 'hi-IN'; // Uses Indian phonetics fallback if Odia is not installed in OS
      } else {
        recognition.lang = 'en-US';
      }

      recognition.onstart = () => {
        setIsRecordingMic(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setCandidateAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition error:', e);
        setIsRecordingMic(false);
      };

      recognition.onend = () => {
        setIsRecordingMic(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Recognition start error:', err);
      setIsRecordingMic(false);
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsRecordingMic(false);
  };

  // Evaluate candidate answer with AI
  const handleEvaluateAnswer = async () => {
    const currentQ = activeQuestionList[currentQuestionIndex];
    if (!currentQ || !candidateAnswer.trim()) return;

    setEvaluationLoading(true);
    setSpeechError(null);
    try {
      const res = await fetch('/api/ai/interview-evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ.question,
          candidateAnswer: candidateAnswer.trim(),
          targetRole: customRoleInput || interviewRoleTrack,
          language: interviewLanguage
        })
      });
      const data = await res.json();
      if (data.data) {
        setEvaluationResult(data.data);
        if (data.data.score) {
          setAnsweredScores((prev) => ({
            ...prev,
            [currentQuestionIndex]: data.data.score
          }));
        }
      }
    } catch (e) {
      console.error('Answer evaluation error:', e);
    } finally {
      setEvaluationLoading(false);
    }
  };

  // Generate dynamic questions with Gemini AI
  const handleGenerateCustomQuestions = async () => {
    setPrepLoading(true);
    stopAudio();
    try {
      const res = await fetch('/api/ai/interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: customRoleInput || `${interviewRoleTrack} Engineer`,
          skills: currentUser?.skills || ['React', 'Python', 'SQL'],
          candidateType: 'Fresher / Lateral',
          language: interviewLanguage
        })
      });
      const data = await res.json();
      if (data.data && Array.isArray(data.data.questions) && data.data.questions.length > 0) {
        setActiveQuestionList(data.data.questions);
        setCurrentQuestionIndex(0);
        setCandidateAnswer('');
        setEvaluationResult(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPrepLoading(false);
    }
  };

  const handleCopyQuestion = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestionIdx(idx);
    setTimeout(() => setCopiedQuestionIdx(null), 2000);
  };

  const handleRunMatch = async () => {
    const job = jobs.find(j => j.id === selectedJobId) || jobs[0];
    setMatchLoading(true);
    try {
      const res = await fetch('/api/ai/job-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateSkills: currentUser?.skills || ['Python', 'React', 'MySQL'],
          candidateExp: `${currentUser?.experienceYears || 2} years`,
          jobSkills: job.requiredSkills,
          jobTitle: job.title,
          jobDesc: job.description
        })
      });
      const data = await res.json();
      if (data.result) {
        setMatchResult(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setMatchLoading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    setClLoading(true);
    try {
      const res = await fetch('/api/ai/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: clJobTitle,
          company: clCompany,
          candidateName: currentUser?.name || 'Priya Sharma',
          candidateSkills: currentUser?.skills || ['Python', 'React', 'MySQL'],
          experienceYears: currentUser?.experienceYears || 2
        })
      });
      const data = await res.json();
      if (data.coverLetter) {
        setCoverLetterResult(data.coverLetter);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setClLoading(false);
    }
  };

  const currentQ = activeQuestionList[currentQuestionIndex] || activeQuestionList[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* HERO HEADER */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>JobskulHireAI • Native Multilingual Interview Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              AI Technical & HR Interview Room
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              Practice real-time technical, system design, and behavioral questions with instant AI evaluation, speech audio playback, voice recognition, and curated model answers in <strong className="text-white">English</strong>, <strong className="text-amber-300 font-bold">हिन्दी (Hindi)</strong>, and <strong className="text-emerald-300 font-bold">ଓଡ଼ିଆ (Odia)</strong>.
            </p>

            {/* Language Quick Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-400 font-medium mr-1">Available Languages:</span>
              <button
                onClick={() => setInterviewLanguage('english')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  interviewLanguage === 'english'
                    ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400/40'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <span>🇬🇧 English</span>
              </button>
              <button
                onClick={() => setInterviewLanguage('hindi')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  interviewLanguage === 'hindi'
                    ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-400/40'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <span>🇮🇳 हिन्दी (Hindi)</span>
              </button>
              <button
                onClick={() => setInterviewLanguage('odia')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  interviewLanguage === 'odia'
                    ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/40'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <span>🇮🇳 ଓଡ଼ିଆ (Odia)</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700/80 text-center w-full lg:w-auto lg:min-w-[240px] shrink-0 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Interview Readiness Score</span>
            <div className="flex items-center justify-center space-x-2">
              <Award className="w-6 h-6 text-amber-400" />
              <p className="text-2xl font-black text-white font-geometric-mono">9.4 / 10</p>
            </div>
            <p className="text-[11px] text-emerald-400 font-semibold">ATS & Recruiter Approved</p>
          </div>
        </div>
      </div>

      {/* PRIMARY NAVIGATION SUB-TABS */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('interview')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'interview'
              ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>1. HireAI Mock Interview (English • हिन्दी • ଓଡ଼ିଆ)</span>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
            Live
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('matcher')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'matcher'
              ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>2. Profile & Role Fit Analysis</span>
        </button>

        <button
          onClick={() => setActiveSubTab('coverletter')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'coverletter'
              ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>3. Tailored Cover Letter</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: HIREAI MULTILINGUAL MOCK INTERVIEW (ENGLISH, HINDI, ODIA)
         ========================================================================= */}
      {activeSubTab === 'interview' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Controls Bar: Language Switcher, Role Track, and Mode */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Language Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5 text-purple-600" />
                  <span>Interview Language / साक्षात्कार की भाषा / ସାକ୍ଷାତକାର ଭାଷା:</span>
                </label>
                <div className="inline-flex p-1 bg-slate-100/90 rounded-xl border border-slate-200/80">
                  <button
                    onClick={() => setInterviewLanguage('english')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                      interviewLanguage === 'english'
                        ? 'bg-white text-blue-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>🇬🇧 English</span>
                  </button>
                  <button
                    onClick={() => setInterviewLanguage('hindi')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                      interviewLanguage === 'hindi'
                        ? 'bg-white text-purple-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>🇮🇳 हिन्दी (Hindi)</span>
                  </button>
                  <button
                    onClick={() => setInterviewLanguage('odia')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                      interviewLanguage === 'odia'
                        ? 'bg-white text-emerald-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>🇮🇳 ଓଡ଼ିଆ (Odia)</span>
                  </button>
                </div>
              </div>

              {/* Role Track Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span>Interview Domain / डोमेन / ବିଭାଗ:</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setInterviewRoleTrack('fullstack')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      interviewRoleTrack === 'fullstack'
                        ? 'bg-purple-100 text-purple-900 border border-purple-300'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    Full Stack & Cloud
                  </button>
                  <button
                    onClick={() => setInterviewRoleTrack('dsa')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      interviewRoleTrack === 'dsa'
                        ? 'bg-purple-100 text-purple-900 border border-purple-300'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    DSA & Problem Solving
                  </button>
                  <button
                    onClick={() => setInterviewRoleTrack('fresher')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      interviewRoleTrack === 'fresher'
                        ? 'bg-purple-100 text-purple-900 border border-purple-300'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    Core CS & Freshers
                  </button>
                </div>
              </div>

              {/* Mode Toggle: Simulator vs Question Bank */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Practice Mode:</span>
                </label>
                <div className="inline-flex p-1 bg-slate-100/90 rounded-xl border border-slate-200/80">
                  <button
                    onClick={() => setInterviewMode('simulator')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                      interviewMode === 'simulator'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>AI Simulator</span>
                  </button>
                  <button
                    onClick={() => setInterviewMode('bank')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                      interviewMode === 'bank'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Question Bank</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Custom AI Generation Form */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={customRoleInput}
                onChange={(e) => setCustomRoleInput(e.target.value)}
                placeholder={
                  interviewLanguage === 'hindi'
                    ? "कस्टम जॉब रोल लिखें (उदा: Python बैकएंड डेवलपर, React आर्किटेक्ट)..."
                    : interviewLanguage === 'odia'
                    ? "କଷ୍ଟମ୍ ଚାକିରି ପଦବୀ ଲେଖନ୍ତୁ (ଯଥା: Python Backend Developer, React Architect)..."
                    : "Enter custom role (e.g. Senior DevOps Architect, Java SpringBoot Engineer)..."
                }
                className="flex-1 w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <button
                onClick={handleGenerateCustomQuestions}
                disabled={prepLoading}
                className="w-full sm:w-auto px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center space-x-2 transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className={`w-3.5 h-3.5 ${prepLoading ? 'animate-spin' : ''}`} />
                <span>
                  {prepLoading
                    ? interviewLanguage === 'hindi'
                      ? 'प्रश्न तैयार हो रहे हैं...'
                      : interviewLanguage === 'odia'
                      ? 'ପ୍ରଶ୍ନ ତିଆରି ହେଉଛି...'
                      : 'Generating Questions...'
                    : interviewLanguage === 'hindi'
                    ? 'AI से नए प्रश्न बनाएं'
                    : interviewLanguage === 'odia'
                    ? 'AI ନୂଆ ପ୍ରଶ୍ନ ତିଆରି କରନ୍ତୁ'
                    : 'Generate AI Questions'}
                </span>
              </button>
            </div>

            {speechError && (
              <div className="p-3 bg-amber-50 text-amber-800 text-xs rounded-xl border border-amber-200 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{speechError}</span>
              </div>
            )}
          </div>

          {/* =========================================================================
              VIEW A: INTERACTIVE LIVE AI INTERVIEW SIMULATOR
             ========================================================================= */}
          {interviewMode === 'simulator' && currentQ && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Current Question & Audio Player (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 relative overflow-hidden">
                  {/* Top Bar: Progress and Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider">
                        {currentQ.category}
                      </span>
                      {currentQ.difficulty && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                          {currentQ.difficulty}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500">
                      <span>
                        {interviewLanguage === 'hindi' ? 'प्रश्न' : interviewLanguage === 'odia' ? 'ପ୍ରଶ୍ନ' : 'Question'}{' '}
                        {currentQuestionIndex + 1} of {activeQuestionList.length}
                      </span>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-600 h-full transition-all duration-300"
                      style={{
                        width: `${((currentQuestionIndex + 1) / activeQuestionList.length) * 100}%`
                      }}
                    />
                  </div>

                  {/* Main Question Display */}
                  <div className="space-y-2 pt-1">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {currentQ.question}
                    </h2>
                  </div>

                  {/* Audio Read-Out Question Button */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      onClick={() =>
                        isSpeakingAudio ? stopAudio() : playAudioQuestion(currentQ.question)
                      }
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                        isSpeakingAudio
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200'
                      }`}
                      title="Audio Speech Synthesis"
                    >
                      {isSpeakingAudio ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                          <span>
                            {interviewLanguage === 'hindi'
                              ? 'ऑडियो रोकें'
                              : interviewLanguage === 'odia'
                              ? 'ଅଡିଓ ବନ୍ଦ କରନ୍ତୁ'
                              : 'Stop Audio'}
                          </span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                          <span>
                            {interviewLanguage === 'hindi'
                              ? 'प्रश्न सुनें (ऑडियो)'
                              : interviewLanguage === 'odia'
                              ? 'ପ୍ରଶ୍ନ ଶୁଣନ୍ତୁ (ଅଡିଓ)'
                              : 'Listen to Question (Audio)'}
                          </span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopyQuestion(currentQ.question, currentQuestionIndex)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center space-x-1 transition-all cursor-pointer"
                    >
                      {copiedQuestionIdx === currentQuestionIndex ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                      )}
                      <span>
                        {copiedQuestionIdx === currentQuestionIndex
                          ? interviewLanguage === 'hindi'
                            ? 'कॉपी हो गया'
                            : interviewLanguage === 'odia'
                            ? 'କପି ହୋଇଗଲା'
                            : 'Copied!'
                          : interviewLanguage === 'hindi'
                          ? 'प्रश्न कॉपी करें'
                          : interviewLanguage === 'odia'
                          ? 'ପ୍ରଶ୍ନ କପି କରନ୍ତୁ'
                          : 'Copy Question'}
                      </span>
                    </button>

                    <button
                      onClick={() => setShowAnswerHint(!showAnswerHint)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 flex items-center space-x-1 transition-all cursor-pointer ml-auto"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>
                        {showAnswerHint
                          ? interviewLanguage === 'hindi'
                            ? 'संकेत छिपाएं'
                            : interviewLanguage === 'odia'
                            ? 'ସଙ୍କେତ ଲୁଚାନ୍ତୁ'
                            : 'Hide Hint'
                          : interviewLanguage === 'hindi'
                          ? 'संकेत देखें'
                          : interviewLanguage === 'odia'
                          ? 'ସଙ୍କେତ ଦେଖନ୍ତୁ'
                          : 'View Hint'}
                      </span>
                    </button>
                  </div>

                  {/* Expandable Hint */}
                  {showAnswerHint && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 animate-in fade-in space-y-1">
                      <p className="font-bold flex items-center space-x-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        <span>
                          {interviewLanguage === 'hindi'
                            ? 'उत्तर के मुख्य बिंदु:'
                            : interviewLanguage === 'odia'
                            ? 'ଉତ୍ତରର ମୁଖ୍ୟ ପଏଣ୍ଟ:'
                            : 'Key points to include:'}
                        </span>
                      </p>
                      <p>{currentQ.sampleAnswerHint || currentQ.tips}</p>
                    </div>
                  )}

                  {/* Candidate Answer Box with Voice Dictation */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                        <span>
                          {interviewLanguage === 'hindi'
                            ? 'आपका उत्तर (बोलें या लिखें):'
                            : interviewLanguage === 'odia'
                            ? 'ଆପଣଙ୍କ ଉତ୍ତର (କୁହନ୍ତୁ ବା ଲେଖନ୍ତୁ):'
                            : 'Your Spoken or Written Answer:'}
                        </span>
                      </label>

                      <button
                        onClick={toggleMic}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                          isRecordingMic
                            ? 'bg-red-600 text-white animate-pulse'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                        title="Voice Microphone Speech-to-Text"
                      >
                        {isRecordingMic ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                        <span>
                          {isRecordingMic
                            ? interviewLanguage === 'hindi'
                              ? 'रिकॉर्डिंग चालू है...'
                              : interviewLanguage === 'odia'
                              ? 'ରେକର୍ଡିଂ ଚାଲୁଛି...'
                              : 'Listening...'
                            : interviewLanguage === 'hindi'
                            ? 'माइक से बोलें'
                            : interviewLanguage === 'odia'
                            ? 'ମାଇକ୍‌ରେ କୁହନ୍ତୁ'
                            : 'Voice Input'}
                        </span>
                      </button>
                    </div>

                    <textarea
                      rows={5}
                      value={candidateAnswer}
                      onChange={(e) => setCandidateAnswer(e.target.value)}
                      placeholder={
                        interviewLanguage === 'hindi'
                          ? "यहाँ अपना उत्तर हिंदी या अंग्रेजी तकनीकी शब्दों के साथ विस्तार से लिखें अथवा ऊपर दिए माइक बटन से बोलें..."
                          : interviewLanguage === 'odia'
                          ? "ଏଠାରେ ଆପଣଙ୍କ ଉତ୍ତର ଓଡ଼ିଆ କିମ୍ବା ଇଂରାଜୀରେ ଲେଖନ୍ତୁ ଅଥବା ମାଇକ୍ ବଟନ୍ ଦବାଇ କୁହନ୍ତୁ..."
                          : "Type your answer here or click 'Voice Input' to speak your response directly into your browser microphone..."
                      }
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 leading-relaxed focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-400">
                        {candidateAnswer.trim().split(/\s+/).filter(Boolean).length}{' '}
                        {interviewLanguage === 'hindi'
                          ? 'शब्द'
                          : interviewLanguage === 'odia'
                          ? 'ଶବ୍ଦ'
                          : 'words'}
                      </span>

                      <button
                        onClick={handleEvaluateAnswer}
                        disabled={evaluationLoading || !candidateAnswer.trim()}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5 transition-all disabled:opacity-50 cursor-pointer"
                      >
                        <Sparkles className={`w-3.5 h-3.5 ${evaluationLoading ? 'animate-spin' : ''}`} />
                        <span>
                          {evaluationLoading
                            ? interviewLanguage === 'hindi'
                              ? 'मूल्यांकन हो रहा है...'
                              : interviewLanguage === 'odia'
                              ? 'ମୂଲ୍ୟାଙ୍କନ ଚାଲୁଛି...'
                              : 'AI Evaluating...'
                            : interviewLanguage === 'hindi'
                            ? 'AI उत्तर मूल्यांकन प्राप्त करें'
                            : interviewLanguage === 'odia'
                            ? 'AI ଉତ୍ତର ମୂଲ୍ୟାଙ୍କନ କରନ୍ତୁ'
                            : 'Submit for AI Evaluation'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Navigation Buttons: Previous / Next */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        if (currentQuestionIndex > 0) {
                          setCurrentQuestionIndex(currentQuestionIndex - 1);
                          setCandidateAnswer('');
                          setEvaluationResult(null);
                          stopAudio();
                        }
                      }}
                      disabled={currentQuestionIndex === 0}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                    >
                      ←{' '}
                      {interviewLanguage === 'hindi'
                        ? 'पिछला प्रश्न'
                        : interviewLanguage === 'odia'
                        ? 'ପୂର୍ବ ପ୍ରଶ୍ନ'
                        : 'Previous'}
                    </button>

                    <button
                      onClick={() => {
                        if (currentQuestionIndex < activeQuestionList.length - 1) {
                          setCurrentQuestionIndex(currentQuestionIndex + 1);
                          setCandidateAnswer('');
                          setEvaluationResult(null);
                          stopAudio();
                        }
                      }}
                      disabled={currentQuestionIndex >= activeQuestionList.length - 1}
                      className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center space-x-1 disabled:opacity-40 cursor-pointer"
                    >
                      <span>
                        {interviewLanguage === 'hindi'
                          ? 'अगला प्रश्न'
                          : interviewLanguage === 'odia'
                          ? 'ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ'
                          : 'Next Question'}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Live Feedback & Model Answer (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* AI Evaluation Card */}
                {evaluationResult ? (
                  <div className="bg-white rounded-2xl border border-purple-200 p-5 shadow-md space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-purple-100">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                          {interviewLanguage === 'hindi'
                            ? 'AI साक्षात्कार परिणाम'
                            : interviewLanguage === 'odia'
                            ? 'AI ସାକ୍ଷାତକାର ଫଳାଫଳ'
                            : 'AI Evaluation Scorecard'}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{evaluationResult.verdict}</h4>
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-purple-50 border-2 border-purple-500 flex flex-col items-center justify-center shrink-0">
                        <span className="text-base font-black text-purple-700">
                          {evaluationResult.score}
                        </span>
                        <span className="text-[8px] font-bold text-purple-600 uppercase">/ 10</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {evaluationResult.summary}
                    </p>

                    {/* Strengths */}
                    {evaluationResult.strengths && evaluationResult.strengths.length > 0 && (
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1 text-xs">
                        <p className="font-bold text-emerald-950 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>
                            {interviewLanguage === 'hindi'
                              ? 'मजबूत बिंदु (Strengths):'
                              : interviewLanguage === 'odia'
                              ? 'ଶକ୍ତିଶାଳୀ ଦିଗ (Strengths):'
                              : 'Key Strengths Identified:'}
                          </span>
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 text-emerald-900 text-[11px]">
                          {evaluationResult.strengths.map((str: string, i: number) => (
                            <li key={i}>{str}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Improvements */}
                    {evaluationResult.improvements && evaluationResult.improvements.length > 0 && (
                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1 text-xs">
                        <p className="font-bold text-amber-950 flex items-center space-x-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          <span>
                            {interviewLanguage === 'hindi'
                              ? 'सुधार के बिंदु (Suggestions):'
                              : interviewLanguage === 'odia'
                              ? 'ଉନ୍ନତି କରିବାକୁ ଥିବା ପଏଣ୍ଟ (Suggestions):'
                              : 'Recommendations for Improvement:'}
                          </span>
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 text-amber-900 text-[11px]">
                          {evaluationResult.improvements.map((imp: string, i: number) => (
                            <li key={i}>{imp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-purple-50/60 to-indigo-50/60 rounded-2xl border border-purple-200/80 p-5 shadow-xs text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-2xs border border-purple-200 flex items-center justify-center mx-auto text-purple-600">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {interviewLanguage === 'hindi'
                        ? 'AI वास्तविक समय में मूल्यांकन करेगा'
                        : interviewLanguage === 'odia'
                        ? 'AI ପ୍ରତ୍ୟକ୍ଷ ମୂଲ୍ୟାଙ୍କନ କରିବ'
                        : 'Real-Time AI Response Scoring'}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {interviewLanguage === 'hindi'
                        ? 'अपना उत्तर टाइप करें या माइक से बोलें और "AI उत्तर मूल्यांकन प्राप्त करें" पर क्लिक करें। आपको तुरंत 10 में से स्कोर, मजबूत पक्ष और सुधार के टिप्स प्राप्त होंगे।'
                        : interviewLanguage === 'odia'
                        ? 'ଆପଣଙ୍କ ଉତ୍ତର ଲେଖନ୍ତୁ କିମ୍ବା ମାଇକ୍‌ରେ କୁହନ୍ତୁ ଏବଂ "AI ଉତ୍ତର ମୂଲ୍ୟାଙ୍କନ କରନ୍ତୁ" ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ। ଆପଣଙ୍କୁ ତୁରନ୍ତ ସ୍କୋର ଓ ପରାମର୍ଶ ମିଳିବ।'
                        : "Speak or type your answer and submit for immediate AI assessment. You'll receive a detailed 10-point scoring matrix with recruiter feedback."}
                    </p>
                  </div>
                )}

                {/* Model Answer & Recruiter Tips Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span>
                        {interviewLanguage === 'hindi'
                          ? 'आदर्श मॉडल उत्तर (Model Answer)'
                          : interviewLanguage === 'odia'
                          ? 'ଆଦର୍ଶ ମଡେଲ୍ ଉତ୍ତର (Model Answer)'
                          : 'Curated Benchmark Answer'}
                      </span>
                    </h4>
                    <button
                      onClick={() => handleCopyQuestion(currentQ.modelAnswer, 999)}
                      className="text-[10px] text-purple-600 hover:text-purple-700 font-bold"
                    >
                      {interviewLanguage === 'hindi'
                        ? 'उत्तर कॉपी करें'
                        : interviewLanguage === 'odia'
                        ? 'ଉତ୍ତର କପି କରନ୍ତୁ'
                        : 'Copy Answer'}
                    </button>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-sans bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    {currentQ.modelAnswer}
                  </p>

                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-950 flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block">
                        {interviewLanguage === 'hindi'
                          ? 'साक्षात्कारकर्ता की सलाह (Interviewer Tip):'
                          : interviewLanguage === 'odia'
                          ? 'ସାକ୍ଷାତକାର ପରାମର୍ଶ (Interviewer Tip):'
                          : 'Interviewer Tip:'}
                      </strong>
                      <span className="text-[11px] leading-relaxed text-purple-900">{currentQ.tips}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW B: MULTILINGUAL QUESTION BANK & SOLUTIONS
             ========================================================================= */}
          {interviewMode === 'bank' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600 font-medium">
                  Showing {activeQuestionList.length} curated interview questions in{' '}
                  <strong className="capitalize text-slate-900">
                    {interviewLanguage === 'hindi'
                      ? 'हिन्दी (Hindi)'
                      : interviewLanguage === 'odia'
                      ? 'ଓଡ଼ିଆ (Odia)'
                      : 'English'}
                  </strong>
                </p>

                <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 text-xs font-bold font-geometric-mono">
                  Track: {interviewRoleTrack.toUpperCase()}
                </span>
              </div>

              <div className="space-y-4">
                {activeQuestionList.map((qItem, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 transition-all hover:border-purple-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase">
                          {qItem.category}
                        </span>
                        {qItem.difficulty && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                            {qItem.difficulty}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => playAudioQuestion(qItem.question)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-700 transition-colors cursor-pointer"
                          title="Listen to question audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCopyQuestion(qItem.question, idx)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                          title="Copy question text"
                        >
                          {copiedQuestionIdx === idx ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                      </div>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {qItem.question}
                    </h3>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-1.5">
                      <p className="font-bold text-slate-900">
                        {interviewLanguage === 'hindi'
                          ? 'आदर्श मॉडल उत्तर:'
                          : interviewLanguage === 'odia'
                          ? 'ଆଦର୍ଶ ମଡେଲ୍ ଉତ୍ତର:'
                          : 'Recommended Model Answer:'}
                      </p>
                      <p>{qItem.modelAnswer}</p>
                    </div>

                    <div className="flex items-start space-x-2 text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>
                          {interviewLanguage === 'hindi'
                            ? 'साक्षात्कारकर्ता की परख:'
                            : interviewLanguage === 'odia'
                            ? 'ସାକ୍ଷାତକାର ପରାମର୍ଶ:'
                            : 'Interviewer Tip:'}{' '}
                        </strong>
                        <span>{qItem.tips}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 2: ROLE FIT & ATS MATCHER
         ========================================================================= */}
      {activeSubTab === 'matcher' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
          {/* Target Job Selector */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span>Select Target Opportunity</span>
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Choose Open Job:</label>
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
              >
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title} — {j.company} ({j.location})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
              <p><strong>Candidate:</strong> {currentUser?.name || 'Priya Sharma'}</p>
              <p><strong>Skills:</strong> {currentUser?.skills?.join(', ') || 'Python, React, MySQL'}</p>
              <p><strong>Experience:</strong> {currentUser?.experienceYears || 2} Years</p>
            </div>

            <button
              onClick={handleRunMatch}
              disabled={matchLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${matchLoading ? 'animate-spin' : ''}`} />
              <span>{matchLoading ? 'Analyzing Alignment...' : 'Evaluate Role Fit & Gap Analysis'}</span>
            </button>
          </div>

          {/* Match Score & Analysis Result */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 border-4 border-blue-600 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xl font-black text-blue-700">{matchResult.matchPercentage}%</span>
                  <span className="text-[8px] font-bold text-blue-600 uppercase">Match</span>
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {matchResult.matchCategory}
                  </span>
                  <p className="text-xs text-slate-600 mt-1">{matchResult.summary}</p>
                </div>
              </div>
            </div>

            {/* Overlap & Gaps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Overlapping Skills */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-emerald-900 flex items-center space-x-1.5 uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Skill Overlap</span>
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {matchResult.matchingSkills.map((s: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-white text-emerald-800 rounded-md text-xs font-semibold border border-emerald-300">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills / Gap */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-amber-900 flex items-center space-x-1.5 uppercase">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Skill Gap to Address</span>
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {matchResult.missingSkills.map((s: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-white text-amber-800 rounded-md text-xs font-semibold border border-amber-300">
                      + {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actionable Recommendations */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span>Recommendations to Elevate Your Profile</span>
              </h4>
              <div className="space-y-2">
                {matchResult.improvementSuggestions.map((sug: string, idx: number) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 flex items-start space-x-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{sug}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onNavigateToLearn}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Enroll in Jobskül Project Tracks to Bridge Gaps</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: CUSTOM COVER LETTER
         ========================================================================= */}
      {activeSubTab === 'coverletter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Target Role Details</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={clJobTitle}
                  onChange={(e) => setClJobTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hiring Company</label>
                <input
                  type="text"
                  value={clCompany}
                  onChange={(e) => setClCompany(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-slate-600">
                <p><strong>Candidate:</strong> {currentUser?.name || 'Priya Sharma'}</p>
                <p className="mt-1"><strong>Skills:</strong> {currentUser?.skills?.join(', ') || 'Python, React, MySQL'}</p>
              </div>

              <button
                onClick={handleGenerateCoverLetter}
                disabled={clLoading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-xs flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <FileText className={`w-4 h-4 ${clLoading ? 'animate-spin' : ''}`} />
                <span>{clLoading ? 'Crafting Letter...' : 'Generate Tailored Cover Letter'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm">Tailored Professional Cover Letter</h4>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(coverLetterResult);
                  setClCopied(true);
                  setTimeout(() => setClCopied(false), 2000);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                {clCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{clCopied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
              </button>
            </div>

            <textarea
              rows={12}
              value={coverLetterResult}
              onChange={(e) => setCoverLetterResult(e.target.value)}
              className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed font-sans focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
