import React from 'react';

const testimonials = [
  {
    name: "Arun Kumar",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    feedback: "Samgri has made it so easy to connect with qualified priests and maintain our traditions."
  },
  {
    name: "Maya Desai",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    feedback: "The quality of products and services is exceptional. Highly recommended!"
  },
  {
    name: "Rajesh Iyer",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    rating: 5,
    feedback: "Perfect platform for maintaining spiritual practices in our busy modern lives."
  },
];

const AboutTestimonials = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">What Our Users Say</h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((user, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-lg p-6 text-center">
            <img
              src={user.image}
              alt={user.name}
              className="w-14 h-14 rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <div className="flex justify-center my-2">
              {Array.from({ length: user.rating }).map((_, index) => (
                <svg
                  key={index}
                  className="w-5 h-5 text-orange-400 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 text-sm">{user.feedback}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center bg-orange-50 p-10 rounded-lg">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">Ready to Begin Your Spiritual Journey?</h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Join thousands of others who have found their spiritual path with Samgri
        </p>
      </div>
    </div>
  );
};

export default AboutTestimonials;
