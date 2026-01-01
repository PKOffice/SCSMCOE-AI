import React, { useState, useEffect } from 'react';
import { firestore } from '../services/firebaseService';
import { CareerOpportunity, AlumniMentor } from '../types';
import { Briefcase, Globe, Landmark, MapPin, ExternalLink, Users, Sparkles, MessageCircle } from 'lucide-react';

export const Career: React.FC = () => {
  const [jobs, setJobs] = useState<CareerOpportunity[]>([]);
  const [filter, setFilter] = useState<'All' | 'Domestic' | 'Foreign'>('All');
  
  const mentors: AlumniMentor[] = [
    { id: '1', name: 'Sanket Patil', company: 'Google', location: 'London, UK', batch: 2018, sector: 'CS' },
    { id: '2', name: 'Priya Shinde', company: 'Tesla', location: 'California, USA', batch: 2019, sector: 'Mechanical' },
    { id: '3', name: 'Amit Kulkarni', company: 'L&T', location: 'Mumbai, India', batch: 2015, sector: 'Civil' }
  ];

  useEffect(() => {
    firestore.getJobs().then(setJobs);
  }, []);

  const filtered = jobs.filter(j => filter === 'All' || j.region === filter);

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-2">Global Career Hub</h1>
          <p className="text-slate-500 font-medium italic">Direct bridge from Nepti to the World</p>
        </div>
        <div className="bg-white p-1.5 rounded-2xl border flex gap-1 neo-shadow">
          {['All', 'Domestic', 'Foreign'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              {f === 'Domestic' ? <span className="flex items-center gap-2"><Landmark size={12}/> India</span> : f === 'Foreign' ? <span className="flex items-center gap-2"><Globe size={12}/> International</span> : 'Explore All'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-2">Active Opportunities</h2>
          <div className="grid grid-cols-1 gap-8">
            {filtered.map(job => (
              <div key={job.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 neo-shadow group hover:border-indigo-500/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 transition-colors">
                    <Briefcase className="text-indigo-600 w-8 h-8" />
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${job.region === 'Foreign' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                    {job.region} Opportunity
                  </span>
                </div>
                
                <h3 className="text-2xl font-black text-slate-800 mb-1 uppercase tracking-tight">{job.role}</h3>
                <p className="text-indigo-600 font-bold mb-4">{job.company}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-right justify-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Apply by: {job.deadline}</span>
                  </div>
                </div>

                <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">{job.description}</p>
                
                <button className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-4 rounded-2xl transition-all uppercase tracking-widest flex items-center justify-center gap-3">
                  Quick Apply <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0F172A] p-8 rounded-[2.5rem] text-white neo-shadow relative overflow-hidden group">
            <Sparkles className="absolute -top-4 -right-4 w-32 h-32 opacity-10 rotate-12 group-hover:scale-125 transition-transform" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2">
              <Users size={16} /> Alumni Mentorship
            </h3>
            <p className="text-sm font-bold leading-relaxed mb-8">
              Get matched with SCSMCOE alumni working at top global firms.
            </p>
            <div className="space-y-4 mb-8">
              {mentors.map(mentor => (
                <div key={mentor.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.name}`} className="w-10 h-10 rounded-xl bg-slate-800" alt={mentor.name} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-tight">{mentor.name}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">{mentor.company} • {mentor.location}</p>
                  </div>
                  <MessageCircle size={14} className="ml-auto text-indigo-400" />
                </div>
              ))}
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl text-[9px] uppercase tracking-widest transition-all">
              Find My AI Match
            </button>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 neo-shadow">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Placement Stats</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <p className="text-3xl font-black text-slate-900">85%</p>
                <p className="text-[10px] font-black text-emerald-500 uppercase">Placed (2025)</p>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[85%]"></div>
              </div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest text-center">Batch of 2025 • Nepti Campus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};