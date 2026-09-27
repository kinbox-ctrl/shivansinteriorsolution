import { cn } from "@/lib/utils";

export type LangToggleProps = { className?: string; size?: "sm" | "md" };

/** EN | हिंदी pill. Hindi is disabled until the translation exists. */
export function LangToggle({ className, size = "sm" }: LangToggleProps) {
  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-white/70 font-semibold text-ink-soft",
        size === "sm" ? "h-10 px-1 text-[13px]" : "h-12 px-1.5 text-[15px]",
        className,
      )}
    >
      <span
        aria-current="true"
        className={cn("rounded-full text-teal", size === "sm" ? "px-2.5 py-1" : "px-3.5 py-1.5")}
      >
        EN
      </span>
      <span aria-hidden className="h-4 w-px bg-line-strong" />
      <button
        type="button"
        disabled
        title="Hindi version coming soon"
        aria-label="Hindi — coming soon"
        className={cn(
          "font-devanagari cursor-not-allowed rounded-full text-ink-soft/80",
          size === "sm" ? "px-2.5 py-1 text-[14px]" : "px-3.5 py-1.5 text-[16px]",
        )}
      >
        हिंदी
      </button>
    </div>
  );
}
