import { useState } from 'react';
import { Navbar } from './shared/components/Navbar';
import { GuestBookingPage } from './features/guest/pages/GuestBookingPage';
import { AdminDashboardPage } from './features/admin/pages/AdminDashboardPage';
import { INITIAL_ROOMS, INITIAL_BOOKINGS } from './shared/data/mockData';
import type { Room, Booking, RoomStatus, BookingStatus } from './shared/types';

export function App() {
  const [currentView, setCurrentView] = useState<'guest' | 'admin'>('guest');
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleUpdateRoomStatus = (roomId: string, status: RoomStatus) => {
    setRooms((prev) =>
      prev.map((room) => (room.id === roomId ? { ...room, status } : room))
    );
  };

  const handleUpdateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans text-slate-100">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
        {currentView === 'guest' ? (
          <GuestBookingPage
            rooms={rooms}
            bookings={bookings}
            onConfirmBooking={handleConfirmBooking}
          />
        ) : (
          <AdminDashboardPage
            rooms={rooms}
            bookings={bookings}
            onUpdateRoomStatus={handleUpdateRoomStatus}
            onUpdateBookingStatus={handleUpdateBookingStatus}
          />
        )}
      </main>
    </div>
  );
}

export default App;