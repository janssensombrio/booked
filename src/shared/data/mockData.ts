// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
// TypeScript interfaces to ensure initial fallback data matches required data structures
import type { Room, Booking } from '../types';

// ==========================================
// 2. METRO LOFT INITIAL ROOMS DATASET
// Mock room inventory designed for Metro Loft boutique hotel.
// ==========================================
export const INITIAL_ROOMS: Room[] = [
  {
    id: 'rm-101',
    roomNumber: '101',
    type: 'Standard',
    pricePerNight: 2800, // Rate in Philippine Pesos (₱)
    capacity: 2,
    amenities: ['High-Speed Wi-Fi', 'Queen Bed', 'Smart TV', 'Work Desk'],
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    description: 'A cozy, minimalist Urban Studio tailored for solo travelers or couples seeking a modern stay.',
  },
  {
    id: 'rm-102',
    roomNumber: '102',
    type: 'Deluxe',
    pricePerNight: 4200,
    capacity: 2,
    amenities: ['City View Balcony', 'King Bed', 'Espresso Machine', 'High-Speed Wi-Fi'],
    status: 'Occupied',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    description: 'Spacious Urban King room featuring floor-to-ceiling windows with panoramic Metro skyline views.',
  },
  {
    id: 'rm-201',
    roomNumber: '201',
    type: 'Suite',
    pricePerNight: 6500,
    capacity: 4,
    amenities: ['Living Room Area', '2 Queen Beds', 'Soaking Tub', 'Mini Bar', 'High-Speed Wi-Fi'],
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    description: 'Elegant Loft Suite featuring a separate living room area and premium boutique bath amenities.',
  },
  {
    id: 'rm-301',
    roomNumber: '301',
    type: 'Penthouse',
    pricePerNight: 12500,
    capacity: 6,
    amenities: ['Private Terrace', 'Jacuzzi', 'Full Kitchenette', 'Personal Concierge', 'High-Speed Wi-Fi'],
    status: 'Maintenance',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    description: 'Exclusive Executive Penthouse offering luxury rooftop living with a private open-air terrace.',
  },
];

// ==========================================
// 3. INITIAL SAMPLE BOOKINGS DATASET
// Initial mock bookings loaded into state if LocalStorage is unpopulated.
// ==========================================
export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-1001',
    roomId: 'rm-102',
    guestName: 'Alex Rivera',
    guestEmail: 'alex.rivera@example.com',
    checkInDate: '2026-10-01',
    checkOutDate: '2026-10-04',
    totalPrice: 12600,
    status: 'Checked In',
    createdAt: '2026-09-20',
  },
  {
    id: 'BK-1002',
    roomId: 'rm-201',
    guestName: 'Sophia Chen',
    guestEmail: 'sophia.c@example.com',
    checkInDate: '2026-10-10',
    checkOutDate: '2026-10-13',
    totalPrice: 19500,
    status: 'Confirmed',
    createdAt: '2026-09-22',
  },
];