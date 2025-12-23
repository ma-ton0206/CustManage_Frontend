import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Box } from "@mui/material";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { LoadingProvider } from "@/app/contexts/Loading/LoadingContext";
import { AuthProvider } from "@/app/contexts/auth/auth";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CustManage",
  description: "顧客管理システム",
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LoadingProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
