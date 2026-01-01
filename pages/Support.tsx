import React, { useState } from 'react';
import { LifeBuoy, Send, ShieldAlert, Camera, CheckCircle2 } from 'lucide-react';

export const Support: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState('Infrastructure');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-2">Support Desk</h1>
        <p className="text-slate-500 font-medium italic">Intelligent escalation system for Nepti campus</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <div className="bg-white p-10 rounded-[2.5rem] neo-shadow border border-slate-100">
            <h2 className="text-xl font-black text-slate-800 mb-8 uppercase tracking-tight flex items-center gap-3">
              <ShieldAlert className="text-red-500" /> Raise a Concern
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Category</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Infrastructure</option>
                    <option>Canteen</option>
                    <option>Lab Equipment</option>
                    <option>Academic Staff</option>
                    <option>Security</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Evidence (Optional)</label>
                  <button type="button" className="w-full bg-slate-50 border border-dashed border-slate-300 rounded-2xl px-6 py-4 flex items-center justify-center gap-2 text-slate-400 hover:bg-slate-100 transition-all">
                    <Camera size={16} /> <span className="text-[9px] font-black uppercase">Attach Photo</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Detailed Report</label>
                <textarea 
                  required
                  placeholder="Explain the issue clearly. AI will auto-categorize and assign priority..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-8 h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              {submitted && (
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center gap-3 animate-bounce">
                  <CheckCircle2 size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Complaint Logged & AI Priority Assigned</span>
                </div>
              )}

              <button className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-widest flex items-center justify-center gap-3">
                Submit Report <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white neo-shadow">
            <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-3 text-indigo-400">
              <LifeBuoy size={20} /> Resolution Pulse
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Solved (Last 7 Days)</p>
                  <p className="text-4xl font-black">42</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-emerald-400 mb-1">Avg Time</p>
                  <p className="text-2xl font-black">18h</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[92%]"></div>
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">92% Satisfaction Rate at Nepti</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 neo-shadow">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Active Tracking</h3>
            <div className="space-y-4">
              <div className="p-5 bg-slate-50 rounded-2xl border-l-4 border-indigo-500">
                <p className="text-[10px] font-black uppercase text-slate-800 mb-1">Lab 2 Wifi Outage</p>
                <span className="text-[8px] font-black uppercase tracking-widest bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded">In Progress</span>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border-l-4 border-emerald-500 opacity-60">
                <p className="text-[10px] font-black uppercase text-slate-800 mb-1">Canteen Light Fix</p>
                <span className="text-[8px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded">Resolved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};