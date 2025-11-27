
import { MetadataRoute } from "next";
// import { getLocale } from "next-intl/server";


export default async function robots(): Promise<MetadataRoute.Robots> {

    // const locale = await getLocale();

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ["/api", "/emails"]
            }
        ],

        sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
    }
}







// - put this in the metadata of specific pages

// robots: {
//     index: false,
//     follow: true,
// }