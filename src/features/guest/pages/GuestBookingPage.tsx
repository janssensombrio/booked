// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
// React's core hook for managing local component state
import { useState } from 'react';

// Child components within the guest feature module
import { SearchFilterBar } from '../components/SearchFilterBar';
import { RoomCard } from '../components/RoomCard';
import { BookingModal } from '../components/BookingModal';

// Shared TypeScript type interfaces to enforce strict data contracts
import type { Room, Booking, SearchFilters } from '../../../shared/types';


// ==========================================
// 2. PROPS INTERFACE DEFINITION
// ==========================================
// Defines the exact data and callbacks passed from App.tsx into this page view
interface GuestBookingPageProps {
  rooms: Room[];                                // Complete array of rooms stored in state
  bookings: Booking[];                          // Existing active reservations (used for overlap checks)
  onConfirmBooking: (booking: Booking) => void; // Callback function to append a new reservation to state
}


// ==========================================
// 3. COMPONENT DEFINITION
// ==========================================
export function GuestBookingPage({
  rooms,
  bookings,
  onConfirmBooking,
}: GuestBookingPageProps) {
  
  // ----------------------------------------
  // A. LOCAL STATE MANAGEMENT
  // ----------------------------------------

  // Tracks which room the guest clicked on. When set to a `Room` object, the modal opens.
  // When `null`, the modal remains hidden.
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Default fallback values used when resetting search criteria
  const defaultFilters: SearchFilters = {
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'All',
  };

  // State object holding current search filter inputs (category, guest count, dates)
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);


  // ----------------------------------------
  // B. COMPUTED / FILTERED DATA
  // Filters rooms dynamically during render based on user input.
  // ----------------------------------------
  const filteredRooms = rooms.filter((room) => {
    // 1. Category Check: Skip room if category filter is active AND doesn't match room type
    if (filters.roomType !== 'All' && room.type !== filters.roomType) return false;
    
    // 2. Capacity Check: Skip room if its maximum capacity is less than requested guests
    if (room.capacity < filters.guests) return false;
    
    // Keep room if it passes all criteria
    return true;
  });


  // ----------------------------------------
  // C. JSX RENDER BLOCK
  // ----------------------------------------
  return (
    // React Fragment (<>...</>): Wraps multiple sibling layout blocks without adding extra HTML DOM nodes
    <>
      {/* Page Header Section */}
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-white">
          Find Your Stay<span className="text-blue-500">.</span>
        </h1>
        <p className="text-sm text-slate-400">
          Discover modern accommodations tailored to your trip.
        </p>
      </section>

      {/* Interactive Search & Filter Controls */}
      <SearchFilterBar
        filters={filters}
        onFilterChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
      />

      {/* Room Cards Grid (Responsive 1-col on mobile, 2-col on tablet, 3-col on desktop) */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* CONDITIONAL RENDER (Ternary Operator): 
            If matching rooms exist, render a list of RoomCards. 
            If zero rooms match, render an empty state fallback card. */}
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <RoomCard
              key={room.id} // Unique key required by React for list reconciliation optimization
              room={room}
              onSelectRoom={(r) => setSelectedRoom(r)} // Sets selectedRoom state to open modal
            />
          ))
        ) : (
          /* Empty State Fallback Card */
          <div className="col-span-full rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 py-12 text-center">
            <p className="text-sm font-medium text-slate-400">
              No rooms match your active search filters.
            </p>
          </div>
        )}
      </section>

      {/* MODAL CONDITIONAL SHORT-CIRCUIT:
          `selectedRoom && (...)` ensures the BookingModal only mounts into DOM when a room is clicked.
          Passing `selectedRoom={null}` on close unmounts the modal cleanly. */}
      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          existingBookings={bookings}
          onClose={() => setSelectedRoom(null)} // Unselects room to close modal
          onConfirmBooking={onConfirmBooking}
        />
      )}
    </>
  );
}