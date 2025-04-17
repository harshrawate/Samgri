import { Phone, Mail, Instagram, Youtube, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Samgri */}
          <div>
            <h3 className="text-lg font-medium mb-4">About Samgri</h3>
            <p className="text-gray-400 text-sm mb-6">
              Your one-stop destination for authentic spiritual products and
              services across all religions.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="https://whatsapp.com" className="text-gray-400 hover:text-white">
                <MessageCircle size={20} />
              </a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/shop" className="text-gray-400 hover:text-white text-sm">Shop</a>
              </li>
              <li>
                <a href="/book-a-priest" className="text-gray-400 hover:text-white text-sm">Book a Priest</a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-white text-sm">Blog</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white text-sm">Contact</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white text-sm">FAQ</a>
              </li>
              <li>
                <a href="/returns" className="text-gray-400 hover:text-white text-sm">Returns</a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-conditions" className="text-gray-400 hover:text-white text-sm">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white text-sm">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <a href="mailto:support@samgri.com" className="text-gray-400 hover:text-white text-sm">support@samgri.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">© 2025 Samgri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}