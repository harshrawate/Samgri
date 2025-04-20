import React from "react";
import {
  Bell,
  User,
  Search,
  Eye,
  Edit,
  X,
  FileText,
} from "lucide-react";

const AdminOrderManagement = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-white p-4 shadow rounded mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Order Management</h1>
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
      <p className="text-sm text-gray-500 mb-2">Home / Admin / Orders</p>

      {/* Toolbar */}
      <div className="bg-white p-4 shadow rounded mb-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <div className="relative w-full lg:w-64">
              <input
                type="text"
                placeholder="Search by Order ID, User, Product name"
                className="pl-10 pr-4 py-2 border rounded w-full"
              />
              <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
            </div>
            <select className="border px-2 py-2 rounded">
              <option>Order Status</option>
            </select>
            <select className="border px-2 py-2 rounded">
              <option>Payment Status</option>
            </select>
            <input type="date" className="border px-2 py-2 rounded" />
            <input type="date" className="border px-2 py-2 rounded" />
            <select className="border px-2 py-2 rounded">
              <option>Delivery Type</option>
            </select>
          </div>
          <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            <FileText size={18} /> Export Orders
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-4 shadow rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">Order ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Product(s)</th>
              <th className="p-2">Order Date</th>
              <th className="p-2">Total</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Delivery</th>
              <th className="p-2">Address</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">O456</td>
              <td className="p-2">Harsh Rawate</td>
              <td className="p-2">Incense Sticks, Gita Book</td>
              <td className="p-2">2025-04-18</td>
              <td className="p-2">₹750</td>
              <td className="p-2 text-green-600">Paid</td>
              <td className="p-2">Delivered</td>
              <td className="p-2">Pune</td>
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
        <p>Showing 1–10 of 500 orders</p>
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

export default AdminOrderManagement;
