import { Star, Filter, X, Heart, ShoppingCart, Eye, Zap, Package, Tag } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

// API function to fetch products
const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/product/getProducts');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const json = await response.json();
    return json.products || json.data || json; 
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const addToCart = async (productId) => {
  try {
    const res = await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add to cart");
    
    // Enhanced success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
    notification.textContent = '✓ Added to cart successfully!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  } catch (err) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = '⚠ Please login to add to cart';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
    console.error(err);
  }
};

export default function ShopProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [wishlist, setWishlist] = useState(new Set());
  const [filters, setFilters] = useState({
    religions: [],
    priceMin: 0,
    priceMax: 10000,
    minRating: 0,
    categories: [],
    onlyDiscounted: false
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const productsPerPage = 12;

  const getDiscountedPrice = useCallback((price, discount) => {
    return price - (price * discount) / 100;
  }, []);

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        const activeProducts = data.filter(p => p.status === 'Active' && p.stock > 0);
        setProducts(activeProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setShowMobileFilters(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const discountedPrice = getDiscountedPrice(product.price, product.discount);
      return (
        (filters.religions.length === 0 || filters.religions.includes(product.religion)) &&
        discountedPrice >= filters.priceMin &&
        discountedPrice <= filters.priceMax &&
        (filters.categories.length === 0 || filters.categories.includes(product.category)) &&
        (!filters.onlyDiscounted || product.discount > 0) &&
        (product.rating || 0) >= filters.minRating &&
        product.stock > 0
      );
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => getDiscountedPrice(a.price, a.discount) - getDiscountedPrice(b.price, b.discount));
        break;
      case 'price-high':
        filtered.sort((a, b) => getDiscountedPrice(b.price, b.discount) - getDiscountedPrice(a.price, a.discount));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, filters, sortBy, getDiscountedPrice]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const availableCategories = [...new Set(products.map(p => p.category))];
  const availableReligions = [...new Set(products.map(p => p.religion))];

  const handleCheckboxChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const resetFilters = () => {
    setFilters({
      religions: [],
      priceMin: 0,
      priceMax: 10000,
      minRating: 0,
      categories: [],
      onlyDiscounted: false
    });
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const renderStars = (rating = 0) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < rating ? "#F59E0B" : "none"}
        stroke="#F59E0B"
        className="transition-colors"
      />
    ));

  const FilterSection = () => (
    <aside className={`w-full md:w-1/4 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
      <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Filter size={20} className="text-orange-500" />
            Filters
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={resetFilters} 
              className="text-sm text-orange-500 hover:text-orange-600 font-medium underline"
            >
              Reset All
            </button>
            <button 
              onClick={() => setShowMobileFilters(false)} 
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Religion Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
            Religion
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {availableReligions.map(religion => (
              <label key={religion} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.religions.includes(religion)}
                  onChange={() => handleCheckboxChange("religions", religion)}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">
                  {religion}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            Category
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {availableCategories.map(category => (
              <label key={category} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCheckboxChange("categories", category)}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
    Price Range
  </h3>
  <div className="flex gap-2">
    <input
      type="number"
      placeholder="Min"
      value={filters.priceMin}
      onChange={(e) => setFilters(prev => ({ ...prev, priceMin: e.target.value === "" ? 0 : Number(e.target.value) }))}
      className="w-0 min-w-0 flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
    />
    <input
      type="number"
      placeholder="Max"
      value={filters.priceMax}
      onChange={(e) => setFilters(prev => ({ ...prev, priceMax: e.target.value === "" ? 10000 : Number(e.target.value) }))}
      className="w-0 min-w-0 flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
    />
  </div>
</div>

        {/* Rating Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.minRating === rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
                  className="w-4 h-4 text-yellow-500 border-gray-300 focus:ring-yellow-500"
                />
                <div className="flex items-center gap-1">
                  {renderStars(rating)}
                  <span className="text-sm text-gray-600 ml-1">& above</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Discount Filter */}
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.onlyDiscounted}
              onChange={(e) => setFilters(prev => ({ ...prev, onlyDiscounted: e.target.checked }))}
              className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
            />
            <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors flex items-center gap-2">
              <Tag size={16} className="text-red-500" />
              Show only discounted items
            </span>
          </label>
        </div>
      </div>
    </aside>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Amazing Products...</h3>
            <p className="text-gray-500">Please wait while we fetch the best deals for you</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sacred Products Collection
            </h1>
            <p className="text-xl text-orange-100 mb-6">
              Discover authentic spiritual items for your divine journey
            </p>
            <div className="flex justify-center space-x-8 text-orange-200">
              <div className="text-center">
                <div className="text-2xl font-bold">{products.length}+</div>
                <div className="text-sm">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5★</div>
                <div className="text-sm">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSection />

          <main className="w-full md:w-3/4">
            {/* Header with Controls */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Products ({filteredProducts.length})
                  </h2>
                  <p className="text-gray-600">Find the perfect spiritual items for your needs</p>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                  
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="md:hidden flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Filter size={16} /> Filters
                  </button>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <Package size={64} className="mx-auto text-gray-300 mb-6" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Products Found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to see more results</p>
                <button
                  onClick={resetFilters}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {paginatedProducts.map((product, index) => {
                    const discountedPrice = getDiscountedPrice(product.price, product.discount);
                    const hasDiscount = product.discount > 0;

                    return (
                      <div 
                        key={product._id}
                        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: 'fadeInUp 0.6s ease-out forwards'
                        }}
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={product.media?.[0]?.url || '/api/placeholder/300/240'}
                            alt={product.title || "Product Image"}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                            onClick={() => navigate(`/product/${product._id}`)}
                            onError={(e) => {
                              e.target.src = '/api/placeholder/300/240';
                            }}
                          />
                          
                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {hasDiscount && (
                              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                -{product.discount}% OFF
                              </span>
                            )}
                            {product.stock <= 5 && (
                              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                Only {product.stock} left!
                              </span>
                            )}
                          </div>

                          {/* Wishlist Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(product._id);
                            }}
                            className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-all ${
                              wishlist.has(product._id) 
                                ? 'bg-red-500 text-white' 
                                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                            }`}
                          >
                            <Heart size={20} fill={wishlist.has(product._id) ? "currentColor" : "none"} />
                          </button>

                          {/* Quick Actions */}
                          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/product/${product._id}`);
                              }}
                              className="flex-1 bg-white/90 backdrop-blur-sm text-gray-800 py-2 px-3 rounded-lg font-medium hover:bg-white transition-colors flex items-center justify-center gap-2"
                            >
                              <Eye size={16} /> View
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product._id);
                              }}
                              className="flex-1 bg-orange-500 text-white py-2 px-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                            >
                              <ShoppingCart size={16} /> Cart
                            </button>
                          </div>
                        </div>

                        <div className="p-6">
                          {/* Category Tags */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
                              {product.religion}
                            </span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                              {product.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
                            {product.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>

                          {/* Rating */}
                          {product.rating > 0 && (
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center">
                                {renderStars(product.rating)}
                              </div>
                              <span className="text-sm text-gray-600">
                                ({product.rating}/5)
                              </span>
                            </div>
                          )}

                          {/* Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {hasDiscount && (
                                <span className="text-sm line-through text-gray-400">
                                  ₹{product.price}
                                </span>
                              )}
                              <span className="text-xl font-bold text-orange-600">
                                ₹{Math.round(discountedPrice)}
                              </span>
                            </div>
                            {hasDiscount && (
                              <span className="text-sm text-green-600 font-semibold">
                                Save ₹{Math.round(product.price - discountedPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-2 bg-white rounded-2xl shadow-lg p-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                      >
                        ← Previous
                      </button>
                      
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1;
                        const isActive = currentPage === pageNum;
                        const showPage = pageNum === 1 || pageNum === totalPages || 
                          (pageNum >= currentPage - 2 && pageNum <= currentPage + 2);
                        
                        if (!showPage && pageNum !== currentPage - 3 && pageNum !== currentPage + 3) {
                          return null;
                        }
                        
                        if (!showPage) {
                          return <span key={pageNum} className="px-2">...</span>;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                              isActive
                                ? 'bg-orange-500 text-white shadow-md'
                                : 'hover:bg-orange-50 hover:text-orange-600 text-gray-700'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
