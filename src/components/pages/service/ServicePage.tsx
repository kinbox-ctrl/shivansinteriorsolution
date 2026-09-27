import { getRouteApi } from "@tanstack/react-router";
import { Fragment, useRef } from "react";
import { getService } from "@/content/services";
import { FinishExplorer, FixChips } from "./FinishExplorer";
import { HomeStory } from "./HomeStory";
import { InsideHotspots } from "./InsideHotspots";
import { MaterialsStrip } from "./MaterialsStrip";
import { PriceByGrade } from "./PriceByGrade";
import { RelatedServices } from "./RelatedServices";
import { ServiceFaq } from "./ServiceFaq";
import { ServiceGallery } from "./ServiceGallery";
import { ServiceHero } from "./ServiceHero";
import { ServiceOptions } from "./ServiceOptions";
import { StickyEstimateBar } from "./StickyEstimateBar";

const route = getRouteApi("/services/$slug");

/** Service detail page: every section is driven by the `Service` record so all six variants render. */
export function ServicePage() {
  const { slug } = route.useLoaderData();
  const service = getService(slug);
  const heroRef = useRef<HTMLDivElement>(null);
  if (!service) return null;

  return (
    <Fragment key={service.slug}>
      <div ref={heroRef}>
        <ServiceHero service={service} />
      </div>
      <ServiceOptions options={service.options} galleryTo={service.galleryLink.to} />
      {service.finishes && <FinishExplorer finishes={service.finishes} />}
      {service.fixChips && <FixChips service={service} />}
      <MaterialsStrip materials={service.materials} />
      <InsideHotspots inside={service.inside} hotspots={service.hotspots} />
      <PriceByGrade rows={service.gradeRows} />
      <ServiceGallery
        gallery={service.gallery}
        label={service.galleryLabel}
        link={service.galleryLink}
        title={service.title}
      />
      <HomeStory service={service} />
      <ServiceFaq faqs={service.faqs} />
      <RelatedServices slugs={service.related} />
      <StickyEstimateBar service={service} heroRef={heroRef} />
    </Fragment>
  );
}
