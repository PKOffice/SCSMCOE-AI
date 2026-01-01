import React, { useState } from 'react';
import { firestore, notifications } from '../services/firebaseService';
import { UserRole, Notice } from '../types';
import { ShieldCheck, Plus, Send, AlertCircle, BarChart3 } from 'lucide-react';

export const Admin: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<any>('Academics');
  const [isUrgent, setIsUrgent] = useState(false);
  const [status, setStatus] = useState('');

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    const notice: Notice = {
      id: String(Date.now()),
      title,
      content,
      category,
      isUrgent,
      department: 'Prime Admin Office',
      date: new Date().toISOString().split('T')[0]
    };

    await firestore.addNotice(notice);
    if (isUrgent) {
      await notifications.sendEmail('students@scsmcoe.ac.in', `URGENT: ${title}`, content);
    }
    
    setStatus('Notice Broadcasted Successfully!');
    setTitle('');
    setContent('');
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-100">
          <ShieldCheck className="text-white w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Prime Dashboard</h1>
          <p className="text-slate-500 font-medium">Campus Authority Access Control</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-10 rounded-[2.5rem] neo-shadow border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-8 uppercase tracking-tight flex items-center gap-3">
              <Plus className="text-indigo-600" /> New Broadcast
            </h2>
            
            <form onSubmit={handleBroadcast} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Subject Header</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Holiday Announcement"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Category</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Academics</option>
                    <option>Placement</option>
                    <option>Events</option>
                    <option>Maintenance</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    type="checkbox" 
                    id="urgent" 
                    className="w-6 h-6 rounded-lg border-slate-200 accent-red-500"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                  />
                  <label htmlFor="urgent" className="text-[10px] font-black text-red-500 uppercase tracking-widest cursor-pointer">Mark as Critical</label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Message Content</label>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-40"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Draft your detailed campus message here..."
                  required
                />
              </div>

              {status && <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl text-center text-[10px] font-black uppercase tracking-widest">{status}</div>}

              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-200 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-4">
                Deploy Broadcast <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white neo-shadow">
            <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-3">
              <BarChart3 className="text-indigo-400" /> Stats
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Total Outreach</p>
                <p className="text-3xl font-black">1,402 Students</p>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[85%]"></div>
              </div>
              <p className="text-[10px] text-indigo-300 font-bold">85% Engagement Rate</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 neo-shadow">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-3">
              <AlertCircle className="text-amber-500" /> Pending Fixes
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-amber-500">
                <p className="text-[10px] font-black uppercase mb-1 text-slate-800">Canteen Water Leak</p>
                <p className="text-[9px] font-bold text-slate-400">Reported 2h ago by Canteen Staff</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-amber-500">
                <p className="text-[10px] font-black uppercase mb-1 text-slate-800">Lab 4 Projector</p>
                <p className="text-[9px] font-bold text-slate-400">Reported Yesterday by Faculty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};