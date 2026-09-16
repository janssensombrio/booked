import type { Room, Booking } from '../../shared/types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'r1',
    roomNumber: '101',
    type: 'Standard',
    pricePerNight: 2500, // ₱2,500 / night
    capacity: 2,
    amenities: ['Wi-Fi', 'Air Conditioning', 'TV'],
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800',
    description: 'Cozy modern standard room equipped with a queen bed and work desk.'
  },
  {
    id: 'r2',
    roomNumber: '201',
    type: 'Deluxe',
    pricePerNight: 4500, // ₱4,500 / night
    capacity: 3,
    amenities: ['Wi-Fi', 'Air Conditioning', 'TV', 'Ocean View', 'Mini Bar'],
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    description: 'Spacious deluxe room with panoramic ocean views and private balcony.'
  },
  {
    id: 'r3',
    roomNumber: '301',
    type: 'Suite',
    pricePerNight: 7500, // ₱7,500 / night
    capacity: 4,
    amenities: ['Wi-Fi', 'Air Conditioning', 'TV', 'Ocean View', 'Mini Bar', 'Kitchenette'],
    status: 'Occupied',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
    description: 'Luxury suite featuring a separate living room area and full kitchenette.'
  },
  {
    id: 'r4',
    roomNumber: '401',
    type: 'Penthouse',
    pricePerNight: 12500, // ₱12,500 / night
    capacity: 6,
    amenities: ['Wi-Fi', 'Air Conditioning', 'TV', 'Ocean View', 'Private Jacuzzi', 'Room Service'],
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    description: 'Top-floor penthouse suite with private jacuzzi and dedicated butler service.'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-8012',
    roomId: 'r3',
    guestName: 'Alex Mercer',
    guestEmail: 'alex.mercer@example.com',
    checkInDate: '2026-09-15',
    checkOutDate: '2026-09-20',
    totalPrice: 37500,
    status: 'Checked In',
    createdAt: '2026-09-01'
  }
];