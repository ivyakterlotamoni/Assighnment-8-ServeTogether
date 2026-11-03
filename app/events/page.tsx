
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  CalendarDays,
  Clock,
  ArrowRight,
  Users,
  Heart,
  Leaf,
  BookOpen,
  Stethoscope,
  Droplets,
  HandHeart,
  Plus,
  Filter,
} from "lucide-react";

type Event = {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  volunteers: number;
  icon: string;
  color: string;
};

const events: Event[] = [
  {
    id: 1,
    title: "Community Tree Plantation",
    category: "Environment",
    date: "November 7, 2026",
    time: "9:00 AM - 12:00 PM",
    location: "Dhaka, Bangladesh",
    description:
      "Join us to plant trees and make our community greener and healthier.",
    volunteers: 35,
    icon: "🌱",
    color: "bg-green-100",
  },
  {
    id: 2,
    title: "Free Education for Children",
    category: "Education",
    date: "November 12, 2026",
    time: "10:00 AM - 1:00 PM",
    location: "Mirpur, Dhaka",
    description:
      "Help underprivileged children learn essential skills and build a brighter future.",
    volunteers: 20,
    icon: "📚",
    color: "bg-blue-100",
  },
  {
    id: 3,
    title: "Free Medical Camp",
    category: "Healthcare",
    date: "November 15, 2026",
    time: "8:00 AM - 2:00 PM",
    location: "Uttara, Dhaka",
    description:
      "Support free health checkups and basic medical services for local residents.",
    volunteers: 45,
    icon: "🩺",
    color: "bg-red-100",
  },
  {
    id: 4,
    title: "Clean Our Neighborhood",
    category: "Environment",
    date: "November 20, 2026",
    time: "7:30 AM - 11:00 AM",
    location: "Dhanmondi, Dhaka",
    description:
      "Let's work together to clean public spaces and create a healthier environment.",
    volunteers: 28,
    icon: "🌍",
    color: "bg-emerald-100",
  },
  {
    id: 5,
    title: "Food Distribution Drive",
    category: "Community",
    date: "November 25, 2026",
    time: "11:00 AM - 3:00 PM",
    location: "Old Dhaka, Bangladesh",
    description:
      "Help distribute food packages to families who need support.",
    volunteers: 50,
    icon: "❤️",
    color: "bg-orange-100",
  },
  {
    id: 6,
    title: "Clean Water Awareness",
    category: "Community",
    date: "November 29, 2026",
    time: "9:00 AM - 12:00 PM",
    location: "Gazipur, Bangladesh",
    description:
      "Spread awareness about safe drinking water and healthy sanitation.",
    volunteers: 18,
    icon: "💧",
    color: "bg-cyan-100",
  },
];

const categories = [
  "All Events",
  "Environment",
  "Education",
  "Healthcare",
  "Community",
];

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Events");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase()) ||
        event.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All Events" ||
        event.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <main className="min-h-screen bg-[#F8F8F0] text-[#174D38]">
      {/* Hero Section */}
      <section className="px-5 pb-12 pt-16 md:px-10 md:pb-16 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-[#174D38]">
                <Heart size={16} />
                Make a Difference Together
              </span>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Discover Events.
                <br />
                <span className="text-[#5A966D]">
                  Create Impact.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 md:text-lg">
                Find meaningful volunteer opportunities, connect
                with your community, and be part of something
                bigger. Every small action creates a positive
                change.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#upcoming-events"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#174D38] px-6 py-3.5 font-semibold text-white transition hover:bg-[#236849]"
                >
                  Explore Events
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/create-event"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#174D38] px-6 py-3.5 font-semibold text-[#174D38] transition hover:bg-green-50"
                >
                  <Plus size={18} />
                  Create Event
                </Link>
              </div>
            </div>

            <div className="relative flex min-h-[280px] items-center justify-center rounded-3xl bg-[#E4EDDF] p-8 md:min-h-[380px]">
              <div className="text-center">
                <div className="text-8xl md:text-9xl">
                  🤝
                </div>
                <h2 className="mt-5 text-2xl font-bold">
                  Together We Can
                </h2>
                <p className="mt-2 text-gray-600">
                  Small actions, big changes.
                </p>
              </div>

              <div className="absolute left-5 top-5 rounded-2xl bg-white p-3 shadow-md">
                <Heart className="text-red-500" size={24} />
              </div>

              <div className="absolute bottom-5 right-5 rounded-2xl bg-white p-3 shadow-md">
                <HandHeart className="text-[#174D38]" size={25} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="px-5 pb-12 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { number: "06", label: "Upcoming Events" },
            { number: "196+", label: "Volunteer Spots" },
            { number: "04", label: "Categories" },
            { number: "01", label: "Shared Mission" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-green-100 bg-white p-5 text-center shadow-sm"
            >
              <h3 className="text-3xl font-extrabold text-[#174D38]">
                {item.number}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section
        id="upcoming-events"
        className="px-5 py-12 md:px-10 md:py-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-[#5A966D]">
                Get Involved
              </span>

              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
                Upcoming Events
              </h2>

              <p className="mt-3 text-gray-600">
                Find an opportunity and make a difference.
              </p>
            </div>

            <p className="text-sm font-medium text-gray-500">
              Showing {filteredEvents.length} events
            </p>
          </div>

          {/* Search */}
          <div className="mb-6 rounded-2xl border border-green-100 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-3 px-3">
              <Search className="shrink-0 text-gray-400" size={22} />

              <input
                type="text"
                placeholder="Search by event name, category or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-9 flex flex-wrap items-center gap-3">
            <span className="mr-1 flex items-center gap-2 text-sm font-semibold">
              <Filter size={17} />
              Categories:
            </span>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-[#174D38] text-white shadow-md"
                    : "border border-green-100 bg-white text-gray-600 hover:border-[#174D38] hover:text-[#174D38]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Event Cards */}
          {filteredEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <article
                  key={event.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className={`${event.color} relative flex h-44 items-center justify-center`}
                  >
                    <span className="text-7xl transition duration-300 group-hover:scale-110">
                      {event.icon}
                    </span>

                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#174D38] shadow-sm">
                      {event.category}
                    </span>

                    <span className="absolute right-4 top-4 rounded-full bg-[#174D38] px-3 py-1.5 text-xs font-semibold text-white">
                      Upcoming
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl font-bold leading-snug transition group-hover:text-[#5A966D]">
                      {event.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                      {event.description}
                    </p>

                    <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <CalendarDays
                          size={17}
                          className="shrink-0 text-[#5A966D]"
                        />
                        {event.date}
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Clock
                          size={17}
                          className="shrink-0 text-[#5A966D]"
                        />
                        {event.time}
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <MapPin
                          size={17}
                          className="shrink-0 text-[#5A966D]"
                        />
                        {event.location}
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Users
                          size={17}
                          className="shrink-0 text-[#5A966D]"
                        />
                        {event.volunteers} volunteer spots
                      </div>
                    </div>

                    <Link
                      href={`/events/${event.id}`}
                      className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#174D38] px-5 py-3 font-semibold text-white transition hover:bg-[#236849]"
                    >
                      View Details
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-green-200 bg-white px-5 py-16 text-center">
              <div className="mb-4 flex justify-center">
                <Search size={45} className="text-gray-300" />
              </div>

              <h3 className="text-xl font-bold">
                No Events Found
              </h3>

              <p className="mt-2 text-gray-500">
                Try another search or select a different category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All Events");
                }}
                className="mt-5 rounded-xl bg-[#174D38] px-5 py-3 font-semibold text-white hover:bg-[#236849]"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#174D38] px-6 py-12 text-center text-white md:px-16 md:py-16">
          <div className="mb-4 flex justify-center">
            <HandHeart size={45} />
          </div>

          <h2 className="text-3xl font-extrabold md:text-4xl">
            Have an Event Idea?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-green-100">
            Start something meaningful. Create an event and
            invite others to make a positive impact together.
          </p>

          <Link
            href="/create-event"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-[#174D38] transition hover:bg-green-100"
          >
            Create an Event
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
