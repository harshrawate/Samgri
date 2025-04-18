import FestivalHeroImg from "../../assets/festival/Festival.png";
import Diwaliimg from "../../assets/festival/Diwaliimg.png"

export default function FestivalHero() {
    return (
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
          <img
            src={FestivalHeroImg}
            alt="Diwali Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center px-4 text-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Diwali – Festival of Lights
              </h1>
              <p className="text-sm sm:text-lg text-gray-200">
                Celebrate the triumph of light over darkness with the most
                auspicious festival of the year. Join millions worldwide in this
                spectacular celebration of prosperity and joy.
              </p>
            </div>
          </div>
        </div>
  
        {/* Info Section */}
        <div className="py-12 px-4 sm:px-8 lg:px-20 bg-[#FAF5EF]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                The Spirit of Diwali
              </h2>
              <p className="text-gray-700 mb-6">
                Diwali, the festival of lights, is one of the most significant
                celebrations in Indian culture. The festival gets its name from
                the row (avali) of clay lamps (deepa) that Indians light outside
                their homes to symbolize the inner light that protects from
                spiritual darkness.
              </p>
  
              {/* Points */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#5C1A1B] flex items-center gap-2">
                    <span>📖</span> Rich History
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Dating back more than 2,500 years, Diwali symbolizes the
                    spiritual victory of light over darkness.
                  </p>
                </div>
  
                <div>
                  <h4 className="font-semibold text-[#5C1A1B] flex items-center gap-2">
                    <span>🕉️</span> Spiritual Significance
                  </h4>
                  <p className="text-gray-600 text-sm">
                    The festival marks Lord Rama's return to Ayodhya after
                    defeating Ravana and completing 14 years of exile.
                  </p>
                </div>
              </div>
            </div>
  
            {/* Right Image */}
            <div>
              <img
                src={Diwaliimg}
                alt="Family celebrating Diwali"
                className="rounded-xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  