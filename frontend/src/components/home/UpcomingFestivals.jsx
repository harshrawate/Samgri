import { Gift, Sparkles, SunMoon } from "lucide-react";

const festivals = [
  {
    name: "Diwali",
    date: "November 12, 2025",
    image: "/images/diwali.jpg", // Update with your actual image path
    linkText: "View Puja Items",
    linkColor: "text-[#F4A300]", // Saffron
  },
  {
    name: "Eid al-Fitr",
    date: "April 2, 2025",
    image: "/images/eid.jpg",
    linkText: "View Celebration Items",
    linkColor: "text-[#7B2C3F]", // Deep Maroon
  },
  {
    name: "Christmas",
    date: "December 25, 2025",
    image: "/images/christmas.jpg",
    linkText: "View Festive Items",
    linkColor: "text-[#D4AF37]", // Gold
  },
];

const UpcomingFestivals = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-12 lg:px-20">
      <h2 className="text-3xl font-semibold text-[#5C1A1B] text-center mb-12">
        Upcoming Festivals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {festivals.map((festival, index) => (
          <div
            key={index}
            className="bg-[#F5F1EB] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <img
              src={festival.image}
              alt={festival.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-5">
              <h3 className="text-lg font-bold text-[#5C1A1B]">{festival.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{festival.date}</p>
              <a
                href="#"
                className={`text-sm font-medium ${festival.linkColor} hover:underline`}
              >
                {festival.linkText} →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingFestivals;
