// src/components/EventCard.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { CalendarClock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

interface EventCardProps {
  id: string;
  name: string;
  date: Date;
  location: string;
  ticketPrice: number;
  organizer: string;
  image?: string;
  availableTickets: number;
  totalTickets: number;
}

const EventCard = ({
  id,
  name,
  date,
  location,
  ticketPrice,
  image,
  availableTickets,
  totalTickets,
}: EventCardProps) => {
  const isUpcoming = new Date(date) > new Date();

  return (
    <div className='p-4 rounded-md ring-1 ring-slate-600 mb-4 bg-[#111827] space-y-3'>
      <div className='relative w-full h-48 rounded-md overflow-hidden mb-4'>
        <Image
          src={image || '/event-default.jpg'}
          alt={name}
          fill
          className='object-cover'
        />
      </div>
      <h2 className='font-bold text-lg'>{name}</h2>
      <h3 className='font-light gap-x-2 text-slate-300 inline-flex'>
        Status:{' '}
        <span className='text-white font-medium inline-flex gap-x-2 items-center'>
          <div className={`w-2 h-2 rounded-full ${isUpcoming ? 'bg-blue-700' : 'bg-gray-500'}`}></div>
          {isUpcoming ? 'upcoming' : 'past'}
        </span>
      </h3>
      <div className='flex items-center text-xs gap-x-2 text-slate-300'>
        <CalendarClock width={16} />
        <span>{format(date, "MMMM d, yyyy | h:mma")}</span>
      </div>
      <div className='flex items-center text-xs gap-x-2 text-slate-300'>
        <MapPin width={16} />
        <span>{location}</span>
      </div>
      <hr className='border border-solid' />
      <div className='flex items-center justify-between'>
        <div className='inline-flex items-center'>
          <h2 className='font-bold text-xl sm:text-2xl lg:text-4xl'>{ticketPrice} OKX</h2>
          <span className='text-sm ms-2 text-gray-400'>Ticket Price</span>
        </div>
        <Link 
          href={`/event/${id}`}
          className='px-5 py-3 rounded-md text-white bg-blue-700 text-sm hover:bg-blue-800 transition-colors'
        >
          View Details
        </Link>
      </div>
      <div className='mt-2'>
        <p className='text-sm text-gray-400'>
          {availableTickets} tickets remaining out of {totalTickets}
        </p>
      </div>
    </div>
  );
};

export default EventCard;