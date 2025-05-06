import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin
} from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121331] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="flex items-center mb-4">
              <Logo className="h-8 w-auto text-primary" />
              <span className="ml-2 font-bold text-xl">BookTheShow</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for booking tickets to the best movies, events, 
              sports, and concerts in your city.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Discover</h3>
            <ul className="space-y-2">
              <li><Link to="/movies" className="text-gray-300 hover:text-primary transition-colors">Movies</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-primary transition-colors">Events</Link></li>
              <li><Link to="/concerts" className="text-gray-300 hover:text-primary transition-colors">Concerts</Link></li>
              <li><Link to="/sports" className="text-gray-300 hover:text-primary transition-colors">Sports</Link></li>
              <li><Link to="/activities" className="text-gray-300 hover:text-primary transition-colors">Activities</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-primary transition-colors">Help & Support</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-300">123 Entertainment Blvd, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-2" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-2" />
                <span className="text-gray-300">info@booktheshow.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} BookTheShow. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-4">
            <Link to="/terms" className="text-gray-400 text-sm hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/faq" className="text-gray-400 text-sm hover:text-primary transition-colors">FAQ</Link>
            <Link to="/sitemap" className="text-gray-400 text-sm hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;