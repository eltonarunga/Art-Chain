
import React from 'react';
import { Link } from 'react-router-dom';
import useWallet from '../hooks/useWallet';
import useGasPrice from '../hooks/useGasPrice';
import { Button } from './Button';

const Header: React.FC = () => {
  const { isConnected, walletAddress, connectWallet } = useWallet();
  const { gasPrice } = useGasPrice();

  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  const WalletIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
      <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z"></path>
    </svg>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-violet-400"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
            <span className="font-bold text-xl">ArtChain</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-violet-400 transition-colors">Explore</Link>
            <Link to="/create" className="hover:text-violet-400 transition-colors">Create</Link>
            <Link to="/profile" className="hover:text-violet-400 transition-colors">Profile</Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden lg:block">
            <SearchIcon />
            <input type="search" placeholder="Search artworks..." className="pl-10 pr-4 py-2 text-sm bg-slate-900 border border-slate-800 rounded-full w-64 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all" />
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-sm bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-400"><path d="M12 2c2.4 0 4.7.9 6.5 2.5a10.1 10.1 0 0 1 3.5 6.5c0 2.4-.9 4.7-2.5 6.5a10.1 10.1 0 0 1-6.5 3.5c-2.4 0-4.7-.9-6.5-2.5A10.1 10.1 0 0 1 2 12c0-2.4.9-4.7 2.5-6.5A10.1 10.1 0 0 1 8.5 2H12Z"></path><path d="M12 12h.01"></path><path d="M16 6h.01"></path><path d="M18 10h.01"></path><path d="M18 14h.01"></path><path d="M16 18h.01"></path><path d="M12 22h.01"></path><path d="M8 18h.01"></path><path d="M6 14h.01"></path><path d="M6 10h.01"></path><path d="M8 6h.01"></path></svg>
            <span>Gas: <span className="font-semibold text-green-400">{gasPrice}</span> Gwei</span>
          </div>

          {isConnected ? (
             <div className="flex items-center bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
               <span className="text-sm font-mono">{`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}</span>
             </div>
          ) : (
            <Button onClick={connectWallet} variant="primary">
              <WalletIcon />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
