import React, { useState, useEffect } from 'react';
import { Artwork } from '../types';
import { getArtworks } from '../data/api';
import ArtworkCard from '../components/ArtworkCard';
import SkeletonCard from '../components/SkeletonCard';

const HomePage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArtworks = async () => {
      setIsLoading(true);
      const data = await getArtworks();
      setArtworks(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setIsLoading(false);
    };
    loadArtworks();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />);
    }

    if (artworks.length === 0) {
      return <p className="text-slate-400 col-span-full text-center py-8">No artworks found.</p>;
    }

    return artworks.map(artwork => (
      <ArtworkCard key={artwork.id} artwork={artwork} />
    ));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Discover, Collect, and Sell</h1>
        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">The future of digital art is here. Explore a universe of unique NFTs on ArtChain.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default HomePage;