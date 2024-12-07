import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Egg, Wheat, Apple, Coffee, Fish } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import './Categories.css';
const categories = [
  {
    name: "Vegetables",
    description: "Fresh, organic vegetables from local farms",
    productCount: 45,
    icon: <Leaf className="w-6 h-6 text-green-600" />
  },
  {
    name: "Dairy & Eggs",
    description: "Farm-fresh dairy products and free-range eggs",
    productCount: 28,
    icon: <Egg className="w-6 h-6 text-green-600" />
  },
  {
    name: "Grains",
    description: "Organic grains and cereals",
    productCount: 32,
    icon: <Wheat className="w-6 h-6 text-green-600" />
  },
  {
    name: "Fruits",
    description: "Seasonal fruits from local orchards",
    productCount: 38,
    icon: <Apple className="w-6 h-6 text-green-600" />
  },
  {
    name: "Beverages",
    description: "Natural and organic drinks",
    productCount: 15,
    icon: <Coffee className="w-6 h-6 text-green-600" />
  },
  {
    name: "Seafood",
    description: "Fresh seafood from sustainable sources",
    productCount: 23,
    icon: <Fish className="w-6 h-6 text-green-600" />
  }
];

export default function Categories({ onCategorySelect }) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
        <p className="text-gray-600 mt-1">Browse products by category</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onCategorySelect(category.name)}
          >
            <CategoryCard {...category} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
