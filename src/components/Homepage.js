import React, { useEffect, useState } from 'react';
import './Homepage.css'; // Import your CSS
import Navbar from './Navbar'; // Import the Navbar
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        require('./images/cover1.jpg'),
        require('./images/cover2.jpg'),
        require('./images/cover3.jpg'),
        require('./images/cover4.jpg'),
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className="homepage">
            <Navbar /> {/* Navbar component for navigation */}

            {/* Cover Image Section */}
            <section className="cover-section">
                <div className="image-container">
                    <img src={images[currentImageIndex]} alt="Cover Slideshow" className="cover-image" />
                    <div className="text-box">
                        <h1 className="welcome-text">
                            Welcome to <span className="green-text">FarmMinds</span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* Scrolling Section */}
            <section className="scroll-section">
                <div className="content-wrapper">
                    <div className="left-side">
                        <img src={require('./images/farm1.jpg')} alt="farm" />
                    </div>
                    <div className="right-side">
                        <h2 className="welcome-big">
                            Welcome To The<span className="green-text">          FarmMinds</span>
                        </h2>
                        <p className="description">
                            We provide the best quality farm products directly from local farmers to your doorstep. Experience organic freshness with every purchase.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="featured-products">
            <h2>Our Products</h2>
      <h3 className="offer-title">What We Offer</h3>
      <div className="product-grid">
        <div className="product-box" onClick={() => navigate('/products')}>
          <img src={require('./images/fruit.jpg')} alt="Fruits" />
          <div className="product-text">Fruits</div>
        </div>
        <div className="product-box" onClick={() => navigate('/products')}>
          <img src={require('./images/fruits.jpg')} alt="Vegetables" />
          <div className="product-text">Vegetables</div>
        </div>
        <div className="product-box" onClick={() => navigate('/products')}>
          <img src={require('./images/herbs.jpg')} alt="Herbs" />
          <div className="product-text">Herbs</div>
        </div>
        <div className="product-box" onClick={() => navigate('/products')}>
          <img src={require('./images/berries.jpg')} alt="Berries" />
          <div className="product-text">Berries</div>
        </div>
        <div className="product-box" onClick={() => navigate('/vegboxes')}>
          <img src={require('./images/vegboxes.jpg')} alt="Veg Boxes" />
          <div className="product-text">Veg Basket</div>
        </div>
        <div className="product-box" onClick={() => navigate('/products')}>
          <img src={require('./images/dairy.jpg')} alt="Dairy" />
          <div className="product-text">Dairy</div>
        </div>
      </div>
    </section>

            {/* Seasonal Favorites Section */}
            <section className="seasonal-favorites">
  <div className="left-side">
    <h2 className="favorites-title">Seasonal Favorites</h2>
  </div>
  <div className="right-side">
    <div className="slider">
      <div className="slide-track">
        <a href="/product1" className="product-item">
          <img src={require('./images/o.jpg')} alt="Onion" />
          <p>Onions - ₹100.00</p>
        </a>
        <a href="/product2" className="product-item">
          <img src={require('./images/carrots.jpg')} alt="Carrot" />
          <p>Carrots - ₹70.00</p>
        </a>
        <a href="/product3" className="product-item">
          <img src={require('./images/nuts.jpeg')} alt="Nuts" />
          <p>nuts - ₹900.00</p>
        </a>
        <a href="/product1" className="product-item">
          <img src={require('./images/s1.jpg')} alt="Onion" />
          <p>Green Apple - ₹120.00</p>
        </a>
        <a href="/product2" className="product-item">
          <img src={require('./images/s2.jpg')} alt="Carrot" />
          <p>Berry - ₹250.00</p>
        </a>
        <a href="/product3" className="product-item">
          <img src={require('./images/s3.jpg')} alt="Nuts" />
          <p>Kiwi - ₹380.00</p>
          </a>
          <a href="/product1" className="product-item">
          <img src={require('./images/s4.jpg')} alt="Onion" />
          <p>Pista - ₹450.00</p>
        </a>
        <a href="/product2" className="product-item">
          <img src={require('./images/s5.jpg')} alt="Carrot" />
          <p>Beans - ₹60.00</p>
        </a>
        <a href="/product3" className="product-item">
          <img src={require('./images/s6.jpg')} alt="Nuts" />
          <p>Capsicum - ₹40.00</p>
        </a>
      </div>
    </div>
  </div>
</section>


            {/* Footer Section */}
            <footer className="homepage-footer">
                <div className="footer-content">
                    <h2>Contact Us</h2>
                    <p>Email: email@farmminds.com</p>
                    <p>Feedback: feedback@example.com</p>
                    <div className="social-media">
                        <a href="#facebook">Facebook</a>
                        <a href="#instagram">Instagram</a>
                        <a href="#twitter">Twitter</a>
                    </div>
                    <p>&copy; 2024 FarmMinds. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Homepage;