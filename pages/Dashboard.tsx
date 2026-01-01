import React, { useState, useEffect } from 'react';
import { firestore } from '../services/firebaseService';
import { geminiService } from '../services/geminiService';
import { Notice, CareerOpportunity } from '../types';
import { Sparkles, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [recentNotice, setRecentNotice] = useState<Notice | null>(null);
  const [aiSummary, setAiSummary] = useState('Generating campus summary...');
  const [recentJob, setRecentJob] = useState<CareerOpportunity | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const notices = await firestore.getNotices();
      const jobs = await firestore.getJobs();
      if (notices.length > 0) {
        setRecentNotice(notices[0]);
        const summary = await geminiService.summarizeNotice(notices[0].content);
        setAiSummary(summary);
      }
      if (jobs.length > 0) setRecentJob(jobs[0]);
    };
    loadData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#0F172A] rounded-[3rem] p-10 md:p-16 text-white shadow-2xl shadow-slate-200">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Sparkles size={200} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Zap size={14} className="animate-pulse" /> Live Campus OS
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase tracking-tight">
            Welcome to <span className="text-indigo-500">SCSMCOE</span> AI
          </h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">
            Your proactive engineering portal. From Nepti campus updates to global engineering careers, centralized via AI.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/career" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3">
              Explore Global Jobs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Briefing Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] neo-shadow border border-slate-100 flex items-start gap-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
              <Zap className="text-indigo-600 w-8 h-8" />
            </div>
            <div>
              <h2 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2">AI Campus Briefing</h2>
              <p className="text-xl font-black text-slate-800 leading-snug uppercase tracking-tight mb-4">
                {aiSummary}
              </p>
              <div className="flex gap-4">
                <Link to="/notices" className="text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors flex items-center gap-2">
                  View Notice Board <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Career Card */}
             <div className="bg-white p-8 rounded-[2.5rem] neo-shadow border border-slate-100 group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="text-emerald-600 w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">New Lead</span>
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Top Opportunity</h3>
                <p className="text-lg font-black text-slate-800 mb-6 uppercase leading-tight">
                  {recentJob ? `${recentJob.role} at ${recentJob.company}` : 'Fetching Careers...'}
                </p>
                <Link to="/career" className="w-full py-4 bg-slate-50 hover:bg-emerald-600 hover:text-white rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-600 text-center block transition-all">
                  Apply Now
                </Link>
             </div>

             {/* Study Card */}
             <div className="bg-white p-8 rounded-[2.5rem] neo-shadow border border-slate-100 group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="text-amber-600 w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest">In Focus</span>
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Academic Pulse</h3>
                <p className="text-lg font-black text-slate-800 mb-6 uppercase leading-tight">
                  Mid-Sem Exams approach in 14 days
                </p>
                <Link to="/academics" className="w-full py-4 bg-slate-50 hover:bg-amber-600 hover:text-white rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-600 text-center block transition-all">
                  Check Syllabus
                </Link>
             </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-20">
              <Sparkles size={80} />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">Gemini Pro Assistant</h3>
            <p className="text-sm font-bold leading-relaxed mb-6">
              "You have 2 pending assignments and a placement drive scheduled for Friday. Ready to prepare?"
            </p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
              Initialize Advisor
            </button>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 neo-shadow">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Nepti Canteen Live</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <span className="text-xs font-bold text-slate-800 uppercase">Special Thali</span>
                <span className="text-[10px] font-black text-indigo-600 uppercase">₹60</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <span className="text-xs font-bold text-slate-800 uppercase">Aloo Paratha</span>
                <span className="text-[10px] font-black text-indigo-600 uppercase">₹35</span>
              </div>
              <Link to="/canteen" className="block text-center text-[9px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest mt-4">Full Menu</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};