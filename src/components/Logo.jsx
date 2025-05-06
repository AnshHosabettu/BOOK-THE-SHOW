import React from 'react';
import { Ticket } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center justify-center rounded-lg h-8 w-8 bg-secondary text-white">
        <Ticket className="h-5 w-5" />
      </div>
      <span className="font-bold text-xl text-primary">
        Book<span className="text-secondary">The</span>Show
      </span>
    </div>
  );
};

export default Logo;