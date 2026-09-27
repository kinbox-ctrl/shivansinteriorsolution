import { MapPin } from "lucide-react";
import { CtaBand, Section } from "@/components/site";
import { MAP_LINK, WHATSAPP_DEFAULT } from "@/content/site";
import { ABOUT_CTA } from "@/content/team";
import { AboutHero } from "./AboutHero";
import { FounderNote } from "./FounderNote";
import { Journey } from "./Journey";
import { Promise } from "./Promise";
import { Team } from "./Team";
import { Values } from "./Values";
import { Workshop } from "./Workshop";

/** About page: founder-led story, journey, workshop, values, team, promises and CTA. */
export function AboutPage() {
  return (
    <>
      <AboutHero />
      <FounderNote />
      <Journey />
      <Workshop />
      <Values />
      <Team />
      <Promise />
      <Section className="py-10 lg:py-14">
        <CtaBand
          align="split"
          eyebrow={ABOUT_CTA.eyebrow}
          title={
            <>
              {ABOUT_CTA.titleLead} <em>{ABOUT_CTA.titleEm}</em>
            </>
          }
          primary={{
            label: ABOUT_CTA.secondary,
            href: MAP_LINK,
            variant: "secondary",
            arrow: false,
            icon: <MapPin strokeWidth={1.5} />,
          }}
          secondary={{
            label: ABOUT_CTA.primary,
            href: WHATSAPP_DEFAULT,
            variant: "whatsapp",
          }}
        />
      </Section>
    </>
  );
}
