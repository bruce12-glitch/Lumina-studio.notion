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
    {
      id: 'experiments-protocols',
      number: '05',
      shortLabel: 'Experiments',
      title: 'Experiments & Lab Protocols',
      category: 'Lab & Experiments',
      summary:
        'Auditable run notebook with versioned SOP protocols, anomalies, and reproducibility checks.',
      whatItContains: [
        'Experiment Run Log — Record seeds, reagents, metrics, and runtime anomalies.',
        'Versioned Lab Protocols — Store reusable SOPs (v1.0 -> v2.4) safely.',
        'Reproducibility Sign-Off — Track replicate runs, controls, and random seeds.',
      ],
      includedViews: [
        {
          name: 'Active Runs Board',
          layout: 'Board',
          description: 'Queued -> Running -> Analyzing -> Verified.',
        },
        {
          name: 'Run Ledger',
          layout: 'Table',
          description: 'All trials chronologically with metrics.',
        },
        {
          name: 'Lab SOP Protocols',
          layout: 'Gallery',
          description: 'Standard experimental recipes & safety notes.',
        },
      ],
      keyFormulasAndProperties: [
        'Run ID auto-numbering',
        'Reproducibility checklist rollups',
      ],
      connectedDatabases: ['Experiments & Runs', 'Lab Protocols', 'Datasets'],
      includedSubTemplates: ['Reproducible Run Log'],
    },
    {
      id: 'datasets-repos',
      number: '06',
      shortLabel: 'Datasets & Code',
      title: 'Datasets, Code & Baselines',
      category: 'Lab & Experiments',
      summary:
        'Track data provenance, Zenodo DOIs, Git commit tags, environment lockfiles, and SOTA metrics.',
      whatItContains: [
        'Dataset Provenance — Document sample size, splits, license, and IRB privacy tier.',
        'Code Repo Index — Link scripts, model checkpoints, and exact Git commit SHAs.',
        'Benchmark Table — Compare new run outputs cleanly against published baselines.',
      ],
      includedViews: [
        {
          name: 'Dataset Catalog',
          layout: 'Table',
          description: 'Versioning, licenses & storage paths.',
        },
        {
          name: 'Codebases Registry',
          layout: 'List',
          description: 'Repos, branch tags & lockfile status.',
        },
      ],
      keyFormulasAndProperties: [
        'Data Privacy Tier (Public / Controlled / IRB)',
        'Pinned Git SHA & Zenodo DOI fields',
      ],
      connectedDatabases: ['Datasets & Baselines', 'Code & Repos', 'Experiments'],
      includedSubTemplates: ['Dataset README Spec'],
    },
    {
      id: 'manuscript-pipeline',
      number: '07',
      shortLabel: 'Manuscripts',
      title: 'IMRaD Manuscript Pipeline',
      category: 'Publishing & Grants',
      summary:
        'Manage drafts from Outline to Published with word counts, figures, co-authors, and venues.',
      whatItContains: [
        'IMRaD Drafting Scaffold — Track word count limits across Intro, Methods, and Results.',
        'Figure & Table Tracker — Ensure every vector chart and caption is publication-ready.',
        'Overleaf & Authorship Sync — Link LaTeX projects and CRediT contributor sign-offs.',
      ],
      includedViews: [
        {
          name: 'Paper Pipeline Board',
          layout: 'Board',
          description: 'Outline -> Drafting -> Internal Review -> Accepted.',
        },
        {
          name: 'Drafting Timeline',
          layout: 'Timeline',
          description: 'Co-author review milestones.',
        },
      ],
      keyFormulasAndProperties: [
        'Word Limit % budget bar',
        'Target venue CFP countdown',
      ],
      connectedDatabases: ['Manuscripts', 'Target Journals & CFPs', 'Collaborators'],
      includedSubTemplates: ['IMRaD Manuscript Scaffold'],
    },
    {
      id: 'peer-review',
      number: '08',
      shortLabel: 'Peer Review',
      title: 'Peer Review & Rebuttal Studio',
      category: 'Publishing & Grants',
      summary:
        'Track every reviewer critique itemized by severity, follow-up experiment, and draft diff.',
      whatItContains: [
        'Itemized Comment Log — Break long review PDFs into discrete action tickets.',
        'Follow-Up Run Links — Connect Reviewer 2 concerns directly to new validation runs.',
        'Rebuttal Export — Organize polite responses & manuscript diff sections cleanly.',
      ],
      includedViews: [
        {
          name: 'Rebuttal Action Matrix',
          layout: 'Table',
          description: 'Critiques sorted by Reviewer ID & Severity.',
        },
        {
          name: 'Open Critiques Queue',
          layout: 'Board',
          description: 'Pending -> New Trial Needed -> Drafted.',
        },
      ],
      keyFormulasAndProperties: [
        'Severity triage tags (Major / Minor / Typo)',
        'Resolved Rebuttal progress rollup',
      ],
      connectedDatabases: ['Peer Reviews & Rebuttals', 'Manuscripts', 'Experiments'],
      includedSubTemplates: ['Reviewer Response Matrix'],
    },
    {
      id: 'grants-funding',
      number: '09',
      shortLabel: 'Grants & Funding',
      title: 'Grants, RFPs & Lab Budget',
      category: 'Publishing & Grants',
      summary:
        'Manage fellowship deadlines, specific aims, award ceilings, and equipment/compute spend.',
      whatItContains: [
        'Grant Opportunity Pipeline — Track NIH, NSF, ERC, and industry fellowship RFPs.',
        'Post-Award Budget — Monitor cloud compute, travel grants, and stipends.',
        'Reporting Alerts — Never miss mid-grant progress report cutoffs.',
      ],
      includedViews: [
        {
          name: 'Funding Pipeline Board',
          layout: 'Board',
          description: 'Scoped -> Drafting -> Under Review -> Funded.',
        },
        {
          name: 'Grant Deadlines Calendar',
          layout: 'Calendar',
          description: 'Sponsor due dates & sign-off windows.',
        },
      ],
      keyFormulasAndProperties: [
        'Remaining award budget balance',
        'Internal sign-off lead time alerts',
      ],
      connectedDatabases: ['Grants & RFPs', 'Research Projects', 'Collaborators'],
      includedSubTemplates: ['Grant Specific Aims 1-Pager'],
    },
    {
      id: 'collaborators-conferences',
      number: '10',
      shortLabel: 'Collaborators & Talks',
      title: 'Collaborators, Advisors & Talks',
      category: 'Publishing & Grants',
      summary:
        'Co-author ORCID directory, weekly PI/advisor 1:1 agendas, and conference CFP deadlines.',
      whatItContains: [
        'Co-Author CRM — Institutions, ORCIDs, emails, and CRediT author roles.',
        'Advisor 1:1 Log — Weekly plot reviews, blockers, and next-step decisions.',
        'CFP Venue Calendar — Track abstract, full-paper, and camera-ready dates.',
      ],
      includedViews: [
        {
          name: 'CFP Deadlines Calendar',
          layout: 'Calendar',
          description: 'Top journals & conference submission windows.',
        },
        {
          name: 'Co-Author Directory',
          layout: 'Table',
          description: 'Linked papers, affiliations & ORCIDs.',
        },
      ],
      keyFormulasAndProperties: [
        'Double-blind policy indicator',
        'Days until CFP cutoff',
      ],
      connectedDatabases: ['Collaborators', 'Target Journals & CFPs', 'Manuscripts'],
      includedSubTemplates: ['Advisor 1:1 Agenda'],
    },
    {
      id: 'reading-triage',
      number: '11',
      shortLabel: 'Reading Queue',
      title: 'arXiv & Journal Triage Queue',
      category: 'Command & Synthesis',
      summary:
        'Keep daily paper alerts organized—5-minute skims stay separate from deep matrix extraction.',
      whatItContains: [
        'Quick Alert Inbox — Drop arXiv & Google Scholar alerts without polluting Literature Matrix.',
        '5-Minute Skim Tagging — Read abstracts fast and promote only relevant papers.',
        'Weekly Digest Feed — Batch new PDFs once or twice a week calmly.',
      ],
      includedViews: [
        {
          name: 'Triage Funnel Board',
          layout: 'Board',
          description: 'Inbox -> Skimmed -> Deep Read -> Archived.',
        },
        {
          name: 'Weekly Reading List',
          layout: 'List',
          description: 'Priority PDFs queued for this week.',
        },
      ],
      keyFormulasAndProperties: [
        'Promote-to-Matrix checkbox',
        'Estimated read minutes',
      ],
      connectedDatabases: ['Reading Triage Queue', 'Literature Papers'],
      includedSubTemplates: ['Paper Triage Card'],
    },
    {
      id: 'researcher-system-core',
      number: '12',
      shortLabel: 'System · 14 DBs',
      title: 'System Core, IRB & Onboarding',
      category: 'System Backend',
      summary:
        'Central backend uniting all 14 connected tables, ethics checklists, and pre-built templates.',
      whatItContains: [
        '14-Table Database Registry — Inspect relations and rollups safely.',
        'IRB & Double-Blind Checklist — Metadata scrub and open-data prep.',
        'One-Click Templates — Reusable scaffolds across every research page.',
      ],
      includedViews: [
        {
          name: 'Backend Registry',
          layout: 'Table',
          description: 'All 14 tables organized by function.',
        },
        {
          name: 'Thesis Archive',
          layout: 'List',
          description: 'Completed studies stored out of daily view.',
        },
      ],
      keyFormulasAndProperties: [
        'Archive & study status flags',
        'Double-blind readiness checks',
      ],
      connectedDatabases: ['Research Projects', 'Literature Papers', 'Experiments', 'Manuscripts'],
      includedSubTemplates: ['IRB & Double-Blind Checklist'],
    },
  ],
  databaseCountLabel: 'All 14 Interconnected Researcher OS Databases',
  databases: [
    { id: 'rdb-projects', name: 'Research Projects', category: 'Command', purpose: 'Top-level studies and thesis chapters.', keyProperties: ['Status', 'Readiness %'], relations: ['Hypotheses', 'Manuscripts'], viewsIncluded: ['Active Studies'] },
    { id: 'rdb-literature', name: 'Literature Papers', category: 'Synthesis', purpose: 'DOIs, methods, findings & research gaps.', keyProperties: ['Cite Key', 'Year'], relations: ['Zettels', 'Hypotheses'], viewsIncluded: ['Synthesis Matrix'] },
    { id: 'rdb-zettels', name: 'Atomic Zettel Notes', category: 'Synthesis', purpose: 'Modular claims linking cites to drafts.', keyProperties: ['Maturity', 'Topic'], relations: ['Literature', 'Manuscripts'], viewsIncluded: ['Permanent Index'] },
    { id: 'rdb-hypotheses', name: 'Hypotheses & Claims', category: 'Synthesis', purpose: 'Falsifiable predictions & IV/DV variables.', keyProperties: ['Outcome', 'IV/DV'], relations: ['Experiments'], viewsIncluded: ['Validation Board'] },
    { id: 'rdb-experiments', name: 'Experiments & Runs', category: 'Lab', purpose: 'Trial parameters, metrics & anomalies.', keyProperties: ['Run ID', 'Metric'], relations: ['Protocols', 'Datasets'], viewsIncluded: ['Runs Board'] },
    { id: 'rdb-protocols', name: 'Lab Protocols', category: 'Lab', purpose: 'Versioned SOP recipes & durations.', keyProperties: ['Version', 'Duration'], relations: ['Experiments'], viewsIncluded: ['SOP Gallery'] },
    { id: 'rdb-datasets', name: 'Datasets & Baselines', category: 'Lab', purpose: 'Data splits, licenses, Zenodo DOIs & SOTA.', keyProperties: ['Sample N', 'License'], relations: ['Repos'], viewsIncluded: ['Dataset Catalog'] },
    { id: 'rdb-repos', name: 'Code & Repos', category: 'Lab', purpose: 'Analysis scripts, Git tags & lockfiles.', keyProperties: ['Branch', 'Stack'], relations: ['Datasets', 'Manuscripts'], viewsIncluded: ['Codebases Table'] },
    { id: 'rdb-manuscripts', name: 'Manuscripts & Sections', category: 'Publishing', purpose: 'IMRaD word limits & co-author drafts.', keyProperties: ['Stage', 'Words'], relations: ['Venues', 'Reviews'], viewsIncluded: ['Paper Pipeline'] },
    { id: 'rdb-reviews', name: 'Peer Reviews & Rebuttals', category: 'Publishing', purpose: 'Itemized reviewer responses & edits.', keyProperties: ['Severity', 'Status'], relations: ['Manuscripts', 'Experiments'], viewsIncluded: ['Rebuttal Matrix'] },
    { id: 'rdb-grants', name: 'Grants & RFPs', category: 'Publishing', purpose: 'Fellowships, RFPs & post-award spend.', keyProperties: ['Ceiling', 'Deadline'], relations: ['Projects'], viewsIncluded: ['Funding Board'] },
    { id: 'rdb-venues', name: 'Target Journals & CFPs', category: 'Publishing', purpose: 'CFP cutoffs & blind review rules.', keyProperties: ['CFP Date', 'Page Cap'], relations: ['Manuscripts'], viewsIncluded: ['CFP Calendar'] },
    { id: 'rdb-collaborators', name: 'Collaborators & Advisors', category: 'People', purpose: 'ORCIDs, affiliations & weekly 1:1 agendas.', keyProperties: ['ORCID', 'CRediT'], relations: ['Manuscripts'], viewsIncluded: ['Directory'] },
    { id: 'rdb-reading-queue', name: 'Reading Triage Queue', category: 'Synthesis', purpose: 'Fast arXiv/scholar alert inbox.', keyProperties: ['Triage', 'Minutes'], relations: ['Literature'], viewsIncluded: ['Triage Funnel'] },
  ],
  readyTemplates: [
    {
      id: 'rtpl-imrad',
      title: 'IMRaD Manuscript Scaffold',
      triggerContext: 'Manuscripts',
      contains: 'Abstract, Gap, Methods, Figures Table & Camera-Ready checklist.',
    },
    {
      id: 'rtpl-paper-extract',
      title: 'Paper Synthesis Sheet',
      triggerContext: 'Literature Matrix',
      contains: 'Core thesis, methods audit, key metrics & open limitations.',
    },
    {
      id: 'rtpl-zettel',
      title: 'Atomic Zettel Claim Card',
      triggerContext: 'Zettelkasten',
      contains: 'Single claim thesis, citations, counter-arguments & concept links.',
    },
    {
      id: 'rtpl-experiment',
      title: 'Reproducible Run Log',
      triggerContext: 'Experiments',
      contains: 'Hypothesis link, parameters, anomaly notes & metrics block.',
    },
    {
      id: 'rtpl-rebuttal',
      title: 'Reviewer Response Matrix',
      triggerContext: 'Peer Review',
      contains: 'Critique quote, diagnosis, control run link & draft diff.',
    },
    {
      id: 'rtpl-grant-aims',
      title: 'Grant Specific Aims',
      triggerContext: 'Grants',
      contains: 'Significance, innovation, Aim 1-3 milestones & risk table.',
    },
    {
      id: 'rtpl-advisor-1on1',
      title: 'Advisor 1:1 Agenda',
      triggerContext: 'Collaborators',
      contains: 'Weekly wins, plots to review, blockers & next-step actions.',
    },
    {
      id: 'rtpl-irb-ethics',
      title: 'IRB & Double-Blind Check',
      triggerContext: 'System Backend',
      contains: 'Consent audit, author-metadata scrub & code release check.',
    },
  ],
  weeklyRhythm: [
    {
      day: 'Mon · Triage & Plan',
      focus: 'Literature & Weekly Runs',
      checklist: 'Skim arXiv alerts and queue 2-3 priority experiment runs.',
    },
    {
      day: 'Tue – Thu · Execute',
      focus: 'Trials, Code & Drafting',
      checklist: 'Log run parameters, draft IMRaD sections & prep 1:1 plots.',
    },
    {
      day: 'Fri · Synthesize',
      focus: 'Papers -> Zettel Notes',
      checklist: 'Convert weekly findings into permanent citable claim cards.',
    },
    {
      day: 'Quarterly · Submit',
      focus: 'CFPs, Reviews & Grants',
      checklist: 'Check upcoming CFP cutoffs, clear rebuttals & grant reports.',
    },
  ],
};
