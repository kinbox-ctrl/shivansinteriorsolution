import { useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Home,
  MapPin,
  Paperclip,
  Pencil,
  Phone,
  Upload,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { Button, Heading } from "@/components/site";
import {
  BOOKING_FORM,
  PLANNING_OPTIONS,
  TIME_SLOTS,
  TOWN_OPTIONS,
  type PlanningOption,
  type TimeSlot,
  type TownOption,
} from "@/content/contact";
import { SITE_NAME, waLink } from "@/content/site";
import { cn } from "@/lib/utils";

/* ---------- dates ---------- */

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

type DateChip = { iso: string; weekday: string; label: string; long: string };

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function toChip(d: Date): DateChip {
  const iso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const weekday = DAYS[d.getDay()] ?? "";
  const month = MONTHS[d.getMonth()] ?? "";
  return {
    iso,
    weekday,
    label: `${pad(d.getDate())} ${month}`,
    long: `${weekday}, ${d.getDate()} ${month} ${d.getFullYear()}`,
  };
}

/** Today + the following days (BOOKING_FORM.dateChips in total), in local time. */
function buildDates(from: number): DateChip[] {
  const base = new Date(from);
  base.setHours(12, 0, 0, 0);
  return Array.from({ length: BOOKING_FORM.dateChips }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    return toChip(d);
  });
}

function todayKey(): number {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  return d.getTime();
}

/* ---------- state ---------- */

type Step = 1 | 2;
type ErrorKey = "name" | "phone" | "town" | "date" | "slot";
type Errors = Partial<Record<ErrorKey, string>>;

type FormState = {
  name: string;
  phone: string;
  town: TownOption | null;
  planning: PlanningOption[];
  date: string | null;
  slot: TimeSlot["id"] | null;
  files: string[];
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  town: TOWN_OPTIONS[0],
  planning: [],
  date: null,
  slot: TIME_SLOTS[0]?.id ?? null,
  files: [],
};

const EASE = [0.22, 1, 0.36, 1] as const;

function validate(state: FormState): Errors {
  const errors: Errors = {};
  if (state.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!/^[6-9]\d{9}$/.test(state.phone)) errors.phone = "Enter a 10-digit mobile number.";
  if (!state.town) errors.town = "Choose your town or location.";
  if (!state.date) errors.date = "Pick a preferred date.";
  if (!state.slot) errors.slot = "Pick a preferred time.";
  return errors;
}

function formatPhone(digits: string): string {
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

function newReference(): string {
  return `SIS-${Math.floor(1000 + Math.random() * 9000)}`;
}

/* ---------- small UI pieces ---------- */

function FieldLabel({
  htmlFor,
  id,
  required,
  hint,
  children,
}: {
  htmlFor?: string;
  id?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  const cls = "mb-1.5 block text-[12.5px] font-semibold text-ink";
  const inner = (
    <>
      {children}
      {required && (
        <span className="text-copper" aria-hidden>
          {" "}
          *
        </span>
      )}
      {hint && <span className="ml-1 font-normal text-ink-soft">{hint}</span>}
    </>
  );
  return htmlFor ? (
    <label htmlFor={htmlFor} className={cls}>
      {inner}
    </label>
  ) : (
    <p id={id} className={cls}>
      {inner}
    </p>
  );
}

function FieldError({ id, children }: { id: string; children?: string | undefined }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-[12px] font-medium text-copper">
      {children}
    </p>
  );
}

const INPUT =
  "h-11 w-full rounded-lg border border-line bg-white px-3.5 text-[14px] text-ink placeholder:text-ink-soft/70 outline-none transition-[border-color,box-shadow] duration-300 ease-soft focus:border-copper focus:ring-2 focus:ring-copper/25 focus-visible:outline-none aria-[invalid=true]:border-copper";

type OptionChipProps = {
  selected: boolean;
  onClick: () => void;
  tone?: "white" | "mist";
  className?: string;
  children: ReactNode;
};

function OptionChip({ selected, onClick, tone = "white", className, children }: OptionChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-semibold leading-none whitespace-nowrap transition-[background-color,color,border-color,transform] duration-300 ease-soft active:scale-[0.98]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
        selected
          ? "border-teal bg-teal text-white"
          : tone === "white"
            ? "border-line bg-white text-ink hover:border-line-strong hover:bg-cloud"
            : "border-transparent bg-mist text-teal hover:bg-teal-soft",
        className,
      )}
    >
      {selected && <Check className="size-3.5" strokeWidth={2} aria-hidden />}
      {children}
    </button>
  );
}

type SlotChipProps = {
  selected: boolean;
  onClick: () => void;
  top: string;
  bottom: string;
  ariaLabel: string;
  className?: string;
  suppressHydrationWarning?: boolean;
};

function SlotChip({
  selected,
  onClick,
  top,
  bottom,
  ariaLabel,
  className,
  suppressHydrationWarning,
}: SlotChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        "flex h-[54px] shrink-0 snap-start flex-col items-center justify-center rounded-xl border px-1 whitespace-nowrap transition-[background-color,color,border-color,transform] duration-300 ease-soft active:scale-[0.98]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
        selected
          ? "border-copper bg-copper-tint text-copper"
          : "border-line bg-white text-ink hover:border-line-strong hover:bg-cloud",
        className,
      )}
    >
      <span
        className="text-[13px] font-semibold leading-none"
        suppressHydrationWarning={suppressHydrationWarning}
      >
        {top}
      </span>
      <span
        className={cn(
          "mt-1.5 text-[10.5px] leading-none",
          selected ? "text-copper" : "text-ink-soft",
        )}
        suppressHydrationWarning={suppressHydrationWarning}
      >
        {bottom}
      </span>
    </button>
  );
}

function SummaryRow({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-mist text-teal [&_svg]:size-4">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <dt className="text-[11px] font-semibold tracking-[0.12em] text-ink-soft uppercase">
          {label}
        </dt>
        <dd className="mt-0.5 text-[15px] font-medium text-ink">{value}</dd>
      </div>
    </div>
  );
}

/* ---------- form ---------- */

export function BookingForm({ className }: { className?: string }) {
  const navigate = useNavigate();
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [step, setStep] = useState<Step>(1);
  const [dayKey, setDayKey] = useState<number>(todayKey);
  const [state, setState] = useState<FormState>(() => ({
    ...INITIAL,
    date: buildDates(dayKey)[0]?.iso ?? null,
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [dragging, setDragging] = useState(false);
  const [sending, setSending] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const townRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const waRef = useRef<HTMLAnchorElement>(null);
  const summaryRef = useRef<HTMLHeadingElement>(null);

  // The chips are computed from "today": re-sync after hydration in case the visitor's day differs
  // from the server's (the chip text carries suppressHydrationWarning for that case).
  useEffect(() => {
    const key = todayKey();
    setDayKey((prev) => (prev === key ? prev : key));
  }, []);

  const dates = useMemo(() => buildDates(dayKey), [dayKey]);

  // Default to the first date once the list exists (state stays serialisable for SSR).
  useEffect(() => {
    setState((s) => {
      if (s.date && dates.some((d) => d.iso === s.date)) return s;
      const first = dates[0];
      return first ? { ...s, date: first.iso } : s;
    });
  }, [dates]);

  const patch = useCallback((next: Partial<FormState>, clear?: ErrorKey) => {
    setState((s) => ({ ...s, ...next }));
    if (clear) {
      setErrors((e) => {
        if (!e[clear]) return e;
        const rest = { ...e };
        delete rest[clear];
        return rest;
      });
    }
  }, []);

  const togglePlanning = (option: PlanningOption) =>
    patch({
      planning: state.planning.includes(option)
        ? state.planning.filter((p) => p !== option)
        : [...state.planning, option],
    });

  const addFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const names = Array.from(list).map((f) => f.name);
    setState((s) => ({ ...s, files: Array.from(new Set([...s.files, ...names])).slice(0, 6) }));
  };

  const removeFile = (name: string) =>
    setState((s) => ({ ...s, files: s.files.filter((f) => f !== name) }));

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate(state);
    setErrors(next);
    const first = (Object.keys(next) as ErrorKey[])[0];
    if (first) {
      const target =
        first === "name"
          ? nameRef.current
          : first === "phone"
            ? phoneRef.current
            : (first === "town"
                ? townRef
                : first === "date"
                  ? dateRef
                  : slotRef
              ).current?.querySelector<HTMLElement>("button");
      target?.focus();
      return;
    }
    setStep(2);
  };

  const selectedDate = dates.find((d) => d.iso === state.date);
  const selectedSlot = TIME_SLOTS.find((s) => s.id === state.slot);

  useEffect(() => {
    if (step === 2) summaryRef.current?.focus();
  }, [step]);

  const confirm = () => {
    if (sending || !state.town || !state.date || !state.slot) return;
    const ref = newReference();
    const planningText = state.planning.length ? state.planning.join(", ") : "Not sure yet";
    const message = [
      `Hello ${SITE_NAME}, I'd like to book a free site visit.`,
      `Name: ${state.name.trim()}`,
      `Phone: ${formatPhone(state.phone)}`,
      `Town: ${state.town}`,
      `Planning: ${planningText}`,
      `Preferred date: ${selectedDate?.long ?? state.date}`,
      `Preferred time: ${selectedSlot ? `${selectedSlot.label} (${selectedSlot.time})` : ""}`,
      state.files.length ? `Files to share: ${state.files.join(", ")}` : null,
      `Reference: ${ref}`,
    ]
      .filter((line): line is string => Boolean(line))
      .join("\n");

    setSending(true);
    const anchor = waRef.current;
    if (anchor) {
      anchor.href = waLink(message);
      anchor.click();
    }
    const search = {
      name: state.name.trim(),
      phone: state.phone,
      town: state.town,
      planning: state.planning.map((p) => p.toLowerCase()).join(","),
      date: state.date,
      slot: state.slot,
      ref,
    };
    window.setTimeout(() => {
      void navigate({ to: "/contact/thank-you", search });
    }, 250);
  };

  const progress = step === 1 ? 50 : 100;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-lift sm:p-6",
        className,
      )}
    >
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <Heading as="h2" size="md" className="lg:text-[27px]">
          {BOOKING_FORM.title}
        </Heading>
        <div className="shrink-0 pt-1 text-right">
          <p className="text-[12px] font-medium text-ink-soft">Step {step} of 2</p>
          <div
            role="progressbar"
            aria-label="Booking progress"
            aria-valuemin={1}
            aria-valuemax={2}
            aria-valuenow={step}
            className="mt-2 h-1.5 w-[120px] overflow-hidden rounded-full bg-linen sm:w-[160px]"
          >
            <div
              className="h-full rounded-full bg-copper transition-[width] duration-700 ease-soft"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease: EASE }}>
        <AnimatePresence initial={false} mode="wait">
          {step === 1 ? (
            <motion.form
              key="step-1"
              noValidate
              onSubmit={onSubmit}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="mt-5"
            >
              {/* name + phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor={id("name")} required>
                    {BOOKING_FORM.fields.name.label}
                  </FieldLabel>
                  <input
                    ref={nameRef}
                    id={id("name")}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={BOOKING_FORM.fields.name.placeholder}
                    value={state.name}
                    onChange={(e) => patch({ name: e.target.value }, "name")}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? id("name-error") : undefined}
                    className={INPUT}
                  />
                  <FieldError id={id("name-error")}>{errors.name}</FieldError>
                </div>
                <div>
                  <FieldLabel htmlFor={id("phone")} required>
                    {BOOKING_FORM.fields.phone.label}
                  </FieldLabel>
                  <div className="flex">
                    <span className="relative shrink-0">
                      <select
                        aria-label="Country code"
                        defaultValue={BOOKING_FORM.fields.phone.prefix}
                        className="h-11 appearance-none rounded-l-lg border border-r-0 border-line bg-linen/70 pr-7 pl-3.5 text-[14px] font-semibold text-ink outline-none focus:border-copper focus:ring-2 focus:ring-copper/25"
                      >
                        <option value={BOOKING_FORM.fields.phone.prefix}>
                          {BOOKING_FORM.fields.phone.prefix}
                        </option>
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-ink-soft"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </span>
                    <input
                      ref={phoneRef}
                      id={id("phone")}
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      maxLength={10}
                      placeholder={BOOKING_FORM.fields.phone.placeholder}
                      value={state.phone}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        patch({ phone: e.target.value.replace(/\D/g, "").slice(0, 10) }, "phone")
                      }
                      aria-invalid={errors.phone ? true : undefined}
                      aria-describedby={errors.phone ? id("phone-error") : undefined}
                      className={cn(INPUT, "rounded-l-none")}
                    />
                  </div>
                  <FieldError id={id("phone-error")}>{errors.phone}</FieldError>
                </div>
              </div>

              {/* town */}
              <div className="mt-4">
                <FieldLabel id={id("town-label")} required>
                  {BOOKING_FORM.fields.town.label}
                </FieldLabel>
                <div
                  ref={townRef}
                  role="group"
                  aria-labelledby={id("town-label")}
                  aria-describedby={errors.town ? id("town-error") : undefined}
                  className="flex flex-wrap gap-2"
                >
                  {TOWN_OPTIONS.map((town) => (
                    <OptionChip
                      key={town}
                      selected={state.town === town}
                      onClick={() => patch({ town }, "town")}
                      className="h-10 px-5"
                    >
                      {town}
                    </OptionChip>
                  ))}
                </div>
                <FieldError id={id("town-error")}>{errors.town}</FieldError>
              </div>

              {/* planning */}
              <div className="mt-4">
                <FieldLabel id={id("planning-label")} hint={BOOKING_FORM.fields.planning.hint}>
                  {BOOKING_FORM.fields.planning.label}
                </FieldLabel>
                <div
                  role="group"
                  aria-labelledby={id("planning-label")}
                  className="flex flex-wrap gap-2"
                >
                  {PLANNING_OPTIONS.map((option) => (
                    <OptionChip
                      key={option}
                      tone="mist"
                      selected={state.planning.includes(option)}
                      onClick={() => togglePlanning(option)}
                    >
                      {option}
                    </OptionChip>
                  ))}
                </div>
              </div>

              {/* date + time */}
              <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
                <div className="min-w-0">
                  <FieldLabel id={id("date-label")} required>
                    {BOOKING_FORM.fields.date.label}
                  </FieldLabel>
                  <div
                    ref={dateRef}
                    role="group"
                    aria-labelledby={id("date-label")}
                    aria-describedby={errors.date ? id("date-error") : undefined}
                    className="hide-scrollbar -mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:pb-0"
                  >
                    {dates.map((d) => (
                      <SlotChip
                        key={d.iso}
                        selected={state.date === d.iso}
                        onClick={() => patch({ date: d.iso }, "date")}
                        top={d.weekday}
                        bottom={d.label}
                        ariaLabel={d.long}
                        suppressHydrationWarning
                        className="w-[62px] lg:w-auto lg:min-w-0 lg:flex-1"
                      />
                    ))}
                  </div>
                  <FieldError id={id("date-error")}>{errors.date}</FieldError>
                </div>
                <div className="min-w-0">
                  <FieldLabel id={id("slot-label")} required>
                    {BOOKING_FORM.fields.time.label}
                  </FieldLabel>
                  <div
                    ref={slotRef}
                    role="group"
                    aria-labelledby={id("slot-label")}
                    aria-describedby={errors.slot ? id("slot-error") : undefined}
                    className="flex gap-2"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <SlotChip
                        key={slot.id}
                        selected={state.slot === slot.id}
                        onClick={() => patch({ slot: slot.id }, "slot")}
                        top={slot.label}
                        bottom={slot.time}
                        ariaLabel={`${slot.label}, ${slot.time}`}
                        className="min-w-0 flex-1 px-0.5"
                      />
                    ))}
                  </div>
                  <FieldError id={id("slot-error")}>{errors.slot}</FieldError>
                </div>
              </div>

              {/* upload + submit */}
              <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
                <div>
                  <FieldLabel htmlFor={id("upload")}>{BOOKING_FORM.fields.upload.label}</FieldLabel>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    className={cn(
                      "rounded-xl border border-dashed px-4 py-3.5 transition-colors duration-300 ease-soft",
                      dragging ? "border-copper bg-copper-tint/40" : "border-line-strong bg-cloud",
                    )}
                  >
                    <label
                      htmlFor={id("upload")}
                      className="flex cursor-pointer items-center gap-3 rounded-lg focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-copper"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center text-teal">
                        <Upload className="size-5" strokeWidth={1.5} aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-semibold text-ink">
                          {BOOKING_FORM.fields.upload.text}
                        </span>
                        <span className="block text-[12px] text-ink-soft">
                          {BOOKING_FORM.fields.upload.hint}
                        </span>
                      </span>
                      <input
                        id={id("upload")}
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                        onChange={(e) => {
                          addFiles(e.target.files);
                          e.target.value = "";
                        }}
                        className="sr-only"
                      />
                    </label>
                    {state.files.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Chosen files">
                        {state.files.map((name) => (
                          <li
                            key={name}
                            className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-line bg-white py-1 pr-1.5 pl-2.5 text-[12px] font-medium text-ink"
                          >
                            <Paperclip
                              className="size-3 shrink-0 text-teal"
                              strokeWidth={1.5}
                              aria-hidden
                            />
                            <span className="truncate">{name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(name)}
                              aria-label={`Remove ${name}`}
                              className="flex size-5 items-center justify-center rounded-full text-ink-soft hover:bg-linen hover:text-ink"
                            >
                              <X className="size-3" strokeWidth={2} aria-hidden />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <p className="mt-1.5 text-[11.5px] leading-snug text-ink-soft">
                    Files stay on your device for now (nothing is uploaded). We'll ask for them on
                    WhatsApp after booking.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2.5 lg:pt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    arrow
                    block
                    icon={<Calendar strokeWidth={1.5} aria-hidden />}
                    className="lg:h-[52px]"
                  >
                    {BOOKING_FORM.submit}
                  </Button>
                  <p className="text-center text-[12px] text-ink-soft">{BOOKING_FORM.note}</p>
                </div>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="mt-5"
            >
              <h3
                ref={summaryRef}
                tabIndex={-1}
                className="font-sans text-[15px] font-semibold tracking-normal text-ink outline-none"
              >
                Please check your details
              </h3>
              <p className="mt-1 text-[13px] text-ink-soft">
                We'll open WhatsApp with this summary pre-filled, then confirm your exact time.
              </p>
              <dl className="mt-3 divide-y divide-line rounded-xl border border-line bg-cloud px-4">
                <SummaryRow
                  icon={<User strokeWidth={1.5} aria-hidden />}
                  label="Name"
                  value={state.name.trim()}
                />
                <SummaryRow
                  icon={<Phone strokeWidth={1.5} aria-hidden />}
                  label="Phone"
                  value={formatPhone(state.phone)}
                />
                <SummaryRow
                  icon={<MapPin strokeWidth={1.5} aria-hidden />}
                  label="Town"
                  value={state.town}
                />
                <SummaryRow
                  icon={<Home strokeWidth={1.5} aria-hidden />}
                  label="Planning"
                  value={state.planning.length ? state.planning.join(", ") : "Not sure yet"}
                />
                <SummaryRow
                  icon={<Calendar strokeWidth={1.5} aria-hidden />}
                  label="Date"
                  value={selectedDate?.long ?? state.date}
                />
                <SummaryRow
                  icon={<Clock strokeWidth={1.5} aria-hidden />}
                  label="Time"
                  value={selectedSlot ? `${selectedSlot.label} · ${selectedSlot.time}` : state.slot}
                />
                {state.files.length > 0 && (
                  <SummaryRow
                    icon={<Paperclip strokeWidth={1.5} aria-hidden />}
                    label="Files to share"
                    value={`${state.files.length} chosen (shared on WhatsApp, not uploaded)`}
                  />
                )}
              </dl>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStep(1)}
                  icon={<Pencil strokeWidth={1.5} aria-hidden />}
                  className="sm:shrink-0"
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="whatsapp"
                  size="lg"
                  arrow
                  onClick={confirm}
                  disabled={sending}
                  className="sm:flex-1"
                >
                  {sending ? "Opening WhatsApp…" : "Confirm & send on WhatsApp"}
                </Button>
              </div>
              <a
                ref={waRef}
                href={waLink(`Hello ${SITE_NAME}, I'd like to book a free site visit.`)}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden
                className="sr-only"
              >
                Open WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
