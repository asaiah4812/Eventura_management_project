// src/components/WalletInfo.tsx
import React from 'react';
import { FiCopy, FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

interface WalletInfoProps {
  walletAddress: string;
  chainId: string | null;
  onCopy: () => void;
}

const WalletInfo = ({ walletAddress, chainId, onCopy }: WalletInfoProps) => {
  return (
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
          <p className="text-sm text-gray-400">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
          <button 
            onClick={onCopy}
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
  );
};

export default WalletInfo;