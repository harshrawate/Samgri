import { Package } from "lucide-react";

const features = [
  {
    title: "Puja Kits for Every Occasion",
    description: "Find the perfect kit for your rituals.",
  },
  {
    title: "Beautifully Crafted Idols for Worship",
    description: "Adorn your space with our exquisite idols.",
  },
  {
    title: "Aromatic Incense for a Serene Atmosphere",
    description: "Create a calming environment with our incense.",
  },
];

const ProductFeatures = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">
            <Package className="w-10 h-10 text-primary" />
            <h3 className="text-xl font-semibold text-black">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
            {index === 1 && (
              <div className="flex space-x-4 mt-2">
                <button className=" bg-orange-500  text-primary text-white px-4 py-1 rounded hover:bg-orange-600 hover:text-white transition">
                  Shop
                </button>
                <button className="text-primary hover:underline flex items-center">
                  Learn More <span className="ml-1">→</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductFeatures;
