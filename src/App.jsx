import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import BentoBox from './components/BentoBox';
import Background from "./components/Background.jsx";
// import Footer from './components/Footer';

const App = () => {
    const [ theme, setTheme ] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    };

    return (
        <>
            <Background theme={theme} />
            <div className="container">
                <button onClick={toggleTheme} style={{
                    position: 'fixed',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#888',
                    color: '#fff',
                    cursor: 'pointer',
                    zIndex: 1000
                }}>
                    {theme === 'light' ? 'Dark' : 'Light'}
                </button>

                <Header />
                <BentoBox />
                {/* <Footer /> */}
            </div>
        </>
    );
};

export default App;