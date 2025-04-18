
import { ArrowRight } from 'lucide-react';
import Diwali1 from "../../assets/festival/diwaliImg1.png";
import Diwali2 from "../../assets/festival/diwaliImg2.png";
import Diwali3 from "../../assets/festival/diwaliImg3.png";

export default function LearnMoreFestival() {
  const articles = [
    {
      id: 1,
      title: "Traditional Diwali Sweets and Their Significance",
      description: "Explore the delicious world of traditional Diwali sweets and learn about their cultural importance.",
      image: Diwali1,
      alt: "Traditional Diwali sweets arranged on a plate"
    },
    {
      id: 2,
      title: "Eco-Friendly Diwali Celebration Guide",
      description: "Tips and ideas for celebrating an environmentally conscious Diwali without compromising on traditions.",
      image: Diwali2,
      alt: "Eco-friendly Diwali celebration with diyas"
    },
    {
      id: 3,
      title: "Modern Rangoli Designs for Diwali",
      description: "Contemporary rangoli patterns that blend traditional motifs with modern aesthetics.",
      image: Diwali3,
      alt: "Modern Rangoli design with vibrant colors"
    }
  ];

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 mb-8">
    <div className="max-w-7xl  mx-auto p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Learn More About Diwali</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div className="h-48 overflow-hidden">
              <img 
                src={article.image} 
                alt={article.alt}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{article.description}</p>
              
              <button className="flex items-center text-orange-500 font-medium text-sm mt-auto">
                Read More <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}