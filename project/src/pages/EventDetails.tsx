import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Share2, Heart, Star, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { events, movies } from '../data/mockData';
import { EventType } from '../types';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundEvent = [...events, ...movies].find(e => e.id === id);
      if (foundEvent) {
        setEvent(foundEvent);
        // Set first available date as selected
        if (foundEvent.availableDates && foundEvent.availableDates.length > 0) {
          setSelectedDate(foundEvent.availableDates[0]);
        }
      }
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 px-4">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <p className="text-gray-600 mb-6">Sorry, the event you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <div 
        className="relative h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${event.image})` 
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <div className="text-white max-w-3xl">
            <div className="flex items-center mb-3 gap-2">
              <span className="px-2 py-0.5 bg-primary/80 text-white text-xs uppercase rounded-full">
                {event.category}
              </span>
              {event.language && (
                <span className="px-2 py-0.5 bg-black/50 text-white text-xs uppercase rounded-full">
                  {event.language}
                </span>
              )}
              {event.rating && (
                <div className="flex items-center bg-black/50 text-white text-xs rounded-full px-2 py-0.5">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{event.rating}/10</span>
                </div>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{event.title}</h1>
            <div className="flex flex-wrap text-sm md:text-base text-white/90 gap-x-6 gap-y-1 mb-6">
              {event.duration && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span>{event.duration}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1.5" />
                <span>{event.venue}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={`/booking/${event.id}`}>
                <Button size="lg">Book Tickets</Button>
              </Link>
              <button className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-black/30 text-white border border-white/30 hover:bg-black/50 transition-colors">
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </button>
              <button className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-black/30 text-white border border-white/30 hover:bg-black/50 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 mb-6">
                {event.description || 'No description available.'}
              </p>
              
              {event.cast && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Cast</h3>
                  <div className="flex flex-wrap gap-4">
                    {event.cast.map((person, index) => (
                      <div key={index} className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-300 mb-2 overflow-hidden">
                          <img 
                            src={person.image || `https://ui-avatars.com/api/?name=${person.name}&background=random`} 
                            alt={person.name}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <span className="text-sm font-medium">{person.name}</span>
                        <span className="text-xs text-gray-600">{person.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {event.crew && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Crew</h3>
                  <div className="flex flex-wrap gap-4">
                    {event.crew.map((person, index) => (
                      <div key={index} className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-300 mb-2 overflow-hidden">
                          <img 
                            src={person.image || `https://ui-avatars.com/api/?name=${person.name}&background=random`} 
                            alt={person.name}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <span className="text-sm font-medium">{person.name}</span>
                        <span className="text-xs text-gray-600">{person.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Reviews */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <Link to="#" className="text-primary hover:text-primary/80 font-medium flex items-center">
                  View All <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-6">
                {(event.reviews || []).slice(0, 3).map((review, index) => (
                  <div key={index} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 mr-4">
                        <img 
                          src={review.avatarUrl || `https://ui-avatars.com/api/?name=${review.name}`} 
                          alt={review.name}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h4 className="font-medium mr-2">{review.name}</h4>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{review.date}</p>
                        <p className="text-gray-800">{review.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {(!event.reviews || event.reviews.length === 0) && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
                    <Button className="mt-4" variant="outline">Write a Review</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Available Dates */}
            {event.availableDates && event.availableDates.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                <div className="grid grid-cols-3 gap-3">
                  {event.availableDates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`py-2 px-3 rounded-lg text-center transition-colors ${
                        selectedDate === date
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="text-xs uppercase font-medium">{date.split(' ')[0]}</div>
                      <div className="text-lg font-semibold">{date.split(' ')[1]}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Available Times */}
            {selectedDate && event.availableTimes && (
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-4">Select Time</h3>
                <div className="grid grid-cols-3 gap-3">
                  {event.availableTimes.map((time, index) => (
                    <button
                      key={index}
                      className="py-2 px-3 rounded-lg text-center bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Venue Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <h3 className="text-lg font-semibold mb-4">Venue Information</h3>
              <div className="flex items-start mb-4">
                <MapPin className="w-5 h-5 text-primary mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">{event.venue}</h4>
                  <p className="text-gray-600 text-sm">123 Event Road, City, Country</p>
                </div>
              </div>
              
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-4">
                <img 
                  src="https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Venue Map"
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <button className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center">
                Get Directions
              </button>
            </div>
            
            {/* Share & Socials */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Share Event</h3>
              <div className="flex space-x-2">
                <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-13.995 0-.21 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#E60023] text-white flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"></path>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;