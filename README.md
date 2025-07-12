# Personal Website

This is a personal website built with React and Vite, featuring a modern bento-box style layout.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/personal-website.git
cd personal-website

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## Testing

This project uses Jest and React Testing Library for testing React components.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

- Tests are located in `__tests__` directories next to the components they test
- Test files use the naming convention `ComponentName.test.jsx` or `ComponentName.test.tsx`
- Mock files for handling imports like images are located in the `__mocks__` directory

### Writing Tests

Example of a component test:

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
```

### Testing Configuration

- Jest configuration is in `jest.config.js`
- Test setup is in `jest.setup.js`
- CSS and image imports are mocked for testing

## Technologies

- React
- TypeScript
- Vite
- Jest
- React Testing Library
