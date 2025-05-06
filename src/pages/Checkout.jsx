import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ticket, Clock, Calendar, MapPin, CreditCard, Info, Check, AlertCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(AppContext);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (cart.length === 0 && !success) {
      navigate('/');
    }
  }, [cart, navigate, success]);

  const handleCardInput = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const fees = subtotal * 0.05;
  const total = subtotal + fees;

  const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setCart([]);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">
            Your booking has been confirmed. You will receive an email with your tickets shortly.
          </p>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-primary"
            >
              View My Bookings
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn btn-outline"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Checkout</h1>
          <p className="text-gray-600">Complete your booking</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Summary */}
          <div className="lg:w-2/5 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex border-b border-gray-100 pb-4">
                    <div className="w-20 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                      <img 
                        src={item.event.image} 
                        alt={item.event.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.event.title}</h3>
                      <div className="text-sm text-gray-600 mt-1 space-y-1">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{item.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{item.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{item.event.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Ticket className="h-3 w-3 mr-1" />
                          <span>{item.seats ? item.seats.length : '1'} {item.seats?.length === 1 ? 'ticket' : 'tickets'} • {item.format}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 border-b border-gray-100 pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Fee</span>
                  <span>${fees.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-secondary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Form */}
          <div className="lg:w-3/5 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm p-6 mb-8"
            >
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
              
              <div className="space-y-4 mb-6">
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-secondary">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="h-4 w-4 text-secondary focus:ring-secondary"
                  />
                  <div className="ml-3 flex-1">
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs font-semibold">VISA</span>
                    </div>
                    <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs font-semibold">MC</span>
                    </div>
                    <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs font-semibold">AMEX</span>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-secondary">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="h-4 w-4 text-secondary focus:ring-secondary"
                  />
                  <div className="ml-3 flex-1">
                    <span className="font-medium">PayPal</span>
                  </div>
                  <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-semibold">PP</span>
                  </div>
                </label>
              </div>
              
              {paymentMethod === 'card' && (
                <form onSubmit={handleCheckout}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Information
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="number"
                        placeholder="1234 5678 9012 3456"
                        className="input pl-10 mb-3"
                        value={cardDetails.number}
                        onChange={handleCardInput}
                        required
                      />
                      <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          className="input"
                          value={cardDetails.expiry}
                          onChange={handleCardInput}
                          required
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          className="input"
                          value={cardDetails.cvv}
                          onChange={handleCardInput}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      className="input"
                      value={cardDetails.name}
                      onChange={handleCardInput}
                      required
                    />
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6 flex items-start">
                    <Info className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-yellow-700">
                      For demo purposes, you can use any values for the card information. No actual payment will be processed.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-secondary focus:ring-secondary rounded mt-0.5"
                        required
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        I agree to the <a href="/terms" className="text-secondary hover:underline">Terms of Service</a> and the booking and cancellation policy
                      </span>
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Pay $${total.toFixed(2)}`
                    )}
                  </button>
                </form>
              )}
              
              {paymentMethod === 'paypal' && (
                <div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-start">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      You'll be redirected to PayPal to complete your payment.
                    </p>
                  </div>
                  
                  <button
                    className="btn bg-blue-500 text-white hover:bg-blue-600 w-full"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Redirecting to PayPal...
                      </span>
                    ) : (
                      `Pay with PayPal`
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;