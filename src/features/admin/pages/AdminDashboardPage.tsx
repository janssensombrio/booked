import React from 'react';
import { BedDouble, CalendarCheck, DollarSign, TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react';
import type { Room, Booking, RoomStatus, BookingStatus } from '../../../shared/types';

interface AdminDashboardPageProps {
  rooms: Room[];
  bookings: Booking[];
  onUpdateRoomStatus: (roomId: string, status: RoomStatus) => void;
  onUpdateBookingStatus: (bookingId: string, status: BookingStatus) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  rooms,
  bookings,
  onUpdateRoomStatus,
  onUpdateBookingStatus,
}) => {
  // Metric Calculations
  const totalRevenue = bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const occupiedRooms = rooms.filter((r) => r.status === 'Occupied').length;
  const occupancyRate = Math.round((occupiedRooms / rooms.length) * 100) || 0;

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">
          Staff Dashboard<span className="text-blue-500">.</span>
        </h1>
        <p className="text-sm text-slate-400">
          Real-time room availability, reservations, and revenue analytics.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-400">Total Revenue</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-white">₱{totalRevenue.toLocaleString()}</p>
          <span className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
            <TrendingUp className="h-3 w-3" /> Live earnings breakdown
          </span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-400">Occupancy Rate</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <BedDouble className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-white">{occupancyRate}%</p>
          <span className="mt-1 text-[11px] text-slate-400">
            {occupiedRooms} of {rooms.length} rooms currently occupied
          </span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-400">Active Bookings</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <CalendarCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-white">{bookings.length}</p>
          <span className="mt-1 text-[11px] text-slate-400">Total processed reservations</span>
        </div>
      </div>

      {/* Room Status Board */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-white">Room Availability Board</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/90 p-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Room {room.roomNumber}</span>
                  <span className="text-xs font-semibold text-slate-400">{room.type}</span>
                </div>
                <p className="mt-1 text-xs text-blue-400">₱{room.pricePerNight.toLocaleString()} / night</p>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Status Toggle
                </label>
                <select
                  value={room.status}
                  onChange={(e) => onUpdateRoomStatus(room.id, e.target.value as RoomStatus)}
                  className={`rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-semibold outline-none ${
                    room.status === 'Available'
                      ? 'text-emerald-400'
                      : room.status === 'Occupied'
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                >
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reservations Table */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-white">Reservations Log</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 bg-slate-950/50 text-[11px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Guest Name</th>
                <th className="px-4 py-3">Dates</th>
                <th className="px-4 py-3">Total Charged</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-mono font-semibold text-blue-400">{booking.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{booking.guestName}</div>
                    <div className="text-[10px] text-slate-500">{booking.guestEmail}</div>
                  </td>
                  <td className="px-4 py-3">
                    {booking.checkInDate} to {booking.checkOutDate}
                  </td>
                  <td className="px-4 py-3 font-semibold text-white">
                    ₱{booking.totalPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        booking.status === 'Checked In'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : booking.status === 'Confirmed'
                          ? 'bg-blue-500/10 text-blue-400'
                          : booking.status === 'Checked Out'
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {booking.status === 'Checked In' && <CheckCircle className="h-3 w-3" />}
                      {booking.status === 'Confirmed' && <Clock className="h-3 w-3" />}
                      {booking.status === 'Cancelled' && <XCircle className="h-3 w-3" />}
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        onUpdateBookingStatus(booking.id, e.target.value as BookingStatus)
                      }
                      className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1 text-[11px] font-medium text-slate-300 outline-none"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Checked In">Check In</option>
                      <option value="Checked Out">Check Out</option>
                      <option value="Cancelled">Cancel</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};