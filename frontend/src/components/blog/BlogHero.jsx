import { Search, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Blog1 from "../../assets/blog/Blog1.png"

export default function BlogHero() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    'All', 'Rituals', 'Festivals', 'Product Guides', 'Religious Teachings', 'Community Stories'
  ];

  const featuredArticle = {
    title: 'Understanding the Significance of Puja Rituals',
    description: 'Discover the deep spiritual meaning behind traditional puja ceremonies and learn how these sacred rituals connect us with the divine.',
    author: 'Rahul Sharma',
    date: 'March 16, 2025',
    image: Blog1,
    category: 'Rituals'
  };

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="py-8 md:py-12 text-center px-4 bg-orange-50">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Spiritual Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore articles about rituals, spirituality, festivals, and divine practices across religions
        </p>
      </div>
      
      {/* Search & Categories */}
      <div className="max-w-7xl mx-auto my-6 px-4 pb-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          {/* Categories */}
          <div className="overflow-x-auto flex-1">
            <div className="flex space-x-2 md:space-x-4 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
                    activeCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Featured Article */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm my-8">
          <div className="flex flex-col md:flex-row">
            {/* Article Image */}
            <div className="md:w-1/2 h-56 md:h-auto">
              <img 
                src={featuredArticle.image} 
                alt="Featured article about puja rituals" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Article Content */}
            <div className="md:w-1/2 p-6  flex flex-col justify-between bg-orange-50">
              <div>
                <div className="mb-3">
                  <span className="text-orange-500 text-sm font-medium">Featured Article</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{featuredArticle.title}</h2>
                <p className="text-gray-600 text-sm md:text-base mb-4">{featuredArticle.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden mr-2">
                    <img 
                      src="/api/placeholder/32/32" 
                      alt={featuredArticle.author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{featuredArticle.author}</p>
                    <p className="text-gray-500 text-xs">{featuredArticle.date}</p>
                  </div>
                </div>
                
                <button className="flex items-center text-orange-500 font-medium text-sm">
                  Read More <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}