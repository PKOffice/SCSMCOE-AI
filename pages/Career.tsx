import React, { useState, useEffect } from 'react';
import { firestore } from '../services/firebaseService';
import { CareerOpportunity } from '../types';
import { Briefcase, Globe, Landmark, MapPin, ExternalLink } from 'lucide-react';

export const Career: React.FC = () => {
  const [jobs, setJobs] = useState<CareerOpportunity[]>([]);
  const [filter, setFilter] = useState<'All' | 'Domestic' | 'Foreign'>('All');

  useEffect(() => {
    firestore.getJobs().then(setJobs);
  }, []);

  const filtered = jobs.filter(j => filter === 'All' || j.region === filter);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-2">Global Engineering Hub</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            
            <h3 className="text-xl font-black text-slate-800 mb-1 uppercase tracking-tight">{job.role}</h3>
            <p className="text-indigo-600 font-bold mb-4">{job.company}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-right justify-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Apply by: {job.deadline}</span>
              </div>
            </div>

            <p className="text-slate-500 text-sm font-medium mb-8 line-clamp-2 leading-relaxed">{job.description}</p>
            
            <button className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-4 rounded-2xl transition-all uppercase tracking-widest flex items-center justify-center gap-3 group-hover:scale-[1.02]">
              Apply Now <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};