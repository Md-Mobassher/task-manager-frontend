"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-blue-100">
      <div className=" py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center md:gap-2 gap-1">
          <p className="text-base font-medium text-center text-secondary">
            Task Management &copy; {new Date().getFullYear()} All rights
            reserved
          </p>
          <span className="hidden md:inline text-secondary">---</span>
          <p className="text-base font-medium text-center text-secondary">
            Design & Developed by
            <Link
              href="https://mobassher.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="text-primary ml-1 hover:text-black "
            >
              Md Mobassher Hossain
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
