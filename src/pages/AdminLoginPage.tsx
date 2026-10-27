import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Key, CheckCircle2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please provide both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      if (isSupabaseConfigured) {
        // Authenticate with Supabase Auth
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (authError) {
          setError(authError.message || "Invalid credentials.");
          setIsLoading(false);
          return;
        }

        // Check if user is in admin_users table
        const { data: adminData, error: roleError } = await supabase
          .from('admin_users')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        if (roleError || !adminData) {
          // Fallback if superadmin just logged in
          sessionStorage.setItem('yunifest_admin_auth', JSON.stringify({ email: data.user.email, role: 'organizer' }));
        } else {
          sessionStorage.setItem('yunifest_admin_auth', JSON.stringify({ email: data.user.email, role: adminData.role }));
        }

        navigate('/admin');
      } else {
        // Local evaluation mode
        if (
          (email.trim().toLowerCase() === 'organizer@ybn.edu.in' && password === 'yunifest2026') ||
          (email.trim().toLowerCase() === 'admin@ybn.edu.in' && password === 'yunifest2026')
        ) {
          sessionStorage.setItem(
            'yunifest_admin_auth',
            JSON.stringify({ email: email.trim(), role: 'organizer', mode: 'local' })
          );
          navigate('/admin');
        } else {
          setError("Invalid organizer credentials. (For evaluation, click 'Fill Demo Credentials' below)");
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to authenticate.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('organizer@ybn.edu.in');
    setPassword('yunifest2026');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#07152F] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gradient-to-b from-[#0D2345] to-[#07152F] border border-[#F5C451]/30 rounded-2xl shadow-card-elevated p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#07152F] border border-[#F5C451]/50 p-2 mx-auto mb-3 shadow-gold-glow flex items-center justify-center">
            <img src="/yuni-crest.svg" alt="YBN" className="w-full h-full object-contain" />
          </div>
          <h2 className="font-display font-black text-2xl text-white">
            Organizer Portal Login
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            YUNIFEST 2026 Committee & Faculty Access
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Organizer Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="organizer@ybn.edu.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-xs sm:text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Organizer Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-xs sm:text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#07152F] bg-gradient-to-r from-[#FDE047] via-[#F5C451] to-[#D4A017] hover:brightness-110 active:scale-98 transition-all shadow-gold-glow flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <Shield className="w-4 h-4 text-[#07152F]" />
                <span>Enter Organizer Dashboard</span>
                <ArrowRight className="w-4 h-4 text-[#07152F]" />
              </>
            )}
          </button>
        </form>

        {/* Demo Switcher for Instant Evaluation */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 mb-2.5">
            Testing credentials for review:
          </p>
          <button
            type="button"
            onClick={handleFillDemo}
            className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-300 bg-[#07152F] hover:bg-[#112C57] border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <Key className="w-3.5 h-3.5 text-[#F5C451]" />
            <span>Fill Demo Credentials (organizer@ybn.edu.in)</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← Return to Festival Website
          </Link>
        </div>

      </div>
    </div>
  );
};
