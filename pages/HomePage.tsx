
import React, { useState, useEffect } from 'react';
import ArtworkCard from '../components/ArtworkCard';
import SkeletonCard from '../components/SkeletonCard';
import { Button } from '../components/Button';
import { getArtworks } from '../data/mock';
import { Artwork } from '../types';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      setIsLoading(true);
      const data = await getArtworks();
      setArtworks(data);
      setIsLoading(false);
    };
    fetchArtworks();
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center py-16 rounded-xl bg-slate-900 border border-slate-800">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">Discover, Collect, and Sell</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">The premier decentralized marketplace for unique, chain-verified digital art.</p>
        <div className="mt-8 flex justify-center space-x-4">
          <Link to="/create">
            <Button variant="primary" className="px-8 py-3 text-base">Create Artwork</Button>
          </Link>
          <Button variant="outline" className="px-8 py-3 text-base">Explore Now</Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Artworks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
            : artworks.slice(0, 4).map(artwork => <ArtworkCard key={artwork.id} artwork={artwork} />)}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Recent Additions</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
            : artworks.slice(4).map(artwork => <ArtworkCard key={artwork.id} artwork={artwork} />)}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
