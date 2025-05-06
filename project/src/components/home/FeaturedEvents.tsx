import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { featuredEvents } from '../../data/mockData';

const FeaturedEvents: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredEvents.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredEvents.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Carousel */}
      <div className="absolute inset-0">
        {featuredEvents.map((event, index) => (
          <div
            key={event.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${event.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="container mx-auto px-4 h-full flex items-end pb-16 md:pb-24">
              <div className="max-w-xl text-white">
                <span className="inline-block mb-3 px-3 py-1 bg-primary/80 backdrop-blur-sm text-white text-xs uppercase rounded-full">
                  {event.category}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-3">{event.title}</h2>
                <p className="text-lg text-white/80 mb-6">{event.description}</p>
                <div className="flex flex-wrap gap-4">
                  <Link to={`/event/${event.id}`}>
                    <Button size="lg">Book Now</Button>
                  </Link>
                  <Link to={`/event/${event.id}`}>
                    <Button variant="outline" size="lg" className="bg-black/30 text-white border-white/30 hover:bg-black/50">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-10"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {featuredEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-6 bg-primary' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;