import React from 'react';

export default function PersonSelector({ value, onChange }) {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <label style={{ marginRight: '0.5rem' }}>Choose person:</label>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="person1">You (Person 1)</option>
                <option value="person2">Person 2</option>
                <option value="person3">Person 3</option>
            </select>
        </div>
    );
}

