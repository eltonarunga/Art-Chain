
import React, { useState, useEffect } from 'react';
import { Artwork, User } from '../types';
import { mockUsers, getArtworks } from '../data/mock';
import ArtworkCard from '../components/ArtworkCard';
import SkeletonCard from '../components/SkeletonCard';
import { Button } from '../components/Button';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'created' | 'collected'>('created');

  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);
      // Simulate fetching logged-in user and their artworks
      setUser(mockUsers[0]);
      const allArtworks = await getArtworks();
      setArtworks(allArtworks);
      setIsLoading(false);
    };

    loadProfileData();
  }, []);

  const createdArtworks = artworks.filter(art => art.artist.id === user?.id);
  const collectedArtworks = artworks.slice(0, 2); // Mock collected artworks

  const renderArtworks = (list: Artwork[]) => {
    if (isLoading) {
      return Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />);
    }
    if (list.length === 0) {
      return <p className="text-slate-400 col-span-full text-center py-8">No artworks to display.</p>;
    }
    return list.map(art => <ArtworkCard key={art.id} artwork={art} />);
  };
  
  return (
    <div className="space-y-8">
      {user && (
        <header className="relative h-48 bg-slate-900 rounded-lg border border-slate-800">
          <div className="absolute -bottom-12 left-8">
            <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-slate-950" />
          </div>
        </header>
      )}

      <div className="pt-16 px-8">
        <div className="flex justify-between items-start">
            <div>
                 <h1 className="text-3xl font-bold">{user?.name || '...'}</h1>
                 <p className="text-sm font-mono text-slate-400 mt-1">{user?.walletAddress || '...'}</p>
            </div>
            <Button variant="outline">Edit Profile</Button>
        </div>
      </div>
      
      <div className="border-b border-slate-800">
        <nav className="flex space-x-8 px-8">
          <button onClick={() => setActiveTab('created')} className={`py-4 px-1 text-lg font-medium transition-colors ${activeTab === 'created' ? 'border-b-2 border-violet-500 text-white' : 'text-slate-400 hover:text-white'}`}>
            Created ({createdArtworks.length})
          </button>
          <button onClick={() => setActiveTab('collected')} className={`py-4 px-1 text-lg font-medium transition-colors ${activeTab === 'collected' ? 'border-b-2 border-violet-500 text-white' : 'text-slate-400 hover:text-white'}`}>
            Collected ({collectedArtworks.length})
          </button>
        </nav>
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activeTab === 'created' ? renderArtworks(createdArtworks) : renderArtworks(collectedArtworks)}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
