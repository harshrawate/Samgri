import { useState } from 'react';
import { MapPin, Home, Briefcase, Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export default function UserAddress() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: 'Rahul Sharma',
      mobile: '+91 98765 43210',
      addressLine1: '42, Sunshine Apartments',
      addressLine2: 'Sector 15',
      city: 'Gurugram',
      state: 'Haryana',
      zipCode: '122001',
      type: 'Home',
      isDefault: true
    },
    {
      id: 2,
      fullName: 'Rahul Sharma',
      mobile: '+91 87654 32109',
      addressLine1: 'B-121, Tech Park',
      addressLine2: 'Cyber City',
      city: 'Gurugram',
      state: 'Haryana',
      zipCode: '122002',
      type: 'Work',
      isDefault: false
    }
  ]);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    mobile: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    type: 'Home',
    isDefault: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddAddress = () => {
    setShowAddressForm(true);
    setEditingAddress(null);
    setNewAddress({
      fullName: '',
      mobile: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      type: 'Home',
      isDefault: false
    });
  };

  const handleEditAddress = (address) => {
    setShowAddressForm(true);
    setEditingAddress(address.id);
    setNewAddress({...address});
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(address => address.id !== id));
    }
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
  };

  const handleSaveAddress = () => {
    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(address => {
        if (address.id === editingAddress) {
          return {
            ...newAddress,
            id: editingAddress
          };
        }
        
        // If the current address is being set as default, make other addresses non-default
        if (newAddress.isDefault && address.id !== editingAddress) {
          return {
            ...address,
            isDefault: false
          };
        }
        
        return address;
      }));
    } else {
      // Add new address
      const newId = Math.max(...addresses.map(address => address.id), 0) + 1;
      
      // If this is the first address or it's being set as default
      if (newAddress.isDefault || addresses.length === 0) {
        setAddresses([
          ...addresses.map(address => ({
            ...address,
            isDefault: false
          })),
          {
            ...newAddress,
            id: newId,
            isDefault: true
          }
        ]);
      } else {
        setAddresses([
          ...addresses,
          {
            ...newAddress,
            id: newId
          }
        ]);
      }
    }
    
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const getAddressTypeIcon = (type) => {
    switch(type) {
      case 'Home':
        return <Home size={16} className="mr-1" />;
      case 'Work':
        return <Briefcase size={16} className="mr-1" />;
      default:
        return <MapPin size={16} className="mr-1" />;
    }
  };

  const isFormValid = () => {
    return (
      newAddress.fullName.trim() !== '' &&
      newAddress.mobile.trim() !== '' &&
      newAddress.addressLine1.trim() !== '' &&
      newAddress.city.trim() !== '' &&
      newAddress.state.trim() !== '' &&
      newAddress.zipCode.trim() !== ''
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <MapPin className="mr-2" size={24} />
            Saved Addresses
          </h1>
          <p className="text-gray-600 mt-1">Manage your delivery and billing addresses</p>
        </div>

        {/* Address List */}
        {addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`bg-white rounded-lg shadow-md p-4 relative ${
                  address.isDefault ? 'border-2 border-orange-500' : ''
                }`}
              >
                {address.isDefault && (
                  <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                    <div className="bg-orange-500 text-white rounded-full p-1">
                      <Check size={12} />
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{address.fullName}</h3>
                  <div className="flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                    {getAddressTypeIcon(address.type)}
                    {address.type}
                  </div>
                </div>
                
                <div className="text-gray-600 text-sm mb-3">
                  <p>{address.addressLine1}</p>
                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                  <p>{address.city}, {address.state} - {address.zipCode}</p>
                  <p className="mt-1">{address.mobile}</p>
                </div>
                
                {address.isDefault && (
                  <div className="text-xs text-orange-600 font-medium mb-3">
                    Default Address
                  </div>
                )}
                
                <div className="flex space-x-3 mt-4">
                  <button 
                    className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
                    onClick={() => handleEditAddress(address)}
                  >
                    <Edit2 size={14} className="mr-1" />
                    Edit
                  </button>
                  <button 
                    className="text-sm text-red-500 hover:text-red-700 flex items-center"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    <Trash2 size={14} className="mr-1" />
                    Delete
                  </button>
                  {!address.isDefault && (
                    <button 
                      className="text-sm text-orange-600 hover:text-orange-800 flex items-center"
                      onClick={() => handleSetDefaultAddress(address.id)}
                    >
                      <Check size={14} className="mr-1" />
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <MapPin size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">You haven't added any addresses yet</h3>
              <p className="text-gray-500 mb-6 text-center">Add your addresses to make checkout faster and easier</p>
              <button 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                onClick={handleAddAddress}
              >
                <Plus size={16} className="mr-1" />
                Add Your First Address
              </button>
            </div>
          </div>
        )}

        {/* Add New Address Button */}
        {addresses.length > 0 && (
          <div className="flex justify-center mb-6">
            <button 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              onClick={handleAddAddress}
            >
              <Plus size={16} className="mr-1" />
              Add New Address
            </button>
          </div>
        )}
        
        {/* Address Form Modal */}
        {showAddressForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h2>
                <button 
                  onClick={() => setShowAddressForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={newAddress.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number*
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={newAddress.mobile}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  {/* Address Line 1 */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1*
                    </label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={newAddress.addressLine1}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  {/* Address Line 2 */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={newAddress.addressLine2}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* City */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  {/* State */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State*
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={newAddress.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zip Code*
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={newAddress.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  {/* Address Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Type*
                    </label>
                    <select
                      name="type"
                      value={newAddress.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Set as Default */}
                  <div className="col-span-2 mt-2">
                    <div className="flex items-center">
                      <input
                        id="default-address"
                        name="isDefault"
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor="default-address" className="ml-2 block text-sm text-gray-900">
                        Set as default address
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    onClick={() => setShowAddressForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                      !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleSaveAddress}
                    disabled={!isFormValid()}
                  >
                    Save Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}