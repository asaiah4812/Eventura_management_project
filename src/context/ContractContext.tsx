"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { ethers } from "ethers";
import { EventuraContract } from "@/services/contract";
import { useAuth } from "./AuthContext";

interface ContractContextType {
  contract: EventuraContract | null;
  loading: boolean;
  error: string | null;
  connectContract: () => Promise<void>;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export function ContractContextProvider({ children }: { children: ReactNode }) {
  const [contract, setContract] = useState<EventuraContract | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loggedIn } = useAuth();

  const connectContract = async () => {
    if (typeof window === "undefined") return;

    try {
      setLoading(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      
      const eventuraContract = new EventuraContract(provider);
      setContract(eventuraContract);
    } catch (err) {
      console.error("Error connecting to contract:", err);
      setError(err instanceof Error ? err.message : "Failed to connect to contract");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn && window?.ethereum) {
      connectContract();
    }
  }, [loggedIn]);

  // Listen for account changes
  useEffect(() => {
    const ethereum = window?.ethereum;
    if (ethereum) {
      ethereum.on('accountsChanged', () => {
        connectContract();
      });

      ethereum.on('chainChanged', () => {
        window.location.reload();
      });

      return () => {
        ethereum.removeListener('accountsChanged', connectContract);
      };
    }
  }, []);

  return (
    <ContractContext.Provider
      value={{
        contract,
        loading,
        error,
        connectContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export function useContract() {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContract must be used within a ContractContextProvider');
  }
  return context;
}
