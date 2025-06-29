import React, { useState, useEffect } from "react";
import {
  Check,
  Plus,
  MapPin,
  CreditCard,
  Truck,
  ShoppingBag,
  ChevronRight,
  X,
  Edit2,
} from "lucide-react";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showAlert, setShowAlert] = useState(null);
  const [processingOrder, setProcessingOrder] = useState(false);

  // New address form state
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    type: "Home",
  });

  const steps = [
    { name: "Cart", status: "completed" },
    { name: "Address", status: "completed" },
    { name: "Checkout", status: "active" },
    { name: "Payment", status: "inactive" },
  ];

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Fetch cart data
  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        credentials: "include",
      });
      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setShowAlert({ type: "error", message: "Failed to load cart items" });
    } finally {
      setLoading(false);
    }
  };

  // Fetch saved addresses
  const fetchAddresses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/addresses", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        console.log("API Response:", data); // Debug log

        // Handle the response based on your API structure
        let addresses = [];
        if (Array.isArray(data)) {
          // If data is directly an array
          addresses = data;
        } else if (data.addresses && Array.isArray(data.addresses)) {
          // If data has addresses property
          addresses = data.addresses;
        }

        // Transform the API data to match component expectations
        const transformedAddresses = addresses.map((addr, index) => ({
          id: index,
          _id: addr._id,
          name: addr.fullName,
          phone: addr.mobile,
          address: `${addr.addressLine1}${
            addr.addressLine2 ? ", " + addr.addressLine2 : ""
          }`,
          city: addr.city,
          state: addr.state,
          pincode: addr.zipCode,
          type: addr.type,
          isDefault: addr.isDefault,
        }));

        setSavedAddresses(transformedAddresses);

        // Set default address as selected
        const defaultIndex = transformedAddresses.findIndex(
          (addr) => addr.isDefault
        );
        if (defaultIndex !== -1) {
          setSelectedAddress(defaultIndex);
        }

        console.log("Transformed addresses:", transformedAddresses); // Debug log
      } else {
        throw new Error("Failed to fetch addresses");
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setShowAlert({ type: "error", message: "Failed to load addresses" });

      // Set default addresses if API fails
      setSavedAddresses([
        {
          id: 0,
          name: "Default Address",
          address: "123 Main Street, Apartment 4B",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
          phone: "+91 98765 43210",
          type: "Home",
        },
      ]);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  // Calculate pricing
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const discount = appliedCoupon
    ? Math.round(subtotal * (appliedCoupon.discount / 100))
    : 0;
  const grandTotal = subtotal + shipping + tax - discount;

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/coupons/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code: couponCode, subtotal }),
      });

      const data = await res.json();

      if (res.ok) {
        setAppliedCoupon(data.coupon);
        setShowAlert({
          type: "success",
          message: `Coupon applied! ${data.coupon.discount}% discount added.`,
        });
        setCouponCode("");
      } else {
        setShowAlert({
          type: "error",
          message: data.message || "Invalid coupon code",
        });
      }
    } catch (err) {
      // Fallback for demo
      if (couponCode === "SAVE10") {
        setAppliedCoupon({ code: "SAVE10", discount: 10 });
        setShowAlert({
          type: "success",
          message: "Coupon applied! 10% discount added.",
        });
        setCouponCode("");
      } else {
        setShowAlert({
          type: "error",
          message: "Invalid coupon code. Try SAVE10 for 10% off!",
        });
      }
    }

    setTimeout(() => setShowAlert(null), 4000);
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newAddress),
      });

      if (res.ok) {
        const data = await res.json();

        // Transform the new address to match component format
        const transformedAddress = {
          id: savedAddresses.length,
          _id: data._id || data.address?._id,
          name: newAddress.fullName,
          phone: newAddress.mobile,
          address: `${newAddress.addressLine1}${
            newAddress.addressLine2 ? ", " + newAddress.addressLine2 : ""
          }`,
          city: newAddress.city,
          state: newAddress.state,
          pincode: newAddress.zipCode,
          type: newAddress.type,
        };

        setSavedAddresses([...savedAddresses, transformedAddress]);
        setSelectedAddress(transformedAddress.id);
        setShowAddressForm(false);
        setNewAddress({
          fullName: "",
          mobile: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          zipCode: "",
          type: "Home",
        });
        setShowAlert({
          type: "success",
          message: "Address added successfully!",
        });
      } else {
        const data = await res.json();
        setShowAlert({
          type: "error",
          message: data.message || "Failed to add address",
        });
      }
    } catch (err) {
      console.error("Error adding address:", err);
      // Fallback for demo
      const newAddr = {
        id: savedAddresses.length,
        name: newAddress.fullName,
        phone: newAddress.mobile,
        address: `${newAddress.addressLine1}${
          newAddress.addressLine2 ? ", " + newAddress.addressLine2 : ""
        }`,
        city: newAddress.city,
        state: newAddress.state,
        pincode: newAddress.zipCode,
        type: newAddress.type,
      };
      setSavedAddresses([...savedAddresses, newAddr]);
      setSelectedAddress(newAddr.id);
      setShowAddressForm(false);
      setNewAddress({
        fullName: "",
        mobile: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        type: "Home",
      });
      setShowAlert({ type: "success", message: "Address added successfully!" });
    }

    setTimeout(() => setShowAlert(null), 3000);
  };

  const handlePlaceOrder = async () => {
    if (!agreedToTerms) {
      setShowAlert({
        type: "error",
        message: "Please agree to the Terms & Conditions to proceed.",
      });
      setTimeout(() => setShowAlert(null), 4000);
      return;
    }

    if (cart.length === 0) {
      setShowAlert({ type: "error", message: "Your cart is empty!" });
      setTimeout(() => setShowAlert(null), 4000);
      return;
    }

    setProcessingOrder(true);

    const orderData = {
      items: cart,
      address: savedAddresses.find((addr) => addr.id === selectedAddress),
      paymentMethod,
      pricing: {
        subtotal,
        shipping,
        tax,
        discount,
        total: grandTotal,
      },
      coupon: appliedCoupon,
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        if (paymentMethod === "razorpay") {
          // Load Razorpay script
          const razorpayLoaded = await loadRazorpayScript();
          if (!razorpayLoaded) {
            setShowAlert({
              type: "error",
              message: "Failed to load Razorpay SDK. Please try again.",
            });
            setProcessingOrder(false);
            return;
          }

          // Initialize Razorpay
          setShowAlert({
            type: "info",
            message: "Redirecting to Razorpay payment gateway...",
          });

          // Simulate Razorpay integration
          setTimeout(() => {
            const options = {
              key: "rzp_test_G6hGTkE7akdJDd", // Replace with your Razorpay key
              amount: grandTotal * 100, // Amount in paise
              currency: "INR",
              name: "Your Store Name",
              description: "Order Payment",
              order_id: data.razorpayOrderId,
              handler: async function (response) {
                // Verify payment
                try {
                  const verifyRes = await fetch(
                    "http://localhost:5000/api/orders/verify-payment",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      credentials: "include",
                      body: JSON.stringify({
                        orderId: data.orderId,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                      }),
                    }
                  );

                  if (verifyRes.ok) {
                    setShowAlert({
                      type: "success",
                      message: "Order placed successfully! Payment completed.",
                    });

                    await fetch("http://localhost:5000/api/cart", {
                      method: "DELETE",
                      credentials: "include",
                    });
                    // Clear cart
                    setCart([]);
                    // Redirect to order confirmation page
                    setTimeout(() => {
                      window.location.href = `/order-confirmation/${data.orderId}`;
                    }, 2000);
                  } else {
                    setShowAlert({
                      type: "error",
                      message: "Payment verification failed!",
                    });
                  }
                } catch (err) {
                  setShowAlert({
                    type: "error",
                    message: "Payment verification error!",
                  });
                }
              },
              prefill: {
                name: savedAddresses[selectedAddress]?.name,
                phone: savedAddresses[selectedAddress]?.phone,
              },
              theme: {
                color: "#4F46E5",
              },
            };

            // For demo purposes, simulate successful payment

            const rzp = new window.Razorpay(options);
            rzp.open();
          }, 1000);
        } else {
          // Cash on Delivery
          setShowAlert({
            type: "success",
            message: "Order placed successfully! Cash on Delivery confirmed.",
          });
          setCart([]);
          setTimeout(() => {
            window.location.href = `/order-confirmation/${data.orderId}`;
          }, 2000);
        }
      } else {
        setShowAlert({
          type: "error",
          message: data.message || "Failed to place order",
        });
      }
    } catch (err) {
      console.error("Error placing order:", err);
      // Demo fallback
      if (paymentMethod === "razorpay") {
        setShowAlert({
          type: "success",
          message: "Order placed successfully! (Demo mode - Payment simulated)",
        });
      } else {
        await fetch("http://localhost:5000/api/cart", {
          method: "DELETE",
          credentials: "include",
        });
        setShowAlert({
          type: "success",
          message: "Order placed successfully! Cash on Delivery confirmed.",
        });
      }
      setCart([]);
      setTimeout(() => {
        window.location.href = `/order-confirmation/${data.orderId}`;
      }, 2000);
    } finally {
      setProcessingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6">Checkout</h1>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.name} className="flex items-center">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      step.status === "completed"
                        ? "bg-green-500 text-white"
                        : step.status === "active"
                        ? "bg-white text-indigo-600 shadow-lg"
                        : "bg-white/20 text-white/70"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <Check size={20} />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`font-medium ${
                      step.status === "active" ? "text-white" : "text-white/80"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="text-white/50 mx-2" size={20} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Alert Messages */}
        {showAlert && (
          <div
            className={`mb-6 p-4 rounded-lg font-medium transition-all duration-300 ${
              showAlert.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : showAlert.type === "info"
                ? "bg-blue-100 text-blue-800 border border-blue-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {showAlert.message}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-indigo-600" size={24} />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Delivery Address
                  </h2>
                </div>
              </div>

              {savedAddresses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No addresses found</p>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <Plus size={20} />
                    <span>Add Address</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedAddresses.map((address) => (
                    <label key={address.id} className="block cursor-pointer">
                      <div
                        className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                          selectedAddress === address.id
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddress === address.id}
                            onChange={() => setSelectedAddress(address.id)}
                            className="mt-1 w-4 h-4 text-indigo-600"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800">
                              {address.name} ({address.type})
                            </div>
                            <div className="text-gray-600 text-sm mt-1">
                              {address.address}
                            </div>
                            <div className="text-gray-600 text-sm">
                              {address.city}, {address.state} {address.pincode}
                            </div>
                            <div className="text-gray-600 text-sm">
                              {address.phone}
                            </div>
                            {address.isDefault && (
                              <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}

                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Plus size={20} />
                    <span className="font-medium">Add New Address</span>
                  </button>
                </div>
              )}
            </div>

            {/* Address Form Modal */}
            {showAddressForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      Add New Address
                    </h3>
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={newAddress.fullName}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            fullName: e.target.value,
                          })
                        }
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        required
                        value={newAddress.mobile}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            mobile: e.target.value,
                          })
                        }
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Address Line 1"
                      required
                      value={newAddress.addressLine1}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          addressLine1: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />

                    <input
                      type="text"
                      placeholder="Address Line 2 (Optional)"
                      value={newAddress.addressLine2}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          addressLine2: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={newAddress.city}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, city: e.target.value })
                        }
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        required
                        value={newAddress.state}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            state: e.target.value,
                          })
                        }
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Zip Code"
                        required
                        value={newAddress.zipCode}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            zipCode: e.target.value,
                          })
                        }
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <select
                        value={newAddress.type}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, type: e.target.value })
                        }
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Payment Method Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="text-indigo-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-4">
                <label className="block cursor-pointer">
                  <div
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      paymentMethod === "razorpay"
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value="razorpay"
                        checked={paymentMethod === "razorpay"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">
                          Razorpay
                        </div>
                        <div className="text-sm text-gray-600">
                          Pay securely with cards, UPI, wallets & more
                        </div>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="block cursor-pointer">
                  <div
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      paymentMethod === "cod"
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">
                          Cash on Delivery
                        </div>
                        <div className="text-sm text-gray-600">
                          Pay when your order arrives
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Your Order Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center space-x-3 mb-6">
                <ShoppingBag className="text-indigo-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Your Order</h2>
              </div>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 text-sm truncate">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </div>
                      <div className="text-sm text-gray-600">
                        ₹{item.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="font-semibold text-gray-800">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Info */}
              <div className="flex items-center space-x-2 mb-6 p-3 bg-green-50 rounded-lg">
                <Truck className="text-green-600" size={20} />
                <span className="text-green-700 font-medium">
                  {shipping === 0 ? "Free delivery" : "Delivery by tomorrow"}
                </span>
              </div>

              {/* Coupon Section */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                  >
                    Apply
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Try: SAVE10 for 10% discount
                </div>
                {appliedCoupon && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm font-medium">
                      ✓ {appliedCoupon.code} applied! {appliedCoupon.discount}%
                      off
                    </p>
                  </div>
                )}
              </div>

              {/* Pricing Summary */}
              <div className="space-y-3 py-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start space-x-3 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-indigo-600 rounded"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-indigo-600 hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-indigo-600 hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={
                  !agreedToTerms || processingOrder || cart.length === 0
                }
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                  agreedToTerms && !processingOrder && cart.length > 0
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {processingOrder
                  ? "Processing..."
                  : paymentMethod === "razorpay"
                  ? `Pay ₹${grandTotal.toLocaleString()} and Place Order`
                  : `Place Order - ₹${grandTotal.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
