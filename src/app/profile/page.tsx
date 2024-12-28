// src/app/profile/page.tsx
"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useEvents } from '@/context/EventContext';
import { TabsProvider, TabsBtn, TabsContent } from '@/components/core/tab';
import EventCard from '@/components/EventCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { FiCopy, FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

const Profile = () => {
  const { connected, walletAddress, chainId } = useAuth();
  const { userEvents, userTickets, loading, error } = useEvents();

  const copyToClipboard = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
    }
  };

  if (!connected) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-gray-400">Please connect your wallet to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-[70%] lg:w-[60%] mx-auto pt-16">
      {error && <ErrorMessage message={error} />}
      <div className="bg-[#1f2937]/20 p-5 rounded-md">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image 
                src="/profile.jpg" 
                alt="Profile" 
                fill 
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">My Profile</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-400">{walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</p>
                <button 
                  onClick={copyToClipboard}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <FiCopy size={14} />
                </button>
                <a 
                  href={`https://oklink.com/okc/address/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  <FiExternalLink size={14} />
                </a>
              </div>
              {chainId && (
                <p className="text-sm text-gray-400 mt-1">
                  Chain ID: {chainId}
                </p>
              )}
            </div>
          </div>
        </div>

        <TabsProvider defaultValue="my-events">
          <div className="flex justify-center mt-2">
            <div className="flex items-center w-fit bg-[#1f2937] p-1 text-[#d1d5d8] rounded-md">
              <TabsBtn value="my-events">
                <span className="relative z-[2] uppercase text-sm md:text-md">My Events</span>
              </TabsBtn>
              <TabsBtn value="my-tickets">
                <span className="relative z-[2] uppercase text-sm md:text-md">My Tickets</span>
              </TabsBtn>
            </div>
          </div>

          <TabsContent value="my-events">
            <div className="w-full mt-5">
              {loading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : userEvents.length > 0 ? (
                userEvents.map(event => (
                  <EventCard
                    key={event.id}
                    {...event}
                  />
                ))
              ) : (
                <div className="text-center mt-10">
                  <h2 className="font-bold">No Events Created</h2>
                  <p className="font-light text-sm">
                    You haven&apos;t created any events yet. <br />
                    Start by creating your first event!
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="my-tickets">
            <div className="w-full mt-5">
              {loading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : userTickets.length > 0 ? (
                <div className="space-y-4">
                  {userTickets.map(ticket => {
                    const event = userEvents.find(e => e.id === ticket.eventId);
                    if (!event) return null;
                    return (
                      <div key={`${ticket.eventId}-${ticket.purchaseDate}`} className="p-4 bg-[#111827] rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{event.name}</h3>
                            <p className="text-sm text-gray-400">
                              Purchased on {new Date(ticket.purchaseDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{event.ticketPrice} OKX</p>
                            <p className="text-sm text-gray-400">Ticket Price</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center mt-10">
                  <h2 className="font-bold">No Tickets Purchased</h2>
                  <p className="font-light text-sm">
                    You haven&apos;t purchased any tickets yet. <br />
                    Browse events to find something interesting!
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </TabsProvider>
      </div>
    </div>
  );
};

export default Profile;