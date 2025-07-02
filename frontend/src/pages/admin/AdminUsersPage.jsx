import React, { useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  Download,
  UserCog,
  ShieldCheck,
  Ban,
} from "lucide-react";

const AdminUsersPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">Home / Admin / Users</p>
        <h1 className="text-2xl font-bold mt-2">Manage Users</h1>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border rounded w-full"
              />
              <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
            </div>
            <select className="border px-2 py-2 rounded">
              <option>Account Type</option>
            </select>
            <select className="border px-2 py-2 rounded">
              <option>Location</option>
            </select>
            <select className="border px-2 py-2 rounded">
              <option>Signup Date</option>
            </select>
          </div>

          <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            <Download size={18} /> Export Users
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">User ID</th>
              <th className="p-2">Photo</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">City</th>
              <th className="p-2">Account Type</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date Joined</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">U001</td>
              <td className="p-2"><img src="/images/user.jpg" alt="user" className="w-10 h-10 object-cover rounded-full" /></td>
              <td className="p-2">John Doe</td>
              <td className="p-2">john@example.com</td>
              <td className="p-2">+91 9876543210</td>
              <td className="p-2">Mumbai</td>
              <td className="p-2">User</td>
              <td className="p-2 text-green-600">Active</td>
              <td className="p-2">2024-01-10</td>
              <td className="p-2 space-x-2">
                <button onClick={() => setShowModal(true)}><Eye size={16} /></button>
                <button><Trash2 size={16} className="text-red-600" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <p>Showing 1–10 of 350 users</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded">Previous</button>
          <button className="px-3 py-1 bg-orange-500 text-white rounded">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 relative">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <p className="border px-2 py-1 rounded">John Doe</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <p className="border px-2 py-1 rounded">john@example.com</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <p className="border px-2 py-1 rounded">+91 9876543210</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">City</label>
                  <p className="border px-2 py-1 rounded">Mumbai</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Change Role</label>
                <select className="w-full border px-2 py-1 rounded">
                  <option>User</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded">Activate</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded">Deactivate</button>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        Samgri Admin Panel · Version 1.0
      </footer>
    </div>
  );
}; 

export default AdminUsersPage;
