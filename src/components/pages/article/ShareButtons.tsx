import { Check, Link2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button, WhatsAppIcon } from "@/components/site";
import { ARTICLE_PAGE } from "@/content/journal";
import { SITE_URL, waLink } from "@/content/site";

export type ShareButtonsProps = { title: string; slug: string; className?: string };

function fallbackCopy(text: string): boolean {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** "Share on WhatsApp" (pre-filled title + link) and "Copy link" with a 2s "Copied" state. */
export function ShareButtons({ title, slug, className }: ShareButtonsProps) {
  const canonical = `${SITE_URL}/journal/${slug}`;
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    const link = window.location.href.split("#")[0] ?? canonical;
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) ok = fallbackCopy(link);
    if (!ok) return;
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={className}>
      <Button
        variant="secondary"
        size="sm"
        href={waLink(`${title}\n${canonical}`)}
        icon={<WhatsAppIcon className="size-4" />}
        aria-label={`${ARTICLE_PAGE.share.whatsapp}: ${title}`}
      >
        {ARTICLE_PAGE.share.whatsapp}
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => void copy()}
        icon={copied ? <Check strokeWidth={1.75} /> : <Link2 strokeWidth={1.5} />}
        aria-live="polite"
        className="min-w-[128px]"
      >
        {copied ? "Copied" : ARTICLE_PAGE.share.copy}
      </Button>
    </div>
  );
}
