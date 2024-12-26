'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import Link  from 'next/link'
import { FiChevronDown, FiCopy, FiExternalLink } from 'react-icons/fi';

export default function WalletConnection() {
  const { connected, walletAddress, chainId, logIn, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress || '');
  };

  return (
    <div className="relative">
      {connected ? (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <span>{truncateAddress(walletAddress || '')}</span>
            <FiChevronDown className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-10">
              <div className="p-4">
                <p className="text-sm font-medium text-gray-700">Wallet Address</p>
                <p className="text-xs text-gray-500 break-all">{walletAddress}</p>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <FiCopy className="mr-1" /> Copy
                  </button>
                  <Link
                    href={`https://oklink.com/okc/address/${walletAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <FiExternalLink className="mr-1" /> View on Explorer
                  </Link>
                </div>
                {chainId && (
                  <p className="mt-2 text-xs text-gray-500">
                    Chain ID: <span className="font-medium">{chainId}</span>
                  </p>
                )}
                <button
                  onClick={() => {
                    logOut();
                    setIsOpen(false);
                  }}
                  className="mt-4 w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors duration-200"
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={logIn}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm"
        >
          Connect OKX Wallet
        </button>
      )}
    </div>
  );
}

