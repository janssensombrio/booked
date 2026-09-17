// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import React from 'react';
import { Calendar, LayoutDashboard, Hotel, ShieldCheck } from 'lucide-react';

// ==========================================
// 2. PROPS INTERFACE DEFINITION
// Controls active view switching between Guest and Admin dashboards.
// ==========================================
interface NavbarProps {
  currentView: 'guest' | 'admin';           // Active view state ('guest' or 'admin')
  onViewChange: (view: 'guest' | 'admin') => void; // Callback to update view state in App.tsx
}

// ==========================================
// 3. COMPONENT DEFINITION
// ==========================================
export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  return (
    // Sticky navigation header container with blurred frosted background
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* ==================================
            A. METRO LOFT BRANDING LOGO
        ================================== */}
        <div className="flex items-center gap-2.5">
          {/* Logo Icon Badge */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/20">
            <Hotel className="h-5 w-5" />
          </div>
          
          {/* Brand Name & Sub-brand */}
          <div className="flex flex-col">
            <span className="text-lg font-black leading-tight tracking-tight text-white">
              Metro Loft<span className="text-blue-500">.</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              Booked System
            </span>
          </div>
        </div>

        {/* ==================================
            B. VIEW SWITCHER TOGGLE
        ================================== */}
        <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900 p-1">
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

        {/* ==================================
            C. SYSTEM STATUS INDICATOR
        ================================== */}
        <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>System Online</span>
        </div>
      </div>
    </header>
  );
};