import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';
import AddEvent from './pages/AddEvent';
import { AppContext } from './context/AppContext';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  return (
    <AppContext.Provider value={{ user, setUser, cart, setCart }}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/add-event" element={<AddEvent />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;