import { OsSystemSpec } from './osSpecTypes';

export const RESEARCHER_OS_SPEC: OsSystemSpec = {
  slug: 'researcher-os',
  name: 'Researcher OS',
  eyebrow: 'Inside Researcher OS · Core Architecture',
  sectionHeadline: '1 Lab Hub, 12 Modules, 14 Linked Databases',
  sectionSubheadline:
    'Papers, atomic notes, hypotheses, experiments, datasets, manuscripts, peer review, and grants in one system.',
  overviewPillars: [
    {
      id: 'res-hub-modules',
      label: 'Lab Hub + Modules',
      metric: '1 + 12',
      detail: 'Command Cockpit plus 12 focused research modules.',
    },
    {
      id: 'res-linked-dbs',
      label: 'Connected Databases',
      metric: '14 DBs',
      detail: 'Literature, Zettels, runs, datasets, papers & grants.',
    },
    {
      id: 'res-prebuilt-views',
      label: 'Pre-Built Views',
      metric: '28+ Views',
      detail: 'Synthesis matrices, run boards & CFP calendars.',
    },
    {
      id: 'res-ready-templates',
      label: 'Academic Templates',
      metric: '8 Templates',
      detail: 'IMRaD drafts, lab run logs & grant specific aims.',
    },
  ],
  moduleCategories: [
    'All',
    'Command & Synthesis',
    'Lab & Experiments',
    'Publishing & Grants',
    'System Backend',
  ],
  modules: [
  ],
  databaseCountLabel: 'Database Overview',
  databases: [],
  readyTemplates: [],
  weeklyRhythm: [],
};
