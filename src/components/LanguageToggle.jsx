import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 bg-primary text-white rounded-full text-sm font-medium"
    >
      {language === 'id' ? 'EN' : 'ID'}
    </button>
  );
};

export default LanguageToggle;