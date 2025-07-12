import React from 'react';
import { useTheme } from '../hooks';

/**
 * A simple component that demonstrates the use of the useTheme hook
 * by providing a button to toggle between light and dark themes.
 * 
 * @returns {React.ReactElement} A button that toggles the theme
 */
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const buttonText = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  const buttonIcon = theme === 'dark' ? '☀️' : '🌙';

  return (
    <button 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '8px 16px',
        backgroundColor: theme === 'dark' ? '#444' : '#f0f0f0', // Darker background for better contrast
        color: theme === 'dark' ? '#fff' : '#222', // Darker text for better contrast
        border: '1px solid',
        borderColor: theme === 'dark' ? '#666' : '#ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        zIndex: 1000,
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
      }}
    >
      <span aria-hidden="true">{buttonIcon}</span> {buttonText}
    </button>
  );
};

export default ThemeToggle;
