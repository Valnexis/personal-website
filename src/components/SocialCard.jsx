import React from 'react';
import "../styles/SocialCard.css";

/**
 * SocialCard component for displaying social media links with icons
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.icon - URL or path to the social media icon
 * @param {string} props.url - Link to the social media profile or page
 * @param {string} props.alt - Alternative text for the icon for accessibility
 * @param {string} [props.name] - Name of the social media platform
 * @returns {React.ReactElement} A social media link with an icon
 */
const SocialCard = ({ icon, url, alt, name }) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="social-card"
        aria-label={`Visit my ${name || alt} profile`}
    >
        <img 
            src={icon} 
            alt="" 
            className="social-icon" 
            loading="lazy" 
            aria-hidden="true" 
        />
        <span className="visually-hidden">{name || alt}</span>
    </a>
);

export default SocialCard;
