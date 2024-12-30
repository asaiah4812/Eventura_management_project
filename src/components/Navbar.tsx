"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  FiChevronDown,
  FiCopy,
  FiExternalLink,
  FiLogOut,
} from "react-icons/fi";

const Navbar = () => {
  const { user, loggedIn, logIn, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = () => {
    if (user.addr) {
      navigator.clipboard.writeText(user.addr);
    }
  };

  return (
    <div className="flex justify-between items-center py-4 px-5 bg-transparent fixed top-0 inset-x-0 backdrop-blur-md z-40">
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center space-x-2 text-blue-700">
          <Calendar /> <span>Eventura</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/events"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Events
          </Link>
          {loggedIn && (
            <>
              <Link
                href="/create-event"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Create Event
              </Link>
              <Link
                href="/profile"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Profile
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className="relative">
        {loggedIn ? (
          <>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors duration-200"
            >
              <span>
                {user.addr?.slice(0, 6)}...{user.addr?.slice(-4)}
              </span>
              <FiChevronDown
                className={`transform transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl z-10 border border-gray-700">
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-300">
                    Wallet Address
                  </p>
                  <p className="text-xs text-gray-400 break-all">{user.addr}</p>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={copyToClipboard}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center"
                    >
                      <FiCopy className="mr-1" /> Copy Address
                    </button>
                    <Link
                      href={`https://oklink.com/okc/address/${user.addr}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center"
                    >
                      <FiExternalLink className="mr-1" /> View on Explorer
                    </Link>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <button
                      onClick={() => {
                        logOut();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center text-red-400 hover:text-red-300 text-sm"
                    >
                      <FiLogOut className="mr-2" /> Disconnect
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={logIn}
            className="text-white px-4 py-2 rounded-md text-sm bg-blue-700 hover:bg-blue-800 transition-colors duration-200"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
