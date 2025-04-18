import { Calendar } from 'lucide-react';

export default function UpcomingFestivals() {
  const festivals = [
    {
      id: 1,
      date: "NOV 12, 2025",
      name: "Diwali",
      description: "Festival of Lights"
    },
    {
      id: 2,
      date: "DEC 25, 2025",
      name: "Christmas",
      description: "Birth of Jesus Christ"
    },
    {
      id: 3,
      date: "JAN 15, 2025",
      name: "Makar Sankranti",
      description: "Harvest Festival"
    },
    {
      id: 4,
      date: "MAR 25, 2025",
      name: "Holi",
      description: "Festival of Colors"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-[#FAF5EF] rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Upcoming Festivals</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {festivals.map((festival) => (
          <div 
            key={festival.id} 
            className="bg-white rounded-lg p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center mb-3">
              <Calendar size={16} className="text-orange-500 mr-2" />
              <span className="text-orange-500 font-medium text-sm">{festival.date}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{festival.name}</h3>
            <p className="text-gray-500 text-sm">{festival.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}