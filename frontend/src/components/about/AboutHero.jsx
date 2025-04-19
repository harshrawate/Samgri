import { useState } from 'react';
import AboutHeroImg from "../../assets/about/aboutheroimg.png"

export default function AboutHero() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Banner with Temple Silhouette */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        {/* Using img tag instead of background style */}
        <img 
          src={AboutHeroImg} 
          alt="Temple silhouette at sunset" 
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/30 to-amber-600/30 mix-blend-overlay"></div>
        
      </div>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 relative">
            <span className="relative inline-block">
              Our Mission
              
            </span>
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center transform transition-all duration-300 hover:shadow-xl">
            <div className="space-y-4">
              <p className="text-lg md:text-xl leading-relaxed">
                At <span className="text-amber-600 font-semibold">Samgri</span>, we're dedicated to making spiritual practices accessible to everyone. We bridge the gap between ancient traditions and modern convenience, ensuring that spiritual guidance and resources are just a click away.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed">
                Our platform serves as a <span className="italic">digital sanctuary</span> where devotees can connect with priests, access sacred items, and maintain their spiritual journey with ease.
              </p>
              
              <div className="pt-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
                  {/* Using img tag for icon */}
                  <img 
                    src="/api/placeholder/32/32" 
                    alt="Spiritual Icon" 
                    className="w-8 h-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 relative">
            <span className="relative inline-block">
              How Samgri Began
              
            </span>
          </h2>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-400"></div>
            
            {/* 2023 */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 text-right md:text-right">
                  <h3 className="text-2xl font-bold mb-2">2023</h3>
                  <p className="text-gray-600">The idea was born from personal struggles in finding authentic spiritual guidance</p>
                </div>
                
                <div className="mx-auto md:mx-0 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border-4 border-amber-500">
                  <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                </div>
                
                <div className="md:w-1/2 md:pl-8"></div>
              </div>
            </div>
            
            {/* 2024 */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 text-right md:text-right md:order-1 order-1">
                  <div className="md:hidden">
                    <h3 className="text-2xl font-bold mb-2">2024</h3>
                    <p className="text-gray-600">Platform development and partnerships with first 100 verified priests</p>
                  </div>
                </div>
                
                <div className="mx-auto md:mx-0 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border-4 border-amber-500 order-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                </div>
                
                <div className="md:w-1/2 md:pl-8 order-3">
                  <div className="hidden md:block">
                    <h3 className="text-2xl font-bold mb-2">2024</h3>
                    <p className="text-gray-600">Platform development and partnerships with first 100 verified priests</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 2025 */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 text-right md:text-right">
                  <h3 className="text-2xl font-bold mb-2">2025</h3>
                  <p className="text-gray-600">Serving thousands of devotees across multiple cities</p>
                </div>
                
                <div className="mx-auto md:mx-0 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border-4 border-amber-500">
                  <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                </div>
                
                <div className="md:w-1/2 md:pl-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}