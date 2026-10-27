import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-md p-8 rounded-2xl bg-[#0D2345] border border-slate-700 shadow-card-elevated">
        <div className="font-display font-black text-6xl text-[#F5C451] mb-2">
          404
        </div>
        <h1 className="font-display font-bold text-xl text-white mb-2">
          Page Not Found
        </h1>
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          The requested page could not be located on the official YUNIFEST 2026 website.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#07152F] bg-gradient-to-r from-[#FDE047] to-[#F5C451] hover:brightness-110 shadow-gold-glow"
        >
          <Home className="w-4 h-4 text-[#07152F]" />
          <span>Return to Festival Homepage</span>
        </Link>
      </div>
    </div>
  );
};
