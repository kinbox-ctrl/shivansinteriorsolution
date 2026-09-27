import { CalendarCheck } from "lucide-react";
import { CtaBand, Section, WhatsAppIcon } from "@/components/site";
import { HOW_WE_BUILD_PAGE } from "@/content/process";
import { WHATSAPP_DEFAULT } from "@/content/site";
import { BuildHero } from "./BuildHero";
import { GradeTable } from "./GradeTable";
import { HandoverChecklist } from "./HandoverChecklist";
import { MaterialLibrary } from "./MaterialLibrary";
import { HOW_WE_BUILD_CSS } from "./page-styles";
import { ProcessSteps } from "./ProcessSteps";
import { WarrantySection } from "./WarrantySection";

export function HowWeBuildPage() {
  const cta = HOW_WE_BUILD_PAGE.cta;
  return (
    <>
      <style href="how-we-build-page" precedence="default">
        {HOW_WE_BUILD_CSS}
      </style>
      <BuildHero />
      <ProcessSteps />
      <MaterialLibrary />
      <GradeTable />
      <WarrantySection />
      <HandoverChecklist />
      <Section tone="cloud" className="pb-20 lg:pb-24">
        <CtaBand
          align="split"
          className="xl:[&_h2]:whitespace-nowrap"
          eyebrow={cta.eyebrow}
          title={
            <>
              {cta.titleLead}
              <br />
              <em>{cta.titleEm}</em>
            </>
          }
          primary={{
            label: cta.primary,
            to: "/contact",
            icon: <CalendarCheck strokeWidth={1.5} />,
          }}
          secondary={{
            label: cta.secondary,
            href: WHATSAPP_DEFAULT,
            icon: <WhatsAppIcon />,
            arrow: false,
          }}
        />
      </Section>
    </>
  );
}
