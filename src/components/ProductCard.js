import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Tag } from 'lucide-react';
import { useCart } from '../components/CartContext';
import './ProductCard.css';

export default function ProductCard({ name, price, category, imageUrl, stock }) {
  const { addToCart } = useCart(); // Get addToCart function from context

  const handleAddToCart = () => {
    const product = { name, price, category, imageUrl, stock };
    addToCart(product); // Add product to cart
  };

  return (
    <motion.div whileHover={{ y: -5 }} className="product-card">
      <div className="product-card-image" style={{ backgroundImage: `url(${imageUrl})` }}>
        <span className="product-stock">{stock} in stock</span>
      </div>
      <div className="product-card-content">
        <div className="product-category">
          <Tag className="icon" />
          <span>{category}</span>
        </div>
        <h3 className="product-name">{name}</h3>
        <div className="product-info">
          <span className="product-price">${price.toFixed(2)}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="add-to-cart-btn"
          onClick={handleAddToCart} // Add onClick handler
        >
          <ShoppingCart className="icon" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
