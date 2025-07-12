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

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment.

### Workflow

The CI/CD pipeline automatically:
1. Runs linting checks
2. Performs type checking
3. Executes all tests
4. Builds the application
5. Deploys to GitHub Pages (only on pushes to main/master branches)

### Triggers

The pipeline is triggered on:
- Push to main/master branches
- Pull requests to main/master branches
- Manual trigger via GitHub Actions interface

### Viewing Results

You can view the CI/CD pipeline results in the Actions tab of the GitHub repository.

## Performance Optimizations

### Code Splitting

This project implements code splitting using React.lazy() and Suspense to reduce the initial bundle size and improve loading performance. Components that are not critical for the initial render are loaded lazily:

```jsx
import React, { Suspense, lazy } from 'react';

// Lazy load components
const Background = lazy(() => import("./components/Background.jsx"));
const BentoBox = lazy(() => import('./components/BentoBox'));

// Use with Suspense
<Suspense fallback={<LoadingComponent />}>
  <Background />
</Suspense>
```

Benefits of this approach:
- Smaller initial bundle size
- Faster initial page load
- Components load only when needed
- Better user experience, especially on slower connections

## Technologies

- React
- TypeScript
- Vite
- Jest
- React Testing Library
- GitHub Actions
