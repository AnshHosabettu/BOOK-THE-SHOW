import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronLeft, Info } from 'lucide-react';
import Button from '../components/ui/Button';
import { events, movies } from '../data/mockData';
import { EventType } from '../types';

const Booking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Hardcoded seat map for demo
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
  // Hardcoded unavailable seats for demo
  const unavailableSeats = ['A1', 'A2', 'B5', 'C7', 'C8', 'D9', 'E3', 'F11', 'G8', 'H12'];
  
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
        // Set first available time as selected
        if (foundEvent.availableTimes && foundEvent.availableTimes.length > 0) {
          setSelectedTime(foundEvent.availableTimes[0]);
        }
      }
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const isSeatUnavailable = (row: string, seat: number) => {
    return unavailableSeats.includes(`${row}${seat}`);
  };
  
  const isSeatSelected = (row: string, seat: number) => {
    return selectedSeats.includes(`${row}${seat}`);
  };
  
  const toggleSeat = (row: string, seat: number) => {
    const seatId = `${row}${seat}`;
    if (isSeatUnavailable(row, seat)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(s => s !== seatId) 
        : [...prev, seatId]
    );
  };
  
  const totalAmount = selectedSeats.length * 12; // $12 per seat
  
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
    <div className="pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to={`/event/${event.id}`} className="inline-flex items-center text-gray-600 hover:text-primary mb-4">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Event
          </Link>
          <h1 className="text-3xl font-bold mb-3">{event.title}</h1>
          <div className="flex flex-wrap text-sm text-gray-600 gap-x-6 gap-y-1">
            {event.duration && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5" />
                <span>{event.duration}</span>
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              <span>{selectedDate || event.date}</span>
            </div>
            {selectedTime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5" />
                <span>{selectedTime}</span>
              </div>
            )}
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1.5" />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Dates & Times */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3">
                  {(event.availableDates || []).map((date, index) => (
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
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Time</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {(event.availableTimes || []).map((time, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-lg text-center transition-colors ${
                        selectedTime === time
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Seat Selection */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
              <h3 className="text-lg font-semibold mb-6">Select Seats</h3>
              
              <div className="flex justify-center mb-8">
                <div className="w-3/4 h-4 bg-gray-200 rounded-lg mb-10"></div>
              </div>
              
              <div className="mb-6 max-w-2xl mx-auto">
                {rows.map((row) => (
                  <div key={row} className="flex justify-center mb-2">
                    <div className="w-8 flex items-center justify-center font-medium text-gray-600">
                      {row}
                    </div>
                    <div className="flex gap-1 flex-wrap justify-center">
                      {seats.map((seat) => (
                        <button
                          key={`${row}${seat}`}
                          disabled={isSeatUnavailable(row, seat)}
                          onClick={() => toggleSeat(row, seat)}
                          className={`w-7 h-7 rounded text-xs font-medium flex items-center justify-center transition-colors ${
                            isSeatUnavailable(row, seat)
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : isSeatSelected(row, seat)
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {seat}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-gray-100 mr-2 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-primary mr-2 rounded"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-gray-300 mr-2 rounded"></div>
                  <span>Unavailable</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Booking Summary</h3>
              
              <div className="flex items-start mb-6">
                <div className="w-20 h-28 rounded-md overflow-hidden mr-4 flex-shrink-0">
                  <img 
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-1">{event.title}</h4>
                  <p className="text-sm text-gray-600 mb-1">{event.venue}</p>
                  <p className="text-sm text-gray-600 mb-1">{selectedDate}, {selectedTime}</p>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600 mr-2">Seats:</span>
                    {selectedSeats.length > 0 ? (
                      <span className="font-medium">{selectedSeats.sort().join(', ')}</span>
                    ) : (
                      <span className="text-gray-500 italic">None selected</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Ticket Price</span>
                  <span>$12.00 x {selectedSeats.length}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Convenience Fee</span>
                  <span>$1.50</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-200 mt-3">
                  <span>Total</span>
                  <span>${totalAmount > 0 ? (totalAmount + 1.5).toFixed(2) : '0.00'}</span>
                </div>
              </div>
              
              <button 
                disabled={selectedSeats.length === 0}
                className={`w-full py-3 px-4 rounded-lg text-white text-center font-medium ${
                  selectedSeats.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                Proceed to Payment
              </button>
              
              <div className="mt-4 text-xs text-gray-500 flex items-start">
                <Info className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                <p>
                  By proceeding, you agree to our terms and conditions. Tickets once booked cannot be cancelled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;