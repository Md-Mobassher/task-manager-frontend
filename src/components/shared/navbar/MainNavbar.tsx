"use client";
import logo from "@/assets/images/logo.svg";
import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Menu from "./Menu";
import { menuItems } from "./MenuItems";

interface MainNavbarProps {
  top?: number;
  header?: number;
  menu?: number;
}

const MainNavbar: React.FC<MainNavbarProps> = ({ top, header, menu }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {header === 1 && (
        <div className="sticky top-0 z-50 bg-white shadow-sm py-0.5 border-b border-gray-300">
          <div className="container mx-auto px-4">
            <div className="flex items-center  justify-between">
              <Link href="/" className="">
                <div className="lg:w-[280px] text-md font-bold flex justify-start  items-center">
                  <Image src={logo} width={80} height={80} alt="logo" />
                  <h2 className="text-secondary lg:flex hidden">
                    Task Manager
                  </h2>
                </div>
              </Link>
              {/* Toggle button for mobile menu */}
              <button
                className="md:hidden text-black cursor-pointer transition duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="size-7 " />
                ) : (
                  <MenuIcon className="size-7 " />
                )}
              </button>
              <div className="hidden md:flex  flex-wrap">
                {menu === 1 && <Menu items={menuItems} />}
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden bg-gray-400 text-black">
                <Menu items={menuItems} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MainNavbar;
