import React, { Suspense, lazy } from 'react';
import Greeting from "./components/Greeting.jsx";
import ThemeToggle from './components/ThemeToggle';
import ResponsiveInfo from './components/ResponsiveInfo';

// Lazy load components that are not critical for initial render
const Background = lazy(() => import("./components/Background.jsx"));
const BentoBox = lazy(() => import('./components/BentoBox'));

// Fallback components for when lazy components are loading
/**
 * Empty fallback component for the Background
 * 
 * @component
 * @returns {null} Returns null as there's no visual fallback needed
 */
const BackgroundFallback = () => null;

/**
 * Fallback component displayed while BentoBox is loading
 * 
 * @component
 * @returns {React.ReactElement} A loading indicator for the BentoBox
 */
const BentoBoxFallback = () => <div className="bento-grid-loading" aria-live="polite">Loading content...</div>;

/**
 * Skip to content link component for accessibility
 * 
 * @component
 * @returns {React.ReactElement} A skip to content link
 */
const SkipToContent = () => (
  <a 
    href="#main-content" 
    className="skip-link"
    style={{
      position: 'absolute',
      top: '-40px',
      left: 0,
      padding: '8px',
      backgroundColor: '#fff',
      zIndex: 1001,
      transition: 'top 0.3s',
      ':focus': {
        top: 0,
      }
    }}
  >
    Skip to content
  </a>
);

/**
 * Main application component that orchestrates the layout and lazy-loaded components
 * 
 * @component
 * @returns {React.ReactElement} The complete application UI
 */
const App = () => {
    return (
        <div className="container">
            <SkipToContent />
            <Suspense fallback={<BackgroundFallback />}>
                <Background />
            </Suspense>
            <ThemeToggle />
            <ResponsiveInfo />
            <header>
                <Greeting />
            </header>
            <main id="main-content">
                <Suspense fallback={<BentoBoxFallback />}>
                    <BentoBox />
                </Suspense>
            </main>
        </div>
    );
};

export default App;
