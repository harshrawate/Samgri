import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Blog2 from "../../assets/blog/blog2.png";
import Blog3 from "../../assets/blog/blog3.png";
import Blog4 from "../../assets/blog/blog4.png";
import Blog5 from "../../assets/blog/blog5.png";
import Blog6 from "../../assets/blog/blog6.png";
import Blog7 from "../../assets/blog/blog7.png";
import Blog8 from "../../assets/blog/blog8.png";


export default function BlogArticles() {
  const [email, setEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const featuredArticles = [
    {
      id: 1,
      title: "Celebrating Diwali: A Festival of Lights",
      excerpt: "Learn about the significance of Diwali and how to celebrate this auspicious festival with traditional customs...",
      image: Blog2,
      author: "Priya Patel",
      date: "March 10, 2025",
      authorImage: "/api/placeholder/40/40"
    },
    {
      id: 2,
      title: "Ramadan: A Month of Spiritual Growth",
      excerpt: "Explore the spiritual significance of Ramadan and discover tips for maintaining mindfulness during the holy month...",
      image: Blog3,
      author: "Ahmed Khan",
      date: "March 8, 2025",
      authorImage: "/api/placeholder/40/40"
    },
    {
      id: 3,
      title: "Meditation Techniques for Inner Peace",
      excerpt: "Discover ancient meditation practices that can help you achieve mental clarity and spiritual connection...",
      image: Blog4,
      author: "Sarah Smith",
      date: "March 5, 2025",
      authorImage: "/api/placeholder/40/40"
    },
    {
      id: 4,
      title: "Essential Items for Home Puja",
      excerpt: "A comprehensive guide to setting up your home temple with all the necessary items for daily worship...",
      image: Blog5,
      author: "Amit Kumar",
      date: "March 1, 2025",
      authorImage: "/api/placeholder/40/40"
    }
  ];
  
  const categories = [
    { name: "Rituals", count: 24 },
    { name: "Festivals", count: 18 },
    { name: "Product Guides", count: 12 },
    { name: "Religious Teachings", count: 31 },
    { name: "Community Stories", count: 16 }
  ];
  
  const recentPosts = [
    {
      id: 1,
      title: "Ganesh Chaturthi Celebrations",
      date: "March 12, 2025",
      image: Blog6
    },
    {
      id: 2,
      title: "Understanding Sacred Threads",
      date: "March 8, 2025",
      image: Blog7
    },
    {
      id: 3,
      title: "Temple Architecture Guide",
      date: "March 5, 2025",
      image: Blog8
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Articles */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featuredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">{article.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                        <img 
                          src={article.authorImage} 
                          alt={article.author}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-800">By {article.author}</p>
                        <p className="text-xs text-gray-500">{article.date}</p>
                      </div>
                    </div>
                    
                    <button className="flex items-center text-orange-500 text-sm font-medium">
                      Read More <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-1">
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-md bg-orange-500 text-white font-medium"
              >
                1
              </button>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-600 hover:bg-gray-100"
              >
                2
              </button>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-600 hover:bg-gray-100"
              >
                3
              </button>
              <button 
                className="px-3 h-8 flex items-center justify-center rounded-md bg-white text-gray-600 hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Categories */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{category.name}</span>
                  <span className="text-gray-500">{category.count}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Posts */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center">
                  <div className="w-16 h-16 rounded-md overflow-hidden mr-3 flex-shrink-0">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">{post.title}</h4>
                    <p className="text-gray-500 text-xs">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to receive puja reminders, guides & festival updates
            </p>
            <input 
              type="email"
              placeholder="Your email address"
              className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}