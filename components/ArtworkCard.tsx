import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Artwork } from '../types';

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const navigate = useNavigate();

  const handleArtistClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/profile/${artwork.artist.id}`);
  };

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden group border border-slate-800 hover:border-violet-500 transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/artwork/${artwork.id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate group-hover:text-violet-400 transition-colors">{artwork.title}</h3>
          <div
            className="flex items-center mt-2 cursor-pointer"
            onClick={handleArtistClick}
            onKeyDown={(e) => { if (e.key === 'Enter') handleArtistClick(e); }}
            role="link"
            tabIndex={0}
            aria-label={`View profile of ${artwork.artist.name}`}
          >
            <img src={artwork.artist.avatarUrl} alt="" className="w-6 h-6 rounded-full mr-2" />
            <span className="text-sm text-slate-400 hover:text-violet-400 transition-colors">{artwork.artist.name}</span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs text-slate-500">Price</span>
            <span className="text-md font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1"><path d="M12 22V12m0-10v10m0 0L8 8m4 4l4-4m-4 10l-4-4m4 4l4 4"/></svg>
              {artwork.price} ETH
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArtworkCard;