import { cn } from "@/lib/utils";

export type ConfirmedMarkProps = { className?: string };

/**
 * Copper check inside a thin teal circle with small copper rays. The circle draws first, then
 * the check, then one soft copper glow pulse. Under reduced motion every stroke is complete.
 */
export function ConfirmedMark({ className }: ConfirmedMarkProps) {
  return (
    <div className={cn("relative mx-auto size-[104px] lg:size-[124px]", className)}>
      <style>{`
        @keyframes ty-draw { to { stroke-dashoffset: 0; } }
        @keyframes ty-pulse {
          0% { transform: scale(0.85); opacity: 0; }
          40% { opacity: 0.22; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes ty-fade { to { opacity: 1; } }
        .ty-circle { stroke-dasharray: 340; stroke-dashoffset: 340; animation: ty-draw 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards; }
        .ty-check { stroke-dasharray: 60; stroke-dashoffset: 60; animation: ty-draw 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.85s forwards; }
        .ty-ray { opacity: 0; animation: ty-fade 0.4s ease-out 1.15s forwards; }
        .ty-pulse { opacity: 0; animation: ty-pulse 1.1s cubic-bezier(0.22, 1, 0.36, 1) 1.2s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .ty-circle, .ty-check { stroke-dashoffset: 0; animation: none; }
          .ty-ray { opacity: 1; animation: none; }
          .ty-pulse { display: none; }
        }
      `}</style>
      <span
        aria-hidden
        className="ty-pulse pointer-events-none absolute inset-2 rounded-full bg-copper-bright"
      />
      <svg
        viewBox="0 0 160 160"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative size-full"
        role="img"
        aria-label="Booking confirmed"
      >
        <circle
          cx="80"
          cy="80"
          r="52"
          stroke="var(--teal)"
          strokeWidth="2.5"
          className="ty-circle"
        />
        <path d="M58 82l16 15 30-36" stroke="var(--copper)" strokeWidth="5" className="ty-check" />
        <g stroke="var(--copper-bright)" strokeWidth="2" className="ty-ray">
          <path d="M6 80h18" />
          <path d="M136 80h18" />
          <path d="M28 28l13 13" />
          <path d="M132 28l-13 13" />
          <path d="M28 132l13-13" />
          <path d="M132 132l-13-13" />
        </g>
      </svg>
    </div>
  );
}
