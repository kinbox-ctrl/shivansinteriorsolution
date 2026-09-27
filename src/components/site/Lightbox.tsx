import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type LightboxProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

/** Minimal image lightbox on top of the shadcn Dialog primitives. */
export function Lightbox({ open, onOpenChange, src, alt, caption, className }: LightboxProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[90] bg-ink/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed top-1/2 left-1/2 z-[91] w-[min(96vw,1200px)] -translate-x-1/2 -translate-y-1/2 outline-none",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
            className,
          )}
        >
          <DialogPrimitive.Title className="sr-only">{alt}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            {caption ?? "Enlarged image"}
          </DialogPrimitive.Description>
          <figure className="overflow-hidden rounded-2xl bg-white shadow-lift">
            <img src={src} alt={alt} className="max-h-[85vh] w-full object-contain" />
            {caption && (
              <figcaption className="px-4 py-3 font-mono text-[12px] tracking-[0.12em] text-ink-soft uppercase">
                {caption}
              </figcaption>
            )}
          </figure>
          <DialogPrimitive.Close
            aria-label="Close"
            className="glass absolute -top-3 -right-3 flex size-10 items-center justify-center rounded-full text-teal shadow-soft hover:bg-white"
          >
            <X className="size-4" strokeWidth={1.5} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
