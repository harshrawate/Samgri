import React, { useState } from "react";
import {
  Bell,
  User,
  Search,
  Eye,
  Edit,
  X,
  FileText,
  Menu,
} from "lucide-react";

const AdminBookingManagement = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-white p-4 shadow rounded mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Booking Management</h1>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="text-gray-600" />
          <div className="relative group">
            <User className="text-gray-600" />
            <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded hidden group-hover:block">
              <div className="p-2 hover:bg-gray-100 cursor-pointer">Profile</div>
              <div className="p-2 hover:bg-gray-100 cursor-pointer">Settings</div>
              <div className="p-2 hover:bg-gray-100 cursor-pointer">Logout</div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-2">Home / Admin / Bookings</p>

      {/* Toolbar */}
      <div className="bg-white p-4 shadow rounded mb-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <div className="relative w-full lg:w-64">
              <input
                type="text"
                placeholder="Search by name, ID, ritual..."
                className="pl-10 pr-4 py-2 border rounded w-full"
              />
              <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
            </div>
            <select className="border px-2 py-2 rounded">
              <option>Ritual Type</option>
            </select>
            <select className="border px-2 py-2 rounded">
              <option>Status</option>
            </select>
            <input type="date" className="border px-2 py-2 rounded" />
            <input type="date" className="border px-2 py-2 rounded" />
            <input type="text" placeholder="City" className="border px-2 py-2 rounded" />
          </div>
          <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            <FileText size={18} /> Export Bookings
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white p-4 shadow rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">Booking ID</th>
              <th className="p-2">Ritual</th>
              <th className="p-2">User</th>
              <th className="p-2">Priest</th>
              <th className="p-2">Religion</th>
              <th className="p-2">Date & Time</th>
              <th className="p-2">Location</th>
              <th className="p-2">Status</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">B123</td>
              <td className="p-2">Griha Pravesh</td>
              <td className="p-2">Harsh Rawate</td>
              <td className="p-2">Pandit Sharma</td>
              <td className="p-2">Hindu</td>
              <td className="p-2">2025-04-22 10:00 AM</td>
              <td className="p-2">Pune</td>
              <td className="p-2 text-green-600">Confirmed</td>
              <td className="p-2">Paid</td>
              <td className="p-2 space-x-2">
                <button><Eye size={16} /></button>
                <button><Edit size={16} /></button>
                <button><X size={16} className="text-red-500" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <p>Showing 1–10 of 100 bookings</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded">Previous</button>
          <button className="px-3 py-1 bg-orange-500 text-white rounded">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        Samgri Admin Panel · Version 1.0
      </footer>
    </div>
  );
};

export default AdminBookingManagement;