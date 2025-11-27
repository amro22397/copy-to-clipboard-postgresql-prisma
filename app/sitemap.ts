

import { MetadataRoute } from "next";
import { getLocale } from "next-intl/server";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

        const locale = await getLocale();


    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`,
            lastModified: new Date(),
        }
    ]
}