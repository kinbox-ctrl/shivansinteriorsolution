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
  Sparkles,
  Mail,
} from "lucide-react";

import logo from "@/assets/logo.png";
import heroLiving from "@/assets/hero-living.jpg";
import workKitchen from "@/assets/work-kitchen.jpg";
import workBedroom from "@/assets/work-bedroom.jpg";
import workOffice from "@/assets/work-office.jpg";
import craft from "@/assets/craft.jpg";

const PHONE = "9783586683";
const PHONE_INTL = "919783586683";
const EMAIL = "enquiry@shivansinteriorsolution.co.in";
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
  { label: "Estimator", href: "#budget" },
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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const rx = -(y / (box.height / 2)) * 6; // Max 6 degrees rotation
    const ry = (x / (box.width / 2)) * 6; // Max 6 degrees rotation
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <div id="home" className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs">
          <span className="inline-flex items-center gap-2 opacity-90">
            <MapPin className="size-3.5" /> {ADDRESS}
          </span>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-75"
            >
              <Mail className="size-3.5" /> {EMAIL}
            </a>
            <a
              href={`tel:+${PHONE_INTL}`}
              className="inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-75"
            >
              <Phone className="size-3.5" /> +91 {PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl transition-all duration-300">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="#home" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <img
              src={logo}
              alt="Shivansh Interior Solutions logo"
              width={160}
              height={107}
              className="h-12 w-auto object-contain mix-blend-multiply"
            />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-copper py-1.5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-copper after:transition-all after:duration-300 hover:after:w-full"
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
              className="hidden items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-sm font-semibold text-copper-foreground shadow-soft hover:shadow-copper-glow hover:-translate-y-0.5 transition-all duration-300 sm:inline-flex"
            >
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border/80 text-foreground hover:bg-secondary/50 transition-colors lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl lg:hidden">
            <div className="mx-auto flex max-w-6xl flex-col px-6 py-4 space-y-1">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg py-2.5 px-3 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
                >
                  {n.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border/40 flex flex-col gap-2">
                <a
                  href={`tel:+${PHONE_INTL}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-border/80 py-2.5 text-sm font-semibold text-primary hover:bg-secondary transition-colors"
                >
                  <Phone className="size-4" /> Call +91 {PHONE}
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-border/80 py-2.5 text-sm font-semibold text-primary hover:bg-secondary transition-colors"
                >
                  <Mail className="size-4" /> Email us
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-copper py-2.5 text-sm font-semibold text-copper-foreground shadow-soft hover:shadow-copper-glow transition-all"
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroLiving}
          alt="Modern living room interior with wooden panelling designed by Shivansh Interior Solutions"
          width={1600}
          height={1104}
          className="h-[80vh] min-h-[580px] w-full object-cover transition-transform duration-[10000ms] hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="rise max-w-xl glass-panel p-8 md:p-10 rounded-2xl shadow-3d border border-white/25 tilt-3d"
            >
              <p className="eyebrow text-copper font-semibold tracking-wider">Sambhar · Nawa · Jaipur</p>
              <h1 className="mt-4 text-3xl sm:text-5xl font-semibold leading-tight text-primary font-display">
                Interiors built with{" "}
                <span className="text-gradient-copper block italic font-bold">
                  craft, not shortcuts.
                </span>
              </h1>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                Shivansh Interior Solutions designs and executes modular
                kitchens, wardrobes, false ceilings, and complete home interiors —
                measured, manufactured, and installed by our in-house team.
              </p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3.5 text-sm font-semibold text-copper-foreground shadow-lift hover:shadow-copper-glow hover:-translate-y-0.5 transition-all duration-300"
                >
                  <WhatsAppIcon className="size-4" /> Chat on WhatsApp
                </a>
                <a
                  href={`tel:+${PHONE_INTL}`}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-primary hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Phone className="size-4" /> +91 {PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* Stats */}
      <section className="border-b border-border/40 bg-secondary/50 backdrop-blur-sm relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ["12+", "Years of experience"],
              ["350+", "Spaces delivered"],
              ["100%", "In-house execution"],
              ["On time", "Committed handover"],
            ].map(([big, small], idx) => (
              <div key={small} className={`text-center px-4 md:border-l first:border-0 border-border/40`}>
                <p className="font-display text-4xl font-bold text-copper tracking-tight">{big}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {small}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-24 reveal">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative perspective-scene">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-copper/10 to-transparent -z-10 blur-xl" />
            <img
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              src={craft}
              alt="Carpenter installing wooden wall panelling on site"
              width={1200}
              height={900}
              loading="lazy"
              className="w-full rounded-xl object-cover shadow-3d transition-transform duration-500 hover:scale-[1.01] tilt-3d"
            />
            <div className="absolute -bottom-6 -right-6 rounded-xl bg-primary/95 backdrop-blur-md px-6 py-4 text-primary-foreground shadow-lift border border-white/10">
              <p className="font-display text-lg font-semibold text-white">Dinesh Choudhary</p>
              <p className="text-[10px] uppercase tracking-widest text-copper font-medium mt-0.5">
                Founder & Chief Craftsman
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <p className="eyebrow">About us</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold leading-tight text-primary font-display">
                A local team that treats your home like its own
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Founded by <strong className="text-foreground font-semibold">Dinesh Choudhary</strong>,
              Shivansh Interior Solutions is a Sambhar-based interior firm
              serving homes, shops, and offices across Nawa and the Jaipur
              district. We keep design, carpentry, and installation under one
              roof, so quality never gets lost between contractors.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              From a single wardrobe to a full turnkey flat, every project runs
              on honest material lists, fixed timelines, and finishes that still
              look sharp years later.
            </p>
            <ul className="grid gap-4 pt-2 sm:grid-cols-2">
              {[
                "Free site visit & consultation",
                "Branded, warranty-backed hardware",
                "Transparent itemised quotation",
                "Daily site updates on WhatsApp",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-foreground/80">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-copper/15 text-copper">
                    <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-secondary/40 py-24 border-y border-border/30 reveal">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold leading-tight text-primary font-display">
              Everything your space needs, under one roof
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group relative bg-card p-8 rounded-xl border border-border/40 shadow-sm hover:shadow-soft hover:border-copper/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex size-12 items-center justify-center rounded-lg bg-copper/10 text-copper transition-all duration-300 group-hover:bg-copper group-hover:text-white">
                    <s.icon className="size-6" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-primary font-display">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>
                <div className="mt-6 h-0.5 w-8 bg-copper/20 group-hover:w-16 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-24 reveal">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold leading-tight text-primary font-display">Recent installations</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-copper hover:text-primary transition-colors group"
          >
            Start your project <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3 perspective-scene">
          {WORK.map((w) => (
            <div
              key={w.title}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group cursor-pointer overflow-hidden rounded-xl border border-border/30 bg-card shadow-sm hover:shadow-soft transition-all duration-300 tilt-3d"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={w.img}
                  alt={`${w.title} interior project in ${w.place}`}
                  width={1000}
                  height={1000}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                  {w.place}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-primary group-hover:text-copper transition-colors duration-300">
                  {w.title}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                  <span>Premium Materials</span>
                  <span className="size-1 rounded-full bg-border" />
                  <span>In-House Craft</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Before/After Showcase */}
        <div className="mt-24 max-w-4xl mx-auto reveal">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="eyebrow flex items-center justify-center gap-1.5">
              <Sparkles className="size-3.5" /> Interactive Concept
            </span>
            <h3 className="mt-3 text-2xl sm:text-4xl font-semibold font-display text-primary">Blueprint to Reality</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Drag the slider to see how we transform raw design concepts and technical layouts into beautifully executed, modular spaces.
            </p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-primary py-24 text-primary-foreground relative overflow-hidden reveal">
        {/* Background decorative glowing circles for premium vibe */}
        <div className="absolute -left-20 -top-20 size-80 rounded-full bg-copper/5 blur-[120px]" />
        <div className="absolute -right-20 -bottom-20 size-80 rounded-full bg-copper/5 blur-[120px]" />

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-2xl">
            <p className="eyebrow text-copper/80">How it works</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight font-display">
              Four simple steps from idea to handover
            </h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.step} className="group relative border-t border-white/10 pt-8 hover:border-copper/50 transition-colors duration-300">
                <div className="absolute top-0 right-0 -translate-y-1/2 font-display text-7xl font-bold opacity-[0.03] group-hover:opacity-10 group-hover:text-copper transition-all duration-500">
                  {p.step}
                </div>
                <span className="font-display text-3xl font-bold text-copper tracking-tight">{p.step}</span>
                <h3 className="mt-4 text-xl font-medium text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Budget Estimator */}
      <section id="budget" className="bg-secondary/40 py-24 border-y border-border/30 reveal">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="eyebrow flex items-center justify-center gap-1.5">
              <Sparkles className="size-3.5" /> Budget Planner
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display text-primary">Quick Estimate Calculator</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Estimate your custom woodwork or modular interior budget dynamically. Tweak space specifications and get instant results.
            </p>
          </div>
          <BudgetPlanner />
        </div>
      </section>

      {/* Contact + Map */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-24 reveal">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold leading-tight text-primary font-display">
              Let's plan your interiors
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Tap the number to call directly, or message us on WhatsApp with
              your floor plan and we'll send an estimate.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`tel:+${PHONE_INTL}`}
                className="flex items-center gap-5 rounded-xl border border-border/40 bg-card p-6 shadow-sm hover:shadow-soft hover:border-copper/30 transition-all duration-300 group"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-copper/10 text-copper group-hover:bg-copper group-hover:text-white transition-colors duration-300">
                  <Phone className="size-5" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                    Call us
                  </span>
                  <span className="font-display text-xl font-semibold text-primary mt-0.5 block group-hover:text-copper transition-colors duration-300">
                    +91 {PHONE}
                  </span>
                </div>
              </a>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-5 rounded-xl border border-border/40 bg-card p-6 shadow-sm hover:shadow-soft hover:border-copper/30 transition-all duration-300 group"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-whatsapp/10 text-whatsapp group-hover:bg-whatsapp group-hover:text-white transition-colors duration-300">
                  <WhatsAppIcon className="size-5" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                    WhatsApp
                  </span>
                  <span className="font-display text-xl font-semibold text-primary mt-0.5 block group-hover:text-whatsapp transition-colors duration-300">
                    Message +91 {PHONE}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-5 rounded-xl border border-border/40 bg-card p-6 shadow-sm hover:shadow-soft hover:border-copper/30 transition-all duration-300 group"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-copper/10 text-copper group-hover:bg-copper group-hover:text-white transition-colors duration-300">
                  <Mail className="size-5" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                    Email us
                  </span>
                  <span className="font-display text-lg font-semibold text-primary mt-0.5 block group-hover:text-copper transition-colors duration-300">
                    {EMAIL}
                  </span>
                </div>
              </a>

              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-5 rounded-xl border border-border/40 bg-card p-6 shadow-sm hover:shadow-soft hover:border-copper/30 transition-all duration-300 group"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                    Visit our workshop
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-foreground/80">
                    Sambhar Lake, Nawa Road, Sambhar
                    <br />
                    District Jaipur, Rajasthan — 303604
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/40 shadow-soft min-h-[420px] h-full transition-shadow duration-300 hover:shadow-lift">
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
      <footer className="border-t border-border/45 bg-secondary/30">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-3">
          <div className="space-y-4">
            <img
              src={logo}
              alt="Shivansh Interior Solutions"
              width={200}
              height={134}
              loading="lazy"
              className="h-14 w-auto object-contain mix-blend-multiply"
            />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Interior design and execution for homes, shops, and offices across
              Sambhar, Nawa, and Jaipur.
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-primary font-bold">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
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
            <h3 className="text-xs uppercase tracking-widest text-primary font-bold">
              Contact
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm text-muted-foreground">
              <li className="text-foreground font-medium">Dinesh Choudhary — Founder</li>
              <li>
                <a
                  href={`tel:+${PHONE_INTL}`}
                  className="transition-colors hover:text-copper font-medium"
                >
                  +91 {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="transition-colors hover:text-copper font-medium"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="leading-relaxed">{ADDRESS}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40">
          <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-muted-foreground">
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

function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden shadow-3d border border-border/30 select-none">
      {/* After Image (Full Color) */}
      <img
        src={workKitchen}
        alt="Finished Modular Kitchen"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/10 z-10 font-semibold tracking-wider">
        Finished Reality
      </div>

      {/* Before Image (Blueprint / 3D Layout Effect) */}
      <div
        className="absolute inset-0 overflow-hidden border-r border-white/40"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={workKitchen}
          alt="Design Blueprint Concept"
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.8] brightness-[0.7] sepia hue-rotate-[200deg] saturate-[3.5]"
          style={{ width: "100%", maxWidth: "none", height: "100%" }}
          loading="lazy"
        />
        <div className="absolute bottom-4 left-4 bg-copper/90 backdrop-blur-md text-copper-foreground text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/10 z-10 font-semibold tracking-wider whitespace-nowrap">
          Blueprint / 3D Design
        </div>
      </div>

      {/* Divider Bar */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize z-20"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lift font-bold text-lg border border-border/40 select-none hover:scale-105 transition-transform pointer-events-none">
          <svg className="size-4 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 4 4 4m8 0l4-4-4-4" />
          </svg>
        </div>
      </div>

      {/* Range Input over top to trigger dragging */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        aria-label="Before/After Slider"
      />
    </div>
  );
}

function BudgetPlanner() {
  const [space, setSpace] = useState("kitchen");
  const [grade, setGrade] = useState("premium");
  const [size, setSize] = useState(120);

  const getBaseCost = () => {
    switch (space) {
      case "kitchen": return 1350;
      case "wardrobe": return 1550;
      case "ceiling": return 120;
      case "full": return 480000;
      default: return 1200;
    }
  };

  const getMultiplier = () => {
    switch (grade) {
      case "standard": return 1.0;
      case "premium": return 1.35;
      case "luxury": return 1.75;
      default: return 1.0;
    }
  };

  const baseCost = getBaseCost();
  const multiplier = getMultiplier();
  const isFlatCost = space === "full";
  const totalCost = isFlatCost ? Math.round(baseCost * multiplier) : Math.round(baseCost * size * multiplier);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getWhatsAppLink = () => {
    const spaceText = {
      kitchen: "Modular Kitchen",
      wardrobe: "Wardrobes & Storage",
      ceiling: "False Ceiling & Lighting",
      full: "Complete Home Interiors (2BHK/3BHK)",
    }[space];

    const gradeText = {
      standard: "Standard (MR Plywood + Laminate)",
      premium: "Premium (BWP Marine Plywood + Acrylic)",
      luxury: "Luxury (HDHMR/Boilo + PU Paint/Blum Hardware)",
    }[grade];

    const sizeText = isFlatCost ? "" : ` of size ${size} sq.ft.`;
    const estimationRange = `${formatCurrency(totalCost * 0.95)} - ${formatCurrency(totalCost * 1.08)}`;
    const message = `Hello Dinesh, I calculated a budget estimate on your website. I want a ${spaceText}${sizeText} using ${gradeText} materials. The estimated budget is around ${estimationRange}. Let's discuss!`;
    return `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(message)}`;
  };

  const sizeLimits = {
    kitchen: { min: 50, max: 250, label: "Kitchen Area (sq.ft.)" },
    wardrobe: { min: 30, max: 200, label: "Wardrobe Area (sq.ft.)" },
    ceiling: { min: 80, max: 1200, label: "Ceiling Area (sq.ft.)" },
    full: { min: 0, max: 0, label: "" },
  }[space] || { min: 50, max: 250, label: "Area" };

  return (
    <div className="bg-card rounded-2xl border border-border/40 p-6 md:p-10 shadow-3d max-w-4xl mx-auto">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-primary font-display flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-copper/10 text-copper">
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </span>
              Select Space & Grade
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              Select the area and quality standard you want for your space.
            </p>
          </div>

          {/* Space selector tabs */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block">1. Space Type</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["kitchen", "Modular Kitchen"],
                ["wardrobe", "Wardrobes"],
                ["ceiling", "Ceiling & Lights"],
                ["full", "Complete Flat"],
              ].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => {
                    setSpace(val);
                    if (val === "kitchen") setSize(120);
                    if (val === "wardrobe") setSize(80);
                    if (val === "ceiling") setSize(300);
                  }}
                  className={`py-2.5 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                    space === val
                      ? "bg-primary border-primary text-white shadow-sm"
                      : "bg-secondary/40 border-border/50 text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Size slider (hidden if flat cost) */}
          {!isFlatCost && (
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  2. {sizeLimits.label}
                </span>
                <span className="text-sm font-semibold text-copper font-display">
                  {size} sq.ft.
                </span>
              </div>
              <input
                type="range"
                min={sizeLimits.min}
                max={sizeLimits.max}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-copper"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>{sizeLimits.min} sq.ft.</span>
                <span>{sizeLimits.max} sq.ft.</span>
              </div>
            </div>
          )}

          {/* Material Quality Selectors */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block">3. Material Quality</span>
            <div className="flex flex-col gap-2">
              {[
                ["standard", "Standard Quality", "MR Plywood, Matte Laminates, Classic Fittings"],
                ["premium", "Premium (Recommended)", "BWP Waterproof Plywood, Acrylic/High Gloss, Soft-close Hardware"],
                ["luxury", "Luxury Grade", "HDHMR/Boilo, PU Paint, Blum/Hettich German hardware"],
              ].map(([val, name, desc]) => (
                <button
                  key={val}
                  onClick={() => setGrade(val)}
                  className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    grade === val
                      ? "bg-copper/5 border-copper shadow-sm"
                      : "bg-secondary/20 border-border/40 text-foreground/80 hover:bg-secondary/50"
                  }`}
                >
                  <span className={`flex size-4 items-center justify-center rounded-full mt-0.5 border ${
                    grade === val ? "border-copper bg-copper text-white" : "border-border"
                  }`}>
                    {grade === val && <span className="size-1.5 rounded-full bg-white" />}
                  </span>
                  <div>
                    <span className={`block text-xs font-semibold ${grade === val ? "text-copper" : "text-primary"}`}>
                      {name}
                    </span>
                    <span className="block text-[10px] text-muted-foreground mt-0.5">
                      {desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Result Screen */}
        <div className="bg-secondary/60 rounded-xl p-6 md:p-8 flex flex-col justify-between border border-border/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 size-40 rounded-full bg-copper/5 blur-3xl pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block">Estimated Budget Range</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-bold font-display text-primary tracking-tight">
                  {formatCurrency(totalCost * 0.95)}
                </span>
                <span className="text-sm text-muted-foreground font-semibold">to</span>
                <span className="text-2xl md:text-3xl font-bold font-display text-copper tracking-tight">
                  {formatCurrency(totalCost * 1.08)}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                *Itemised quotation will be provided after detailed site measurements. GST and lighting profiles included.
              </p>
            </div>

            {/* Inclusions checklist based on Material */}
            <div className="border-t border-border/50 pt-5 space-y-3.5">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest block">What's Included</span>
              <ul className="grid gap-2 text-xs text-foreground/80">
                <li className="flex items-center gap-2">
                  <span className="text-copper">✓</span>
                  <span>{grade === "luxury" ? "Lifetime Warranty German Soft-Close Systems" : "5-10 Years Warranty Branded Hardware"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-copper">✓</span>
                  <span>{grade === "standard" ? "Commercial MR Grade Plywood" : grade === "premium" ? "BWP Marine Grade Plywood" : "HDHMR & Waterproof Boilo Planks"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-copper">✓</span>
                  <span>Professional 2D drawings & Site Supervision</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-copper">✓</span>
                  <span>Deep clean post-installation & handover</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-border/50 mt-6 relative z-10">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-full bg-copper py-3.5 text-sm font-semibold text-copper-foreground shadow-lift hover:shadow-copper-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              <WhatsAppIcon className="size-4" /> Send this Estimate on WhatsApp
            </a>
          </div>
        </div>
      </div>
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
