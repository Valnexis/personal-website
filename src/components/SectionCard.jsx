import React from 'react';
import '../styles/SectionCard.css';
import profilePic from '../assets/profile.jpg';
import { addLazyLoadingToImages } from '../utils/lazyLoadUtils';

/**
 * SectionCard component for displaying content in a styled card format
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the section card
 * @param {string} [props.subtitle] - Optional subtitle for the section card
 * @param {string} props.content - HTML content to be displayed in the card
 * @param {string} props.type - Type of card to display (e.g., "profile" for profile card)
 * @param {Object} [props.style] - Optional custom styles to apply to the card
 * @returns {React.ReactElement} A section card component
 */
const SectionCard = ({ title, subtitle, content, type, style }) => {
    if (type === "profile") {
        return (
            <article className="section-card profile-card">
                <div className="profile-content">
                    <img 
                        src={profilePic} 
                        alt={`Profile photo of ${title}`} 
                        className="profile-image" 
                        loading="lazy" 
                    />
                    <div>
                        <h2 id={`section-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>{title}</h2>
                        {subtitle && <p className="section-subtitle" data-testid="section-subtitle">{subtitle}</p>}
                        <div
                            className="section-card-content"
                            dangerouslySetInnerHTML={{ __html: addLazyLoadingToImages(content) }}
                            aria-labelledby={`section-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
                        />
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article 
            className={`section-card ${type}`} 
            style={style}
        >
            <div className="section-card-header">
                <h2 id={`section-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>{title}</h2>
                {subtitle && <p className="section-subtitle" data-testid="section-subtitle">{subtitle}</p>}
            </div>
            <div
                className="section-card-content"
                dangerouslySetInnerHTML={{ __html: addLazyLoadingToImages(content) }}
                aria-labelledby={`section-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
            />
        </article>
    );
};

export default SectionCard;
