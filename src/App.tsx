// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
// React's standard hook for managing simple component state
import { useState } from 'react';

// UI Layout & Page Components
import { Navbar } from './shared/components/Navbar';
import { GuestBookingPage } from './features/guest/pages/GuestBookingPage';
import { AdminDashboardPage } from './features/admin/pages/AdminDashboardPage';

// Initial fallback datasets used when LocalStorage is empty
import { INITIAL_ROOMS, INITIAL_BOOKINGS } from './shared/data/mockData';

// Custom hook to automatically save and load data from browser LocalStorage
import { useLocalStorage } from './shared/hooks/useLocalStorage';

// TypeScript data models to keep variable types strictly defined
import type { Room, Booking, RoomStatus, BookingStatus } from './shared/types';


// ==========================================
// 2. MAIN APPLICATION COMPONENT
// ==========================================
export function App() {
  
  // ----------------------------------------
  // A. VIEW CONTROLLER STATE
  // Tracks whether the user is viewing the 'guest' storefront or 'admin' dashboard
  // ----------------------------------------
  const [currentView, setCurrentView] = useState<'guest' | 'admin'>('guest');

  
  // ----------------------------------------
  // B. PERSISTED APPLICATION STATE
  // Reads rooms and bookings from browser LocalStorage ('booked_rooms' & 'booked_bookings').
  // If no saved data exists, it defaults to the mock datasets (INITIAL_ROOMS & INITIAL_BOOKINGS).
  // ----------------------------------------
  const [rooms, setRooms] = useLocalStorage<Room[]>('booked_rooms', INITIAL_ROOMS);
  const [bookings, setBookings] = useLocalStorage<Booking[]>('booked_bookings', INITIAL_BOOKINGS);

  
  // ----------------------------------------
  // C. EVENT HANDLERS / STATE UPDATERS
  // ----------------------------------------

  // Adds a newly submitted guest reservation to the front of the bookings list
  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Finds a room by its ID and updates its operational status (e.g., 'Available', 'Occupied', 'Maintenance')
  const handleUpdateRoomStatus = (roomId: string, status: RoomStatus) => {
    setRooms((prev) =>
      prev.map((room) => (room.id === roomId ? { ...room, status } : room))
    );
  };

  // Finds a booking by its reference code and updates its status (e.g., 'Confirmed', 'Checked In', 'Cancelled')
  const handleUpdateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };


  // ----------------------------------------
  // D. JSX RENDER BLOCK
  // ----------------------------------------
  return (
    // Outer shell layout with full-height dark background theme
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans text-slate-100">
      
      {/* Top navigation bar that allows switching views between Guest and Admin */}
      <Navbar currentView={currentView} onViewChange={setCurrentView} />

      {/* Main page content container */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
        
        {/* Conditional Rendering: Show GuestBookingPage if currentView is 'guest', else show AdminDashboardPage */}
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