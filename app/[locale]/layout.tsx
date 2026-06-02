import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import AppProvider from "@/components/AppContext";
import { Providers } from "./provider";

import "./globals.css";
import { getUser } from "@/actions/getUser";
// import EmailIsNotVerified from "@/components/EmailIsNotVerified";

import { Analytics } from '@vercel/analytics/next';

import styles from "./layout.module.css"; 
import EmailIsNotVerified from "@/components/EmailIsNotVerified";
import { description, title } from "@/constants/title";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // const t = await getDictionary(params.locale); // returns translation object

  // const locale = params.locale;

  const { locale } = await params;

  return {
    metadataBase: new URL(`https://www.copy-to-clipboard.fyi`),
    // title: params.locale === "ar" ? "نبذة عنا" : "About Us - Work Remotely",
    
    title: {
      default: locale === "ar" ? title.ar : title.en,
      template: locale === "ar" ? `%s - ${title.ar}` : `%s - ${title.en}`,
    },

    description: locale === "ar" ? description.ar : description.en,

    twitter: {
      card: "summary_large_image",
    },

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },

  };
}




// export const metadata: Metadata = {
//   title: {
//     default: 'Copy to Clipboard - amro97',
//     template: '%s - Copy to Clipboard - amro97'
//   },
//   description: "This app to allow adding texts and copy them to clipboard",
//   twitter: {
//     card: 'summary_large_image'
//   }
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  const user = await getUser();
  const jUser = JSON.parse(JSON.stringify(user) || '{}')

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative
        ${locale === 'ar' ? styles.arabic : styles.english} overflow-x-hidden`}
      >
        <AppProvider session>
          <Providers>
            <NextIntlClientProvider messages={messages}>
            <EmailIsNotVerified />
              {children}
              <Analytics />

            </NextIntlClientProvider>
            <Toaster />
          </Providers>
        </AppProvider>
      </body>
    </html>
  );
}
