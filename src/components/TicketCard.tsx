// src/components/TicketCard.tsx
"use client";

import React from "react";
import { format } from "date-fns";
import { Calendar, MapPin, Ticket } from "lucide-react";
import type { Event } from "@/lib/supabase";
import Image from "next/image";

interface TicketCardProps {
  event: Event;
  purchaseDate: Date;
}

export default function TicketCard({ event, purchaseDate }: TicketCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {event.image_url && (
        <div className="relative h-48">
          <Image
            src={event.image_url}
            alt={event.name}
            fill={true}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-300">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {format(new Date(event.date), "PPP")}
            </span>
          </div>

          <div className="flex items-center text-gray-300">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>

          <div className="flex items-center text-gray-300">
            <Ticket className="w-4 h-4 mr-2" />
            <span className="text-sm">
              Purchased on {format(purchaseDate, "PPP")}
            </span>
          </div>
        </div>

        <div className="text-white">
          <span className="text-lg font-bold">{event.ticket_price} FLOW</span>
          <span className="text-sm text-gray-400 ml-1">paid</span>
        </div>
      </div>
    </div>
  );
}
