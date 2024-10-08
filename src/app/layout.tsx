import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import LocalFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import LayoutClient from "./layout-client";

const poppins = Poppins({ weight: "300", variable: '--font-poppins', subsets: ["latin"] })

const calSans = LocalFont({
  src: "../../public/calsans.ttf",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  title: "Aura",
  description: "Get that aura",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={calSans.variable + " " + poppins.variable + " " + poppins.className + " bg-black text-white"}>
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
