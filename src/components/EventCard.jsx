import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Star } from 'lucide-react';

const EventCard = ({ event }) => {
  const {
    id,
    title,
    image,
    date,
    location,
    category,
    rating,
    price,
  } = event;

  // Generate badge color based on category
  const getBadgeColor = (category) => {
    const colors = {
      movie: 'bg-blue-100 text-blue-800',
      concert: 'bg-purple-100 text-purple-800',
      play: 'bg-yellow-100 text-yellow-800',
      sport: 'bg-green-100 text-green-800',
      comedy: 'bg-pink-100 text-pink-800',
    };
    return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="card group h-full flex flex-col">
      <div className="relative overflow-hidden">
        <Link to={`/event/${id}`}>
          <img 
            src={image} 
            alt={title} 
            className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white font-medium">View Details</span>
          </div>
        </Link>
        <div className="absolute top-3 right-3">
          <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-md flex items-center">
            <Star className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="text-xs font-medium">{rating}/10</span>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`badge ${getBadgeColor(category)}`}>
            {category}
          </span>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/event/${id}`} className="block mb-2">
          <h3 className="font-semibold text-lg leading-tight group-hover:text-secondary transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center mb-1 text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
          <span>{date}</span>
        </div>
        
        <div className="flex items-center mb-3 text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
          <span className="truncate">{location}</span>
        </div>
        
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="font-semibold text-secondary">
            ${price} <span className="text-xs text-gray-500">onwards</span>
          </span>
          <Link 
            to={`/event/${id}`} 
            className="text-sm font-medium text-primary hover:text-secondary transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;