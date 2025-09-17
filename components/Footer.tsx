
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} ArtChain. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0 text-sm text-slate-400">
          <Link to="#" className="hover:text-violet-400 transition-colors">Terms of Service</Link>
          <Link to="#" className="hover:text-violet-400 transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
