import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Upload,
  X,
  Tag,
  Package,
  DollarSign,
  Camera,
  Truck,
  Globe,
  ChevronUp,
  ChevronDown,
  Trash,
  Star,
} from "lucide-react";

const AdminProductsPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    religion: "",
    price: "",
    discount: "",
    stock: "",
    tags: "",
    shipping: "",
    seo: "",
    status: "Active",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Math.random().toString(36).substr(2, 9),
          file: file,
          url: e.target.result,
          name: file.name,
          isPrimary: images.length === 0,
        };
        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newVideo = {
          id: Math.random().toString(36).substr(2, 9),
          file: file,
          url: e.target.result,
          name: file.name,
        };
        setVideos((prev) => [...prev, newVideo]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      // If removed image was primary, make first image primary
      if (updated.length > 0 && !updated.some((img) => img.isPrimary)) {
        updated[0].isPrimary = true;
      }
      return updated;
    });
  };

  const moveImage = (id, direction) => {
    setImages((prev) => {
      const index = prev.findIndex((img) => img.id === id);
      if (
        (direction === "up" && index === 0) ||
        (direction === "down" && index === prev.length - 1)
      ) {
        return prev;
      }
      const newIndex = direction === "up" ? index - 1 : index + 1;
      const newImages = [...prev];
      [newImages[index], newImages[newIndex]] = [
        newImages[newIndex],
        newImages[index],
      ];
      return newImages;
    });
  };

  const setPrimaryImage = (id) => {
    setImages((prev) =>
      prev.map((img) => ({ ...img, isPrimary: img.id === id }))
    );
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      religion: "",
      price: "",
      discount: "",
      stock: "",
      tags: "",
      shipping: "",
      seo: "",
      status: "Active",
    });
    setImages([]);
    setVideos([]);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("religion", formData.religion);
      form.append("price", formData.price);
      form.append("discount", formData.discount);
      form.append("stock", formData.stock);
      form.append("status", formData.status);
      form.append("tags", formData.tags);
      form.append("shipping", formData.shipping);
      form.append("seo", formData.seo);

      // Append images in order
      images.forEach((img) => {
        form.append("images", img.file);
      });

      videos.forEach((video) => {
        form.append("videos", video.file);
      });

      const res = await fetch("http://localhost:5000/api/product/addProducts", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create product");

      setSuccess("Product created successfully!");
      resetForm();
      setShowModal(false);
      await fetchProducts();
      // Optionally: refresh product list here
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/product/getProducts");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/api/product/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete product");
      setSuccess("Product deleted successfully!");
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">Home / Admin / Products</p>
        <h1 className="text-2xl font-bold mt-2">Product Management</h1>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded w-full"
              />
              <Search
                className="absolute left-2 top-2.5 text-gray-400"
                size={18}
              />
            </div>
            <select className="border px-2 py-2 rounded">
              <option>Category</option>
            </select>
            <select className="border px-2 py-2 rounded">
              <option>Availability</option>
            </select>
            <select className="border px-2 py-2 rounded">
              <option>Religion</option>
            </select>
            <select className="border px-2 py-2 rounded">
              <option>Sort by: Newest</option>
              <option>Price</option>
              <option>Popularity</option>
            </select>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus size={18} /> Add New Product
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
              <th className="p-2">Product Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Religion</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="p-2">{product._id}</td>
                <td className="p-2">
                  <img
                    src={
                      product.media?.find((m) => m.type === "image")?.url ||
                      "/images/sample.jpg"
                    }
                    alt={product.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                </td>
                <td className="p-2">{product.title}</td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">{product.religion}</td>
                <td className="p-2">₹{product.price}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2 text-green-600">{product.status}</td>
                <td className="p-2 space-x-2">
                  <button>
                    <Eye size={16} />
                  </button>
                 <button onClick={() => navigate(`/admin/products/${product._id}/edit`)}>
  <Edit size={16} />
</button>
                  <button onClick={() => handleDeleteProduct(product._id)}>
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
        <p>Showing 1–10 of 200 products</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded">Previous</button>
          <button className="px-3 py-1 bg-orange-500 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>

      {/* Enhanced Single Page Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl relative overflow-hidden max-h-[95vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white text-orange-400 bg-opacity-20 p-3 rounded-xl">
                    <Package className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Add New Product</h2>
                    <p className="text-orange-100 text-lg">
                      Create a comprehensive product listing
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="bg-white text-orange-400 bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body & Form */}
            <form onSubmit={handleSubmit}>
              <div className="p-8 overflow-y-auto max-h-[calc(95vh-180px)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Product Images */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 sticky top-0">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Camera className="w-5 h-5 text-orange-600" />
                        Product Images
                      </h3>
                      {/* Image Upload Area */}
                      <div className="mb-6">
                        <label className="block">
                          <div className="border-2 border-dashed border-orange-300 rounded-xl p-6 text-center hover:border-orange-500 transition-all duration-300 cursor-pointer bg-white hover:bg-orange-50">
                            <Upload className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                            <p className="text-gray-600 font-medium mb-1">
                              Drop images here or click to browse
                            </p>
                            <p className="text-sm text-gray-400">
                              JPG, PNG, WebP (Max 5MB each)
                            </p>
                            <div className="mt-3">
                              <span className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                                Choose Files
                              </span>
                            </div>
                          </div>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-md font-bold text-gray-800 mb-2 flex items-center gap-2">
                          <Camera className="w-4 h-4 text-orange-600" /> Product
                          Videos
                        </h3>
                        <label className="block">
                          <div className="border-2 border-dashed border-purple-300 rounded-xl p-4 text-center hover:border-purple-500 cursor-pointer bg-white hover:bg-purple-50 transition-all duration-300">
                            <Upload className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                            <p className="text-gray-600 font-medium">
                              Click to upload videos (MP4, Max 10MB)
                            </p>
                          </div>
                          <input
                            type="file"
                            multiple
                            accept="video/mp4"
                            onChange={handleVideoUpload}
                            className="hidden"
                          />
                        </label>

                        {/* Video Preview */}
                        {videos.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {videos.map((video) => (
                              <div
                                key={video.id}
                                className="flex items-center justify-between gap-3 bg-white p-2 rounded shadow border"
                              >
                                <video
                                  src={video.url}
                                  controls
                                  className="w-28 h-16 rounded object-cover"
                                />
                                <p className="flex-1 text-sm text-gray-700 truncate">
                                  {video.name}
                                </p>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setVideos(
                                      videos.filter((v) => v.id !== video.id)
                                    )
                                  }
                                  className="text-sm text-red-500 hover:underline"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Image Preview List */}
                      {images.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                            Uploaded Images ({images.length})
                          </h4>
                          {images.map((image, index) => (
                            <div
                              key={image.id}
                              className={`relative bg-white rounded-xl p-3 shadow-sm border-2 transition-all duration-200 ${
                                image.isPrimary
                                  ? "border-orange-400 shadow-orange-200"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <img
                                    src={image.url}
                                    alt={image.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                  {image.isPrimary && (
                                    <div className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full p-1">
                                      <Star className="w-3 h-3 fill-current" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-800 truncate">
                                    {image.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {image.isPrimary
                                      ? "Primary Image"
                                      : `Image ${index + 1}`}
                                  </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <button
                                    type="button"
                                    onClick={() => moveImage(image.id, "up")}
                                    disabled={index === 0}
                                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                  >
                                    <ChevronUp className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => moveImage(image.id, "down")}
                                    disabled={index === images.length - 1}
                                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                  >
                                    <ChevronDown className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
                                <button
                                  type="button"
                                  onClick={() => setPrimaryImage(image.id)}
                                  disabled={image.isPrimary}
                                  className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {image.isPrimary ? "Primary" : "Set Primary"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeImage(image.id)}
                                  className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Right Column - Product Details */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Basic Information Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Package className="w-5 h-5 text-blue-600" />
                        Basic Information
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Title *
                          </label>
                          <input
                            value={formData.title}
                            onChange={(e) =>
                              handleInputChange("title", e.target.value)
                            }
                            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-200 text-lg font-medium"
                            placeholder="Enter product name..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Description *
                          </label>
                          <textarea
                            value={formData.description}
                            onChange={(e) =>
                              handleInputChange("description", e.target.value)
                            }
                            rows="4"
                            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-200 resize-none"
                            placeholder="Describe your product in detail..."
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Category *
                            </label>
                            <select
                              value={formData.category}
                              onChange={(e) =>
                                handleInputChange("category", e.target.value)
                              }
                              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-200"
                            >
                              <option value="">Select category</option>
                              <option value="Idols">Idols</option>
                              <option value="Incense">Incense</option>
                              <option value="Decorations">Decorations</option>
                              <option value="Books">Books</option>
                              <option value="Jewelry">Jewelry</option>
                              <option value="Clothing">Clothing</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Religion
                            </label>
                            <select
                              value={formData.religion}
                              onChange={(e) =>
                                handleInputChange("religion", e.target.value)
                              }
                              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-200"
                            >
                              <option value="">Select religion</option>
                              <option value="Hinduism">Hinduism</option>
                              <option value="Buddhism">Buddhism</option>
                              <option value="Christianity">Christianity</option>
                              <option value="Islam">Islam</option>
                              <option value="Sikhism">Sikhism</option>
                              <option value="Jainism">Jainism</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Pricing & Inventory Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        Pricing & Inventory
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Price (₹) *
                          </label>
                          <input
                            type="number"
                            value={formData.price}
                            onChange={(e) =>
                              handleInputChange("price", e.target.value)
                            }
                            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:ring-0 transition-all duration-200"
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Discount (%)
                          </label>
                          <input
                            type="number"
                            value={formData.discount}
                            onChange={(e) =>
                              handleInputChange("discount", e.target.value)
                            }
                            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:ring-0 transition-all duration-200"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Stock Quantity *
                          </label>
                          <input
                            type="number"
                            value={formData.stock}
                            onChange={(e) =>
                              handleInputChange("stock", e.target.value)
                            }
                            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:ring-0 transition-all duration-200"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Product Status
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) =>
                            handleInputChange("status", e.target.value)
                          }
                          className="w-full md:w-1/3 border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:ring-0 transition-all duration-200"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>
                    </div>
                    {/* Additional Details Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-purple-600" />
                        Additional Details
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tags / Keywords
                          </label>
                          <input
                            value={formData.tags}
                            onChange={(e) =>
                              handleInputChange("tags", e.target.value)
                            }
                            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:ring-0 transition-all duration-200"
                            placeholder="pooja, brass, decor, spiritual, handmade..."
                          />
                          <p className="text-sm text-gray-500 mt-2">
                            Separate tags with commas
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Shipping Details
                          </label>
                          <input
                            value={formData.shipping}
                            onChange={(e) =>
                              handleInputChange("shipping", e.target.value)
                            }
                            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:ring-0 transition-all duration-200"
                            placeholder="Weight, dimensions, special handling instructions..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            SEO Meta Description
                          </label>
                          <textarea
                            value={formData.seo}
                            onChange={(e) =>
                              handleInputChange("seo", e.target.value)
                            }
                            rows="3"
                            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:ring-0 transition-all duration-200 resize-none"
                            placeholder="Brief description for search engines (150-160 characters)..."
                          />
                          <p className="text-sm text-gray-500 mt-2">
                            {formData.seo.length}/160 characters
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Modal Footer */}
              <div className="bg-gray-50 px-8 py-6 flex justify-between items-center border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 font-medium transition-all duration-200"
                    disabled={loading}
                  >
                    Reset Form
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 font-medium"
                    disabled={loading}
                  >
                    <Package className="w-4 h-4" />
                    {loading ? "Creating..." : "Create Product"}
                  </button>
                </div>
              </div>
              {/* Error/Success messages */}
              {(error || success) && (
                <div className="px-8 pb-4">
                  {error && (
                    <div className="text-red-600 font-medium">{error}</div>
                  )}
                  {success && (
                    <div className="text-green-600 font-medium">{success}</div>
                  )}
                </div>
              )}
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

export default AdminProductsPage;
