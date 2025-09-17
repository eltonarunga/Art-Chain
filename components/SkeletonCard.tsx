
import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 animate-pulse">
      <div className="aspect-square bg-slate-800"></div>
      <div className="p-4">
        <div className="h-5 bg-slate-800 rounded w-3/4 mb-3"></div>
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-slate-800 mr-2"></div>
          <div className="h-4 bg-slate-800 rounded w-1/2"></div>
        </div>
        <div className="mt-4 flex justify-between items-center">
           <div className="h-3 bg-slate-800 rounded w-1/4"></div>
           <div className="h-5 bg-slate-800 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
