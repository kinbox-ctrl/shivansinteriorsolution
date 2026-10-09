// Turns the (optional) search params of /contact/thank-you into the booking shown on the page,
// falling back to the sample confirmation, and builds the calendar / WhatsApp links.

import { PLANNING_OPTIONS, THANK_YOU_SAMPLE, TIME_SLOTS } from "@/content/contact";
import { ADDRESS, SITE_NAME, waLink } from "@/content/site";
import { EVENT_COPY } from "./copy";

export type BookingSearch = {
  name?: string | undefined;
  phone?: string | undefined;
  town?: string | undefined;
  planning?: string | undefined;
  date?: string | undefined;
  slot?: string | undefined;
  ref?: string | undefined;
};

export type Booking = {
  firstName: string;
  /** "Sat, 3 Oct 2026" */
  date: string;
  /** YYYY-MM-DD */
  dateIso: string;
  /** "Morning (10 AM – 12 PM)" */
  slot: string;
  town: string;
  planning: string;
  reference: string;
};

/** ISO date behind THANK_YOU_SAMPLE.date ("Sat, 3 Oct 2026"). */
const SAMPLE_DATE_ISO = "2026-10-03";

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

type Ymd = { y: number; m: number; d: number };

function parseIso(iso: string | undefined): Ymd | null {
  if (!iso) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const probe = new Date(Date.UTC(y, m - 1, d));
  if (probe.getUTCMonth() !== m - 1 || probe.getUTCDate() !== d) return null;
  return { y, m, d };
}

/** "2026-10-03" → "Sat, 3 Oct 2026" (UTC arithmetic, so SSR and client agree). */
export function formatBookingDate(ymd: Ymd): string {
  const date = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d));
  return `${DAYS[date.getUTCDay()]}, ${ymd.d} ${MONTHS[ymd.m - 1]} ${ymd.y}`;
}

function clean(value: string | undefined): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}

/** "morning" (or a label) → "Morning (9 AM – 12 PM)"; anything unknown is shown as typed. */
function slotLabel(value: string | undefined): string | undefined {
  const v = clean(value);
  if (!v) return undefined;
  const lower = v.toLowerCase();
  const slot = TIME_SLOTS.find((s) => s.id === lower || s.label.toLowerCase() === lower);
  return slot ? `${slot.label} (${slot.time})` : v;
}

/** "ceiling,wardrobes" → "Ceiling, Wardrobes" (known options keep their canonical casing). */
function planningLabel(value: string | undefined): string | undefined {
  const v = clean(value);
  if (!v) return undefined;
  const parts = v
    .split(/[,|]/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => PLANNING_OPTIONS.find((o) => o.toLowerCase() === p.toLowerCase()) ?? p);
  return parts.length ? parts.join(", ") : undefined;
}

/** Resolve the booking from search params, falling back field by field to the sample. */
export function resolveBooking(search: BookingSearch): Booking {
  const ymd = parseIso(search.date);
  const firstName = clean(search.name)?.split(/\s+/)[0];
  return {
    firstName: firstName ?? THANK_YOU_SAMPLE.firstName,
    date: ymd ? formatBookingDate(ymd) : THANK_YOU_SAMPLE.date,
    dateIso: ymd ? `${ymd.y}-${pad(ymd.m)}-${pad(ymd.d)}` : SAMPLE_DATE_ISO,
    slot: slotLabel(search.slot) ?? THANK_YOU_SAMPLE.slot,
    town: clean(search.town) ?? THANK_YOU_SAMPLE.town,
    planning: planningLabel(search.planning) ?? THANK_YOU_SAMPLE.planning,
    reference: clean(search.ref)?.toUpperCase() ?? THANK_YOU_SAMPLE.reference,
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Start / end hours (24h) read from a slot label such as "Morning (10 AM – 12 PM)". */
function slotHours(slot: string): { start: number; end: number } {
  const hours: number[] = [];
  for (const m of slot.matchAll(/(\d{1,2})\s*(AM|PM)/gi)) {
    let h = Number(m[1]) % 12;
    if ((m[2] ?? "").toUpperCase() === "PM") h += 12;
    hours.push(h);
  }
  const start = hours[0] ?? 10;
  const end = hours[1] ?? Math.min(start + 2, 23);
  return { start, end: end > start ? end : start + 2 };
}

/** "20261003T100000" style local (IST) timestamps for the visit window. */
function visitWindow(booking: Booking): { start: string; end: string } {
  const { start, end } = slotHours(booking.slot);
  const day = booking.dateIso.replace(/-/g, "");
  return { start: `${day}T${pad(start)}0000`, end: `${day}T${pad(end)}0000` };
}

const TZ = "Asia/Kolkata";

function eventTitle(): string {
  return EVENT_COPY.title(SITE_NAME);
}

function eventDetails(booking: Booking): string {
  return EVENT_COPY.details(SITE_NAME, booking.planning, booking.town, booking.reference);
}

/** Google Calendar "add event" URL. */
export function googleCalendarUrl(booking: Booking): string {
  const { start, end } = visitWindow(booking);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: eventTitle(),
    dates: `${start}/${end}`,
    details: eventDetails(booking),
    location: EVENT_COPY.location(booking.town, SITE_NAME, ADDRESS),
    ctz: TZ,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function icsEscape(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/** A small VCALENDAR document for Apple / Outlook / other calendar apps. */
export function buildIcs(booking: Booking): string {
  const { start, end } = visitWindow(booking);
  const uid = `${booking.reference.toLowerCase()}-${booking.dateIso}@shivansinteriorsolution.co.in`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Shivansh Interior Solutions//Site visit//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${start}Z`,
    `DTSTART;TZID=${TZ}:${start}`,
    `DTEND;TZID=${TZ}:${end}`,
    `SUMMARY:${icsEscape(eventTitle())}`,
    `DESCRIPTION:${icsEscape(eventDetails(booking))}`,
    `LOCATION:${icsEscape(booking.town)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** data: URL for the .ics so the download works without any client-side Blob creation. */
export function icsDataUrl(booking: Booking): string {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(buildIcs(booking))}`;
}

/** WhatsApp deep link mentioning the reference number. */
export function bookingWaLink(booking: Booking): string {
  return waLink(
    EVENT_COPY.whatsapp(SITE_NAME, booking.reference, booking.date, booking.slot, booking.town),
  );
}
