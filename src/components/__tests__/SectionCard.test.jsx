import React from 'react';
import { render, screen } from '@testing-library/react';
import SectionCard from '../SectionCard';

// Mock the profile image import
jest.mock('../assets/profile.jpg', () => 'mocked-profile-image');

describe('SectionCard Component', () => {
  test('renders regular card with title and content', () => {
    render(
      <SectionCard 
        title="Test Title" 
        content="<p>Test content</p>" 
        type="regular"
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('renders subtitle when provided', () => {
    render(
      <SectionCard 
        title="Test Title" 
        subtitle="Test Subtitle"
        content="<p>Test content</p>" 
        type="regular"
      />
    );

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  test('does not render subtitle when not provided', () => {
    render(
      <SectionCard 
        title="Test Title" 
        content="<p>Test content</p>" 
        type="regular"
      />
    );

    expect(screen.queryByTestId('section-subtitle')).not.toBeInTheDocument();
  });

  test('renders profile card with image when type is profile', () => {
    render(
      <SectionCard 
        title="Profile Title" 
        content="<p>Profile content</p>" 
        type="profile"
      />
    );

    expect(screen.getByText('Profile Title')).toBeInTheDocument();
    expect(screen.getByText('Profile content')).toBeInTheDocument();
    expect(screen.getByAltText('Profile')).toBeInTheDocument();
    expect(screen.getByAltText('Profile')).toHaveAttribute('src', 'mocked-profile-image');
  });

  test('applies custom style when provided', () => {
    const customStyle = { backgroundColor: 'red' };

    render(
      <SectionCard 
        title="Styled Card" 
        content="<p>Styled content</p>" 
        type="regular"
        style={customStyle}
      />
    );

    const card = screen.getByText('Styled Card').closest('.section-card');
    expect(card).toHaveStyle('background-color: red');
  });
});
