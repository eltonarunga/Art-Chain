
import { useState, useEffect } from 'react';

const useGasPrice = () => {
  const [gasPrice, setGasPrice] = useState<number>(0);

  useEffect(() => {
    const fetchGasPrice = () => {
      // Simulate fetching gas price from an API (e.g., Etherscan)
      const newPrice = Math.floor(Math.random() * (35 - 15 + 1)) + 15;
      setGasPrice(newPrice);
    };

    fetchGasPrice();
    const intervalId = setInterval(fetchGasPrice, 15000); // Update every 15 seconds

    return () => clearInterval(intervalId);
  }, []);

  return { gasPrice };
};

export default useGasPrice;
