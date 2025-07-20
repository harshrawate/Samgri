import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Filter,
  Star,
  Upload,
  X,
} from "lucide-react";

const AdminRituals = () => {
  const [rituals, setRituals] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    religion: "",
    category: "",
    popularity: "",
    priceSort: "",
  });

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, rituals]);

  // Fetch all rituals from backend
  const fetchAll = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/rituals", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setRituals(data.rituals);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Apply client-side filters and sorting
  const applyFilters = () => {
    let arr = [...rituals];
    const { search, religion, category, popularity, priceSort } = filters;

    if (search) {
      arr = arr.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (religion) arr = arr.filter((r) => r.religion === religion);
    if (category) arr = arr.filter((r) => r.category === category);
    if (popularity)
      arr = arr.filter((r) => r.popularity >= parseFloat(popularity));
    if (priceSort) {
      arr.sort((a, b) =>
        priceSort === "low" ? a.price - b.price : b.price - a.price
      );
    }
    setFiltered(arr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    try {
      const res = await fetch("http://localhost:5000/api/rituals/addRitual", {
        method: "POST",
        body: form,
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        e.target.reset();
        fetchAll();
      } else alert("Failed to add ritual.");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <p className="text-orange-100 text-sm mb-2 flex items-center">
            Home / Admin / <span className="text-white ml-1">Rituals</span>
          </p>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Star className="text-white" size={24} />
            </div>
            Manage Rituals
          </h1>
          <p className="text-orange-100 mt-2">
            Create and manage spiritual rituals for your platform
          </p>
        </div>
      </div>

      {/* Enhanced Toolbar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Search with enhanced styling */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search rituals..."
                className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg w-full lg:w-64 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 group-hover:border-orange-300"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
              <Search
                className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-orange-500 transition-colors"
                size={20}
              />
            </div>

            {/* Enhanced filters */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter size={16} />
              <span className="font-medium">Filters:</span>
            </div>

            <select
              className="border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 hover:border-orange-300"
              value={filters.religion}
              onChange={(e) =>
                setFilters({ ...filters, religion: e.target.value })
              }
            >
              <option value="">All Religions</option>
              {[...new Set(rituals.map((r) => r.religion))].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <select
              className="border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 hover:border-orange-300"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All Categories</option>
              {[...new Set(rituals.map((r) => r.category))].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              className="border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 hover:border-orange-300"
              value={filters.popularity}
              onChange={(e) =>
                setFilters({ ...filters, popularity: e.target.value })
              }
            >
              <option value="">Popularity ≥</option>
              {[5, 4, 3, 2, 1].map((m) => (
                <option key={m} value={m}>
                  {m}★
                </option>
              ))}
            </select>

            <select
              className="border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 hover:border-orange-300"
              value={filters.priceSort}
              onChange={(e) =>
                setFilters({ ...filters, priceSort: e.target.value })
              }
            >
              <option value="">Sort by Price</option>
              <option value="low">Low → High</option>
              <option value="high">High → Low</option>
            </select>
          </div>

          {/* Enhanced Add Button */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
          >
            <Plus size={20} /> Add New Ritual
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">{rituals.length}</div>
            <div className="text-blue-100 text-sm">Total Rituals</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">
              {rituals.filter((r) => r.status === "Active").length}
            </div>
            <div className="text-green-100 text-sm">Active Rituals</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">
              {[...new Set(rituals.map((r) => r.religion))].length}
            </div>
            <div className="text-purple-100 text-sm">Religions</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">{filtered.length}</div>
            <div className="text-orange-100 text-sm">Filtered Results</div>
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                {[
                  "#",
                  "Image",
                  "Name",
                  "Religion",
                  "Price",
                  "Duration",
                  "Popularity",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.length ? (
                filtered.map((r, i) => (
                  <tr
                    key={r._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
                        <img
                          src={r.image?.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {r.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {r.religion}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-green-600">
                        ₹{r.price}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {r.duration}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star
                          className="text-yellow-400 fill-current"
                          size={16}
                        />
                        <span className="text-sm font-medium">
                          {r.popularity ?? "0"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          r.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <Star size={48} className="mx-auto mb-4 opacity-50" />
                      <p className="text-lg text-gray-500">No rituals found</p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your filters or add a new ritual
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <Plus size={24} />
                      Add New Ritual
                    </h2>
                    <p className="text-orange-100 mt-1">
                      Create a new spiritual ritual offering
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ritual Title *
                    </label>
                    <input
                      name="title"
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                      placeholder="Enter ritual title"
                      required
                    />
                  </div>

                  {/* Religion */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Religion *
                    </label>
                    <select
                      name="religion"
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                      required
                    >
                      <option value="">Select Religion</option>
                      {[
                        "Hindu",
                        "Muslim",
                        "Christian",
                        "Buddhist",
                        "Sikh",
                        "Jain",
                      ].map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      name="category"
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                      placeholder="e.g., Puja, Ceremony"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price (₹) *
                    </label>
                    <input
                      name="price"
                      type="number"
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                      placeholder="0"
                      required
                      min="0"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      name="duration"
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                      placeholder="e.g., 2 hours, 1 day"
                    />
                  </div>

                  {/* Popularity - NEW FIELD */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Popularity Rating
                    </label>
                    <select
                      name="popularity"
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                    >
                      <option value="">Select Rating</option>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating} Star{rating > 1 ? "s" : ""} (
                          {rating === 5
                            ? "Excellent"
                            : rating === 4
                            ? "Good"
                            : rating === 3
                            ? "Average"
                            : rating === 2
                            ? "Below Average"
                            : "Poor"}
                          )
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Festivals */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Associated Festivals
                    </label>
                    <input
                      name="festivals"
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                      placeholder="e.g., Diwali, Holi"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                    placeholder="Describe the ritual, its significance, and what it includes..."
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label
                    htmlFor="imageUpload"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Ritual Image *
                  </label>

                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors"
                  >
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm text-gray-500 mt-2">
                      Upload a high-quality image representing the ritual
                    </p>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-4 mx-auto h-32 w-32 object-cover rounded-lg border"
                      />
                    )}
                  </label>

                  <input
                    id="imageUpload"
                    name="image"
                    type="file"
                    accept="image/*"
                    required
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result);
                        };
                        reader.readAsDataURL(file);
                      } else {
                        setImagePreview(null);
                      }
                    }}
                  />
                </div>

                {/* SEO Section */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <Search size={20} />
                    SEO Optimization (Optional)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Keywords
                      </label>
                      <input
                        name="seo[keywords]"
                        placeholder="ritual, puja, ceremony, spiritual"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Meta Title
                      </label>
                      <input
                        name="seo[metaTitle]"
                        placeholder="SEO-friendly title for search engines"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        name="seo[metaDescription]"
                        placeholder="Brief description for search engine results"
                        rows="2"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end gap-4">
                <button
                  type="button"
                  className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  Create Ritual
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enhanced Footer */}
      <footer className="mt-16 text-center">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Star className="text-white" size={16} />
            </div>
            <span className="font-semibold">Samgri Admin Panel</span>
          </div>
          <p className="text-sm text-gray-500">
            Version 2.0 · Managing spiritual experiences with care
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminRituals;
