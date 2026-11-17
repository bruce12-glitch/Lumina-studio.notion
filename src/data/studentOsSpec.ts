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
  ],
  databaseCountLabel: 'Database Overview',
  databases: [],
  readyTemplates: [],
  weeklyRhythm: [],
};
