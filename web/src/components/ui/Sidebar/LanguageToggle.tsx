import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language.split('-')[0]);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'tr' : 'en';
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <button 
      onClick={toggleLanguage} 
      className="flex items-center gap-2 text-white hover:text-gray-300 hover:bg-gray-600 px-3 py-2 rounded transition-colors w-full text-left"
    >
      <Globe size={16} />
      <span className="text-sm">{language}</span>
    </button>
  );
}
