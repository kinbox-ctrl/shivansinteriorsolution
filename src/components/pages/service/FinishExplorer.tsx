import { Check, ImagePlus } from "lucide-react";
import { useId, useState, type DragEvent } from "react";
import { Button, Chip, Container, Eyebrow, Reveal, Section } from "@/components/site";
import { img } from "@/content/images";
import type { ImageKey } from "@/content/image-keys";
import type { FinishSwatch, Service, ServiceFinishes } from "@/content/services";
import { waLink } from "@/content/site";
import { cn } from "@/lib/utils";

type Hsl = { h: number; s: number; l: number };

function hexToHsl(hex: string): Hsl {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m || !m[1]) return { h: 0, s: 0, l: 0.5 };
  const n = parseInt(m[1], 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l };
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return { h, s, l };
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** CSS filter that nudges the base photo towards the chosen swatch's hue, saturation and tone. */
function filterFor(base: FinishSwatch, sel: FinishSwatch): string | undefined {
  if (base.id === sel.id) return undefined;
  const a = hexToHsl(base.hex);
  const b = hexToHsl(sel.hex);
  const hue = Math.round(b.h - a.h);
  const sat = a.s > 0.08 ? clamp(b.s / a.s, 0.35, 1.5) : 1;
  const bright = clamp(1 + (b.l - a.l) * 0.7, 0.75, 1.3);
  return `hue-rotate(${hue}deg) saturate(${sat.toFixed(2)}) brightness(${bright.toFixed(2)})`;
}

const lower = (s: string | undefined) => (s ? s.toLowerCase() : "");

function captionFor(finishes: ServiceFinishes, sel: number[], touched: boolean): string {
  if (!touched) return finishes.previewLabel;
  const picks = finishes.groups
    .map((g, i) => g.swatches[sel[i] ?? 0])
    .filter((s): s is FinishSwatch => Boolean(s));
  const [a, b] = picks;
  if (!a) return finishes.previewLabel;
  if (!b) return a.sub ? `${a.label}: ${a.sub}` : a.label;
  return `${a.label} ${lower(a.sub)} with ${lower(b.label)} ${lower(b.sub)}`.replace(/\s+/g, " ");
}

export function FinishExplorer({ finishes }: { finishes: ServiceFinishes }) {
  const [group, setGroup] = useState(0);
  const [sel, setSel] = useState<number[]>(() => finishes.groups.map(() => 0));
  const [touched, setTouched] = useState(false);
  const base = useId();

  const activeGroup = finishes.groups[group] ?? finishes.groups[0];
  if (!activeGroup) return null;

  const firstGroup = finishes.groups[0];
  const baseSwatch = firstGroup?.swatches[0];
  const firstSel = firstGroup?.swatches[sel[0] ?? 0];

  // The photo to show: the first group (in order) whose pick has its own render, else the base
  // preview hue-shifted towards the first group's pick.
  let shown: ImageKey = finishes.previewImage;
  let filter: string | undefined;
  const withImage = finishes.groups
    .map((g, i) => g.swatches[sel[i] ?? 0]?.image)
    .find((k): k is ImageKey => Boolean(k));
  if (withImage) shown = withImage;
  else if (baseSwatch && firstSel) filter = filterFor(baseSwatch, firstSel);

  const layers: ImageKey[] = [finishes.previewImage];
  for (const g of finishes.groups) {
    for (const s of g.swatches) if (s.image && !layers.includes(s.image)) layers.push(s.image);
  }

  const caption = captionFor(finishes, sel, touched);

  return (
    <Section className="py-12 lg:py-16">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-10">
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Eyebrow>Finish explorer</Eyebrow>
              <p className="text-[13px] text-ink-soft">{finishes.caption}</p>
            </div>

            {finishes.groups.length > 1 && (
              <div role="tablist" aria-label="Finish groups" className="mt-5 flex flex-wrap gap-2">
                {finishes.groups.map((g, i) => (
                  <button
                    key={g.id}
                    type="button"
                    role="tab"
                    id={`${base}-tab-${g.id}`}
                    aria-selected={i === group}
                    aria-controls={`${base}-panel`}
                    tabIndex={i === group ? 0 : -1}
                    onClick={() => setGroup(i)}
                    onKeyDown={(e) => {
                      const n = finishes.groups.length;
                      if (e.key === "ArrowRight") setGroup((group + 1) % n);
                      else if (e.key === "ArrowLeft") setGroup((group - 1 + n) % n);
                      else return;
                      e.preventDefault();
                    }}
                    className={cn(
                      "rounded-lg border px-4 py-2 text-[13px] font-semibold transition-colors duration-300",
                      i === group
                        ? "border-teal bg-teal text-white"
                        : "border-line bg-white text-teal hover:border-line-strong",
                    )}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            )}

            <div
              key={activeGroup.id}
              id={`${base}-panel`}
              role="radiogroup"
              aria-label={activeGroup.label}
              className="mt-5 grid grid-cols-3 gap-3 animate-in fade-in-0 duration-500 sm:grid-cols-5"
            >
              {activeGroup.swatches.map((s, i) => {
                const checked = (sel[group] ?? 0) === i;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={checked}
                    onClick={() => {
                      setSel((prev) => prev.map((v, gi) => (gi === group ? i : v)));
                      setTouched(true);
                    }}
                    className={cn(
                      "rounded-xl border bg-white p-2 text-left transition-[border-color,box-shadow,transform] duration-300 ease-soft hover:-translate-y-0.5 hover:shadow-soft",
                      checked ? "border-copper shadow-soft ring-1 ring-copper" : "border-line",
                    )}
                  >
                    <span
                      className="relative block aspect-[4/3] rounded-lg bg-[linear-gradient(135deg,rgba(255,255,255,0.22),transparent_55%)] bg-blend-soft-light"
                      style={{ backgroundColor: s.hex }}
                    >
                      {checked && (
                        <span className="absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full bg-copper text-white animate-in zoom-in-50 duration-300">
                          <Check className="size-3" strokeWidth={2.4} aria-hidden />
                        </span>
                      )}
                    </span>
                    <span className="mt-2.5 block text-[13px] leading-tight font-semibold text-ink">
                      {s.label}
                    </span>
                    {s.sub && (
                      <span className="mt-0.5 block text-[11px] leading-tight text-ink-soft">
                        {s.sub}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-linen shadow-lift">
            {layers.map((key) => (
              <img
                key={key}
                src={img(key)}
                alt={key === shown ? caption : ""}
                loading="lazy"
                decoding="async"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-[opacity,filter] duration-500 ease-soft",
                  key === shown ? "opacity-100" : "opacity-0",
                )}
                style={key === shown && filter ? { filter } : undefined}
              />
            ))}
            <span
              key={caption}
              className="glass absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-full px-4 py-2 text-[13px] font-semibold text-ink shadow-soft animate-in fade-in-0 slide-in-from-bottom-1 duration-500"
            >
              {caption}
            </span>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Renovation: "What needs fixing?" chips plus a photo drop-zone that hands off to WhatsApp. */
export function FixChips({ service }: { service: Service }) {
  const fix = service.fixChips;
  const [picked, setPicked] = useState<string[]>([]);
  const [files, setFiles] = useState(0);
  const [over, setOver] = useState(false);
  const inputId = useId();
  if (!fix) return null;

  const toggle = (item: string) =>
    setPicked((prev) => (prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]));

  const message = [
    "Hello Shivansh Interior Solutions, I need some renovation work done.",
    picked.length ? `Needs fixing: ${picked.join(", ")}.` : "",
    files ? `I have ${files} photo${files > 1 ? "s" : ""} of the room to share.` : "",
    "Could you have a look and send a quick estimate?",
  ]
    .filter(Boolean)
    .join("\n");

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setOver(false);
    setFiles(e.dataTransfer.files.length);
  };

  return (
    <Section className="py-12 lg:py-16">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12">
          <div>
            <Eyebrow className="mb-5">{fix.label}</Eyebrow>
            <div role="group" aria-label={fix.label} className="flex flex-wrap gap-2.5">
              {fix.items.map((item) => {
                const on = picked.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(item)}
                    className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
                  >
                    <Chip
                      tone="white"
                      selected={on}
                      {...(on ? { icon: <Check strokeWidth={2.2} aria-hidden /> } : {})}
                      className="cursor-pointer transition-colors duration-300"
                    >
                      {item}
                    </Chip>
                  </button>
                );
              })}
            </div>
            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-ink-soft">
              Pick what is bothering you, add a few photos and we will reply with a rough estimate
              before the free site visit.
            </p>
          </div>

          <div>
            <label
              htmlFor={inputId}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(true);
              }}
              onDragLeave={() => setOver(false)}
              onDrop={onDrop}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white px-6 py-10 text-center transition-colors duration-300",
                over ? "border-copper bg-copper-tint/40" : "border-line-strong hover:border-copper",
              )}
            >
              <input
                id={inputId}
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => setFiles(e.target.files?.length ?? 0)}
              />
              <span className="flex size-12 items-center justify-center rounded-full bg-mist text-teal">
                <ImagePlus className="size-5" strokeWidth={1.5} aria-hidden />
              </span>
              <span className="mt-4 text-[16px] font-semibold text-ink">{fix.uploadLabel}</span>
              <span className="mt-1 text-[13px] text-ink-soft">
                {files
                  ? `${files} photo${files > 1 ? "s" : ""} chosen. Send them on WhatsApp below.`
                  : "Drop photos of the room here, or pick them from your phone."}
              </span>
            </label>
            <Button variant="whatsapp" href={waLink(message)} arrow className="mt-4" block>
              Send on WhatsApp
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
