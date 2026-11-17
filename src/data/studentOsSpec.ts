import { OsSystemSpec } from './osSpecTypes';

export const STUDENT_OS_SPEC: OsSystemSpec = {
  slug: 'student-os',
  name: 'Student OS',
  eyebrow: 'Inside Student OS · Core Architecture',
  sectionHeadline: '1 Hub, 10 Modules, 12 Linked Databases',
  sectionSubheadline:
    'Courses, assignments, notes, spaced repetition, exams, GPA, and student finances in one system.',
  overviewPillars: [
    {
      id: 'hub-modules',
      label: 'Command Hub + Modules',
      metric: '1 + 10',
      detail: 'Central Hub plus 10 focused study & life pages.',
    },
    {
      id: 'linked-dbs',
      label: 'Connected Databases',
      metric: '12 DBs',
      detail: 'Courses, tasks, flashcards, exams, GPA & aid.',
    },
    {
      id: 'prebuilt-views',
      label: 'Pre-Built Views',
      metric: '24+ Views',
      detail: 'Due queues, boards, GPA rollups & calendars.',
    },
    {
      id: 'ready-templates',
      label: 'Page Templates',
      metric: '8 Templates',
      detail: 'Cornell notes, lab reports & 14-day exam sprints.',
    },
  ],
  moduleCategories: [
    'All',
    'Core Hub',
    'Courses & Notes',
    'Recall & Exams',
    'Life & System',
  ],
  modules: [
    {
      id: 'student-hub',
      number: '01',
      shortLabel: 'Main Hub',
      title: 'Student Command Hub',
      category: 'Core Hub',
      summary:
        'Your daily cockpit showing classes, due-soon tasks, recall cards, and quick-capture buttons.',
      whatItContains: [
        'Quick Capture Bar — Add deliverables, lecture notes, flashcards, or sessions in one click.',
        '7-Day Deadline Radar — Flags tasks due today or within 72 hours automatically.',
        'Weekly Review Checklist — 5-step Sunday reset to clear inbox and prep next week.',
      ],
      includedViews: [
        {
          name: 'This Week’s Deliverables',
          layout: 'Table',
          description: 'Active tasks sorted by due date and course.',
        },
        {
          name: 'Courses Grid',
          layout: 'Gallery',
          description: 'Enrolled classes with live grade & progress.',
        },
        {
          name: 'Master Semester Calendar',
          layout: 'Calendar',
          description: 'Deadlines, labs, exams, and study blocks.',
        },
      ],
      keyFormulasAndProperties: [
        '7-Day urgency flags (Overdue / Due Soon)',
        'Spaced recall queue filter (Review <= Today)',
      ],
      connectedDatabases: ['Courses', 'Assignments', 'Flashcards', 'Exams'],
      includedSubTemplates: ['Quick Task Entry', 'Sunday Weekly Reset'],
    },
    {
      id: 'courses-syllabi',
      number: '02',
      shortLabel: 'Courses & Syllabi',
      title: 'Courses & Syllabi Tracker',
      category: 'Courses & Notes',
      summary:
        'Class homepages storing professor office hours, textbook links, grading weights, and topics.',
      whatItContains: [
        'Course Workspace Pages — Linked syllabus units, reading list, and lecture notes.',
        'Grading Weight Table — Tracks exam, lab, and homework percentage weights.',
        'Syllabus Progress Rollup — Auto-calculates % of topics completed.',
      ],
      includedViews: [
        {
          name: 'Active Semester Grid',
          layout: 'Gallery',
          description: 'All active courses grouped by term.',
        },
        {
          name: 'Course Timeline',
          layout: 'Timeline',
          description: '16-week term milestones per class.',
        },
      ],
      keyFormulasAndProperties: [
        'Weighted progress rollup across syllabus units',
        'Course code & credit hours metadata',
      ],
      connectedDatabases: ['Courses', 'Assignments', 'Lecture Notes', 'Exams'],
      includedSubTemplates: ['Course Syllabus Setup'],
    },
    {
      id: 'assignments-deadlines',
      number: '03',
      shortLabel: 'Assignments',
      title: 'Assignments & Deadlines',
      category: 'Core Hub',
      summary:
        'Track essays, problem sets, group projects, and lab submissions from To-Do to Submitted.',
      whatItContains: [
        'Status Workflow Board — Move tasks from Not Started to Submitted.',
        'Grade Weight Priority — Separates high-weight papers from minor quizzes.',
        'Overdue Aging Alerts — Highlights late work automatically.',
      ],
      includedViews: [
        {
          name: 'Urgent 7-Day Queue',
          layout: 'List',
          description: 'Tasks due this week grouped by course.',
        },
        {
          name: 'Deliverables Board',
          layout: 'Board',
          description: 'Kanban status view across classes.',
        },
        {
          name: 'Submission Calendar',
          layout: 'Calendar',
          description: 'Monthly due-date planner.',
        },
      ],
      keyFormulasAndProperties: [
        'Days Remaining countdown formula',
        'Weight Impact % tagging',
      ],
      connectedDatabases: ['Assignments & Deliverables', 'Courses'],
      includedSubTemplates: ['Essay Outline Scaffold', 'Lab Report Sheet'],
    },
    {
      id: 'lecture-notes',
      number: '04',
      shortLabel: 'Lecture Notes',
      title: 'Cornell Lecture Notes',
      category: 'Courses & Notes',
      summary:
        'Structured Cornell note-taking linked directly to syllabus topics and recall cards.',
      whatItContains: [
        'Cornell 2-Column Layout — Cue questions, class notes, and takeaway summary.',
        'Pass Status Tracker — Tracks First Pass, Consolidated, and Quiz Ready.',
        'Direct Card Linking — Promote key definitions straight to Flashcards.',
      ],
      includedViews: [
        {
          name: 'Needs First Pass',
          layout: 'Table',
          description: 'Fresh notes awaiting cleanup & summary.',
        },
        {
          name: 'Notes Library by Course',
          layout: 'Gallery',
          description: 'Searchable archive by semester topic.',
        },
      ],
      keyFormulasAndProperties: [
        'Review Pass status property',
        'Two-way Course & Flashcard relations',
      ],
      connectedDatabases: ['Lecture Notes', 'Courses', 'Flashcards'],
      includedSubTemplates: ['Cornell Lecture Sheet'],
    },
    {
      id: 'spaced-repetition',
      number: '05',
      shortLabel: 'Spaced Repetition',
      title: 'Spaced Repetition & Flashcards',
      category: 'Recall & Exams',
      summary:
        'Active recall engine using Notion toggles and 1d, 3d, 7d, 21d, 45d review intervals.',
      whatItContains: [
        'Toggle Q&A Cards — Question header with answer tucked inside.',
        'Automated Next-Review Date — Schedules intervals from Again / Hard / Good / Easy.',
        'Weak Card Filter — Isolate hard formulas by class or exam.',
      ],
      includedViews: [
        {
          name: 'Today’s Review Queue',
          layout: 'Table',
          description: 'Cards where Next Review <= Today.',
        },
        {
          name: 'Difficult Cards Board',
          layout: 'Board',
          description: 'Grouped by Recall Confidence score.',
        },
      ],
      keyFormulasAndProperties: [
        'Dynamic interval dateAdd() formula',
        'Confidence rating selector',
      ],
      connectedDatabases: ['Flashcards', 'Lecture Notes', 'Exams', 'Courses'],
      includedSubTemplates: ['Recall Deck Entry'],
    },
    {
      id: 'exams-revision',
      number: '06',
      shortLabel: 'Exams & Sprints',
      title: 'Exams & Revision Sprints',
      category: 'Recall & Exams',
      summary:
        'Organize midterms and finals with readiness checklists, past papers, and countdowns.',
      whatItContains: [
        'Countdown Dashboard — Days remaining to every midterm and final.',
        'Coverage Checklist — Audit syllabus topics and practice exams completed.',
        'Study Session Links — Connects timed Pomodoro hours to each test.',
      ],
      includedViews: [
        {
          name: 'Exam Calendar',
          layout: 'Calendar',
          description: 'All test dates, rooms, and allowed aids.',
        },
        {
          name: 'Readiness Board',
          layout: 'Board',
          description: 'Confidence tiers across upcoming exams.',
        },
      ],
      keyFormulasAndProperties: [
        'Exam readiness rollup from covered notes',
        'Logged revision hours summary',
      ],
      connectedDatabases: ['Exams & Sprints', 'Courses', 'Flashcards', 'Study Sessions'],
      includedSubTemplates: ['14-Day Exam Sprint'],
    },
    {
      id: 'gpa-grades',
      number: '07',
      shortLabel: 'GPA & Grades',
      title: 'Weighted GPA & Gradebook',
      category: 'Recall & Exams',
      summary:
        'Automatic 4.0 weighted grade calculator across midterms, labs, homework, and credits.',
      whatItContains: [
        'Live Course Grade Rollup — Multiplies earned scores by syllabus weight.',
        'Cumulative Term GPA — Credit-weighted GPA computed across semesters.',
        'Target Score Check — Shows points needed on finals for your target grade.',
      ],
      includedViews: [
        {
          name: 'Active Gradebook',
          layout: 'Table',
          description: 'Scores, weights, and weighted totals.',
        },
        {
          name: 'Semester GPA Summary',
          layout: 'Gallery',
          description: 'Credit-weighted GPA cards by term.',
        },
      ],
      keyFormulasAndProperties: [
        'Letter-grade mapping (A = 4.0 to F = 0.0)',
        'Credit-weighted term GPA rollup',
      ],
      connectedDatabases: ['Gradebook', 'Courses', 'Assignments'],
      includedSubTemplates: ['Grade Weight Entry'],
    },
    {
      id: 'reading-citations',
      number: '08',
      shortLabel: 'Readings & Citations',
      title: 'Reading Vault & Citations',
      category: 'Courses & Notes',
      summary:
        'Capture textbooks, journal PDFs, page notes, and formatted bibliography citations.',
      whatItContains: [
        'Reading Status Board — Queue Required chapters from Unread to Annotated.',
        'Citation Snippet Store — Pre-formatted APA, MLA, and BibTeX references.',
        'Course Links — Connect sources directly to essays and seminars.',
      ],
      includedViews: [
        {
          name: 'Required Readings List',
          layout: 'List',
          description: 'Weekly assigned readings by class.',
        },
        {
          name: 'Citations Ledger',
          layout: 'Table',
          description: 'Authors, DOIs, and formatted references.',
        },
      ],
      keyFormulasAndProperties: [
        'Citation style tag (APA / MLA / IEEE)',
        'Priority reading flag',
      ],
      connectedDatabases: ['Reading Library', 'Citations Vault', 'Courses'],
      includedSubTemplates: ['Book & Paper Summary'],
    },
    {
      id: 'campus-habits',
      number: '09',
      shortLabel: 'Campus & Habits',
      title: 'Daily Habits, Clubs & Career',
      category: 'Life & System',
      summary:
        'Balance deep study blocks, sleep logs, internship applications, and faculty office hours.',
      whatItContains: [
        'Study Session Timer Log — Track deep-work minutes per subject.',
        'Career & Internships Board — Wishlist, Applied, OA, Interview, Offer stages.',
        'Faculty Directory — Emails, rooms, office hours, and courses.',
      ],
      includedViews: [
        {
          name: 'Daily Focus Log',
          layout: 'Table',
          description: 'Study hours & daily wellness check-ins.',
        },
        {
          name: 'Internships Pipeline',
          layout: 'Board',
          description: 'Application stages with deadlines.',
        },
      ],
      keyFormulasAndProperties: [
        'Weekly deep-work hour totals',
        '7-day sleep & habit consistency score',
      ],
      connectedDatabases: ['Study Sessions', 'Campus & Internships'],
      includedSubTemplates: ['Daily Wellness Check-In'],
    },
    {
      id: 'student-finances',
      number: '10',
      shortLabel: 'Budget & Aid',
      title: 'Student Budget & Scholarships',
      category: 'Life & System',
      summary:
        'Monitor monthly allowance caps, textbooks, campus spending, and scholarship deadlines.',
      whatItContains: [
        'Monthly Budget Health — Auto-tracks income, spent, and savings rate.',
        'Transaction Log — Tag spending across dining, books, and transit.',
        'Scholarship Tracker — Essay status, award size, and due dates.',
      ],
      includedViews: [
        {
          name: 'Monthly Budgets',
          layout: 'Gallery',
          description: 'Budget cap, spent, and remaining balance.',
        },
        {
          name: 'Scholarships Board',
          layout: 'Board',
          description: 'Applications grouped by submission status.',
        },
      ],
      keyFormulasAndProperties: [
        'Monthly remaining budget & savings %',
        'Scholarship deadline countdown',
      ],
      connectedDatabases: ['Student Expenses', 'Scholarships & Aid'],
      includedSubTemplates: ['Scholarship Essay Sheet'],
    },
    {
      id: 'student-system-core',
      number: '11',
      shortLabel: 'System · 12 DBs',
      title: 'System & Support Backend',
      category: 'Life & System',
      summary:
        'Central archive housing all 12 relational databases, quick-start SOPs, and templates.',
      whatItContains: [
        'All 12 Databases Hub — Single backend directory for safe customization.',
        'Quick Start Checklist — Set up your term in 15 minutes.',
        'Template Library — Copy-ready blocks across every page.',
      ],
      includedViews: [
        {
          name: 'Database Directory',
          layout: 'Table',
          description: 'Clean overview of all 12 core tables.',
        },
        {
          name: 'Archive Filter',
          layout: 'List',
          description: 'Completed semesters tucked out of daily sight.',
        },
      ],
      keyFormulasAndProperties: [
        'Global Semester Archive flag',
        'Template button triggers',
      ],
      connectedDatabases: ['Courses', 'Assignments', 'Lecture Notes', 'Flashcards'],
      includedSubTemplates: ['Semester Setup Checklist'],
    },
  ],
  ],
  databaseCountLabel: 'All 12 Interconnected Student OS Databases',
  databases: [
    { id: 'db-courses', name: 'Courses & Syllabi', category: 'Core Academics', purpose: 'Classes, credits, instructors & syllabus topics.', keyProperties: ['Code', 'Credits', 'GPA'], relations: ['Assignments', 'Notes'], viewsIncluded: ['Active Grid'] },
    { id: 'db-assignments', name: 'Assignments & Deliverables', category: 'Core Academics', purpose: 'Essays, labs, and problem set deadlines.', keyProperties: ['Due Date', 'Weight %'], relations: ['Courses'], viewsIncluded: ['7-Day Queue'] },
    { id: 'db-lectures', name: 'Cornell Lecture Notes', category: 'Notes', purpose: 'Structured class notes tagged by review pass.', keyProperties: ['Pass Status', 'Date'], relations: ['Flashcards'], viewsIncluded: ['Review Queue'] },
    { id: 'db-flashcards', name: 'Flashcards & Recall Queue', category: 'Recall', purpose: 'Spaced repetition Q&A deck.', keyProperties: ['Confidence', 'Next Review'], relations: ['Lectures', 'Exams'], viewsIncluded: ['Today Queue'] },
    { id: 'db-exams', name: 'Exams & Revision Sprints', category: 'Recall', purpose: 'Midterm and final exam schedules & prep.', keyProperties: ['Exam Date', 'Readiness'], relations: ['Courses'], viewsIncluded: ['Calendar'] },
    { id: 'db-gradebook', name: 'Gradebook & Weighted GPA', category: 'Recall', purpose: 'Auto-calculated course & term GPA.', keyProperties: ['Score', 'Weight %'], relations: ['Courses'], viewsIncluded: ['Grade Table'] },
    { id: 'db-readings', name: 'Reading Library', category: 'Sources', purpose: 'Textbooks, articles, and chapter notes.', keyProperties: ['Status', 'Type'], relations: ['Courses'], viewsIncluded: ['Reading List'] },
    { id: 'db-citations', name: 'Citations & References Vault', category: 'Sources', purpose: 'APA, MLA, and BibTeX source entries.', keyProperties: ['Cite Key', 'Style'], relations: ['Readings'], viewsIncluded: ['Citations Table'] },
    { id: 'db-sessions', name: 'Study Sessions & Focus Log', category: 'Life', purpose: 'Deep work Pomodoro timer log.', keyProperties: ['Minutes', 'Technique'], relations: ['Exams'], viewsIncluded: ['Weekly Summary'] },
    { id: 'db-campus', name: 'Career, Internships & Faculty', category: 'Life', purpose: 'Application pipeline and faculty directory.', keyProperties: ['Stage', 'Tier'], relations: ['Courses'], viewsIncluded: ['Pipeline Board'] },
    { id: 'db-expenses', name: 'Student Budgets & Expenses', category: 'Finance', purpose: 'Monthly caps, income, and expense ledger.', keyProperties: ['Amount', 'Flow'], relations: ['Months'], viewsIncluded: ['Monthly Ledger'] },
    { id: 'db-scholarships', name: 'Scholarships & Aid Tracker', category: 'Finance', purpose: 'Grants, fellowships, and essay deadlines.', keyProperties: ['Amount', 'Deadline'], relations: ['Expenses'], viewsIncluded: ['Award Board'] },
  ],
  readyTemplates: [],
  weeklyRhythm: [],
};
