import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

const SearchFilters = ({ 
  onApplyFilters, 
  showMobileFilters, 
  setShowMobileFilters 
}) => {
  const [filters, setFilters] = useState({
    categories: [],
    languages: [],
    formats: [],
    price: { min: 0, max: 500 },
  });

  const categories = [
    'Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 'Sci-Fi', 'Horror', 'Adventure'
  ];
  
  const languages = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean', 'Hindi'
  ];
  
  const formats = ['2D', '3D', '4DX', 'IMAX', 'Dolby Atmos'];

  const toggleCategory = (category) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return { ...prev, categories: newCategories };
    });
  };

  const toggleLanguage = (language) => {
    setFilters(prev => {
      const newLanguages = prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language];
      
      return { ...prev, languages: newLanguages };
    });
  };

  const toggleFormat = (format) => {
    setFilters(prev => {
      const newFormats = prev.formats.includes(format)
        ? prev.formats.filter(f => f !== format)
        : [...prev.formats, format];
      
      return { ...prev, formats: newFormats };
    });
  };

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      price: { ...prev.price, [type]: value }
    }));
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    if (setShowMobileFilters) setShowMobileFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      languages: [],
      formats: [],
      price: { min: 0, max: 500 },
    });
  };

  const FilterSection = ({ title, children }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </div>
      {children}
    </div>
  );

  const content = (
    <div className="space-y-6">
      <FilterSection title="Categories">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.categories.includes(category)
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Languages">
        <div className="space-y-2">
          {languages.map(language => (
            <div key={language} className="flex items-center">
              <input
                type="checkbox"
                id={`language-${language}`}
                checked={filters.languages.includes(language)}
                onChange={() => toggleLanguage(language)}
                className="h-4 w-4 text-secondary focus:ring-secondary rounded"
              />
              <label htmlFor={`language-${language}`} className="ml-2 text-sm text-gray-700">
                {language}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Format">
        <div className="flex flex-wrap gap-2">
          {formats.map(format => (
            <button
              key={format}
              onClick={() => toggleFormat(format)}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.formats.includes(format)
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {format}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">${filters.price.min}</span>
            <span className="text-sm text-gray-500">${filters.price.max}</span>
          </div>
          <input
            type="range"
            min="0"
            max="500"
            value={filters.price.max}
            onChange={(e) => handlePriceChange(e, 'max')}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </FilterSection>
      
      <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
        <button
          onClick={clearFilters}
          className="text-gray-600 text-sm hover:text-secondary"
        >
          Clear All
        </button>
        <button
          onClick={applyFilters}
          className="btn btn-primary flex-1"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm p-6 w-72">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-xl">Filters</h2>
          <button onClick={clearFilters} className="text-gray-500 hover:text-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>
        {content}
      </div>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-2xl p-6 w-full h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-xl">Filters</h2>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="text-gray-500 hover:text-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchFilters;