// File: src/app/(main)/dashboard/DashboardLeftNav.tsx
"use client";
import { useGetMeQuery } from "@/redux/features/admin/userApi";
import {
  logout,
  selectCurrentUser,
  setUserName,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface DashboardLeftNavProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// Dashboard menu items array
const dashboardMenuItems = [
  { label: "Dashboard", href: "/dashboard", activePath: "/dashboard" },
  {
    label: "Task List",
    href: "/dashboard/task-list",
    activePath: "/dashboard/task-list",
  },
];

export default function DashboardLeftNav({
  isOpen,
  onClose,
}: DashboardLeftNavProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path: string) => pathname === path;

  const handleLogOut = () => {
    dispatch(logout());
    router.push("/login");
  };

  const { data: userData } = useGetMeQuery(user?.userId, {
    skip: !user?.userId,
  });

  useEffect(() => {
    if (userData) {
      dispatch(setUserName(userData?.data?.name));
    }
  }, [userData]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static overflow-y-auto  top-0 left-0  pt-8 pb-2 md:w-72 w-64 flex flex-col items-center space-y-1 bg-primary z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0 overflow-y-auto min-h-screen" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 text-white lg:hidden cursor-pointer"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-[#77a1b8] p-4 rounded-full">
          <User className="w-10 h-10 text-white" />
        </div>

        <div className="mb-0 mt-3 text-center text-white">
          {userData?.data?.name}
        </div>
        <div className="mb-0 text-center text-white">{user?.email}</div>

        <div className="mb-4 mt-2 p-3 bg-[#c6d8e1] text-black rounded-xl">
          <span className="font-semibold">{user?.role}</span>
        </div>
        {dashboardMenuItems.map((item, idx) => (
          <Link
            key={item.label}
            href={item.href}
            className={`p-2 m-0 border-b border-b-slate-300 ${idx === 0 ? " border-t border-t-slate-300" : ""} w-full text-center  ${isActive(item.activePath) ? "bg-[#f4f4f4] text-black" : "hover:bg-[#f4f4f4] hover:text-black text-white"}`}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}

        <h5
          onClick={() => handleLogOut()}
          className={`p-2 m-0 border-b border-b-slate-300 w-full text-center bg-primary text-white hover:bg-white hover:text-black cursor-pointer`}
        >
          Logout
        </h5>
      </div>
    </>
  );
}
