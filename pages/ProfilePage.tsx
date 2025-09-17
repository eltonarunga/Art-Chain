import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Artwork, User } from '../types';
import { mockUsers, getArtworks, getUserById } from '../data/mock';
import ArtworkCard from '../components/ArtworkCard';
import SkeletonCard from '../components/SkeletonCard';
import { Button } from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [createdArtworks, setCreatedArtworks] = useState<Artwork[]>([]);
  const [collectedArtworks, setCollectedArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'created' | 'collected'>('created');

  // For simulation, the "logged in" user is always mockUsers[0]
  const loggedInUser = mockUsers[0];
  const isMyProfile = !id || id === loggedInUser.id;

  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);
      
      const profileUserId = id || loggedInUser.id;
      const userData = await (profileUserId === loggedInUser.id ? Promise.resolve(loggedInUser) : getUserById(profileUserId));
      
      if (!userData) {
          setUser(null);
          setIsLoading(false);
          return;
      }
      
      setUser(userData);

      const allArtworks = await getArtworks();
      setCreatedArtworks(allArtworks.filter(art => art.artist.id === userData.id));
      if(isMyProfile) {
          // Mock collected artworks for logged in user
          setCollectedArtworks(allArtworks.slice(0, 2));
      }
      setIsLoading(false);
    };

    loadProfileData();
    if (!isMyProfile) {
        setActiveTab('created');
    }
  }, [id, isMyProfile, loggedInUser.id]);

  const renderArtworks = (list: Artwork[]) => {
    if (isLoading) {
      return Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />);
    }
    if (list.length === 0) {
      return <p className="text-slate-400 col-span-full text-center py-8">No artworks to display.</p>;
    }
    return list.map(art => <ArtworkCard key={art.id} artwork={art} />);
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><LoadingSpinner className="w-12 h-12" /></div>;
  }

  if (!user) {
    return <div className="text-center text-xl">User not found.</div>;
  }
  
  return (
    <div className="space-y-8">
      <header className="relative h-48 bg-slate-900 rounded-lg border border-slate-800">
        <div className="absolute -bottom-12 left-8">
          <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-slate-950" />
        </div>
      </header>

      <div className="pt-16 px-8">
        <div className="flex justify-between items-start">
            <div>
                 <h1 className="text-3xl font-bold">{user.name}</h1>
                 <p className="text-sm font-mono text-slate-400 mt-1">{user.walletAddress}</p>
            </div>
            {isMyProfile && <Button variant="outline">Edit Profile</Button>}
        </div>
      </div>
      
      <div className="border-b border-slate-800">
        <nav className="flex space-x-8 px-8">
          <button onClick={() => setActiveTab('created')} className={`py-4 px-1 text-lg font-medium transition-colors ${activeTab === 'created' ? 'border-b-2 border-violet-500 text-white' : 'text-slate-400 hover:text-white'}`}>
            Created ({createdArtworks.length})
          </button>
          {isMyProfile && (
            <button onClick={() => setActiveTab('collected')} className={`py-4 px-1 text-lg font-medium transition-colors ${activeTab === 'collected' ? 'border-b-2 border-violet-500 text-white' : 'text-slate-400 hover:text-white'}`}>
              Collected ({collectedArtworks.length})
            </button>
          )}
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