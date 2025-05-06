import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SeatMap = ({ onSeatSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hoveringSeat, setHoveringSeat] = useState(null);
  
  // Generate seat rows and columns
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const columns = Array.from({ length: 16 }, (_, i) => i + 1);
  
  // Predefined unavailable seats
  const unavailableSeats = [
    'A2', 'A3', 'B5', 'B6', 'B7', 'C10', 'C11', 'D14', 'D15',
    'E1', 'E2', 'F8', 'F9', 'G12', 'G13', 'H4', 'H5', 'I7', 'I8', 'J10'
  ];
  
  // Predefined premium seats
  const premiumSeats = [
    'A7', 'A8', 'A9', 'A10',
    'B7', 'B8', 'B9', 'B10',
    'C7', 'C8', 'C9', 'C10',
  ];
  
  const handleSeatClick = (seatId) => {
    if (unavailableSeats.includes(seatId)) return;
    
    setSelectedSeats(prevSeats => {
      if (prevSeats.includes(seatId)) {
        return prevSeats.filter(seat => seat !== seatId);
      } else {
        return [...prevSeats, seatId];
      }
    });
  };
  
  const getSeatStatus = (seatId) => {
    if (selectedSeats.includes(seatId)) return 'selected';
    if (unavailableSeats.includes(seatId)) return 'unavailable';
    if (premiumSeats.includes(seatId)) return 'premium';
    return 'available';
  };
  
  const getSeatClass = (status) => {
    switch (status) {
      case 'selected':
        return 'bg-secondary border-secondary text-white';
      case 'unavailable':
        return 'bg-gray-300 border-gray-300 text-gray-400 cursor-not-allowed';
      case 'premium':
        return 'bg-white border-yellow-500 text-gray-700 hover:bg-yellow-500 hover:text-white';
      default:
        return 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100';
    }
  };
  
  const confirmSelection = () => {
    onSeatSelect(selectedSeats);
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-6">Select Your Seats</h3>
      
      <div className="flex items-center justify-center space-x-4 mb-6">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-white border border-gray-300 mr-2"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-white border border-yellow-500 mr-2"></div>
          <span className="text-sm">Premium</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-secondary border-secondary mr-2"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-gray-300 border-gray-300 mr-2"></div>
          <span className="text-sm">Unavailable</span>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto overflow-x-auto p-4">
        {/* Screen */}
        <div className="relative mb-12">
          <div className="h-6 bg-gray-300 rounded-t-full mx-auto w-3/4 flex items-center justify-center">
            <span className="text-xs text-gray-600">SCREEN</span>
          </div>
          <div className="h-1 bg-gray-400 w-full mt-1"></div>
          <div className="absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-b from-gray-200/50 to-transparent"></div>
        </div>
        
        {/* Seat Map */}
        <div className="grid grid-rows-10 gap-y-2">
          {rows.map((row) => (
            <div key={row} className="flex items-center">
              <div className="w-6 text-center font-medium text-gray-600">{row}</div>
              <div className="grid grid-cols-16 gap-x-1">
                {columns.map((col) => {
                  const seatId = `${row}${col}`;
                  const status = getSeatStatus(seatId);
                  const isCenter = col > 4 && col < 13;
                  
                  return (
                    <motion.button
                      key={`${row}-${col}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-7 h-7 text-xs font-medium rounded-t-md border ${getSeatClass(status)} ${isCenter ? 'mx-0.5' : ''} transition-colors`}
                      onClick={() => handleSeatClick(seatId)}
                      onMouseEnter={() => setHoveringSeat(seatId)}
                      onMouseLeave={() => setHoveringSeat(null)}
                      disabled={status === 'unavailable'}
                    >
                      {col}
                    </motion.button>
                  );
                })}
              </div>
              <div className="w-6 text-center font-medium text-gray-600">{row}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Selected Seats</h4>
              <p className="text-sm text-gray-600 mt-1">
                {selectedSeats.sort().join(', ')}
              </p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={confirmSelection}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatMap;