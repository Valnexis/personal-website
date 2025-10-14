import React from 'react';
import BentoBox from './components/BentoBox';
import Background from './components/Background';
import Greeting from './components/Greeting';

const App: React.FC = () => {
    return (
        <div className="container">
            <Background />
            <Greeting />
            <BentoBox />
        </div>
    );
};

export default App;