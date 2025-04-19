import React, { useState } from "react";

const priests = [
  {
    id: 1,
    name: "Pandit Ramesh Sharma",
    rating: 4.0,
    reviews: 120,
    languages: ["Hindi", "Sanskrit", "English"],
    experience: "15 years",
    availableFrom: "Apr 25, 2025",
    price: "₹5,100",
    image: "/images/pandit-ramesh.jpg",
  },
  {
    id: 2,
    name: "Acharya Suresh Joshi",
    rating: 5.0,
    reviews: 89,
    languages: ["Hindi", "Sanskrit"],
    experience: "10 years",
    availableFrom: "Apr 22, 2025",
    price: "₹4,500",
    image: "/images/acharya-suresh.jpg",
  },
];

const PriestSelectionPage = () => {
  const [selectedPriest, setSelectedPriest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [ritualDate, setRitualDate] = useState("");
  const [ritualTime, setRitualTime] = useState("");

  const handleBookNow = (priest) => {
    setSelectedPriest(priest);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setRitualDate("");
    setRitualTime("");
  };

  const handleProceedToPay = () => {
    if (!ritualDate || !ritualTime) {
      alert("Please select date and time");
      return;
    }
    // Proceed to payment logic or route
    console.log("Proceeding to pay for:", selectedPriest.name);
    console.log("Date:", ritualDate, "Time:", ritualTime);
    handleCloseModal();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">Home / Rituals / Griha Pravesh / Select Priest</p>
          <h1 className="text-2xl md:text-3xl font-bold mt-2">Select a Priest for Griha Pravesh</h1>
          <p className="text-gray-600 mt-1">
            Browse available priests for Griha Pravesh from the Hindu tradition.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <aside className="bg-white p-4 rounded shadow w-full md:w-1/4">
            <h2 className="font-semibold mb-4">Filters</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Location</label>
              <select className="w-full border rounded px-2 py-1">
                <option>Select City</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Languages</label>
              <div className="space-y-1">
                <label className="block"><input type="checkbox" /> Hindi</label>
                <label className="block"><input type="checkbox" /> Sanskrit</label>
                <label className="block"><input type="checkbox" /> English</label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Availability Date</label>
              <input type="text" placeholder="mm/dd/yyyy" className="w-full border rounded px-2 py-1" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Price Range</label>
              <div className="flex gap-2">
                <input type="text" placeholder="Min" className="w-1/2 border rounded px-2 py-1" />
                <input type="text" placeholder="Max" className="w-1/2 border rounded px-2 py-1" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Experience</label>
              <select className="w-full border rounded px-2 py-1">
                <option>Any Experience</option>
              </select>
            </div>
          </aside>

          {/* Priest Cards */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <p>Showing 12 priests</p>
              <select className="border px-2 py-1 rounded">
                <option>Sort by: Recommended</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {priests.map((priest) => (
                <div key={priest.id} className="bg-white p-4 rounded shadow">
                  <div className="flex items-center gap-4">
                    <img
                      src={priest.image}
                      alt={priest.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{priest.name}</h3>
                      <p className="text-sm text-gray-500">
                        ⭐ {priest.rating} ({priest.reviews} reviews)
                      </p>
                      <p className="text-sm text-gray-600">🗣 {priest.languages.join(", ")}</p>
                      <p className="text-sm text-gray-600">👤 {priest.experience} experience</p>
                      <p className="text-sm text-gray-600">📅 Available from {priest.availableFrom}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold text-orange-600">{priest.price}</span>
                    <button
                      onClick={() => handleBookNow(priest)}
                      className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-2">
              <button className="px-3 py-1 border rounded">Previous</button>
              <button className="px-3 py-1 bg-orange-500 text-white rounded">1</button>
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">3</button>
              <button className="px-3 py-1 border rounded">Next</button>
            </div>
          </div>
        </div>

        {/* Why Book Section */}
        <div className="mt-16 text-center">
          <h2 className="text-xl font-semibold mb-6">Why Book Through Samgri?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="text-orange-500 text-3xl mb-2">✔️</div>
              <h3 className="font-medium">Verified Priests</h3>
              <p className="text-sm text-gray-600">All our priests are thoroughly verified and experienced</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-orange-500 text-3xl mb-2">📅</div>
              <h3 className="font-medium">Flexible Scheduling</h3>
              <p className="text-sm text-gray-600">Choose from multiple time slots that work for you</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-orange-500 text-3xl mb-2">🔄</div>
              <h3 className="font-medium">Easy Refunds</h3>
              <p className="text-sm text-gray-600">100% refund if cancelled 24 hours before the ritual</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-2">Select Date and Time</h2>
            <p className="text-sm text-gray-600 mb-4">
              Booking for: <strong>{selectedPriest?.name}</strong>
            </p>

            <label className="block mb-2 text-sm font-medium">Date</label>
            <input
              type="date"
              value={ritualDate}
              onChange={(e) => setRitualDate(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <label className="block mb-2 text-sm font-medium">Time</label>
            <input
              type="time"
              value={ritualTime}
              onChange={(e) => setRitualTime(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <button
              onClick={handleProceedToPay}
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriestSelectionPage;
