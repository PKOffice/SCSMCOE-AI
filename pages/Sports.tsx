import React from 'react';
import { Trophy, Activity, Timer, Users, ChevronRight, Zap, Target, Dumbbell } from 'lucide-react';

export const Sports: React.FC = () => {
  const liveMatches = [
    { teamA: 'SCSMCOE', teamB: 'COEP', score: '142/4 (18.2)', sport: 'Cricket', status: 'LIVE' },
    { teamA: 'MECH-A', teamB: 'CIVIL-B', score: '2 - 0', sport: 'Football', status: 'HALF TIME' }
  ];

  const upcomingFixtures = [
    { title: 'Inter-Dept Volleyball', time: 'Tomorrow, 4 PM', venue: 'Court A', intensity: 'High' },
    { title: 'Badminton Singles', time: 'Wed, 5 PM', venue: 'Gymkhana', intensity: 'Medium' }
  ];

  const leaderboard = [
    { dept: 'Mechanical', wins: 12, points: 120, color: 'bg-emerald-500' },
    { dept: 'Computer Sci', wins: 10, points: 105, color: 'bg-blue-500' },
    { dept: 'Civil', wins: 8, points: 85, color: 'bg-amber-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* 1. Neon Header Section */}
      <div className="bg-[#0F172A] rounded-[3rem] p-8 md:p-12 border border-emerald-500/20 relative overflow-hidden shadow-2xl shadow-emerald-500/5">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <Activity size={200} className="text-emerald-500" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/40">
              <Trophy className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">The Arena</h1>
              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">Campus Performance Dashboard</p>
            </div>
          </div>
          
          {/* Live Ticker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveMatches.map((match, i) => (
              <div key={i} className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-[2rem] flex items-center justify-between group hover:border-emerald-500/50 transition-all">
                <div className="space-y-1">
                  <span className="flex items-center gap-2 text-emerald-400 text-[8px] font-black uppercase">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> {match.status} • {match.sport}
                  </span>
                  <p className="text-white font-black text-lg">{match.teamA} <span className="text-slate-500 italic">vs</span> {match.teamB}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-white tracking-tighter">{match.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 2. Fixtures & Tournaments */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Upcoming Action</h2>
            <button className="text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">Full Calendar <ChevronRight size={12}/></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingFixtures.map((fix, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 neo-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-6 -mt-6 transition-colors group-hover:bg-emerald-50" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                      <Target size={18} />
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{fix.intensity} Match</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2">{fix.title}</h3>
                  <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase">
                    <span className="flex items-center gap-1"><Timer size={12}/> {fix.time}</span>
                    <span className="flex items-center gap-1 font-black text-slate-900">{fix.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Equipment Status Section */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 neo-shadow">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10">Equipment Inventory</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Cricket Kits', val: 4, total: 10, icon: Activity },
                { label: 'Footballs', val: 8, total: 8, icon: Zap },
                { label: 'Gym Slots', val: 12, total: 30, icon: Dumbbell },
                { label: 'Table Tennis', val: 1, total: 4, icon: Target }
              ].map((item, i) => (
                <div key={i} className="text-center space-y-4">
                  <div className="relative inline-block">
                    <svg className="w-20 h-20 -rotate-90">
                      <circle cx="40" cy="40" r="36" fill="transparent" stroke="#F1F5F9" strokeWidth="8" />
                      <circle cx="40" cy="40" r="36" fill="transparent" stroke={item.val/item.total > 0.5 ? '#10B981' : '#F59E0B'} strokeWidth="8" strokeDasharray={`${(item.val/item.total) * 226} 226`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <item.icon size={18} className="text-slate-300" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-sm font-black text-slate-800">{item.val} / {item.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Performance Rankings Side */}
        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
              <Trophy size={80} />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-8">Dept Leaderboard</h3>
            <div className="space-y-8">
              {leaderboard.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">{item.dept}</span>
                    <span className="text-xs font-black text-emerald-400">{item.points} PTS</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-1000`} 
                      style={{ width: `${(item.points/120)*100}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-2xl text-[9px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-500/20">
              View Detailed Stats
            </button>
          </div>

          <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 flex flex-col items-center text-center">
             <div className="w-20 h-20 rounded-full bg-white p-1 border-4 border-emerald-500 mb-6">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=athlete" className="w-full h-full rounded-full" alt="MVP" />
             </div>
             <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2">MVP OF THE MONTH</h4>
             <p className="text-xl font-black text-slate-800 uppercase leading-tight mb-1">Rohan Deshmukh</p>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Mech Engineering • Captain</p>
             <div className="flex gap-2">
                <span className="bg-white px-3 py-1 rounded-full text-[8px] font-black text-slate-600 border border-slate-100">8 MATCHES</span>
                <span className="bg-white px-3 py-1 rounded-full text-[8px] font-black text-slate-600 border border-slate-100">4 MAN OF MATCH</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};