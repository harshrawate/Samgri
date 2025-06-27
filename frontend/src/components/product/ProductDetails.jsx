import { Star, Heart, Share2, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


// API function to fetch single product
const fetchProduct = async (productId) => {
  try {
    // Replace with your actual API endpoint
    const response = await fetch(`http://localhost:5000/api/product/${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// API function to fetch related products
const fetchRelatedProducts = async (category, religion, currentProductId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/product/related?category=${category}&religion=${religion}&exclude=${currentProductId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch related products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
};

const addToCart = async (productId, quantity) => {
  try {
    const res = await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ productId, quantity }), // ✅ send quantity
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add to cart");
    alert("Added to cart!");
    fetchCart();
  } catch (err) {
    alert("Please login to add to cart.");
    console.error(err);
  }
};




export default function ProductDetails() {

    const { id } = useParams();
 
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
  const loadProductData = async () => {
    try {
      const productData = await fetchProduct(id);
      setProduct(productData.product); // <-- use .product

      // Fetch related products
      if (productData.product) {
        const related = await fetchRelatedProducts(
          productData.product.category,
          productData.product.religion,
          productData.product._id
        );
        setRelatedProducts(related.slice ? related.slice(0, 4) : []);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  loadProductData();
}, [id]);

  if (loading) {
    return (
      <div className="bg-[#FAF5EF] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C1A1B] mx-auto mb-4"></div>
          <p className="text-[#3b3b3b]">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#FAF5EF] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#5C1A1B] mb-4">Product Not Found</h2>
          <p className="text-[#3b3b3b] mb-4">The product you're looking for doesn't exist.</p>
          <button className="bg-[#5C1A1B] text-white px-6 py-3 rounded-lg hover:bg-opacity-90">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const discountedPrice = product.price - (product.price * product.discount / 100);
  const hasDiscount = product.discount > 0;
  const savings = product.price - discountedPrice;

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log(`Adding ${quantity} of ${product.title} to cart`);
  };

  const handleBuyNow = () => {
    // Implement buy now functionality
    console.log(`Buying ${quantity} of ${product.title}`);
  };

  const renderStars = (rating = 4) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        fill={i < rating ? "#F4A300" : "none"} 
        stroke="#F4A300" 
      />
    ));
  };

  return (
    <div className="bg-[#FAF5EF] min-h-screen text-[#3b3b3b] font-['Cormorant_Garamond']">
      {/* Breadcrumb */}
      <div className="px-4 md:px-12 py-4 text-sm">
        <span className="text-gray-600">Home / {product.category} / </span>
        <span className="text-[#5C1A1B] font-medium">{product.title}</span>
      </div>

      <div className="px-4 md:px-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-xl overflow-hidden">
              <img
                src={product.media && product.media.length > 0 ? product.media[currentImageIndex]?.url : '/api/placeholder/600/600'}
                alt={product.title}
                className="w-full h-96 lg:h-[500px] object-cover"
                onError={(e) => {
                  e.target.src = '/api/placeholder/600/600';
                }}
              />
              {hasDiscount && (
                <span className="absolute top-4 right-4 bg-[#F4A300] text-white px-3 py-1 rounded-full font-semibold">
                  -{product.discount}% OFF
                </span>
              )}
              
              {/* Navigation arrows for multiple images */}
              {product.media && product.media.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : product.media.length - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev < product.media.length - 1 ? prev + 1 : 0)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.media && product.media.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.media.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-[#5C1A1B]' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={media.url}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm bg-[#F5F1EB] text-[#5C1A1B] px-3 py-1 rounded-full">
                  {product.religion}
                </span>
                <span className="text-sm bg-[#F5F1EB] text-[#5C1A1B] px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-[#5C1A1B] mb-2">{product.title}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{renderStars(4)}</div>
                <span className="text-sm text-gray-600">(4.0) • 24 reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#D4AF37]">₹{Math.round(discountedPrice)}</span>
                {hasDiscount && (
                  <span className="text-xl text-gray-400 line-through">₹{product.price}</span>
                )}
              </div>
              {hasDiscount && (
                <p className="text-green-600 font-medium">You save ₹{Math.round(savings)} ({product.discount}% off)</p>
              )}
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 5 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <span className={`font-medium ${product.stock > 5 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                {product.stock > 5 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-600">Max {product.stock} available</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
    e.stopPropagation(); // Prevent navigation
    addToCart(product._id, quantity);
  }}
                  disabled={product.stock === 0}
                  className="flex-1 bg-[#5C1A1B] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border-2 ${isWishlisted ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-200 text-gray-600'} hover:bg-opacity-80`}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
                <button className="p-3 rounded-lg border-2 border-gray-200 text-gray-600 hover:bg-gray-50">
                  <Share2 size={20} />
                </button>
              </div>
              
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="w-full bg-[#F4A300] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="mx-auto mb-2 text-[#5C1A1B]" size={24} />
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-gray-600">On orders above ₹500</p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto mb-2 text-[#5C1A1B]" size={24} />
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-gray-600">100% secure checkout</p>
              </div>
              <div className="text-center">
                <RotateCcw className="mx-auto mb-2 text-[#5C1A1B]" size={24} />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-600">7-day return policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-6">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 px-1 border-b-2 transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-[#5C1A1B] text-[#5C1A1B] font-semibold'
                      : 'border-transparent text-gray-600 hover:text-[#5C1A1B]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-xl font-semibold text-[#5C1A1B] mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                {product.tags && product.tags.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span key={index} className="bg-[#F5F1EB] text-[#5C1A1B] px-3 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-xl font-semibold text-[#5C1A1B] mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Category:</span>
                      <span>{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Religion:</span>
                      <span>{product.religion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Stock:</span>
                      <span>{product.stock} units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Shipping:</span>
                      <span>₹{product.shipping || 'Free'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold text-[#5C1A1B] mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {/* Sample review - replace with actual reviews from your database */}
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex">{renderStars(5)}</div>
                      <span className="font-medium">Excellent Product!</span>
                    </div>
                    <p className="text-gray-700 mb-2">
                      Great quality and fast delivery. Highly recommended for all religious ceremonies.
                    </p>
                    <p className="text-sm text-gray-500">- Customer Name • 2 days ago</p>
                  </div>
                  
                  <div className="text-center py-8">
                    <button className="bg-[#5C1A1B] text-white px-6 py-3 rounded-lg hover:bg-opacity-90">
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#5C1A1B] mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedDiscountedPrice = relatedProduct.price - (relatedProduct.price * relatedProduct.discount / 100);
                return (
                  <div key={relatedProduct._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative">
                      <img
                        src={relatedProduct.media && relatedProduct.media.length > 0 ? relatedProduct.media[0].url : '/api/placeholder/300/240'}
                        alt={relatedProduct.title}
                        className="w-full h-48 object-cover"
                      />
                      {relatedProduct.discount > 0 && (
                        <span className="absolute top-2 right-2 bg-[#F4A300] text-white text-xs px-2 py-1 rounded">
                          -{relatedProduct.discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 text-[#5C1A1B] line-clamp-1">
                        {relatedProduct.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        {relatedProduct.discount > 0 && (
                          <span className="text-sm line-through text-gray-400">₹{relatedProduct.price}</span>
                        )}
                        <span className="text-[#D4AF37] font-bold">₹{Math.round(relatedDiscountedPrice)}</span>
                      </div>
                      <button className="w-full bg-[#5C1A1B] text-white py-2 rounded-lg text-sm hover:bg-opacity-90">
                        View Product
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}