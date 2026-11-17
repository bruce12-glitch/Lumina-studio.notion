export interface OsViewSpec {
  name: string;
  layout: 'Table' | 'Board' | 'Calendar' | 'Timeline' | 'Gallery' | 'List';
  description: string;
}

export interface OsModuleSpec {
  id: string;
  number: string;
  shortLabel: string;
  title: string;
  category: string;
  summary: string;
  whatItContains: string[];
  includedViews: OsViewSpec[];
  keyFormulasAndProperties: string[];
  connectedDatabases: string[];
  includedSubTemplates: string[];
}

export interface OsDatabaseSpec {
  id: string;
  name: string;
  category: string;
  purpose: string;
  keyProperties: string[];
  relations: string[];
  viewsIncluded: string[];
}

export interface OsTemplateAssetSpec {
  id: string;
  title: string;
  triggerContext: string;
  contains: string;
}

export interface OsWorkflowCadence {
  day: string;
  focus: string;
  checklist: string;
}

export interface OsPillarSpec {
  id: string;
  label: string;
  metric: string;
  detail: string;
}

export interface OsSystemSpec {
  slug: 'student-os' | 'researcher-os';
  name: string;
  eyebrow: string;
  sectionHeadline: string;
  sectionSubheadline: string;
  overviewPillars: OsPillarSpec[];
  moduleCategories: string[];
  modules: OsModuleSpec[];
  databaseCountLabel: string;
  databases: OsDatabaseSpec[];
  readyTemplates: OsTemplateAssetSpec[];
  weeklyRhythm: OsWorkflowCadence[];
}

