import { useState, useEffect } from 'react';
import { X, ChevronRight, ShoppingBag, Plus, Minus, Tag, Truck, Shield, ArrowRight } from 'lucide-react';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        credentials: "include",
      });
      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (res.ok) {
        setCart(cart.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        ));
      } else {
        console.error("Failed to update quantity");
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
      } else {
        const errorData = await res.json();
        console.error("Failed to delete item:", errorData.message);
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const applyCoupon = () => {
    if (couponCode.trim()) {
      setCouponApplied(true);
      setCouponCode('');
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.18;
  const total = subtotal - discount + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Enhanced Breadcrumb */}
        <div className="flex items-center text-sm mb-6 md:mb-8">
          <a href="/" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1">
            <ShoppingBag size={16} />
            Home
          </a>
          <ChevronRight className="mx-2 text-gray-400" size={16} />
          <span className="font-semibold text-gray-800 bg-blue-100 px-3 py-1 rounded-full">Cart</span>
        </div>

        <div className="lg:flex lg:gap-8 xl:gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <ShoppingBag className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Shopping Cart</h1>
                <p className="text-gray-600">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add some items to get started!</p>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4 mb-6 md:mb-8">
                {cart.map((item, index) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                        {/* Product Image */}
                        <div className="relative">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full sm:w-24 md:w-32 h-24 md:h-32 object-cover rounded-xl"
                          />
                          <div className="absolute -top-2 -right-2 sm:hidden">
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800">{item.name}</h3>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="hidden sm:block p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                            >
                              <X size={20} />
                            </button>
                          </div>
                          <p className="text-gray-600 mb-4 text-sm md:text-base">{item.description}</p>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600 mr-3">Quantity:</span>
                              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                                <button
                                  className="p-2 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{item.quantity}</span>
                                <button
                                  className="p-2 hover:bg-gray-100 transition-colors duration-200"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-800">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500">
                                ₹{item.price.toLocaleString()} each
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Enhanced Coupon Section */}
            {cart.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Tag className="text-green-600" size={20} />
                  <h3 className="font-semibold text-gray-800">Have a coupon code?</h3>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="flex-grow px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button 
                    onClick={applyCoupon}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Tag size={16} />
                    Apply Coupon
                  </button>
                </div>
                {couponApplied && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm font-medium">✓ Coupon applied! You saved 10%</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Enhanced Order Summary */}
          {cart.length > 0 && (
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Discount (10%)</span>
                      <span className="font-semibold">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax (18% GST)</span>
                    <span className="font-semibold">₹{tax.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-green-600" />
                      <span className="text-gray-600">Shipping</span>
                    </div>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  
                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-gray-800">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-2 mb-6 p-3 bg-blue-50 rounded-lg">
                  <Shield className="text-blue-600" size={16} />
                  <span className="text-sm text-blue-800">Secure checkout with SSL encryption</span>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl py-4 font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 mb-4">
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>

                <button className="w-full border-2 border-gray-300 text-gray-700 rounded-xl py-3 font-medium hover:bg-gray-50 transition-colors duration-200">
                  Continue Shopping
                </button>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <Truck className="text-green-600" size={16} />
                      </div>
                      <span className="text-xs text-gray-600">Free Shipping</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <Shield className="text-blue-600" size={16} />
                      </div>
                      <span className="text-xs text-gray-600">Secure Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}