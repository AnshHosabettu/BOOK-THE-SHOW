import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { EventType } from '../../types';

interface EventCardProps {
  event: EventType;
  variant?: 'default' | 'horizontal';
}

const EventCard: React.FC<EventCardProps> = ({ event, variant = 'default' }) => {
  if (variant === 'horizontal') {
    return (
      <Link 
        to={`/event/${event.id}`}
        className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
      >
        <div className="md:w-1/3 relative aspect-[16/9] md:aspect-auto">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          {event.rating && (
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
              {event.rating}/10
            </div>
          )}
        </div>
        <div className="p-4 md:w-2/3 flex flex-col">
          <div className="mb-auto">
            <div className="flex items-center mb-2">
              <span className="px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-800">
                {event.category}
              </span>
              {event.language && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-800">
                  {event.language}
                </span>
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
          </div>
          
          <div className="flex flex-wrap text-sm text-gray-600">
            <div className="flex items-center mr-4 mb-2">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center mr-4 mb-2">
              <Clock className="w-4 h-4 mr-1" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/event/${event.id}`}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px]"
    >
      <div className="relative aspect-[3/4]">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        {event.rating && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
            {event.rating}/10
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className="px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-800">
            {event.category}
          </span>
          {event.language && (
            <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-800">
              {event.language}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{event.title}</h3>
        
        <div className="flex flex-wrap text-xs text-gray-600">
          <div className="flex items-center mr-3 mb-1.5">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center mb-1.5">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;