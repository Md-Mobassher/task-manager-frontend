// File: src/app/layout.tsx
import RootProvider from "@/lib/provider/RootProvider";
import type { Metadata } from "next";
import { Share_Tech } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./globals.css";

// const notoSerifBengali = Noto_Serif_Bengali({
//   subsets: ["bengali", "latin"],
//   weight: ["400", "700", "900"],
// });

const shareTech = Share_Tech({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Task Manager",
    absolute: "Task Manager",
  },
  description:
    "Task Manager is the easiest way to find the best task management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.maateen.me/baloo-da-2/font.css"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${shareTech.className}  text-black  bg-[#F3F7F6]`}
      >
        <RootProvider>
          {children}
          <Toaster position="bottom-right" />
        </RootProvider>
      </body>
    </html>
  );
}
