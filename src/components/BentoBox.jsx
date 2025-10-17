import React, { useEffect, useState } from 'react';
import SectionCard from './SectionCard';
import '../styles/bento.css';
import socials from '../data/social.js';
import SocialCard from './SocialCard.jsx';

const BentoBox = ({ personId = 'person1' }) => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const fetchContent = async () => {
            console.log('Fetching content from backend...', API_BASE + `/api/content?person_id=${personId}`);
            try {
                const response = await fetch(`${API_BASE}/api/content?person_id=${personId}`);
                console.log('Raw response:', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const contentType = response.headers.get('Content-Type') || '';
                if (contentType.includes('application/json')) {
                    const data = await response.json();
                    console.log('Parsed data:', data);
                    setContent(data);
                } else {
                    const rawText = await response.text();
                    console.error('Unexpected response format:', rawText);
                    throw new Error('Response is not JSON');
                }
            } catch (error) {
                console.error('Error fetching content:', error);
                setContent([]);
            }
        };

        fetchContent();
    }, [personId]);

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