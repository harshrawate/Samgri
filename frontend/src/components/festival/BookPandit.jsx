
export default function BookPandit() {
    return (
      <div className="bg-orange-50 p-4 md:p-8 w-full">
        <div className="max-w-7xl mx-auto bg-orange-500 text-white rounded-lg p-6 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            Want a Pandit Ji for your celebration?
          </h2>
          
          <p className="text-white/90 mb-6 md:mb-8 max-w-xl mx-auto text-sm md:text-base">
            Book an experienced priest for your Diwali puja and ensure an authentic and 
            blessed celebration for you and your family.
          </p>
          
          <button 
            className="bg-white text-orange-500 px-6 py-3 rounded-md font-medium 
                      hover:bg-orange-50 transition-colors duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    );
  }