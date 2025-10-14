import React from 'react';
import "../styles/SocialCard.css"

interface SocialCardProps {
  icon: string;
  url: string;
  alt: string;
}

const SocialCard: React.FC<SocialCardProps> = ({ icon, url, alt }) => (
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