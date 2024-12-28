// src/components/TicketCard.tsx
import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { CalendarClock, MapPin } from 'lucide-react';

interface TicketCardProps {
  eventId: string;
  eventName: string;
  purchaseDate: Date;
  eventDate: Date;
  location: string;
  ticketPrice: number;
}

const TicketCard = ({
  eventId,
  eventName,
  purchaseDate,
  eventDate,
  location,
  ticketPrice,
}: TicketCardProps) => {
  return (
    <div className="p-4 bg-[#111827] rounded-md">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{eventName}</h3>
          <div className='flex items-center text-xs gap-x-2 text-slate-300'>
            <CalendarClock width={16} />
            <span>{format(eventDate, "MMMM d, yyyy | h:mma")}</span>
          </div>
          <div className='flex items-center text-xs gap-x-2 text-slate-300'>
            <MapPin width={16} />
            <span>{location}</span>
          </div>
          <p className="text-sm text-gray-400">
            Purchased on {format(purchaseDate, "MMMM d, yyyy")}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl">{ticketPrice} OKX</p>
          <p className="text-sm text-gray-400">Ticket Price</p>
          <Link 
            href={`/event/${eventId}`}
            className="inline-block mt-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md text-sm text-white transition-colors"
          >
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;