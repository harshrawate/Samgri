import { useState, useEffect, useRef } from 'react';

export default function Carousel() {
  // First row images
  const topRowImages = [
    '/api/placeholder/350/280',
    '/api/placeholder/350/280',
    '/api/placeholder/350/280',
    '/api/placeholder/350/280',
    '/api/placeholder/350/280',
    '/api/placeholder/350/280',
  ];
  
  // Second row images (different set)
  const bottomRowImages = [
    '/api/placeholder/350/280',
    '/api/placeholder/350/280',
    '/api/placeholder/350/280',
    '/api/placeholder/350/280',
    '/api/placeholder/350/280',
    '/api/placeholder/350/280',
  ];

  const [isMobile, setIsMobile] = useState(false);
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  
  // Check if device is mobile and update on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Clone images for infinite scroll effect
  const repeatedTopImages = [...topRowImages, ...topRowImages];
  const repeatedBottomImages = [...bottomRowImages, ...bottomRowImages];

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Welcome to Your Spiritual Journey
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover a wide range of <span className="text-[#E94E1B]">religious products</span> and services tailored to your spiritual needs. Join our community and enrich your faith with every purchase.
          </p>
        </div>
        
        <div className="flex justify-center gap-4 mt-6">
          <button className="bg-[#E94E1B] text-white px-6 py-2 rounded hover:bg-opacity-90 transition-all">
            Shop
          </button>
          <button className="border border-[#E94E1B] text-[#E94E1B] px-6 py-2 rounded hover:bg-[#FDF3EC] transition-all">
            Learn More
          </button>
        </div>
      </div>

      {/* Carousel container */}
      <div className="w-full overflow-hidden">
        <div className="flex flex-col gap-2 md:gap-4">
          {/* First row */}
          <div className="relative overflow-hidden">
            <div 
              ref={topRowRef}
              className="flex gap-2 md:gap-4 animate-scroll-left"
              style={{
                animationDuration: isMobile ? '40s' : '60s',
              }}
            >
              {repeatedTopImages.map((src, index) => (
                <div 
                  key={`row1-${index}`} 
                  className="w-40 sm:w-56 md:w-64 lg:w-80 h-32 sm:h-40 md:h-48 lg:h-64 bg-gray-200 flex-shrink-0"
                >
                  <img 
                    src={src} 
                    alt={`Product ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Second row with different images and different speed */}
          <div className="relative overflow-hidden">
            <div 
              ref={bottomRowRef}
              className="flex gap-2 md:gap-4 animate-scroll-right"
              style={{
                animationDuration: isMobile ? '50s' : '75s',
              }}
            >
              {repeatedBottomImages.map((src, index) => (
                <div 
                  key={`row2-${index}`} 
                  className="w-40 sm:w-56 md:w-64 lg:w-80 h-32 sm:h-40 md:h-48 lg:h-64 bg-gray-200 flex-shrink-0"
                >
                  <img 
                    src={src} 
                    alt={`Product B${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 8px));
          }
        }
        
        @keyframes scrollRight {
          0% {
            transform: translateX(calc(-50% - 8px));
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scrollLeft linear infinite;
        }
        
        .animate-scroll-right {
          animation: scrollRight linear infinite;
        }
      `}</style>
    </section>
  );
}