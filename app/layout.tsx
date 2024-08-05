import type { Metadata } from "next";
import { Nanum_Gothic, Nanum_Myeongjo } from "next/font/google";
import "./globals.css";
import SideMenu from "@/app/components/SideMenu";
import Navigation from "@/app/components/Navigation";

const nanum_gothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nanum-gothic",
});

const nanum_myeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nanum-myeongjo",
});

export const metadata: Metadata = {
  title: "NPD Blog",
  description: "My Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${nanum_gothic.variable} ${nanum_myeongjo.variable}`}
    >
      <body className="h-dvh w-dvw font-gothic md:grid md:grid-cols-4 lg:grid-cols-5">
        <SideMenu>
          <Navigation />
        </SideMenu>
        <main className="h-full overflow-x-hidden overflow-y-scroll pt-14 md:col-span-3 md:px-2 md:pt-0 lg:col-span-4">
          {children}
        </main>
      </body>
    </html>
  );
}
