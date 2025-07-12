import React from 'react';
import '../styles/SectionCard.css';
import profilePic from '../assets/profile.jpg';

const SectionCard = ({ title, subtitle, content, type, style }) => {
    if (type === "profile") {
        return (
            <div className="section-card profile-card">
                <div className="profile-content">
                    <img src={profilePic} alt="Profile" className="profile-image" />
                    <div>
                        <h2>{title}</h2>
                        {subtitle && <p className="section-subtitle" data-testid="section-subtitle">{subtitle}</p>}
                        <div
                            className="section-card-content"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`section-card ${type}`} style={style}>
            <div className="section-card-header">
                <h2>{title}</h2>
                {subtitle && <p className="section-subtitle" data-testid="section-subtitle">{subtitle}</p>}
            </div>
            <div
                className="section-card-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

export default SectionCard;
