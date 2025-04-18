const FestivalReminder = () => {
    return (
      <section className="bg-white px-4 py-16 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Get Festival Reminders
          </h2>
          <p className="text-gray-600 mt-2">
            Stay updated with the latest festivals and rituals.
          </p>
  
          <form className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-2/3 px-4 py-3 border border-orange-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-3 rounded-md text-sm hover:bg-orange-800 transition"
            >
              Subscribe
            </button>
          </form>
  
          
        </div>
      </section>
    );
  };
  
  export default FestivalReminder;
  