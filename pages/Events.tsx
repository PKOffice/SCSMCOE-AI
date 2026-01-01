
import React, { useState } from 'react';
// Added missing 'Plus' icon to the imports from lucide-react
import { Trophy, Calendar, Zap, Award, Users, ArrowRight, Heart, Share2, Star, Plus } from 'lucide-react';

export const Events: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(2);
  
  const days = [
    { label: 'Mon', date: 30 },
    { label: 'Tue', date: 1 },
    { label: 'Wed', date: 2 },
    { label: 'Thu', date: 3 },
    { label: 'Fri', date: 4 },
    { label: 'Sat', date: 5 },
    { label: 'Sun', date: 6 }
  ];

  const achievers = [
    { name: 'Pratik', seed: 'pratik', ring: 'border-fuchsia-500' },
    { name: 'Snehal', seed: 'snehal', ring: 'border-indigo-500' },
    { name: 'Rahul', seed: 'rahul', ring: 'border-emerald-500' },
    { name: 'Aditi', seed: 'aditi', ring: 'border-amber-500' },
    { name: 'Vikram', seed: 'vikram', ring: 'border-purple-500' }
  ];

  const events = [
    { title: 'Engineer\'s Day Expo', date: 'Sept 15', category: 'Exhibition', mood: 'indigo', size: 'large', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
    { title: 'AI Hackathon', date: 'Oct 10', category: 'Tech', mood: 'fuchsia', size: 'small', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80' },
    { title: 'Cricket Finals', date: 'Oct 02', category: 'Sports', mood: 'emerald', size: 'small', img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80' },
    { title: 'Cultural Night', date: 'Nov 20', category: 'Culture', mood: 'purple', size: 'large', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* 1. The Story Bar (Achievements) */}
      <div className="flex flex-col gap-6">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-2">Hall of Fame • Stories</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide px-2">
          {achievers.map(ach => (
            <div key={ach.name} className="flex flex-col items-center gap-3 shrink-0">
              <div className={`w-20 h-20 rounded-full border-4 ${ach.ring} p-1 bg-white cursor-pointer hover:scale-110 transition-transform active:scale-95`}>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ach.seed}`} className="w-full h-full rounded-full bg-slate-50" alt={ach.name} />
              </div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{ach.name}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <button className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
              <Plus size={20} />
            </button>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Share Win</span>
          </div>
        </div>
      </div>

      {/* 2. The Dynamic Chronicle Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Feed */}
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center justify-between mb-4 px-2">
             <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">The Chronicle</h3>
             <button className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em] border-b-2 border-indigo-600">View All Events</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, idx) => (
              <div 
                key={idx} 
                className={`group relative overflow-hidden rounded-[2.5rem] bg-slate-900 ${event.size === 'large' ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'} hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 cursor-pointer`}
              >
                <img 
                  src={event.img} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                  alt={event.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-${event.mood}-500/20 backdrop-blur-md border border-${event.mood}-500/30 text-white`}>
                      {event.category}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all"><Heart size={14} /></button>
                      <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all"><Share2 size={14} /></button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{event.date} • Nepti Campus</p>
                    <h4 className="text-3xl font-black text-white uppercase tracking-tight group-hover:translate-x-2 transition-transform">{event.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interaction & Calendar */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 neo-shadow">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Interactive Calendar</h4>
            <div className="flex justify-between mb-8">
              {days.map((day, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedDay(i)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${selectedDay === i ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  <span className="text-[8px] font-black uppercase">{day.label}</span>
                  <span className="text-sm font-black">{day.date}</span>
                </button>
              ))}
            </div>
            <div className="space-y-4">
               <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-slate-800">Robo-Wars Prep</p>
                    <p className="text-[8px] font-bold text-slate-400">4:00 PM • Lab 2</p>
                  </div>
                  <ArrowRight size={14} className="text-slate-300" />
               </div>
               <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-fuchsia-600 animate-pulse" />
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-slate-800">Drama Club Auditions</p>
                    <p className="text-[8px] font-bold text-slate-400">5:30 PM • Seminar Hall</p>
                  </div>
                  <ArrowRight size={14} className="text-slate-300" />
               </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-fuchsia-600 to-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <Zap className="absolute -top-4 -left-4 w-32 h-32 opacity-10 rotate-12 group-hover:scale-125 transition-transform" />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-fuchsia-200 mb-4">Achievement Pulse</h4>
            <p className="text-sm font-bold leading-relaxed mb-8">
              "Batch of 2025 has achieved a record-breaking 85% placement rate within the first month of campus drives!"
            </p>
            <div className="flex items-center gap-4 mb-8">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="w-8 h-8 rounded-full border-2 border-white bg-slate-800" alt="Student" />
                  ))}
               </div>
               <span className="text-[9px] font-black uppercase tracking-widest">+ 42 more today</span>
            </div>
            <button className="w-full bg-white text-indigo-600 font-black py-4 rounded-2xl text-[9px] uppercase tracking-widest transition-all hover:bg-fuchsia-50">
              Celebrate Wins
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
