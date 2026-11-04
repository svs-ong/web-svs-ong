import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";
import styles from "./layout.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cat Café · Next.js caching lab",
  description: "A slow cats API and a Next.js app to experiment with caching",
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
    <body>
      <Header />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        Data comes from <code>homework/server</code>. Every <code>/cats</code> call waits 500 ms.
      </footer>
    </body>
  </html>
);

export default RootLayout;
