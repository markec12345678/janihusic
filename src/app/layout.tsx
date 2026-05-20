import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MS Jani - Montaža in storitve | Klima, Ogrevanje, Toplotne črpalke",
  description:
    "Profesionalne HVAC rešitve v Beli krajini. Klimatske naprave, ogrevanje, toplotne črpalke in vodoinštalacije. 12+ let izkušenj, F-gas certificiran. Kontakt: 040 451 221",
  keywords: [
    "MS Jani",
    "klimatske naprave",
    "ogrevanje",
    "toplotne črpalke",
    "vodoinštalacije",
    "Bela krajina",
    "Črnomelj",
    "Gradac",
    "HVAC",
    "montaža klimatskih naprav",
    "servis klimatskih naprav",
    "talno ogrevanje",
    "F-gas",
    "Janez Husič",
  ],
  authors: [{ name: "MS Jani - Janez Husič s.p." }],
  openGraph: {
    title: "MS Jani - Montaža in storitve",
    description:
      "Profesionalne HVAC rešitve v Beli krajini. Klima, ogrevanje, toplotne črpalke, vodoinštalacije.",
    type: "website",
    locale: "sl_SI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
