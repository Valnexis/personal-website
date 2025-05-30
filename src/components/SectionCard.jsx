import React from 'react';
import '../styles/SectionCard.css';

const SectionCard = ({ title, subtitle, content, type }) => {
    return (
        <div className={`section-card ${type}`}>
            <div className="section-card-header">
                <h2>{title}</h2>
                {subtitle && <p className="section-subtitle">{subtitle}</p>}
            </div>
            <div
                className="section-card-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

export default SectionCard;