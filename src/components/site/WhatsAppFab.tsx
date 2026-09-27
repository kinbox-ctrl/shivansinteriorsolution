import { WHATSAPP_DEFAULT } from "@/content/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

export type WhatsAppFabProps = { href?: string; className?: string };

/** Fixed 56px WhatsApp-green button, bottom-right; hidden below lg (MobileActionBar takes over). */
export function WhatsAppFab({ href = WHATSAPP_DEFAULT, className }: WhatsAppFabProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed right-6 bottom-6 z-[55] hidden size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_14px_32px_-10px_rgba(37,211,102,0.6)] transition-transform duration-300 ease-soft hover:scale-105 lg:flex",
        className,
      )}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
