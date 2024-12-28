"use client";

import React, { useState } from "react";
import { MapPin, Calendar, DollarSign, Users, Info } from "lucide-react";
import Map from "@/components/Map";
import TextInput from "@/components/Inputs/TextInput";
import { FileUploadDemo } from "@/components/Inputs/FileInput";
import { DatePicker } from "@/components/Inputs/DateInput";
import { useEvents } from "@/context/EventContext";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  date: Date;
  location: string;
  ticketPrice: string;
  totalTickets: string;
  description: string;
  image: string;
}

const CreateEvent = () => {
  const router = useRouter();
  const { createEvent, loading, error } = useEvents();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    date: new Date(),
    location: "",
    ticketPrice: "",
    totalTickets: "",
    description: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createEvent({
        name: formData.name,
        date: formData.date,
        location: formData.location,
        ticketPrice: Number(formData.ticketPrice),
        totalTickets: Number(formData.totalTickets),
        image: formData.image,
      });
      router.push("/profile");
    } catch (err) {
      console.error("Failed to create event:", err);
    }
  };

  return (
    <div className="w-[90%] md:w-[70%] lg:w-[60%] mx-auto pt-8">
      <div className="bg-[#1f2937]/20 p-6 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-white">Create New Event</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Cover Image */}
          <div className="relative w-full p-4 rounded-md overflow-hidden bg-[#111827]">
            <FileUploadDemo />
          </div>

          {/* Event Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                  <Info size={16} />
                  Event Name
                </label>
                <TextInput
                  type="text"
                  holder="Enter event name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                  <Calendar size={16} />
                  Event Date & Time
                </label>
                <DatePicker
                  onChange={(date) => setFormData({ ...formData, date })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                  <MapPin size={16} />
                  Location
                </label>
                <TextInput
                  type="text"
                  holder="Enter event location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Ticket Info */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                  <DollarSign size={16} />
                  Ticket Price (OKX)
                </label>
                <TextInput
                  type="number"
                  holder="Enter ticket price"
                  value={formData.ticketPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, ticketPrice: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                  <Users size={16} />
                  Total Tickets
                </label>
                <TextInput
                  type="number"
                  holder="Enter total available tickets"
                  value={formData.totalTickets}
                  onChange={(e) =>
                    setFormData({ ...formData, totalTickets: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
              <Info size={16} />
              Event Description
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={6}
              placeholder="Enter event description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Location Map */}
          <div>
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
              <MapPin size={16} />
              Event Location on Map
            </label>
            <div className="w-full h-[300px] rounded-lg overflow-hidden">
              <Map />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⚪</span>
                  Creating Event...
                </>
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
