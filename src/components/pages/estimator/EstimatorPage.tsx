import { Check } from "lucide-react";
import { useRef, type ReactNode } from "react";
import {
  Card,
  Container,
  Eyebrow,
  FaqAccordion,
  HandNote,
  Heading,
  Reveal,
  Section,
  Sketch,
  VerticalRuler,
} from "@/components/site";
import { ESTIMATOR_FAQ, FAQ_SECTION } from "@/content/faqs";
import { ESTIMATOR_COPY } from "@/content/pricing";
import { cn } from "@/lib/utils";
import { GradePicker } from "./GradePicker";
import { HomeTypePicker } from "./HomeTypePicker";
import { MobileSheet } from "./MobileSheet";
import { Receipt } from "./Receipt";
import { SpaceRows } from "./SpaceRows";
import { Stepper } from "./Stepper";
import { contentIcon } from "./icons";
import { useEstimator } from "./use-estimator";

/** Print only the receipt card ("Download PDF" = the browser's print-to-PDF). */
const PRINT_CSS = `
@media print {
  body * { visibility: hidden !important; }
  #estimate-receipt, #estimate-receipt * { visibility: visible !important; }
  #estimate-receipt {
    position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important;
    margin: 0 auto !important; max-width: 680px !important; box-shadow: none !important;
    border: 0 !important;
  }
  #estimate-receipt [data-print-hide] { display: none !important; }
}
`;

type StepRowProps = {
  n: number;
  title: string;
  text?: string;
  children: ReactNode;
  first?: boolean;
};

function StepRow({ n, title, text, children, first = false }: StepRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[minmax(0,1fr)] gap-4 py-5 lg:grid-cols-[148px_minmax(0,1fr)] lg:gap-5 lg:py-6 xl:grid-cols-[168px_minmax(0,1fr)]",
        !first && "border-t border-line",
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-copper-tint font-mono text-[13px] text-copper">
          {n}
        </span>
        <div className="pt-1">
          <h2 className="font-display text-[20px] leading-tight font-medium tracking-[-0.01em] text-ink lg:text-[21px]">
            {title}
          </h2>
          {text && <p className="mt-1.5 text-[13px] leading-snug text-ink-soft">{text}</p>}
        </div>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function EstimatorPage() {
  const { config, result, activeStep, dispatch } = useEstimator();
  const receiptRef = useRef<HTMLDivElement>(null);
  const { sections, included, reassurance } = ESTIMATOR_COPY;

  return (
    <>
      <style>{PRINT_CSS}</style>

      {/* 1 + 2 + 3 · intro, configurator and receipt */}
      <Section wash className="overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-24">
        <VerticalRuler />
        <Sketch
          kind="kitchen"
          opacity={0.26}
          className="absolute -top-8 right-[-120px] hidden w-[640px] xl:block"
        />
        <Sketch
          kind="plant-large"
          opacity={0.4}
          className="absolute right-6 bottom-8 hidden w-40 xl:block"
        />
        <Container className="relative">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-6">
            <div className="lg:col-span-7">
              <Eyebrow className="mb-4">{ESTIMATOR_COPY.eyebrow}</Eyebrow>
              <Heading as="h1" size="xl" className="max-w-[640px] lg:text-[60px]">
                {ESTIMATOR_COPY.headlineLead} <em>{ESTIMATOR_COPY.headlineEm}</em>
              </Heading>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-soft lg:text-[17px]">
                {ESTIMATOR_COPY.sub}
              </p>
            </div>
            <div className="flex items-start gap-6 lg:col-span-5 lg:pt-6">
              <Stepper active={activeStep} className="w-full max-w-[380px]" />
              <HandNote
                arrow="down-left"
                rotate={-8}
                className="mt-2 hidden shrink-0 xl:inline-flex"
              >
                Thoughtful spaces.
                <br />
                Clear budgets.
              </HandNote>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 lg:mt-10 lg:grid-cols-12 lg:items-start lg:gap-6">
            <Reveal delay={70} className="min-w-0 lg:col-span-7">
              <div className="rounded-2xl border border-line bg-white px-4 shadow-soft sm:px-5">
                <StepRow n={sections.homeType.n} title={sections.homeType.title} first>
                  <HomeTypePicker
                    value={config.homeType}
                    onChange={(id) => dispatch({ type: "home", id })}
                  />
                </StepRow>
                <StepRow
                  n={sections.spaces.n}
                  title={sections.spaces.title}
                  text={sections.spaces.text}
                >
                  <SpaceRows
                    spaces={config.spaces}
                    onToggle={(id, on) => dispatch({ type: "toggle", id, on })}
                    onArea={(id, area) => dispatch({ type: "area", id, area })}
                  />
                </StepRow>
                <StepRow
                  n={sections.grade.n}
                  title={sections.grade.title}
                  text={sections.grade.text}
                >
                  <GradePicker
                    value={config.grade}
                    onChange={(id) => dispatch({ type: "grade", id })}
                  />
                </StepRow>
              </div>
            </Reveal>
            <Reveal delay={140} className="min-w-0 lg:col-span-5 lg:sticky lg:top-24">
              <Receipt ref={receiptRef} config={config} result={result} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 4 · what's included at Premium */}
      <Section tone="linen" jali className="py-12 lg:py-16">
        <Container>
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-3">
              <Eyebrow className="mb-4">{included.eyebrow}</Eyebrow>
              <Heading as="h2" size="md" className="lg:text-[34px] lg:leading-[1.08]">
                {included.title}
              </Heading>
            </div>
            <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
              {included.items.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-copper text-copper">
                    <Check className="size-4" strokeWidth={2} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[15px] leading-tight font-semibold text-ink">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-ink-soft">
                      {item.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* 5 · why choose Shivansh */}
      <Section className="py-12 lg:py-16">
        <Container>
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-3">
              <Eyebrow className="mb-4">{reassurance.eyebrow}</Eyebrow>
              <Heading as="h2" size="md" className="lg:text-[34px] lg:leading-[1.08]">
                {reassurance.title}
              </Heading>
            </div>
            <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
              {reassurance.items.map((item) => {
                const Icon = contentIcon(item.icon);
                return (
                  <Card
                    as="li"
                    key={item.title}
                    hover
                    className="flex items-start gap-3 p-5 lg:p-5"
                  >
                    <Icon
                      className="mt-0.5 size-7 shrink-0 text-teal"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span>
                      <span className="block text-[15px] leading-tight font-semibold text-ink">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-[13px] leading-snug text-ink-soft">
                        {item.text}
                      </span>
                    </span>
                  </Card>
                );
              })}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* 6 · FAQ */}
      <Section tone="white" className="py-12 pb-24 lg:py-20">
        <Container>
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <Eyebrow className="mb-4">{FAQ_SECTION.eyebrow}</Eyebrow>
              <Heading as="h2" size="lg" className="max-w-[320px] lg:text-[40px]">
                {FAQ_SECTION.title}
              </Heading>
            </div>
            <FaqAccordion items={ESTIMATOR_FAQ} defaultOpen={null} className="lg:col-span-8" />
          </Reveal>
        </Container>
      </Section>

      <MobileSheet config={config} result={result} receiptRef={receiptRef} />
    </>
  );
}
