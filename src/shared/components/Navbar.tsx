import React from 'react';
import { Calendar, LayoutDashboard, Hotel, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentView: 'guest' | 'admin';
  onViewChange: (view: 'guest' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/20">
            <Hotel className="h-5 w-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            Booked<span className="text-blue-500">.</span>
          </span>
        </div>

        {/* View Switcher (Guest vs Admin) */}
        <div className="flex items-center rounded-xl bg-slate-900 p-1 border border-slate-800">
          <button
            onClick={() => onViewChange('guest')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              currentView === 'guest'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            Guest Booking
          </button>
          
          <button
            onClick={() => onViewChange('admin')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              currentView === 'admin'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Staff Dashboard
          </button>
        </div>

        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>System Online</span>
        </div>
      </div>
    </header>
  );
};