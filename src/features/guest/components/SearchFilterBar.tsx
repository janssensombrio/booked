// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
// Standard React core library import
import React from 'react';

// Lucide React icons: Visual icons to indicate date, capacity, category, and reset actions
import { Calendar, Users, Filter, RotateCcw } from 'lucide-react';

// TypeScript Type Interfaces: Ensures search filter objects and room types stay strictly typed
import type { SearchFilters, RoomType } from '../../../shared/types';


// ==========================================
// 2. PROPS INTERFACE DEFINITION
// ==========================================
// Defines the exact props that the parent component (GuestBookingPage) must provide.
interface SearchFilterBarProps {
  filters: SearchFilters;                                // The current state object containing checkIn, checkOut, guests, roomType
  onFilterChange: (updatedFilters: SearchFilters) => void; // Callback function to update the filter state in the parent
  onReset: () => void;                                   // Callback function to restore filters back to default values
}


// ==========================================
// 3. COMPONENT DEFINITION
// ==========================================
export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  
  // Local array helper: Defines room types for the dropdown menu, including the 'All' fallback option
  const roomTypes: (RoomType | 'All')[] = ['All', 'Standard', 'Deluxe', 'Suite', 'Penthouse'];

  return (
    // --------------------------------------
    // BAR CONTAINER (CARD SHELL)
    // - `rounded-2xl border border-slate-800`: Modern rounded corners with a subtle dark border.
    // - `backdrop-blur-md`: Applies a glassmorphism frosted effect if scrolled over background elements.
    // --------------------------------------
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl backdrop-blur-md sm:p-6">
      
      {/* ------------------------------------
          RESPONSIVE GRID SYSTEM
          - `grid-cols-1`: 1 column layout on mobile devices.
          - `md:grid-cols-4`: Automatically splits into 4 equal columns on medium screens and larger.
      ------------------------------------ */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        
        {/* ==================================
            1. CHECK-IN DATE INPUT
        ================================== */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Check-In
          </label>
          
          {/* Input wrapper with absolute positioned icon */}
          <div className="relative flex items-center">
            {/* Left-aligned icon placed inside the input field */}
            <Calendar className="absolute left-3 h-4 w-4 text-slate-400" />
            
            <input
              type="date"
              value={filters.checkIn}
              // IMMUTABLE STATE UPDATE:
              // `{ ...filters, checkIn: e.target.value }` copies all existing filter properties 
              // and overwrites only the `checkIn` value without mutating state directly.
              onChange={(e) => onFilterChange({ ...filters, checkIn: e.target.value })}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-200 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ==================================
            2. CHECK-OUT DATE INPUT
        ================================== */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Check-Out
          </label>
          <div className="relative flex items-center">
            <Calendar className="absolute left-3 h-4 w-4 text-slate-400" />
            <input
              type="date"
              value={filters.checkOut}
              // Dynamic constraint: `min={filters.checkIn}` ensures guests cannot select a check-out date prior to their selected check-in date.
              min={filters.checkIn}
              onChange={(e) => onFilterChange({ ...filters, checkOut: e.target.value })}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-200 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ==================================
            3. GUEST COUNT DROPDOWN
        ================================== */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Guests
          </label>
          <div className="relative flex items-center">
            <Users className="absolute left-3 h-4 w-4 text-slate-400" />
            
            <select
              value={filters.guests}
              // `Number(e.target.value)`: Select input values are strings by default; converts to a number for capacity comparison checks.
              onChange={(e) => onFilterChange({ ...filters, guests: Number(e.target.value) })}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-200 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {/* Dynamically generates options from 1 to 6 guests with correct singular/plural labels */}
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ==================================
            4. ROOM CATEGORY FILTER DROPDOWN
        ================================== */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Room Category
          </label>
          <div className="relative flex items-center">
            <Filter className="absolute left-3 h-4 w-4 text-slate-400" />
            
            <select
              value={filters.roomType}
              // Casts input value (`as RoomType | 'All'`) to maintain strict TypeScript compliance
              onChange={(e) => onFilterChange({ ...filters, roomType: e.target.value as RoomType | 'All' })}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-200 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {/* Maps through the roomTypes array to render selection options */}
              {roomTypes.map((type) => (
                <option key={type} value={type}>
                  {type} Rooms
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ====================================
          ACTION ROW (RESET BUTTON)
      ==================================== */}
      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};