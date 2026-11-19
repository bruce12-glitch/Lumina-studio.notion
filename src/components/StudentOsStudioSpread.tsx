import React from 'react';
import {
  BookOpen,
  Briefcase,
  Check,
  Database,
  GraduationCap,
  HeartPulse,
  Timer,
  Users,
  Wallet,
} from 'lucide-react';

interface StudentOsStudioSpreadProps {
  variant: 'hub-career' | 'toolkit-wellness';
}

export const StudentOsStudioSpread: React.FC<StudentOsStudioSpreadProps> = ({
  variant,
}) => {
  return (
    <div
      style={{ containerType: 'inline-size' }}
      className="relative w-full h-full overflow-hidden select-none bg-[#DDD5C8]"
    >
      {/* Warm Editorial Linen Desk Backdrop & Afternoon Sunlit Diagonal Beams */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 18% 12%, rgba(255,252,246,0.55) 0%, rgba(221,213,200,0) 58%), linear-gradient(128deg, #E3DCD0 0%, #D6CEC0 48%, #DFD8CB 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(118deg, rgba(255,253,248,0.42) 0%, rgba(255,253,248,0.16) 24%, rgba(96,86,72,0.09) 34%, rgba(96,86,72,0.03) 56%, rgba(255,252,245,0.28) 76%, rgba(96,86,72,0.08) 100%)',
        }}
      />

      {variant === 'hub-career' ? (
        /* =====================================================================
           SPREAD 01: STUDENT HUB, CAREER & INTERNSHIPS, CONTACTS & FINANCE
           ===================================================================== */
        <div className="relative w-full h-full">
          {/* SHEET 1 (Left Staggered): Student OS Pro Command Hub */}
          <div className="absolute left-[2.4%] top-[5.5%] bottom-[5.5%] w-[32%] rounded-[1.05cqw] bg-[#FAF9F6] border border-[#DFDCD5] shadow-[0_1.3cqw_3cqw_-0.7cqw_rgba(45,41,34,0.24)] overflow-hidden flex flex-col">
            <div className="h-[11.5%] bg-gradient-to-r from-[#3F5D7D] via-[#4D6E90] to-[#5F80A2] relative px-[1.8cqw] flex items-end">
              <div className="translate-y-[38%] w-[3.4cqw] h-[3.4cqw] rounded-[0.65cqw] bg-[#314A65] border-[0.2cqw] border-[#FAF9F6] shadow-sm flex items-center justify-center text-white">
                <GraduationCap className="w-[1.9cqw] h-[1.9cqw]" />
              </div>
            </div>

            <div className="pt-[2.2cqw] px-[1.8cqw] pb-[1.5cqw] space-y-[1.15cqw] flex-1 overflow-hidden">
              <div>
                <h4 className="font-display text-[2.05cqw] font-bold tracking-[-0.025em] text-[#2F2D28] leading-tight">
                  Student OS Pro
                </h4>
                <p className="text-[0.88cqw] text-[#6E6D68] mt-[0.25cqw]">
                  Academics · Career · Wellness · Finance
                </p>
              </div>

              {/* Status Pills */}
              <div className="flex flex-wrap gap-[0.45cqw]">
                <span className="px-[0.65cqw] py-[0.25cqw] rounded-[0.4cqw] bg-[#E8F1FA] text-[#1E5FA3] text-[0.82cqw] font-semibold">
                  Applied: 5/8
                </span>
                <span className="px-[0.65cqw] py-[0.25cqw] rounded-[0.4cqw] bg-[#E7F5EC] text-[#17693A] text-[0.82cqw] font-semibold">
                  Sleep: 7.3h
                </span>
                <span className="px-[0.65cqw] py-[0.25cqw] rounded-[0.4cqw] bg-[#FEF3C7] text-[#92400E] text-[0.82cqw] font-semibold">
                  Budget: $600
                </span>
              </div>

              {/* Callout Box */}
              <div className="rounded-[0.6cqw] bg-[#EFECE5] border border-[#E2DFD7] px-[0.95cqw] py-[0.75cqw] text-[0.85cqw] text-[#37352F] leading-[1.42]">
                <span className="font-semibold">Weekly Cockpit:</span> Track
                coursework, internship stages, and campus spending from one
                clean hub.
              </div>

              {/* Quick Navigation Grid */}
              <div className="rounded-[0.65cqw] bg-white border border-[#E8E6E0] p-[0.95cqw] space-y-[0.65cqw]">
                <p className="text-[0.76cqw] font-bold uppercase tracking-[0.06em] text-[#6E6D68]">
                  Quick Navigation
                </p>
                <div className="grid grid-cols-2 gap-x-[0.6cqw] gap-y-[0.5cqw] text-[0.86cqw] text-[#37352F] font-medium">
                  <div className="flex items-center gap-[0.4cqw] truncate">
                    <BookOpen className="w-[1cqw] h-[1cqw] text-[#2383E2] shrink-0" />
                    <span className="truncate">Academics</span>
                  </div>
                  <div className="flex items-center gap-[0.4cqw] truncate">
                    <Briefcase className="w-[1cqw] h-[1cqw] text-[#7C3AED] shrink-0" />
                    <span className="truncate">Internships</span>
                  </div>
                  <div className="flex items-center gap-[0.4cqw] truncate">
                    <Users className="w-[1cqw] h-[1cqw] text-[#52504A] shrink-0" />
                    <span className="truncate">Faculty</span>
                  </div>
                  <div className="flex items-center gap-[0.4cqw] truncate">
                    <Database className="w-[1cqw] h-[1cqw] text-[#15803D] shrink-0" />
                    <span className="truncate">12 Linked DBs</span>
                  </div>
                </div>
              </div>

              {/* Weekly Focus Checklist */}
              <div className="space-y-[0.45cqw] text-[0.86cqw] text-[#52504A]">
                <div className="flex items-center gap-[0.5cqw]">
                  <span className="w-[1cqw] h-[1cqw] rounded-[0.22cqw] bg-[#2383E2] text-white inline-flex items-center justify-center shrink-0">
                    <Check className="w-[0.65cqw] h-[0.65cqw]" />
                  </span>
                  <span className="line-through text-[#9B9A97] truncate">
                    Submit CS-204 graph lab report
                  </span>
                </div>
                <div className="flex items-center gap-[0.5cqw]">
                  <span className="w-[1cqw] h-[1cqw] rounded-[0.22cqw] border border-[#C6C3BC] shrink-0" />
                  <span className="truncate">
                    Prep Orbit Labs technical screen
                  </span>
                </div>
                <div className="flex items-center gap-[0.5cqw]">
                  <span className="w-[1cqw] h-[1cqw] rounded-[0.22cqw] border border-[#C6C3BC] shrink-0" />
                  <span className="truncate">Review Linear Algebra Ch. 5</span>
                </div>
              </div>
            </div>
          </div>

          {/* SHEET 2 (Center Elevated, Unobstructed!): Career Kanban & Faculty Directory */}
          <div className="absolute left-[33.4%] top-[8.5%] bottom-[4.2%] w-[36%] z-10 rounded-[1.05cqw] bg-white border border-[#DEDBD3] shadow-[0_1.5cqw_3.4cqw_-0.7cqw_rgba(45,41,34,0.28)] p-[1.7cqw] flex flex-col gap-[1.05cqw] overflow-hidden">
            <div className="flex items-center justify-between gap-2 border-b border-[#F1F1EF] pb-[0.7cqw]">
              <div className="min-w-0">
                <p className="text-[0.76cqw] font-bold uppercase tracking-[0.06em] text-[#7C3AED]">
                  Applications Pipeline
                </p>
                <h5 className="font-display text-[1.42cqw] font-bold text-[#2F2D28] leading-tight truncate">
                  Career &amp; Internships
                </h5>
              </div>
              <span className="px-[0.6cqw] py-[0.22cqw] rounded-[0.38cqw] bg-[#FAF9F6] border border-[#E9E9E7] text-[0.78cqw] font-semibold text-[#52504A] shrink-0">
                5 Active
              </span>
            </div>

            {/* 3-Column Internship Kanban */}
            <div className="grid grid-cols-3 gap-[0.65cqw]">
              <div className="rounded-[0.6cqw] bg-[#FAF9F6] border border-[#ECE9E2] p-[0.7cqw] space-y-[0.45cqw]">
                <span className="inline-block px-[0.45cqw] py-[0.12cqw] rounded bg-[#EFECE5] text-[#52504A] text-[0.72cqw] font-semibold">
                  Wishlist
                </span>
                <div className="rounded-[0.45cqw] bg-white border border-[#E9E9E7] p-[0.6cqw] space-y-[0.3cqw]">
                  <p className="text-[0.8cqw] font-semibold text-[#37352F] leading-snug">
                    Library Desk Assistant
                  </p>
                  <span className="inline-block px-[0.38cqw] py-[0.1cqw] rounded bg-[#E7F5EC] text-[#17693A] text-[0.68cqw] font-medium">
                    Backup
                  </span>
                </div>
              </div>

              <div className="rounded-[0.6cqw] bg-[#F5F9FE] border border-[#DCEAF9] p-[0.7cqw] space-y-[0.45cqw]">
                <span className="inline-block px-[0.45cqw] py-[0.12cqw] rounded bg-[#E0EEFC] text-[#1D63B8] text-[0.72cqw] font-semibold">
                  Applied
                </span>
                <div className="rounded-[0.45cqw] bg-white border border-[#DCEAF9] p-[0.6cqw] space-y-[0.3cqw]">
                  <p className="text-[0.8cqw] font-semibold text-[#37352F] leading-snug">
                    UROP Biophysics Lab
                  </p>
                  <span className="inline-block px-[0.38cqw] py-[0.1cqw] rounded bg-[#FEF3C7] text-[#92400E] text-[0.68cqw] font-medium">
                    Strong
                  </span>
                </div>
              </div>

              <div className="rounded-[0.6cqw] bg-[#FDF7F4] border border-[#F6DFD5] p-[0.7cqw] space-y-[0.45cqw]">
                <span className="inline-block px-[0.45cqw] py-[0.12cqw] rounded bg-[#FDECE8] text-[#B4432C] text-[0.72cqw] font-semibold">
                  Interviewing
                </span>
                <div className="rounded-[0.45cqw] bg-white border border-[#F6DFD5] p-[0.6cqw] space-y-[0.3cqw]">
                  <p className="text-[0.8cqw] font-semibold text-[#37352F] leading-snug">
                    SWE Intern · Orbit Labs
                  </p>
                  <span className="inline-block px-[0.38cqw] py-[0.1cqw] rounded bg-[#FDECE8] text-[#B4432C] text-[0.68cqw] font-medium">
                    Dream
                  </span>
                </div>
              </div>
            </div>

            {/* Contacts & Faculty Directory */}
            <div className="space-y-[0.55cqw] flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[1.02cqw] font-bold text-[#2F2D28]">
                  Contacts &amp; Faculty
                </p>
                <span className="text-[0.76cqw] text-[#6E6D68]">
                  Office hours &amp; mentors
                </span>
              </div>
              <div className="rounded-[0.65cqw] border border-[#E9E9E7] overflow-hidden">
                <div className="bg-[#F7F6F3] px-[0.8cqw] py-[0.46cqw] grid grid-cols-12 text-[0.74cqw] font-semibold text-[#52504A] border-b border-[#E9E9E7]">
                  <span className="col-span-5">Name</span>
                  <span className="col-span-4">Role</span>
                  <span className="col-span-3 text-right">Dept</span>
                </div>
                <div className="divide-y divide-[#F1F1EF] text-[0.8cqw]">
                  <div className="px-[0.8cqw] py-[0.5cqw] grid grid-cols-12 items-center text-[#37352F]">
                    <span className="col-span-5 font-medium truncate pr-1">
                      Dr. Anika Rao
                    </span>
                    <div className="col-span-4">
                      <span className="px-[0.42cqw] py-[0.1cqw] rounded bg-[#F1EDF9] text-[#6645A8] text-[0.7cqw] font-medium">
                        Professor
                      </span>
                    </div>
                    <span className="col-span-3 text-right text-[#6E6D68]">
                      CS
                    </span>
                  </div>
                  <div className="px-[0.8cqw] py-[0.5cqw] grid grid-cols-12 items-center text-[#37352F]">
                    <span className="col-span-5 font-medium truncate pr-1">
                      Prof. Marcus Lee
                    </span>
                    <div className="col-span-4">
                      <span className="px-[0.42cqw] py-[0.1cqw] rounded bg-[#F1EDF9] text-[#6645A8] text-[0.7cqw] font-medium">
                        Professor
                      </span>
                    </div>
                    <span className="col-span-3 text-right text-[#6E6D68]">
                      Math
                    </span>
                  </div>
                  <div className="px-[0.8cqw] py-[0.5cqw] grid grid-cols-12 items-center text-[#37352F]">
                    <span className="col-span-5 font-medium truncate pr-1">
                      Priya Nair
                    </span>
                    <div className="col-span-4">
                      <span className="px-[0.42cqw] py-[0.1cqw] rounded bg-[#E7F5EC] text-[#17693A] text-[0.7cqw] font-medium">
                        Recruiter
                      </span>
                    </div>
                    <span className="col-span-3 text-right text-[#6E6D68]">
                      Orbit
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SHEET 3 (Right-Front Elevated, Unobstructed!): Student Finance & Wellness */}
          <div className="absolute right-[2.4%] top-[5.2%] bottom-[6.2%] w-[29.5%] z-20 rounded-[1.05cqw] bg-white border border-[#DAD7CF] shadow-[0_1.7cqw_3.8cqw_-0.8cqw_rgba(45,41,34,0.3)] p-[1.65cqw] flex flex-col justify-between overflow-hidden">
            <div className="space-y-[1.05cqw]">
              <div className="flex items-center justify-between gap-2">
                <h5 className="font-display text-[1.45cqw] font-bold text-[#2F2D28]">
                  Student Finance
                </h5>
                <span className="px-[0.58cqw] py-[0.2cqw] rounded-[0.38cqw] bg-[#E7F5EC] text-[#17693A] text-[0.76cqw] font-semibold shrink-0">
                  $600 Cap
                </span>
              </div>

              {/* Monthly Budget Comparison Bars */}
              <div className="rounded-[0.65cqw] bg-[#FAF9F6] border border-[#ECE9E2] p-[0.95cqw] space-y-[0.7cqw]">
                <p className="text-[0.84cqw] font-semibold text-[#52504A]">
                  Monthly Budgets
                </p>
                <div className="space-y-[0.55cqw]">
                  <div>
                    <div className="flex justify-between text-[0.78cqw] text-[#37352F] mb-[0.22cqw]">
                      <span className="font-medium">Nov · $441 / $600</span>
                      <span className="font-bold text-[#17693A]">On Track</span>
                    </div>
                    <div className="h-[0.68cqw] rounded-full bg-[#E8E6E0] overflow-hidden">
                      <div className="h-full w-[74%] rounded-full bg-[#4B9B6E]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[0.78cqw] text-[#37352F] mb-[0.22cqw]">
                      <span className="font-medium">Oct · $335 / $600</span>
                      <span className="font-bold text-[#2383E2]">
                        Saved 23%
                      </span>
                    </div>
                    <div className="h-[0.68cqw] rounded-full bg-[#E8E6E0] overflow-hidden">
                      <div className="h-full w-[56%] rounded-full bg-[#2383E2]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Health & Wellness Sparkline Card */}
              <div className="rounded-[0.65cqw] bg-[#FAF9F6] border border-[#ECE9E2] p-[0.95cqw] space-y-[0.55cqw]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[0.4cqw] text-[0.88cqw] font-bold text-[#2F2D28]">
                    <HeartPulse className="w-[0.95cqw] h-[0.95cqw] text-[#17693A]" />
                    <span>Health &amp; Wellness</span>
                  </div>
                  <span className="text-[0.76cqw] font-semibold text-[#6645A8]">
                    8.5h sleep
                  </span>
                </div>
                <svg
                  viewBox="0 0 220 56"
                  className="w-full h-[3.6cqw]"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="studentSleepFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,32 L52,42 L106,18 L158,28 L212,10 L212,52 L8,52 Z"
                    fill="url(#studentSleepFill)"
                  />
                  <polyline
                    points="8,32 52,42 106,18 158,28 212,10"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="106" cy="18" r="3" fill="#7C3AED" />
                  <circle cx="212" cy="10" r="3.5" fill="#7C3AED" />
                </svg>
                <div className="flex items-center justify-between text-[0.74cqw] text-[#52504A]">
                  <span>Deep Work · Cal Newport</span>
                  <span className="px-[0.42cqw] py-[0.1cqw] rounded bg-[#E7F5EC] text-[#17693A] font-medium">
                    Completed
                  </span>
                </div>
              </div>
            </div>

            {/* Finance Transactions Strip */}
            <div className="rounded-[0.65cqw] bg-[#F7F6F3] border border-[#E5E3DC] p-[0.9cqw] space-y-[0.45cqw]">
              <div className="flex items-center justify-between text-[0.86cqw] font-bold text-[#2F2D28]">
                <div className="flex items-center gap-[0.4cqw]">
                  <Wallet className="w-[0.95cqw] h-[0.95cqw] text-[#CA8A04]" />
                  <span>Recent Spend</span>
                </div>
                <span className="text-[0.74cqw] font-medium text-[#6E6D68]">
                  Nov 2026
                </span>
              </div>
              <div className="flex items-center justify-between bg-white px-[0.6cqw] py-[0.34cqw] rounded border border-[#EAE8E2] text-[0.78cqw]">
                <span className="text-[#37352F] font-medium truncate">
                  Campus Dining &amp; Cafe
                </span>
                <span className="font-bold text-[#37352F] tabular-nums">
                  $140
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* =====================================================================
           SPREAD 02: STUDY TOOLKIT, SPACED REPETITION & VISUAL INSIGHTS
           ===================================================================== */
        <div className="relative w-full h-full">
          {/* SHEET 1 (Left Staggered): Study Toolkit & Focus Timer */}
          <div className="absolute left-[2.4%] top-[5.5%] bottom-[5.5%] w-[32%] rounded-[1.05cqw] bg-[#FAF9F6] border border-[#DFDCD5] shadow-[0_1.3cqw_3cqw_-0.7cqw_rgba(45,41,34,0.24)] overflow-hidden flex flex-col">
            <div className="h-[11.5%] bg-gradient-to-r from-[#3B6E5C] via-[#477D6A] to-[#568E7A] relative px-[1.8cqw] flex items-end">
              <div className="translate-y-[38%] w-[3.4cqw] h-[3.4cqw] rounded-[0.65cqw] bg-[#2D5648] border-[0.2cqw] border-[#FAF9F6] shadow-sm flex items-center justify-center text-white">
                <Timer className="w-[1.85cqw] h-[1.85cqw]" />
              </div>
            </div>

            <div className="pt-[2.2cqw] px-[1.8cqw] pb-[1.5cqw] space-y-[1.05cqw] flex-1 overflow-hidden">
              <div>
                <h4 className="font-display text-[2.0cqw] font-bold tracking-[-0.025em] text-[#2F2D28] leading-tight">
                  Study Toolkit
                </h4>
                <p className="text-[0.88cqw] text-[#6E6D68] mt-[0.2cqw]">
                  Focus timer, recall cards &amp; exam checklist
                </p>
              </div>

              {/* Clean Crisp Pomodoro Timer Block */}
              <div className="rounded-[0.7cqw] bg-[#8E3B3B] text-white p-[1cqw] space-y-[0.55cqw] shadow-sm">
                <div className="flex items-center justify-between text-[0.76cqw] opacity-90">
                  <span className="font-semibold uppercase tracking-[0.06em]">
                    Pomodoro Focus
                  </span>
                  <span>25m / 5m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[2.3cqw] font-bold tabular-nums leading-none">
                    25:00
                  </span>
                  <span className="px-[0.75cqw] py-[0.28cqw] rounded-[0.4cqw] bg-white text-[#8E3B3B] text-[0.78cqw] font-bold">
                    Log Session
                  </span>
                </div>
              </div>

              {/* 2x2 Study Techniques */}
              <div className="grid grid-cols-2 gap-[0.6cqw] text-[0.8cqw]">
                <div className="rounded-[0.55cqw] bg-[#FDECE8] border border-[#F5D6CE] p-[0.65cqw]">
                  <p className="font-bold text-[#8E3B3B]">Active Recall</p>
                  <p className="text-[#52504A] text-[0.72cqw] mt-[0.15cqw]">
                    Close notes, test self
                  </p>
                </div>
                <div className="rounded-[0.55cqw] bg-[#FEF3C7] border border-[#F6E2A4] p-[0.65cqw]">
                  <p className="font-bold text-[#92400E]">Spaced Review</p>
                  <p className="text-[#52504A] text-[0.72cqw] mt-[0.15cqw]">
                    1 · 3 · 7 · 21 days
                  </p>
                </div>
              </div>

              {/* Exam Week Checklist */}
              <div className="space-y-[0.42cqw] text-[0.82cqw] text-[#52504A]">
                <p className="text-[0.74cqw] font-bold uppercase tracking-[0.06em] text-[#6E6D68]">
                  Exam Week Checklist
                </p>
                <div className="flex items-center gap-[0.45cqw]">
                  <span className="w-[0.95cqw] h-[0.95cqw] rounded-[0.22cqw] bg-[#2383E2] text-white inline-flex items-center justify-center shrink-0">
                    <Check className="w-[0.62cqw] h-[0.62cqw]" />
                  </span>
                  <span className="truncate">Confirm exam room &amp; rules</span>
                </div>
                <div className="flex items-center gap-[0.45cqw]">
                  <span className="w-[0.95cqw] h-[0.95cqw] rounded-[0.22cqw] bg-[#2383E2] text-white inline-flex items-center justify-center shrink-0">
                    <Check className="w-[0.62cqw] h-[0.62cqw]" />
                  </span>
                  <span className="truncate">Complete 2 practice papers</span>
                </div>
              </div>
            </div>
          </div>

          {/* SHEET 2 (Center Elevated, Unobstructed!): Focus Analytics & Spaced Repetition */}
          <div className="absolute left-[33.4%] top-[8.5%] bottom-[4.2%] w-[36%] z-10 rounded-[1.05cqw] bg-white border border-[#DEDBD3] shadow-[0_1.5cqw_3.4cqw_-0.7cqw_rgba(45,41,34,0.28)] p-[1.7cqw] flex flex-col gap-[1.05cqw] overflow-hidden">
            <div className="flex items-center justify-between gap-2 border-b border-[#F1F1EF] pb-[0.7cqw]">
              <div className="min-w-0">
                <p className="text-[0.76cqw] font-bold uppercase tracking-[0.06em] text-[#2383E2]">
                  Study Analytics &amp; Courses
                </p>
                <h5 className="font-display text-[1.42cqw] font-bold text-[#2F2D28] leading-tight truncate">
                  Focus &amp; Spaced Repetition
                </h5>
              </div>
              <span className="px-[0.6cqw] py-[0.22cqw] rounded-[0.38cqw] bg-[#EBF3FC] text-[#1D63B8] text-[0.78cqw] font-semibold shrink-0">
                215 min
              </span>
            </div>

            {/* Course Study Minutes Bars */}
            <div className="rounded-[0.65cqw] bg-[#FAF9F6] border border-[#ECE9E2] p-[0.95cqw] space-y-[0.6cqw]">
              <p className="text-[0.84cqw] font-semibold text-[#52504A]">
                Focus Sessions by Course
              </p>
              <div className="space-y-[0.45cqw] text-[0.78cqw]">
                <div>
                  <div className="flex justify-between text-[#37352F] mb-[0.18cqw]">
                    <span className="font-medium">
                      Data Structures &amp; Algorithms
                    </span>
                    <span className="font-bold tabular-nums">90m</span>
                  </div>
                  <div className="h-[0.58cqw] rounded-full bg-[#E8E6E0] overflow-hidden">
                    <div className="h-full w-[88%] rounded-full bg-[#2383E2]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#37352F] mb-[0.18cqw]">
                    <span className="font-medium">Linear Algebra</span>
                    <span className="font-bold tabular-nums">75m</span>
                  </div>
                  <div className="h-[0.58cqw] rounded-full bg-[#E8E6E0] overflow-hidden">
                    <div className="h-full w-[72%] rounded-full bg-[#2383E2]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#37352F] mb-[0.18cqw]">
                    <span className="font-medium">Calculus II</span>
                    <span className="font-bold tabular-nums">50m</span>
                  </div>
                  <div className="h-[0.58cqw] rounded-full bg-[#E8E6E0] overflow-hidden">
                    <div className="h-full w-[50%] rounded-full bg-[#4B9B6E]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Spaced Repetition Review Queue Table */}
            <div className="rounded-[0.65cqw] border border-[#E9E9E7] overflow-hidden flex-1">
              <div className="bg-[#F7F6F3] px-[0.8cqw] py-[0.46cqw] grid grid-cols-12 text-[0.74cqw] font-semibold text-[#52504A] border-b border-[#E9E9E7]">
                <span className="col-span-6">Lecture Topic</span>
                <span className="col-span-3 text-center">Cycle</span>
                <span className="col-span-3 text-right">Status</span>
              </div>
              <div className="divide-y divide-[#F1F1EF] text-[0.8cqw]">
                <div className="px-[0.8cqw] py-[0.5cqw] grid grid-cols-12 items-center text-[#37352F]">
                  <span className="col-span-6 font-medium truncate pr-1">
                    Binary Trees &amp; Heaps
                  </span>
                  <span className="col-span-3 text-center text-[#6E6D68]">
                    Day 3
                  </span>
                  <div className="col-span-3 flex justify-end">
                    <span className="px-[0.4cqw] py-[0.1cqw] rounded bg-[#FDECE8] text-[#B4432C] text-[0.7cqw] font-medium">
                      Due
                    </span>
                  </div>
                </div>
                <div className="px-[0.8cqw] py-[0.5cqw] grid grid-cols-12 items-center text-[#37352F]">
                  <span className="col-span-6 font-medium truncate pr-1">
                    Eigenvalues Proof
                  </span>
                  <span className="col-span-3 text-center text-[#6E6D68]">
                    Day 7
                  </span>
                  <div className="col-span-3 flex justify-end">
                    <span className="px-[0.4cqw] py-[0.1cqw] rounded bg-[#FEF3C7] text-[#92400E] text-[0.7cqw] font-medium">
                      Tomorrow
                    </span>
                  </div>
                </div>
                <div className="px-[0.8cqw] py-[0.5cqw] grid grid-cols-12 items-center text-[#37352F]">
                  <span className="col-span-6 font-medium truncate pr-1">
                    Dynamic Programming
                  </span>
                  <span className="col-span-3 text-center text-[#6E6D68]">
                    Day 21
                  </span>
                  <div className="col-span-3 flex justify-end">
                    <span className="px-[0.4cqw] py-[0.1cqw] rounded bg-[#E7F5EC] text-[#17693A] text-[0.7cqw] font-medium">
                      Mastered
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SHEET 3 (Right-Front Elevated, Unobstructed!): Visual Insights & 12 DBs */}
          <div className="absolute right-[2.4%] top-[5.2%] bottom-[6.2%] w-[29.5%] z-20 rounded-[1.05cqw] bg-white border border-[#DAD7CF] shadow-[0_1.7cqw_3.8cqw_-0.8cqw_rgba(45,41,34,0.3)] p-[1.65cqw] flex flex-col justify-between overflow-hidden">
            <div className="space-y-[1.05cqw]">
              <div className="flex items-center justify-between gap-2">
                <h5 className="font-display text-[1.45cqw] font-bold text-[#2F2D28]">
                  Visual Insights
                </h5>
                <span className="px-[0.58cqw] py-[0.2cqw] rounded-[0.38cqw] bg-[#EBF3FC] text-[#1D63B8] text-[0.76cqw] font-semibold shrink-0">
                  12 DBs
                </span>
              </div>

              {/* Master Deliverables Donut */}
              <div className="rounded-[0.65cqw] bg-[#FAF9F6] border border-[#ECE9E2] p-[0.95cqw] flex items-center gap-[0.95cqw]">
                <svg
                  viewBox="0 0 80 80"
                  className="w-[4.9cqw] h-[4.9cqw] shrink-0"
                  aria-hidden="true"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke="#E8E6E0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke="#4B9B6E"
                    strokeWidth="10"
                    strokeDasharray="88 176"
                    transform="rotate(-90 40 40)"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke="#2383E2"
                    strokeWidth="10"
                    strokeDasharray="44 176"
                    strokeDashoffset="-88"
                    transform="rotate(-90 40 40)"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke="#D99B26"
                    strokeWidth="10"
                    strokeDasharray="44 176"
                    strokeDashoffset="-132"
                    transform="rotate(-90 40 40)"
                  />
                  <text
                    x="40"
                    y="39"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="700"
                    fill="#37352F"
                  >
                    8
                  </text>
                  <text
                    x="40"
                    y="51"
                    textAnchor="middle"
                    fontSize="7.5"
                    fill="#6E6D68"
                  >
                    Tasks
                  </text>
                </svg>
                <div className="space-y-[0.22cqw] min-w-0">
                  <p className="text-[0.9cqw] font-bold text-[#2F2D28]">
                    Master Deliverables
                  </p>
                  <p className="text-[0.74cqw] text-[#6E6D68] leading-snug">
                    4 done · 2 active · 2 in review across courses
                  </p>
                </div>
              </div>

              {/* Finance Transactions Donut */}
              <div className="rounded-[0.65cqw] bg-[#FAF9F6] border border-[#ECE9E2] p-[0.95cqw] flex items-center gap-[0.95cqw]">
                <svg
                  viewBox="0 0 80 80"
                  className="w-[4.9cqw] h-[4.9cqw] shrink-0"
                  aria-hidden="true"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke="#E8E6E0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke="#D99B26"
                    strokeWidth="10"
                    strokeDasharray="112 176"
                    transform="rotate(-90 40 40)"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="10"
                    strokeDasharray="36 176"
                    strokeDashoffset="-112"
                    transform="rotate(-90 40 40)"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke="#2383E2"
                    strokeWidth="10"
                    strokeDasharray="28 176"
                    strokeDashoffset="-148"
                    transform="rotate(-90 40 40)"
                  />
                  <text
                    x="40"
                    y="40"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill="#37352F"
                  >
                    $776
                  </text>
                  <text
                    x="40"
                    y="52"
                    textAnchor="middle"
                    fontSize="7.2"
                    fill="#6E6D68"
                  >
                    Total
                  </text>
                </svg>
                <div className="space-y-[0.22cqw] min-w-0">
                  <p className="text-[0.9cqw] font-bold text-[#2F2D28]">
                    Finance Breakdown
                  </p>
                  <p className="text-[0.74cqw] text-[#6E6D68] leading-snug">
                    Campus dining, books &amp; transit totals
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[0.6cqw] bg-[#F7F6F3] border border-[#E5E3DC] px-[0.85cqw] py-[0.6cqw] text-[0.78cqw] text-[#52504A] flex items-center justify-between">
              <span className="font-semibold text-[#37352F]">System Vault</span>
              <span className="text-[#17693A] font-medium">8 Templates</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
