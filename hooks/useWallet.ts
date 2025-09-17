
import { useState, useCallback } from 'react';

const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you'd use ethers.js or web3.js here.
    // For simulation, we'll generate a random-like address.
    const pseudoRandomAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    
    setWalletAddress(pseudoRandomAddress);
    setIsConnected(true);
    setIsConnecting(false);
  }, []);

  return { isConnected, walletAddress, connectWallet, isConnecting };
};

export default useWallet;
