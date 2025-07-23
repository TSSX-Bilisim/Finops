import { 
  BarChart3, 
  Package, 
  Users, 
  LogOut, 
  Home,
  PanelRight,
  PanelLeft,
  MoreHorizontal,
  Moon,
  Sun,
  Globe
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router';
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/theme/theme-provider';

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { i18n, t } = useTranslation('common');
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = useMemo(() => [
    { path: '/dashboard', icon: <Home size={18} />, label: t('navigation.dashboard') },
    { path: '/analytics', icon: <BarChart3 size={18} />, label: t('navigation.analytics') },
    { path: '/assets', icon: <Package size={18} />, label: t('navigation.assets') },
    { path: '/team', icon: <Users size={18} />, label: t('navigation.team') }
  ], [t]);

  const toggleTheme = () => {
    if( theme === 'dark' ) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'tr' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    if (!isExpanded) {
      const activeIndex = navItems.findIndex(item => item.path === location.pathname);
      if (activeIndex !== -1) {
        setIndicatorPosition(activeIndex * 48); // Updated spacing for new layout
      }
    }
  }, [location.pathname, navItems, isExpanded]);

  return (
    <aside className={`h-screen px-3 py-9 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}>
      <div 
        className={`h-full flex flex-col py-4 shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.2)] bg-gray-100 dark:bg-neutral-800 border border-gray-300/60 dark:border-transparent justify-between overflow-hidden transition-all duration-300 ${
          isExpanded ? 'rounded-2xl px-4' : 'rounded-2xl items-center'
        }`}
      >
        {/* Logo Section */}
        <div className={`flex ${isExpanded ? 'justify-between items-center' : 'justify-center'} px-2 min-w-0`}>
          {isExpanded ? (
            <>
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div 
                  className="w-10 h-10 bg-gray-300/30 dark:bg-white/10 rounded-full flex items-center justify-center text-gray-800 dark:text-white font-bold text-lg border border-gray-300/40 dark:border-white/20 flex-shrink-0"
                  style={{ backdropFilter: 'blur(10px)' }}
                >
                  K
                </div>
                <span className="text-gray-800 dark:text-white font-semibold text-lg truncate">Kannon</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 transition-all duration-200 cursor-pointer hover:text-gray-800 dark:hover:text-white hover:bg-gray-300/70 dark:hover:bg-white/20"
                title={t('actions.collapseSidebar')}
              >
                <PanelLeft size={16} />
              </button>
            </>
          ) : (
            <div className="relative group">
              <div 
                className="w-10 h-10 bg-gray-300/30 dark:bg-white/10 rounded-full flex items-center justify-center text-gray-800 dark:text-white font-bold text-lg border border-gray-300/40 dark:border-white/20 cursor-pointer transition-all duration-200 group-hover:opacity-0"
                style={{ backdropFilter: 'blur(10px)' }}
                onClick={() => setIsExpanded(true)}
                title={t('actions.expandSidebar')}
              >
                K
              </div>
              <button
                onClick={() => setIsExpanded(true)}
                className="absolute inset-0 w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 transition-all duration-200 cursor-pointer hover:text-gray-800 dark:hover:text-white hover:bg-gray-300/70 dark:hover:bg-white/20 opacity-0 group-hover:opacity-100"
                title={t('actions.expandSidebar')}
              >
                <PanelRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="w-full flex-1 relative flex flex-col items-center justify-center overflow-hidden">
          <div className={`relative w-full flex flex-col items-center min-w-0`}>
            {!isExpanded && (
              <div 
                className="absolute right-0 w-[0.2rem] bg-amber-600 rounded-r-sm transition-all duration-[400ms] ease-out h-10 z-10 top-0"
                style={{ transform: `translateY(${indicatorPosition}px)` }}
              />
            )}
            <div className={`w-full flex flex-col gap-2 items-center min-w-0`}>
              {navItems.map((item, index) => (
                <NavLink 
                  key={index}
                  to={item.path} 
                  className={({ isActive }) => `
                    flex flex-row items-center gap-2 min-w-0
                    bg-transparent border-0 rounded-xl transition-all duration-200 cursor-pointer no-underline relative
                    ${isExpanded ? 'w-full h-10 px-3' : 'w-10 h-10 justify-center'} 
                    ${isActive 
                      ? (isExpanded ? 'text-amber-600 bg-amber-600/10' : 'text-amber-600') 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-white/5'
                    }
                  `}
                >
                  {!isExpanded ? (
                    <span className="flex-shrink-0">{item.icon}</span>
                  ) : (
                    <>
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span className="text-sm font-medium truncate">{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className={`flex ${isExpanded ? 'flex-col gap-2 w-full px-2' : 'flex-col gap-2 items-center w-full'} min-w-0`}>
          {isExpanded ? (
            <>
              {/* Theme Toggle Button */}
              <button 
                onClick={toggleTheme}
                className="w-full h-12 px-3 justify-start gap-3 flex items-center bg-transparent border-0 rounded-xl text-gray-600 dark:text-gray-400 transition-all duration-200 cursor-pointer hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-white/5 min-w-0" 
                title={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
              >
                {theme === 'dark' ? <Moon size={20} className="flex-shrink-0" /> : <Sun size={20} className="flex-shrink-0" />}
                <span className="text-sm font-medium truncate">{theme === 'dark' ? t('theme.dark') : t('theme.light')}</span>
              </button>
              
              {/* Language Toggle Button */}
              <button 
                onClick={toggleLanguage}
                className="w-full h-12 px-3 justify-start gap-3 flex items-center bg-transparent border-0 rounded-xl text-gray-600 dark:text-gray-400 transition-all duration-200 cursor-pointer hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-white/5 min-w-0" 
                title={t('language.change')}
              >
                <Globe size={20} className="flex-shrink-0" />
                <span className="text-sm font-medium truncate">{i18n.language === 'en' ? t('language.english') : t('language.turkish')}</span>
              </button>
            </>
          ) : (
            /* Ellipsis Button (collapsed state) */
            <button 
              onClick={() => setIsExpanded(true)}
              className="w-10 h-10 justify-center flex items-center bg-transparent border-0 rounded-xl text-gray-600 dark:text-gray-400 transition-all duration-200 cursor-pointer hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-white/5" 
              title={t('actions.expandSidebar')}
            >
              <MoreHorizontal size={20} />
            </button>
          )}
          
          {/* Logout Button */}
          <button 
            className={`${isExpanded ? 'w-full h-12 px-3 justify-start gap-3' : 'w-10 h-10 justify-center'} flex items-center bg-transparent border-0 rounded-xl text-gray-600 dark:text-gray-400 transition-all duration-200 cursor-pointer hover:text-red-500 hover:bg-red-100/50 dark:hover:text-red-400 dark:hover:bg-red-500/10 min-w-0`} 
            title={t('actions.logout')}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {isExpanded && <span className="text-sm font-medium truncate">{t('actions.logout')}</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;