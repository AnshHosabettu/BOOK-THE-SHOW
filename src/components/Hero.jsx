import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "Avengers: Endgame",
      subtitle: "The epic conclusion to the Infinity Saga",
      image: "https://images.pexels.com/photos/1716158/pexels-photo-1716158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Movie",
      link: "/event/1"
    },
    {
      id: 2,
      title: "Coldplay: Music of the Spheres",
      subtitle: "World Tour 2025",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Concert",
      link: "/event/2"
    },
    {
      id: 3,
      title: "Hamilton",
      subtitle: "The Award-Winning Broadway Musical",
      image: "https://images.pexels.com/photos/11861459/pexels-photo-11861459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Theatre",
      link: "/event/3"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl text-white"
              >
                <span className="inline-block px-3 py-1 bg-secondary rounded-full text-sm font-medium mb-4">
                  {slide.category}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                  {slide.subtitle}
                </p>
                <div className="flex space-x-4">
                  <Link 
                    to={slide.link}
                    className="btn btn-primary"
                  >
                    Book Now
                  </Link>
                  <Link 
                    to={slide.link}
                    className="btn bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Add Your Event Button */}
      <div className="absolute bottom-8 right-8 z-30">
        <Link
          to="/add-event"
          className="btn bg-white text-primary hover:bg-gray-100 shadow-lg flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Your Event</span>
        </Link>
      </div>
      
      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-secondary' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;