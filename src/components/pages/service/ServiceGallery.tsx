import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Container, Eyebrow, Lightbox, Reveal, Section } from "@/components/site";
import { img } from "@/content/images";
import type { ImageKey } from "@/content/image-keys";
import { cn } from "@/lib/utils";
import { RawLink } from "./links";

type Props = {
  gallery: ImageKey[];
  label: string;
  link: { label: string; to: string };
  title: string;
};

/** Reference masonry: one large tile spanning two rows, then a 1 + 2 column pair per row. */
const TILE = [
  "col-span-2 lg:col-span-3 lg:row-span-2",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-2",
] as const;

export function ServiceGallery({ gallery, label, link, title }: Props) {
  const tiles = gallery.slice(0, TILE.length);
  const [open, setOpen] = useState<number | null>(null);
  const current = open !== null ? tiles[open] : undefined;

  return (
    <Section className="py-14 lg:py-20">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-4">
          <Eyebrow>{label}</Eyebrow>
          <RawLink
            href={link.to}
            className="group inline-flex items-center gap-2 text-[14px] font-semibold text-teal transition-colors hover:text-copper"
          >
            {link.label}
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
              strokeWidth={1.75}
              aria-hidden
            />
          </RawLink>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-6 lg:grid-rows-2 lg:gap-4">
          {tiles.map((key, i) => (
            <Reveal
              key={key}
              delay={i * 70}
              className={cn(TILE[i], i === 0 ? "aspect-[4/3]" : "aspect-[4/3] lg:aspect-auto")}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open ${title} photo ${i + 1} of ${tiles.length}`}
                className="group block h-full w-full overflow-hidden rounded-2xl shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
              >
                <img
                  src={img(key)}
                  alt={`${title} photo ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <Lightbox
        open={current !== undefined}
        onOpenChange={(o) => {
          if (!o) setOpen(null);
        }}
        src={img(current ?? tiles[0] ?? gallery[0] ?? "kitchen-teal-hero")}
        alt={`${title} photo ${(open ?? 0) + 1}`}
        caption={`${label} · ${String((open ?? 0) + 1).padStart(2, "0")} / ${String(tiles.length).padStart(2, "0")}`}
      />
    </Section>
  );
}
