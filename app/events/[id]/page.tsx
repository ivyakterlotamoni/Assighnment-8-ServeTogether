
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  CalendarDays,
  ArrowLeft,
  Heart,
  HandHeart,
} from "lucide-react";

export const instant = false;

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Event = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  date: string;
  creatorEmail: string;
};

async function getEvent(id: string): Promise<Event | null> {
  try {
    const response = await fetch(`${API_URL}/events/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Event fetch error:", error);
    return null;
  }
}

function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F8F0]">
      <p className="text-lg font-semibold text-[#174D38]">
        Loading event details...
      </p>
    </main>
  );
}

export default function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <EventDetailsContent params={params} />
    </Suspense>
  );
}

async function EventDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.date);

  return (
    <main className="min-h-screen bg-[#F8F8F0] text-[#174D38]">
      {/* Hero Image */}
      <section className="px-5 pt-10 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/events"
            className="mb-6 inline-flex items-center gap-2 font-semibold text-[#5A966D] hover:text-[#174D38]"
          >
            <ArrowLeft size={18} />
            Back to Events
          </Link>

          <div className="relative h-[280px] overflow-hidden rounded-3xl bg-green-100 md:h-[450px]">
            <img
              src={event.thumbnail}
              alt={event.title}
              className="h-full w-full object-cover"
            />

            <span className="absolute left-5 top-5 rounded-full bg-white px-5 py-2 text-sm font-bold text-[#174D38] shadow">
              {event.eventType}
            </span>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_350px]">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-[#5A966D]">
              Community Event
            </span>

            <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
              {event.title}
            </h1>

            <div className="mt-7 flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CalendarDays className="text-[#5A966D]" size={20} />
                {eventDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "Asia/Dhaka",
                })}
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="text-[#5A966D]" size={20} />
                {event.location}
              </div>
            </div>

            <div className="mt-10 border-t border-green-100 pt-8">
              <h2 className="text-2xl font-bold">About This Event</h2>

              <p className="mt-5 whitespace-pre-line text-base leading-8 text-gray-600">
                {event.description}
              </p>
            </div>

            <div className="mt-10 rounded-2xl bg-[#E4EDDF] p-6">
              <div className="flex items-center gap-3">
                <Heart className="text-[#174D38]" size={25} />
                <h2 className="text-xl font-bold">
                  Be Part of the Change
                </h2>
              </div>

              <p className="mt-3 leading-7 text-gray-600">
                Join this community initiative and help create a
                positive impact together.
              </p>

              <Link
                href="/login"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#174D38] px-6 py-3 font-semibold text-white transition hover:bg-[#236849]"
              >
                <HandHeart size={19} />
                Login to Join Event
              </Link>
            </div>
          </div>

          {/* Event Information Card */}
          <aside>
            <div className="rounded-2xl border border-green-100 bg-white p-7 shadow-sm">
              <h2 className="text-xl font-bold">Event Information</h2>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-sm text-gray-400">Event Name</p>
                  <p className="mt-1 font-semibold">{event.title}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Category</p>
                  <p className="mt-1 font-semibold">{event.eventType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Event Date</p>
                  <p className="mt-1 font-semibold">
                    {eventDate.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "Asia/Dhaka",
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="mt-1 font-semibold">{event.location}</p>
                </div>
              </div>

              <Link
                href="/events"
                className="mt-8 block rounded-xl border border-[#174D38] px-5 py-3 text-center font-semibold text-[#174D38] transition hover:bg-green-50"
              >
                Explore More Events
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
