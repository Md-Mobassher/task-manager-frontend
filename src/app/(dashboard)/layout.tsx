// File: src/app/(main)/layout.tsx

import DashboardNavbar from "@/components/shared/navbar/DashboardNavbar";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardNavbar header={1} menu={1} />
      {children}
    </div>
  );
}
