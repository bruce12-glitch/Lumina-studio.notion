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
    {
      id: 'research-hub',
      number: '01',
      shortLabel: 'Research Hub',
      title: 'Research Command Hub',
      category: 'Command & Synthesis',
      summary:
        'Weekly research cockpit uniting active studies, reading triage, scheduled runs, and CFP deadlines.',
      whatItContains: [
        'Quick-Capture Toolbar — Log papers, Zettel notes, experiment runs, or hypotheses fast.',
        'Priority Reading Queue — Separates quick arXiv skims from deep synthesis reads.',
        'CFP & Grant Countdowns — Live days-remaining monitor for upcoming submissions.',
      ],
      includedViews: [
        {
          name: 'Active Studies Overview',
          layout: 'Gallery',
          description: 'Research questions, trials & target venue.',
        },
        {
          name: 'This Week in the Lab',
          layout: 'List',
          description: 'Scheduled runs, drafting & advisor 1:1 tasks.',
        },
        {
          name: 'Deadlines Calendar',
          layout: 'Calendar',
          description: 'Abstract cutoffs, IRB renewals & RFPs.',
        },
      ],
      keyFormulasAndProperties: [
        'Supporting vs Contradicting evidence ratio',
        'T-14d and T-7d deadline alerts',
      ],
      connectedDatabases: ['Research Projects', 'Literature Papers', 'Experiments', 'Manuscripts'],
      includedSubTemplates: ['Daily Lab Notebook', 'Friday Synthesis Ritual'],
    },
    {
      id: 'literature-matrix',
      number: '02',
      shortLabel: 'Literature Matrix',
      title: 'Literature Review & Synthesis Matrix',
      category: 'Command & Synthesis',
      summary:
        'Structured matrix comparing methodology, cohort/data, key empirical findings, limitations, and gaps.',
      whatItContains: [
        'Side-by-Side Matrix — Compare methodology, N, findings, and limitations across 50+ papers.',
        'BibTeX & DOI Vault — Store citation keys, venue year, and PDF links.',
        'Research Gap Tagging — Flag open questions to seed future studies.',
      ],
      includedViews: [
        {
          name: 'Synthesis Matrix Table',
          layout: 'Table',
          description: 'Compare methods, findings & limitations.',
        },
        {
          name: 'By Research Question',
          layout: 'Board',
          description: 'Group citations under thesis sub-questions.',
        },
        {
          name: 'Seminal Anchors',
          layout: 'Gallery',
          description: 'Pin foundational papers cleanly.',
        },
      ],
      keyFormulasAndProperties: [
        'Citation Readiness status',
        'Gap Priority scoring',
      ],
      connectedDatabases: ['Literature Papers', 'Atomic Zettel Notes', 'Hypotheses'],
      includedSubTemplates: ['Paper Extraction Sheet'],
    },
    {
      id: 'zettelkasten-notes',
      number: '03',
      shortLabel: 'Zettelkasten Notes',
      title: 'Zettelkasten & Atomic Claims',
      category: 'Command & Synthesis',
      summary:
        'Connect modular concept cards and empirical citations directly into manuscript drafts.',
      whatItContains: [
        'Literature -> Permanent Notes — Distill highlights into one-claim cards.',
        'Parent/Child Link Graph — Build concept trees ready to drop into papers.',
        'Seedling-to-Evergreen Tags — Track claim maturity over time.',
      ],
      includedViews: [
        {
          name: 'Permanent Zettels Index',
          layout: 'Table',
          description: 'Evergreen concepts filtered by cluster.',
        },
        {
          name: 'Inbox Triage Board',
          layout: 'Board',
          description: 'Promote raw highlights to permanent claims.',
        },
      ],
      keyFormulasAndProperties: [
        'Cite Readiness tag',
        'Incoming/outgoing note counts',
      ],
      connectedDatabases: ['Atomic Zettel Notes', 'Literature Papers', 'Manuscripts'],
      includedSubTemplates: ['Atomic Zettel Claim Card'],
    },
    {
      id: 'hypotheses-questions',
      number: '04',
      shortLabel: 'Hypotheses',
      title: 'Research Questions & Hypotheses',
      category: 'Command & Synthesis',
      summary:
        'Track falsifiable H1/H0 predictions alongside independent variables and experiment results.',
      whatItContains: [
        'Falsifiable Claims Register — Document predicted effect sizes and null outcomes.',
        'Linked Trial Results — Connect hypotheses directly to lab runs and p-values.',
        'Variable Matrix — Track IVs, DVs, and confounders clearly.',
      ],
      includedViews: [
        {
          name: 'Validation Status Board',
          layout: 'Board',
          description: 'Open -> Testing -> Supported / Refuted.',
        },
        {
          name: 'Variable Matrix',
          layout: 'Table',
          description: 'Compare IVs, DVs & pre-registration links.',
        },
      ],
      keyFormulasAndProperties: [
        'Validation Verdict status',
        'Pre-registration link field',
      ],
      connectedDatabases: ['Hypotheses & Claims', 'Research Projects', 'Experiments'],
      includedSubTemplates: ['Hypothesis Card'],
    },
  ],
  databaseCountLabel: 'Database Overview',
  databases: [],
  readyTemplates: [],
  weeklyRhythm: [],
};
