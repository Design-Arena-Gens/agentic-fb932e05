import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Ad Creator - Create Professional Ads for Free",
  description: "Create high-quality, professional advertisements using free AI tools. Generate stunning ads in seconds with customizable templates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
