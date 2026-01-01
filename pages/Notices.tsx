import React, { useState, useEffect } from 'react';
import { firestore } from '../services/firebaseService';
import { Notice } from '../types';
import { Search, Bell, Filter, AlertCircle, Calendar } from 'lucide-react';

export const Notices: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    firestore.getNotices().then(setNotices);
  }, []);

  const filtered = notices.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || 
                         n.content.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'All' || n.category === category;
    return matchesSearch && matchesCat;
  });

  const categories = ['All', 'Academics', 'Placement', 'Events', 'Maintenance'];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-2">Notice Center</h1>
          <p className="text-slate-500 font-medium">Official SCSMCOE broadcast system</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search notices..."
              className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all neo-shadow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${category === cat ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-400 hover:bg-slate-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map(notice => (
          <div key={notice.id} className="glass p-8 rounded-[2rem] neo-shadow relative group hover:scale-[1.01] transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${notice.isUrgent ? 'bg-red-500 text-white animate-pulse' : 'bg-indigo-100 text-indigo-600'}`}>
                  {notice.category}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Calendar size={12} /> {notice.date}
                </span>
              </div>
              {notice.isUrgent && <AlertCircle className="text-red-500 w-5 h-5" />}
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-3 uppercase tracking-tight leading-tight">{notice.title}</h3>
            <p className="text-slate-600 leading-relaxed font-medium text-sm mb-6">{notice.content}</p>
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Sent via: {notice.department}</span>
              <button className="text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">Share Notice</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};