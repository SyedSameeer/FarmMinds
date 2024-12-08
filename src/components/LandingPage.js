import React from 'react';
import { Leaf, Award, Clock, Heart, } from 'lucide-react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
 
// Sample data with images
const products = [
  {
    id: 1, name: 'Organic Avocados', farmer: 'Green Valley Farm', price: '₹250', unit: 'per kg', rating: 4.8, img:'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600',

  },
  {
    id: 2, name: 'Fresh Strawberries', farmer: 'Sunshine Fields', price: '₹450', unit: 'per basket', rating: 4.9, img: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3, name: 'Water Melon', farmer: 'Mountain Apiaries', price: '₹100', unit: 'per item', rating: 5.0, img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 4, name: 'Premium Coffee Beans', farmer: 'Highland Coffee Co.', price: '₹150', unit: 'per kg', rating: 4.7, img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=600'
  },
];

const testimonials = [
  { quote: "FarmMinds has transformed my small farm into a global business.", author: "Srinivasulu", role: "Organic Farmer", img: 'https://images.unsplash.com/photo-1609252509102-aa73ff792667?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwZmFybWVyc3xlbnwwfHwwfHx8MA%3D%3D' },
  { quote: "The platform's support and tools helped me reach international markets.", author: "Pushpa Raju", role: "Family Farm Owner", img: 'https://images.unsplash.com/photo-1592826292099-2da74ec30eea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGluZGlhbiUyMGZhcm1lcnN8ZW58MHx8MHx8fDA%3D' },
];

export default function LandingPage() {
    const navigate = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container text-center">
          <Leaf className="icon-lg" />
          <h1>FarmMinds <span>Farm Local, Buy Global</span></h1>
          <p>Your marketplace for fresh, sustainable produce.</p>
          <div className="buttons">
            <button className="btn-primary" onClick={() => navigate('/signin')}>🌿 Start Selling</button>
            <button className="btn-secondary" onClick={() => navigate('/signin')}>🛒 Start Shopping</button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits container">
        <h2>Why Buy from FarmMinds?</h2>
        <div className="benefits-grid">
          {[{ icon: Leaf, title: 'Fresh & Organic', description: 'Direct access to fresh, organic produce straight from trusted farms.' }, { icon: Award, title: 'Quality Guaranteed', description: 'All products undergo strict quality checks before shipping.' }, { icon: Clock, title: 'Fast Delivery', description: 'Efficient logistics ensure your products arrive fresh and on time.' }, { icon: Heart, title: 'Support Local Farmers', description: 'Your purchase directly supports sustainable farming communities.' }]
            .map((benefit, index) => (
              <div key={index} className="benefit-card">
                <benefit.icon className="icon-md" />
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="products container">
        <h2>Featured Products</h2>
        <div className="products-grid">
        {products.map((product) => (
  <div key={product.id} className="product-card">
    <img src={product.img} alt={product.name} />
    <h3>{product.name}</h3>
  </div>
))}

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials container">
        <h2>Trusted by Farmers Worldwide</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <img src={testimonial.img} alt={testimonial.author} />
              <p>"{testimonial.quote}"</p>
              <div className="author">
                <strong>{testimonial.author}</strong>, {testimonial.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content container">
          <div className="brand">
            <Leaf className="icon-sm" /> <span>FarmMinds</span>
          </div>
          <div>© {new Date().getFullYear()} FarmMinds. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
