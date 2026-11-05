"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Leaf,
  Menu,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Header() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("serve-together-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("serve-together-theme", newTheme);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="site-header sticky top-0 z-50 border-b border-[#173F32]/10 bg-[#F8F8F0]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#174D38] text-white">
            <Leaf size={19} />
          </span>
          <span className="site-brand-text text-xl font-bold tracking-tight">
            ServeTogether
          </span>
        </Link>

        <div className="site-nav-links hidden items-center gap-8 text-sm font-medium text-[#52645B] md:flex">
          <Link href="/events" className="transition hover:text-[#174D38]">
            Upcoming Events
          </Link>
          <Link href="/create-event" className="transition hover:text-[#174D38]">
            Create an event
          </Link>
          <Link href="/#about" className="transition hover:text-[#174D38]">
            About us
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="site-theme-toggle rounded-lg border border-[#174D38]/20 p-2 transition hover:bg-[#edf4ee]"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
          </button>

          <div className="hidden items-center gap-4 md:flex">
            {isPending ? null : session?.user ? (
              <>
                <span className="site-email text-sm font-medium text-[#52645B]">
                  {session.user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold hover:text-[#D18B42]"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 rounded-lg bg-[#174D38] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#103B2A]"
                >
                  Join Us <ArrowRight size={15} />
                </Link>
              </>
            )}
          </div>

          <Link
            href="/events"
            className="site-mobile-menu rounded-lg border border-[#174D38]/20 p-2 md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </Link>
        </div>
      </nav>
    </header>
  );
}