import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Bell, 
  BookOpen, 
  Briefcase, 
  Utensils, 
  LifeBuoy, 
  Trophy,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  LogOut,
  Activity
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../services/firebaseService';
import { UserRole } from '../types';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = firebaseAuth.getCurrentUser();

  if (!user) return <>{children}</>;

  const navItems = [
    { icon: LayoutDashboard, label: 'Feed', path: '/' },
    { icon: Bell, label: 'Notices', path: '/notices' },
    { icon: BookOpen, label: 'Academics', path: '/academics' },
    { icon: Briefcase, label: 'Careers', path: '/career' },
    { icon: Utensils, label: 'Canteen', path: '/canteen' },
    { icon: Trophy, label: 'Events', path: '/events' },
    { icon: Activity, label: 'Sports', path: '/sports' },
    { icon: LifeBuoy, label: 'Support', path: '/support' },
  ];

  if (user.role === UserRole.ADMIN) {
    navItems.push({ icon: ShieldCheck, label: 'Prime Panel', path: '/admin' });
  }

  const handleLogout = () => {
    firebaseAuth.signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <header className="md:hidden bg-[#0F172A] text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Sparkles size={18} />
          </div>
          <span className="font-black tracking-tight text-sm uppercase">SCSMCOE AI</span>
        </div>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-800 rounded-lg">
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="mb-10 flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-100">
              <Sparkles className="text-white w-7 h-7" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-slate-900 block">SCSMCOE</span>
              <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Engineering AI</span>
            </div>
          </div>

          <nav className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' 
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 mb-4">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                className="w-10 h-10 rounded-xl bg-white border border-slate-200" 
                alt="Avatar" 
              />
              <div className="min-w-0">
                <p className="text-[10px] font-black text-slate-900 truncate uppercase">{user.name}</p>
                <p className="text-[8px] font-bold text-slate-400 truncate uppercase">{user.role}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 text-[9px] font-black text-red-500 hover:bg-red-50 rounded-xl uppercase tracking-widest transition-all"
            >
              <LogOut size={14} /> End Session
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative p-6 md:p-10 pb-24 md:pb-10 scroll-smooth">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-100 flex justify-around py-3 px-2 z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        {navItems.slice(0, 5).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${location.pathname === item.path ? 'text-indigo-600 bg-indigo-50' : 'text-slate-300'}`}
          >
            <item.icon size={20} />
          </Link>
        ))}
      </nav>
    </div>
  );
};