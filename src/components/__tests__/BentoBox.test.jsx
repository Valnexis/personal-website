import React from 'react';
import { render, screen } from '@testing-library/react';
import BentoBox from '../BentoBox';
import DOMPurify from 'dompurify';

// Mock the content and social data
jest.mock('../../data/content', () => [
  {
    id: 'test-1',
    title: 'Test Title 1',
    subtitle: 'Test Subtitle 1',
    content: '<p>Test content 1</p>',
    type: 'regular'
  },
  {
    id: 'test-2',
    title: 'Test Title 2',
    content: '<p>Test content 2</p>',
    type: 'profile'
  }
]);

jest.mock('../../data/social.js', () => [
  {
    id: 'social-1',
    name: 'GitHub',
    url: 'https://github.com/test',
    icon: 'github'
  },
  {
    id: 'social-2',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/test',
    icon: 'linkedin'
  }
]);

// Mock the child components
jest.mock('../SectionCard', () => {
  return function MockSectionCard(props) {
    return (
      <div data-testid="section-card" data-type={props.type}>
        <h2>{props.title}</h2>
        {props.subtitle && <p data-testid="section-subtitle">{props.subtitle}</p>}
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }} />
      </div>
    );
  };
});

jest.mock('../SocialCard.jsx', () => {
  return function MockSocialCard(props) {
    return <div data-testid="social-card" data-name={props.name}>{props.name}</div>;
  };
});

describe('BentoBox Component', () => {
  test('renders the correct number of section cards', () => {
    render(<BentoBox />);

    const sectionCards = screen.getAllByTestId('section-card');
    expect(sectionCards).toHaveLength(2);
  });

  test('renders the correct number of social cards', () => {
    render(<BentoBox />);

    const socialCards = screen.getAllByTestId('social-card');
    expect(socialCards).toHaveLength(2);
  });

  test('renders section cards with correct props', () => {
    render(<BentoBox />);

    expect(screen.getByText('Test Title 1')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle 1')).toBeInTheDocument();
    expect(screen.getByText('Test content 1')).toBeInTheDocument();

    expect(screen.getByText('Test Title 2')).toBeInTheDocument();
    expect(screen.getByText('Test content 2')).toBeInTheDocument();
  });

  test('renders social cards with correct props', () => {
    render(<BentoBox />);

    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });
});
