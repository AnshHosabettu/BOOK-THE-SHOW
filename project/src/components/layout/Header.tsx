import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Film, Music as MusicNote, Ticket, Trophy, User, Plus, LogOut } from 'lucide-react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { supabase } from '../../lib/supabase';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-gradient-to-b from-black/70 to-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo className={`h-10 w-auto ${isScrolled ? 'text-primary' : 'text-white'}`} />
            <span className={`ml-2 font-bold text-xl ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}>BookTheShow</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/movies" className={`flex items-center gap-1 ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary transition-colors`}>
              <Film className="w-4 h-4" />
              <span>Movies</span>
            </Link>
            <Link to="/events" className={`flex items-center gap-1 ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary transition-colors`}>
              <Ticket className="w-4 h-4" />
              <span>Events</span>
            </Link>
            <Link to="/concerts" className={`flex items-center gap-1 ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary transition-colors`}>
              <MusicNote className="w-4 h-4" />
              <span>Concerts</span>
            </Link>
            <Link to="/sports" className={`flex items-center gap-1 ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary transition-colors`}>
              <Trophy className="w-4 h-4" />
              <span>Sports</span>
            </Link>
          </nav>
          
          {/* Search and User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className={`relative ${searchFocused ? 'w-64' : 'w-48'} transition-all duration-300`}>
              <input
                type="text"
                placeholder="Search for events, movies..."
                className={`w-full py-2 pl-10 pr-4 rounded-full text-sm ${
                  isScrolled ? 'bg-gray-100 text-gray-800' : 'bg-white/20 text-white placeholder:text-white/80 backdrop-blur-md'
                } focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <Search className={`absolute left-3 top-2.5 w-4 h-4 ${
                isScrolled ? 'text-gray-500' : 'text-white'
              }`} />
            </div>
            <Link to="/list-your-show">
              <Button 
                variant={isScrolled ? 'primary' : 'outline'} 
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                className={!isScrolled ? 'border-white/30 text-white hover:bg-white/20' : ''}
              >
                List Your Show
              </Button>
            </Link>
            {user ? (
              <div className="relative group">
                <button className={`p-2 rounded-full ${
                  isScrolled ? 'bg-gray-100 text-gray-800' : 'bg-white/20 text-white backdrop-blur-md'
                } hover:bg-primary hover:text-white transition-all`}>
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/auth">
                <Button 
                  variant={isScrolled ? 'primary' : 'outline'} 
                  size="sm"
                  icon={<User className="w-4 h-4" />}
                  className={!isScrolled ? 'border-white/30 text-white hover:bg-white/20' : ''}
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-primary transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 z-50">
          <div className="flex items-center mb-4">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for events, movies..."
              className="w-full py-2 px-4 rounded-full bg-gray-100 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <nav className="flex flex-col space-y-4">
            <Link to="/movies" className="flex items-center text-gray-800 hover:text-primary transition-colors">
              <Film className="w-5 h-5 mr-2" />
              <span>Movies</span>
            </Link>
            <Link to="/events" className="flex items-center text-gray-800 hover:text-primary transition-colors">
              <Ticket className="w-5 h-5 mr-2" />
              <span>Events</span>
            </Link>
            <Link to="/concerts" className="flex items-center text-gray-800 hover:text-primary transition-colors">
              <MusicNote className="w-5 h-5 mr-2" />
              <span>Concerts</span>
            </Link>
            <Link to="/sports" className="flex items-center text-gray-800 hover:text-primary transition-colors">
              <Trophy className="w-5 h-5 mr-2" />
              <span>Sports</span>
            </Link>
            <Link to="/list-your-show" className="flex items-center text-gray-800 hover:text-primary transition-colors">
              <Plus className="w-5 h-5 mr-2" />
              <span>List Your Show</span>
            </Link>
            {user ? (
              <>
                <div className="py-2 border-t border-gray-100">
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-800 hover:text-primary transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link to="/auth" className="flex items-center text-gray-800 hover:text-primary transition-colors">
                <User className="w-5 h-5 mr-2" />
                <span>Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;