// src/context/LanguageContext.js

import React, { createContext, useState, useContext } from 'react';

// Create context
const LanguageContext = createContext();

// Language Provider to wrap the app and provide the context value
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default language is English

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  return useContext(LanguageContext);
};
