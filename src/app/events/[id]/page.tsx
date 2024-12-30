"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEvents } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { Calendar, MapPin, Ticket, Share2, ArrowLeft } from "lucide-react";
import { Event } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export default function EventDetail() {
  const params = useParams();
  const router = useRouter();
  const { events, buyTicket, loading: contextLoading } = useEvents();
  const { loggedIn, user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [buyingTicket, setBuyingTicket] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!params.id) {
        setError("No event ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log("Fetching event with ID:", params.id);
        const eventData = events.find(e => e.id === params.id);
        console.log("Fetched event data:", eventData);
        setEvent(eventData || null);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id, events]);

  const handleBuyTicket = async () => {
    if (!event || !loggedIn) return;

    try {
      setBuyingTicket(true);
      await buyTicket(event.id);
      router.push("/profile");
    } catch (err) {
      console.error("Error buying ticket:", err);
      setError(err instanceof Error ? err.message : "Failed to buy ticket");
    } finally {
      setBuyingTicket(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: event?.name,
        text: event?.description,
        url: window.location.href,
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  if (loading || contextLoading) {
    return (
      <div className="container mx-auto px-4 pt-24">
        <div className="text-center text-white">Loading event details...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 pt-24">
        <Link
          href="/events"
          className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>
        <div className="text-center">
          <div className="relative w-[200px] h-[200px] mx-auto mb-4">
            <Image src="/calendar.png" alt="Event not found" fill={true} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Event Not Found
          </h2>
          <p className="text-gray-400">
            {error || "This event doesn't exist or has been removed."}
          </p>
        </div>
      </div>
    );
  }

  const isOrganizer = loggedIn && user.addr === event.organizer_wallet;
  const isSoldOut = event.available_tickets <= 0;

  return (
    <div className="container mx-auto px-4 pt-24">
      <Link
        href="/events"
        className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Events
      </Link>

      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        {event.image_url && (
          <div className="relative h-[400px]">
            <Image
              src={event.image_url}
              alt={event.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-8">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-white mb-4">{event.name}</h1>
            <button
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-gray-300 mb-6 whitespace-pre-wrap">
                {event.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-3" />
                  <span>{format(new Date(event.date), "PPP 'at' p")}</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <Ticket className="w-5 h-5 mr-3" />
                  <span>
                    {event.available_tickets} tickets available out of{" "}
                    {event.total_tickets}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="mb-4">
                  <span className="text-gray-400">Price</span>
                  <div className="text-3xl font-bold text-white">
                    {event.ticket_price} FLOW
                  </div>
                </div>

                {!isOrganizer && (
                  <button
                    onClick={handleBuyTicket}
                    disabled={!loggedIn || isSoldOut || buyingTicket}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      !loggedIn
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : isSoldOut
                        ? "bg-red-900 text-white cursor-not-allowed"
                        : buyingTicket
                        ? "bg-blue-800 text-white cursor-wait"
                        : "bg-blue-700 text-white hover:bg-blue-600"
                    }`}
                  >
                    {!loggedIn
                      ? "Connect Wallet to Buy"
                      : isSoldOut
                      ? "Sold Out"
                      : buyingTicket
                      ? "Buying..."
                      : "Buy Ticket"}
                  </button>
                )}

                {isOrganizer && (
                  <div className="text-sm text-gray-400 text-center mt-2">
                    You are the organizer of this event
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
