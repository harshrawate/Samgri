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
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProfileSettings from "./components/account/ProfileSettings";
import OrderHistory from "./components/account/OrderHistory";
import PriestBookingHistory from "./components/account/PristBookingHistory";
import UserAddress from "./components/account/UserAddress";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPristBooking from "./pages/admin/AdminPristBooking";
import AdminRituals from "./pages/admin/AdminRituals";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminBookingManagement from "./pages/admin/AdminBookingManagement";
import AdminOrderManagement from "./pages/admin/AdminOrderManagement";
import OtpVerificationPage from "./pages/OtpVerificationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";



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
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/profile-settings" element={<ProfileSettings/>} />
        <Route path="/order-history" element={<OrderHistory/>} />
        <Route path="/priest-booking-history" element={<PriestBookingHistory/>} />
        <Route path="/address-book" element={<UserAddress/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/priest-booking" element={<AdminPristBooking/>} />
        <Route path="/admin/rituals" element={<AdminRituals/>} />
        <Route path="/admin/users" element={<AdminUsersPage/>} />
        <Route path="/admin/products" element={<AdminProductsPage/>} />
        <Route path="/admin/booking-management" element={<AdminBookingManagement/>} />
        <Route path="/admin/order-management" element={<AdminOrderManagement/>} /> 
        <Route path="/otp-verification" element={<OtpVerificationPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>} />
        
        
        
        
       

        
        
      
        
      
        
        
        
        
        
        
        
        <Route path="*" element={<h1>404 Not Found</h1>} />
        
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
