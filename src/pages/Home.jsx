import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import EventCard from '../components/EventCard';
import FeaturedEvents from '../components/FeaturedEvents';
import CategoryFilter from '../components/CategoryFilter';
import { events, categories } from '../data/mockData';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === activeCategory));
    }
  }, [activeCategory]);

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
    <div>
      <Hero />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Browse by Category</h2>
            <CategoryFilter 
              categories={categories} 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />
          </div>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredEvents.slice(0, 5).map(event => (
              <motion.div key={event.id} variants={item}>
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <FeaturedEvents events={events} />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Upcoming Movies */}
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Upcoming Movies</h3>
              <ul className="space-y-4">
                {events.filter(e => e.category === 'movie').slice(0, 4).map(movie => (
                  <li key={movie.id} className="flex items-center">
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className="w-14 h-20 object-cover rounded-md mr-3"
                    />
                    <div>
                      <h4 className="font-medium">{movie.title}</h4>
                      <p className="text-sm text-white/80">{movie.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Popular Events */}
            <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Popular Events</h3>
              <ul className="space-y-4">
                {events.filter(e => e.category === 'concert' || e.category === 'comedy').slice(0, 4).map(event => (
                  <li key={event.id} className="flex items-center">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-14 h-20 object-cover rounded-md mr-3"
                    />
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-white/80">{event.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Top Rated */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Top Rated</h3>
              <ul className="space-y-4">
                {events.sort((a, b) => b.rating - a.rating).slice(0, 4).map(event => (
                  <li key={event.id} className="flex items-center">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-14 h-20 object-cover rounded-md mr-3"
                    />
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-sm">{event.rating}/10</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Why Book With Us?</h2>
            <p className="text-gray-600">BookTheShow is your one-stop destination for all entertainment tickets. From the biggest blockbusters to intimate shows, we've got you covered.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Simple and secure booking process. Choose your seats and complete your purchase in minutes.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing with exclusive discounts and offers. Transparent pricing with no hidden fees.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our customer service team is available round the clock to assist you with any queries or issues.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;