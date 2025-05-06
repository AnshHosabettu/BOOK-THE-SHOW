import React, { useState, useEffect } from 'react';
import { Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';
import SearchFilters from '../components/SearchFilters';
import { events } from '../data/mockData';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    languages: [],
    formats: [],
    price: { min: 0, max: 500 },
  });

  useEffect(() => {
    // Filter movies by category and search query
    const movies = events.filter(event => 
      event.category === 'movie' && 
      (searchQuery === '' || event.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    // Apply any additional filters here
    setFilteredMovies(movies);
  }, [searchQuery, activeFilters]);

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Movies</h1>
            <p className="text-gray-600">Browse the latest and upcoming movies</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex">
            <div className="relative flex-grow mr-2">
              <input
                type="text"
                placeholder="Search for movies..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              className="btn flex items-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <SearchFilters onApplyFilters={handleApplyFilters} />
          </div>
          
          {/* Movie Grid */}
          <div className="flex-1">
            {filteredMovies.length > 0 ? (
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredMovies.map(movie => (
                  <motion.div key={movie.id} variants={item}>
                    <EventCard event={movie} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No movies found matching your search criteria.</p>
                <button 
                  className="mt-4 text-secondary hover:underline"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilters({
                      categories: [],
                      languages: [],
                      formats: [],
                      price: { min: 0, max: 500 },
                    });
                  }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filters */}
      <SearchFilters 
        onApplyFilters={handleApplyFilters} 
        showMobileFilters={showFilters} 
        setShowMobileFilters={setShowFilters} 
      />
    </div>
  );
};

export default Movies;