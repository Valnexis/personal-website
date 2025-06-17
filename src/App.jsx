import React from 'react';
import BentoBox from './components/BentoBox';
import Background from "./components/Background.jsx";
import Greeting from "./components/Greeting.jsx";

const App = () => {
    return (
        <div className="container">
            <Background />
            <Greeting />
            <BentoBox />
        </div>
    );
};

export default App;