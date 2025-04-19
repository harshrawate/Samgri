import React, { useState } from "react";

const PristAddressConfirmationPage = () => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    instructions: "",
    saveForFuture: false,
  });

  const savedAddresses = [
    {
      name: "John Doe",
      address: "123 Temple Street Apartment 4B New Delhi, 110001 India",
    },
    {
      name: "John Doe",
      address: "456 Krishna Lane Mumbai, 400091 India",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-2 text-center">
        Confirm Address for Ritual Booking
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Please provide the address where the ritual will be conducted.
      </p>

      {/* Saved Addresses */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold text-lg mb-4">Use Saved Address</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedAddresses.map((addr, idx) => (
            <div
              key={idx}
              className={`border rounded p-4 relative ${
                selectedAddressIndex === idx ? "border-orange-500" : "border-gray-300"
              }`}
            >
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="savedAddress"
                  checked={selectedAddressIndex === idx}
                  onChange={() => setSelectedAddressIndex(idx)}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium">{addr.name}</p>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                </div>
              </label>
              <div className="mt-2 flex gap-4 text-sm text-blue-600">
                <button>Edit</button>
                <button className="text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          disabled={selectedAddressIndex === null}
        >
          Use Selected Address
        </button>
      </div>

      {/* OR Divider */}
      <div className="text-center text-gray-500 font-medium mb-6">OR</div>

      {/* New Address Form */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-lg mb-4">Enter New Address</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="border p-2 rounded"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="border p-2 rounded"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address1"
            placeholder="Address Line 1"
            className="border p-2 rounded col-span-1 md:col-span-2"
            value={formData.address1}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address2"
            placeholder="Address Line 2 (Optional)"
            className="border p-2 rounded col-span-1 md:col-span-2"
            value={formData.address2}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="border p-2 rounded"
            value={formData.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            className="border p-2 rounded"
            value={formData.state}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            className="border p-2 rounded"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="border p-2 rounded"
          >
            <option value="India">India</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            name="instructions"
            placeholder="Special Instructions (Optional)"
            rows="3"
            className="border p-2 rounded col-span-1 md:col-span-2"
            value={formData.instructions}
            onChange={handleInputChange}
          ></textarea>
          <label className="col-span-1 md:col-span-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="saveForFuture"
              checked={formData.saveForFuture}
              onChange={handleInputChange}
            />
            Save this address for future use
          </label>
        </form>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
          Go Back to Priest Selection
        </button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default PristAddressConfirmationPage;
