import { ArrowRight, Check, Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CONTACT_TILES, type ContactTile } from "@/content/contact";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_FLOOR_PLAN } from "@/content/site";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = { Phone, MessageCircle, Mail };

function tileHref(tile: ContactTile): string {
  switch (tile.id) {
    case "call":
      return PHONE_TEL;
    case "whatsapp":
      return WHATSAPP_FLOOR_PLAN;
    case "email":
      return `mailto:${EMAIL}`;
  }
}

function isDesktopPointer(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

/** Small "number copied" toast rendered in a portal so transformed ancestors cannot trap it. */
function Toast({ message }: { message: string | null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center px-5 lg:bottom-8"
    >
      {message && (
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold text-teal shadow-lift">
          <span className="flex size-5 items-center justify-center rounded-full bg-teal text-white">
            <Check className="size-3" strokeWidth={2} aria-hidden />
          </span>
          {message}
        </span>
      )}
    </div>,
    document.body,
  );
}

/** The three stacked Call / WhatsApp / Email tiles. On desktop, Call also copies the number. */
export function ActionTiles({ className }: { className?: string }) {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copyNumber = useCallback(() => {
    if (!isDesktopPointer() || !navigator.clipboard) return;
    // The tel: link still opens; on a desktop we also copy the number in case there is no phone app.
    navigator.clipboard
      .writeText(PHONE_DISPLAY)
      .then(() => {
        setToast(`${PHONE_DISPLAY} copied`);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setToast(null), 2400);
      })
      .catch(() => {
        /* clipboard blocked: the tel: link is enough */
      });
  }, []);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {CONTACT_TILES.map((tile) => {
        const Icon = ICONS[tile.icon] ?? Phone;
        const href = tileHref(tile);
        const external = tile.id === "whatsapp";
        return (
          <a
            key={tile.id}
            href={href}
            onClick={tile.id === "call" ? copyNumber : undefined}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-3.5 pr-5 shadow-soft transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper sm:gap-5 sm:p-4 sm:pr-6"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-teal text-teal transition-colors duration-300 ease-soft group-hover:bg-mist sm:size-14">
              <Icon className="size-5 sm:size-6" strokeWidth={1.5} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-medium text-ink-soft">{tile.label}</span>
              <span
                className={cn(
                  "block font-display font-medium tracking-[-0.01em] text-teal leading-[1.25]",
                  tile.id === "email"
                    ? "text-[16px] break-all sm:text-[18px] lg:text-[19px]"
                    : "text-[21px] sm:text-[23px]",
                )}
              >
                {tile.value}
              </span>
              <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-soft">
                {tile.sub}
              </span>
            </span>
            <ArrowRight
              className="size-5 shrink-0 text-teal transition-transform duration-300 ease-soft group-hover:translate-x-1"
              strokeWidth={1.5}
              aria-hidden
            />
          </a>
        );
      })}
      <Toast message={toast} />
    </div>
  );
}
