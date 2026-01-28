import { routing } from "@/i18n/routing";
import "@/styles/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Geist, Inter } from "next/font/google";
import { notFound } from "next/navigation";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    setRequestLocale(locale);
    return (
        <html lang={locale}>
            <body
                className={`${geistSans.variable} ${inter.variable} antialiased`}
            >
                <NextIntlClientProvider >{children}</NextIntlClientProvider>
            </body>
        </html>
    );
}
