import React from 'react';
import { STUDENT_OS_SPEC } from '../data/studentOsSpec';
import { StudentOsWorkspaceTabs } from './StudentOsWorkspaceTabs';
import {
  TemplateWhatsInsideList,
  WhatsInsideFilter,
} from './TemplateWhatsInsideList';

interface StudentOsShowcaseProps {
  activeFilter?: WhatsInsideFilter;
  onFilterChange?: (nextFilter: WhatsInsideFilter) => void;
}

export const StudentOsShowcase: React.FC<StudentOsShowcaseProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div data-testid="student-os-details-showcase" className="space-y-10">
      {/* Header Row Matching Freelancer OS */}
      <div className="space-y-3">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#1D6EE3]">
          Inside Student OS · Interactive Workspace
        </p>
        <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.03em] leading-[1.12] text-[#0F172A] text-balance">
          1 Command Hub, 10 Modules, 12 Interconnected Databases
        </h2>
        <p className="text-[15.5px] sm:text-[16.5px] text-[#52504A] leading-[1.6] max-w-[700px]">
          Student OS includes a main command-center hub, 10 academic and life modules, 12 interconnected databases, and 8 ready-to-use templates. Explore every section live below.
        </p>
      </div>

      {/* Interactive Notion Workspace Explorer */}
      <StudentOsWorkspaceTabs />

      {/* Simplified, Text-Focused What's Inside Feature Breakdown */}
      <TemplateWhatsInsideList
        spec={STUDENT_OS_SPEC}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
      />
    </div>
  );
};
