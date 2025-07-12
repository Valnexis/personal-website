import React from 'react';
import content from '../data/content';
import SectionCard from './SectionCard';
import '../styles/bento.css';
import socials from '../data/social.js';
import SocialCard from "./SocialCard.jsx";

/**
 * BentoBox component that displays a grid layout of content cards and social links
 * 
 * @component
 * @returns {React.ReactElement} A grid layout containing section cards and social cards
 */
const BentoBox = () => {
    return (
        <section 
            className="bento-grid"
            aria-label="Content and Social Links"
        >
            <div className="content-section" role="region" aria-label="Content Cards">
                {content.map((item, index) => (
                    <SectionCard
                        key={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        content={item.content}
                        type={item.type}
                        style={{ animationDelay: `${index * 100}ms` }}
                    />
                ))}
            </div>
            <nav className="social-links" aria-label="Social Media Links">
                {socials.map((social) => (
                    <SocialCard key={social.id} {...social} />
                ))}
            </nav>
        </section>
    );
};

export default BentoBox;
