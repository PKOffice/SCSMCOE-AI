import React, { useState } from 'react';
import { Users, Award, ShieldCheck, Zap, Star, Share2, Flame, Gift } from 'lucide-react';

export const Community: React.FC = () => {
  const [missions] = useState([
    { id: 1, title: 'AI Study Sync', description: 'Generate a study plan for one subject', points: 50, completed: true },
    { id: 2, title: 'Canteen Critic', description: 'Rate today\'s Misal Pav', points: 20, completed: false },
    { id: 3, title: 'Placement Pulse', description: 'View 3 global career opportunities', points: 30, completed: false }
  ]);

  const ambassadors = [
    { name: 'Omkar G.', dept: 'Mechanical', year: 'TE', cred: 1450, badge: 'Lead Node' },
    { name: 'Rucha K.', dept: 'Computer Sci', year: 'BE', cred: 1200, badge: 'Tech Node' },
    { name: 'Saurabh M.', dept: 'Civil', year: 'SE', cred: 980, badge: 'Community Node' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-2">Campus Community</h1>
          <p className="text-slate-500 font-medium">Earn Cred, Lead your Dept, and Shape Nepti's Future</p>
        </div>
        <div className="bg-indigo-600 px-8 py-4 rounded-[2rem] text-white shadow-xl shadow-indigo-100 flex items-center gap-4">
          <div>
            <p className="text-[9px] font-black uppercase opacity-70">My Campus Cred</p>
            <p className="text-3xl font-black">450 <span className="text-sm opacity-50">PTS</span></p>
          </div>
          <Award className="w-10 h-10 opacity-30" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Daily Missions */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] neo-shadow border border-slate-100">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
              <Flame className="text-orange-500" /> Active Missions
            </h2>
            <div className="space-y-4">
              {missions.map(m => (
                <div key={m.id} className={`p-6 rounded-3xl border flex items-center justify-between transition-all ${m.completed ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-indigo-100 hover:border-indigo-500 shadow-sm'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${m.completed ? 'bg-slate-200 text-slate-400' : 'bg-indigo-50 text-indigo-600'}`}>
                      {m.completed ? <Star size={20} /> : <Zap size={20} />}
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase text-slate-900">{m.title}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{m.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${m.completed ? 'text-slate-400' : 'text-indigo-600'}`}>+{m.points}</p>
                    {m.completed && <span className="text-[8px] font-black text-emerald-500 uppercase">Done</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white neo-shadow relative overflow-hidden group">
             <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12 group-hover:scale-125 transition-transform">
                <ShieldCheck size={200} />
             </div>
             <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Refer a Batchmate</h3>
             <p className="text-slate-400 text-sm font-medium mb-8 max-w-sm">Help your friends get the Nepti AI advantage. You both earn 100 Cred points on their first login.</p>
             <button className="flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all">
                Share My Referral Link <Share2 size={16} />
             </button>
          </div>
        </div>

        {/* Ambassador Leaderboard */}
        <div className="lg:col-span-5 space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] neo-shadow border border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Top Department Nodes</h3>
              <div className="space-y-6">
                {ambassadors.map((node, i) => (
                  <div key={node.name} className="flex items-center gap-4 group">
                    <div className="relative">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${node.name}`} className="w-14 h-14 rounded-2xl bg-slate-50 border-2 border-slate-100 group-hover:border-indigo-500 transition-all" alt={node.name} />
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-slate-900 text-white text-[10px] font-black rounded-lg flex items-center justify-center">#{i+1}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-black uppercase text-slate-900">{node.name}</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{node.dept} • {node.year}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[7px] font-black uppercase rounded-md tracking-tighter">
                        {node.badge}
                      </span>
                    </div>
                    <div className="text-right">
                       <p className="text-lg font-black text-slate-800">{node.cred}</p>
                       <p className="text-[7px] font-black text-slate-400 uppercase">Cred</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 bg-slate-50 hover:bg-indigo-600 hover:text-white text-slate-400 font-black rounded-2xl text-[9px] uppercase tracking-widest transition-all">
                Apply for Node Program
              </button>
           </div>

           <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-[2.5rem] text-white shadow-2xl flex flex-col items-center text-center">
              <Gift className="w-16 h-16 mb-6 opacity-30" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">CRED REDEMPTION</h4>
              <p className="text-xl font-black uppercase leading-tight mb-4">Unlock Canteen Coupons & Gym Passes</p>
              <div className="w-full h-1 bg-white/20 rounded-full mb-6">
                 <div className="w-1/3 h-full bg-white rounded-full"></div>
              </div>
              <p className="text-[9px] font-bold text-indigo-100 uppercase tracking-widest">Progress to next Reward: 33%</p>
           </div>
        </div>
      </div>
    </div>
  );
};