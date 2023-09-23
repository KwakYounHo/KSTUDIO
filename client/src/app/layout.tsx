import "./globals.css";
import { Inter } from "next/font/google";
import type { NextFont } from "next/dist/compiled/@next/font";
import * as React from "react";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Loading from "@/app/loading";

const inter: NextFont = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${inter.className} flex flex-col items-center h-screen`}
      >
        <React.Suspense fallback={<Loading />}>
          <Header />
          {children}
          <Footer />
        </React.Suspense>
      </body>
    </html>
  );
}
