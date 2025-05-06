import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EventCard from '../cards/EventCard';
import { movies, events } from '../../data/mockData';

interface TrendingNowProps {
  title?: string;
  subtitle?: string;
}

const TrendingNow: React.FC<TrendingNowProps> = ({ 
  title = "Trending Now", 
  subtitle = "The hottest picks that everyone's talking about" 
}) => {
  const [activeTab, setActiveTab] = useState('movies');
  const [startIndex, setStartIndex] = useState(0);
  
  const itemsPerPage = 4;
  const currentData = activeTab === 'movies' ? movies : events;
  
  const handleNext = () => {
    if (startIndex + itemsPerPage < currentData.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };
  
  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          
          <div className="flex mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab('movies')}
              className={`px-4 py-2 rounded-l-lg font-medium ${
                activeTab === 'movies'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 rounded-r-lg font-medium ${
                activeTab === 'events'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Events
            </button>
            
            <div className="ml-4 flex space-x-2">
              <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                disabled={startIndex + itemsPerPage >= currentData.length}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentData.slice(startIndex, startIndex + itemsPerPage).map((item) => (
            <EventCard key={item.id} event={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;