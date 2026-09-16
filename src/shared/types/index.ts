// ==========================================
// 1. STRING UNION TYPES (ENUM-LIKE CONSTRAINTS)
// Union types restrict variables to ONLY accept specific string literal values.
// This prevents typos like 'Delux' or 'avallable' across your entire application.
// ==========================================

/**
 * Defines valid room classification categories for filtering and display.
 */
export type RoomType = 'Standard' | 'Deluxe' | 'Suite' | 'Penthouse';

/**
 * Defines operational availability states for hotel rooms in the Admin view.
 * - 'Available': Ready for new guest check-ins.
 * - 'Occupied': Currently assigned to an active guest stay.
 * - 'Maintenance': Out of service for housekeeping or repairs.
 */
export type RoomStatus = 'Available' | 'Occupied' | 'Maintenance';

/**
 * Defines the lifecycle states of a guest reservation.
 * - 'Confirmed': Reserved by guest, awaiting arrival.
 * - 'Checked In': Guest has checked into the room.
 * - 'Checked Out': Stay completed.
 * - 'Cancelled': Reservation revoked (excluded from total revenue calculations).
 */
export type BookingStatus = 'Confirmed' | 'Checked In' | 'Checked Out' | 'Cancelled';


// ==========================================
// 2. DATA MODEL INTERFACES
// Interfaces define structural blueprints for JavaScript objects,
// ensuring every room and booking contains required properties.
// ==========================================

/**
 * Structural blueprint for a Hotel Room entity.
 */
export interface Room {
  id: string;               // Unique room identifier (e.g., "rm-101")
  roomNumber: string;       // Public display room number (e.g., "101")
  type: RoomType;           // Strictly constrained to RoomType union values
  pricePerNight: number;    // Rate in Philippine Pesos (₱) per night stay
  capacity: number;         // Maximum number of guests allowed
  amenities: string[];      // Array of string features (e.g., ["Wi-Fi", "Ocean View", "King Bed"])
  status: RoomStatus;       // Operational state constrained to RoomStatus union values
  image: string;            // URL or file path pointing to room photograph
  description: string;      // Marketing text describing room features
}

/**
 * Structural blueprint for a Reservation Record entity.
 */
export interface Booking {
  id: string;               // Unique reference code generated upon booking (e.g., "BK-4821")
  roomId: string;           // Foreign Key matching the reserved Room's `id`
  guestName: string;        // Full name of the primary guest
  guestEmail: string;       // Email address for confirmation receipt delivery
  checkInDate: string;      // ISO formatted arrival date string ("YYYY-MM-DD")
  checkOutDate: string;     // ISO formatted departure date string ("YYYY-MM-DD")
  totalPrice: number;       // Calculated total stay cost (Nights × PricePerNight) in ₱
  status: BookingStatus;    // Lifecycle status constrained to BookingStatus union values
  createdAt: string;        // ISO formatted timestamp recording when the reservation was submitted
}

/**
 * Blueprint for guest search and filter input controls.
 */
export interface SearchFilters {
  checkIn: string;          // Selected check-in date filter input
  checkOut: string;         // Selected check-out date filter input
  guests: number;           // Minimum required guest capacity filter value
  roomType: RoomType | 'All'; // Room category filter (accepts specific RoomType or 'All' fallback)
}