"use client";

import NavBar from "@/components/NavBar/NavBar";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { UserContextProvider } from "./contexts/UserContext";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors/>
        <UserContextProvider>
        <NavBar />
        {children}
        </UserContextProvider>
        
      </body>
    </html>
  );
}
