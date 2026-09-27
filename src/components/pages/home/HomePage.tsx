import { Phone } from "lucide-react";
import { CtaBand, Marquee, Section } from "@/components/site";
import { HOME_CTA, MARQUEE_ITEMS } from "@/content/home";
import { PHONE_TEL, WHATSAPP_DEFAULT } from "@/content/site";
import { HomeBlueprint } from "./HomeBlueprint";
import { HomeEstimate } from "./HomeEstimate";
import { HomeHero } from "./HomeHero";
import { HomeManifesto } from "./HomeManifesto";
import { HomeProcess } from "./HomeProcess";
import { HomeProjects } from "./HomeProjects";
import { HomeServices } from "./HomeServices";
import { HomeTestimonials } from "./HomeTestimonials";

/** Home: hero → marquee → manifesto + stats → services → projects → blueprint → process → estimate → stories → CTA. */
export function HomePage() {
  return (
    <>
      <HomeHero />
      <Marquee items={MARQUEE_ITEMS} speed={36} />
      <HomeManifesto />
      <HomeServices />
      <HomeProjects />
      <HomeBlueprint />
      <HomeProcess />
      <HomeEstimate />
      <HomeTestimonials />
      <Section tone="cloud" className="pt-12 lg:pt-16">
        <CtaBand
          eyebrow={HOME_CTA.eyebrow}
          title={
            <>
              {HOME_CTA.titleLead} <em>{HOME_CTA.titleEm}</em>
            </>
          }
          primary={{
            label: HOME_CTA.primary,
            href: WHATSAPP_DEFAULT,
            variant: "whatsapp",
            arrow: false,
          }}
          secondary={{
            label: HOME_CTA.secondary,
            href: PHONE_TEL,
            icon: <Phone strokeWidth={1.5} aria-hidden />,
            arrow: false,
          }}
        />
      </Section>
    </>
  );
}
