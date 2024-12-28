// src/context/EventContext.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

// Define interfaces for our types
interface Event {
  id: string;
  name: string;
  date: Date;
  location: string;
  ticketPrice: number;
  totalTickets: number;
  availableTickets: number;
  organizer: string;
  image?: string;
}

interface Ticket {
  eventId: string;
  owner: string;
  purchaseDate: Date;
}

interface EventContextType {
  events: Event[];
  userEvents: Event[];
  userTickets: Ticket[];
  loading: boolean;
  error: string | null;
  createEvent: (eventData: Omit<Event, 'id' | 'organizer' | 'availableTickets'>) => Promise<void>;
  buyTicket: (eventId: string) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { walletAddress } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a new event
  const createEvent = async (eventData: Omit<Event, 'id' | 'organizer' | 'availableTickets'>) => {
    if (!walletAddress) {
      throw new Error('Please connect your wallet first');
    }

    setLoading(true);
    try {
      // In a real implementation, this would interact with your smart contract
      const newEvent: Event = {
        id: Date.now().toString(), // This would come from the blockchain in production
        organizer: walletAddress,
        availableTickets: eventData.totalTickets,
        ...eventData,
      };

      setEvents(prevEvents => [...prevEvents, newEvent]);
    } catch (err) {
      setError('Failed to create event');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Buy a ticket for an event
  const buyTicket = async (eventId: string) => {
    if (!walletAddress) {
      throw new Error('Please connect your wallet first');
    }

    setLoading(true);
    try {
      // In a real implementation, this would interact with your smart contract
      const event = events.find(e => e.id === eventId);
      if (!event) {
        throw new Error('Event not found');
      }

      if (event.availableTickets <= 0) {
        throw new Error('No tickets available');
      }

      // Create new ticket
      const newTicket: Ticket = {
        eventId,
        owner: walletAddress,
        purchaseDate: new Date(),
      };

      // Update event's available tickets
      setEvents(prevEvents =>
        prevEvents.map(e =>
          e.id === eventId
            ? { ...e, availableTickets: e.availableTickets - 1 }
            : e
        )
      );

      // Add ticket to user's tickets
      setTickets(prevTickets => [...prevTickets, newTicket]);
    } catch (err) {
      setError('Failed to purchase ticket');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Filter events created by the current user
  const userEvents = events.filter(event => event.organizer === walletAddress);

  // Filter tickets owned by the current user
  const userTickets = tickets.filter(ticket => ticket.owner === walletAddress);

  return (
    <EventContext.Provider
      value={{
        events,
        userEvents,
        userTickets,
        loading,
        error,
        createEvent,
        buyTicket,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventContextProvider');
  }
  return context;
};