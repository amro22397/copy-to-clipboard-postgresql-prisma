

// import { MetadataRoute } from "next";
// import { getLocale } from "next-intl/server";


// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

//         const locale = await getLocale();


//     return [
//         {
//             url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`,
//             lastModified: new Date(),
//         }
//     ]
// }



import { MetadataRoute } from "next";

// Same locales you defined in routing.ts
const locales = ["en", "ar"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const routes = ["", "login", "register", "forgot-password"]; // your routes

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route ? `/${route}` : ""}`,
        lastModified: new Date(),
      });
    });
  });

  return sitemapEntries;
}