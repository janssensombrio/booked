// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
// React core library along with state and memoization hooks
import React, { useState, useMemo } from 'react';

// Lucide React icons for pop-up UI visual indicators
import { X, Calendar, User, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

// Date utility functions for date parsing and night count calculations
import { differenceInDays, parseISO } from 'date-fns';

// Helper utility to detect date range overlaps with active reservations
import { isDateRangeConflicting } from '../../../shared/utils/dateValidation';

// TypeScript interfaces for type safety
import type { Room, Booking } from '../../../shared/types';


// ==========================================
// 2. PROPS INTERFACE DEFINITION
// ==========================================
// Defines properties required from the parent component to manage the modal dialog.
interface BookingModalProps {
  room: Room | null;                            // Selected room object (or null if modal is closed)
  existingBookings: Booking[];                  // Array of active reservations used to evaluate overlaps
  onClose: () => void;                          // Function callback to dismiss the modal overlay
  onConfirmBooking: (booking: Booking) => void; // Function callback to submit a confirmed reservation to state
}


// ==========================================
// 3. COMPONENT DEFINITION
// ==========================================
export const BookingModal: React.FC<BookingModalProps> = ({
  room,
  existingBookings,
  onClose,
  onConfirmBooking,
}) => {
  // ----------------------------------------
  // A. FORM INPUT STATE
  // ----------------------------------------
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  // ----------------------------------------
  // B. PURE INITIAL DATE MEMOIZATION
  // Wraps `new Date()` inside `useMemo` so timestamps evaluate purely 
  // without triggering React purity compiler warnings during re-renders.
  // ----------------------------------------
  const { todayStr, tomorrowStr } = useMemo(() => {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 86400000); // Add 24 hours in milliseconds
    return {
      todayStr: now.toISOString().split('T')[0],
      tomorrowStr: tomorrow.toISOString().split('T')[0],
    };
  }, []);

  // Initialize form date inputs to today and tomorrow defaults
  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(tomorrowStr);

  // Tracks the newly generated booking payload after successful form submission
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // EARLY EXIT GUARD: If no room is selected, do not mount any modal HTML into the DOM
  if (!room) return null;

  // ----------------------------------------
  // C. DYNAMIC CALCULATIONS & VALIDATION
  // ----------------------------------------
  // Runs date conflict check on every date input change
  const hasConflict = isDateRangeConflicting(room.id, checkIn, checkOut, existingBookings);

  // Computes total night stay duration (defaults to minimum 1 night)
  const nights = Math.max(
    1,
    differenceInDays(parseISO(checkOut), parseISO(checkIn)) || 1
  );

  // Computes total cost dynamically based on stay duration and room price rate
  const totalPrice = nights * room.pricePerNight;

  // ----------------------------------------
  // D. FORM SUBMISSION HANDLER
  // ----------------------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default browser page reload on form submit
    
    // Guard against empty fields or date collisions
    if (!guestName || !guestEmail || hasConflict) return;

    // Constructs a new formal booking record object
    const newBooking: Booking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`, // Generates a unique reference code
      roomId: room.id,
      guestName,
      guestEmail,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onConfirmBooking(newBooking);  // Passes new reservation to App state
    setConfirmedBooking(newBooking); // Switches modal view to confirmation receipt view
  };

  // ----------------------------------------
  // E. JSX RENDER BLOCK
  // ----------------------------------------
  return (
    // FULL-SCREEN BACKDROP OVERLAY
    // `fixed inset-0 z-50`: Covers full screen over all other elements.
    // `backdrop-blur-sm`: Blurs background web contents behind dark glass overlay.
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      
      {/* MODAL DIALOG CARD */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <h2 className="text-lg font-bold text-white">
            {confirmedBooking ? 'Reservation Confirmed' : `Reserve Room ${room.roomNumber}`}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* VIEW CONDITIONAL:
            If `confirmedBooking` is set, render confirmation receipt. 
            Otherwise, render booking input form. */}
        {confirmedBooking ? (
          /* ==================================
              1. SUCCESS RECEIPT VIEW
          ================================== */
          <div className="p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-white">You're All Set!</h3>
            <p className="mt-1 text-xs text-slate-400">
              Booking code: <span className="font-mono font-bold text-blue-400">{confirmedBooking.id}</span>
            </p>

            {/* Reservation Summary Details Box */}
            <div className="mt-6 space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-4 text-left text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Guest:</span>
                <span className="font-semibold text-slate-200">{confirmedBooking.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dates:</span>
                <span className="font-semibold text-slate-200">
                  {confirmedBooking.checkInDate} to {confirmedBooking.checkOutDate} ({nights} nights)
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2 font-bold">
                <span className="text-slate-300">Total Charged:</span>
                <span className="text-emerald-400">₱{confirmedBooking.totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Done
            </button>
          </div>
        ) : (
          /* ==================================
              2. RESERVATION INPUT FORM VIEW
          ================================== */
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            {/* Guest Name Input */}
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400">Full Name</label>
              <div className="relative mt-1 flex items-center">
                <User className="absolute left-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-200 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Guest Email Input */}
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400">Email Address</label>
              <div className="relative mt-1 flex items-center">
                <Mail className="absolute left-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-200 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Check-In / Check-Out Date Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Check-In</label>
                <div className="relative mt-1 flex items-center">
                  <Calendar className="absolute left-3 h-4 w-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 pl-9 pr-2 text-xs text-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Check-Out</label>
                <div className="relative mt-1 flex items-center">
                  <Calendar className="absolute left-3 h-4 w-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 pl-9 pr-2 text-xs text-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Date Conflict Warning Alert */}
            {hasConflict && (
              <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Selected dates overlap with an existing booking for this room.</span>
              </div>
            )}

            {/* Calculated Price Summary Breakdown */}
            <div className="space-y-1.5 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>
                  ₱{room.pricePerNight.toLocaleString()} x {nights} night{nights > 1 ? 's' : ''}
                </span>
                <span>₱{(nights * room.pricePerNight).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-white">
                <span>Total</span>
                <span className="text-sm text-blue-400">₱{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Button (Disabled if date collision is detected) */}
            <button
              type="submit"
              disabled={hasConflict}
              className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white transition hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {hasConflict ? 'Dates Unavailable' : `Confirm & Pay (₱${totalPrice.toLocaleString()})`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};