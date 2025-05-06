import React from 'react';
import FeaturedEvents from '../components/home/FeaturedEvents';
import CategorySection from '../components/home/CategorySection';
import TrendingNow from '../components/home/TrendingNow';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { events } from '../data/mockData';
import EventCard from '../components/cards/EventCard';

const Home: React.FC = () => {
  // Get upcoming events (first 3)
  const upcomingEvents = events.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <FeaturedEvents />
      
      {/* Categories */}
      <CategorySection />
      
      {/* Trending Movies/Events */}
      <TrendingNow />
      
      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Link 
              to="/events" 
              className="flex items-center text-primary hover:text-primary/80 font-medium"
            >
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} variant="horizontal" />
            ))}
          </div>
        </div>
      </section>
      
      {/* Promo Banner */}
      <section className="py-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Special Offers and Discounts</h2>
            <p className="text-lg mb-8">
              Sign up for our newsletter and be the first to know about exclusive deals, 
              early access to ticket sales, and special discounts.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-5 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white min-w-0 flex-auto max-w-xs"
              />
              <button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-colors">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;