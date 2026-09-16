import { parseISO, isBefore, isAfter } from 'date-fns';
import type { Booking } from '../types';

/**
 * Checks if a requested date range overlaps with existing bookings for a specific room.
 */
export function isDateRangeConflicting(
  roomId: string,
  checkIn: string,
  checkOut: string,
  existingBookings: Booking[]
): boolean {
  const reqStart = parseISO(checkIn);
  const reqEnd = parseISO(checkOut);

  // Return true if check-out is on or before check-in
  if (!isAfter(reqEnd, reqStart)) return true;

  // Filter active bookings for the specified room
  const roomBookings = existingBookings.filter(
    (b) => b.roomId === roomId && b.status !== 'Cancelled'
  );

  for (const booking of roomBookings) {
    const existingStart = parseISO(booking.checkInDate);
    const existingEnd = parseISO(booking.checkOutDate);

    // Overlap condition:
    // (RequestedStart < ExistingEnd) AND (RequestedEnd > ExistingStart)
    const overlaps =
      isBefore(reqStart, existingEnd) && isAfter(reqEnd, existingStart);

    if (overlaps) return true;
  }

  return false;
}