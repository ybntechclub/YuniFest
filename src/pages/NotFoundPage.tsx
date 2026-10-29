import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F6F7F9] text-slate-950 flex items-center justify-center px-4">
      <div className="text-center p-10 rounded-[32px] bg-white border-[1.5px] border-slate-900 shadow-solid-pop max-w-md w-full">
        <div className="font-headline font-black text-6xl text-[#2B59FF] mb-2">
          404
        </div>
        <h1 className="font-headline font-black text-2xl text-slate-950 uppercase mb-3">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mb-6 font-display">
          The festival page you are looking for does not exist or may have been relocated.
        </p>
        <Link
          to="/"
          className="btn-voltage inline-flex items-center gap-2 text-xs py-3 px-6"
        >
          <Home className="w-4 h-4" />
          <span>Back to Festival Home</span>
        </Link>
      </div>
    </div>
  );
};
