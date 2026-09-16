import { useState } from 'react';
import { Navbar } from './shared/components/Navbar';
import { SearchFilterBar } from './features/guest/components/SearchFilterBar';
import { RoomCard } from './features/guest/components/RoomCard';
import { BookingModal } from './features/guest/components/BookingModal';
import { INITIAL_ROOMS, INITIAL_BOOKINGS } from './shared/data/mockData';
import type { SearchFilters, Room, Booking } from './assets/shared/types';

export function App() {
  const [currentView, setCurrentView] = useState<'guest' | 'admin'>('guest');
  const [rooms] = useState<Room[]>(INITIAL_ROOMS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
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

  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 flex flex-col gap-8">
        {currentView === 'guest' ? (
          <>
            <section className="flex flex-col gap-2">
              <h1 className="text-3xl font-black text-white tracking-tight">
                Find Your Stay<span className="text-blue-500">.</span>
              </h1>
              <p className="text-slate-400 text-sm">
                Discover modern accommodations tailored to your trip.
              </p>
            </section>

            <SearchFilterBar
              filters={filters}
              onFilterChange={setFilters}
              onReset={() => setFilters(defaultFilters)}
            />

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onSelectRoom={(r) => setSelectedRoom(r)}
                />
              ))}
            </section>
          </>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center">
            <h1 className="text-2xl font-bold text-white">Staff Admin View</h1>
            <p className="mt-2 text-slate-400">Total live bookings stored: {bookings.length}</p>
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}
    </div>
  );
}

export default App;