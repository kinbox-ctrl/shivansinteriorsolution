import { useEffect, type ReactNode } from "react";
import { initSmoothScroll } from "@/lib/scroll";
import { observeReveals } from "@/lib/use-reveal";
import { MobileActionBar } from "./MobileActionBar";
import { RulerBar } from "./RulerBar";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { WhatsAppFab } from "./WhatsAppFab";

export type SiteChromeProps = { children: ReactNode };

/**
 * Site shell: RulerBar + SiteHeader + <main id="main"> + SiteFooter + WhatsAppFab +
 * MobileActionBar, with Lenis smooth scrolling (off under reduced motion) and the global
 * `[data-reveal]` observer.
 */
export function SiteChrome({ children }: SiteChromeProps) {
  useEffect(() => {
    const stopScroll = initSmoothScroll();
    const stopReveals = observeReveals();
    return () => {
      stopScroll();
      stopReveals();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col pt-[14px]">
      <a
        href="#main"
        className="sr-only z-[90] rounded-full bg-teal px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-5 focus:left-5"
      >
        Skip to content
      </a>
      <RulerBar />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppFab />
      <MobileActionBar />
    </div>
  );
}
