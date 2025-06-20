import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "OneConnectX - Innovation Through Technology",
    template: "%s | OneConnectX",
  },
  description:
    "We build innovation through technology for the greater good. Expert cloud services, data analytics, web & mobile development, and custom solutions.",
  keywords: [
    "OneConnectX",
    "technology solutions",
    "cloud services",
    "data analytics",
    "web development",
    "mobile development",
    "custom software",
    "digital transformation",
    "innovation",
    "application support",
  ],
  authors: [{ name: "OneConnectX Team" }],
  creator: "OneConnectX",
  publisher: "OneConnectX",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oneconnectx.com", // Replace with your actual domain
    siteName: "OneConnectX",
    title: "OneConnectX - Innovation Through Technology",
    description:
      "We build innovation through technology for the greater good. Expert technology solutions for modern businesses.",
    images: [
      {
        url: "/og-image.jpg", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "OneConnectX - Innovation Through Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@oneconnectx", // Replace with your Twitter handle
    creator: "@oneconnectx",
    title: "OneConnectX - Innovation Through Technology",
    description: "We build innovation through technology for the greater good.",
    images: ["/og-image.jpg"], // Same image as OpenGraph
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://oneconnectx.com", // Replace with your actual domain
  },
  verification: {
    google: "your-google-verification-code", // Add when you set up Google Search Console
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "OneConnectX",
              description:
                "We build innovation through technology for the greater good",
              url: "https://oneconnectx.com",
              logo: "https://oneconnectx.com/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-XXX-XXX-XXXX", // Replace with actual number
                contactType: "customer service",
                availableLanguage: "English",
              },
              sameAs: [
                "https://linkedin.com/company/oneconnectx", // Replace with actual social links
                "https://twitter.com/oneconnectx",
                "https://facebook.com/oneconnectx",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "US", // Replace with your country
                addressLocality: "Your City", // Replace with your city
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
