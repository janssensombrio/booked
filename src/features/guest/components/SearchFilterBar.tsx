import React from 'react';
import { Calendar, Users, Filter, RotateCcw } from 'lucide-react';
import type { SearchFilters, RoomType } from '../../../shared/types';

interface SearchFilterBarProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onReset: () => void;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const roomTypes: (RoomType | 'All')[] = ['All', 'Standard', 'Deluxe', 'Suite', 'Penthouse'];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl backdrop-blur-md sm:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Check-In Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Check-In
          </label>
          <div className="relative flex items-center">
            <Calendar className="absolute left-3 h-4 w-4 text-slate-400" />
            <input
              type="date"
              value={filters.checkIn}
              onChange={(e) => onFilterChange({ ...filters, checkIn: e.target.value })}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-200 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Check-Out Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Check-Out
          </label>
          <div className="relative flex items-center">
            <Calendar className="absolute left-3 h-4 w-4 text-slate-400" />
            <input
              type="date"
              value={filters.checkOut}
              min={filters.checkIn}
              onChange={(e) => onFilterChange({ ...filters, checkOut: e.target.value })}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-200 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Guest Count */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Guests
          </label>
          <div className="relative flex items-center">
            <Users className="absolute left-3 h-4 w-4 text-slate-400" />
            <select
              value={filters.guests}
              onChange={(e) => onFilterChange({ ...filters, guests: Number(e.target.value) })}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-200 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Room Type Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Room Category
          </label>
          <div className="relative flex items-center">
            <Filter className="absolute left-3 h-4 w-4 text-slate-400" />
            <select
              value={filters.roomType}
              onChange={(e) => onFilterChange({ ...filters, roomType: e.target.value as RoomType | 'All' })}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-200 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {roomTypes.map((type) => (
                <option key={type} value={type}>
                  {type} Rooms
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action Row */}
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