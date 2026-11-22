# Resonance — Notion Template Storefront

A storefront and interactive workspace preview app for 43 Notion templates, built around Notion's own visual grammar: warm paper surfaces (`#FFFFFF` / `#FAF9F6`), hairline dividers (`#E9E9E7`), tabular numbers, and live browser previews you can click through before duplicating.

## What's Inside

### 6 Flagship Operating Systems

Each flagship template ships with its own specification module, interactive Notion-style workspace tabs, and real workspace screenshots:

| System | Category | Structure | Live Interactive Modules |
| :--- | :--- | :--- | :--- |
| **Nexus OS** | Personal Productivity | 15 DBs · 32 views | Core-5 command hub, P1–P3 sprint queue, Projects timeline & progress radar, PARA domains, monthly burn rate |
| **Book Tracker OS** | School | 8 DBs · 22 views | 4 editorial KPIs, 6 native charts, `Σ Queue Score` priority ranker, 14-day stale-book radar, Reading Wrapped |
| **Second Brain** | Personal Productivity | 8 DBs · 18 views | PARA workspace, unified quick-capture inbox, linked projects, Sunday review flow |
| **Freelance OS** | Business | 18 DBs · 28 views | Studio hub, client pipeline CRM, 3-mode project boards, overdue invoice aging, effective hourly rate tracker |
| **Student OS** | School | 12 DBs · 24 views | 7-day deadline radar, credit-weighted 4.0 GPA calculator, Cornell notes with 1/3/7/21d spaced recall, internship kanban |
| **Researcher OS** | School | 14 DBs · 28 views | Literature synthesis matrix, Zettelkasten claim vault, IMRaD manuscript pacer, lab ledger, peer-review rebuttal board |

### 2 Free Interactive Notion Templates

Both free showcases run live client-side formula engines backed by pure TypeScript telemetry modules:

- **Dopamine Menu** (`3 DBs · 10 views · $0`) — 7 interactive views (`Today's Plate`, `Reset Now`, sortable `Top Picks`, 5-column `Mood Match`, `Craving Swaps`, `Order Log`, and live `Insights` mood chart). Logging any card or order recalculates all 5 top KPIs (`Orders 7d`, `Lift 7d`, `Win Rate`, `Swaps 7d`, `Spend 30d`).
- **Travel Planner** (`6 DBs · 12 views · $0`) — 5 linked views (`Trips & Control Tower`, `Wallet & Spend Charts` with SVG donut + Payment Rails + inline expense logging, `Trip Timeline` Gantt, `Packing & Vault` with live readiness `%` and permit approval state, and `Day Plans & Places` where saved places pin directly onto Day 2).

### Storefront Capabilities

- **43 Catalog Templates** across 6 categories (`Personal Productivity`, `Health & Fitness`, `Business`, `School`, `Finance`, `Travel`) with category filters, live search, and a per-template **Quick-Win** line on every card.
- **Custom Notion Builds** (`/#custom-notion-builds`) — Client brief workflow and validated intake form for bespoke workspaces built around a team or solo workflow.
- **Instant Delivery & Library Drawer** — Local checkout simulation, receipt generation, duplicate link delivery, and a persistent My Library drawer (`localStorage`).
- **Keyboard Navigation** — Press `Ctrl+M` / `Cmd+M` anywhere to open the quick directory overlay.

## Project Layout

```text
src/
├── App.tsx                             # Routing, homepage, catalog, and checkout state
├── components/
│   ├── Chrome.tsx                      # Header, Footer, TemplateCard, AppCard, MenuOverlay
│   ├── TemplateShowcasePage.tsx        # Dynamic template detail page + deep-linked tabs
│   ├── NexusOsShowcase.tsx             # Nexus OS showcase & interactive tabs
│   ├── BookTrackerOsShowcase.tsx       # Book Tracker OS showcase & interactive tabs
│   ├── DopamineMenuShowcase.tsx        # 7-view interactive Dopamine Menu workspace
│   ├── TravelPlannerShowcase.tsx       # 5-view interactive Travel Planner workspace
│   ├── StudentOsShowcase.tsx           # Student OS showcase & interactive tabs
│   ├── ResearcherOsShowcase.tsx        # Researcher OS showcase & interactive tabs
│   ├── FreelanceOsGallery.tsx          # Freelance OS interactive workspace gallery
│   ├── CustomTemplateSection.tsx       # Custom Notion Builds studio section & intake form
│   ├── RealScreenshotStrip.tsx         # Lightbox viewer for actual Notion screenshots
│   └── CheckoutModals.tsx              # Checkout, All-Access bundle, and delivery drawer
├── data/
│   ├── catalog.ts                      # 43 templates, apps, FAQs, updates, testimonials
│   ├── templateHooks.ts                # Per-template copy, Quick-Wins, and preview rows
│   ├── dopamineAndTravelSpec.ts        # Pure KPI, sorting, readiness, and spend formulas
│   ├── nexusOsSpec.ts                  # Nexus OS data model and filter logic
│   ├── bookTrackerOsSpec.ts            # Book Tracker OS KPI, Queue Score, and Signal math
│   ├── studentOsSpec.ts                # Student OS modules and database schema
│   └── researcherOsSpec.ts             # Researcher OS modules and database schema
└── utils/
    ├── storeLogic.ts                   # Filtering, pricing, email & brief validation
    ├── storeLogic.test.ts              # Catalog, anti-slop, hook, and formula tests
    └── flagshipSlides.test.ts          # Flagship slide deck integrity checks
```

## Tech Stack

- **UI**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide React
- **Build**: Vite 8
- **Tests**: Node built-in test runner (`node:test`, `node:assert/strict`) executed via `tsx`

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:3000`.

## Checks & Tests

```bash
# Run all unit tests (catalog, Quick-Win anti-slop checks, KPI & formula math)
npx tsx --test src/utils/storeLogic.test.ts src/utils/flagshipSlides.test.ts src/data/dopamineAndTravelSpec.test.ts

# Type-check
npm run lint

# Production build
npm run build
```

## Design Notes

- **Typography**: Inter, Newsreader, Instrument Serif, and IBM Plex Mono with `tabular-nums` on every price, database count, and KPI metric.
- **No decorative clutter**: Unboxed inline metadata separated by `·`, hairline borders instead of heavy drop shadows, and direct, concrete copy enforced by unit tests in `src/utils/storeLogic.test.ts`.
