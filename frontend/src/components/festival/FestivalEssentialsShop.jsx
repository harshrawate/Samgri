import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import Diya from "../../assets/festival/diyaimg.png";
import PujaThali from "../../assets/festival/thaliimg.png";
import Rangoli from "../../assets/festival/rangoliimg.png";
import Idol from "../../assets/festival/ganeshimg.png";

export default function FestivalEssentialsShop() {
  const [cart, setCart] = useState([]);
  
  const products = [
    {
      id: 1,
      name: "Brass Diya Set",
      price: "₹1,299",
      image: Diya,
      alt: "Brass Diya Set"
    },
    {
      id: 2,
      name: "Complete Puja Thali Set",
      price: "₹2,499",
      image: PujaThali,
      alt: "Complete Puja Thali Set"
    },
    {
      id: 3,
      name: "Rangoli Colors Set",
      price: "₹499",
      image: Rangoli,
      alt: "Rangoli Colors Set"
    },
    {
      id: 4,
      name: "Silver Lakshmi-Ganesh Idol",
      price: "₹4,999",
      image: Idol,
      alt: "Silver Lakshmi-Ganesh Idol"
    }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Shop Festival Essentials</h1>
        <div className="relative">
          <ShoppingCart className="text-gray-700" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div className="h-48 sm:h-40 md:h-48 lg:h-52 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.alt}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
              <p className="text-orange-500 font-semibold mb-3">{product.price}</p>
              
              <button 
                onClick={() => addToCart(product)}
                className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={16} />
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}