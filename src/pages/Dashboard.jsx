import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Ticket, Calendar, History, User, Settings, CreditCard, LogOut } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { userData } from '../data/mockData';
import { events } from '../data/mockData';

const Dashboard = () => {
  const { user, setUser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('upcoming');
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Get event details for bookings
  const upcomingBookings = user.bookings.map(booking => {
    const eventDetails = events.find(event => event.id === booking.eventId);
    return { ...booking, event: eventDetails };
  });
  
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="h-20 w-20 bg-primary text-white rounded-full mx-auto flex items-center justify-center mb-4">
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10" />
                  )}
                </div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
              
              <nav className="space-y-1">
                <Link 
                  to="#" 
                  onClick={() => setActiveTab('upcoming')}
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    activeTab === 'upcoming' 
                      ? 'bg-secondary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>Upcoming Bookings</span>
                </Link>
                <Link 
                  to="#" 
                  onClick={() => setActiveTab('history')}
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    activeTab === 'history' 
                      ? 'bg-secondary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <History className="h-5 w-5 mr-3" />
                  <span>Booking History</span>
                </Link>
                <Link 
                  to="#" 
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    activeTab === 'profile' 
                      ? 'bg-secondary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  <span>Profile Settings</span>
                </Link>
                <Link 
                  to="#" 
                  onClick={() => setActiveTab('payment')}
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    activeTab === 'payment' 
                      ? 'bg-secondary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  <span>Payment Methods</span>
                </Link>
                <div className="border-t border-gray-200 my-4"></div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center px-4 py-3 rounded-lg w-full text-left text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm p-6 mb-8"
            >
              {activeTab === 'upcoming' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Upcoming Bookings</h1>
                  
                  {upcomingBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Ticket className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming bookings</h3>
                      <p className="text-gray-600 mb-6">You don't have any upcoming bookings right now.</p>
                      <Link to="/" className="btn btn-primary">
                        Explore Events
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {upcomingBookings.map(booking => (
                        <div 
                          key={booking.id}
                          className="border border-gray-200 rounded-xl overflow-hidden flex flex-col md:flex-row"
                        >
                          <div className="w-full md:w-1/3">
                            <img 
                              src={booking.event.image} 
                              alt={booking.event.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4 flex-1">
                            <h3 className="font-medium text-lg mb-1">{booking.event.title}</h3>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{booking.date} • {booking.time}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-4">
                              <Ticket className="h-4 w-4 mr-1" />
                              <span>Seats: {booking.seats.join(', ')}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                {booking.status}
                              </span>
                              <Link to="#" className="text-secondary text-sm font-medium hover:underline">
                                View Ticket
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'history' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Booking History</h1>
                  <p className="text-gray-600">You have no past bookings to display.</p>
                </div>
              )}
              
              {activeTab === 'profile' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="input"
                          defaultValue={user.name}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="input"
                          defaultValue={user.email}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="input"
                          defaultValue={user.phone}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          className="input"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div>
                      <button type="button" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === 'payment' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Payment Methods</h1>
                  <p className="text-gray-600 mb-6">Add or manage your payment methods.</p>
                  
                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-4">
                          <CreditCard className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">No payment methods added</h3>
                          <p className="text-sm text-gray-600">Add a payment method to book faster</p>
                        </div>
                      </div>
                      <button className="btn btn-outline">
                        Add Method
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;