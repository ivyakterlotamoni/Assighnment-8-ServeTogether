
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Event = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  date: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/events`);

        if (!response.ok) {
          throw new Error("Failed to load events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError("Events load করা যায়নি। আবার চেষ্টা করো।");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f8ef] px-4 py-14">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#27876b]">
            Make a Difference Together
          </p>

          <h1 className="text-3xl font-bold text-[#123f32] md:text-5xl">
            Upcoming Events
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Discover meaningful community events and become a part
            of positive change.
          </p>
        </div>

        <div className="mb-8 flex justify-end">
          <Link
            href="/create-event"
             className="inline-flex items-center rounded-md bg-[#174b3b] px-4 py-2 text-sm font-medium text-white hover:bg-[#23634e]"
            >
            + Create Event
           </Link>
        </div>

        {loading && (
          <p className="py-16 text-center text-gray-500">
            Loading events...
          </p>
        )}

        {error && (
          <p className="py-16 text-center text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="rounded-2xl border border-[#dce5d8] bg-white p-12 text-center">
            <h2 className="text-xl font-semibold text-[#123f32]">
              No Upcoming Events
            </h2>
            <p className="mt-2 text-gray-500">
              Be the first to create a community event!
            </p>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card
                key={event._id}
                className="overflow-hidden rounded-2xl border border-[#dce5d8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#174b3b]">
                    {event.eventType}
                  </span>
                </div>

                <CardContent className="p-5">
                  <h2 className="line-clamp-1 text-xl font-bold text-[#123f32]">
                    {event.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#27876b]" />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#27876b]" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <Link
                 href={`/events/${event._id}`}
                  className="mt-6 flex w-full items-center justify-center rounded-md bg-[#174b3b] px-4 py-2 text-sm font-medium text-white hover:bg-[#23634e]"
                   >
             View Details
               <ArrowRight className="ml-2 h-4 w-4" />
                 </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
