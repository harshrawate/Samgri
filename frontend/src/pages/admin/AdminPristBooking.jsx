import { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash, Calendar, Star, Filter } from 'lucide-react';

// Sample priest data
const priestsData = [
  {
    id: 'P001',
    photo: '/api/placeholder/64/64',
    name: 'Father Michael Johnson',
    religion: 'Christianity',
    languages: ['English', 'Latin', 'Spanish'],
    city: 'Los Angeles',
    availability: 'Available',
    experience: 15,
    rating: 4.8
  },
  {
    id: 'P002',
    photo: '/api/placeholder/64/64',
    name: 'Rabbi David Cohen',
    religion: 'Judaism',
    languages: ['English', 'Hebrew', 'Yiddish'],
    city: 'New York',
    availability: 'Busy',
    experience: 20,
    rating: 4.9
  },
  {
    id: 'P003',
    photo: '/api/placeholder/64/64',
    name: 'Imam Ali Hassan',
    religion: 'Islam',
    languages: ['English', 'Arabic', 'Urdu'],
    city: 'Chicago',
    availability: 'Available',
    experience: 12,
    rating: 4.7
  },
  {
    id: 'P004',
    photo: '/api/placeholder/64/64',
    name: 'Pandit Raj Sharma',
    religion: 'Hinduism',
    languages: ['English', 'Hindi', 'Sanskrit'],
    city: 'Houston',
    availability: 'Inactive',
    experience: 25,
    rating: 4.6
  },
  {
    id: 'P005',
    photo: '/api/placeholder/64/64',
    name: 'Lama Tenzin Dorje',
    religion: 'Buddhism',
    languages: ['English', 'Tibetan', 'Nepali'],
    city: 'Seattle',
    availability: 'Available',
    experience: 18,
    rating: 4.9
  }
];

// Status badge component
const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

// Rating component
const Rating = ({ value }) => {
  return (
    <div className="flex items-center">
      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
      <span className="ml-1 text-sm font-medium">{value}</span>
    </div>
  );
};

// Modal component
const PriestModal = ({ priest, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-bold">Priest Details</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="col-span-1">
              <div className="flex flex-col items-center">
                <img 
                  src={priest.photo} 
                  alt={priest.name} 
                  className="w-32 h-32 rounded-full object-cover"
                />
                <h3 className="mt-4 text-xl font-semibold">{priest.name}</h3>
                <p className="text-gray-600">{priest.religion}</p>
                <div className="mt-2">
                  <StatusBadge status={priest.availability} />
                </div>
                <div className="mt-4">
                  <Rating value={priest.rating} />
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-2">General Information</h4>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">ID</dt>
                      <dd>{priest.id}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">City/Region</dt>
                      <dd>{priest.city}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Experience</dt>
                      <dd>{priest.experience} years</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Languages</dt>
                      <dd>{priest.languages.join(', ')}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-2">Bio/Description</h4>
                  <p className="text-gray-700">
                    Experienced religious leader with deep knowledge of traditions and ceremonies. 
                    Dedicated to providing spiritual guidance and performing meaningful rituals.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-2">Service Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {priest.city}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Metropolitan Area
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Virtual Services
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-2">Rituals Offered</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Wedding Ceremonies</li>
                    <li>Funeral Services</li>
                    <li>Blessing Ceremonies</li>
                    <li>Prayer Services</li>
                    <li>Holiday Celebrations</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-2">Pricing</h4>
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Ritual</th>
                        <th className="text-right py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Wedding Ceremony</td>
                        <td className="text-right">$350 - $500</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Funeral Service</td>
                        <td className="text-right">$300 - $450</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">House Blessing</td>
                        <td className="text-right">$150 - $250</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Prayer Service</td>
                        <td className="text-right">$100 - $200</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-4 flex justify-end gap-4">
            <button 
              onClick={onClose} 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
export default function AdminPristBooking() {
  const [selectedPriest, setSelectedPriest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const openPriestModal = (priest) => {
    setSelectedPriest(priest);
    setIsModalOpen(true);
  };

  const closePriestModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="p-6">
        {/* Page title & breadcrumb */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Manage Priests</h1>
          <nav className="text-sm text-gray-500 mt-1">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <a href="#" className="text-blue-600 hover:text-blue-800">Home</a>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <a href="#" className="text-blue-600 hover:text-blue-800">Admin</a>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-700">Priests</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Toolbar / Header actions */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search priests by name, email, location..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Religions</option>
                  <option>Christianity</option>
                  <option>Islam</option>
                  <option>Hinduism</option>
                  <option>Judaism</option>
                  <option>Buddhism</option>
                  <option>Sikhism</option>
                  <option>Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Cities</option>
                  <option>New York</option>
                  <option>Los Angeles</option>
                  <option>Chicago</option>
                  <option>Houston</option>
                  <option>Seattle</option>
                  <option>Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Status</option>
                  <option>Available</option>
                  <option>Busy</option>
                  <option>Inactive</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700">
                <Plus className="h-5 w-5 mr-1" />
                Add New Priest
              </button>
            </div>
          </div>
        </div>

        {/* Priests Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priest
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Religion
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Languages
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    City/Region
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exp.
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {priestsData.map((priest) => (
                  <tr key={priest.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {priest.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={priest.photo} alt={priest.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{priest.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {priest.religion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {priest.languages.slice(0, 2).join(', ')}
                      {priest.languages.length > 2 && '...'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {priest.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={priest.availability} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {priest.experience} yrs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Rating value={priest.rating} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => openPriestModal(priest)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="text-green-600 hover:text-green-900" title="Edit">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900" title="Manage Schedule">
                          <Calendar className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900" title="Delete">
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                  <span className="font-medium">12</span> priests
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600"
                  >
                    1
                  </button>
                  <button
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    2
                  </button>
                  <button
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    3
                  </button>
                  <button
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow mt-8 py-4 px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-500">
            © 2025 Religious Service Admin Panel. All rights reserved.
          </div>
          <div className="text-sm text-gray-400 mt-2 sm:mt-0">
            Version 1.0.3
          </div>
        </div>
      </footer>

      {/* Priest Details Modal */}
      {selectedPriest && (
        <PriestModal 
          priest={selectedPriest} 
          isOpen={isModalOpen} 
          onClose={closePriestModal} 
        />
      )}
    </div>
  );
}