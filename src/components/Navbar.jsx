import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, ChevronDown, LogOut } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user } = useContext(AppContext);
  const location = useLocation();

  const categories = [
    { name: 'Movies', path: '/movies' },
    { name: 'Events', path: '/events' },
    { name: 'Plays', path: '/plays' },
    { name: 'Sports', path: '/sports' },
    { name: 'Activities', path: '/activities' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  location.pathname === category.path ? 'text-secondary' : 'text-gray-700'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search and User Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for movies, events..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>

            {user ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-sm">Hi, {user.name?.split(' ')[0]}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 animate-slide-down">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Bookings
                    </Link>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile Settings
                    </Link>
                    <button 
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden ${isOpen ? 'block' : 'hidden'} bg-white border-t`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search for movies, events..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>

          <nav className="space-y-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className={`block py-2 text-base font-medium ${
                  location.pathname === category.path ? 'text-secondary' : 'text-gray-700'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {!user && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link to="/login" className="btn btn-primary w-full">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-outline w-full mt-2">
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;