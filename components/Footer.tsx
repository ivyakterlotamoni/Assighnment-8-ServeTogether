
import Link from "next/link";
import {
  Leaf,
  Share2,
  MessageCircle,
  Send,
  Mail,
  MapPin,
  Globe,
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[#DDE3D8] bg-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-12 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <Link href="/" className="mb-4 inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#174D38] text-white">
              <Leaf size={19} />
            </span>
            <span className="text-xl font-bold">ServeTogether</span>
          </Link>

          <p className="max-w-sm text-sm leading-7 text-[#87928A]">
            Connecting caring people with local causes that create lasting,
            measurable change. Together, we make every action count.
          </p>

          <div className="mt-5 flex gap-3">
            {[Share2, MessageCircle, Send].map((Icon, index) => (
              <a
                key={index}
                href="#contact"
                aria-label={`Social media ${index + 1}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F0E7] text-[#174D38] transition hover:bg-[#174D38] hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-bold">Explore</h3>
          <div className="flex flex-col gap-3 text-xs text-[#87928A]">
            <Link href="/events" className="hover:text-[#174D38]">
              Upcoming Events
            </Link>
            <Link href="/create-event" className="hover:text-[#174D38]">
              Create Event
            </Link>
            <Link href="/#about" className="hover:text-[#174D38]">
              How It Works
            </Link>
            <Link href="/register" className="hover:text-[#174D38]">
              Join Community
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-bold">Stay in touch</h3>
          <div className="flex flex-col gap-4 text-xs text-[#87928A]">
            <p className="flex items-center gap-2">
              <Mail size={14} /> hello@servetogether.org
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={14} /> Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-2">
              <Globe size={14} /> www.servetogether.org
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E9E2] px-5 py-5 text-center text-[11px] text-[#87928A]">
        © 2026 ServeTogether. Made with love for a better community.
      </div>
    </footer>
  );
}
