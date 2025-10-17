import React from 'react';
import Content from './components/Content.jsx';
import Background from './components/Background.jsx';
import Greeting from './components/Greeting.jsx';

const App = () => {
    return (
        <div className="container">
            <Background />
            <Greeting />
            <Content />
        </div>
    );
};

export default App;
