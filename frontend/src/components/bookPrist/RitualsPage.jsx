import React from "react";
import BookPristHero from "../../assets/bookPrist/bookPristHero.png";
import SatyanarayanKatha from "../../assets/bookPrist/SatyanaranyanKatha.png";
import GrihPravesh from "../../assets/bookPrist/GrihaPravesh.png";
import GaneshPuja from "../../assets/bookPrist/GaneshPuja.png";

const rituals = [
  {
    id: 1,
    title: "Satyanarayan Katha",
    languages: ["Hindu", "Sanskrit"],
    description:
      "A sacred ritual dedicated to Lord Vishnu, performed for prosperity and well-being.",
    duration: "2 Hours",
    price: "₹1,500",
    image: SatyanarayanKatha,
  },
  {
    id: 2,
    title: "Griha Pravesh",
    languages: ["Hindu", "Hindi"],
    description:
      "Traditional house warming ceremony to bless your new home with positive energy.",
    duration: "3 Hours",
    price: "₹2,500",
    image: GrihPravesh,
  },
  {
    id: 3,
    title: "Ganesh Puja",
    languages: ["Hindu", "Marathi"],
    description:
      "Special worship of Lord Ganesha for removing obstacles and new beginnings.",
    duration: "1 Hour",
    price: "₹1,000",
    image: GaneshPuja,
  },
];

const RitualsPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src={BookPristHero}
          alt="Ritual Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Book a Ritual</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search rituals..."
            className="border px-4 py-2 rounded w-full md:w-1/3"
          />
          <select className="border px-4 py-2 rounded w-full md:w-1/6">
            <option>All Religions</option>
          </select>
          <select className="border px-4 py-2 rounded w-full md:w-1/6">
            <option>All Purposes</option>
          </select>
          <select className="border px-4 py-2 rounded w-full md:w-1/6">
            <option>Duration</option>
          </select>
          <select className="border px-4 py-2 rounded w-full md:w-1/6">
            <option>Sort By</option>
          </select>
        </div>
      </div>

      {/* Ritual Cards */}
      <div className="max-w-6xl mx-auto px-4 pb-16 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {rituals.map((ritual) => (
          <div key={ritual.id} className=" rounded-lg overflow-hidden shadow-2xl">
            <img
              src={ritual.image}
              alt={ritual.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex gap-2 mb-2">
                {ritual.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-semibold mb-1">{ritual.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{ritual.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
                <span>{ritual.duration}</span>
                <span className="font-semibold text-orange-600">{ritual.price}</span>
              </div>
              <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Call To Action */}
      <div className="bg-orange-50 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Need help choosing the right ritual for your occasion?
          </h2>
          <p className="text-gray-700 mb-6">
            Our experts are here to guide you through the selection process and ensure you choose the most appropriate ritual for your needs.
          </p>
          <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
            📞 Talk to Our Experts
          </button>
        </div>
      </div>
    </div>
  );
};

export default RitualsPage;
