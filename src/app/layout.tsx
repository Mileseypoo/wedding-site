import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateMetadata(): Promise<Metadata> {
  const config = await prisma.siteConfig.findFirst();
  return {
    title: config?.siteTitle || "Becca & Sameep | Wedding",
    description: "Join us in celebrating our special day.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await prisma.siteConfig.findFirst();

  const primary = config?.primaryColor || '#889C5B';
  const secondary = config?.secondaryColor || '#D4B996';
  const background = config?.backgroundColor || '#FDFBF7';
  const foreground = config?.foregroundColor || '#1A2B4C';

  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --primary: ${primary};
              --secondary: ${secondary};
              --background: ${background};
              --foreground: ${foreground};
            }
          `}} />
      </head>
      <body className={`${cinzel.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
