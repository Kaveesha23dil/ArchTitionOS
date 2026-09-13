import { canonicalUrl, type PageSeo, siteConfig } from "@/lib/site";

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: { "@id": `${siteConfig.url}/#organization` },
  inLanguage: "en",
};

export const softwareSchema = {
  "@type": "SoftwareApplication",
  "@id": `${siteConfig.url}/#software`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  applicationCategory: "OperatingSystem",
  operatingSystem: "Linux",
  publisher: { "@id": `${siteConfig.url}/#organization` },
};

export function pageSchema(page: PageSeo) {
  const url = canonicalUrl(page.path);
  return [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: page.title,
          description: page.description,
          isPartOf: { "@id": `${siteConfig.url}/#website` },
          about: { "@id": `${siteConfig.url}/#software` },
          inLanguage: "en",
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: siteConfig.name, item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: page.title, item: url },
          ],
        },
      ],
    },
  ];
}
