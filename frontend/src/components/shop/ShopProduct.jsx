import { Star, Filter, X } from 'lucide-react';
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

    // Change this line based on your API response format
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
      credentials: "include", // ⬅️ Important to include cookies
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add to cart");
    alert("Added to cart!");
  } catch (err) {
    alert("Please login to add to cart.");
    console.error(err);
  }
};



export default function ShopProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    religions: [],
    priceMin: 0,
    priceMax: 10000,
    minRating: 0,
    categories: [],
    onlyDiscounted: false
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const productsPerPage = 6;

  // Utility function
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

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Hide mobile filters when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setShowMobileFilters(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
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
  }, [products, filters, getDiscountedPrice]);

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

  const renderStars = (rating = 0) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? "#F4A300" : "none"}
        stroke="#F4A300"
      />
    ));

  const FilterSection = () => (
    <aside className={`w-full md:w-1/4 bg-[#F5F1EB] p-4 rounded-xl ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-[#5C1A1B]">Filters</h2>
        <div className="flex gap-2">
          <button onClick={resetFilters} className="text-sm text-[#5C1A1B] hover:underline">Reset</button>
          <button onClick={() => setShowMobileFilters(false)} className="md:hidden text-[#5C1A1B]">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Religion */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Religion</h3>
        {availableReligions.map(religion => (
          <div key={religion} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              id={`religion-${religion}`}
              checked={filters.religions.includes(religion)}
              onChange={() => handleCheckboxChange("religions", religion)}
              className="rounded"
            />
            <label htmlFor={`religion-${religion}`} className="text-sm cursor-pointer">
              {religion}
            </label>
          </div>
        ))}
      </div>

      {/* Category */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Category</h3>
        {availableCategories.map(category => (
          <div key={category} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              id={`category-${category}`}
              checked={filters.categories.includes(category)}
              onChange={() => handleCheckboxChange("categories", category)}
              className="rounded"
            />
            <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
              {category}
            </label>
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Price Range (₹)</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => setFilters(prev => ({ ...prev, priceMin: e.target.value === "" ? 0 : Number(e.target.value) }))}
            className="border px-2 py-1 rounded w-full text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => setFilters(prev => ({ ...prev, priceMax: e.target.value === "" ? 10000 : Number(e.target.value) }))}
            className="border px-2 py-1 rounded w-full text-sm"
          />
        </div>
      </div>

      {/* Discount */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="discount-filter"
            checked={filters.onlyDiscounted}
            onChange={(e) => setFilters(prev => ({ ...prev, onlyDiscounted: e.target.checked }))}
            className="rounded"
          />
          <label htmlFor="discount-filter" className="text-sm cursor-pointer">
            Show only discounted items
          </label>
        </div>
      </div>
    </aside>
  );

  if (loading) {
    return (
      <div className="bg-[#FAF5EF] px-4 md:px-12 py-10 text-[#3b3b3b] font-['Cormorant_Garamond']">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C1A1B] mx-auto mb-4"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF5EF] px-4 md:px-12 py-10 text-[#3b3b3b] font-['Cormorant_Garamond']">
      <div className="flex flex-col md:flex-row gap-6">
        <FilterSection />

        <main className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Products ({filteredProducts.length})</h2>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center gap-2 bg-[#5C1A1B] text-white px-3 py-2 rounded-lg"
            >
              <Filter size={16} /> Filters
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No products found matching your filters.</p>
              <button
                onClick={resetFilters}
                className="bg-[#5C1A1B] text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => {
                  const discountedPrice = getDiscountedPrice(product.price, product.discount);
                  const hasDiscount = product.discount > 0;

                  return (
                    <div key={product._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/product/${product._id}`)}>
                      <div className="relative">
                        <img
                          src={product.media?.[0]?.url || '/api/placeholder/300/240'}
                          alt={product.title || "Product Image"}
                          className="w-full h-56 object-cover"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/300/240';
                          }}
                        />
                        {hasDiscount && (
                          <span className="absolute top-2 right-2 bg-[#F4A300] text-white text-xs px-2 py-1 rounded">
                            -{product.discount}%
                          </span>
                        )}
                        {product.stock <= 5 && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            Only {product.stock} left
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1 text-[#5C1A1B] line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>

                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-[#F5F1EB] text-[#5C1A1B] px-2 py-1 rounded">{product.religion}</span>
                          <span className="text-xs bg-[#F5F1EB] text-[#5C1A1B] px-2 py-1 rounded">{product.category}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          {hasDiscount && <p className="text-sm line-through text-gray-400">₹{product.price}</p>}
                          <p className="text-[#D4AF37] font-bold text-lg">₹{Math.round(discountedPrice)}</p>
                        </div>

                        <button
  onClick={(e) => {
    e.stopPropagation(); // Prevent navigation
    addToCart(product._id);
  }}
  className="mt-4 w-full bg-[#5C1A1B] text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
>
  Add to Cart
</button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2 text-[#5C1A1B]">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`border px-3 py-1 rounded-full transition ${
                        currentPage === index + 1
                          ? 'bg-[#F4A300] text-white border-[#F4A300]'
                          : 'hover:bg-[#F4A300] hover:text-white hover:border-[#F4A300]'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
