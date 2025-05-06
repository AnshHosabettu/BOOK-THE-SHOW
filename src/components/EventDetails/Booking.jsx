import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Clock, Users } from 'lucide-react';

const Booking = ({ event, onBookNow }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(2);

  // Sample event showtimes
  const times = ['10:00 AM', '1:30 PM', '4:15 PM', '7:00 PM', '9:45 PM'];
  const formats = ['2D', '3D', 'IMAX', '4DX'];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleFormatSelection = (format) => {
    setSelectedFormat(format);
  };

  const handleSeatChange = (e) => {
    setSelectedSeats(parseInt(e.target.value, 10));
  };

  const handleBooking = () => {
    if (!selectedTime || !selectedFormat) {
      return;
    }
    
    onBookNow({
      date: selectedDate,
      time: selectedTime,
      format: selectedFormat,
      seats: selectedSeats,
      price: event.price * selectedSeats
    });
  };

  const isSelectionComplete = selectedDate && selectedTime && selectedFormat && selectedSeats > 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      <h3 className="text-xl font-semibold mb-6">Book Tickets</h3>
      
      {/* Date Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-secondary" />
          Select Date
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          className="input"
          dateFormat="MMMM d, yyyy"
        />
      </div>
      
      {/* Time Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Clock className="w-4 h-4 mr-2 text-secondary" />
          Select Time
        </label>
        <div className="grid grid-cols-3 gap-2">
          {times.map((time) => (
            <button
              key={time}
              className={`py-2 px-4 text-sm rounded-lg transition ${
                selectedTime === time
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleTimeSelection(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      {/* Format Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Format
        </label>
        <div className="flex space-x-2">
          {formats.map((format) => (
            <button
              key={format}
              className={`py-2 px-4 text-sm rounded-lg transition flex-1 ${
                selectedFormat === format
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleFormatSelection(format)}
            >
              {format}
            </button>
          ))}
        </div>
      </div>
      
      {/* Number of Seats */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Users className="w-4 h-4 mr-2 text-secondary" />
          Number of Seats
        </label>
        <div className="flex items-center">
          <button
            className="h-10 w-10 rounded-l-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            onClick={() => selectedSeats > 1 && setSelectedSeats(selectedSeats - 1)}
          >
            -
          </button>
          <input
            type="number"
            className="h-10 w-16 border-y border-gray-300 text-center"
            value={selectedSeats}
            onChange={handleSeatChange}
            min="1"
            max="10"
          />
          <button
            className="h-10 w-10 rounded-r-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            onClick={() => selectedSeats < 10 && setSelectedSeats(selectedSeats + 1)}
          >
            +
          </button>
        </div>
      </div>
      
      {/* Price Summary */}
      <div className="border-t border-gray-100 pt-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Ticket Price</span>
          <span>${event.price} x {selectedSeats}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Booking Fee</span>
          <span>${(event.price * selectedSeats * 0.05).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-2">
          <span>Total</span>
          <span className="text-secondary">
            ${(event.price * selectedSeats * 1.05).toFixed(2)}
          </span>
        </div>
      </div>
      
      <button
        className={`btn w-full ${
          isSelectionComplete ? 'btn-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        onClick={handleBooking}
        disabled={!isSelectionComplete}
      >
        Book Now
      </button>
    </div>
  );
};

export default Booking;