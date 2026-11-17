import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  FileText,
  Folder,
  Inbox,
  LayoutGrid,
  Plus,
  Search,
  Sparkles,
  Target,
} from 'lucide-react';
import { TEMPLATES, Template, TemplateCategory } from '../data/catalog';
import { formatPrice } from '../utils/storeLogic';
import { CheckoutTarget } from './CheckoutModal';
import { TemplateCard } from './Chrome';
import { BlushAssetImage } from './CoversAndIllustrations';
import { FreelanceOsGallery } from './FreelanceOsGallery';
import freelanceOsHubImg from '../assets/images/freelance_os_hub_hd_1794922765448.jpg';

interface TemplateShowcaseMetadata {
  heroHeadline: string;
  heroSubheadline: string;
  rating: string;
  reviewsCount: number;
  closerLookModules: string[];
  showcaseHeading: string;
  page1Title: string;
  page1Callout: string;
  page1Items: {
    title: string;
    status: string;
    date: string;
    area: string;
    progress: number;
  }[];
  page2Title: string;
  page2Callout: string;
  page2References: {
    title: string;
    date: string;
    tags: string[];
  }[];
  page2Notes: {
    title: string;
    excerpt: string;
    area: string;
  }[];
  page3Title: string;
  page3Callout: string;
  page3Projects: {
    title: string;
    status: string;
    date: string;
    area: string;
    progress: number;
  }[];
  page3Timeline: {
    title: string;
    status: string;
    progress: string;
    offsetPct: number;
    widthPct: number;
  }[];
  page3WeeklyTasks: {
    day: string;
    dateNum: string;
    isToday?: boolean;
    taskTitle?: string;
    priority?: string;
  }[];
  lifeAreas: {
    title: string;
    projectsCount: string;
    notesCount: string;
    pattern: 'spiral' | 'sunburst' | 'vortex' | 'prism' | 'waves' | 'radial';
  }[];
}

function getTemplateShowcaseData(template: Template): TemplateShowcaseMetadata {
  const byCategory: Record<
    TemplateCategory,
    Omit<TemplateShowcaseMetadata, 'closerLookModules'> & {
      defaultModules: string[];
    }
  > = {
    'Personal Productivity': {
      heroHeadline: 'Make room for the life you want.',
      heroSubheadline: `Bring your plans, habits, learning, and everyday workflow into ${template.name}. Spend less time keeping track and more time moving forward.`,
      rating: '4.9',
      reviewsCount: 174 + (template.id * 7) % 90,
      defaultModules: [
        'Goals & Vision',
        'Projects & Tasks',
        'Habits Tracker',
        'Daily Journal',
        'Learning System',
        'Weekly Review',
      ],
      showcaseHeading: 'Master Your Productivity',
      page1Title: 'Goals',
      page1Callout:
        'Set and track your short-term and long-term goals. Each goal connects directly to active projects and measurable milestones.',
      page1Items: [
        {
          title: 'Achieve a GPA of 3.8 or Higher',
          status: 'In progress',
          date: 'July 4, 2026 → July 25, 2026',
          area: 'School',
          progress: 50,
        },
        {
          title: 'Visit Three New Countries',
          status: 'In progress',
          date: 'July 1, 2026 → August 9, 2026',
          area: 'Travel & Leisure',
          progress: 25,
        },
      ],
      page2Title: 'References & Notes',
      page2Callout:
        'Store valuable information, resources, and documents that support your ongoing projects and areas of responsibility.',
      page2References: [
        {
          title: "'The Power of Habit' by Charles Duhigg",
          date: 'July 12, 2026',
          tags: ['Book'],
        },
        {
          title: 'Goodreads for book recommendations and reviews',
          date: 'July 11, 2026',
          tags: ['Book', 'Website'],
        },
        {
          title: "'Your Money or Your Life' by Vicki Robin",
          date: 'July 1, 2026',
          tags: ['Book', 'Website'],
        },
      ],
      page2Notes: [
        {
          title: 'Experiment with different routines to see what works best',
          excerpt: 'Start with a simple morning routine and gradually add focus blocks.',
          area: 'Personal',
        },
        {
          title: 'Use a habit tracker to monitor daily consistency',
          excerpt: 'Reflect weekly on what is working and make small adjustments.',
          area: 'Personal',
        },
      ],
      page3Title: 'Projects & Tasks',
      page3Callout:
        'Manage your larger endeavors that require multiple tasks. Link projects to related goals and tasks to ensure alignment and progress.',
      page3Projects: [
        {
          title: 'Develop a Study Schedule',
          status: 'In progress',
          date: 'July 4, 2026 → July 27, 2026',
          area: 'School',
          progress: 35,
        },
        {
          title: 'Plan Trip to Dubai',
          status: 'In progress',
          date: 'July 10, 2026 → Aug 2, 2026',
          area: 'Travel & Leisure',
          progress: 20,
        },
        {
          title: 'Plan Trip to London, Paris',
          status: 'In progress',
          date: 'Aug 5, 2026 → Aug 19, 2026',
          area: 'Travel & Leisure',
          progress: 15,
        },
      ],
      page3Timeline: [
        {
          title: 'Morning Routine Plan',
          status: 'Completed',
          progress: '100%',
          offsetPct: 2,
          widthPct: 38,
        },
        {
          title: 'Implement and Track Morning Routine',
          status: 'Completed',
          progress: '100%',
          offsetPct: 6,
          widthPct: 46,
        },
        {
          title: 'Complete Professional Development Course',
          status: 'Completed',
          progress: '100%',
          offsetPct: 14,
          widthPct: 50,
        },
        {
          title: 'Demonstrate Leadership and Achieve Metrics',
          status: 'Completed',
          progress: '100%',
          offsetPct: 44,
          widthPct: 48,
        },
        {
          title: 'Create a Training Schedule',
          status: 'Completed',
          progress: '100%',
          offsetPct: 50,
          widthPct: 42,
        },
        {
          title: 'Develop a Study Schedule',
          status: 'In progress',
          progress: '35%',
          offsetPct: 58,
          widthPct: 38,
        },
      ],
      page3WeeklyTasks: [
        { day: 'Sun', dateNum: '21', isToday: true },
        {
          day: 'Mon',
          dateNum: '22',
          taskTitle: 'Research effective morning routines.',
          priority: 'High Priority',
        },
        {
          day: 'Tue',
          dateNum: '23',
          taskTitle: 'Outline desired activities (meditation, exercise).',
          priority: 'High Priority',
        },
        {
          day: 'Wed',
          dateNum: '24',
          taskTitle: 'Review and reflect on each book upon completion.',
          priority: 'High Priority',
        },
        { day: 'Thu', dateNum: '25' },
        { day: 'Fri', dateNum: '26' },
      ],
      lifeAreas: [
        { title: 'Personal', projectsCount: '2 Projects', notesCount: '12 Notes', pattern: 'spiral' },
        { title: 'Career', projectsCount: '3 Projects', notesCount: '8 Notes', pattern: 'sunburst' },
        { title: 'Health & Fitness', projectsCount: '2 Projects', notesCount: '6 Notes', pattern: 'vortex' },
        { title: 'Travel & Leisure', projectsCount: '2 Projects', notesCount: '5 Notes', pattern: 'prism' },
        { title: 'Relationships & Social', projectsCount: '1 Project', notesCount: '4 Notes', pattern: 'waves' },
        { title: 'Finance', projectsCount: '2 Projects', notesCount: '9 Notes', pattern: 'radial' },
      ],
    },
    Finance: {
      heroHeadline: 'Bring clarity to every dollar you earn.',
      heroSubheadline: `Consolidate your income, budgets, recurring subscriptions, and savings goals inside ${template.name}. Know exactly where your money goes in minutes a week.`,
      rating: '4.9',
      reviewsCount: 192 + (template.id * 5) % 70,
      defaultModules: [
        'Income & Cash Flow',
        'Monthly Budget',
        'Subscription Radar',
        'Savings & Sinking Funds',
        'Net Worth Ledger',
        'Annual Tax Summary',
      ],
      showcaseHeading: 'Master Your Finances',
      page1Title: 'Savings Goals',
      page1Callout:
        'Define target amounts and target dates for emergency reserves, investments, and upcoming purchases with automatic progress bars.',
      page1Items: [
        {
          title: '6-Month Emergency Fund ($18,000)',
          status: 'In progress',
          date: 'Jan 1, 2026 → Dec 31, 2026',
          area: 'Safety Net',
          progress: 75,
        },
        {
          title: 'Index Portfolio Contribution Target',
          status: 'In progress',
          date: 'Q3 2026 → Q4 2026',
          area: 'Investments',
          progress: 60,
        },
      ],
      page2Title: 'Subscriptions & Bills',
      page2Callout:
        'Monitor every recurring monthly and annual charge in one place so you never pay for forgotten renewals again.',
      page2References: [
        {
          title: 'Notion Plus Workspace Plan ($10/mo)',
          date: 'Renews 15th',
          tags: ['Productivity'],
        },
        {
          title: 'Cloud Storage & Backup Suite ($9.99/mo)',
          date: 'Renews 22nd',
          tags: ['Utilities', 'Cloud'],
        },
        {
          title: 'Gym & Recovery Membership ($45/mo)',
          date: 'Renews 1st',
          tags: ['Health'],
        },
      ],
      page2Notes: [
        {
          title: 'Q3 Subscription Audit — Saved $64/mo',
          excerpt: 'Consolidated duplicate streaming and design tool licenses.',
          area: 'Cash Flow',
        },
        {
          title: 'Payday 50/30/20 Allocation Rule',
          excerpt: 'Automate 20% transfer to high-yield savings on the 1st of each month.',
          area: 'Budgeting',
        },
      ],
      page3Title: 'Budgets & Transactions',
      page3Callout:
        'Log income and expenses in seconds. Category rollups automatically calculate your remaining monthly allowance and savings rate.',
      page3Projects: [
        {
          title: 'July Fixed & Variable Budget',
          status: 'In progress',
          date: 'July 1, 2026 → July 31, 2026',
          area: 'Monthly Ledger',
          progress: 62,
        },
        {
          title: 'Debt-Free Payoff Sprint',
          status: 'In progress',
          date: 'July 2026 → Oct 2026',
          area: 'Liabilities',
          progress: 80,
        },
        {
          title: 'Tax Deductible Expense Log',
          status: 'In progress',
          date: 'FY 2026',
          area: 'Taxes',
          progress: 45,
        },
      ],
      page3Timeline: [
        {
          title: 'Q1 Cash Flow Reconciliation',
          status: 'Completed',
          progress: '100%',
          offsetPct: 2,
          widthPct: 36,
        },
        {
          title: 'Automate High-Yield Savings Transfer',
          status: 'Completed',
          progress: '100%',
          offsetPct: 10,
          widthPct: 44,
        },
        {
          title: 'Cancel Unused Annual Subscriptions',
          status: 'Completed',
          progress: '100%',
          offsetPct: 20,
          widthPct: 46,
        },
        {
          title: 'Mid-Year Net Worth Review',
          status: 'Completed',
          progress: '100%',
          offsetPct: 45,
          widthPct: 44,
        },
        {
          title: 'July Category Cap Check-In',
          status: 'In progress',
          progress: '62%',
          offsetPct: 56,
          widthPct: 38,
        },
      ],
      page3WeeklyTasks: [
        { day: 'Sun', dateNum: '21', isToday: true },
        {
          day: 'Mon',
          dateNum: '22',
          taskTitle: 'Log weekend dining & grocery receipts.',
          priority: 'High Priority',
        },
        {
          day: 'Tue',
          dateNum: '23',
          taskTitle: 'Verify upcoming utility auto-pay amounts.',
          priority: 'High Priority',
        },
        {
          day: 'Wed',
          dateNum: '24',
          taskTitle: 'Transfer monthly surplus to index fund.',
          priority: 'High Priority',
        },
        { day: 'Thu', dateNum: '25' },
        { day: 'Fri', dateNum: '26' },
      ],
      lifeAreas: [
        { title: 'Income Streams', projectsCount: '3 Sources', notesCount: '12 Entries', pattern: 'spiral' },
        { title: 'Fixed Bills', projectsCount: '8 Active', notesCount: 'On Track', pattern: 'sunburst' },
        { title: 'Daily Spending', projectsCount: '6 Categories', notesCount: '68% Used', pattern: 'vortex' },
        { title: 'Savings Buckets', projectsCount: '4 Goals', notesCount: '$14.2k', pattern: 'prism' },
        { title: 'Subscriptions', projectsCount: '9 Active', notesCount: '$84/mo', pattern: 'waves' },
        { title: 'Net Worth', projectsCount: '+19% YoY', notesCount: 'Updated', pattern: 'radial' },
      ],
    },
    Business: {
      heroHeadline: 'Run your entire workflow in one place.',
      heroSubheadline: `Unify client pipelines, active deliverables, SOPs, and revenue tracking inside ${template.name}. Built for calm, high-output solo operators and teams.`,
      rating: '4.9',
      reviewsCount: 164 + (template.id * 9) % 85,
      defaultModules: [
        'Client CRM & Pipeline',
        'Projects & Sprints',
        'Invoices & Retainers',
        'Content & Distribution',
        'SOP Knowledge Base',
        'Quarterly OKRs',
      ],
      showcaseHeading: 'Master Your Business Operations',
      page1Title: 'Quarterly OKRs',
      page1Callout:
        'Align every client deliverable and marketing campaign with measurable quarterly objectives and key results.',
      page1Items: [
        {
          title: 'Close $45k in Q3 Retainer Contracts',
          status: 'In progress',
          date: 'July 1, 2026 → Sept 30, 2026',
          area: 'Revenue',
          progress: 68,
        },
        {
          title: 'Publish 12 Case Studies & Tutorials',
          status: 'In progress',
          date: 'July 4, 2026 → Aug 30, 2026',
          area: 'Growth',
          progress: 50,
        },
      ],
      page2Title: 'SOPs & Client Wiki',
      page2Callout:
        'Standardize onboarding checklists, creative briefs, and reusable templates so every project runs smoothly.',
      page2References: [
        {
          title: 'Client Onboarding & Kickoff Playbook',
          date: 'Updated July 12',
          tags: ['SOP'],
        },
        {
          title: 'Proposal & Scope Estimation Framework',
          date: 'Updated July 10',
          tags: ['Sales', 'Template'],
        },
        {
          title: 'Weekly Async Sprint Status Report',
          date: 'Updated July 2',
          tags: ['Client'],
        },
      ],
      page2Notes: [
        {
          title: 'Discovery Call Qualification Checklist',
          excerpt: 'Confirm budget range, decision timeline, and core KPIs before drafting scope.',
          area: 'Pipeline',
        },
        {
          title: 'Post-Launch Handoff Protocol',
          excerpt: 'Send walkthrough Loom video, invoice milestone #2, and request testimonial.',
          area: 'Delivery',
        },
      ],
      page3Title: 'Client Projects & Tasks',
      page3Callout:
        'Track every active client engagement from kickoff to final sign-off with linked tasks, timelines, and invoice status.',
      page3Projects: [
        {
          title: 'Kanso Design System Redesign',
          status: 'In progress',
          date: 'July 4, 2026 → July 28, 2026',
          area: 'Client Retainer',
          progress: 65,
        },
        {
          title: 'Q3 Product Launch Campaign',
          status: 'In progress',
          date: 'July 10, 2026 → Aug 5, 2026',
          area: 'Marketing',
          progress: 40,
        },
        {
          title: 'Nordic Editorial Web Migration',
          status: 'In progress',
          date: 'July 15, 2026 → Aug 18, 2026',
          area: 'Development',
          progress: 25,
        },
      ],
      page3Timeline: [
        {
          title: 'Discovery & Architecture Audit',
          status: 'Completed',
          progress: '100%',
          offsetPct: 2,
          widthPct: 36,
        },
        {
          title: 'Wireframes & Component Tokens',
          status: 'Completed',
          progress: '100%',
          offsetPct: 12,
          widthPct: 44,
        },
        {
          title: 'Client Milestone #1 Sign-Off',
          status: 'Completed',
          progress: '100%',
          offsetPct: 26,
          widthPct: 42,
        },
        {
          title: 'Production Build & QA Review',
          status: 'In progress',
          progress: '65%',
          offsetPct: 48,
          widthPct: 44,
        },
        {
          title: 'Final Handoff & Documentation',
          status: 'In progress',
          progress: '20%',
          offsetPct: 62,
          widthPct: 34,
        },
      ],
      page3WeeklyTasks: [
        { day: 'Sun', dateNum: '21', isToday: true },
        {
          day: 'Mon',
          dateNum: '22',
          taskTitle: 'Send weekly sprint update to Kanso team.',
          priority: 'High Priority',
        },
        {
          day: 'Tue',
          dateNum: '23',
          taskTitle: 'Review Q3 retainer proposal with Studio Nair.',
          priority: 'High Priority',
        },
        {
          day: 'Wed',
          dateNum: '24',
          taskTitle: 'Publish new case study and newsletter issue.',
          priority: 'High Priority',
        },
        { day: 'Thu', dateNum: '25' },
        { day: 'Fri', dateNum: '26' },
      ],
      lifeAreas: [
        { title: 'Active Clients', projectsCount: '5 Retainers', notesCount: '14 Docs', pattern: 'spiral' },
        { title: 'Lead Pipeline', projectsCount: '8 Prospects', notesCount: '$32k Est.', pattern: 'sunburst' },
        { title: 'Content Hub', projectsCount: '12 Scheduled', notesCount: '4 Channels', pattern: 'vortex' },
        { title: 'Invoices', projectsCount: '3 Pending', notesCount: '18 Paid', pattern: 'prism' },
        { title: 'SOP Library', projectsCount: '16 Playbooks', notesCount: 'Updated', pattern: 'waves' },
        { title: 'OKRs & KPIs', projectsCount: '4 Objectives', notesCount: '72% Avg', pattern: 'radial' },
      ],
    },
    'Health & Fitness': {
      heroHeadline: 'Build daily habits that actually stick.',
      heroSubheadline: `Track your workouts, nutrition, daily rituals, and recovery inside ${template.name}. Designed for effortless mobile logging and calm consistency.`,
      rating: '4.9',
      reviewsCount: 158 + (template.id * 6) % 80,
      defaultModules: [
        'Daily Habits Matrix',
        'Workout & Split Log',
        'Meal & Macro Planner',
        'Grocery & Pantry List',
        'Sleep & Recovery',
        'Monthly Check-In',
      ],
      showcaseHeading: 'Master Your Daily Wellness',
      page1Title: 'Wellness Goals',
      page1Callout:
        'Set realistic training, nutrition, and consistency targets with automated weekly streak tracking.',
      page1Items: [
        {
          title: 'Complete 4x Weekly Strength & Zone 2 Sessions',
          status: 'In progress',
          date: 'July 1, 2026 → Sept 30, 2026',
          area: 'Fitness',
          progress: 80,
        },
        {
          title: 'Maintain 8 Hours Sleep & Morning Hydration Streak',
          status: 'In progress',
          date: 'July 1, 2026 → July 31, 2026',
          area: 'Recovery',
          progress: 70,
        },
      ],
      page2Title: 'Recipes & Training Notes',
      page2Callout:
        'Keep your go-to high-protein meals, grocery staples, and progressive overload cues organized in one library.',
      page2References: [
        {
          title: 'High-Protein Mediterranean Bowl Prep (35g Protein)',
          date: '15 min prep',
          tags: ['Recipe'],
        },
        {
          title: 'Upper / Lower 4-Day Hypertrophy Split',
          date: 'Block 2',
          tags: ['Program', 'Gym'],
        },
        {
          title: '10-Minute Morning Mobility & Spine Routine',
          date: 'Daily',
          tags: ['Recovery'],
        },
      ],
      page2Notes: [
        {
          title: 'Progressive Overload Log — Incline Press +5 lbs',
          excerpt: 'Maintained clean tempo across all 3 working sets; ready to progress next week.',
          area: 'Strength',
        },
        {
          title: 'Sunday Grocery & Meal Prep Checklist',
          excerpt: 'Batch-cook quinoa, roasted vegetables, and overnight oats in 45 minutes.',
          area: 'Nutrition',
        },
      ],
      page3Title: 'Workouts & Daily Habits',
      page3Callout:
        'Check off daily rituals on mobile or desktop and view your training calendar across the entire month.',
      page3Projects: [
        {
          title: '12-Week Strength & Conditioning Block',
          status: 'In progress',
          date: 'July 1, 2026 → Sept 20, 2026',
          area: 'Training',
          progress: 55,
        },
        {
          title: '30-Day Whole Foods & Hydration Reset',
          status: 'In progress',
          date: 'July 1, 2026 → July 30, 2026',
          area: 'Nutrition',
          progress: 75,
        },
        {
          title: 'Half-Marathon Base Mileage Build',
          status: 'In progress',
          date: 'July 10, 2026 → Aug 25, 2026',
          area: 'Endurance',
          progress: 40,
        },
      ],
      page3Timeline: [
        {
          title: 'Morning Hydration & Sunlight Habit',
          status: 'Completed',
          progress: '100%',
          offsetPct: 2,
          widthPct: 42,
        },
        {
          title: 'Week 1–3 Strength Baseline Block',
          status: 'Completed',
          progress: '100%',
          offsetPct: 10,
          widthPct: 48,
        },
        {
          title: 'Weekly Meal Prep & Grocery System',
          status: 'Completed',
          progress: '100%',
          offsetPct: 24,
          widthPct: 46,
        },
        {
          title: '5K Tempo Pace Progression',
          status: 'In progress',
          progress: '70%',
          offsetPct: 48,
          widthPct: 42,
        },
        {
          title: 'Deload & Mobility Assessment Week',
          status: 'In progress',
          progress: '35%',
          offsetPct: 60,
          widthPct: 36,
        },
      ],
      page3WeeklyTasks: [
        { day: 'Sun', dateNum: '21', isToday: true },
        {
          day: 'Mon',
          dateNum: '22',
          taskTitle: 'Upper Body Strength + 20m Zone 2 walk.',
          priority: 'High Priority',
        },
        {
          day: 'Tue',
          dateNum: '23',
          taskTitle: 'Lower Body Session + Evening mobility.',
          priority: 'High Priority',
        },
        {
          day: 'Wed',
          dateNum: '24',
          taskTitle: 'Active recovery run & mid-week grocery restock.',
          priority: 'High Priority',
        },
        { day: 'Thu', dateNum: '25' },
        { day: 'Fri', dateNum: '26' },
      ],
      lifeAreas: [
        { title: 'Daily Habits', projectsCount: '94% Streak', notesCount: '8 Rituals', pattern: 'spiral' },
        { title: 'Strength Log', projectsCount: '4x / Week', notesCount: '24 Exercises', pattern: 'sunburst' },
        { title: 'Cardio & Runs', projectsCount: '22 km/wk', notesCount: 'Zone 2', pattern: 'vortex' },
        { title: 'Meal Planner', projectsCount: '18 Recipes', notesCount: 'Prep Ready', pattern: 'prism' },
        { title: 'Grocery List', projectsCount: 'Auto-Sorted', notesCount: 'By Aisle', pattern: 'waves' },
        { title: 'Sleep & Energy', projectsCount: '7.9h Avg', notesCount: 'Tracked', pattern: 'radial' },
      ],
    },
    School: {
      heroHeadline: 'Master every course and reading note.',
      heroSubheadline: `Organize lectures, assignments, spaced-repetition flashcards, and research citations inside ${template.name}. Built for deep, distraction-free study.`,
      rating: '4.9',
      reviewsCount: 149 + (template.id * 8) % 75,
      defaultModules: [
        'Course Hub & Syllabi',
        'Assignment Deadlines',
        'Spaced Repetition Queue',
        'Reading & Citations',
        'Exam Prep Sprints',
        'GPA & Grade Calculator',
      ],
      showcaseHeading: 'Master Your Academic System',
      page1Title: 'Semester Goals',
      page1Callout:
        'Track target grades, thesis milestones, and reading goals across every enrolled course.',
      page1Items: [
        {
          title: 'Achieve a GPA of 3.8 or Higher',
          status: 'In progress',
          date: 'Semester Sprint',
          area: 'Academics',
          progress: 75,
        },
        {
          title: 'Complete 24 Research Papers & Book Summaries',
          status: 'In progress',
          date: 'July 2026 → Aug 2026',
          area: 'Literature',
          progress: 50,
        },
      ],
      page2Title: 'Reading & Lecture Notes',
      page2Callout:
        'Capture Cornell-style lecture notes, book highlights, and active recall prompts linked directly to each course.',
      page2References: [
        {
          title: "'How to Take Smart Notes' by Sönke Ahrens",
          date: 'July 12, 2026',
          tags: ['Book'],
        },
        {
          title: 'Cognitive Psychology — Memory Consolidation Paper',
          date: 'July 11, 2026',
          tags: ['Journal', 'PDF'],
        },
        {
          title: 'Algorithms & Data Structures Problem Set #4',
          date: 'July 5, 2026',
          tags: ['Coursework'],
        },
      ],
      page2Notes: [
        {
          title: 'Active Recall & Spaced Repetition Schedule',
          excerpt: 'Review new lecture notes at 1-day, 3-day, 7-day, and 21-day intervals.',
          area: 'Study Method',
        },
        {
          title: 'Midterm Synthesis & Concept Mapping',
          excerpt: 'Connect core theorems to practice exam questions before Friday seminar.',
          area: 'Exam Prep',
        },
      ],
      page3Title: 'Assignments & Study Schedule',
      page3Callout:
        'Never miss a submission deadline. View upcoming problem sets, essays, and exam review blocks on one timeline.',
      page3Projects: [
        {
          title: 'Develop a Study Schedule',
          status: 'In progress',
          date: 'July 4, 2026 → July 27, 2026',
          area: 'School',
          progress: 65,
        },
        {
          title: 'Research Thesis Literature Review',
          status: 'In progress',
          date: 'July 8, 2026 → Aug 12, 2026',
          area: 'Seminar',
          progress: 45,
        },
        {
          title: 'Final Exam Flashcard Deck Synthesis',
          status: 'In progress',
          date: 'July 15, 2026 → Aug 20, 2026',
          area: 'Revision',
          progress: 30,
        },
      ],
      page3Timeline: [
        {
          title: 'Syllabus & Deadline Import',
          status: 'Completed',
          progress: '100%',
          offsetPct: 2,
          widthPct: 36,
        },
        {
          title: 'Problem Set #1–#3 Submissions',
          status: 'Completed',
          progress: '100%',
          offsetPct: 12,
          widthPct: 46,
        },
        {
          title: 'Literature Review Annotated Bibliography',
          status: 'Completed',
          progress: '100%',
          offsetPct: 28,
          widthPct: 48,
        },
        {
          title: 'Midterm Practice Exam & Review',
          status: 'In progress',
          progress: '65%',
          offsetPct: 50,
          widthPct: 42,
        },
        {
          title: 'Final Paper Draft & Peer Review',
          status: 'In progress',
          progress: '30%',
          offsetPct: 62,
          widthPct: 34,
        },
      ],
      page3WeeklyTasks: [
        { day: 'Sun', dateNum: '21', isToday: true },
        {
          day: 'Mon',
          dateNum: '22',
          taskTitle: 'Summarize Chapters 4–5 lecture notes.',
          priority: 'High Priority',
        },
        {
          day: 'Tue',
          dateNum: '23',
          taskTitle: 'Complete 30 spaced-repetition recall prompts.',
          priority: 'High Priority',
        },
        {
          day: 'Wed',
          dateNum: '24',
          taskTitle: 'Draft thesis outline & meet faculty advisor.',
          priority: 'High Priority',
        },
        { day: 'Thu', dateNum: '25' },
        { day: 'Fri', dateNum: '26' },
      ],
      lifeAreas: [
        { title: 'Courses', projectsCount: '5 Enrolled', notesCount: '42 Lectures', pattern: 'spiral' },
        { title: 'Assignments', projectsCount: '3 Due Soon', notesCount: '18 Done', pattern: 'sunburst' },
        { title: 'Reading List', projectsCount: '14 Books', notesCount: '68 Notes', pattern: 'vortex' },
        { title: 'Flashcards', projectsCount: '120 Cards', notesCount: 'Active Recall', pattern: 'prism' },
        { title: 'Exams & Labs', projectsCount: '4 Upcoming', notesCount: 'Prep Ready', pattern: 'waves' },
        { title: 'Grade Tracker', projectsCount: '3.92 GPA', notesCount: 'Updated', pattern: 'radial' },
      ],
    },
    Travel: {
      heroHeadline: 'Plan every trip without the chaos.',
      heroSubheadline: `Keep flights, accommodations, day-by-day itineraries, budgets, and packing checklists in one place with ${template.name}. Accessible offline on mobile.`,
      rating: '4.9',
      reviewsCount: 142 + (template.id * 9) % 70,
      defaultModules: [
        'Trip Itineraries',
        'Flights & Bookings',
        'Packing Checklists',
        'Travel Budget & FX',
        'Local Spots & Maps',
        'Travel Journal',
      ],
      showcaseHeading: 'Master Your Travel Adventures',
      page1Title: 'Bucket List & Trips',
      page1Callout:
        'Plan upcoming getaways and long-term bucket-list destinations with linked budgets, dates, and travel companions.',
      page1Items: [
        {
          title: 'Visit Three New Countries',
          status: 'In progress',
          date: 'July 1, 2026 → August 19, 2026',
          area: 'International',
          progress: 65,
        },
        {
          title: 'Autumn Kyoto & Tokyo Cultural Itinerary',
          status: 'In progress',
          date: 'Oct 10, 2026 → Oct 24, 2026',
          area: 'Asia',
          progress: 40,
        },
      ],
      page2Title: 'Saved Places & Guides',
      page2Callout:
        'Clip neighborhood cafes, museums, transit passes, and emergency embassy contacts for instant access on your phone.',
      page2References: [
        {
          title: 'London & Paris High-Speed Eurostar Booking',
          date: 'Confirmed',
          tags: ['Transit'],
        },
        {
          title: 'Curated Specialty Coffee & Architecture Walk',
          date: '14 Pins',
          tags: ['Guide', 'Map'],
        },
        {
          title: 'Carry-On Only Ultralight Packing Checklist',
          date: '38 Items',
          tags: ['Packing'],
        },
      ],
      page2Notes: [
        {
          title: 'Airport Transfer & Metro Card Setup',
          excerpt: 'Load contactless transit pass on phone before landing at terminal.',
          area: 'Logistics',
        },
        {
          title: 'Passport, Visa & Travel Insurance Vault',
          excerpt: 'Keep offline PDF copies of boarding passes and hotel confirmations.',
          area: 'Documents',
        },
      ],
      page3Title: 'Itineraries & Bookings',
      page3Callout:
        'Organize every trip day-by-day so flights, check-in times, and reservations flow seamlessly.',
      page3Projects: [
        {
          title: 'Plan Trip to Dubai',
          status: 'In progress',
          date: 'July 10, 2026 → July 24, 2026',
          area: 'Travel & Leisure',
          progress: 80,
        },
        {
          title: 'Plan Trip to London, Paris',
          status: 'In progress',
          date: 'Aug 5, 2026 → Aug 19, 2026',
          area: 'Travel & Leisure',
          progress: 55,
        },
        {
          title: 'Weekend Coastal Roadtrip',
          status: 'In progress',
          date: 'Sept 4, 2026 → Sept 7, 2026',
          area: 'Getaway',
          progress: 30,
        },
      ],
      page3Timeline: [
        {
          title: 'Book Flights & Seat Selection',
          status: 'Completed',
          progress: '100%',
          offsetPct: 2,
          widthPct: 38,
        },
        {
          title: 'Reserve Boutique Hotels & Airbnbs',
          status: 'Completed',
          progress: '100%',
          offsetPct: 14,
          widthPct: 44,
        },
        {
          title: 'Finalize Day-by-Day Museum & Dining Bookings',
          status: 'Completed',
          progress: '100%',
          offsetPct: 28,
          widthPct: 46,
        },
        {
          title: 'Complete Carry-On Packing Checklist',
          status: 'In progress',
          progress: '80%',
          offsetPct: 52,
          widthPct: 40,
        },
        {
          title: 'Download Offline Maps & Boarding Passes',
          status: 'In progress',
          progress: '50%',
          offsetPct: 62,
          widthPct: 34,
        },
      ],
      page3WeeklyTasks: [
        { day: 'Sun', dateNum: '21', isToday: true },
        {
          day: 'Mon',
          dateNum: '22',
          taskTitle: 'Confirm hotel check-in times & airport transfer.',
          priority: 'High Priority',
        },
        {
          day: 'Tue',
          dateNum: '23',
          taskTitle: 'Pack universal adapter, chargers & travel docs.',
          priority: 'High Priority',
        },
        {
          day: 'Wed',
          dateNum: '24',
          taskTitle: 'Check in online 24h prior to departure flight.',
          priority: 'High Priority',
        },
        { day: 'Thu', dateNum: '25' },
        { day: 'Fri', dateNum: '26' },
      ],
      lifeAreas: [
        { title: 'Upcoming Trips', projectsCount: '3 Planned', notesCount: '18 Days', pattern: 'spiral' },
        { title: 'Bookings', projectsCount: '6 Confirmed', notesCount: 'Flights & Stays', pattern: 'sunburst' },
        { title: 'Packing List', projectsCount: '38 Items', notesCount: '92% Packed', pattern: 'vortex' },
        { title: 'Trip Budget', projectsCount: '$3,400 Cap', notesCount: 'On Track', pattern: 'prism' },
        { title: 'Saved Places', projectsCount: '24 Spots', notesCount: 'Cafes & Sights', pattern: 'waves' },
        { title: 'Travel Log', projectsCount: '11 Countries', notesCount: 'Memories', pattern: 'radial' },
      ],
    },
  };

  const base = byCategory[template.category];
  return {
    ...base,
    closerLookModules: base.defaultModules,
  };
}

/**
 * Verified Scalloped Blue Check Badge (matching image_d974a805.png & image_3bf9bf89.png)
 */
const VerifiedBadgeIcon: React.FC<{ className?: string }> = ({
  className = 'w-5 h-5 text-[#1D6EE3]',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 2.25L14.32 3.92L17.15 3.63L18.31 6.23L20.91 7.39L20.62 10.22L22.29 12.54L20.62 14.86L20.91 17.69L18.31 18.85L17.15 21.45L14.32 21.16L12 22.83L9.68 21.16L6.85 21.45L5.69 18.85L3.09 17.69L3.38 14.86L1.71 12.54L3.38 10.22L3.09 7.39L5.69 6.23L6.85 3.63L9.68 3.92L12 2.25Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.75 12.5L10.9 14.65L15.5 10.05"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Minimalist geometric line-art pattern inside the Tablet mockup's "Life Areas" cards
 * (matching image_d974a805.png)
 */
const AreaGeometricArt: React.FC<{
  pattern: 'spiral' | 'sunburst' | 'vortex' | 'prism' | 'waves' | 'radial';
}> = ({ pattern }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="w-8 h-8 sm:w-9 sm:h-9 text-[#1E293B]"
      aria-hidden="true"
    >
      {pattern === 'spiral' && (
        <>
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="24" cy="24" r="13" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.1" strokeDasharray="2 2" />
          <circle cx="24" cy="24" r="3.5" stroke="currentColor" strokeWidth="1.2" />
        </>
      )}
      {pattern === 'sunburst' && (
        <>
          <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.1" />
          <path
            d="M24 4V10M24 38V44M4 24H10M38 24H44M9.8 9.8L14.2 14.2M33.8 33.8L38.2 38.2M38.2 9.8L33.8 14.2M14.2 33.8L9.8 38.2"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </>
      )}
      {pattern === 'vortex' && (
        <>
          <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="24" cy="24" rx="17" ry="9" transform="rotate(30 24 24)" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="24" cy="24" rx="17" ry="9" transform="rotate(-30 24 24)" stroke="currentColor" strokeWidth="1" />
          <circle cx="24" cy="24" r="4" fill="currentColor" />
        </>
      )}
      {pattern === 'prism' && (
        <>
          <rect x="8" y="8" width="32" height="32" rx="3" stroke="currentColor" strokeWidth="1.2" />
          <rect x="13" y="13" width="22" height="22" transform="rotate(15 24 24)" stroke="currentColor" strokeWidth="1" />
          <rect x="17" y="17" width="14" height="14" transform="rotate(30 24 24)" stroke="currentColor" strokeWidth="1" />
        </>
      )}
      {pattern === 'waves' && (
        <>
          <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1.1" />
          <path d="M9 20C14 15 19 15 24 20C29 25 34 25 39 20" stroke="currentColor" strokeWidth="1.1" />
          <path d="M9 25C14 20 19 20 24 25C29 30 34 30 39 25" stroke="currentColor" strokeWidth="1.1" />
          <path d="M11 30C15 26 20 26 24 30C28 34 33 34 37 30" stroke="currentColor" strokeWidth="1.1" />
        </>
      )}
      {pattern === 'radial' && (
        <>
          <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1" />
          <circle cx="24" cy="24" r="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.2" />
          <path d="M24 7V41M7 24H41" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6" />
        </>
      )}
    </svg>
  );
};

export const TemplateShowcasePage: React.FC<{
  slug: string;
  onNavigate: (path: string) => void;
  onOpenCheckout: (target: CheckoutTarget) => void;
  purchasedSlugs: Set<string>;
}> = ({ slug, onNavigate, onOpenCheckout, purchasedSlugs }) => {
  const template =
    TEMPLATES.find((t) => t.slug === slug) ||
    TEMPLATES.find((t) => t.slug === 'second-brain')!;

  const showcase = getTemplateShowcaseData(template);
  const isOwned = purchasedSlugs.has(template.slug);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(0);

  const related = TEMPLATES.filter(
    (t) => t.category === template.category && t.slug !== template.slug
  ).slice(0, 3);

  const displayCompareAt =
    template.compareAt !== undefined
      ? template.compareAt
      : template.price > 0
      ? template.price + 20
      : 19;

  const handleOpenBuy = () => {
    onOpenCheckout({
      name: template.name,
      slug: template.slug,
      price: template.price,
      compareAt: template.compareAt,
      pro: template.pro,
      whatsInside: template.whatsInside,
    });
  };

  const handleScrollToCloserLook = () => {
    const el = document.getElementById('template-closer-look');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div data-testid="template-showcase-page" className="pb-24 bg-white">
      {/* =====================================================================
          1. HERO SECTION & DUAL-DEVICE NOTION MOCKUP (image_d974a805.png)
          ===================================================================== */}
      <section className="bg-gradient-to-b from-[#F4F7FB] via-[#F8FAFC] to-[#FFFFFF] pt-8 sm:pt-12 pb-16 sm:pb-24 border-b border-[#EDF2F7]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          {/* Top Breadcrumb: All templates / {template.name} */}
          <nav
            aria-label="Breadcrumb"
            data-testid="template-breadcrumb"
            className="flex items-center gap-2 text-[14.5px] font-medium text-[#334155] mb-8 sm:mb-10"
          >
            <a
              href="/templates"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/templates');
              }}
              className="text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              All templates
            </a>
            <span className="text-[#94A3B8]">/</span>
            <span className="text-[#0F172A] font-semibold">{template.name}</span>
          </nav>

          {/* 2-Column Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Copy, Pricing, Pill CTAs & Verified Rating */}
            <div className="lg:col-span-6 space-y-6">
              {/* "Made for Notion" Pill Badge */}
              <div>
                <div
                  data-testid="made-for-notion-badge"
                  className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0"
                  >
                    <path
                      d="M4.5 6.2L14.8 4.2L20.2 7.2V18.8L10.2 20.5L4.5 17.2V6.2Z"
                      fill="#FFFFFF"
                      stroke="#1E293B"
                      strokeWidth="1.75"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.5 6.2L10.2 9.4L20.2 7.2"
                      stroke="#1E293B"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.2 9.4V20.5"
                      stroke="#1E293B"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.7 16.7V11.8L16.8 16.2V11.1"
                      stroke="#1E293B"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[13px] font-medium tracking-[-0.01em] text-[#1E293B]">
                    Made for Notion
                  </span>
                </div>
              </div>

              {/* Benefit Headline */}
              <h1 className="font-display text-[clamp(36px,4.6vw,56px)] font-bold tracking-[-0.035em] leading-[1.06] text-[#0F172A] text-balance">
                {showcase.heroHeadline}
              </h1>

              {/* Subtitle / Description */}
              <p className="text-[17px] sm:text-[18.5px] leading-[1.6] text-[#64748B] max-w-[540px]">
                {showcase.heroSubheadline}
              </p>

              {/* Pricing Row */}
              <div className="flex flex-wrap items-baseline gap-3 pt-1">
                <span className="text-[21px] sm:text-[23px] font-bold tracking-[-0.02em] text-[#0F172A] tabular-nums">
                  {template.price === 0
                    ? 'Free Edition $0'
                    : `Premium from ${formatPrice(template.price)}`}
                </span>
                <span className="text-[18px] font-medium text-[#64748B] line-through tabular-nums">
                  {formatPrice(displayCompareAt)}
                </span>
                <span className="text-[14px] text-[#64748B]">
                  {template.price === 0
                    ? 'Instant Notion duplicate'
                    : 'One-time purchase'}
                </span>
              </div>

              {/* Dual Pill Buttons: "Get [Template] →" + "Preview what's inside" */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <motion.button
                  type="button"
                  data-testid="template-primary-cta"
                  whileHover={{ y: -2, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                  onClick={handleOpenBuy}
                  className="h-12 px-7 rounded-full bg-[#1D6EE3] hover:bg-[#155BC2] text-white text-[15px] font-semibold inline-flex items-center justify-center gap-2.5 shadow-[0_10px_24px_-8px_rgba(29,110,227,0.55)] cursor-pointer transition-colors"
                >
                  <span>
                    {isOwned
                      ? `Open ${template.name}`
                      : `Get ${template.name}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  type="button"
                  data-testid="template-preview-inside-btn"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                  onClick={handleScrollToCloserLook}
                  className="h-12 px-6 rounded-full bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] text-[15px] font-semibold inline-flex items-center justify-center cursor-pointer shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-colors"
                >
                  <span>Preview what&apos;s inside</span>
                </motion.button>
              </div>

              {/* Rating & Edition Note */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-[14px] font-medium text-[#64748B]">
                  <VerifiedBadgeIcon className="w-5 h-5 text-[#1D6EE3] shrink-0" />
                  <span>
                    {showcase.rating}/5 from {showcase.reviewsCount} Gumroad ratings
                  </span>
                </div>
                <p className="text-[13.5px] text-[#64748B]">
                  Choose your edition at checkout. Add it to your Notion workspace.
                </p>
              </div>
            </div>

            {/* Right Column: Freelance OS HD Studio Preview OR Dual-Device Notion Mockup */}
            <div className="lg:col-span-6">
              {template.slug === 'freelance-os' ? (
                <div
                  data-testid="template-device-mockup"
                  onClick={handleScrollToCloserLook}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleScrollToCloserLook();
                    }
                  }}
                  className="group rounded-[24px] bg-white border border-[#E2E8F0] p-3 sm:p-4 shadow-[0_14px_40px_-14px_rgba(15,23,42,0.08)] relative overflow-hidden cursor-pointer"
                >
                  <div className="rounded-[16px] overflow-hidden border border-[#E2E8F0] aspect-[16/9] bg-[#F8FAFC] relative">
                    <img
                      src={freelanceOsHubImg}
                      alt="Freelancer Business OS workspace overview"
                      className="w-full h-full object-cover showcase-hd-image transition-transform duration-500 group-hover:scale-[1.015]"
                    />
                  </div>
                  <div className="pt-3 px-1 flex items-center justify-between text-[12.5px] text-[#64748B]">
                    <span className="font-semibold text-[#0F172A]">
                      Freelancer Business OS · Resonance Studio
                    </span>
                    <span className="text-[#1D6EE3] font-semibold">
                      4 HD Modules Included ↓
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  data-testid="template-device-mockup"
                  className="rounded-[24px] bg-white border border-[#E2E8F0] p-5 sm:p-8 shadow-[0_14px_40px_-14px_rgba(15,23,42,0.07)] relative overflow-hidden"
                >
                <div className="relative mx-auto max-w-[540px] py-2 sm:py-4 pr-6 sm:pr-12">
                  {/* TABLET LANDSCAPE FRAME (iPad Mockup) */}
                  <div className="rounded-[20px] bg-[#111827] p-[9px] sm:p-[12px] shadow-[0_24px_48px_-12px_rgba(15,23,42,0.24)] border border-[#334155]">
                    <div className="rounded-[12px] bg-white overflow-hidden border border-[#E2E8F0]">
                      {/* Notion Top Bar inside Tablet */}
                      <div className="px-4 pt-3.5 pb-2 border-b border-[#F1F5F9] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-[6px] bg-[#EFF6FF] text-[#1D6EE3] font-bold text-[13px]">
                            ∞
                          </span>
                          <span className="text-[14px] sm:text-[15px] font-bold tracking-[-0.02em] text-[#0F172A]">
                            {template.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-[#64748B] font-mono">
                          <span className="px-1.5 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
                            {template.databaseCount} DBs
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
                            {template.version}
                          </span>
                        </div>
                      </div>

                      {/* Tablet Interior: Left Quick-Action Sidebar + Right Life Areas Grid */}
                      <div className="grid grid-cols-12 p-3 sm:p-4 gap-3 sm:gap-4 bg-white min-h-[250px] sm:min-h-[280px]">
                        {/* Left Sidebar: Quick Action + Productivity Links */}
                        <div className="col-span-4 space-y-3 border-r border-[#F1F5F9] pr-2.5">
                          <div>
                            <p className="text-[9.5px] font-bold uppercase tracking-[0.04em] text-[#0F172A] mb-1.5">
                              Quick Action
                            </p>
                            <div className="space-y-1">
                              {[
                                'New Task',
                                'New Note',
                                'New Project',
                                'New Goal',
                                'New Reference',
                                'Add Agenda',
                              ].map((action) => (
                                <div
                                  key={action}
                                  className="px-2 py-1 rounded-[5px] border border-[#E2E8F0] bg-[#FFFFFF] text-[8.5px] font-medium text-[#334155] flex items-center gap-1 shadow-[0_1px_1px_rgba(15,23,42,0.02)]"
                                >
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#EFF6FF] text-[#1D6EE3] inline-flex items-center justify-center text-[7px] font-bold">
                                    +
                                  </span>
                                  <span className="truncate">{action}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-[9.5px] font-bold uppercase tracking-[0.04em] text-[#0F172A] mb-1.5">
                              Productivity
                            </p>
                            <div className="space-y-1 text-[8.5px] font-medium text-[#475569]">
                              {[
                                'Inbox',
                                'Life Areas',
                                'Goals',
                                'Projects & Tasks',
                                'References & Notes',
                              ].map((navItem) => (
                                <div
                                  key={navItem}
                                  className="flex items-center gap-1.5 py-0.5 truncate"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D6EE3] shrink-0" />
                                  <span className="truncate underline decoration-[#CBD5E1] underline-offset-2">
                                    {navItem}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Main Area: Life Areas 3x2 Gallery Grid */}
                        <div className="col-span-8 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] font-bold text-[#0F172A]">
                              Life Areas
                            </p>
                            <span className="text-[8.5px] text-[#64748B] font-medium">
                              ⊞ Areas
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            {showcase.lifeAreas.map((area) => (
                              <div
                                key={area.title}
                                className="rounded-[8px] border border-[#E2E8F0] bg-[#FFFFFF] overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
                              >
                                <div className="h-12 sm:h-14 bg-[#F8FAFC] border-b border-[#F1F5F9] flex items-center justify-center">
                                  <AreaGeometricArt pattern={area.pattern} />
                                </div>
                                <div className="p-1.5 space-y-0.5">
                                  <p className="text-[8.5px] font-semibold text-[#0F172A] truncate">
                                    {area.title}
                                  </p>
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-[7px] text-[#1D6EE3] bg-[#EFF6FF] px-1 rounded w-fit">
                                      {area.projectsCount}
                                    </span>
                                    <span className="text-[7px] text-[#64748B] px-1">
                                      {area.notesCount}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* OVERLAPPING MOBILE PORTRAIT FRAME (iPhone Mockup on Right) */}
                  <div className="w-[150px] sm:w-[178px] rounded-[24px] bg-[#111827] p-[6px] sm:p-[7px] shadow-[-12px_20px_38px_rgba(15,23,42,0.25)] border border-[#334155] absolute right-0 bottom-0 z-10">
                    <div className="rounded-[19px] bg-white overflow-hidden border border-[#E2E8F0]">
                      {/* Phone Status Bar + Dynamic Island */}
                      <div className="px-3 pt-2 pb-1 flex items-center justify-between text-[8px] font-semibold text-[#0F172A]">
                        <span>11:20</span>
                        <span className="w-10 h-2.5 rounded-full bg-[#0F172A]" />
                        <span>5G 100%</span>
                      </div>

                      {/* Mobile Notion Header */}
                      <div className="px-3 py-1.5 border-b border-[#F1F5F9] flex items-center justify-between text-[8px] text-[#64748B]">
                        <span className="truncate font-medium text-[#0F172A]">
                          ‹ ∞ {template.name}
                        </span>
                        <span>•••</span>
                      </div>

                      {/* Mobile Notion Body */}
                      <div className="p-3 space-y-2.5">
                        <p className="text-[11px] font-bold text-[#0F172A] leading-tight truncate">
                          {template.name}
                        </p>

                        <div className="space-y-1">
                          <p className="text-[8.5px] font-bold text-[#0F172A]">
                            Quick Action
                          </p>
                          {[
                            'New Task',
                            'New Note',
                            'New Project',
                            'New Goal',
                            'New Reference',
                          ].map((act) => (
                            <div
                              key={act}
                              className="px-2 py-1 rounded-[5px] border border-[#E2E8F0] bg-white text-[8px] font-medium text-[#1E293B] flex items-center gap-1.5"
                            >
                              <span className="w-2.5 h-2.5 rounded-full bg-[#EFF6FF] text-[#1D6EE3] inline-flex items-center justify-center text-[7px] font-bold">
                                +
                              </span>
                              <span className="truncate">{act}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-1 pt-0.5">
                          <p className="text-[8.5px] font-bold text-[#0F172A]">
                            Productivity
                          </p>
                          {['Inbox', 'Life Areas', 'Goals'].map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-1.5 text-[8px] font-medium text-[#334155]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1D6EE3]" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mobile Bottom Navigation Bar */}
                      <div className="px-3 py-1.5 border-t border-[#F1F5F9] bg-[#F8FAFC] flex items-center justify-around text-[#64748B]">
                        <LayoutGrid className="w-3 h-3" />
                        <Search className="w-3 h-3" />
                        <Inbox className="w-3 h-3 text-[#1D6EE3]" />
                        <Plus className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. "TAKE A CLOSER LOOK — Everything has a place." (image_3bf9bf89.png)
          ===================================================================== */}
      <section
        id="template-closer-look"
        data-testid="template-closer-look"
        className="pt-16 sm:pt-24 pb-12 sm:pb-16 max-w-[1240px] mx-auto px-4 sm:px-6"
      >
        <div className="space-y-3 max-w-[680px] mb-10">
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#64748B]">
            TAKE A CLOSER LOOK
          </p>
          <h2 className="font-display text-[clamp(30px,3.8vw,44px)] font-bold tracking-[-0.03em] leading-[1.1] text-[#0F172A]">
            Everything has a place.
          </h2>
          <p className="text-[16.5px] sm:text-[18px] text-[#64748B] leading-[1.55]">
            Explore the key parts of the system. Edition details are shown at checkout.
          </p>
        </div>

        {/* 6-Card System Modules Grid (matching image_3bf9bf89.png) */}
        <div
          data-testid="closer-look-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {showcase.closerLookModules.map((moduleTitle, index) => {
            const isSelected = selectedModuleIndex === index;
            return (
              <motion.button
                key={moduleTitle}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedModuleIndex(index)}
                className={`w-full text-left rounded-[16px] bg-white border px-6 py-5 flex items-center gap-3.5 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-[#1D6EE3] shadow-[0_10px_24px_-10px_rgba(29,110,227,0.18)]'
                    : 'border-[#E2E8F0] hover:border-[#1D6EE3]/45 shadow-[0_2px_8px_-3px_rgba(15,23,42,0.04)]'
                }`}
              >
                <VerifiedBadgeIcon className="w-5 h-5 text-[#1D6EE3] shrink-0" />
                <span className="text-[16px] sm:text-[17px] font-semibold tracking-[-0.015em] text-[#0F172A]">
                  {moduleTitle}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          3. "Master Your Productivity" — FREELANCE OS HD GALLERY OR 3-PAGE CASCADING SHOWCASE
          ===================================================================== */}
      {template.slug === 'freelance-os' ? (
        <section
          data-testid="template-cascading-pages"
          className="py-10 sm:py-14 max-w-[1240px] mx-auto px-4 sm:px-6"
        >
          <FreelanceOsGallery variant="detail" />
        </section>
      ) : (
      <section
        data-testid="template-cascading-pages"
        className="py-10 sm:py-14 max-w-[1240px] mx-auto px-4 sm:px-6"
      >
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.025em] text-[#0F172A]">
            {showcase.showcaseHeading}
          </h2>
          <p className="text-[14px] text-[#64748B]">
            Inside the <span className="font-semibold text-[#0F172A]">{template.name}</span> Notion workspace · {template.databaseCount} interlinked databases & {template.viewsCount} pre-built views
          </p>
        </div>

        {/* Light-Slate Stage Container with 3 Overlapping/Cascading Notion Pages */}
        <div className="rounded-[28px] bg-[#F1F5F9]/85 border border-[#E2E8F0] pt-8 sm:pt-14 px-4 sm:px-8 lg:px-8 pb-8 lg:pb-0 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-6 lg:gap-0">
            {/* -----------------------------------------------------------------
                PAGE 1 (Left / Lower-Left Card): Goals Overview
               ----------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="w-full lg:w-[30%] shrink-0 lg:mt-44 z-10 rounded-t-[20px] rounded-b-[20px] lg:rounded-b-none bg-white border border-[#E2E8F0] shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12)] p-5 sm:p-6 space-y-4"
            >
              {/* Page Icon + Title */}
              <div className="space-y-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-[#EFF6FF] text-[#1D6EE3] flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-[22px] font-bold tracking-[-0.02em] text-[#0F172A]">
                  {showcase.page1Title}
                </h3>
              </div>

              {/* Notion Callout Banner */}
              <div className="rounded-[8px] bg-[#F8FAFC] border border-[#E2E8F0] p-3 flex items-start gap-2 text-[11.5px] leading-[1.5] text-[#475569]">
                <span className="text-[#1D6EE3] font-bold shrink-0 mt-0.5">ⓘ</span>
                <p>
                  {showcase.page1Callout}
                </p>
              </div>

              {/* Back To Dashboard Button */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] border border-[#E2E8F0] bg-white text-[10.5px] font-medium text-[#334155]">
                  <span>↩</span>
                  <span>Back To Dashboard</span>
                </span>
              </div>

              {/* Goals Overview Database */}
              <div className="space-y-2.5 pt-1">
                <p className="text-[13.5px] font-bold text-[#0F172A]">
                  {showcase.page1Title} Overview
                </p>

                {/* Notion View Tabs */}
                <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-1.5 text-[10.5px] font-medium text-[#64748B]">
                  <span>📥 Inbox</span>
                  <span className="text-[#0F172A] font-semibold border-b-2 border-[#0F172A] pb-1 -mb-1.5">
                    ✔ Active {showcase.page1Title}
                  </span>
                  <span>Completed</span>
                </div>

                {/* 2 Goal Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {showcase.page1Items.map((goal) => (
                    <div
                      key={goal.title}
                      className="rounded-[10px] border border-[#E2E8F0] bg-white p-3 space-y-2 shadow-[0_1px_3px_rgba(15,23,42,0.03)]"
                    >
                      <p className="text-[11px] font-semibold text-[#0F172A] leading-snug">
                        ◎ {goal.title}
                      </p>
                      <div>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#1D6EE3] text-[9.5px] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1D6EE3]" />
                          {goal.status}
                        </span>
                      </div>
                      <p className="text-[9.5px] text-[#64748B]">{goal.date}</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-1.5 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[9px] text-[#334155]">
                          {goal.area}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-[#FEF3C7]/60 text-[#92400E] text-[9px]">
                          2 Projects
                        </span>
                      </div>
                      {/* Progress Bar */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[9.5px] font-semibold text-[#334155] tabular-nums">
                          {goal.progress}%
                        </span>
                        <div className="flex-1 h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                          <div
                            style={{ width: `${goal.progress}%` }}
                            className="h-full rounded-full bg-[#1D6EE3]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* -----------------------------------------------------------------
                PAGE 2 (Center / Middle-Elevated Card): References & Notes
               ----------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="w-full lg:w-[34%] shrink-0 lg:-ml-6 lg:mt-20 z-20 rounded-t-[20px] rounded-b-[20px] lg:rounded-b-none bg-white border border-[#E2E8F0] shadow-[-10px_20px_50px_-15px_rgba(15,23,42,0.16)] p-5 sm:p-6 space-y-4"
            >
              {/* Page Icon + Title */}
              <div className="space-y-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-[#EFF6FF] text-[#1D6EE3] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-[22px] font-bold tracking-[-0.02em] text-[#0F172A]">
                  {showcase.page2Title}
                </h3>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] border border-[#E2E8F0] bg-white text-[10.5px] font-medium text-[#334155]">
                  <span>↩</span>
                  <span>Back To Dashboard</span>
                </span>
              </div>

              {/* References Overview Database */}
              <div className="space-y-2.5">
                <p className="text-[13.5px] font-bold text-[#0F172A]">
                  References Overview
                </p>
                <div className="flex items-center gap-2.5 border-b border-[#E2E8F0] pb-1.5 text-[10px] font-medium text-[#64748B] overflow-x-auto no-scrollbar">
                  <span className="text-[#0F172A] font-semibold border-b-2 border-[#0F172A] pb-1 -mb-1.5 whitespace-nowrap">
                    ⊞ References
                  </span>
                  <span className="whitespace-nowrap">Recently</span>
                  <span className="whitespace-nowrap">On Review</span>
                  <span className="whitespace-nowrap">Pinned</span>
                </div>

                {/* 2x2 Reference Cards */}
                <div className="grid grid-cols-2 gap-2">
                  {showcase.page2References.map((refItem) => (
                    <div
                      key={refItem.title}
                      className="rounded-[9px] border border-[#E2E8F0] bg-white p-2.5 space-y-1.5"
                    >
                      <p className="text-[10px] font-semibold text-[#0F172A] leading-snug line-clamp-2">
                        📄 {refItem.title}
                      </p>
                      <p className="text-[9px] text-[#64748B]">{refItem.date}</p>
                      <div className="flex items-center gap-1 text-[9px] text-[#1D6EE3]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1D6EE3]" />
                        <span>Inbox</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {refItem.tags.map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[8.5px] text-[#475569]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="rounded-[9px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC]/60 p-2.5 flex items-center justify-center text-[10px] font-medium text-[#64748B]">
                    + New
                  </div>
                </div>
              </div>

              {/* Callout Banner */}
              <div className="rounded-[8px] bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 flex items-start gap-2 text-[10.5px] leading-[1.45] text-[#475569]">
                <span className="text-[#1D6EE3] font-bold shrink-0">ⓘ</span>
                <p>{showcase.page2Callout}</p>
              </div>

              {/* Notes Overview */}
              <div className="space-y-2 pt-1">
                <p className="text-[13px] font-bold text-[#0F172A]">
                  Notes Overview
                </p>
                <div className="flex items-center gap-2.5 border-b border-[#E2E8F0] pb-1 text-[9.5px] text-[#64748B]">
                  <span>Inbox</span>
                  <span>In Review</span>
                  <span className="text-[#0F172A] font-semibold border-b-2 border-[#0F172A] pb-1 -mb-1">
                    ★ Favourite
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {showcase.page2Notes.map((note) => (
                    <div
                      key={note.title}
                      className="rounded-[8px] border border-[#E2E8F0] bg-[#FFFFFF] p-2.5 space-y-1"
                    >
                      <p className="text-[9.5px] text-[#64748B] line-clamp-2">
                        {note.excerpt}
                      </p>
                      <p className="text-[9.5px] font-semibold text-[#0F172A] line-clamp-2">
                        📝 {note.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* -----------------------------------------------------------------
                PAGE 3 (Right / Forefront Tallest Card): Projects, Timeline & Weekly Tasks
               ----------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="w-full lg:w-[42%] shrink-0 lg:-ml-6 z-30 rounded-t-[20px] rounded-b-[20px] lg:rounded-b-none bg-white border border-[#E2E8F0] shadow-[-16px_24px_60px_-15px_rgba(15,23,42,0.20)] p-5 sm:p-7 space-y-4"
            >
              {/* Page Icon + Title */}
              <div className="space-y-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-[#EFF6FF] text-[#1D6EE3] flex items-center justify-center">
                  <Folder className="w-5 h-5" />
                </div>
                <h3 className="text-[23px] font-bold tracking-[-0.02em] text-[#0F172A]">
                  {showcase.page3Title}
                </h3>
              </div>

              {/* Action Bar: Back To Dashboard | New Project | New Task */}
              <div className="grid grid-cols-3 gap-2 pt-0.5">
                <span className="px-2.5 py-1.5 rounded-[6px] border border-[#E2E8F0] bg-white text-[10px] font-medium text-[#334155] text-center truncate">
                  ↩ Back To Dashboard
                </span>
                <span className="px-2.5 py-1.5 rounded-[6px] border border-[#E2E8F0] bg-white text-[10px] font-medium text-[#1D6EE3] text-center truncate">
                  📁 New Project
                </span>
                <span className="px-2.5 py-1.5 rounded-[6px] border border-[#E2E8F0] bg-white text-[10px] font-medium text-[#1D6EE3] text-center truncate">
                  ✔ New Task
                </span>
              </div>

              {/* 1. Projects Overview Gallery */}
              <div className="space-y-2">
                <p className="text-[13.5px] font-bold text-[#0F172A]">
                  Projects Overview
                </p>
                <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-1.5 text-[10px] font-medium text-[#64748B]">
                  <span>Inbox</span>
                  <span className="text-[#0F172A] font-semibold border-b-2 border-[#0F172A] pb-1 -mb-1.5">
                    ⊞ Working On
                  </span>
                  <span>Upcoming</span>
                  <span>☑ Completed</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {showcase.page3Projects.map((proj) => (
                    <div
                      key={proj.title}
                      className="rounded-[9px] border border-[#E2E8F0] bg-white p-2.5 space-y-1.5"
                    >
                      <p className="text-[10px] font-semibold text-[#0F172A] leading-snug truncate">
                        📁 {proj.title}
                      </p>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#1D6EE3] text-[8.5px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1D6EE3]" />
                        {proj.status}
                      </span>
                      <p className="text-[8.5px] text-[#64748B] truncate">
                        {proj.date}
                      </p>
                      <p className="text-[8.5px] text-[#334155] font-medium truncate">
                        ◎ {proj.area}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8.5px] text-[#64748B]">
                          {proj.progress}%
                        </span>
                        <div className="flex-1 h-1 rounded-full bg-[#E2E8F0] overflow-hidden">
                          <div
                            style={{ width: `${proj.progress}%` }}
                            className="h-full bg-[#1D6EE3]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Callout Block */}
              <div className="rounded-[8px] bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 flex items-start gap-2 text-[10px] leading-[1.45] text-[#475569]">
                <span className="text-[#1D6EE3] font-bold shrink-0">ⓘ</span>
                <p>{showcase.page3Callout}</p>
              </div>

              {/* 2. Projects Timeline (Gantt View matching image_49ed9109.png) */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-bold text-[#0F172A]">
                    Projects Timeline
                  </p>
                  <span className="text-[9.5px] text-[#64748B] px-2 py-0.5 rounded border border-[#E2E8F0] bg-[#F8FAFC]">
                    📅 Open in Calendar · Month
                  </span>
                </div>

                <div className="rounded-[10px] border border-[#E2E8F0] bg-[#FFFFFF] p-3 space-y-2 overflow-hidden">
                  <div className="flex items-center justify-between text-[9px] font-semibold text-[#64748B] border-b border-[#F1F5F9] pb-1.5">
                    <span>‹ June 2026</span>
                    <span>July</span>
                    <span className="font-mono text-[8px] tracking-widest hidden sm:inline">
                      12 14 16 18 20 22 24 26 28 30
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {showcase.page3Timeline.map((bar) => (
                      <div key={bar.title} className="relative h-6 flex items-center">
                        <div
                          style={{
                            marginLeft: `${bar.offsetPct}%`,
                            width: `${bar.widthPct}%`,
                          }}
                          className="px-2 py-1 rounded-[6px] border border-[#E2E8F0] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] flex items-center gap-1.5 truncate"
                        >
                          <span className="text-[8.5px] font-semibold text-[#0F172A] truncate">
                            📁 {bar.title}
                          </span>
                          <span
                            className={`px-1 py-0.2 rounded text-[7.5px] font-medium shrink-0 ${
                              bar.status === 'Completed'
                                ? 'bg-[#ECFDF5] text-[#059669]'
                                : 'bg-[#EFF6FF] text-[#1D6EE3]'
                            }`}
                          >
                            ● {bar.status}
                          </span>
                          <span className="text-[7.5px] text-[#64748B] shrink-0">
                            {bar.progress}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Tasks Manager Overview (Weekly Calendar Columns) */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-bold text-[#0F172A]">
                    Tasks Manager Overview
                  </p>
                  <span className="text-[9px] text-[#64748B]">July 2026</span>
                </div>

                <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-1 text-[9.5px] text-[#64748B]">
                  <span>Inbox</span>
                  <span>Today&apos;s Tasks</span>
                  <span className="text-[#0F172A] font-semibold border-b-2 border-[#0F172A] pb-1 -mb-1">
                    📅 Weekly Tasks
                  </span>
                  <span>☑ Completed</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 pt-1">
                  {showcase.page3WeeklyTasks.map((col) => (
                    <div
                      key={col.day}
                      className="rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC]/60 p-1.5 min-h-[78px] space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-[8.5px] text-[#64748B]">
                        <span>{col.day}</span>
                        <span
                          className={
                            col.isToday
                              ? 'w-4 h-4 rounded-full bg-[#EF4444] text-white font-bold inline-flex items-center justify-center text-[8px]'
                              : 'font-semibold text-[#334155]'
                          }
                        >
                          {col.dateNum}
                        </span>
                      </div>

                      {col.taskTitle && (
                        <div className="rounded-[6px] bg-white border border-[#E2E8F0] p-1.5 space-y-1 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
                          <p className="text-[8px] font-semibold text-[#0F172A] leading-tight line-clamp-3">
                            ✔ {col.taskTitle}
                          </p>
                          {col.priority && (
                            <span className="inline-block px-1 py-0.2 rounded bg-[#FEF2F2] text-[#DC2626] text-[7px] font-medium">
                              {col.priority}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* =====================================================================
          4. WHAT'S INCLUDED & INSTANT DUPLICATION SUMMARY CARD
          ===================================================================== */}
      <section className="py-12 sm:py-16 max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1D6EE3] text-[12px] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Included in {template.name} ({template.version})</span>
            </span>
            <h3 className="font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.025em] text-[#0F172A]">
              Ready to duplicate into your Notion workspace in 60 seconds.
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {template.whatsInside.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2.5 text-[14px] text-[#334155] leading-[1.5]"
                >
                  <Check className="w-4 h-4 text-[#1D6EE3] shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 rounded-[18px] bg-white border border-[#E2E8F0] p-6 space-y-5 shadow-[0_8px_24px_-10px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#64748B]">
                  {template.category}
                </p>
                <p className="text-[20px] font-bold text-[#0F172A]">
                  {template.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[24px] font-bold text-[#0F172A] tabular-nums">
                  {formatPrice(template.price)}
                </p>
                <p className="text-[12px] text-[#64748B]">Lifetime updates</p>
              </div>
            </div>

            <div className="h-32 rounded-[12px] bg-[#F8FAFC] border border-[#EDF2F7] p-3 flex items-center justify-center">
              <BlushAssetImage
                src={template.illustrationUrl}
                alt={`${template.name} Notion workspace illustration`}
                disableFloat
                className="w-full h-full"
              />
            </div>

            <button
              type="button"
              onClick={handleOpenBuy}
              className="w-full h-12 px-6 rounded-full bg-[#1D6EE3] hover:bg-[#155BC2] text-white text-[15px] font-semibold inline-flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(29,110,227,0.45)] cursor-pointer transition-colors"
            >
              <span>
                {isOwned
                  ? `Open ${template.name} Delivery`
                  : `Get ${template.name} (${formatPrice(template.price)})`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. RELATED TEMPLATES IN THE SAME CATEGORY
          ===================================================================== */}
      {related.length > 0 && (
        <section className="pt-8 max-w-[1240px] mx-auto px-4 sm:px-6 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-8 pt-8">
            <div>
              <h2 className="text-[24px] font-bold tracking-[-0.02em] text-[#0F172A]">
                More in {template.category}
              </h2>
              <p className="text-[14.5px] text-[#64748B]">
                Explore other minimalist Notion systems in this category.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onNavigate(
                  `/templates?category=${encodeURIComponent(template.category)}`
                )
              }
              className="text-[14px] font-semibold text-[#1D6EE3] hover:text-[#155BC2] inline-flex items-center gap-1.5 hover:underline cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item) => (
              <TemplateCard
                key={item.slug}
                template={item}
                onNavigate={onNavigate}
                isPurchased={purchasedSlugs.has(item.slug)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
