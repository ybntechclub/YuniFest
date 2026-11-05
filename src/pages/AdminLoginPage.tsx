import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Key, CheckCircle2, Sparkles } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('organizer@ybn.edu.in');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fillDefaultCredentials = () => {
    setEmail('organizer@ybn.edu.in');
    setPassword('yunifest2026');
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setError("Please provide both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const envEmail = (
        import.meta.env.YUNIFEST_ADMIN_EMAIL || 
        import.meta.env.VITE_ADMIN_EMAIL || 
        'organizer@ybn.edu.in'
      ).trim().toLowerCase();

      const envPassword = (
        import.meta.env.YUNIFEST_ADMIN_PASSWORD || 
        import.meta.env.VITE_ADMIN_PASSWORD || 
        'yunifest2026'
      ).trim();

      // Master organizer authentication (env or built-in festival credentials)
      const isMasterAdmin = 
        cleanEmail === envEmail && cleanPass === envPassword;

      if (isMasterAdmin) {
        sessionStorage.setItem(
          'yunifest_admin_auth',
          JSON.stringify({ email: cleanEmail, role: 'organizer', mode: 'master' })
        );
        navigate('/admin');
        return;
      }

      // If not master credentials, attempt Supabase Auth if configured
      if (isSupabaseConfigured) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPass,
        });

        if (!authError && data?.user) {
          const { data: adminData } = await supabase
            .from('admin_users')
            .select('role')
            .eq('user_id', data.user.id)
            .single();

          sessionStorage.setItem(
            'yunifest_admin_auth', 
            JSON.stringify({ email: data.user.email, role: adminData?.role || 'organizer' })
          );
          navigate('/admin');
          return;
        }
      }

      setError("Invalid organizer credentials. Click 'AUTO-FILL DEMO / MASTER PASS' below to sign in instantly.");
    } catch (err: any) {
      setError(err.message || "Failed to authenticate.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F6F7F9] text-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border-[1.5px] border-slate-900 rounded-[32px] shadow-solid-pop-lg p-8 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-white border-[1.5px] border-slate-900 p-1 mx-auto mb-4 shadow-sm flex items-center justify-center overflow-hidden -rotate-6">
            <img src="/ybn-logo.png" alt="YBN University" className="w-full h-full object-contain animate-spin-slow" />
          </div>
          <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-950 uppercase tracking-tight">
            ORGANIZER <span className="font-script text-[#2B59FF] normal-case text-[1.15em] font-bold">portal ~</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1 font-display">
            YUNIFEST 2026 Committee &amp; Faculty Access
          </p>
        </div>

        {/* Quick Fill Helper */}
        <div className="mb-6 p-3.5 rounded-2xl bg-[#FEF08A]/60 border-[1.5px] border-slate-900 flex items-center justify-between gap-3">
          <div className="text-[11px] font-mono leading-tight">
            <span className="font-black block text-slate-900">COMMITTEE ACCESS:</span>
            <span className="text-slate-700">organizer@ybn.edu.in</span>
          </div>
          <button
            type="button"
            onClick={fillDefaultCredentials}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-[#2B59FF] text-white text-[10px] font-mono font-bold tracking-wider uppercase transition-colors shrink-0 shadow-sm flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-[#CCFF00]" />
            <span>AUTO-FILL</span>
          </button>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border-[1.5px] border-red-500 text-red-900 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Official Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="organizer@ybn.edu.in"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F6F7F9] border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-medium focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Portal Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F6F7F9] border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-medium focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-voltage w-full py-3.5 text-xs justify-center font-bold"
            >
              <span>{isLoading ? 'AUTHENTICATING...' : 'SIGN IN TO DASHBOARD'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-200">
          <Link to="/" className="text-xs font-mono font-bold text-slate-500 hover:text-slate-950">
            ← Back to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
};
