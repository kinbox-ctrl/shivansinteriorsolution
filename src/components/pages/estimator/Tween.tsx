import { useTween } from "./use-tween";

export type TweenProps = {
  value: number;
  format: (n: number) => string;
  duration?: number;
  className?: string;
};

/** Text that tweens between values ("₹2,18,700" → "₹2,43,000"). */
export function Tween({ value, format, duration = 500, className }: TweenProps) {
  const v = useTween(value, duration);
  return <span className={className}>{format(v)}</span>;
}
