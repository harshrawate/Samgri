import { useState } from 'react';
import { Calendar, User, MapPin, Phone, ChevronDown, ChevronUp, Filter, ChevronRight, ChevronLeft, HelpCircle, AlertCircle } from 'lucide-react';

export default function PriestBookingHistory() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  // Sample booking data
  const [bookings, setBookings] = useState([
    {
      id: 'BK-00123',
      ritualName: 'Griha Pravesh Puja',
      priest: {
        name: 'Pandit Ramesh Sharma',
        photo: '/api/placeholder/40/40',
        contact: '+91 98765 43210',
        experience: '15 years'
      },
      religion: 'Hindu',
      language: 'Hindi, Sanskrit',
      bookingDate: '2025-05-10T10:00:00',
      address: '123 Green Park, New Delhi, 110016',
      status: 'Confirmed',
      price: 5100,
      description: 'Griha Pravesh Puja is performed when entering a new home. It involves purification rituals and invoking deities for blessings and prosperity in the new dwelling.',
      items: ['Coconut', 'Flowers', 'Ghee', 'Rice', 'Incense sticks'],
      instructions: 'Please ensure the house is clean before the puja. Keep all the items ready. The ritual will take approximately 2-3 hours.'
    },
    {
      id: 'BK-00124',
      ritualName: 'Satyanarayan Puja',
      priest: {
        name: 'Acharya Vijay Mishra',
        photo: '/api/placeholder/40/40',
        contact: '+91 99876 54321',
        experience: '20 years'
      },
      religion: 'Hindu',
      language: 'Hindi, Sanskrit, English',
      bookingDate: '2025-04-28T17:30:00',
      address: '456 Vasant Kunj, New Delhi, 110070',
      status: 'Pending',
      price: 3500,
      description: 'Satyanarayan Puja is dedicated to Lord Vishnu. It is performed to seek blessings for well-being, success and happiness.',
      items: ['Panchamrit', 'Bananas', 'Betel leaves', 'Flowers', 'Sweets'],
      instructions: 'Fast until the completion of puja is recommended. Keep the puja area clean and quiet. The ceremony lasts about 2 hours.'
    },
    {
      id: 'BK-00125',
      ritualName: 'Navgraha Shanti Puja',
      priest: {
        name: 'Pandit Suresh Joshi',
        photo: '/api/placeholder/40/40',
        contact: '+91 88765 43210',
        experience: '12 years'
      },
      religion: 'Hindu',
      language: 'Hindi, Sanskrit',
      bookingDate: '2025-05-15T09:00:00',
      address: '789 Greater Kailash, New Delhi, 110048',
      status: 'Confirmed',
      price: 4500,
      description: 'Navgraha Shanti Puja is performed to appease the nine planets that influence human life according to Vedic astrology.',
      items: ['Nine types of grains', 'Colored cloths', 'Specific flowers', 'Ghee lamps'],
      instructions: 'Please have your birth chart ready. The puja requires specific arrangements for each planet. Duration is approximately 3-4 hours.'
    },
    {
      id: 'BK-00126',
      ritualName: 'Ganesh Puja',
      priest: {
        name: 'Acharya Dinesh Upadhyay',
        photo: '/api/placeholder/40/40',
        contact: '+91 77654 32109',
        experience: '18 years'
      },
      religion: 'Hindu',
      language: 'Hindi, Marathi, Sanskrit',
      bookingDate: '2025-04-15T11:00:00',
      address: '101 Dwarka Sector 12, New Delhi, 110075',
      status: 'Completed',
      price: 2500,
      description: 'Ganesh Puja invokes Lord Ganesha, the remover of obstacles. This puja is often performed before beginning new ventures.',
      items: ['Modak', 'Red flowers', 'Durva grass', 'Red cloth'],
      instructions: 'Keep the idol facing east. The puja lasts for about 1-2 hours.'
    },
    {
      id: 'BK-00127',
      ritualName: 'Akhand Path',
      priest: {
        name: 'Giani Harpreet Singh',
        photo: '/api/placeholder/40/40',
        contact: '+91 96543 21098',
        experience: '22 years'
      },
      religion: 'Sikh',
      language: 'Punjabi, Hindi',
      bookingDate: '2025-03-20T08:00:00',
      address: '202 Rajouri Garden, New Delhi, 110027',
      status: 'Cancelled',
      price: 11000,
      description: 'Akhand Path is a continuous, uninterrupted reading of the entire Guru Granth Sahib over approximately 48 hours.',
      items: ['Langar arrangements', 'Flowers', 'Fruits'],
      instructions: 'The reading will be continuous for 48 hours. Arrangements for the priests to rest and eat should be made.'
    }
  ]);

  // Filter bookings based on active filter
  const filteredBookings = bookings.filter(booking => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Upcoming') return ['Confirmed', 'Pending'].includes(booking.status) && new Date(booking.bookingDate) >= new Date();
    if (activeFilter === 'Completed') return booking.status === 'Completed';
    if (activeFilter === 'Cancelled') return booking.status === 'Cancelled';
    return true;
  });

  // Pagination logic
  const bookingsPerPage = 3;
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status color based on status
  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Toggle expanded booking
  const toggleExpand = (bookingId) => {
    if (expandedBookingId === bookingId) {
      setExpandedBookingId(null);
    } else {
      setExpandedBookingId(bookingId);
    }
  };

  // Open booking details modal
  const openDetailsModal = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  // Handle booking cancellation
  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
      ));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <Calendar className="mr-2" size={24} />
              Your Bookings
            </h1>
            <p className="text-gray-600 mt-1">Manage your priest appointments and ritual services</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <Filter size={16} className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-500 mr-2">Filter:</span>
              <div className="flex flex-wrap gap-2">
                {['All', 'Upcoming', 'Completed', 'Cancelled'].map((filter) => (
                  <button
                    key={filter}
                    className={`px-3 py-1 text-sm rounded-full ${
                      activeFilter === filter
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {currentBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Booking Card Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="mb-4 sm:mb-0">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium">{booking.ritualName}</h3>
                        <span 
                          className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Booking ID: {booking.id}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {booking.status !== 'Completed' && booking.status !== 'Cancelled' && (
                        <>
                          <button 
                            className="px-3 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-50"
                            onClick={() => {}}
                          >
                            Reschedule
                          </button>
                          <button 
                            className="px-3 py-1 text-xs border border-red-300 text-red-600 rounded-md hover:bg-red-50"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <button 
                        className="px-3 py-1 text-xs bg-purple-500 text-white rounded-md hover:bg-purple-600"
                        onClick={() => openDetailsModal(booking)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Booking Card Body */}
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Priest Info */}
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img 
                          src={booking.priest.photo} 
                          alt={booking.priest.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{booking.priest.name}</p>
                        <p className="text-xs text-gray-500">{booking.religion} • {booking.language}</p>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-start">
                      <Calendar size={16} className="text-gray-400 mt-0.5" />
                      <div className="ml-2">
                        <p className="text-sm font-medium">Date & Time</p>
                        <p className="text-xs text-gray-500">{formatDate(booking.bookingDate)}</p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start">
                      <MapPin size={16} className="text-gray-400 mt-0.5" />
                      <div className="ml-2">
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-xs text-gray-500">{booking.address}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-start">
                      <div className="ml-0">
                        <p className="text-sm font-medium">Price</p>
                        <p className="text-xs text-gray-500">₹{booking.price}</p>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Section */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button 
                      className="flex items-center text-sm text-purple-600 hover:text-purple-800"
                      onClick={() => toggleExpand(booking.id)}
                    >
                      {expandedBookingId === booking.id ? (
                        <>
                          <ChevronUp size={16} className="mr-1" />
                          Hide details
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} className="mr-1" />
                          Show details
                        </>
                      )}
                    </button>
                    
                    {expandedBookingId === booking.id && (
                      <div className="mt-4 text-sm text-gray-600">
                        <p className="mb-3">{booking.description}</p>
                        
                        <h4 className="font-medium text-gray-700 mb-1">Required Items:</h4>
                        <ul className="list-disc list-inside mb-3 pl-2">
                          {booking.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                        
                        <h4 className="font-medium text-gray-700 mb-1">Instructions:</h4>
                        <p>{booking.instructions}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-1">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-2 py-2 rounded-md ${
                      currentPage === 1 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === index + 1
                          ? 'bg-purple-500 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-2 py-2 rounded-md ${
                      currentPage === totalPages 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </nav>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <User size={48} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No priest bookings yet</h3>
              <p className="text-gray-500 mb-6">Schedule your first priest service for rituals and ceremonies</p>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Book a Priest
              </button>
            </div>
          </div>
        )}

        {/* Support Block */}
        <div className="bg-purple-50 rounded-lg p-4 mt-8 flex items-start">
          <HelpCircle className="text-purple-500 mt-0.5" size={20} />
          <div className="ml-3">
            <h3 className="font-medium text-purple-800">Need help with your bookings?</h3>
            <p className="text-sm text-purple-700 mt-1">
              Our support team is available 24/7 to assist you with any queries.
              <a href="#" className="text-purple-700 font-medium hover:text-purple-900 ml-1">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedBooking.ritualName} Details</h2>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                    <img 
                      src={selectedBooking.priest.photo} 
                      alt={selectedBooking.priest.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{selectedBooking.priest.name}</h3>
                    <p className="text-gray-500 text-sm">{selectedBooking.religion} • {selectedBooking.language}</p>
                    <p className="text-gray-500 text-sm">Experience: {selectedBooking.priest.experience}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Booking ID</p>
                      <p className="font-medium">{selectedBooking.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                        {selectedBooking.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium">{formatDate(selectedBooking.bookingDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium">₹{selectedBooking.price}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Ritual Description</h4>
                  <p className="text-gray-600">{selectedBooking.description}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Required Items</h4>
                  <ul className="list-disc list-inside text-gray-600 pl-2">
                    {selectedBooking.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Instructions & Preparation</h4>
                  <p className="text-gray-600">{selectedBooking.instructions}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Address</h4>
                  <p className="text-gray-600">{selectedBooking.address}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Priest Contact</h4>
                  <div className="flex items-center text-blue-600">
                    <Phone size={16} className="mr-2" />
                    {selectedBooking.priest.contact}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex flex-col-reverse sm:flex-row sm:justify-between">
                <div className="flex items-start mt-4 sm:mt-0">
                  <AlertCircle size={16} className="text-amber-500 mt-0.5 mr-1" />
                  <p className="text-xs text-gray-500">
                    Please contact us at least 24 hours in advance for any changes to your booking.
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  {selectedBooking.status !== 'Completed' && selectedBooking.status !== 'Cancelled' && (
                    <>
                      <button 
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                        onClick={() => {
                          setShowDetailsModal(false);
                        }}
                      >
                        Reschedule
                      </button>
                      <button 
                        className="px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm hover:bg-red-50"
                        onClick={() => {
                          handleCancelBooking(selectedBooking.id);
                          setShowDetailsModal(false);
                        }}
                      >
                        Cancel Booking
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}