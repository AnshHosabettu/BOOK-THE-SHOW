import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext({
  selectedTab: '',
  setSelectedTab: () => {},
});

export const Tabs = ({ defaultValue, children, ...props }) => {
  const [selectedTab, setSelectedTab] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className, ...props }) => {
  return (
    <div 
      className={`inline-flex space-x-1 rounded-lg bg-gray-100 p-1 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, children, className, ...props }) => {
  const { selectedTab, setSelectedTab } = useContext(TabsContext);
  
  return (
    <button
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
        selectedTab === value 
          ? 'bg-white text-primary shadow-sm' 
          : 'text-gray-600 hover:text-gray-900'
      } ${className || ''}`}
      onClick={() => setSelectedTab(value)}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, className, ...props }) => {
  const { selectedTab } = useContext(TabsContext);
  
  if (selectedTab !== value) return null;
  
  return (
    <div 
      className={`mt-2 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};