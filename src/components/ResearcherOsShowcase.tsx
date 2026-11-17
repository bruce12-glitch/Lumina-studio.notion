import React from "react";
import { RESEARCHER_OS_SPEC } from "../data/researcherOsSpec";
import { ResearcherOsWorkspaceTabs } from "./ResearcherOsWorkspaceTabs";

export const ResearcherOsShowcase: React.FC = () => {
  return (
    <div data-testid="researcher-os-details-showcase" className="space-y-10">
      <div className="space-y-3">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#1D6EE3]">
          Inside {RESEARCHER_OS_SPEC.name} · Interactive Workspace
        </p>
        <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.03em] leading-[1.12] text-[#0F172A] text-balance">
          1 Research Hub, 12 Modules, 14 Interconnected Databases
        </h2>
        <p className="text-[15.5px] sm:text-[16.5px] text-[#52504A] leading-[1.6] max-w-[700px]">
          Researcher OS includes a main research hub, 12 synthesis, lab, and publishing modules, 14 interconnected databases, and 8 ready-to-use academic templates. Explore every section live below.
        </p>
      </div>

      <ResearcherOsWorkspaceTabs />
    </div>
  );
};
