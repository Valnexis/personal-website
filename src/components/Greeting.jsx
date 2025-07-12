import React from 'react';

/**
 * Determines the appropriate greeting based on the time of day
 * 
 * @returns {string} A greeting message with an emoji
 */
const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 6) return 'Good Night 🌕';
    if (hour < 12) return 'Good Morning ☀️';
    if (hour < 18) return 'Good Day 👋';
    return 'Good Night 🌕';
};

/**
 * Greeting component that displays a time-based greeting message
 * 
 * @component
 * @returns {React.ReactElement} A greeting message in a heading
 */
const Greeting = () => {
    const greeting = getGreeting();
    const greetingText = greeting.replace(/[^\w\s]/g, ''); // Remove emojis for aria-label

    return (
        <div className="greeting" role="banner" aria-label={`${greetingText} greeting`}>
            <h1>{greeting}</h1>
        </div>
    );
};

export default Greeting;
