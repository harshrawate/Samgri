import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import Festival from "./pages/festival/Festival";
import Blog from "./pages/blog/Blog";

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/festivals" element={<Festival/>} />
        <Route path="/blog" element={<Blog/>} />
        
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
