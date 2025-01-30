import React, { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import Bitcoin from './BitcoinConnect';
import { ChevronDown, Wallet } from 'lucide-react';

const UnifiedWalletButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('Select Wallet');
  const { connected: solanaConnected } = useWallet();

  const WalletSelector = () => (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur border border-gray-700/50 rounded-lg text-gray-200 hover:bg-gray-800 transition-colors"
      >
        <Wallet className="w-4 h-4" />
        <span>{selectedWallet}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-xl z-50">
          <div className="py-1">
            <button
              onClick={() => {
                setSelectedWallet('solana');
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-gray-200 hover:bg-gray-800"
            >
              <img src="./solanaLogoMark.svg" alt="Solana" className="w-4 h-4 mr-2" />
              Solana
            </button>
            <button
              onClick={() => {
                setSelectedWallet('bitcoin');
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-gray-200 hover:bg-gray-800"
            >
              <img src="./Bitcoin.svg" alt="Bitcoin" className="w-4 h-4 mr-2" />
              Bitcoin
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderWalletComponent = () => {
    switch (selectedWallet) {
      case 'solana':
        return <WalletMultiButton />;
      case 'bitcoin':
        return <Bitcoin address="" />;
    }
  };

  return (
    <div className="flex grid-cols-2">
      <WalletSelector />
      <div className="relative" onClick={() => setIsOpen(true)}>
        {renderWalletComponent()}
      </div>
    </div>
  );
};

export default UnifiedWalletButton;