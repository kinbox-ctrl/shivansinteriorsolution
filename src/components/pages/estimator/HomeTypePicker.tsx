import { Check } from "lucide-react";
import { HOME_TYPES, type HomeTypeId } from "@/content/pricing";
import { cn } from "@/lib/utils";
import { contentIcon } from "./icons";

export type HomeTypePickerProps = {
  value: HomeTypeId;
  onChange: (id: HomeTypeId) => void;
  name?: string;
};

/** Five selectable home-type cards (native radios, so arrow keys and focus work for free). */
export function HomeTypePicker({ value, onChange, name = "home-type" }: HomeTypePickerProps) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="sr-only">Home type</legend>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {HOME_TYPES.map((home) => {
          const Icon = contentIcon(home.icon);
          const selected = home.id === value;
          return (
            <label
              key={home.id}
              className={cn(
                "relative flex min-h-[96px] cursor-pointer flex-col items-center justify-center rounded-xl border bg-white px-1.5 py-3 text-center transition-[border-color,box-shadow,transform] duration-300 ease-soft",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-copper",
                selected
                  ? "border-copper shadow-[0_0_0_1px_var(--copper)]"
                  : "border-line hover:-translate-y-px hover:border-line-strong hover:shadow-soft",
              )}
            >
              <input
                type="radio"
                name={name}
                value={home.id}
                checked={selected}
                onChange={() => onChange(home.id)}
                className="sr-only"
              />
              {selected && (
                <span
                  aria-hidden
                  className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-copper text-white"
                >
                  <Check className="size-3" strokeWidth={2.5} />
                </span>
              )}
              <Icon className="size-7 text-teal" strokeWidth={1.5} aria-hidden />
              <span className="mt-2 text-[12.5px] leading-tight font-semibold whitespace-nowrap text-ink">
                {home.label}
              </span>
              <span className="mt-1 text-[10.5px] leading-tight text-ink-soft">{home.range}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
