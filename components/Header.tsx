
import Link from "next/link";
import { ArrowRight, Leaf, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#173F32]/10 bg-[#F8F8F0]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#174D38] text-white">
            <Leaf size={19} />
          </span>
          <span className="text-xl font-bold tracking-tight">
            ServeTogether
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-[#52645B] md:flex">
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

        <div className="hidden items-center gap-4 md:flex">
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
        </div>

        <button
          className="rounded-lg border border-[#174D38]/20 p-2 md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
      </nav>
    </header>
  );
}
