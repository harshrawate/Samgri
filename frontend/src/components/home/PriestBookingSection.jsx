import { CalendarCheck, ScrollText, UserSearch } from "lucide-react";

const steps = [
  {
    icon: <CalendarCheck className="w-10 h-10 text-primary" />,
    title: "Simple Steps to Book Your Priest",
    description: "Follow our easy process to secure your booking.",
  },
  {
    icon: <ScrollText className="w-10 h-10 text-primary" />,
    title: "Choose from Various Rituals Available",
    description: "Explore a wide range of rituals to suit your needs.",
  },
  {
    icon: <UserSearch className="w-10 h-10 text-primary" />,
    title: "Available Priests at Your Fingertips",
    description: "View profiles and select the perfect priest for your occasion.",
  },
];

const PriestBookingSection = () => {
  return (
    <section className="bg-[#FAF5EF] py-14 px-4 md:px-12 lg:px-24 ">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-black">Book a Priest for Your Rituals</h2>
        <p className="text-gray-700 mt-3">
          Finding the right priest for your rituals has never been easier. Our platform connects you with experienced priests tailored to your religious needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">
            {step.icon}
            <h3 className="text-lg font-semibold text-black">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
        <button className="border border-orange-500  border-primary text-primary text-orange-500 px-6 py-2 rounded hover:bg-primary  transition hover:shadow-lg hover:bg-orange-100">
          Book
        </button>
        <button className="text-primary hover:underline flex items-center">
          Learn More <span className="ml-1">→</span>
        </button>
      </div>
    </section>
  );
};

export default PriestBookingSection;
