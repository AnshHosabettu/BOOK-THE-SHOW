import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategorySection = ({ title, subtitle, items, viewAllLink }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">{title}</h2>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
          
          {viewAllLink && (
            <Link 
              to={viewAllLink} 
              className="flex items-center text-secondary font-medium hover:underline"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {items}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;