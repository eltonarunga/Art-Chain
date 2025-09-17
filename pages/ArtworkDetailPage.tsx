
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Artwork, Transaction } from '../types';
import { getArtworkById, getTransactionsByArtworkId } from '../data/mock';
import { Button } from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../contexts/ToastContext';

const ArtworkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchArtwork = async () => {
      if (id) {
        setIsLoading(true);
        const artId = parseInt(id, 10);
        const artData = await getArtworkById(artId);
        const txData = await getTransactionsByArtworkId(artId);
        setArtwork(artData || null);
        setTransactions(txData);
        setIsLoading(false);
      }
    };
    fetchArtwork();
  }, [id]);
  
  const handleBuy = async () => {
    setIsBuying(true);
    addToast("Initiating transaction...", 'success');
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2500));
    addToast("Purchase successful! NFT transferred.", 'success');
    setIsBuying(false);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner className="w-12 h-12" />
      </div>
    );
  }

  if (!artwork) {
    return <div className="text-center text-xl">Artwork not found.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <div className="aspect-square bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
          <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-full object-contain" />
        </div>
      </div>
      <div className="lg:col-span-2 space-y-6">
        <div className="p-6 bg-slate-900 rounded-lg border border-slate-800">
          <h1 className="text-3xl font-bold">{artwork.title}</h1>
          <div className="flex items-center mt-2 space-x-2">
            <span className="text-slate-400">by</span>
            <img src={artwork.artist.avatarUrl} alt={artwork.artist.name} className="w-6 h-6 rounded-full" />
            <span className="font-semibold text-violet-400">{artwork.artist.name}</span>
          </div>
          <p className="mt-4 text-slate-300">{artwork.description}</p>
        </div>
        
        <div className="p-6 bg-slate-900 rounded-lg border border-slate-800">
            <div className="text-sm text-slate-400">Current Price</div>
            <div className="text-4xl font-bold flex items-center mt-1">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mr-2"><path d="M12 22V12m0-10v10m0 0L8 8m4 4l4-4m-4 10l-4-4m4 4l4 4"/></svg>
              {artwork.price} ETH
            </div>
            <Button onClick={handleBuy} disabled={isBuying} className="w-full mt-6 py-3 text-lg">
                {isBuying ? <><LoadingSpinner className="mr-2"/>Processing...</> : 'Buy Now'}
            </Button>
        </div>

        <div className="p-6 bg-slate-900 rounded-lg border border-slate-800">
          <h3 className="font-bold text-lg mb-4">Transaction History</h3>
          <ul className="space-y-3">
            {transactions.map(tx => (
              <li key={tx.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                   <span className={`px-2 py-0.5 rounded-full text-xs mr-3 ${tx.type === 'Mint' ? 'bg-blue-900 text-blue-300' : 'bg-green-900 text-green-300'}`}>{tx.type}</span>
                   <div>
                     <p>From: <span className="font-mono text-slate-400">{tx.from.substring(0,8)}...</span></p>
                     <p>To: <span className="font-mono text-slate-400">{tx.to.substring(0,8)}...</span></p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="font-semibold">{tx.price > 0 ? `${tx.price} ETH` : '--'}</p>
                   <p className="text-slate-500 text-xs">{new Date(tx.timestamp).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailPage;
