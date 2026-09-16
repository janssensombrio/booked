export type RoomType = 'Standard' | 'Deluxe' | 'Suite' | 'Penthouse';
export type RoomStatus = 'Available' | 'Occupied' | 'Maintenance';
export type BookingStatus = 'Confirmed' | 'Checked In' | 'Checked Out' | 'Cancelled';

export interface Room {
  id: string;
  roomNumber: string;
  type: RoomType;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  status: RoomStatus;
  image: string;
  description: string;
}

export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  checkInDate: string;  // Format: YYYY-MM-DD
  checkOutDate: string; // Format: YYYY-MM-DD
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export interface SearchFilters {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: RoomType | 'All';
}