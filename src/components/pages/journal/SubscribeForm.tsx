import { ChevronDown, Lock } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/site";
import { JOURNAL_PAGE } from "@/content/journal";
import { waLink } from "@/content/site";
import { cn } from "@/lib/utils";

const COPY = JOURNAL_PAGE.subscribe;

/** +91 phone input + copper button that opens a pre-filled WhatsApp chat. Validates 10 digits. */
export function SubscribeForm({ className }: { className?: string }) {
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const digits = value.replace(/\D/g, "");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (digits.length !== 10) {
      setError("Please enter your 10-digit WhatsApp number.");
      return;
    }
    setError(null);
    const url = waLink(
      `Please add me to the monthly home ideas list. My number: +91 ${digits.slice(0, 5)} ${digits.slice(5)}`,
    );
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div
          className={cn(
            "flex h-12 flex-1 items-center overflow-hidden rounded-full border bg-white shadow-soft transition-[border-color,box-shadow] duration-300 ease-soft focus-within:border-copper focus-within:ring-2 focus-within:ring-copper/30",
            error ? "border-copper" : "border-line",
          )}
        >
          <span className="flex h-full items-center gap-1 border-r border-line px-4 text-[14px] font-semibold text-ink">
            +91
            <ChevronDown className="size-3.5 text-ink-soft" strokeWidth={1.5} aria-hidden />
          </span>
          <label htmlFor={`${id}-phone`} className="sr-only">
            WhatsApp number
          </label>
          <input
            id={`${id}-phone`}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder={COPY.placeholder}
            value={value}
            onChange={(e) => {
              setValue(e.target.value.replace(/[^\d\s]/g, "").slice(0, 12));
              if (error) setError(null);
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : `${id}-note`}
            className="h-full min-w-0 flex-1 bg-transparent px-4 text-[14px] text-ink outline-none placeholder:text-ink-soft/70"
          />
        </div>
        <Button type="submit" variant="primary" arrow className="sm:shrink-0">
          {COPY.button}
        </Button>
      </div>
      <p
        id={`${id}-error`}
        aria-live="polite"
        className={cn("mt-2 text-[13px] text-copper", !error && "sr-only")}
      >
        {error}
      </p>
      <p
        id={`${id}-note`}
        className="mt-3 flex items-center gap-1.5 text-[12px] text-ink-soft sm:justify-center"
      >
        <Lock className="size-3.5" strokeWidth={1.5} aria-hidden />
        {COPY.note}
      </p>
    </form>
  );
}
