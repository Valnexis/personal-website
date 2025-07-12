import React from 'react';
import { useWindowSize } from '../hooks';

/**
 * A simple component that demonstrates the use of the useWindowSize hook
 * by displaying the current window dimensions and adapting its appearance
 * based on the window size.
 * 
 * @returns {React.ReactElement} A component that displays window size information
 */
const ResponsiveInfo: React.FC = () => {
  const { width, height } = useWindowSize();

  // Determine device type based on width
  const getDeviceType = () => {
    if (width < 768) return 'Mobile';
    if (width < 1024) return 'Tablet';
    return 'Desktop';
  };

  return (
    <aside
      aria-label="Responsive Information"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        padding: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Increased opacity for better contrast
        color: 'white',
        borderRadius: '4px',
        fontSize: width < 768 ? '12px' : '14px',
        zIndex: 1000,
        boxShadow: '0 0 5px rgba(255, 255, 255, 0.2)' // Added shadow for better visibility
      }}
    >
      <div role="status" aria-live="polite">
        <p>Window Size: {width} x {height}</p>
        <p>Device Type: {getDeviceType()}</p>
        <p>
          {width < 768 ? (
            <strong>Mobile view active</strong>
          ) : width < 1024 ? (
            <strong>Tablet view active</strong>
          ) : (
            <strong>Desktop view active</strong>
          )}
        </p>
      </div>
    </aside>
  );
};

export default ResponsiveInfo;
