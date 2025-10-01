import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import ToasterProvider from "@/components/ToasterProvider";
import DatabaseInitializer from "@/components/DatabaseInitializer";

export const metadata: Metadata = {
  title: "Refix Garage | A Garage For Expert Fixes",
  description: "Get your smartphones repaired by experts at Refix Garage.",
  keywords: "smartphone repair, expert fixes, Refix Garage",
  authors: [{ name: "Ananthu M A", url: "https://ananthuma.com" }],
  creator: "Ananthu M A",
  publisher: "Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProviderWrapper>
        <body className="bg-black">
          <DatabaseInitializer />
          <ToasterProvider />
          {children}
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
