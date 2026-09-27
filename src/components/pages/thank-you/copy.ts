// Page-local copy for the "Add to calendar" menu and the calendar / WhatsApp prefills.
// (src/content/contact.ts is owned by the content author; move these into THANK_YOU.calendarMenu
// and THANK_YOU.event there when it is next edited.)

export const CALENDAR_MENU = {
  ariaLabel: "Add to calendar",
  google: { title: "Google Calendar", sub: "Opens in a new tab" },
  ics: { title: "Apple, Outlook or other (.ics)", sub: "Downloads a calendar file" },
  /** `${prefix}-${reference}.ics` */
  filePrefix: "shivansh-site-visit",
} as const;

export const EVENT_COPY = {
  /** "Site visit — Shivansh Interior Solutions" */
  title: (siteName: string) => `Site visit — ${siteName}`,
  details: (siteName: string, planning: string, town: string, reference: string) =>
    [
      `Free site visit with ${siteName}.`,
      `Planning: ${planning}.`,
      `Town: ${town}.`,
      `Reference: ${reference}.`,
      "The exact time is confirmed on WhatsApp.",
    ].join(" "),
  location: (town: string, siteName: string, address: string) =>
    `${town} (visit by ${siteName}, ${address})`,
  whatsapp: (siteName: string, reference: string, date: string, slot: string, town: string) =>
    `Hello ${siteName}, I have booked a free site visit (reference ${reference}) for ${date}, ${slot}, in ${town}. Could you confirm the exact time?`,
} as const;
