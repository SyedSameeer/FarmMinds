import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import './CategoryCard.css';
export default function CategoryCard({ name, description, productCount, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="category-card"
    >
      <div className="category-header">
        <div className="category-icon">
          {icon}
        </div>
        <span className="category-product-count">{productCount} products</span>
      </div>
      <h3 className="category-name">{name}</h3>
      <p className="category-description">{description}</p>
      <motion.div
        whileHover={{ x: 5 }}
        className="view-products"
      >
        View Products
        <ArrowRight className="arrow-icon" />
      </motion.div>
    </motion.div>
  );
}
