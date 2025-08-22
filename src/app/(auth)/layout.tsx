import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="bg-white text-light-text dark:bg-dark-background dark:from-gray-700 dark:via-gray-950 dark:to-black dark:text-dark-text min-h-screen">
      <div className=" text-md text-black mb-10 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-stretch justify-center bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 lg:w-md md:w-md w-[95%] lg:px-10 md:px-6 px-5  lg:py-10 md:py-6 py-5 rounded-2xl  mx-auto mt-20">
          {children}
        </div>
      </div>
    </div>
  );
}
