import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

export default function Cart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Brass Temple Bell',
      description: 'Large Size, Antique Finish',
      price: 2499,
      quantity: 1,
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Brass Diya',
      description: 'Medium Size, Plain',
      price: 999,
      quantity: 2,
      image: '/api/placeholder/80/80'
    }
  ]);
  
  const [couponCode, setCouponCode] = useState('');

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity >= 1) {
      setCart(cart.map(item => 
        item.id === id ? {...item, quantity: newQuantity} : item
      ));
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-6 text-gray-500">
          <a href="#" className="hover:text-blue-600">Home</a>
          <ChevronRight className="mx-2" size={16} />
          <span className="font-medium text-gray-800">Cart</span>
        </div>
        
        <div className="lg:flex lg:gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <h1 className="text-2xl font-bold mb-6">My Cart ({cart.length} items)</h1>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              {cart.map(item => (
                <div key={item.id} className="p-4 border-b flex flex-col sm:flex-row items-center">
                  <div className="sm:flex-shrink-0 mb-4 sm:mb-0">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                  </div>
                  
                  <div className="flex-grow px-4">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded">
                        <button 
                          className="px-3 py-1 text-lg"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button 
                          className="px-3 py-1 text-lg"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <button onClick={() => removeItem(item.id)} className="text-red-500">
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="font-bold text-right sm:ml-4 mt-4 sm:mt-0">
                    ₹{item.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Coupon Code */}
            <div className="flex mb-6">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-r hover:bg-blue-700">
                Apply
              </button>
            </div>
            
            {/* Recommendations */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <img 
                    src="/api/placeholder/240/180" 
                    alt="Silver Pooja Thali" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium">Silver Pooja Thali</h3>
                    <p className="text-sm text-gray-500">Complete Set</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold">₹3,999</span>
                      <button className="text-blue-600 font-medium">+Add</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 mt-3 font-bold flex justify-between">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white rounded py-3 font-medium hover:bg-blue-700 transition duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}