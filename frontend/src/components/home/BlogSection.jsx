import DiwaliImgHome2 from "../../assets/home/DiwaliImgHome2.jpg";
import NavratriImgHome from "../../assets/home/NavratriImg.jpg";
import MakarSankrantiImgHome from "../../assets/home/SankraniImg.jpg";



const blogPosts = [
    {
      title: "The Significance of Diwali Celebrations",
      category: "Rituals",
      time: "5 min read",
      image: DiwaliImgHome2, // Replace with your actual image path
      description: "Learn about the traditions and rituals of Diwali and their meanings.",
    },
    {
      title: "Understanding the Importance of Navratri",
      category: "Festivals",
      time: "5 min read",
      image: NavratriImgHome,
      description: "Explore the rituals and significance of the Navratri festival.",
    },
    {
      title: "Celebrating Makar Sankranti Traditions",
      category: "Rituals",
      time: "5 min read",
      image:  MakarSankrantiImgHome,
      description: "Discover the customs and significance of Makar Sankranti.",
    },
  ];
  
  const BlogSection = () => {
    return (
      <section className="bg-[#FAF5EF] px-4 py-16 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <p className="text-sm text-[#7B2C3F] uppercase tracking-widest">Blog</p>
          <h2 className="text-3xl font-bold text-[#5C1A1B] mt-2">Explore Our Latest Insights</h2>
          <p className="text-[#5C1A1B] mt-2 text-sm">Discover rituals and festivals that enrich your life.</p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-[#F5F1EB] rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-t-xl" />
              <div className="p-5">
                <div className="flex gap-3 mb-2 text-xs text-[#5C1A1B]">
                  <span className="bg-[#EDEDED] px-2 py-1 rounded">{post.category}</span>
                  <span>{post.time}</span>
                </div>
                <h3 className="text-md font-semibold text-[#5C1A1B] mb-2">{post.title}</h3>
                <p className="text-sm text-gray-700 mb-4">{post.description}</p>
                <a href="#" className="text-sm font-medium text-[#F4A300] hover:underline">
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
  
        <div className="mt-12 text-center">
          <button className="px-5 py-2 border border-[#5C1A1B] text-[#5C1A1B] rounded hover:bg-[#5C1A1B] hover:text-white transition-all">
            View all
          </button>
        </div>
      </section>
    );
  };
  
  export default BlogSection;
  