import { useState,useEffect } from 'react';
import { 
  Home, Package, Calendar, Heart, Book, Settings, 
  Lock, LogOut, Eye, PlusCircle, MapPin, ShoppingBag
} from 'lucide-react';

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include", // send cookies
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  // Logout handler
  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    window.location.reload(); // or redirect to login
  };
  
  const menuItems = [
    { name: 'Dashboard',to:"/account", icon: <Home size={18} /> },
    { name: 'My Orders',to:"/order-history", icon: <Package size={18} /> },
    { name: 'Priest Bookings',to:"/priest-booking-history", icon: <Calendar size={18} /> },
    { name: 'Wishlist',to:"/account", icon: <Heart size={18} /> },
    { name: 'Address Book',to:"/address-book", icon: <Book size={18} /> },
    { name: 'Profile Settings',to:"/profile-settings", icon: <Settings size={18} /> },
    { name: 'Change Password',to:"/forgot-password", icon: <Lock size={18} /> },
  ];

  const dashboardStats = [
    { title: 'Total Orders', value: '12', icon: <ShoppingBag className="text-orange-500" size={20} />, bgColor: 'bg-orange-50' },
    { title: 'Active Bookings', value: '3', icon: <Calendar className="text-blue-500" size={20} />, bgColor: 'bg-blue-50' },
    { title: 'Wishlist Items', value: '8', icon: <Heart className="text-pink-500" size={20} />, bgColor: 'bg-pink-50' },
  ];

  const recentOrders = [
    { id: '#ORD-2025-001', date: 'March 15, 2025', status: 'Delivered', statusColor: 'bg-green-100 text-green-700' },
    { id: '#ORD-2025-002', date: 'March 12, 2025', status: 'Processing', statusColor: 'bg-blue-100 text-blue-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src="/api/placeholder/48/48" 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="text-center sm:text-left">
              <h1 className="text-xl font-bold text-gray-800">My Account</h1>
              <p className="text-gray-600">Welcome back, {user?.name || "Guest"}!</p>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm sm:ml-auto">Manage your profile, bookings, and preferences</p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto p-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-2">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  onClick={() => setActiveMenu(item.name)}
                  href={item.to}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                    activeMenu === item.name
                      ? 'bg-orange-50 text-orange-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              ))}
              
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-left text-red-500 hover:bg-red-50 transition-colors">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {dashboardStats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`${stat.bgColor} p-5 rounded-lg flex justify-between items-center`}
                >
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
              
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex flex-wrap justify-between items-center py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-800">{order.id}</p>
                      <p className="text-gray-500 text-sm">{order.date}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                      {order.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a href='/order-history' className="flex items-center justify-center gap-2 bg-white py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <Eye size={18} />
                <span>View All Orders</span>
              </a>
              <button className="flex items-center justify-center gap-2 bg-white py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <PlusCircle size={18} />
                <span>Book Again</span>
              </button>
              <a href='/address-book' className="flex items-center justify-center gap-2 bg-white py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <MapPin size={18} />
                <span>Update Address</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}