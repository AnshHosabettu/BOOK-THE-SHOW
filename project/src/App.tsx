import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Booking from './pages/Booking';
import ListYourShow from './pages/ListYourShow';
import Auth from './pages/Auth';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/list-your-show" element={<ListYourShow />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;