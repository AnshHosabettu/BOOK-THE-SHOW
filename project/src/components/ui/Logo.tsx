import React from 'react';
import { Ticket } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <Ticket className="w-full h-full transform rotate-12" strokeWidth={2.5} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-current rounded-full" />
      </div>
    </div>
  );
};

export default Logo;