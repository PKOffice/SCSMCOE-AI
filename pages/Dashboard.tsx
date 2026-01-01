import React, { useState, useEffect } from 'react';
import { firestore, firebaseAuth } from '../services/firebaseService';
import { geminiService } from '../services/geminiService';
import { Notice, CareerOpportunity } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Target, 
  TrendingUp, 
  Utensils, 
  Trophy, 
  BookOpen, 
  LifeBuoy,
  Waves,
  Flame,
  Star,
  Sunrise,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [recentNotice, setRecentNotice] = useState<Notice | null>(null);
  const [aiSummary, setAiSummary] = useState('Synchronizing campus intelligence...');
  const [globalPulse, setGlobalPulse] = useState('Loading your briefing...');
  const [onboardingTip, setOnboardingTip] = useState('Loading tip...');
  const [recentJob, setRecentJob] = useState<CareerOpportunity | null>(null);
  const [showBrief, setShowBrief] = useState(false);
  const user = firebaseAuth.getCurrentUser();

  useEffect(() => {
    // Show morning brief on first load of the day (simulated)
    const hasSeenBrief = sessionStorage.getItem('hasSeenBrief');
    if (!hasSeenBrief) {
      setShowBrief(true);
      sessionStorage.setItem('hasSeenBrief', 'true');
    }

    const loadData = async () => {
      try {
        const notices = await firestore.getNotices();
        const jobs = await firestore.getJobs();
        
        if (notices.length > 0) {
          setRecentNotice(notices[0]);
          const summary = await geminiService.summarizeNotice(notices[0].content);
          setAiSummary(summary);
          
          const pulse = await geminiService.getGlobalPulse({
            noticeCount: notices.length,
            liveMatches: ['Cricket: SCSMCOE vs COEP'],
            canteenSpecial: 'Paneer Lababdar'
          });
          setGlobalPulse(pulse);

          const tip = await geminiService.getOnboardingTip(user?.role || 'Student');
          setOnboardingTip(tip);
        }
        if (jobs.length > 0) setRecentJob(jobs[0]);
      } catch (e) {
        console.error("Dashboard data load failed", e);
      }
    };
    loadData();
  }, [user]);

  const quickActions = [
    { label: 'Syllabus', icon: BookOpen, path: '/academics', color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Canteen', icon: Utensils, path: '/canteen', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Sports', icon: Trophy, path: '/sports', color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Support', icon: LifeBuoy, path: '/support', color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12 relative">
      {/* Morning Brief Modal (The Daily Habit Loop) */}
      {showBrief && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full neo-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-slate-200">
              <Sunrise size={120} />
            </div>
            <button 
              onClick={() => setShowBrief(false)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-400" />
            </button>
            <div className="relative z-10">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full mb-6 inline-block">Morning Briefing</span>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Good Morning, {user?.name?.split(' ')[0]}!</h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">
                Today at SCSMCOE: There are <span className="text-indigo-600 font-bold">2 new notices</span>, the canteen has <span className="text-emerald-600 font-bold">Misal Pav</span> ready, and your department is leading the sports board by <span className="text-amber-600 font-bold">15 points</span>.
              </p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Sparkles size={12} className="text-indigo-500" /> AI Recommendation
                </p>
                <p className="text-xs font-bold text-slate-700 uppercase italic leading-tight">
                  "Check the Career Hub today—3 new German internships were just posted for Mechanical batch."
                </p>
              </div>
              <button 
                onClick={() => setShowBrief(false)}
                className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-4 rounded-2xl uppercase tracking-widest transition-all shadow-xl shadow-slate-200"
              >
                Start My Day
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Adoption Prompt / Mission Card */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 rounded-[2rem] p-6 text-white flex items-center justify-between shadow-xl shadow-rose-100 overflow-hidden relative group">
          <Flame className="absolute -right-4 -top-4 w-24 h-24 opacity-20 rotate-12 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 flex items-center gap-4">
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                <Star className="text-white w-6 h-6" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Daily Habit Mission</p>
                <p className="text-sm font-black uppercase tracking-tight">{onboardingTip}</p>
             </div>
          </div>
          <Link to="/community" className="relative z-10 px-4 py-2 bg-white text-rose-500 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all">
            Get +50 Cred
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#0F172A] rounded-[3rem] p-10 md:p-16 text-white shadow-2xl shadow-indigo-100">
        <div className="absolute -top-20 -right-20 p-10 opacity-10 animate-pulse">
          <Waves size={400} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Zap size={14} className="animate-pulse" /> Official Campus OS • SCSMCOE
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase tracking-tight">
            Elevating <span className="text-indigo-500">SCSMCOE</span> <br/>through AI
          </h1>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl mb-10 flex items-center gap-4 group cursor-pointer hover:bg-white/10 transition-all">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
               <Sparkles className="text-white w-5 h-5 animate-spin-slow" />
            </div>
            <p className="text-sm font-bold italic text-slate-300">
              "{globalPulse}"
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/career" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg shadow-indigo-500/40">
              Explore Global Careers <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <Link 
            key={action.label} 
            to={action.path}
            className="bg-white p-6 rounded-3xl border border-slate-100 neo-shadow flex flex-col items-center justify-center gap-3 group hover:scale-[1.02] transition-all"
          >
            <div className={`w-12 h-12 ${action.bg} ${action.color} rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform`}>
              <action.icon size={24} />
            </div>
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{action.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Briefing Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] neo-shadow border border-slate-100 flex flex-col md:flex-row items-start md:items-center gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform opacity-50" />
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center shrink-0 shadow-xl shadow-indigo-100 relative z-10">
              <Sparkles className="text-white w-10 h-10" />
            </div>
            <div className="flex-1 relative z-10">
              <h2 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2">Notice Briefing</h2>
              <p className="text-2xl font-black text-slate-800 leading-tight uppercase tracking-tight mb-4">
                "{aiSummary}"
              </p>
              <Link to="/notices" className="text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors flex items-center gap-2">
                Open Full Board <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white p-8 rounded-[2.5rem] neo-shadow border border-slate-100 group hover:border-emerald-500/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="text-emerald-600 w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">Global Hub</span>
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Recent Placement</h3>
                <p className="text-lg font-black text-slate-800 mb-6 uppercase leading-tight">
                  {recentJob ? `${recentJob.role} at ${recentJob.company}` : 'Fetching Careers...'}
                </p>
                <Link to="/career" className="w-full py-4 bg-slate-50 hover:bg-emerald-600 hover:text-white rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-600 text-center block transition-all">
                  View Opportunity
                </Link>
             </div>

             <div className="bg-white p-8 rounded-[2.5rem] neo-shadow border border-slate-100 group hover:border-amber-500/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="text-amber-600 w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest">Tracker</span>
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Academic Status</h3>
                <p className="text-lg font-black text-slate-800 mb-6 uppercase leading-tight">
                  Mid-Sem Exams start in 14 days
                </p>
                <Link to="/academics" className="w-full py-4 bg-slate-50 hover:bg-amber-600 hover:text-white rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-600 text-center block transition-all">
                  Get Study Plan
                </Link>
             </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:rotate-12 transition-transform">
              <Sparkles size={80} />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">Gemini Assistant</h3>
            <p className="text-sm font-bold leading-relaxed mb-6">
              "You have a guest lecture on GenAI this Thursday. Should I add it to your calendar?"
            </p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all backdrop-blur-md">
              Start Chat
            </button>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 neo-shadow">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Campus Live Pulse</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl group hover:bg-emerald-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-slate-800 uppercase">Canteen: Misal Pav</span>
                </div>
                <span className="text-[10px] font-black text-indigo-600 uppercase">₹50</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl group hover:bg-indigo-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-slate-800 uppercase">Arena: SCSMCOE v COEP</span>
                </div>
                <span className="text-[10px] font-black text-indigo-600 uppercase">LIVE</span>
              </div>
              <Link to="/events" className="block text-center text-[9px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest mt-4">View Campus Pulse</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};