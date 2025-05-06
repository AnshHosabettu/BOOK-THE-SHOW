import React from 'react';
import Slider from 'react-slick';
import EventCard from './EventCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedEvents = ({ events }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.2,
          centerMode: true,
          centerPadding: '40px',
        }
      }
    ]
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Featured Events</h2>
            <p className="text-gray-600 mt-1">Trending in your city this week</p>
          </div>
        </div>
        
        <div className="featured-events-slider">
          <Slider {...settings}>
            {events.map((event) => (
              <div key={event.id} className="px-2">
                <EventCard event={event} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;