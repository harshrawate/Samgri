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
import Account from "./pages/account/Account";
import Cart from "./pages/Cart";
import About from "./pages/about/About";
import BookPrist from "./pages/bookPrist/BookPrist";
import PriestSelectionPage from "./components/bookPrist/PriestSelectionPage";
import PristAddressConfirmationPage from "./components/bookPrist/PristAddressConfirmationPage";

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/festivals" element={<Festival/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="about-us" element={<About/>} />
        <Route path="/book-prist" element={<BookPrist/>} />
        <Route path="/priest-selection" element={<PriestSelectionPage/>} />
        <Route path="/address-confirmation" element={<PristAddressConfirmationPage/>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
