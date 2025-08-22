"use client";
import React from "react";
import Menu from "./Menu";
import { menuItems } from "./MenuItems";

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
        <div className="py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center  justify-between">
              <div className="lg:max-w-[280px] text-md font-bold flex justify-start  items-center">
                <h2 className="text-secondary py-3 text-2xl">Task Manager</h2>
              </div>

              <div className="lg:flex hidden  flex-wrap">
                {menu === 1 && <Menu items={menuItems} />}
              </div>
              <div className="flex md:hidden"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNavbar;
