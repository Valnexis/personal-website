import React from 'react';
import '../styles/bento.css';


const SectionCard = ({title, content}) => {
    return (
        <div className="section-card">
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
};

export default SectionCard;