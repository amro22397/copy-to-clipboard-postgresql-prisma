import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

import AppProvider from "@/components/AppContext";
import { Providers } from "./provider";

import "./globals.css";
import { getUser } from "@/actions/getUser";
import EmailIsNotVerified from "@/components/EmailIsNotVerified";

import { Analytics } from '@vercel/analytics/next';

import styles from "./layout.module.css"; 



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Copy to Clipboard",
  description: "This app to allow adding texts and copy them to clipboard",
};

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
        ${locale === 'ar' ? styles.arabic : styles.english}`}
      >
        <AppProvider session>
          <Providers>
            <NextIntlClientProvider messages={messages}>
            
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
