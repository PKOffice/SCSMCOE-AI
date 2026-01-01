import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../services/firebaseService';
import { Sparkles, ShieldCheck, Cpu, Globe, Zap } from 'lucide-react';

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await firebaseAuth.signIn(email);
      // Simulate a "System Initialization" delay for effect
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      setError(err.message || 'Login failed. Use @scsmcoe.ac.in email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="glass p-10 rounded-[3rem] neo-shadow border-white/10 backdrop-blur-2xl">
          <div className="text-center mb-10">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-[2rem] mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-indigo-500/40 relative group">
              <Sparkles className="text-white w-12 h-12 group-hover:scale-110 transition-transform" />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-lg shadow-lg">
                <Cpu size={14} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-3 uppercase">SCSMCOE <span className="text-indigo-400">AI</span></h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Initialize Campus OS v3.1</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">
                <Globe size={12} /> Institutional Access
              </label>
              <input 
                type="email" 
                required
                placeholder="yourname@scsmcoe.ac.in"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-bold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3">
                <Zap size={14} className="text-red-500" />
                <p className="text-red-400 text-[10px] font-black uppercase">{error}</p>
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl shadow-2xl shadow-indigo-500/40 transition-all uppercase tracking-[0.2em] disabled:opacity-50 group flex items-center justify-center gap-3"
            >
              {loading ? (
                <>Initializing Core... <Cpu size={18} className="animate-spin" /></>
              ) : (
                <>Authorize Session <Zap size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-slate-500 text-[9px] font-black uppercase tracking-widest">
              <ShieldCheck size={14} className="text-emerald-500" />
              Verified @ Nepti Campus Security
            </div>
            <div className="flex gap-4">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse [animation-delay:200ms]" />
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse [animation-delay:400ms]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};