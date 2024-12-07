import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../components/CartContext';

import './Products.css';

const categorizedProducts = {
  Fruits: [
    { name: "Fresh Apples", price: 3, imageUrl: "https://images.unsplash.com/photo-1476837579993-f1d3948f17c2?w=500" },
    { name: "Bananas", price: 199, imageUrl: "https://images.unsplash.com/photo-1513563401345-1123a773541c?w=500" },
    { name: "Oranges", price: 449, imageUrl: "https://images.unsplash.com/photo-1520794673827-ab71def2c94d?w=500" },
    { name: "Strawberries", price: 599, imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500" },
  ],
  Vegetables: [
    { name: "Fresh Carrots", price: 249, imageUrl: "https://images.unsplash.com/photo-1508747774537-d8ae09fa7dba?w=500" },
    { name: "Broccoli", price: 329, imageUrl: "https://plus.unsplash.com/premium_photo-1702403157830-9df749dc6c1e?w=500" },
    { name: "Spinach", price: 299, imageUrl: "https://images.unsplash.com/photo-1592419391068-9bd09dd58510?w=500" },
    { name: "Tomatoes", price: 349, imageUrl: "https://plus.unsplash.com/premium_photo-1667049288967-f1054634fce2?w=500" },
  ],
  Dairy: [
    { name: "Milk", price: 149, imageUrl: "https://plus.unsplash.com/premium_photo-1682129071833-65eed17bcf11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y293JTIwbWlsa3xlbnwwfHwwfHx8MA%3D%3D" },
    { name: "Cheese", price: 549, imageUrl: "https://plus.unsplash.com/premium_photo-1700162640179-cd0c0005320c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwY2hlZXNlfGVufDB8fDB8fHww" },
    { name: "Yogurt", price: 299, imageUrl: "https://media.istockphoto.com/id/624992248/photo/home-made-yogurt-in-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=oGo3j1SyAkdGVtRfIo00sZP5Wr8khHeH2hvJUNkcYBg=" },
    { name: "Butter", price: 379, imageUrl: "https://media.istockphoto.com/id/1164701481/photo/homemade-white-butter.webp?a=1&b=1&s=612x612&w=0&k=20&c=PGUfsTQhY4T2-T-gTUaTXi5Vyq5V5yhp5Jyxrl30360=" },
  ],
  Nuts: [
    { name: "Almonds", price: 899, imageUrl: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFsbW9uZHN8ZW58MHx8MHx8fDA%3D" },
    { name: "Cashews", price: 949, imageUrl: "https://media.istockphoto.com/id/1488507729/photo/closeup-of-cashew-nut-in-a-black-bowl-isolated-on-green-cashew-leaves-in-vertical-oriention.webp?a=1&b=1&s=612x612&w=0&k=20&c=XcYMUdfy3sa6jDXV8VYpRWtWpKIzjMO4AZSdLizBHKU=" },
    { name: "Pistachios", price: 199, imageUrl: "https://media.istockphoto.com/id/1067505384/photo/bowl-with-pistachio-on-wooden-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=fv8jg87XyvNDqRp6K9ZC9uoWp3PFE8kqodgG_kWc25Y=" },
    { name: "Walnuts", price: 799, imageUrl: "https://images.unsplash.com/photo-1541439808416-b89fb9a9e238?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8V2FsbnV0c3xlbnwwfHwwfHx8MA%3D%3D" },
  ],
  Rice: [
    { name: "Basmati Rice", price: 1199, imageUrl: "https://media.istockphoto.com/id/172195254/photo/indian-basmati-rice.webp?a=1&b=1&s=612x612&w=0&k=20&c=9gsaUnM9gdgECzR-sGLgvrwYDhZDOLfLPNTbC5pIuQo=" },
    { name: "Brown Rice", price: 1199, imageUrl: "https://plus.unsplash.com/premium_photo-1725878608892-628a5b22358e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJyb3duJTIwcmljZXxlbnwwfHwwfHx8MA%3D%3D" },
    { name: "Wild Rice", price: 1499, imageUrl: "https://images.unsplash.com/photo-1613728913341-8f29b02b8253?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8V2lsZCUyMFJpY2V8ZW58MHx8MHx8fDA%3D" },
    { name: "Jasmine Rice", price: 1349, imageUrl: "https://images.unsplash.com/photo-1686820740687-426a7b9b2043?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SmFzbWluZSUyMFJpY2V8ZW58MHx8MHx8fDA%3D" },
  ],
};


export default function Products() {
  const { addToCart } = useCart(); // Access the addToCart function from CartContext
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1500]);

  // Flatten products for filtering
  const allProducts = Object.entries(categorizedProducts).flatMap(([category, products]) =>
    products.map(product => ({ ...product, category }))
  );

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart
  };

  return (
    <div className="products-page">
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-filter"
        >
          <option value="All">All Categories</option>
          {Object.keys(categorizedProducts).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input
          type="range"
          min="0"
          max="15"
          step="0.5"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
          className="price-range-slider"
        />
        <span>Up to ₹{priceRange[1]}</span>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="product-card-wrapper"
          >
            <div className="product-card">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-button"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
