import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";

// Force dynamic rendering to prevent static generation issues
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-8  rounded-lg p-2 mb-8">
        <Link
          href="/login"
          className="text-xl w-full px-5 py-2 bg-white font-semibold  text-center rounded-lg"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="text-xl w-full px-5 py-2 hover:bg-white font-semibold  text-center rounded-lg"
        >
          Sign Up
        </Link>
      </div>
      <LoginForm />
    </>
  );
}
