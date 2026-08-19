import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  MapPin,
  Menu,
  X,
  Clock,
  Ruler,
  Hammer,
  Sofa,
  Lightbulb,
  DoorOpen,
  ArrowRight,
} from "lucide-react";

import logo from "@/assets/shivansh-logo.png.asset.json";
import heroLiving from "@/assets/hero-living.jpg";
import workKitchen from "@/assets/work-kitchen.jpg";
import workBedroom from "@/assets/work-bedroom.jpg";
import workOffice from "@/assets/work-office.jpg";
import craft from "@/assets/craft.jpg";

const PHONE = "9783586683";
const PHONE_INTL = "919783586683";
const WHATSAPP = `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(
  "Hello Shivansh Interior Solutions, I would like to discuss an interior project.",
)}`;
const ADDRESS =
  "Sambhar Lake, Nawa Road, Sambhar, District Jaipur, Rajasthan 303604";
const MAP_QUERY = encodeURIComponent(
  "Sambhar Lake, Nawa Road, Sambhar, Jaipur, Rajasthan 303604",
);
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&z=13&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Shivansh Interior Solutions | Interiors in Sambhar, Jaipur",
      },
      {
        name: "description",
        content:
          "Shivansh Interior Solutions designs and builds modular kitchens, wardrobes, false ceilings and complete home interiors across Sambhar and Jaipur. Call 9783586683.",
      },
      {
        property: "og:title",
        content: "Shivansh Interior Solutions | Interiors in Sambhar, Jaipur",
      },
      {
        property: "og:description",
        content:
          "Turnkey interiors, modular kitchens and custom woodwork by Dinesh Choudhary. Serving Sambhar, Nawa and Jaipur.",
      },
    ],
  }),
  component: Home,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Sofa,
    title: "Complete Home Interiors",
    text: "Turnkey interiors for 1BHK to villas — layout, furniture, finishes and styling handled end to end.",
  },
  {
    icon: Hammer,
    title: "Modular Kitchens",
    text: "Hardware-grade, moisture-resistant modular kitchens built around how your family actually cooks.",
  },
  {
    icon: DoorOpen,
    title: "Wardrobes & Storage",
    text: "Floor-to-ceiling wardrobes, lofts, TV units and custom carpentry finished on site.",
  },
  {
    icon: Lightbulb,
    title: "False Ceiling & Lighting",
    text: "POP and gypsum ceilings with layered profile lighting that makes every room feel larger.",
  },
  {
    icon: Ruler,
    title: "Wall Panelling & Flooring",
    text: "WPC and louvre panelling, wallpapers, laminates, vinyl and wooden flooring.",
  },
  {
    icon: Clock,
    title: "Renovation & Repair",
    text: "Room-by-room renovation, painting and furniture repair with clean, on-time site work.",
  },
];

const WORK = [
  { img: workKitchen, title: "Teal & Copper Kitchen", place: "Sambhar" },
  { img: workBedroom, title: "Master Bedroom Suite", place: "Jaipur" },
  { img: workOffice, title: "Office Panelling", place: "Nawa" },
];

const PROCESS = [
  {
    step: "01",
    title: "Free Site Visit",
    text: "We measure your space, understand the family's needs and note every constraint.",
  },
  {
    step: "02",
    title: "Design & Quote",
    text: "Layouts, material samples and a transparent, itemised estimate — no hidden costs.",
  },
  {
    step: "03",
    title: "Craft & Install",
    text: "Seasoned carpenters, quality hardware and daily progress updates on WhatsApp.",
  },
  {
    step: "04",
    title: "Handover & Care",
    text: "Deep clean, walkthrough and after-service support on all fittings we install.",
  },
];

function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div id="home" className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs">
          <span className="inline-flex items-center gap-2 opacity-90">
            <MapPin className="size-3.5" /> {ADDRESS}
          </span>
          <a
            href={`tel:+${PHONE_INTL}`}
            className="inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-75"
          >
            <Phone className="size-3.5" /> +91 {PHONE}
          </a>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <a href="#home" className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="Shivansh Interior Solutions logo"
              width={160}
              height={107}
              className="h-11 w-auto mix-blend-multiply"
            />
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-copper"
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-sm bg-copper px-4 py-2.5 text-sm font-semibold text-copper-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-sm border border-border text-foreground lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-border bg-background lg:hidden">
            <div className="mx-auto flex max-w-6xl flex-col px-6 py-3">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/60 py-3 text-sm font-medium last:border-0"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={`tel:+${PHONE_INTL}`}
                className="py-3 text-sm font-semibold text-copper"
              >
                Call +91 {PHONE}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative">
        <img
          src={heroLiving}
          alt="Modern living room interior with wooden panelling designed by Shivansh Interior Solutions"
          width={1600}
          height={1104}
          className="h-[78vh] min-h-[520px] w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="rise max-w-2xl">
              <p className="eyebrow text-sand">Sambhar · Nawa · Jaipur</p>
              <h1 className="mt-4 text-4xl leading-[1.05] text-background sm:text-6xl">
                Interiors built with
                <span className="block italic text-copper">
                  craft, not shortcuts.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-background/80">
                Shivansh Interior Solutions designs and executes modular
                kitchens, wardrobes, ceilings and complete home interiors —
                measured, manufactured and installed by our own team.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-copper px-6 py-3.5 text-sm font-semibold text-copper-foreground shadow-lift transition-transform hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="size-4" /> Chat on WhatsApp
                </a>
                <a
                  href={`tel:+${PHONE_INTL}`}
                  className="inline-flex items-center gap-2 rounded-sm border border-background/50 px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-background/10"
                >
                  <Phone className="size-4" /> +91 {PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-6 py-10 sm:grid-cols-4">
          {[
            ["12+", "Years of experience"],
            ["350+", "Spaces delivered"],
            ["100%", "In-house execution"],
            ["On time", "Committed handover"],
          ].map(([big, small]) => (
            <div key={small} className="px-2 text-center">
              <p className="font-display text-3xl text-primary">{big}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {small}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src={craft}
              alt="Carpenter installing wooden wall panelling on site"
              width={1200}
              height={900}
              loading="lazy"
              className="w-full rounded-sm object-cover shadow-lift"
            />
            <div className="absolute -bottom-6 -right-2 hidden rounded-sm bg-primary px-6 py-5 text-primary-foreground shadow-lift sm:block">
              <p className="font-display text-xl">Dinesh Choudhary</p>
              <p className="text-xs uppercase tracking-widest opacity-75">
                Founder
              </p>
            </div>
          </div>
          <div>
            <p className="eyebrow">About us</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              A local team that treats your home like its own
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Founded by <strong className="text-foreground">Dinesh Choudhary</strong>,
              Shivansh Interior Solutions is a Sambhar-based interior firm
              serving homes, shops and offices across Nawa and the Jaipur
              district. We keep design, carpentry and installation under one
              roof, so quality never gets lost between contractors.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From a single wardrobe to a full turnkey flat, every project runs
              on honest material lists, fixed timelines and finishes that still
              look sharp years later.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Free site visit & consultation",
                "Branded, warranty-backed hardware",
                "Transparent itemised quotation",
                "Daily site updates on WhatsApp",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-copper" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Everything your space needs, under one roof
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group bg-card p-8 transition-colors hover:bg-primary"
              >
                <s.icon className="size-7 text-copper" strokeWidth={1.4} />
                <h3 className="mt-5 text-lg text-primary transition-colors group-hover:text-primary-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/75">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Recent installations</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-copper"
          >
            Start your project <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {WORK.map((w) => (
            <figure key={w.title} className="group overflow-hidden rounded-sm">
              <img
                src={w.img}
                alt={`${w.title} interior project in ${w.place}`}
                width={1000}
                height={1000}
                loading="lazy"
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="flex items-baseline justify-between border-x border-b border-border bg-card px-5 py-4">
                <span className="font-display text-lg text-primary">
                  {w.title}
                </span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {w.place}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 max-w-xl text-3xl text-primary-foreground sm:text-4xl">
            Four simple steps from idea to handover
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.step} className="border-t border-primary-foreground/25 pt-5">
                <span className="font-display text-4xl text-copper">{p.step}</span>
                <h3 className="mt-3 text-lg text-primary-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Map */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Let's plan your interiors
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Tap the number to call directly, or message us on WhatsApp with
              your floor plan and we'll send an estimate.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`tel:+${PHONE_INTL}`}
                className="flex items-center gap-4 rounded-sm border border-border bg-card p-5 transition-colors hover:border-copper"
              >
                <span className="flex size-11 items-center justify-center rounded-sm bg-copper text-copper-foreground">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                    Call us
                  </span>
                  <span className="font-display text-xl text-primary">
                    +91 {PHONE}
                  </span>
                </span>
              </a>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-sm border border-border bg-card p-5 transition-colors hover:border-copper"
              >
                <span className="flex size-11 items-center justify-center rounded-sm bg-whatsapp text-primary-foreground">
                  <WhatsAppIcon className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                    WhatsApp
                  </span>
                  <span className="font-display text-xl text-primary">
                    Message +91 {PHONE}
                  </span>
                </span>
              </a>

              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 rounded-sm border border-border bg-card p-5 transition-colors hover:border-copper"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                  <MapPin className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                    Visit our workshop
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-foreground">
                    Sambhar Lake, Nawa Road, Sambhar
                    <br />
                    District Jaipur, Rajasthan — 303604
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-sm border border-border shadow-soft">
            <iframe
              title="Shivansh Interior Solutions location on Google Maps"
              src={MAP_EMBED}
              className="h-[420px] w-full lg:h-full"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
          <div>
            <img
              src={logo.url}
              alt="Shivansh Interior Solutions"
              width={200}
              height={134}
              loading="lazy"
              className="h-14 w-auto mix-blend-multiply"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Interior design and execution for homes, shops and offices across
              Sambhar, Nawa and Jaipur.
            </p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-widest text-primary">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-copper">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-widest text-primary">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>Dinesh Choudhary — Founder</li>
              <li>
                <a
                  href={`tel:+${PHONE_INTL}`}
                  className="transition-colors hover:text-copper"
                >
                  +91 {PHONE}
                </a>
              </li>
              <li>{ADDRESS}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Shivansh Interior Solutions. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-lift transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.35c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24z" />
    </svg>
  );
}
