import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Key, CheckCircle2, ArrowUpRight } from 'lucide-react';
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
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (authError) {
          setError(authError.message || "Invalid credentials.");
          setIsLoading(false);
          return;
        }

        const { data: adminData, error: roleError } = await supabase
          .from('admin_users')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        if (roleError || !adminData) {
          sessionStorage.setItem('yunifest_admin_auth', JSON.stringify({ email: data.user.email, role: 'organizer' }));
        } else {
          sessionStorage.setItem('yunifest_admin_auth', JSON.stringify({ email: data.user.email, role: adminData.role }));
        }

        navigate('/admin');
      } else {
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
    <div className="min-h-screen pt-28 pb-20 bg-[#F6F7F9] text-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border-[1.5px] border-slate-900 rounded-[32px] shadow-solid-pop-lg p-8 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
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

        {/* Demo Fast Login Switcher */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] text-slate-500 uppercase font-bold">
              EVALUATION CREDENTIALS
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-mono font-bold text-[#2B59FF] hover:underline"
            >
              Fill Demo Credentials
            </button>
          </div>
          <div className="p-3 rounded-xl bg-[#F6F7F9] border border-slate-300 font-mono text-[11px] text-slate-600 space-y-0.5">
            <div><strong className="text-slate-950">Email:</strong> organizer@ybn.edu.in</div>
            <div><strong className="text-slate-950">Password:</strong> yunifest2026</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs font-mono font-bold text-slate-500 hover:text-slate-950">
            ← Back to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
};
