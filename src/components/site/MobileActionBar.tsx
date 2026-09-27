import { Link } from "@tanstack/react-router";
import { Calculator, Phone } from "lucide-react";
import { PHONE_TEL, WHATSAPP_DEFAULT } from "@/content/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

export type MobileActionBarProps = { className?: string };

const item =
  "flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-[14px] font-semibold transition-colors duration-300 [&_svg]:size-[18px]";

/** Fixed bottom bar for < lg: Call · WhatsApp · Estimate, with safe-area padding. */
export function MobileActionBar({ className }: MobileActionBarProps) {
  return (
    <div
      className={cn(
        "glass fixed inset-x-0 bottom-0 z-[55] border-x-0 border-b-0 border-t border-t-line px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] lg:hidden",
        className,
      )}
      role="navigation"
      aria-label="Quick actions"
    >
      <div className="flex items-center gap-2">
        <a href={PHONE_TEL} className={cn(item, "border border-teal/30 text-teal")}>
          <Phone strokeWidth={1.5} aria-hidden />
          Call
        </a>
        <a
          href={WHATSAPP_DEFAULT}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(item, "bg-copper text-white")}
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
        <Link to="/estimator" className={cn(item, "bg-teal text-white")}>
          <Calculator strokeWidth={1.5} aria-hidden />
          Estimate
        </Link>
      </div>
    </div>
  );
}
