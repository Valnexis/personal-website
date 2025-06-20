import React from 'react';

const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 6) return 'Good Night 🌕';
    if (hour < 12) return 'Good Morning ☀️';
    if (hour < 18) return 'Good Day 👋';
    return 'Good Night 🌕';
};

const Greeting = () => {
    return (
        <div className="greeting">
            <h1>{getGreeting()}</h1>
        </div>
    );
};

export default Greeting;