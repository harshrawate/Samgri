import { useState } from 'react';

export default function Discover() {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const cardData = [
    {
      id: 1,
      title: "Explore a Diverse Range of Religious Offerings for Every Faith",
      description: "Navigate through various religions to find the perfect products and services.",
      buttonText: "Explore",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "Connect with Rituals and Traditions That Resonate with Your Faith",
      description: "Engage with rituals that honor your spiritual journey and cultural heritage.",
      buttonText: "Discover",
      image: "/api/placeholder/400/300"
    },
    {
      id: 3,
      title: "Find Services and Products That Cater to Your Spiritual Needs",
      description: "Access a wide selection of items designed for your religious practices.",
      buttonText: "Shop",
      image: "/api/placeholder/400/300"
    }
  ];

  return (
    <div className="bg-white py-12 px-4 md:px-8">
      {/* Main Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
          Discover Spiritual Products Tailored to<br />
          Your Beliefs and Practices
        </h1>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map(card => (
          <div 
            key={card.id}
            className="flex flex-col"
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Image Container */}
            <div className="bg-[#ECECEC] aspect-w-4 aspect-h-3 mb-4">
              <img 
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="flex flex-col flex-grow">
              <h2 className="font-bold text-lg text-center mb-2">{card.title}</h2>
              <p className="text-sm text-center text-[#333333] mb-4 flex-grow">{card.description}</p>
              <div className="flex justify-center mt-auto">
                <button 
                  className={`inline-flex items-center text-sm font-medium 
                    ${hoveredCard === card.id ? 'text-[#E94E1B]' : 'text-black'} 
                    transition-colors duration-200`}
                >
                  {card.buttonText}
                  <svg 
                    className={`ml-1 w-4 h-4 transform transition-transform duration-200 
                    ${hoveredCard === card.id ? 'translate-x-1' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional Additional Content Section */}
      <div className="max-w-6xl mx-auto mt-16 py-8 px-6 bg-[#FDF3EC] rounded-lg">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Explore Our Diverse Product Categories</h2>
          <p className="text-[#333333] mb-6 max-w-2xl mx-auto">
            Discover our complete selection of spiritual items from various faith traditions, 
            all carefully curated to support your spiritual journey.
          </p>
          <button className="bg-[#E94E1B] text-white px-6 py-2 rounded hover:bg-opacity-90 transition-all">
            Browse Categories
          </button>
        </div>
      </div>
    </div>
  );
}