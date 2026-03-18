import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MouseGlow } from "@/components/ui/MouseGlow";
import dynamic from "next/dynamic";

const AIAssistant = dynamic(() => import("@/components/ui/AIAssistant"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sagnick Paul | Portfolio",
  description: "Electrical Engineering Undergraduate specializing in AI, Machine Learning, and Robotics.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <MouseGlow />
          <AIAssistant />
          <div className="flex min-h-screen flex-col relative z-[5]">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
