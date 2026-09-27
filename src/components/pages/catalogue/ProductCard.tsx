import { Calculator, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/site";
import { CATALOGUE_PAGE, type CatalogueTag, type Product } from "@/content/catalogue";
import { formatINR } from "@/content/pricing";
import { waLink } from "@/content/site";
import { cn } from "@/lib/utils";

const TAG_TONE: Record<CatalogueTag, string> = {
  Recommended: "border-copper/30 bg-copper-tint text-copper",
  Popular: "border-teal/20 bg-mist text-teal",
  Waterproof: "border-teal/20 bg-mist text-teal",
  Budget: "border-line bg-white text-ink-soft",
  Premium: "border-line bg-linen text-ink",
};

export type ProductCardProps = { product: Product; image: string; className?: string };

function priceText(p: Product): string {
  return p.priceTo ? `${formatINR(p.priceFrom)} – ${formatINR(p.priceTo)}` : formatINR(p.priceFrom);
}

/** White product card: photo with tag chips, name, three specs, price line and actions. */
export function ProductCard({ product: p, image, className }: ProductCardProps) {
  const copy = CATALOGUE_PAGE;
  const ask = waLink(
    `Hello Shivansh Interior Solutions, I'd like to know more about ${p.name} (${priceText(p)} ${p.unit}). Could you share options and availability?`,
  );
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-[transform,box-shadow] duration-300 ease-soft hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-linen">
        <img
          src={image}
          alt={p.name}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-soft hover:scale-[1.04]"
        />
        {p.tags.length > 0 && (
          <ul className="absolute top-3 left-3 m-0 flex list-none flex-wrap gap-1.5 p-0">
            {p.tags.map((t) => (
              <li
                key={t}
                className={cn(
                  "rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase shadow-soft",
                  TAG_TONE[t],
                )}
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[22px] leading-tight font-medium tracking-[-0.01em] text-teal">
          {p.name}
        </h3>
        <p className="mt-1.5 text-[14px] leading-snug text-ink-soft">{p.tagline}</p>

        <ul className="m-0 mt-4 grid list-none gap-1.5 p-0">
          {p.specs.map((s) => (
            <li key={s} className="flex items-start gap-2 text-[13px] leading-snug text-ink">
              <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-copper" />
              {s}
            </li>
          ))}
        </ul>

        {(p.brands || p.warranty) && (
          <dl className="m-0 mt-3 grid gap-1 text-[12px] text-ink-soft">
            {p.brands && (
              <div className="flex gap-2">
                <dt className="shrink-0 font-semibold text-ink">Brands</dt>
                <dd className="m-0">{p.brands}</dd>
              </div>
            )}
            {p.warranty && (
              <div className="flex items-center gap-1.5">
                <ShieldCheck
                  className="size-3.5 shrink-0 text-teal"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <dd className="m-0">{p.warranty}</dd>
              </div>
            )}
          </dl>
        )}

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-line pt-4">
            <p className="m-0">
              <span className="font-mono text-[10px] tracking-[0.16em] text-ink-soft uppercase">
                {copy.fromLabel}
              </span>
              <span className="ml-2 font-display text-[22px] leading-none font-medium tracking-[-0.01em] text-ink tabular-nums">
                {priceText(p)}
              </span>
              <span className="ml-1.5 text-[12px] text-ink-soft">{p.unit}</span>
            </p>
            <p className="m-0 flex items-center gap-1 text-[11.5px] text-ink-soft">
              <Clock className="size-3.5" strokeWidth={1.75} aria-hidden />
              {p.leadTime}
            </p>
          </div>
          {p.priceNote && <p className="mt-1 text-[11.5px] text-ink-soft">{p.priceNote}, ex-GST</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="whatsapp" size="sm" href={ask} className="flex-1">
              {copy.askLabel}
            </Button>
            {p.estimatorSpace && (
              <Button
                variant="secondary"
                size="sm"
                to="/estimator"
                icon={<Calculator strokeWidth={1.5} aria-hidden />}
              >
                {copy.estimateLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
