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
  ],
  databaseCountLabel: 'Database Overview',
  databases: [],
  readyTemplates: [],
  weeklyRhythm: [],
};
