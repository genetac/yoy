/* ════════════════════════════════════════════════════════════════════
   C Website Kits — hero kits WK-1…4 (Dental · Gym · Law · Restaurant)
   5 MDX pages of real copy, booking or contact flow, local-SEO
   checklist, JSON-LD schema, robots + sitemap, content model, deploy
   guide, root 4. The corrected "5 pages" promise: every page is a real
   authored file.
   ════════════════════════════════════════════════════════════════════ */

import { f, gen, type HeroDef } from "./shared";

function sitePages(prefix: string, pages: string[]): ReturnType<typeof f>[] {
  return pages.map((p) => f(`${prefix}/${p}.mdx`));
}

export const WK1: HeroDef = {
  offerId: "C-WK-1",
  example: "Dental Practice Kit",
  archetype: "website-kit",
  tierLetter: "C",
  title: "Dental Practice Kit",
  promise: "A complete dental site: 5 authored pages, booking flow and local-SEO pack",
  price: [134, 189],
  formats: ["MDX", "JSON", "Next.js", "PDF"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Five authored pages",
      promise: "5 pages",
      files: sitePages("01-pages", ["home", "services", "about", "team", "contact"]),
    },
    {
      id: "02",
      title: "Booking flow",
      promise: "Appointment form",
      files: [
        f("02-booking/booking-flow.mdx"),
        f("02-booking/confirmation-emails.md"),
      ],
    },
    {
      id: "03",
      title: "Local SEO pack",
      promise: "Insurance info + local SEO",
      files: [
        f("03-seo/local-seo-checklist.md"),
        f("03-seo/json-ld.json"),
        f("03-seo/robots.txt"),
        f("03-seo/sitemap.xml"),
      ],
    },
    {
      id: "04",
      title: "Content model + insurance FAQ",
      promise: "Insurance info",
      files: [
        f("04-content-model/content-model.md"),
        f("04-content-model/insurance-faq.mdx"),
      ],
    },
    {
      id: "05",
      title: "Deploy guide",
      promise: "Get running in under an hour",
      files: [
        gen("05-deploy/deploy-guide.pdf", "05-deploy/deploy-guide.md"),
        f("05-deploy/walkthrough-link.md"),
      ],
    },
  ],
  extended: [
    {
      path: "patient-portal-wireframes.md",
      what: "Wireframes and component specs for an optional secure patient portal (login, forms, visit history).",
      bytes: 9400,
    },
  ],
};

export const WK2: HeroDef = {
  offerId: "C-WK-2",
  example: "Gym & Fitness Kit",
  archetype: "website-kit",
  tierLetter: "C",
  title: "Gym & Fitness Kit",
  promise: "Class schedules, membership tiers and trainer profiles — all authored",
  price: [134, 189],
  formats: ["MDX", "JSON", "Next.js", "PDF"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Five authored pages",
      promise: "Class schedule",
      files: sitePages("01-pages", ["home", "classes", "memberships", "trainers", "contact"]),
    },
    {
      id: "02",
      title: "Signup flow",
      promise: "Membership tiers",
      files: [
        f("02-signup/membership-flow.mdx"),
        f("02-signup/confirmation-emails.md"),
      ],
    },
    {
      id: "03",
      title: "Local SEO pack",
      promise: "Trainer profiles + local SEO",
      files: [
        f("03-seo/local-seo-checklist.md"),
        f("03-seo/json-ld.json"),
        f("03-seo/robots.txt"),
        f("03-seo/sitemap.xml"),
      ],
    },
    {
      id: "04",
      title: "Content model + pricing FAQ",
      promise: "Progress gallery",
      files: [
        f("04-content-model/content-model.md"),
        f("04-content-model/pricing-faq.mdx"),
      ],
    },
    {
      id: "05",
      title: "Deploy guide",
      promise: "Get running in under an hour",
      files: [
        gen("05-deploy/deploy-guide.pdf", "05-deploy/deploy-guide.md"),
        f("05-deploy/walkthrough-link.md"),
      ],
    },
  ],
  extended: [
    {
      path: "member-app-wireframes.md",
      what: "Wireframes for a companion member app: bookings, streaks and class waitlist flows.",
      bytes: 8900,
    },
  ],
};

export const WK3: HeroDef = {
  offerId: "C-WK-3",
  example: "Law Firm Kit",
  archetype: "website-kit",
  tierLetter: "C",
  title: "Law Firm Kit",
  promise: "Practice areas, attorney bios and a confidential intake form — authored",
  price: [149, 219],
  formats: ["MDX", "JSON", "Next.js", "PDF"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Five authored pages",
      promise: "Practice areas",
      files: sitePages("01-pages", ["home", "practice-areas", "attorneys", "results", "contact"]),
    },
    {
      id: "02",
      title: "Intake flow",
      promise: "Consultation form",
      files: [
        f("02-intake/intake-flow.mdx"),
        f("02-intake/confirmation-emails.md"),
      ],
    },
    {
      id: "03",
      title: "Local SEO pack",
      promise: "Case results + local SEO",
      files: [
        f("03-seo/local-seo-checklist.md"),
        f("03-seo/json-ld.json"),
        f("03-seo/robots.txt"),
        f("03-seo/sitemap.xml"),
      ],
    },
    {
      id: "04",
      title: "Content model + legal disclaimer set",
      promise: "Attorney bios",
      files: [
        f("04-content-model/content-model.md"),
        f("04-content-model/disclaimers.mdx"),
      ],
    },
    {
      id: "05",
      title: "Deploy guide",
      promise: "Get running in under an hour",
      files: [
        gen("05-deploy/deploy-guide.pdf", "05-deploy/deploy-guide.md"),
        f("05-deploy/walkthrough-link.md"),
      ],
    },
  ],
  extended: [
    {
      path: "client-portal-wireframes.md",
      what: "Specs for a secure client messaging and document-upload portal, aligned to the intake flow.",
      bytes: 9100,
    },
  ],
};

export const WK4: HeroDef = {
  offerId: "C-WK-4",
  example: "Restaurant Kit",
  archetype: "website-kit",
  tierLetter: "C",
  title: "Restaurant Kit",
  promise: "Full menu, reservation flow and events page — authored end to end",
  price: [134, 189],
  formats: ["MDX", "JSON", "Next.js", "PDF"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Five authored pages",
      promise: "Full menu",
      files: sitePages("01-pages", ["home", "menu", "reservations", "events", "contact"]),
    },
    {
      id: "02",
      title: "Reservation flow",
      promise: "Reservation widget",
      files: [
        f("02-reservations/reservation-flow.mdx"),
        f("02-reservations/confirmation-emails.md"),
      ],
    },
    {
      id: "03",
      title: "Local SEO pack",
      promise: "Photo gallery + local SEO",
      files: [
        f("03-seo/local-seo-checklist.md"),
        f("03-seo/json-ld.json"),
        f("03-seo/robots.txt"),
        f("03-seo/sitemap.xml"),
      ],
    },
    {
      id: "04",
      title: "Content model + menu schema",
      promise: "Events page",
      files: [
        f("04-content-model/content-model.md"),
        f("04-content-model/menu-data.mdx"),
      ],
    },
    {
      id: "05",
      title: "Deploy guide",
      promise: "Get running in under an hour",
      files: [
        gen("05-deploy/deploy-guide.pdf", "05-deploy/deploy-guide.md"),
        f("05-deploy/walkthrough-link.md"),
      ],
    },
  ],
  extended: [
    {
      path: "online-ordering-wireframes.md",
      what: "Wireframes for add-on online ordering: menu cart, checkout and kitchen ticket views.",
      bytes: 9600,
    },
  ],
};

export const WEBSITE_KIT_HEROES = [WK1, WK2, WK3, WK4];
