"use client";

import React from "react";
import { useEvents } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Plus, CalendarPlus } from "lucide-react";
import EventCard from "@/components/EventCard";
import { TabsProvider, TabsBtn, TabsContent } from "@/components/core/tab";
import Image from "next/image";
import ContractTest from "@/components/ContractTest";

export default function EventsPage() {
  const { events, loading, error } = useEvents();
  const { loggedIn } = useAuth();

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) > new Date()
  );
  const pastEvents = events.filter(
    (event) => new Date(event.date) <= new Date()
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-24">
        <div className="text-center text-white">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 pt-24">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-18">
      <ContractTest />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">All Events</h1>
        {loggedIn && (
          <Link
            href="/create-event"
            className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            <CalendarPlus className="w-5 h-5" />
            <span>Create Event</span>
          </Link>
        )}
      </div>

      {loggedIn && (
        <Link
          href="/create-event"
          className="fixed bottom-6 right-6 hidden md:block bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-colors z-50"
        >
          <Plus className="w-6 h-6" />
        </Link>
      )}

      <TabsProvider defaultValue="upcoming">
        <div className="flex justify-center mt-2">
          <div className="flex items-center w-fit dark:bg-[#1d2025] bg-gray-200 p-1 dark:text-white text-black rounded-md border">
            <TabsBtn value="all">
              <span className="relative z-[2] uppercase text-xs sm:text-sm md:text-md">
                ALL EVENTS
              </span>
            </TabsBtn>
            <TabsBtn value="upcoming">
              <span className="relative z-[2] uppercase text-xs sm:text-sm md:text-md">
                UPCOMING
              </span>
            </TabsBtn>
            <TabsBtn value="past">
              <span className="relative z-[2] uppercase text-xs sm:text-sm md:text-md">
                PAST EVENTS
              </span>
            </TabsBtn>
          </div>
        </div>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {events.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">
                <div className="relative md:w-[200px] md:h-[200px] w-[60%] h-[150px] mx-auto">
                  <Image src="/calendar.png" alt="No events" fill={true} />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  No events found
                </h2>
              </div>
            ) : (
              events.map((event) => <EventCard key={event.id} event={event} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {upcomingEvents.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">
                <div className="relative md:w-[200px] md:h-[200px] w-[60%] h-[150px] mx-auto">
                  <Image
                    src="/calendar.png"
                    alt="No upcoming events"
                    fill={true}
                  />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  No upcoming events
                </h2>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {pastEvents.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">
                <div className="relative md:w-[200px] md:h-[200px] w-[60%] h-[150px] mx-auto">
                  <Image src="/calendar.png" alt="No past events" fill={true} />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  No past events
                </h2>
              </div>
            ) : (
              pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        </TabsContent>
      </TabsProvider>
    </div>
  );
}
