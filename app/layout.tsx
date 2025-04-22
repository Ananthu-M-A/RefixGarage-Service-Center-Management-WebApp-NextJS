import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import ToasterProvider from "@/components/ToasterProvider";

export const metadata: Metadata = {
  title: "Refix Garage | A Garage For Expert Fixes",
  description:
    "Refix Garage is a smartphone service center. We provide the best services for your smartphones.",
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
          <ToasterProvider />
          {children}
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
