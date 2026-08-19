import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { config } from "@/config";
import { Providers } from "./providers";

const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const fontSerif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(config.baseUrl),
  title: {
    default: config.title,
    template: `%s | ${config.title}`,
  },
  description: config.description,
  applicationName: config.title,
  authors: [{ name: config.organization, url: config.baseUrl }],
  creator: config.organization,
  publisher: config.organization,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: config.baseUrl,
    siteName: config.title,
    title: config.title,
    description: config.description,
    images: [config.logoUrl],
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description,
    images: [config.logoUrl],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${fontSans.variable} ${fontSerif.variable} antialiased font-sans`}
      >
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
