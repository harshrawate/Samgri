import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Filter, X, Upload, Save, Calendar, MinusCircle } from 'lucide-react';

const religions = ['Hinduism', 'Jainism', 'Sikhism', 'Buddhism', 'Islam', 'Christianity'];
const availableRituals = ['Griha Pravesh', 'Satyanarayan Pooja', 'Rudrabhishek', 'Marriage', 'Havan', 'Janmashtami', 'Gurdwara Ceremony', 'Anand Karaj', 'Akhand Path'];
const languagesList = ['Hindi', 'Marathi', 'Sanskrit', 'English', 'Tamil', 'Punjabi', 'Bengali'];

const initialFormData = {
  profileImage: null,
  fullName: '',
  religion: '',
  rituals: [],
  languages: [],
  experience: '',
  bio: '',
  phone: '',
  email: '',
  addressLine: '',
  city: '',
  state: '',
  pincode: '',
  availability: 'Available',
  availableDates: [{ startDate: '', endDate: '' }],
  documents: [],
  socialMedia: ''
};

const PriestManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [priests, setPriests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [religionFilter, setReligionFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch priests from backend
  const fetchPriests = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:5000/api/priests/getpriest", { 
        credentials: "include" 
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const response = await res.json();
      console.log('API Response:', response); // Debug log
      
      // Handle the response structure from your API
      if (response.success && Array.isArray(response.data)) {
        setPriests(response.data);
      } else if (Array.isArray(response)) {
        setPriests(response);
      } else {
        console.warn('Unexpected API response structure:', response);
        setPriests([]);
      }
    } catch (err) {
      console.error('Error fetching priests:', err);
      setError(err.message);
      setPriests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriests();
  }, []);

  // Helper function to parse languages if they're stored as JSON string
  const parseLanguages = (languages) => {
    if (!languages || !Array.isArray(languages)) return [];
    
    return languages.map(lang => {
      try {
        // If it's a JSON string, parse it
        if (typeof lang === 'string' && lang.startsWith('[')) {
          const parsed = JSON.parse(lang);
          return Array.isArray(parsed) ? parsed[0] : lang;
        }
        return lang;
      } catch (e) {
        return lang;
      }
    });
  };

  // Helper function to parse rituals if they're stored as JSON string
  const parseRituals = (rituals) => {
    if (!rituals) return [];
    if (Array.isArray(rituals)) return rituals;
    
    try {
      if (typeof rituals === 'string') {
        const parsed = JSON.parse(rituals);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (e) {
      console.warn('Error parsing rituals:', e);
    }
    
    return [];
  };

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelectChange = (field, value) => {
    setFormData(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return {
        ...prev,
        [field]: newValues
      };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Date range handlers
  const handleDateChange = (e, index, type) => {
    const { value } = e.target;
    const newAvailableDates = [...formData.availableDates];
    newAvailableDates[index][type] = value;
    setFormData(prev => ({ ...prev, availableDates: newAvailableDates }));
  };

  const addDateRange = () => {
    setFormData(prev => ({
      ...prev,
      availableDates: [...prev.availableDates, { startDate: '', endDate: '' }]
    }));
  };

  const removeDateRange = (index) => {
    const newAvailableDates = formData.availableDates.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, availableDates: newAvailableDates }));
  };

  // Add priest submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append all text fields
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('religion', formData.religion);
    formDataToSend.append('experience', formData.experience);
    formDataToSend.append('bio', formData.bio);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('addressLine', formData.addressLine);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('state', formData.state);
    formDataToSend.append('pincode', formData.pincode);
    formDataToSend.append('availability', formData.availability);
    formDataToSend.append('socialMedia', formData.socialMedia);

    // Handle arrays - send as JSON strings
    formDataToSend.append('rituals', JSON.stringify(formData.rituals));
    formDataToSend.append('languages', JSON.stringify(formData.languages));

    // Handle available dates
    const availableDatesFormatted = formData.availableDates.map(d => ({
      from: d.startDate,
      to: d.endDate
    }));
    formDataToSend.append('availableDates', JSON.stringify(availableDatesFormatted));

    // Profile image
    if (formData.profileImage) {
      formDataToSend.append('profileImage', formData.profileImage);
    }

    // Documents
    if (formData.documents && formData.documents.length > 0) {
      Array.from(formData.documents).forEach(doc => {
        formDataToSend.append('documents', doc);
      });
    }

    try {
      const res = await fetch("http://localhost:5000/api/priests/add", {
        method: "POST",
        credentials: "include",
        body: formDataToSend
      });
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error('Non-JSON response:', text);
        alert('Server error. Check console for details.');
        return;
      }
      
      const data = await res.json();
      
      if (res.ok) {
        alert('Priest added successfully!');
        fetchPriests();
        setFormData(initialFormData);
        setImagePreview(null);
        setShowAddForm(false);
      } else {
        alert(data.message || "Failed to add priest");
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert("Network error: " + err.message);
    }
  };

  const handleDocumentsUpload = (e) => {
    setFormData(prev => ({
      ...prev,
      documents: e.target.files
    }));
  };

  // Filtering
  const filteredPriests = priests.filter(priest => {
    const priestRituals = parseRituals(priest.rituals);
    const matchesSearch =
      (priest.fullName || priest.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (priest.city || priest.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      priestRituals.some(ritual => ritual.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesReligion = religionFilter === '' || priest.religion === religionFilter;
    const matchesAvailability = availabilityFilter === '' || priest.availability === availabilityFilter || priest.status === availabilityFilter;
    return matchesSearch && matchesReligion && matchesAvailability;
  });

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'Available':
      case 'active': 
        return 'bg-green-100 text-green-800';
      case 'Busy': 
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
      case 'inactive': 
        return 'bg-red-100 text-red-800';
      default: 
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDisplayStatus = (priest) => {
    if (priest.availability) return priest.availability;
    if (priest.status === 'active') return 'Available';
    if (priest.status === 'inactive') return 'Inactive';
    return 'Unknown';
  };

  // --- Add Priest Form ---
  if (showAddForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Priest</h1>
              <nav className="text-sm text-gray-500">Dashboard &gt; Priest Management &gt; Add Priest</nav>
            </div>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <form className="bg-white rounded-lg shadow-sm border border-gray-200 p-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Image */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image *
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      id="profileImage"
                      name="photo"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="profileImage" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block">
                      Upload Image
                    </label>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG, WEBP (Max 2MB)</p>
                  </div>
                </div>
              </div>
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="e.g., Pandit Ram Sharma"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={3}
                />
              </div>
              {/* Religion */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Religion *
                </label>
                <select
                  value={formData.religion}
                  onChange={(e) => handleInputChange('religion', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Religion</option>
                  {religions.map(religion => (
                    <option key={religion} value={religion}>{religion}</option>
                  ))}
                </select>
              </div>
              {/* Rituals Offered */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rituals Offered *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableRituals.map(ritual => (
                    <label key={ritual} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.rituals.includes(ritual)}
                        onChange={() => handleMultiSelectChange('rituals', ritual)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{ritual}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Languages */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages Spoken
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {languagesList.map(language => (
                    <label key={language} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(language)}
                        onChange={() => handleMultiSelectChange('languages', language)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{language}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="e.g., 5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="priest@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {/* Address */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line *
                </label>
                <input
                  type="text"
                  value={formData.addressLine}
                  onChange={(e) => handleInputChange('addressLine', e.target.value)}
                  placeholder="123 Shivaji Nagar"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Mumbai"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Maharashtra"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              {/* Pincode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="400001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  pattern="[0-9]{6}"
                />
              </div>
              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability Status
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              {/* Multiple Available Dates Section */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Date Ranges
                </label>
                {formData.availableDates.map((range, index) => (
                  <div key={index} className="flex items-center gap-4 mb-4">
                    <div className="flex-1 relative">
                      <input
                        type="date"
                        value={range.startDate}
                        onChange={(e) => handleDateChange(e, index, 'startDate')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <span className="text-gray-500">to</span>
                    <div className="flex-1 relative">
                      <input
                        type="date"
                        value={range.endDate}
                        onChange={(e) => handleDateChange(e, index, 'endDate')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min={range.startDate}
                      />
                    </div>
                    {formData.availableDates.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDateRange(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Remove date range"
                      >
                        <MinusCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDateRange}
                  className="mt-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Another Date Range
                </button>
              </div>
              {/* Bio */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio / About Priest
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Write a brief background of the priest including spiritual experience, training, lineage, etc."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  minLength={30}
                />
              </div>
              {/* Social Media */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Social Media / Website Link
                </label>
                <input
                  type="url"
                  value={formData.socialMedia}
                  onChange={(e) => handleInputChange('socialMedia', e.target.value)}
                  placeholder="https://example.com or social media profile"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {/* Documents Upload */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Documents Upload (Optional)
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleDocumentsUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Upload ID proof, certification, or verification (PDF, JPG, PNG)</p>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Add Priest
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- Main Table ---
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Priest Management</h1>
          <nav className="text-sm text-gray-500">Dashboard &gt; Priest Management</nav>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, city, ritual, etc."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={religionFilter}
                onChange={(e) => setReligionFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Religions</option>
                {religions.map(religion => (
                  <option key={religion} value={religion}>{religion}</option>
                ))}
              </select>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="Available">Available</option>
                <option value="active">Active</option>
                <option value="Busy">Busy</option>
                <option value="Inactive">Inactive</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Priest
            </button>
          </div>
        </div>

        {/* Loading/Error States */}
        {loading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-gray-500">Loading priests...</div>
          </div>
        )}

        {error && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-red-500">Error: {error}</div>
            <button 
              onClick={fetchPriests}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Priests Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Priest</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Religion</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Languages</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Experience</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPriests.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                        {priests.length === 0 ? 'No priests found. Add your first priest!' : 'No priests match your search criteria.'}
                      </td>
                    </tr>
                  ) : (
                    filteredPriests.map((priest, idx) => (
                      <tr key={priest._id || idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={priest.profileImage?.url || priest.profileImage || priest.image || "/api/placeholder/50/50"}
                              alt={priest.fullName || priest.name}
                              className="w-12 h-12 rounded-full object-cover mr-4"
                              onError={(e) => {
                                e.target.src = "/api/placeholder/50/50";
                              }}
                            />
                            <div>
                              <div className="font-medium text-gray-900">{priest.fullName || priest.name}</div>
                              <div className="text-sm text-gray-500">ID: {priest._id?.slice(-6) || 'N/A'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{priest.religion}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {parseLanguages(priest.languages).slice(0, 2).map((language, index) => (
                              <span
                                key={index}
                                className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                              >
                                {language}
                              </span>
                            ))}
                            {parseLanguages(priest.languages).length > 2 && (
                              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                +{parseLanguages(priest.languages).length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {priest.experience ? `${priest.experience} years` : 'Not specified'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>
                            <div className="font-medium">{priest.city || priest.location}</div>
                            {priest.addressLine && (
                              <div className="text-xs text-gray-500">{priest.addressLine}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>
                            <div className="font-medium">{priest.phone || priest.contact}</div>
                            {priest.email && (
                              <div className="text-xs text-gray-500">{priest.email}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAvailabilityColor(priest.availability || priest.status)}`}>
                            {getDisplayStatus(priest)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="Edit Priest"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete Priest"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPriests.length}</span> of{' '}
                <span className="font-medium">{priests.length}</span> priests
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Export to CSV
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Print List
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriestManagement;