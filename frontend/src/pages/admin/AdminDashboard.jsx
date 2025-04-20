import React, { useState } from 'react';
import { 
  Bell, Menu, X, ChevronDown, Home, Users, User, Book, ShoppingCart, 
  Package, FileText, Calendar, Star, MessageCircle, Settings, 
  PlusCircle, TrendingUp, DollarSign, Activity, LogOut, Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Dummy data for charts
  const bookingData = [
    { month: 'Jan', bookings: 65 },
    { month: 'Feb', bookings: 59 },
    { month: 'Mar', bookings: 80 },
    { month: 'Apr', bookings: 81 },
    { month: 'May', bookings: 56 },
    { month: 'Jun', bookings: 55 },
    { month: 'Jul', bookings: 40 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 10800 },
    { month: 'Mar', revenue: 14300 },
    { month: 'Apr', revenue: 15600 },
    { month: 'May', revenue: 13200 },
    { month: 'Jun', revenue: 10900 },
    { month: 'Jul', revenue: 12100 },
  ];

  const recentBookings = [
    { id: 'B1024', user: 'Rahul Sharma', ritual: 'Griha Pravesh', date: '18 Apr 2025', status: 'Confirmed' },
    { id: 'B1023', user: 'Priya Singh', ritual: 'Satyanarayan Puja', date: '17 Apr 2025', status: 'Pending' },
    { id: 'B1022', user: 'Amit Kumar', ritual: 'Ganesh Puja', date: '15 Apr 2025', status: 'Confirmed' },
    { id: 'B1021', user: 'Anjali Verma', ritual: 'Mata Ki Chowki', date: '14 Apr 2025', status: 'Completed' },
    { id: 'B1020', user: 'Vikram Patel', ritual: 'Marriage Ceremony', date: '12 Apr 2025', status: 'Confirmed' },
  ];

  const newUsers = [
    { name: 'Neha Gupta', email: 'neha.g@example.com', date: '19 Apr 2025', status: 'Active' },
    { name: 'Rohit Mishra', email: 'rohit.m@example.com', date: '18 Apr 2025', status: 'Active' },
    { name: 'Sunita Patel', email: 'sunita.p@example.com', date: '17 Apr 2025', status: 'Pending' },
    { name: 'Vijay Singh', email: 'vijay.s@example.com', date: '16 Apr 2025', status: 'Active' },
  ];

  const notifications = [
    { message: 'Priest Mahesh Kumar updated availability', time: '2 hours ago' },
    { message: 'New booking from Anjali Sharma for Satyanarayan Puja', time: '3 hours ago' },
    { message: 'Refund issued for Order #A52F1', time: '5 hours ago' },
    { message: 'New priest application received from Rajesh Shastri', time: '1 day ago' },
    { message: 'Product "Puja Thali Set" is low in stock', time: '1 day ago' },
  ];

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-indigo-500 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <div className="text-xl font-bold">Samgri Admin</div>}
          <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-indigo-700">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-5">
          <SidebarItem icon={<Home size={20} />} text="Dashboard" to="/admin/dashboard" active={true} expanded={sidebarOpen} />
          <SidebarItem icon={<Users size={20} />} text="Users" to="/admin/users" expanded={sidebarOpen} />
          <SidebarItem icon={<User size={20} />} text="Priests" to="/admin/priest-booking" expanded={sidebarOpen} />
          <SidebarItem icon={<Book size={20} />} text="Rituals" to="/admin/rituals" expanded={sidebarOpen} />
          <SidebarItem icon={<ShoppingCart size={20} />} text="Orders" to="/admin/order-management" expanded={sidebarOpen} />
          <SidebarItem icon={<Calendar size={20} />} text="Bookings" to="/admin/booking-management" expanded={sidebarOpen} />
          <SidebarItem icon={<Package size={20} />} text="Products" to="/admin/products" expanded={sidebarOpen} />
          <SidebarItem icon={<FileText size={20} />} text="Blog" to="/admin/dashboard" expanded={sidebarOpen} />
          <SidebarItem icon={<Calendar size={20} />} text="Festivals" to="/admin/dashboard" expanded={sidebarOpen} />
          <SidebarItem icon={<Star size={20} />} text="Reviews" to="/admin/dashboard" expanded={sidebarOpen} />
          <SidebarItem icon={<MessageCircle size={20} />} text="Support" to="/admin/dashboard" expanded={sidebarOpen} />
          <SidebarItem icon={<Settings size={20} />} text="Settings" to="/admin/dashboard" expanded={sidebarOpen} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold ml-2">Samgri Admin Portal</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell size={20} className="text-gray-600 cursor-pointer hover:text-indigo-600" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </div>
              <div className="flex items-center cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  AS
                </div>
                <div className="ml-2 mr-1">Admin</div>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Scroll Area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {/* Page Title & Breadcrumb */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <div className="text-sm text-gray-500 mt-1">
              Home / Admin / Dashboard
            </div>
          </div>

          {/* Metrics Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard title="Total Users" value="2,845" icon={<Users className="text-blue-500" />} change="+12%" />
            <MetricCard title="Total Priests" value="142" icon={<User className="text-green-500" />} change="+5%" />
            <MetricCard title="Total Bookings" value="3,621" icon={<Calendar className="text-purple-500" />} change="+23%" />
            <MetricCard title="Total Revenue" value="₹4.5M" icon={<DollarSign className="text-yellow-500" />} change="+18%" />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Monthly Booking Trend</h2>
              <div className="h-64 flex items-end justify-between">
                {bookingData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-xs mb-1">{data.bookings}</div>
                    <div 
                      className="bg-indigo-500 rounded-t w-10" 
                      style={{ height: `${data.bookings * 0.8}px` }}
                    ></div>
                    <div className="text-xs mt-2">{data.month}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Revenue Over Time</h2>
              <div className="h-64 flex items-end relative">
                {/* Area chart background */}
                <div className="absolute bottom-6 left-0 right-0 bg-gradient-to-t from-blue-100 to-transparent h-40"></div>
                
                {/* Line graph */}
                <svg className="w-full h-48" viewBox="0 0 700 200">
                  <polyline
                    points={revenueData.map((data, index) => `${index * 100 + 50},${200 - data.revenue / 100}`).join(' ')}
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="3"
                  />
                  {revenueData.map((data, index) => (
                    <circle 
                      key={index}
                      cx={index * 100 + 50} 
                      cy={200 - data.revenue / 100} 
                      r="4" 
                      fill="#4F46E5" 
                    />
                  ))}
                </svg>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6">
                  {revenueData.map((data, index) => (
                    <span key={index} className="text-xs text-gray-500">{data.month}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickAction icon={<Book size={20} />} text="Add New Ritual" to="/admin/rituals" color="bg-blue-500" />
              <QuickAction icon={<User size={20} />} text="Add New Priest" to="/admin/priest-booking"  color="bg-green-500" />
              <QuickAction icon={<Calendar size={20} />} text="View Booking Requests" to="/admin/booking-management"  color="bg-purple-500" />
              <QuickAction icon={<Package size={20} />} text="Manage Products" to="/admin/products"  color="bg-yellow-500" />
            </div>
          </div>

          {/* Two-column layout for tables and notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Ritual Bookings */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Recent Ritual Bookings</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ritual</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentBookings.map((booking, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.user}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.ritual}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                              booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-blue-100 text-blue-800'}`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* New User Signups */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">New User Signups</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {newUsers.map((user, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                          >
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Notifications / Activity Log */}
          <div className="mt-6 bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Notifications / Activity Log</h2>
            </div>
            <div className="p-2">
              {notifications.map((notification, index) => (
                <div key={index} className="p-3 border-b last:border-b-0 flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Activity size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      <Clock size={12} className="mr-1" /> {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white p-4 shadow-inner border-t">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>Samgri Admin Dashboard &copy; 2025</div>
            <div>Version 2.4.1</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, text, active = false, expanded,to }) => {
  return (
    <a href={to} className={`
      flex items-center p-3 mx-2 rounded-md mb-1 cursor-pointer
      ${active ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-700'}
    `}>
      <div className="mr-3">{icon}</div>
      {expanded && <div className="text-sm">{text}</div>}
    </a>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, icon, change }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-md bg-gray-50">
          {icon}
        </div>
      </div>
      <div className="mt-4 text-sm">
        <span className="text-green-500 font-medium">{change}</span>
        <span className="text-gray-500 ml-1">since last month</span>
      </div>
    </div>
  );
};

// Quick Action Component
const QuickAction = ({ icon, text, color,to }) => {
  return (
    <a href={to} className={`${color} text-white p-4 rounded-lg flex items-center shadow cursor-pointer hover:opacity-90 transition-opacity`}>
      <PlusCircle size={20} className="mr-2" />
      <span className="text-sm font-medium">{text}</span>
    </a>
  );
};

export default AdminDashboard;