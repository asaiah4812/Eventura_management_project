"use client";

import React, { useState } from "react";
import { useContract } from "@/context/ContractContext";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function ContractTest() {
  const { contract, loading, error } = useContract();
  const { user } = useAuth();
  const [testResult, setTestResult] = useState<string>("");
  const [isTesting, setIsTesting] = useState(false);

  const testContract = async () => {
    if (!contract || !user?.addr) {
      setTestResult("Please connect your wallet first");
      return;
    }

    setIsTesting(true);
    try {
      // Test 1: Get event counter
      const eventCounter = await contract.getEventCounter();
      setTestResult(`Event Counter: ${eventCounter.toString()}\n`);

      // Test 2: Try to create a test event
      const now = Math.floor(Date.now() / 1000);
      const tx = await contract.createEvent(
        "Test Event",
        "This is a test event",
        now + 3600, // 1 hour from now
        "Test Location",
        0.1, // 0.1 ETH
        10, // 10 tickets
        now + 7200 // 2 hours from now
      );
      setTestResult(
        (prev) => prev + `Test Event Created! Transaction Hash: ${tx.hash}\n`
      );

      // Test 3: Get the created event
      const event = await contract.getEvent(Number(eventCounter));
      setTestResult(
        (prev) => prev + `Event Details: ${JSON.stringify(event, null, 2)}`
      );
    } catch (err) {
      setTestResult(
        (prev) =>
          prev +
          `Error: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setIsTesting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Smart Contract Test
        </h2>

        <div className="mb-4">
          <p className="text-gray-300">
            Connected Wallet:{" "}
            {user?.addr
              ? `${user.addr.slice(0, 6)}...${user.addr.slice(-4)}`
              : "Not connected"}
          </p>
        </div>

        <button
          onClick={testContract}
          disabled={isTesting || !contract}
          className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTesting ? "Testing..." : "Test Contract"}
        </button>

        {testResult && (
          <div className="mt-4 p-4 bg-gray-900 rounded-md">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap">
              {testResult}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
