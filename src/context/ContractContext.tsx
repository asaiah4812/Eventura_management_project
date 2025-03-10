"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { EventuraContract } from "@/services/contract";
import { useAuth } from "./AuthContext";

interface ContractContextType {
  contract: EventuraContract | null;
  loading: boolean;
  error: string | null;
  connectContract: () => Promise<void>;
}

const ContractContext = createContext<ContractContextType | undefined>(
  undefined
);

export const ContractContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { loggedIn } = useAuth();
  const [contract, setContract] = useState<EventuraContract | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const connectContract = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setError("Please install MetaMask!");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const eventuraContract = new EventuraContract(provider);
      setContract(eventuraContract);
    } catch (err) {
      console.error("Error connecting to contract:", err);
      setError("Failed to connect to contract");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      connectContract();
    }
  }, [loggedIn]);

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
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error(
      "useContract must be used within a ContractContextProvider"
    );
  }
  return context;
};
