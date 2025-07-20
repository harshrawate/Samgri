import React, { useState, useEffect } from "react";
import BookPristHero from "../../assets/bookPrist/bookPristHero.png";
import { Search, Filter, Star, Clock, MapPin, Phone, Sparkles, Heart } from "lucide-react";

const RitualsPage = () => {
  const [rituals, setRituals] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    religion: "All",
    category: "All",
    duration: "All",
    sort: "",
  });
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/rituals")
      .then(res => res.json())
      .then(data => {
        setRituals(data.rituals || []);
        setFiltered(data.rituals || []);
        setLoading(false);
      })
      .catch(() => {
        setRituals([]);
        setFiltered([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let data = [...rituals];

    if (search) {
      data = data.filter(ritual =>
        ritual.title?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filters.religion && filters.religion !== "All") {
      data = data.filter((ritual) => ritual.religion === filters.religion);
    }
    if (filters.category && filters.category !== "All") {
      data = data.filter((ritual) => ritual.category === filters.category);
    }
    if (
      filters.duration &&
      filters.duration !== "All" &&
      filters.duration !== ""
    ) {
      data = data.filter((ritual) => {
        if (!ritual.duration) return false;
        const num =
          typeof ritual.duration === "number"
            ? ritual.duration
            : parseInt(ritual.duration);
        return !isNaN(num) && num <= parseInt(filters.duration);
      });
    }
    if (filters.sort) {
      if (filters.sort === "price-asc") {
        data = data.sort(
          (a, b) => parseInt(a.price) - parseInt(b.price)
        );
      }
      if (filters.sort === "price-desc") {
        data = data.sort(
          (a, b) => parseInt(b.price) - parseInt(a.price)
        );
      }
    }
    setFiltered(data);
  }, [search, filters, rituals]);

  const religionOptions = ["All", ...Array.from(new Set(rituals.map((r) => r.religion).filter(Boolean)))];
  const categoryOptions = ["All", ...Array.from(new Set(rituals.map(r => r.category).filter(Boolean)))];
  const allDurations = Array.from(
    new Set(
      rituals
        .map(r =>
          r.duration
            ? (typeof r.duration === "number"
                ? r.duration
                : parseInt(r.duration))
            : null
        )
        .filter(n => n && !isNaN(n))
    )
  ).sort((a, b) => a - b);
  const durationOptions = ["All", ...allDurations];

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-red-50 min-h-screen">
      {/* Enhanced Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={BookPristHero}
          alt="Ritual Hero"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <div className="flex justify-center mb-6">
              <Sparkles className="text-orange-300 animate-pulse" size={48} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Book a Sacred Ritual
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 font-light">
              Connect with divine traditions and spiritual experiences
            </p>
            <div className="flex justify-center space-x-8 text-orange-200">
              <div className="text-center">
                <div className="text-2xl font-bold">{rituals.length}+</div>
                <div className="text-sm">Sacred Rituals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm">Religions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 animate-bounce">
          <Heart className="text-orange-300 opacity-60" size={24} />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse">
          <Star className="text-yellow-300 opacity-60" size={32} />
        </div>
      </div>

      {/* Enhanced Filters Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="text-orange-500" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Find Your Perfect Ritual</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Enhanced Search */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search rituals..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 font-medium"
              />
            </div>

            {/* Enhanced Dropdowns */}
            {[
              { value: filters.religion, options: religionOptions, key: 'religion', placeholder: 'All Religions' },
              { value: filters.category, options: categoryOptions, key: 'category', placeholder: 'All Categories' },
              { value: filters.duration, options: durationOptions, key: 'duration', placeholder: 'Duration' },
              { value: filters.sort, options: [{ value: '', label: 'Sort By' }, { value: 'price-asc', label: 'Price: Low to High' }, { value: 'price-desc', label: 'Price: High to Low' }], key: 'sort', placeholder: 'Sort By' }
            ].map(({ value, options, key, placeholder }) => (
              <select
                key={key}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 font-medium bg-white"
                value={value}
                onChange={e => setFilters(f => ({ ...f, [key]: e.target.value }))}
              >
                {key === 'sort' ? (
                  options.map(opt => (
                    <option key={opt.value || opt} value={opt.value || opt}>
                      {opt.label || opt}
                    </option>
                  ))
                ) : (
                  options.map(opt => (
                    <option key={opt} value={opt}>
                      {key === 'duration' && opt !== 'All' ? `${opt} Hour${opt > 1 ? 's' : ''} or less` : opt}
                    </option>
                  ))
                )}
              </select>
            ))}
          </div>

          {/* Filter Stats */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-600 font-medium">
              Showing <span className="text-orange-600 font-bold">{filtered.length}</span> of {rituals.length} rituals
            </p>
            {(search || filters.religion !== 'All' || filters.category !== 'All' || filters.duration !== 'All' || filters.sort) && (
              <button 
                onClick={() => {
                  setSearch('');
                  setFilters({ religion: 'All', category: 'All', duration: 'All', sort: '' });
                }}
                className="text-orange-500 hover:text-orange-600 font-medium underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Ritual Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <Sparkles className="mx-auto text-gray-300 mb-6" size={64} />
            <h3 className="text-2xl font-bold text-gray-500 mb-2">No rituals found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((ritual, index) => (
              <div
                key={ritual._id || ritual.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={ritual.image?.url || "https://placehold.co/400x250/png"}
                    alt={ritual.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Rating Badge */}
                  {ritual.popularity && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <span className="text-sm font-bold">{ritual.popularity}</span>
                    </div>
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ritual.religion && (
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-xs font-semibold">
                        {ritual.religion}
                      </span>
                    )}
                    {ritual.category && (
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 rounded-full text-xs font-semibold">
                        {ritual.category}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
                    {ritual.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                    {ritual.description}
                  </p>

                  {/* Duration & Location */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    {ritual.duration && (
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{ritual.duration}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>At your location</span>
                    </div>
                  </div>

                  {/* Price & Book Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">
                        {ritual.price ? `₹${ritual.price}` : ""}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">onwards</span>
                    </div>
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Call To Action */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <Phone className="mx-auto text-white mb-4" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Need Guidance for Your Spiritual Journey?
            </h2>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Our experienced spiritual advisors are here to help you choose the perfect ritual for your occasion and guide you through every step of the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-50 transform hover:scale-105 transition-all duration-200 font-bold shadow-lg">
                📞 Call Our Experts
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transform hover:scale-105 transition-all duration-200 font-bold">
                💬 Chat Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default RitualsPage;
