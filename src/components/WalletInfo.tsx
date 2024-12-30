// src/components/WalletInfo.tsx
"use client";

import React, { useState } from "react";
import { Copy, ExternalLink } from "lucide-react";

interface WalletInfoProps {
  address: string;
}

export default function WalletInfo({ address }: WalletInfoProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h1 className="text-2xl font-bold text-white mb-4">My Profile</h1>

      <div className="flex items-center space-x-2">
        <span className="text-gray-300">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>

        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white transition-colors"
          title="Copy address"
        >
          <Copy className="w-4 h-4" />
        </button>

        <a
          href={`https://flowscan.org/account/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
          title="View on FlowScan"
        >
          <ExternalLink className="w-4 h-4" />
        </a>

        {copied && <span className="text-sm text-green-500">Copied!</span>}
      </div>
    </div>
  );
}
