
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function CreateEventPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [eventType, setEventType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  const today = new Date();

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!session?.user?.email) {
      setError("Please login before creating an event.");
      return;
    }

    if (!eventType) {
      setError("Please select an event type.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const date = String(formData.get("date") || "");

    if (!date || new Date(date).getTime() <= Date.now()) {
      setError("Please select a future date and time.");
      return;
    }

    const eventData = {
      title: String(formData.get("title") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      eventType,
      thumbnail: String(formData.get("thumbnail") || "").trim(),
      location: String(formData.get("location") || "").trim(),
      date: new Date(date).toISOString(),
    };

    if (
      !eventData.title ||
      !eventData.description ||
      !eventData.thumbnail ||
      !eventData.location
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      // Get JWT token from Better Auth
      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error(
          "Authentication token not found. Please login again."
        );
      }

      // Send event data with JWT token
      const response = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event.");
      }

      setSuccess("Event created successfully!");

      form.reset();
      setEventType("");

      setTimeout(() => {
        router.push("/upcoming-events");
        router.refresh();
      }, 1200);
    } catch (err) {
      console.error("Create event error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f8ef]">
        <p className="text-[#174b3b] font-medium">
          Checking your account...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f8ef] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#27876b]">
            Make a difference
          </p>

          <h1 className="text-3xl font-bold text-[#123f32] md:text-4xl">
            Create a New Event
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Bring your community together through meaningful action.
          </p>
        </div>

        <Card className="rounded-2xl border border-[#dce5d8] bg-white shadow-sm">
          <CardHeader className="border-b border-[#edf0e8] px-6 py-6 md:px-8">
            <CardTitle className="text-xl text-[#123f32]">
              Event Information
            </CardTitle>

            <CardDescription>
              Fill in the details below to create your community event.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 py-7 md:px-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>

                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Community Tree Plantation"
                  required
                  className="h-11"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type</Label>

                  <Select
                    value={eventType}
                    onValueChange={(value) => setEventType(value ?? "")}
                  >
                    <SelectTrigger id="eventType" className="h-11 w-full">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Cleanup">Cleanup</SelectItem>
                      <SelectItem value="Plantation">Plantation</SelectItem>
                      <SelectItem value="Donation">Donation</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Community Support">
                        Community Support
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Event Location</Label>

                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. Dinajpur, Bangladesh"
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Event Date</Label>

                  <Input
                    id="date"
                    name="date"
                    type="datetime-local"
                    min={`${minDate}T00:00`}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Creator Email</Label>

                  <Input
                    value={session.user.email}
                    readOnly
                    className="h-11 bg-gray-50 text-gray-600"
                  />

                  <p className="text-xs text-gray-400">
                    Your logged-in email is added automatically.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Event Image URL</Label>

                <Input
                  id="thumbnail"
                  name="thumbnail"
                  type="url"
                  placeholder="https://example.com/event-image.jpg"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Event Description</Label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell people what this event is about..."
                  required
                  className="min-h-32 resize-y"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  role="status"
                  className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
                >
                  {success}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-[#edf0e8] pt-6 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                  className="border-[#174b3b] text-[#174b3b] hover:bg-[#edf4ee]"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#174b3b] text-white hover:bg-[#23634e]"
                >
                  {loading ? "Creating Event..." : "Create Event"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-5 text-center text-xs text-gray-400">
          Together, we can make our community better.
        </p>
      </div>
    </main>
  );
}
