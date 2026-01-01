import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { BookOpen, Sparkles, Youtube, CheckCircle, GraduationCap } from 'lucide-react';

export const Academics: React.FC = () => {
  const [advice, setAdvice] = useState('Consulting Gemini AI...');
  
  const subjects = [
    { name: 'Theory of Machines', progress: 75, resources: 4 },
    { name: 'Microprocessors', progress: 40, resources: 6 },
    { name: 'Soft Computing', progress: 90, resources: 3 },
    { name: 'Engineering Math III', progress: 55, resources: 8 }
  ];

  useEffect(() => {
    geminiService.getStudyAdvice('Engineering Fundamentals', 60).then(setAdvice);
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-2">Learning Hub</h1>
          <p className="text-slate-500 font-medium">Department of Engineering - Curriculum Tracker</p>
        </div>
        <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 neo-shadow flex items-center gap-4">
          <div className="text-right">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sem aggregate</p>
            <p className="text-2xl font-black text-indigo-600">8.42 CGPA</p>
          </div>
          <GraduationCap className="text-slate-200 w-10 h-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syllabus Progress</h2>
          {subjects.map(subject => (
            <div key={subject.name} className="bg-white p-6 rounded-[2rem] neo-shadow border border-slate-100 transition-all hover:scale-[1.02]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">{subject.name}</h3>
                <span className="text-[10px] font-black text-indigo-600">{subject.progress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-black text-slate-400">
                      PDF
                    </div>
                  ))}
                </div>
                <button className="text-[9px] font-black text-indigo-500 uppercase tracking-widest hover:underline">+ {subject.resources} Resources</button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-[#0F172A] p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Sparkles size={100} />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2">
              <Sparkles size={14} /> AI Study Advisor
            </h3>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-6">
               <p className="text-sm font-medium leading-relaxed italic text-slate-300">
                 "{advice}"
               </p>
            </div>
            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all">
              Refresh Plan
            </button>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 neo-shadow">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Youtube className="text-red-600" /> Free AI Learning
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl group cursor-pointer hover:bg-indigo-50 transition-all">
                <p className="text-[10px] font-black uppercase text-slate-800 group-hover:text-indigo-600">Deep Learning Specialization</p>
                <p className="text-[8px] font-bold text-slate-400">Coursera (Audit Mode)</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl group cursor-pointer hover:bg-indigo-50 transition-all">
                <p className="text-[10px] font-black uppercase text-slate-800 group-hover:text-indigo-600">Generative AI for Everyone</p>
                <p className="text-[8px] font-bold text-slate-400">Google Cloud Learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};