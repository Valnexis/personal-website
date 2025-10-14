import React from 'react';
import content from '../data/content';
import SectionCard from './SectionCard';
import '../styles/bento.css'
import socials from '../data/social';
import SocialCard from "./SocialCard";

const BentoBox: React.FC = () => {
    return (
        <div className="bento-grid">
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
            {socials.map((social) => (
                <SocialCard key={social.id} {...social} />
            ))}
        </div>
    );
};

export default BentoBox;