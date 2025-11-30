import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./tailwind.css";

export const metadata: Metadata = {
  title: "PrepHub",
  description: "PrepHub Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Required for correct navbar + Tailwind breakpoints */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body className={`${GeistSans.className} ${GeistMono.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
