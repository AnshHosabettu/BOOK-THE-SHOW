import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Star, Share2, Heart, Play, Users } from 'lucide-react';
import Booking from '../components/EventDetails/Booking';
import SeatMap from '../components/EventDetails/SeatMap';
import { events } from '../data/mockData';
import { AppContext } from '../context/AppContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, setCart } = useContext(AppContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showSeatMap, setShowSeatMap] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    // Simulate loading the event
    setLoading(true);
    setTimeout(() => {
      const foundEvent = events.find(e => e.id === parseInt(id));
      if (foundEvent) {
        setEvent(foundEvent);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBookNow = (details) => {
    setBookingDetails(details);
    setShowSeatMap(true);
  };

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
    
    // Add to cart
    const bookingItem = {
      id: Date.now(),
      event: event,
      date: bookingDetails.date,
      time: bookingDetails.time,
      format: bookingDetails.format,
      seats: seats,
      price: event.price * seats.length
    };
    
    setCart([...cart, bookingItem]);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the event you're looking for.</p>
          <button 
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container mx-auto px-4 pb-8 lg:pb-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between">
              <div className="text-white max-w-4xl">
                <span className="inline-block px-3 py-1 bg-secondary text-white text-sm font-medium rounded-full mb-4">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">{event.title}</h1>
                <div className="flex flex-wrap items-center text-sm lg:text-base gap-x-6 gap-y-2 text-white/90 mt-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span>{event.rating}/10</span>
                  </div>
                  {event.duration && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{event.duration}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex mt-6 lg:mt-0 space-x-3">
                {event.trailerUrl && (
                  <button 
                    className="btn bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                    onClick={() => setShowTrailer(true)}
                  >
                    <Play className="h-4 w-4 mr-2" fill="white" />
                    Watch Trailer
                  </button>
                )}
                <button className="btn bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                  <Heart className="h-4 w-4 mr-2" />
                  Favorite
                </button>
                <button className="btn bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm p-6 mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.director && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Director</h3>
                    <p className="text-gray-700">{event.director}</p>
                  </div>
                )}
                
                {event.cast && event.cast.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Cast</h3>
                    <p className="text-gray-700">{event.cast.join(', ')}</p>
                  </div>
                )}
                
                {event.artists && event.artists.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Artists</h3>
                    <p className="text-gray-700">{event.artists.join(', ')}</p>
                  </div>
                )}
                
                {event.languages && event.languages.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.languages.map(language => (
                        <span 
                          key={language} 
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            
            {showSeatMap && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm p-6 mb-8"
              >
                <SeatMap onSeatSelect={handleSeatSelect} />
              </motion.div>
            )}
            
            {/* Similar Events */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {events
                  .filter(e => e.category === event.category && e.id !== event.id)
                  .slice(0, 4)
                  .map(similarEvent => (
                    <motion.div 
                      key={similarEvent.id}
                      whileHover={{ y: -5 }}
                    >
                      <EventCard event={similarEvent} />
                    </motion.div>
                  ))
                }
              </div>
            </div>
          </div>
          
          <div className="lg:w-80">
            <div className="sticky top-24">
              <Booking event={event} onBookNow={handleBookNow} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Trailer Modal */}
      {showTrailer && event.trailerUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
            <button 
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={() => setShowTrailer(false)}
            >
              <X className="h-6 w-6" />
            </button>
            <div className="aspect-video">
              <iframe
                src={`${event.trailerUrl.replace('watch?v=', 'embed/')}?autoplay=1`}
                title={`${event.title} Trailer`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;