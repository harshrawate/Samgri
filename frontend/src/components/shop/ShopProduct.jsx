import { Star } from 'lucide-react';

export default function ShopProduct() {
  return (
    <div className="bg-[#FAF5EF] px-4 md:px-12 py-10 text-[#3b3b3b] font-['Cormorant_Garamond'] ">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 bg-[#F5F1EB] p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-3 text-[#5C1A1B]">Filters</h2>

          <div className="mb-4">
            <h3 className="font-medium mb-1">Religion</h3>
            {['Hindu', 'Muslim', 'Christian', 'Sikh'].map((religion) => (
              <div key={religion} className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <label>{religion}</label>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-medium mb-1">Price Range</h3>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                defaultValue={500}
                className="border px-2 py-1 rounded w-full"
              />
              <input
                type="number"
                placeholder="Max"
                defaultValue={3000}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-1">Rating</h3>
            <div className="flex gap-1 text-[#F4A300]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#F4A300" stroke="#F4A300" />
              ))}
            </div>
          </div>
        </aside>

        {/* Products Section */}
        <main className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4">Puja Kits</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Product Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src="/images/puja-kit.jpg"
                  alt="Puja Kit"
                  className="w-full h-56 object-cover"
                />
                <span className="absolute top-2 right-2 bg-[#F4A300] text-white text-xs px-2 py-1 rounded">
                  -20%
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-[#5C1A1B]">Complete Puja Kit</h3>
                <p className="text-sm line-through text-gray-400">₹2,199</p>
                <p className="text-[#D4AF37] font-bold text-lg">₹1,199</p>

                <div className="flex items-center gap-1 text-[#F4A300] mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#F4A300" />
                  ))}
                  <span className="text-sm text-gray-600">(42)</span>
                </div>

                <button className="mt-4 w-full bg-[#5C1A1B] text-white py-2 rounded-lg">
                  Add to Cart
                </button>
              </div>
            </div>
            {/* Repeat for other cards */}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2 text-[#5C1A1B]">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                className="border px-3 py-1 rounded-full hover:bg-[#F4A300] hover:text-white transition"
              >
                {num}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
