"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { CalendarDays, Ticket, Users } from "lucide-react";


export default function Home() {
  const { loggedIn } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-blue-500">Eventura</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your one-stop platform for discovering, creating, and managing
            events on the blockchain.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/events"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Explore Events
            </Link>
            {loggedIn ? (
              <Link
                href="/create-event"
                className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Create Event
              </Link>
            ) : (
              <button
                onClick={() => {}} // This will trigger the wallet connection
                className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/60 backdrop-blur hover:backdrop-blur-sm transition-all ease-in duration-100 p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarDays className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Create Events</h3>
            <p className="text-gray-300">
              Easily create and manage your events with our intuitive interface.
            </p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur hover:backdrop-blur-sm transition-all ease-in duration-100 p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Buy Tickets</h3>
            <p className="text-gray-300">
              Secure your tickets on the blockchain with just a few clicks.
            </p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur hover:backdrop-blur-sm transition-all ease-in duration-100  p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Connect</h3>
            <p className="text-gray-300">
              Join a community of event organizers and attendees.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Events Preview */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Featured Events
          </h2>
          <Link
            href="/events"
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            View all events →
          </Link>
        </div>
      </div>
    </div>
  );
}
