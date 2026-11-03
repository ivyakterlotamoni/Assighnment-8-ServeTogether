
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, HandHeart } from "lucide-react";
import { authClient } from "@/lib/auth-client";

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
};

export default function JoinedEventsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    const fetchJoinedEvents = async () => {
      try {
        const response = await fetch(
          `${API_URL}/events/joined/${encodeURIComponent(
            session.user.email
          )}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Joined events load করা যায়নি।");
        }

        const data = await response.json();

        const eventList = Array.isArray(data)
          ? data
          : Array.isArray(data.events)
          ? data.events
          : [];

        setEvents(
          eventList.sort(
            (a: Event, b: Event) =>
              new Date(a.date).getTime() -
              new Date(b.date).getTime()
          )
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [session, isPending]);

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-[#f8f8f2] flex items-center justify-center">
        <p className="text-green-800 font-semibold">
          Loading your joined events...
        </p>
      </main>
    );
  }

  if (!session?.user?.email) {
    return (
      <main className="min-h-screen bg-[#f8f8f2] flex flex-col items-center justify-center px-5">
        <h1 className="text-3xl font-bold text-gray-800">
          Please Login
        </h1>
        <p className="mt-3 text-gray-600">
          Login to see the events you joined.
        </p>
        <Link
          href="/login"
          className="mt-6 rounded-full bg-green-700 px-7 py-3 text-white font-semibold"
        >
          Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f8f2] px-5 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-800 text-sm font-semibold">
            <HandHeart size={18} />
            Your Contributions
          </div>

          <h1 className="mt-5 text-4xl font-bold text-gray-900">
            Joined Events
          </h1>

          <p className="mt-3 text-gray-600">
            All the events you have joined, in one place.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-600 mb-6">{error}</p>
        )}

        {!error && events.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <HandHeart
              size={45}
              className="mx-auto text-green-700"
            />
            <h2 className="mt-5 text-2xl font-bold text-gray-800">
              No Joined Events Yet
            </h2>
            <p className="mt-3 text-gray-600">
              Explore upcoming events and join a cause you care about.
            </p>
            <Link
              href="/events"
              className="inline-block mt-6 rounded-full bg-green-700 px-7 py-3 text-white font-semibold hover:bg-green-800"
            >
              Explore Events
            </Link>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100"
              >
                <img
                  src={event.thumbnail || "/placeholder.png"}
                  alt={event.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                    {event.eventType}
                  </span>

                  <h2 className="mt-4 text-xl font-bold text-gray-900">
                    {event.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={17} />
                      {new Date(event.date).toLocaleDateString("en-GB")}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin size={17} />
                      {event.location}
                    </p>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="mt-5 block rounded-full bg-green-700 py-3 text-center font-semibold text-white hover:bg-green-800"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
