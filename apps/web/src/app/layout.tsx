import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SueTogether - B2B LegalTech Platform",
  description: "집단분쟁 및 다중지역소송 초자동화 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} dark antialiased h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/30">
        {children}
      </body>
    </html>
  );
}
