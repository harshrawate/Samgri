import { useState } from 'react';
import { 
  ShoppingBag, 
  Users, 
  BookOpen, 
  Star, 
  Shield, 
  Landmark, 
  Globe 
} from 'lucide-react';

export default function OurTeam() {
  return (
    <div className="font-sans text-gray-800">
      {/* What We Do Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What We Do</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 - Spiritual Item Marketplace */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Spiritual Item Marketplace</h3>
              <p className="text-gray-600 text-sm">Curated collection of authentic spiritual items and supplies</p>
            </div>
            
            {/* Service 2 - Priest Booking Services */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Priest Booking Services</h3>
              <p className="text-gray-600 text-sm">Connect with verified priests for rituals and ceremonies</p>
            </div>
            
            {/* Service 3 - Ritual Guidance */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Ritual Guidance</h3>
              <p className="text-gray-600 text-sm">Detailed guides and support for various religious ceremonies</p>
            </div>
            
            {/* Service 4 - Astrology Services */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Astrology Services</h3>
              <p className="text-gray-600 text-sm">Professional astrological consultations and horoscopes</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet the Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet the Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="mb-4 mx-auto w-40 h-40 overflow-hidden rounded-full">
                <img 
                  src="/api/placeholder/160/160" 
                  alt="Harsh Rawate" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-xl mb-1">Harsh Rawate</h3>
              <p className="text-amber-500 font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm">Visionary behind Samgri, with 15+ years in spiritual tech</p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="mb-4 mx-auto w-40 h-40 overflow-hidden rounded-full">
                <img 
                  src="/api/placeholder/160/160" 
                  alt="Harsh Rawate" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-xl mb-1">Harsh Rawate</h3>
              <p className="text-amber-500 font-medium mb-3">Tech Lead</p>
              <p className="text-gray-600 text-sm">Engineering expert with passion for spiritual technology</p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="mb-4 mx-auto w-40 h-40 overflow-hidden rounded-full">
                <img 
                  src="/api/placeholder/160/160" 
                  alt="Harsh Rawate" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-xl mb-1">Harsh Rawate</h3>
              <p className="text-amber-500 font-medium mb-3">Community Manager</p>
              <p className="text-gray-600 text-sm">Building bridges between tradition and technology</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 - Trust */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                <Shield className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="font-bold text-xl mb-4">Trust</h3>
              <p className="text-gray-600">Building relationships based on authenticity and transparency</p>
            </div>
            
            {/* Value 2 - Tradition */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                <Landmark className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="font-bold text-xl mb-4">Tradition</h3>
              <p className="text-gray-600">Preserving and respecting ancient spiritual practices</p>
            </div>
            
            {/* Value 3 - Accessibility */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                <Globe className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="font-bold text-xl mb-4">Accessibility</h3>
              <p className="text-gray-600">Making spiritual guidance available to everyone</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}