import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../services/firebaseService';
import { Sparkles, ShieldCheck } from 'lucide-react';

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
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed. Use @scsmcoe.ac.in email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
      <div className="max-w-md w-full glass p-10 rounded-[2.5rem] neo-shadow border-indigo-500/20">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
            <Sparkles className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 uppercase">SCSMCOE AI</h1>
          <p className="text-slate-400 text-sm font-medium">Campus Operating System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">College Email ID</label>
            <input 
              type="email" 
              required
              placeholder="yourname@scsmcoe.ac.in"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-xs font-bold text-center bg-red-400/10 py-3 rounded-xl border border-red-400/20">{error}</p>}

          <button 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-500/20 transition-all uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? 'Authorizing...' : 'Initialize Session'}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          <ShieldCheck size={14} className="text-emerald-500" />
          Restricted to SCSMCOE Faculty & Students
        </div>
      </div>
    </div>
  );
};