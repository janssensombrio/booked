// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
// date-fns utilities for precise date comparison:
// - parseISO: Converts ISO string dates ("2026-09-16") into JavaScript Date objects.
// - isBefore: Checks if Date A comes chronologically before Date B.
// - isAfter: Checks if Date A comes chronologically after Date B.
import { parseISO, isBefore, isAfter } from 'date-fns';

// TypeScript Type Interface: Enforces strict data contracts for booking objects.
import type { Booking } from '../types';


// ==========================================
// 2. HELPER FUNCTION: isDateRangeConflicting
// ==========================================
/**
 * Evaluates whether a requested guest check-in/check-out date range collides
 * with any active, confirmed reservations for a specific room.
 *
 * Parameters:
 *  - roomId: The unique identifier of the room being requested.
 *  - checkIn: Requested arrival date string (e.g., "2026-10-01").
 *  - checkOut: Requested departure date string (e.g., "2026-10-05").
 *  - existingBookings: Complete list of reservations currently in the system.
 *
 * Returns: `true` if dates conflict or are invalid; `false` if dates are available.
 */
export function isDateRangeConflicting(
  roomId: string,
  checkIn: string,
  checkOut: string,
  existingBookings: Booking[]
): boolean {
  // ----------------------------------------
  // A. PARSE INPUT STRINGS TO DATE OBJECTS
  // ----------------------------------------
  // Converts ISO string dates into compare-ready JavaScript Date objects.
  const reqStart = parseISO(checkIn);
  const reqEnd = parseISO(checkOut);

  // ----------------------------------------
  // B. GUARD CONDITION: VALIDATE DATE ORDER
  // ----------------------------------------
  // Ensures departure date (`reqEnd`) is strictly AFTER arrival date (`reqStart`).
  // If check-out is on or before check-in, immediately flag as an invalid range.
  if (!isAfter(reqEnd, reqStart)) return true;

  // ----------------------------------------
  // C. FILTER TARGETED & ACTIVE RESERVATION RECORDS
  // ----------------------------------------
  // Filters existing bookings to evaluate ONLY:
  // 1. Bookings matching the requested room ID (`b.roomId === roomId`).
  // 2. Bookings that are NOT cancelled (`b.status !== 'Cancelled'`).
  const roomBookings = existingBookings.filter(
    (b) => b.roomId === roomId && b.status !== 'Cancelled'
  );

  // ----------------------------------------
  // D. OVERLAP ALGORITHM EVALUATION
  // Iterates through each active reservation for this room.
  // ----------------------------------------
  for (const booking of roomBookings) {
    // Parse existing booking dates into Date objects
    const existingStart = parseISO(booking.checkInDate);
    const existingEnd = parseISO(booking.checkOutDate);

    // MATHEMATICAL OVERLAP CONDITION:
    // Two date ranges [A_start, A_end] and [B_start, B_end] overlap IF AND ONLY IF:
    // (RequestedStart < ExistingEnd) AND (RequestedEnd > ExistingStart)
    //
    // Example: Existing stay (Oct 10-15).
    // - Request Oct 12-14: (Oct 12 < Oct 15) AND (Oct 14 > Oct 10) -> TRUE (Conflict!)
    // - Request Oct 05-10: (Oct 05 < Oct 15) AND (Oct 10 > Oct 10) -> FALSE (Check-out on Check-in is allowed)
    const overlaps =
      isBefore(reqStart, existingEnd) && isAfter(reqEnd, existingStart);

    // Immediate return on first detected collision
    if (overlaps) return true;
  }

  // ----------------------------------------
  // E. SUCCESS EXIT
  // No overlapping dates detected across all active reservations.
  // ----------------------------------------
  return false;
}