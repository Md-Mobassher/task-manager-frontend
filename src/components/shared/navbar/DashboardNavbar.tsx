"use client";
import React from "react";
import ThemeToggle from "../common/ThemeToggle";

interface DashboardNavbarProps {
  top?: number;
  header?: number;
  menu?: number;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  top,
  header,
  menu,
}) => {
  return (
    <>
      {header === 1 && (
        <div className="py-2 shadow dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center  justify-between">
              <div className="lg:max-w-[280px] text-md font-bold flex justify-start  items-center">
                <h2 className="text-secondary py-3 text-2xl">Task Manager</h2>
              </div>

              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNavbar;
