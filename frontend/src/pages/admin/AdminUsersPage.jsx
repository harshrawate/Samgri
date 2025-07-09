import React, { useState, useEffect } from "react";
import { Search, Eye, Trash2, Download } from "lucide-react";
import axios from "axios";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editRole, setEditRole] = useState("");

  // Filter states
  const [search, setSearch] = useState("");
  const [accountType, setAccountType] = useState("");
  const [location, setLocation] = useState("");
  const [signupDate, setSignupDate] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          withCredentials: true,
        });
        setUsers(res.data.users);
        setFilteredUsers(res.data.users);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setEditRole(selectedUser.role);
    }
  }, [selectedUser]);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchRole = accountType ? user.role === accountType : true;
      const matchCity = location ? user.city === location : true;

      const matchDate = signupDate
        ? new Date(user.createdAt).toISOString().slice(0, 10) === signupDate
        : true;

      return matchSearch && matchRole && matchCity && matchDate;
    });

    setFilteredUsers(filtered);
  }, [search, accountType, location, signupDate, users]);

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${selectedUser._id}`,
        {
          role: editRole,
        },
        { withCredentials: true }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === selectedUser._id ? { ...u, role: editRole } : u
        )
      );

      setShowModal(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Failed to update user:", err);
      alert("Failed to update user");
    }
  };

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded w-full"
              />
              <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
            </div>
            <select
              className="border px-2 py-2 rounded"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="">Account Type</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <select
              className="border px-2 py-2 rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Location</option>
              {[...new Set(users.map((u) => u.city || "N/A"))].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <input
              type="date"
              className="border px-2 py-2 rounded"
              value={signupDate}
              onChange={(e) => setSignupDate(e.target.value)}
            />
          </div>

          <button
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={() => {
              const csvRows = [];
              const headers = ["ID", "Name", "Email", "Role", "Date Joined"];
              csvRows.push(headers.join(","));
              filteredUsers.forEach((u) => {
                const row = [
                  u._id,
                  u.name,
                  u.email,
                  u.role,
                  new Date(u.createdAt).toLocaleDateString(),
                ];
                csvRows.push(row.join(","));
              });
              const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "users.csv";
              a.click();
              window.URL.revokeObjectURL(url);
            }}
          >
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
              <th className="p-2">Date Joined</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-2">{user._id}</td>
                <td className="p-2">
                  <img
                    src={user.photo || "/images/user.jpg"}
                    alt={user.name}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.phone || "N/A"}</td>
                <td className="p-2">{user.city || "N/A"}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                  >
                    <Eye size={16} />
                  </button>
                  <button>
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <p>Showing {filteredUsers.length} users</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded">Previous</button>
          <button className="px-3 py-1 bg-orange-500 text-white rounded">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 relative">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <p className="border px-2 py-1 rounded">{selectedUser.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <p className="border px-2 py-1 rounded">{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <p className="border px-2 py-1 rounded">{selectedUser.phone || "N/A"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">City</label>
                  <p className="border px-2 py-1 rounded">{selectedUser.city || "N/A"}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Change Role</label>
                <select
                  className="w-full border px-2 py-1 rounded"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 rounded border"
                >
                  Close
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-orange-500 text-white rounded"
                >
                  Save Changes
                </button>
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
