import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

/**
 * Custom hook for managing theme state
 * 
 * @param {Theme} initialTheme - The initial theme to use (defaults to 'light')
 * @returns {Object} An object containing the current theme and functions to change it
 */
export const useTheme = (initialTheme: Theme = 'light') => {
  // Try to get the theme from localStorage, otherwise use the initialTheme
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || initialTheme;
  });

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // You could also update CSS variables or class names on the document/body here
    // document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark'
  };
};

export default useTheme;