import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Check, AlertCircle, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate inputs
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, always succeed
      navigate('/login');
      setLoading(false);
    }, 1500);
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return 0;
    if (password.length < 6) return 1;
    if (password.length < 10) return 2;
    
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    
    if (hasNumber && hasSpecial && hasUppercase) return 4;
    if ((hasNumber && hasSpecial) || (hasNumber && hasUppercase) || (hasSpecial && hasUppercase)) return 3;
    return 2;
  };

  const strengthLevel = getPasswordStrength(formData.password);
  const strengthColor = [
    'bg-gray-200',
    'bg-red-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
  ][strengthLevel];
  
  const strengthLabel = [
    '',
    'Weak',
    'Fair',
    'Good',
    'Strong',
  ][strengthLevel];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="px-8 pt-8 pb-6 text-center">
            <h1 className="text-2xl font-bold text-primary mb-2">Create Account</h1>
            <p className="text-gray-600">Join BookTheShow for the best entertainment experience</p>
          </div>
          
          {error && (
            <div className="mx-8 mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="px-8 pb-8">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="John Doe"
                  required
                />
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="you@example.com"
                  required
                />
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${strengthColor}`} style={{ width: `${strengthLevel * 25}%` }}></div>
                    </div>
                    <span className="ml-2 text-xs font-medium text-gray-600">{strengthLabel}</span>
                  </div>
                  <ul className="text-xs text-gray-500 space-y-1 mt-2">
                    <li className="flex items-center">
                      <span className={`mr-1 ${formData.password.length >= 6 ? 'text-green-500' : 'text-gray-400'}`}>
                        {formData.password.length >= 6 ? <Check className="h-3 w-3" /> : '•'}
                      </span>
                      At least 6 characters
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-1 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}>
                        {/[A-Z]/.test(formData.password) ? <Check className="h-3 w-3" /> : '•'}
                      </span>
                      Uppercase letter
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-1 ${/\d/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}>
                        {/\d/.test(formData.password) ? <Check className="h-3 w-3" /> : '•'}
                      </span>
                      Number
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-secondary focus:ring-secondary rounded mt-0.5"
                  required
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the <a href="/terms" className="text-secondary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-secondary hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>
            
            <div className="mb-6">
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
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
            
            <p className="text-center text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-secondary font-medium hover:underline inline-flex items-center">
                Sign in
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;