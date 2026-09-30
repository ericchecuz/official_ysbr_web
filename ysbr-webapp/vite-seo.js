import { readFileSync } from "node:fs";

/*
 * Scrive nell'index.html titolo, descrizione e dati strutturati (JSON-LD) per
 * i motori di ricerca, leggendoli da it.json: così testi e prezzi che vede
 * Google sono sempre gli stessi del sito, senza doverli copiare a mano.
 * Nell'HTML i segnaposto sono %SEO_TITLE% e %SEO_DESCRIPTION%.
 */

const SITE_URL = "https://www.ysbr.it/";

// Percorso della pagina -> chiave dei suoi testi in translations.meta
const PAGES = {
  "/": "home",
  "/kitesurf/": "kitesurf",
};

// Stessi dati del footer (App.jsx): se cambiano là vanno aggiornati anche qui
const ORGANIZATION = {
  name: "YESBRO ASD",
  alternateName: ["YSBR", "YSBR Fam"],
  email: "info@ysbr.it",
  vatID: "IT13630240961",
  taxID: "97970190159",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Carlo Cicogna Mozzoni 7",
    postalCode: "20161",
    addressLocality: "Milano",
    addressRegion: "MI",
    addressCountry: "IT",
  },
  sameAs: ["https://instagram.com/ysbrfam/"],
};

function readTranslations() {
  const file = new URL("./src/translations/it.json", import.meta.url);
  return JSON.parse(readFileSync(file, "utf8"));
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// "85 €/h" -> { price: "85", perHour: true }
function parsePrice(label) {
  const amount = label.match(/\d+(?:[.,]\d+)?/);
  return {
    price: amount ? amount[0].replace(",", ".") : null,
    perHour: /\/\s*h\b/i.test(label),
  };
}

function buildOffers(priceSections) {
  return priceSections.flatMap((section) =>
    section.entries.map((entry) => {
      const { price, perHour } = parsePrice(entry.price);
      const offer = {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: section.title },
        description: entry.note,
        price,
        priceCurrency: "EUR",
      };

      if (perHour) {
        offer.priceSpecification = {
          "@type": "UnitPriceSpecification",
          price,
          priceCurrency: "EUR",
          unitCode: "HUR",
        };
      }
      return offer;
    })
  );
}

function buildStructuredData(it) {
  const kite = it.courses.items.KITE;
  const organizationId = `${SITE_URL}#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsOrganization",
        "@id": organizationId,
        url: SITE_URL,
        logo: `${SITE_URL}logo.png`,
        ...ORGANIZATION,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: "YSBR",
        inLanguage: ["it", "en"],
        publisher: { "@id": organizationId },
      },
      {
        // Da collegare alla scheda Google Business: aggiungere qui telephone,
        // address e hasMap con gli stessi identici dati della scheda
        "@type": "SportsActivityLocation",
        "@id": `${SITE_URL}kitesurf/#school`,
        name: "YSBR Kitesurf School",
        url: `${SITE_URL}kitesurf/`,
        image: `${SITE_URL}og-image.jpg`,
        description: kite.description.join(" "),
        sport: "Kitesurfing",
        areaServed: { "@type": "Place", name: kite.location },
        parentOrganization: { "@id": organizationId },
        employee: (kite.people ?? []).map((person) => ({
          "@type": "Person",
          name: person.name,
          jobTitle: person.role,
        })),
        makesOffer: buildOffers(kite.priceSections),
      },
    ],
  };
}

export default function seo() {
  return {
    name: "ysbr-seo",
    transformIndexHtml(html, ctx) {
      // Riletto a ogni richiesta: in sviluppo le modifiche a it.json si vedono subito
      const it = readTranslations();
      const path = ctx.path.replace(/index\.html$/, "");
      const meta = it.meta[PAGES[path] ?? "home"];
      // "<" escapato: un testo con "</script>" non deve poter chiudere il tag
      const jsonLd = JSON.stringify(buildStructuredData(it)).replace(/</g, "\\u003c");

      return {
        html: html
          .replaceAll("%SEO_TITLE%", escapeHtml(meta.title))
          .replaceAll("%SEO_DESCRIPTION%", escapeHtml(meta.description)),
        tags: [
          {
            tag: "script",
            attrs: { type: "application/ld+json" },
            children: jsonLd,
            injectTo: "head",
          },
        ],
      };
    },
  };
}
