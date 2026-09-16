import { useState } from 'react';
import { SearchFilterBar } from '../components/SearchFilterBar';
import { RoomCard } from '../components/RoomCard';
import { BookingModal } from '../components/BookingModal';
import type { Room, Booking, SearchFilters } from '../../../shared/types';

interface GuestBookingPageProps {
  rooms: Room[];
  bookings: Booking[];
  onConfirmBooking: (booking: Booking) => void;
}

export function GuestBookingPage({
  rooms,
  bookings,
  onConfirmBooking,
}: GuestBookingPageProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const defaultFilters: SearchFilters = {
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'All',
  };

  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  const filteredRooms = rooms.filter((room) => {
    if (filters.roomType !== 'All' && room.type !== filters.roomType) return false;
    if (room.capacity < filters.guests) return false;
    return true;
  });

  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-white">
          Find Your Stay<span className="text-blue-500">.</span>
        </h1>
        <p className="text-sm text-slate-400">
          Discover modern accommodations tailored to your trip.
        </p>
      </section>

      <SearchFilterBar
        filters={filters}
        onFilterChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
      />

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onSelectRoom={(r) => setSelectedRoom(r)}
            />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 py-12 text-center">
            <p className="text-sm font-medium text-slate-400">
              No rooms match your active search filters.
            </p>
          </div>
        )}
      </section>

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          existingBookings={bookings}
          onClose={() => setSelectedRoom(null)}
          onConfirmBooking={onConfirmBooking}
        />
      )}
    </>
  );
}