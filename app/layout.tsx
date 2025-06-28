import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/providers/session-provider";
import { geistSans, geistMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fishers of Men - Bringing Jesus to the World",
  description:
    "Fishers of Men is a Christian organization founded in 2019 dedicated to preaching the gospel worldwide and spreading the Word of God through ministry, missions, and community engagement.",
  keywords: [
    "Fishers of Men",
    "Christian organization",
    "Gospel",
    "Ministry",
    "Missions",
    "Bible study",
    "Prayer",
    "Community",
    "Faith",
    "Jesus Christ",
  ],
  authors: [{ name: "Fishers of Men" }],
  creator: "Fishers of Men",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fishersofmen.org",
    title: "Fishers of Men - Bringing Jesus to the World",
    description:
      "Join us in spreading the love of Jesus Christ through ministry, missions, and community engagement.",
    siteName: "Fishers of Men",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fishers of Men - Bringing Jesus to the World",
    description:
      "Join us in spreading the love of Jesus Christ through ministry, missions, and community engagement.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get font classes - fonts are now guaranteed to be initialized at module scope
  const fontClasses = [
    geistSans.variable,
    geistMono.variable,
    "antialiased",
  ].join(" ");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={fontClasses}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
