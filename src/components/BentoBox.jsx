import React from 'react';
import content from '../data/content.js';
import SectionCard  from "./SectionCard.jsx";
import '../styles/bento.css';

const BentoBox = () => {
    return (
        <div className="bento-grid">
            {content.map((item) => (
                <SectionCard key={item.id} title={item.title} content={item.content} />
            ))}
        </div>
    );
};

export default BentoBox;