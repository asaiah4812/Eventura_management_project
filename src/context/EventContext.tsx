// src/context/EventContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import * as supabaseClient from "@/lib/supabase";
import type { Event, Ticket } from "@/lib/supabase";
import { useContract } from "./ContractContext";

interface EventContextType {
  events: Event[];
  userEvents: Event[];
  userTickets: (Ticket & { events: Event })[];
  loading: boolean;
  error: string | null;
  createEvent: (
    eventData: Omit<
      Event,
      "id" | "created_at" | "organizer_wallet" | "available_tickets"
    >
  ) => Promise<void>;
  buyTicket: (eventId: string) => Promise<void>;
  refreshEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const { contract } = useContract();
  const [events, setEvents] = useState<Event[]>([]);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [userTickets, setUserTickets] = useState<
    (Ticket & { events: Event })[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshEvents = useCallback(async () => {
    if (!user?.addr) return;

    setLoading(true);
    try {
      const [allEvents, myEvents, myTickets] = await Promise.all([
        supabaseClient.getEvents(),
        supabaseClient.getUserEvents(user.addr),
        supabaseClient.getUserTickets(user.addr),
      ]);

      setEvents(allEvents);
      setUserEvents(myEvents);
      setUserTickets(myTickets as (Ticket & { events: Event })[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, [user?.addr]);

  useEffect(() => {
    if (user?.addr) {
      refreshEvents();
    }
  }, [user?.addr, refreshEvents]);

  const createEvent = async (
    eventData: Omit<
      Event,
      "id" | "created_at" | "organizer_wallet" | "available_tickets"
    >
  ) => {
    if (!user?.addr) {
      throw new Error("Please connect your wallet first");
    }

    if (!contract) {
      throw new Error("Smart contract not connected");
    }

    setLoading(true);
    try {
      // Create event on blockchain
      const eventDateTime = Math.floor(new Date(eventData.date).getTime() / 1000);
      const saleDeadline = eventDateTime; // You might want to set this differently
      
      await contract.createEvent(
        eventData.name,
        eventData.description,
        eventDateTime,
        eventData.location,
        eventData.ticket_price,
        eventData.total_tickets,
        saleDeadline
      );

      // Create event in Supabase
      await supabaseClient.createEvent({
        ...eventData,
        organizer_wallet: user.addr,
        available_tickets: eventData.total_tickets,
      });

      await refreshEvents();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create event";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const buyTicket = async (eventId: string) => {
    if (!user?.addr) {
      throw new Error("Please connect your wallet first");
    }

    if (!contract) {
      throw new Error("Smart contract not connected");
    }

    setLoading(true);
    try {
      const event = await supabaseClient.getEventById(eventId);
      
      // Purchase ticket on blockchain
      await contract.registerForEvent(
        parseInt(eventId),
        user.addr, // using wallet address as buyer name
        event.ticket_price.toString()
      );

      // Also record purchase in Supabase
      await supabaseClient.buyTicket(eventId, user.addr);
      
      await refreshEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to purchase ticket");
      throw err;
    } finally {
      setLoading(false);
    }
  };

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
        refreshEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventContextProvider");
  }
  return context;
};
