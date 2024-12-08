import React from 'react'; // Keep this import if it's being used
import { Routes, Route, useLocation } from 'react-router-dom'; // Correct import style
import { HashRouter } from "react-router-dom";

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Admin from './components/Admin/Admin';
import Buyer from './components/Buyer/Buyer';
import LandingPage from './components/LandingPage';
import Homepage from './components/Homepage';
import FarmerHomepage from './components/Farmer/FarmerHomepage';
import Navbar from './components/Navbar'; // Check for unused imports
import Products from './pages/Products';
import About from './pages/About';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Blog from './pages/Blog';
import AdminDashboard from './components/Admin/Admin';
import AdminLogin from './AdminLogin';
import { CartProvider } from '../src/components/CartContext';

// Import LanguageContext and wrap the app with LanguageProvider
import EmailSender from './pages/EmailSender';
import PaymentQRCode from './Services/PaymentQRCode';  // Import the PaymentQRCode component

// Helper component to conditionally render the navbar
const AppNavbar = () => {
  const location = useLocation();
  const hideNavbarOnPaths = ['/signin', '/signup', '/adminlogin'];

  return !hideNavbarOnPaths.includes(location.pathname) ? <Navbar /> : null;
};

function App() {
  const onCategorySelect = (category) => {
    console.log(`You selected the category: ${category}`);
  };
  

  return (
    
        <CartProvider> {/* Wrap with CartProvider */}
          <HashRouter basename="/FarmMinds">
            <AppNavbar /> {/* Conditionally render Navbar */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route path="/farmerhomepage" element={<FarmerHomepage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/buyer" element={<Buyer />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/products/:category" element={<Products />} />
              <Route path="/email" element={<EmailSender />} />
              <Route path="/categories" element={<Categories onCategorySelect={onCategorySelect} />} />
              <Route path="/payment-qr" element={<PaymentQRCode />} /> {/* Add route for PaymentQRCode */}
            </Routes>
            </HashRouter>
        </CartProvider>
     
  );
}

export default App;
