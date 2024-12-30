// src/context/EventContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import * as supabaseClient from "@/lib/supabase";
import type { Event, Ticket } from "@/lib/supabase";

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

    setLoading(true);
    try {
      await supabaseClient.createEvent({
        ...eventData,
        organizer_wallet: user.addr,
        available_tickets: eventData.total_tickets,
      });
      await refreshEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const buyTicket = async (eventId: string) => {
    if (!user?.addr) {
      throw new Error("Please connect your wallet first");
    }

    setLoading(true);
    try {
      await supabaseClient.buyTicket(eventId, user.addr);
      await refreshEvents();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to purchase ticket"
      );
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
