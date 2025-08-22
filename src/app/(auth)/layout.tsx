import Footer from "@/components/shared/footer/Footer";
import DashboardNavbar from "@/components/shared/navbar/DashboardNavbar";
import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="bg-white dark:bg-gray-950 dark:from-gray-700 dark:via-gray-950 dark:to-black dark:text-gray-200 min-h-screen flex flex-col justify-between">
      <DashboardNavbar header={1} menu={1} />
      <div className=" text-md text-black pb-20   flex items-center justify-center">
        <div className="flex flex-col items-stretch justify-center bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 lg:w-md md:w-md w-[95%] lg:px-10 md:px-6 px-5  lg:py-10 md:py-6 py-5 rounded-2xl  mx-auto mt-20">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
