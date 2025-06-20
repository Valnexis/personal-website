import React from 'react';
import "../styles/SocialCard.css"

const SocialCard = ({ icon, url, alt }) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="social-card"
    >
        <img src={icon} alt={alt} className="social-icon" />
    </a>
);

export default SocialCard;