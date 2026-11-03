
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  creatorEmail: string;
};

export default function ManageEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    thumbnail: "",
    location: "",
    date: "",
  });

  const loadEvents = useCallback(async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/events`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load events.");
      }

      const data: Event[] = await response.json();

      const myEvents = data
        .filter(
          (event) =>
            event.creatorEmail?.toLowerCase() ===
            session.user.email.toLowerCase()
        )
        .sort(
          (a, b) =>
            new Date(a.date).getTime() -
            new Date(b.date).getTime()
        );

      setEvents(myEvents);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user?.email) {
      loadEvents();
    }
  }, [session, loadEvents]);

  const handleEdit = (event: Event) => {
    const eventDate = new Date(event.date);
    const localDate = new Date(
      eventDate.getTime() - eventDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);

    setEditingId(event._id);

    setFormData({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      thumbnail: event.thumbnail,
      location: event.location,
      date: localDate,
    });

    setError("");
    setSuccess("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingId) return;

    setError("");
    setSuccess("");

    if (new Date(formData.date).getTime() <= Date.now()) {
      setError("Please select a future date and time.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/events/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(),
          creatorEmail: session?.user?.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update event.");
      }

      setSuccess("Event updated successfully!");
      setEditingId(null);

      await loadEvents();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update event."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete event.");
      }

      setEvents((previous) =>
        previous.filter((event) => event._id !== id)
      );

      setSuccess("Event deleted successfully!");

      if (editingId === id) {
        setEditingId(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete event."
      );
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      eventType: "",
      thumbnail: "",
      location: "",
      date: "",
    });
    setError("");
    setSuccess("");
  };

  if (isPending || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f8ef]">
        <p className="font-medium text-[#174b3b]">
          Checking your account...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f8ef] px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#27876b]">
            Your activities
          </p>

          <h1 className="text-3xl font-bold text-[#123f32] md:text-4xl">
            Manage Your Events
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            View, update and manage the events you have created.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
          >
            {success}
          </div>
        )}

        {editingId && (
          <section className="mb-10 rounded-2xl border border-[#dce5d8] bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-xl font-bold text-[#123f32]">
              Update Event
            </h2>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="edit-title" className="text-sm font-medium text-gray-700">
                    Event Title
                  </label>
                  <input
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="h-11 w-full rounded-lg border border-gray-300 px-4 text-gray-800 outline-none focus:border-[#245c43]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="edit-type" className="text-sm font-medium text-gray-700">
                    Event Type
                  </label>
                  <select
                    id="edit-type"
                    value={formData.eventType}
                    onChange={(e) =>
                      setFormData({ ...formData, eventType: e.target.value })
                    }
                    required
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-gray-800 outline-none focus:border-[#245c43]"
                  >
                    <option value="">Select event type</option>
                    <option value="Cleanup">Cleanup</option>
                    <option value="Plantation">Plantation</option>
                    <option value="Donation">Donation</option>
                    <option value="Education">Education</option>
                    <option value="Community Support">Community Support</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="edit-location" className="text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    id="edit-location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                    className="h-11 w-full rounded-lg border border-gray-300 px-4 text-gray-800 outline-none focus:border-[#245c43]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="edit-date" className="text-sm font-medium text-gray-700">
                    Event Date
                  </label>
                  <input
                    id="edit-date"
                    type="datetime-local"
                    min={new Date().toISOString().slice(0, 16)}
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                    className="h-11 w-full rounded-lg border border-gray-300 px-4 text-gray-800 outline-none focus:border-[#245c43]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-image" className="text-sm font-medium text-gray-700">
                  Event Image URL
                </label>
                <input
                  id="edit-image"
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.value })
                  }
                  required
                  className="h-11 w-full rounded-lg border border-gray-300 px-4 text-gray-800 outline-none focus:border-[#245c43]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-[#245c43]"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-lg border border-[#174b3b] px-6 py-3 font-medium text-[#174b3b] hover:bg-[#edf4ee]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#174b3b] px-6 py-3 font-semibold text-white hover:bg-[#23634e] disabled:opacity-60"
                >
                  {saving ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </section>
        )}

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-[#123f32]">
            My Events ({events.length})
          </h2>

          <button
            onClick={() => router.push("/create-event")}
            className="rounded-lg bg-[#174b3b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#23634e]"
          >
            + Create New Event
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-500">
            Loading your events...
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#cbd8c9] bg-white px-6 py-16 text-center">
            <h3 className="text-xl font-semibold text-[#123f32]">
              No Events Yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              You have not created any events yet.
            </p>
            <button
              onClick={() => router.push("/create-event")}
              className="mt-6 rounded-lg bg-[#174b3b] px-6 py-3 font-semibold text-white hover:bg-[#23634e]"
            >
              Create Your First Event
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-2xl border border-[#dce5d8] bg-white shadow-sm"
              >
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <span className="rounded-full bg-[#eaf4ed] px-3 py-1 text-xs font-semibold text-[#246448]">
                    {event.eventType}
                  </span>

                  <h3 className="mt-3 text-lg font-bold text-[#123f32]">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    📍 {event.location}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    📅 {new Date(event.date).toLocaleString()}
                  </p>

                  <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                    {event.description}
                  </p>

                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => handleEdit(event)}
                      className="flex-1 rounded-lg border border-[#174b3b] px-3 py-2.5 text-sm font-semibold text-[#174b3b] hover:bg-[#edf4ee]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex-1 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
