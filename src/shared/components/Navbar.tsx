// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
// Standard React core library import
import React from 'react';

// Lucide React icons used for branding, tab navigation, and system status
import { Calendar, LayoutDashboard, Hotel, ShieldCheck } from 'lucide-react';


// ==========================================
// 2. PROPS INTERFACE DEFINITION
// ==========================================
// Defines the state values and callbacks passed from App.tsx to control view switching.
interface NavbarProps {
  currentView: 'guest' | 'admin';           // Active tab state string ('guest' or 'admin')
  onViewChange: (view: 'guest' | 'admin') => void; // Callback function to update currentView state in App.tsx
}


// ==========================================
// 3. COMPONENT DEFINITION
// ==========================================
export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  return (
    // --------------------------------------
    // HEADER CONTAINER (STICKY NAVIGATION SHELL)
    // - `sticky top-0 z-50`: Keeps the navbar fixed at the top of the browser viewport during scroll.
    // - `backdrop-blur-md`: Applies a frosted glass effect over content scrolling underneath.
    // --------------------------------------
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      
      {/* Centered content shell with horizontal padding and flex layout */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* ==================================
            A. BRAND LOGO & TITLE
        ================================== */}
        <div className="flex items-center gap-2">
          {/* Logo Icon Badge */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/20">
            <Hotel className="h-5 w-5" />
          </div>
          
          {/* Brand Name */}
          <span className="text-xl font-black tracking-tight text-white">
            Booked<span className="text-blue-500">.</span>
          </span>
        </div>


        {/* ==================================
            B. VIEW SWITCHER TOGGLE (SEGMENTED CONTROL)
            Swaps the main page layout between Guest Storefront and Staff Dashboard.
        ================================== */}
        <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900 p-1">
          
          {/* 1. Guest Booking Tab Button */}
          <button
            // Trigger callback passing 'guest' to set active view state in App.tsx
            onClick={() => onViewChange('guest')}
            // DYNAMIC STYLING (Ternary Operator):
            // If currentView is 'guest', apply solid blue background (`bg-blue-600 text-white`).
            // Otherwise, render muted slate text (`text-slate-400 hover:text-slate-200`).
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              currentView === 'guest'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            Guest Booking
          </button>
          
          {/* 2. Staff Dashboard Tab Button */}
          <button
            // Trigger callback passing 'admin' to set active view state in App.tsx
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
            - `hidden sm:flex`: Hides status badge on small mobile screens to prevent header clutter,
              displaying it only on desktop viewports.
        ================================== */}
        <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>System Online</span>
        </div>
      </div>
    </header>
  );
};