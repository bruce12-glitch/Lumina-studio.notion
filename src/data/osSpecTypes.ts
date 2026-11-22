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
  slug: 'student-os' | 'researcher-os' | 'nexus-os' | 'book-tracker-os';
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

export function filterOsModules(
  modules: OsModuleSpec[],
  category: string,
  searchQuery: string
): OsModuleSpec[] {
  const q = searchQuery.trim().toLowerCase();
  return modules.filter((mod) => {
    const matchesCategory = category === 'All' || mod.category === category;
    if (!matchesCategory) return false;
    if (!q) return true;
    const haystack = [
      mod.title,
      mod.shortLabel,
      mod.category,
      mod.summary,
      ...mod.whatItContains,
      ...mod.connectedDatabases,
      ...mod.includedSubTemplates,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function filterOsDatabases(
  databases: OsDatabaseSpec[],
  searchQuery: string
): OsDatabaseSpec[] {
  const q = searchQuery.trim().toLowerCase();
  if (!q) return databases;
  return databases.filter((db) => {
    const haystack = [
      db.name,
      db.category,
      db.purpose,
      ...db.keyProperties,
      ...db.relations,
      ...db.viewsIncluded,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getOsSpecSummaryCounts(spec: OsSystemSpec): {
  modulesCount: number;
  databasesCount: number;
  totalViewsCount: number;
  templatesCount: number;
} {
  const totalViewsCount = spec.modules.reduce(
    (sum, mod) => sum + mod.includedViews.length,
    0
  );
  return {
    modulesCount: spec.modules.length,
    databasesCount: spec.databases.length,
    totalViewsCount,
    templatesCount: spec.readyTemplates.length,
  };
}

export function validateOsSpecIntegrity(spec: OsSystemSpec): boolean {
  if (!spec.modules.length || !spec.databases.length || !spec.readyTemplates.length) {
    return false;
  }
  const moduleIds = new Set(spec.modules.map((m) => m.id));
  const dbIds = new Set(spec.databases.map((d) => d.id));
  if (moduleIds.size !== spec.modules.length || dbIds.size !== spec.databases.length) {
    return false;
  }
  return spec.modules.every(
    (m) =>
      m.whatItContains.length >= 3 &&
      m.includedViews.length >= 2 &&
      m.connectedDatabases.length >= 1
  );
}

export function buildWhatsInsideSummary(spec: OsSystemSpec): string[] {
  const counts = getOsSpecSummaryCounts(spec);
  const topModules = spec.modules
    .slice(1, 5)
    .map((m) => m.shortLabel)
    .join(', ');
  const topDbs = spec.databases
    .slice(0, 5)
    .map((d) => d.name)
    .join(', ');
  const topTemplates = spec.readyTemplates
    .slice(0, 3)
    .map((t) => t.title)
    .join(', ');

  return [
    `${spec.modules[0]?.title || 'Command Hub'} + ${counts.modulesCount - 1} modules (${topModules}, and more)`,
    `${counts.databasesCount} interconnected databases (${topDbs}, etc.)`,
    `${counts.totalViewsCount}+ pre-built filtered views across tables, Kanban boards, timelines, and calendars`,
    `${counts.templatesCount} one-click page templates (${topTemplates})`,
    'Works seamlessly on Notion Free plan across desktop, tablet, and mobile',
    'Lifetime template updates + Private Circle community invite',
  ];
}

