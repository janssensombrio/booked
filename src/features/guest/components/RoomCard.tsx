// ==========================================
// 1. IMPORTS
// ==========================================
// Standard React core library import
import React from 'react';

// Lucide React icons: Small SVG icon components used for visual UI polish
import { Users, Wifi, Sparkles } from 'lucide-react';

// TypeScript Type Interface: Ensures the `room` object conforms strictly to expected data fields
import type { Room } from '../../../shared/types';


// ==========================================
// 2. TYPE DEFINITIONS (PROPS INTERFACE)
// ==========================================
// Props (Properties) define what data a parent component MUST pass down to this child component.
interface RoomCardProps {
  room: Room;                         // The complete room object (id, price, capacity, image, etc.)
  onSelectRoom: (room: Room) => void; // Action function passed from parent to trigger the booking modal
}


// ==========================================
// 3. COMPONENT DEFINITION
// ==========================================
// Declares RoomCard as a Functional Component typed with React.FC<RoomCardProps>
export const RoomCard: React.FC<RoomCardProps> = ({ room, onSelectRoom }) => {
  return (
    // --------------------------------------
    // OUTER CARD CONTAINER
    // - `group`: Allows child elements (like the image) to react when hovering anywhere on the card.
    // - `flex flex-col`: Stacks card content vertically.
    // - `hover:border-slate-700 hover:shadow-2xl`: Adds smooth elevation and glow on hover.
    // --------------------------------------
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/5">
      
      {/* ------------------------------------
          A. ROOM IMAGE & BADGES CONTAINER
          `relative`: Establishes a positioning context so child badges (`absolute`) float over the image.
      ------------------------------------ */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        
        {/* Room Photo */}
        {/* `group-hover:scale-105`: Zooms image in slightly by 5% when hovering anywhere over the card */}
        <img
          src={room.image}
          alt={room.description}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Room Number Floating Badge (Top-Right) */}
        {/* `backdrop-blur-md`: Creates a frosted glass blur effect behind the badge text */}
        <div className="absolute top-3 right-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-bold text-slate-200 backdrop-blur-md">
          Room {room.roomNumber}
        </div>

        {/* Room Type Floating Badge (Top-Left) */}
        <div className="absolute top-3 left-3 rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {room.type}
        </div>
      </div>


      {/* ------------------------------------
          B. CARD BODY / DETAILS CONTAINER
          `flex-1 flex-col justify-between`: Pushes the "Reserve Room" button cleanly to the bottom 
          regardless of description text length.
      ------------------------------------ */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          
          {/* Header Row: Title & Nightly Price */}
          <div className="flex items-baseline justify-between">
            <h3 className="text-lg font-bold text-white">{room.type} Suite</h3>
            
            {/* Localized Price Display (Philippine Peso ₱) */}
            <div className="text-right">
              <span className="text-xl font-extrabold text-blue-400">
                ₱{room.pricePerNight.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400"> / night</span>
            </div>
          </div>

          {/* Description Text */}
          {/* `line-clamp-2`: Truncates long paragraphs into max 2 lines with an ellipsis (...) to maintain uniform card height */}
          <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">
            {room.description}
          </p>

          {/* Key Specs Pills (Capacity & Wi-Fi) */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-300">
              <Users className="h-3.5 w-3.5 text-blue-400" />
              Up to {room.capacity} Guests
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-300">
              <Wifi className="h-3.5 w-3.5 text-emerald-400" />
              Free Wi-Fi
            </span>
          </div>

          {/* Dynamic Amenities List */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {/* `.slice(0, 3)`: Limits visible tags to the first 3 items so the card doesn't get cluttered */}
            {room.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="rounded-md bg-slate-800/60 px-2 py-0.5 text-[10px] text-slate-400"
              >
                {amenity}
              </span>
            ))}
            
            {/* Conditionally renders "+X more" pill if amenities exceed 3 items */}
            {room.amenities.length > 3 && (
              <span className="rounded-md bg-slate-800/60 px-2 py-0.5 text-[10px] text-slate-400">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* ------------------------------------
            C. ACTION BUTTON
            Triggers `onSelectRoom(room)` when clicked, passing the selected room back up to the parent page.
        ------------------------------------ */}
        <button
          onClick={() => onSelectRoom(room)}
          className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500 active:scale-[0.98]"
        >
          <Sparkles className="h-4 w-4" />
          Reserve Room
        </button>
      </div>
    </div>
  );
};