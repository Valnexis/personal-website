import React, { useEffect, useState } from 'react';
import BentoBox from './components/BentoBox';
import Background from "./components/Background.jsx";

const App = () => {
    const [ theme ] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className="container">
            <Background theme={theme}/>
            <BentoBox />
        </div>
    );
};

export default App;