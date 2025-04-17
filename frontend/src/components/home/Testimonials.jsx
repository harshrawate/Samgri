const testimonials = [
    {
      name: "Anjali Sharma",
      role: "Devotee, Pune",
      feedback:
        "Booking a priest for our Ganesh Puja was effortless. The rituals were performed beautifully and everything was well organized.",
      image: "/images/testimonial1.jpg", // Replace with actual image
    },
    {
      name: "Ravi Mehta",
      role: "Customer, Mumbai",
      feedback:
        "I was able to find all the puja items I needed in one place. This platform saved me time and stress before Diwali!",
      image: "/images/testimonial2.jpg",
    },
    {
      name: "Fatima Siddiqui",
      role: "Customer, Hyderabad",
      feedback:
        "Great experience booking services for Eid. Everything arrived on time and the team was very helpful.",
      image: "/images/testimonial3.jpg",
    },
  ];
  
  const Testimonials = () => {
    return (
      <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#5C1A1B]">What Our Users Say</h2>
          <p className="mt-2 text-[#7B2C3F] text-sm">Hear from people who’ve enriched their rituals through our platform.</p>
        </div>
  
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#F5F1EB] p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#F4A300]"
                />
                <div>
                  <h4 className="text-[#5C1A1B] font-semibold">{item.name}</h4>
                  <p className="text-sm text-[#7B2C3F]">{item.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-800 italic">"{item.feedback}"</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Testimonials;
  