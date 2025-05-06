import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Calendar, Clock, MapPin, Tag, DollarSign, Info, Image as ImageIcon } from 'lucide-react';

const AddEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    time: '',
    location: '',
    price: '',
    description: '',
    image: null,
  });

  const categories = [
    'Movie',
    'Concert',
    'Theatre',
    'Sports',
    'Comedy',
    'Exhibition',
    'Workshop',
    'Conference',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Add Your Event</h1>
            <p className="text-gray-600 mb-8">Share your event with thousands of potential attendees</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input"
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="input appearance-none pr-10"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map(category => (
                          <option key={category} value={category.toLowerCase()}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <Tag className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="input pl-10"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                      <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="input pl-10"
                        required
                      />
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="input pl-10"
                        required
                      />
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="Enter venue or location"
                      required
                    />
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="input"
                  placeholder="Describe your event..."
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="event-image"
                  />
                  <label
                    htmlFor="event-image"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <ImageIcon className="h-12 w-12 text-gray-400 mb-3" />
                    <span className="text-sm text-gray-600">
                      {formData.image ? formData.image.name : 'Click to upload event image'}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 5MB
                    </span>
                  </label>
                </div>
              </div>

              {/* Guidelines */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Event Guidelines:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Provide accurate and detailed information</li>
                    <li>Upload high-quality images (minimum 1200x800px)</li>
                    <li>Set reasonable pricing for your target audience</li>
                    <li>Review our content policy before submitting</li>
                  </ul>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Upload className="h-4 w-4 mr-2" />
                      Publish Event
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddEvent;