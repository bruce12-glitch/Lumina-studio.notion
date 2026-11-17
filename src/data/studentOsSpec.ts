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
  ],
  databaseCountLabel: 'Database Overview',
  databases: [],
  readyTemplates: [],
  weeklyRhythm: [],
};
