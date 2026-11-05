import Link from "next/link";
import {
  ArrowRight,
  Users,
  CalendarDays,
  Leaf,
  Search,
  Sprout,
  HandHeart,
  MapPin,
  Trees,
  HeartHandshake,
} from "lucide-react";
export const instant = false;

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

const features = [
  {
    number: "01",
    icon: Search,
    title: "Discover events",
    description:
      "Find meaningful opportunities near you, explore and see where you can help.",
  },
  {
    number: "02",
    icon: Sprout,
    title: "Create initiatives",
    description:
      "Turn a thoughtful idea into a well-organized local movement in minutes.",
  },
  {
    number: "03",
    icon: Users,
    title: "Join volunteers",
    description:
      "Meet neighbors who believe that positive action can transform communities.",
  },
  {
    number: "04",
    icon: HandHeart,
    title: "Track impact",
    description:
      "See the real results your time and contributions help make possible.",
  },
];

export default async function HomePage() {
  let events: Event[] = [];

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  try {
    const response = await fetch(`${API_URL}/events?limit=6`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    events = await response.json();
  } catch (error) {
    console.error("Event fetching error:", error);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F8F0] text-[#173F32]">

      {/* HERO SECTION */}
      <section className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-12 md:grid-cols-2 md:px-10 md:py-16 lg:gap-20 lg:py-20">
        <div className="order-2 md:order-1">
          <div className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[2px] text-[#25805D]">
            <span className="h-2 w-2 rounded-full bg-[#25805D]" />
            Community begins with you
          </div>

          <h1 className="text-[44px] font-semibold leading-[1.08] tracking-[-2px] text-[#173F32] sm:text-6xl lg:text-[72px]">
            Small Actions.
            <br />
            <span className="italic text-[#25805D]">
              Greater Impact.
            </span>
          </h1>

          <p className="mt-6 max-w-[480px] text-sm leading-7 text-[#718078] md:text-base">
            Discover local initiatives, lend your time and build a kinder,
            more connected community — one meaningful action at a time.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-lg bg-[#174D38] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-1 hover:bg-[#103B2A]"
            >
              Explore events <ArrowRight size={16} />
            </Link>

            <Link
              href="/create-event"
              className="rounded-lg border border-[#174D38]/20 bg-white px-5 py-3 text-sm font-semibold text-[#174D38] transition hover:bg-[#E8F0E7]"
            >
              Create event
            </Link>
          </div>

          <div className="mt-9 flex items-center gap-3">
            <div className="flex -space-x-3">
              {[
                "photo-1534528741775-53994a69daeb",
                "photo-1500648767791-00dcc994a43e",
                "photo-1531123897727-8f129e1688ce",
                "photo-1506794778202-cad84cf45f1d",
              ].map((photo) => (
                <div
                  key={photo}
                  className="h-9 w-9 overflow-hidden rounded-full border-2 border-[#F8F8F0] bg-[#DCE8DC]"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/${photo}?w=100&q=80)`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-[#173F32]">
                4,800+ neighbors
              </p>
              <p className="text-[10px] text-[#87928A]">
                Already making a difference
              </p>
            </div>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="relative order-1 md:order-2">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#E7C99F]/30 blur-3xl" />

          <div
            className="relative h-[320px] w-full overflow-hidden rounded-[24px] bg-[#DDE7D9] bg-cover bg-center shadow-sm sm:h-[420px] lg:h-[480px]"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=90)",
            }}
          />

          <div className="absolute -left-3 top-8 rounded-xl border border-[#E7EAE1] bg-white px-4 py-3 shadow-lg md:-left-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8F0E7] text-[#25805D]">
                <HeartHandshake size={20} />
              </span>
              <div>
                <p className="text-sm font-bold">12,400+</p>
                <p className="text-[10px] text-gray-500">
                  Volunteer hours
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 right-3 rounded-xl border border-[#E7EAE1] bg-white px-4 py-3 shadow-lg md:right-[-12px]">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8F0E7] text-[#25805D]">
                <Trees size={20} />
              </span>
              <div>
                <p className="text-sm font-bold">3,250 trees</p>
                <p className="text-[10px] text-gray-500">
                  Planted this year
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATISTICS */}
      <section className="bg-[#173F32] py-7 text-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-7 px-5 md:grid-cols-4 md:px-10">
          {[
            ["248", "Total events"],
            ["4.8K", "Active volunteers"],
            ["32", "Communities reached"],
            ["186", "Successful initiatives"],
          ].map(([number, label], index) => (
            <div
              key={label}
              className={`px-5 ${
                index !== 0 ? "md:border-l md:border-white/20" : ""
              }`}
            >
              <p className="text-3xl font-bold tracking-tight">{number}</p>
              <p className="mt-1 text-xs text-white/65">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="about"
        className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24"
      >
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[2px] text-[#25805D]">
              How it works
            </p>
            <h2 className="max-w-lg text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Good intentions, made
              <br />
              actionable.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-[#819087]">
            ServeTogether gives every neighbor the tools to discover,
            organize and celebrate collective progress.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.number}
                className="group rounded-xl border border-[#DDE3D8] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F0E7] text-[#25805D] transition group-hover:bg-[#174D38] group-hover:text-white">
                    <Icon size={19} />
                  </span>
                  <span className="text-[10px] text-[#A4AEA5]">
                    {feature.number}
                  </span>
                </div>

                <h3 className="mb-3 text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="text-xs leading-6 text-[#87928A]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="bg-[#EEF3E9] py-16 md:py-20">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[2px] text-[#25805D]">
                Happening soon
              </p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Find your next way to help.
              </h2>
            </div>

            <Link
              href="/events"
              className="hidden items-center gap-2 rounded-lg border border-[#D5DED3] bg-white px-4 py-2.5 text-xs font-semibold transition hover:bg-[#174D38] hover:text-white sm:flex"
            >
              View all events <ArrowRight size={14} />
            </Link>
          </div>

          {events.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <article
                  key={event._id}
                  className="group overflow-hidden rounded-xl border border-[#DCE3D8] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className="relative h-52 overflow-hidden bg-[#DCE8DC] bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${event.thumbnail})`,
                    }}
                  >
                    <span className="absolute left-3 top-3 rounded-md bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-wide text-[#25805D]">
                      {event.eventType}
                    </span>

                    <span className="absolute bottom-3 left-3 rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#173F32]">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="mb-3 text-base font-semibold transition group-hover:text-[#25805D]">
                      {event.title}
                    </h3>

                    <div className="space-y-2 text-xs text-[#87928A]">
                      <p className="flex items-center gap-2">
                        <MapPin size={14} />
                        {event.location}
                      </p>

                      <p className="flex items-center gap-2">
                        <CalendarDays size={14} />
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#E5E9E2] pt-4">
                      <span className="flex items-center gap-2 text-xs text-[#87928A]">
                        <Users size={14} />
                        Community Event
                      </span>

                      <Link
                        href={`/events/${event._id}`}
                        className="flex items-center gap-1 text-xs font-bold text-[#174D38] hover:text-[#25805D]"
                      >
                        View event <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[#DCE3D8] bg-white px-6 py-12 text-center">
              <Leaf size={36} className="mx-auto mb-4 text-[#25805D]" />
              <h3 className="text-lg font-semibold">
                No upcoming events yet
              </h3>
              <p className="mt-2 text-sm text-[#87928A]">
                New community events will appear here when they are created.
              </p>
              <Link
                href="/create-event"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#174D38] px-5 py-3 text-sm font-semibold text-white hover:bg-[#103B2A]"
              >
                Create an event <ArrowRight size={15} />
              </Link>
            </div>
          )}

          <div className="mt-7 text-center sm:hidden">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-lg bg-[#174D38] px-6 py-3 text-sm font-semibold text-white"
            >
              View all events <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* COMMUNITY IN ACTION */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <div className="mb-10 text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[2px] text-[#25805D]">
            Community in action
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Real people. Tangible change.
          </h2>
          <p className="mt-3 text-sm text-[#87928A]">
            Every photo carries a story of generosity, connection and hope.
          </p>
        </div>

        <div className="grid h-auto grid-cols-1 gap-3 md:h-[420px] md:grid-cols-4 md:grid-rows-2">
          <div
            className="min-h-[260px] rounded-xl bg-cover bg-center md:col-span-2 md:row-span-2"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&q=85)",
            }}
          />

          <div
            className="min-h-[220px] rounded-xl bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=85)",
            }}
          />

          <div
            className="min-h-[220px] rounded-xl bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&q=85)",
            }}
          />

          <div
            className="min-h-[220px] rounded-xl bg-cover bg-center md:col-span-2"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=900&q=85)",
            }}
          />
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-[1400px] px-5 pb-16 md:px-10 md:pb-20">
        <div className="relative grid overflow-hidden rounded-2xl bg-[#173F32] px-7 py-12 text-white md:grid-cols-2 md:items-center md:px-12 md:py-16">
          <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/10" />

          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[2px] text-[#A5D4B7]">
              Stay connected
            </p>
            <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              A little good news,
              <br />
              delivered monthly.
            </h2>
          </div>

          <div className="relative mt-8 md:mt-0">
            <p className="mb-4 text-xs leading-6 text-white/80">
              Community stories, upcoming events and simple ways to help.
            </p>

            <form className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-xs text-white outline-none placeholder:text-white/60 focus:border-white"
              />
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-bold text-[#173F32] transition hover:bg-[#E8F0E7]"
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </form>

            <p className="mt-3 text-[9px] text-white/50">
              No spam. Just thoughtful updates. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
