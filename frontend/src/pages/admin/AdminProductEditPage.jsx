import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Upload,
  Camera,
  Package,
  DollarSign,
  Globe,
  ChevronUp,
  ChevronDown,
  Star,
  X,
} from "lucide-react";

const AdminProductEditPage = () => {
  const { id } = useParams();
  const [removedImageIds, setRemovedImageIds] = useState([]);
const [removedVideoIds, setRemovedVideoIds] = useState([]);
  const navigate = useNavigate();

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
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/product/${id}`);
        const data = await res.json();
        if (res.ok && data.product) {
          setFormData({
            title: data.product.title,
            description: data.product.description,
            category: data.product.category,
            religion: data.product.religion,
            price: data.product.price,
            discount: data.product.discount,
            stock: data.product.stock,
            tags: data.product.tags?.join(", ") || "",
            shipping: data.product.shipping,
            seo: data.product.seo,
            status: data.product.status,
          });
          setImages(
            data.product.media
              .filter((m) => m.type === "image")
              .map((img, idx) => ({
                id: img.public_id,
                file: null,
                url: img.url,
                name: img.public_id,
                isPrimary: idx === 0,
                existing: true,
              }))
          );
          setVideos(
            data.product.media
              .filter((m) => m.type === "video")
              .map((vid) => ({
                id: vid.public_id,
                file: null,
                url: vid.url,
                name: vid.public_id,
                existing: true,
              }))
          );
        } else {
          setError("Product not found");
        }
      } catch {
        setError("Failed to fetch product");
      }
    };
    fetchProduct();
  }, [id]);

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
  setImages((prev) => prev.filter((img) => img.id !== id));
  const img = images.find((img) => img.id === id);
  if (img && img.existing) setRemovedImageIds((prev) => [...prev, id]);
};

const removeVideo = (id) => {
  setVideos((prev) => prev.filter((vid) => vid.id !== id));
  const vid = videos.find((vid) => vid.id === id);
  if (vid && vid.existing) setRemovedVideoIds((prev) => [...prev, id]);
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

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess("");
  try {
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      form.append(key, value)
    );
    images
      .filter((img) => !img.existing)
      .forEach((img) => form.append("images", img.file));
    videos
      .filter((vid) => !vid.existing)
      .forEach((vid) => form.append("videos", vid.file));
    form.append("removedImages", JSON.stringify(removedImageIds));
    form.append("removedVideos", JSON.stringify(removedVideoIds));

    const res = await fetch(`http://localhost:5000/api/product/${id}`, {
      method: "PUT",
      body: form,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update product");
    setSuccess("Product updated successfully!");
    setTimeout(() => navigate("/admin/products"), 1000);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mt-2">Edit Product</h1>
      </div>
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
  onClick={() => removeVideo(video.id)}
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
                      onChange={(e) => handleInputChange("seo", e.target.value)}
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
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 font-medium transition-all duration-200"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 font-medium"
            disabled={loading}
          >
            <Package className="w-4 h-4" />
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
        {(error || success) && (
          <div className="py-4">
            {error && <div className="text-red-600 font-medium">{error}</div>}
            {success && (
              <div className="text-green-600 font-medium">{success}</div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminProductEditPage;
