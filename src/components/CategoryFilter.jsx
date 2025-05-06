import React from 'react';
import { motion } from 'framer-motion';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 hide-scrollbar">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${
            activeCategory === category.id
              ? 'bg-secondary text-white'
              : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
          }`}
          onClick={() => setActiveCategory(category.id)}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;