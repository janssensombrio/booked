import React from 'react';
import { Users, Wifi, Sparkles } from 'lucide-react';
import type { Room } from '../../../shared/types';

interface RoomCardProps {
  room: Room;
  onSelectRoom: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onSelectRoom }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/5">
      {/* Room Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={room.image}
          alt={room.description}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-bold text-slate-200 backdrop-blur-md">
          Room {room.roomNumber}
        </div>
        <div className="absolute top-3 left-3 rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {room.type}
        </div>
      </div>

      {/* Details Container */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-lg font-bold text-white">{room.type} Suite</h3>
            <div className="text-right">
                <span className="text-xl font-extrabold text-blue-400">
                    ₱{room.pricePerNight.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400"> / night</span>
            </div>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">
            {room.description}
          </p>

          {/* Key Specs */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-950 px-2.5 py-1 text-xs text-slate-300 border border-slate-800">
              <Users className="h-3.5 w-3.5 text-blue-400" />
              Up to {room.capacity} Guests
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-950 px-2.5 py-1 text-xs text-slate-300 border border-slate-800">
              <Wifi className="h-3.5 w-3.5 text-emerald-400" />
              Free Wi-Fi
            </span>
          </div>

          {/* Amenities Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {room.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="rounded-md bg-slate-800/60 px-2 py-0.5 text-[10px] text-slate-400"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="rounded-md bg-slate-800/60 px-2 py-0.5 text-[10px] text-slate-400">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
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