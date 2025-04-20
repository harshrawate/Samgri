import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  ArrowDownAZ,
  Clock,
  Star,
  Image,
  Tag,
  Settings,
} from "lucide-react";

const AdminRituals = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">Home / Admin / Rituals</p>
        <h1 className="text-2xl font-bold mt-2">Manage Rituals</h1>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search rituals..."
                className="pl-10 pr-4 py-2 border rounded w-full"
              />
              <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
            </div>
            <select className="border px-2 py-2 rounded">
              <option>Religion</option>
            </select>
            <select className="border px-2 py-2 rounded">
              <option>Price Range</option>
            </select>
            <select className="border px-2 py-2 rounded">
              <option>Popularity</option>
            </select>
            <select className="border px-2 py-2 rounded">
              <option>Category</option>
            </select>
            <select className="border px-2 py-2 rounded">
              <option>Sort by: A-Z</option>
              <option>Price Low to High</option>
              <option>Newest First</option>
            </select>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            <Plus size={18} /> Add New Ritual
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">ID</th>
              <th className="p-2">Image</th>
              <th className="p-2">Ritual Name</th>
              <th className="p-2">Religion</th>
              <th className="p-2">Price</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Popularity</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">001</td>
              <td className="p-2"><img src="/images/sample.jpg" alt="ritual" className="w-10 h-10 object-cover rounded" /></td>
              <td className="p-2">Griha Pravesh</td>
              <td className="p-2">Hindu</td>
              <td className="p-2">₹2,100</td>
              <td className="p-2">90 mins</td>
              <td className="p-2">★ 4.8</td>
              <td className="p-2 text-green-600">Active</td>
              <td className="p-2 space-x-2">
                <button><Eye size={16} /></button>
                <button><Edit size={16} /></button>
                <button><Trash2 size={16} className="text-red-600" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <p>Showing 1–10 of 120 rituals</p>
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
          <div className="bg-white w-full max-w-xl rounded-lg p-6 relative">
            <h2 className="text-xl font-bold mb-4">Add New Ritual</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Ritual Title</label>
                <input className="w-full border px-2 py-1 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea className="w-full border px-2 py-1 rounded"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium">Religion</label>
                <select className="w-full border px-2 py-1 rounded">
                  <option>Hindu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Associated Festivals</label>
                <input className="w-full border px-2 py-1 rounded" placeholder="Diwali, Holi" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium">Price</label>
                  <input type="number" className="w-full border px-2 py-1 rounded" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium">Duration</label>
                  <input type="text" className="w-full border px-2 py-1 rounded" placeholder="e.g., 90 mins" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Category</label>
                <input className="w-full border px-2 py-1 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Image Upload</label>
                <input type="file" className="w-full border px-2 py-1 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">SEO Metadata (optional)</label>
                <input className="w-full border px-2 py-1 rounded" placeholder="keywords, meta title, description" />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded">Save</button>
              </div>
            </form>
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

export default AdminRituals;
