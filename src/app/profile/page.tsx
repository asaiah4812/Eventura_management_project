// src/app/profile/page.tsx
"use client";

import React from "react";
import { useEvents } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";
import { TabsProvider, TabsBtn, TabsContent } from "@/components/core/tab";
import EventCard from "@/components/EventCard";
import TicketCard from "@/components/TicketCard";
import WalletInfo from "@/components/WalletInfo";

export default function Profile() {
  const { userEvents, userTickets, loading, error } = useEvents();
  const { user, loggedIn } = useAuth();

  if (!loggedIn) {
    return (
      <div className="container mx-auto px-4 pt-24">
        <div className="text-center text-white">
          Please connect your wallet to view your profile.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-24">
        <div className="text-center text-white">Loading profile...</div>
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
    <div className="container mx-auto px-4 pt-24">
      <WalletInfo address={user.addr || ""} />

      <TabsProvider defaultValue="events" className="mt-8">
        <div className="flex justify-center mt-2">
          <div className="flex items-center w-fit dark:bg-[#1d2025] bg-gray-200 p-1 dark:text-white text-black rounded-md border">
            <TabsBtn value="events">
              <span className="relative z-[2] uppercase">MY EVENTS</span>
            </TabsBtn>
            <TabsBtn value="tickets">
              <span className="relative z-[2] uppercase">MY TICKETS</span>
            </TabsBtn>
          </div>
        </div>

        <TabsContent value="events">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {userEvents.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">
                You haven&apos;t created any events yet.
              </div>
            ) : (
              userEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="tickets">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {userTickets.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">
                You haven&apos;t purchased any tickets yet.
              </div>
            ) : (
              userTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  event={ticket.events}
                  purchaseDate={new Date(ticket.purchase_date)}
                />
              ))
            )}
          </div>
        </TabsContent>
      </TabsProvider>
    </div>
  );
}
