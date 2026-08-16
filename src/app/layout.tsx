import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Indian Diplomatic Relations | India's Foreign Relations",
    template: "%s",
  },
  description: "Explore India's diplomatic relationships with countries around the world through interactive maps, historical timelines, agreements, trade, defence cooperation and recent developments.",
  openGraph: {
    title: "Indian Diplomatic Relations",
    description: "India's relationships with the world — mapped, explained and contextualized.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Diplomatic Relations",
    description: "India's relationships with the world — mapped, explained and contextualized.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased dark`}>
      <body className="min-h-screen flex flex-col bg-primary text-off-white font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
