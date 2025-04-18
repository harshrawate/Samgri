import { useState } from 'react';

export default function FestivalBooking() {
  const [selected, setSelected] = useState(null);
  
  const rituals = [
    {
      id: 1,
      name: "Lakshmi Puja",
      description: "Traditional puja to invoke the blessings of Goddess Lakshmi for wealth and prosperity.",
      icon: "🔥"
    },
    {
      id: 2,
      name: "Ganesh Puja",
      description: "Begin your Diwali celebrations with blessings from Lord Ganesha for an auspicious start.",
      icon: "ॐ"
    },
    {
      id: 3,
      name: "Kuber Puja",
      description: "Special puja dedicated to Lord Kuber for material abundance and wealth.",
      icon: "💰"
    }
  ];

  const handleBooking = (id) => {
    setSelected(id);
    // Additional booking logic could be implemented here
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Book a Ritual for this Festival</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rituals.map((ritual) => (
          <div 
            key={ritual.id} 
            className="bg-orange-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{ritual.name}</h2>
              <span className="text-2xl">{ritual.icon}</span>
            </div>
            
            <p className="text-gray-600 mb-6 h-24">{ritual.description}</p>
            
            <button 
              onClick={() => handleBooking(ritual.id)}
              className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors
                ${selected === ritual.id 
                  ? 'bg-orange-700 hover:bg-orange-800' 
                  : 'bg-orange-500 hover:bg-orange-600'}`}
            >
              {selected === ritual.id ? 'Booked' : 'Book Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}