import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { SOCIAL } from "@/content/site";
import { cn } from "@/lib/utils";

export type SocialKind = "instagram" | "facebook" | "youtube" | "linkedin" | "pinterest";
export type SocialItem = { label: string; href: string; kind: SocialKind };

export type SocialIconsProps = {
  items?: readonly SocialItem[];
  /** Icon box size in px. Default 34. */
  size?: number;
  tone?: "teal" | "ink" | "copper";
  className?: string;
};

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M9.6 19.2 11.2 12.6" />
      <path d="M10.6 10.3c.4-1.2 1.4-2 2.6-2 1.5 0 2.4 1 2.4 2.5 0 2-1.2 3.7-3 3.7-.9 0-1.5-.5-1.6-1.2" />
    </svg>
  );
}

const ICON: Record<
  SocialKind,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  pinterest: PinterestIcon,
};

const TONE = {
  teal: "text-teal border-teal/20 hover:bg-teal hover:text-white hover:border-teal",
  ink: "text-ink border-line-strong hover:bg-ink hover:text-white hover:border-ink",
  copper: "text-copper border-copper/30 hover:bg-copper hover:text-white hover:border-copper",
} as const;

/** Row of round outlined social icon links (lucide + a simple Pinterest glyph). */
export function SocialIcons({
  items = SOCIAL,
  size = 34,
  tone = "teal",
  className,
}: SocialIconsProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {items.map((s) => {
        const Icon = ICON[s.kind];
        const external = /^https?:\/\//.test(s.href);
        return (
          <li key={s.kind}>
            <a
              href={s.href}
              aria-label={s.label}
              title={s.label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={cn(
                "inline-flex items-center justify-center rounded-full border transition-colors duration-300 ease-soft",
                TONE[tone],
              )}
              style={{ width: size, height: size }}
            >
              <Icon className="size-[15px]" strokeWidth={1.5} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
