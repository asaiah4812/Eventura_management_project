"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEvents } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";
import TextInput from "@/components/Inputs/TextInput";
import DateInput from "@/components/Inputs/DateInput";
import { format } from "date-fns";

export default function CreateEvent() {
  const router = useRouter();
  const { createEvent } = useEvents();
  const { loggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: new Date(),
    location: "",
    ticket_price: "",
    total_tickets: "",
    image_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggedIn) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createEvent({
        ...formData,
        ticket_price: Number(formData.ticket_price),
        total_tickets: Number(formData.total_tickets),
        date: format(formData.date, "yyyy-MM-dd'T'HH:mm:ssXXX"),
      });
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Create New Event</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 rounded-md p-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextInput
            label="Event Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <TextInput
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            multiline
          />

          <DateInput
            label="Event Date"
            selected={formData.date}
            onChange={(date) =>
              setFormData({ ...formData, date: date || new Date() })
            }
            required
          />

          <TextInput
            label="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />

          <TextInput
            label="Ticket Price (FLOW)"
            type="number"
            value={formData.ticket_price}
            onChange={(e) =>
              setFormData({ ...formData, ticket_price: e.target.value })
            }
            required
            min="0"
            step="0.1"
          />

          <TextInput
            label="Total Tickets"
            type="number"
            value={formData.total_tickets}
            onChange={(e) =>
              setFormData({ ...formData, total_tickets: e.target.value })
            }
            required
            min="1"
          />

          <TextInput
            label="Image URL"
            value={formData.image_url}
            onChange={(e) =>
              setFormData({ ...formData, image_url: e.target.value })
            }
            placeholder="https://example.com/image.jpg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
