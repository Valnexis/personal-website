# Custom React Hooks

This directory contains reusable React hooks that can be used across the application.

## Available Hooks

### useTheme

A hook for managing theme state (light/dark) with localStorage persistence.

```tsx
import { useTheme } from '../hooks';

const MyComponent = () => {
  const { theme, setTheme, toggleTheme, isLight, isDark } = useTheme();
  
  return (
    <div className={theme}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </div>
  );
};
```

#### Returns

- `theme`: The current theme ('light' or 'dark')
- `setTheme`: Function to set the theme directly
- `toggleTheme`: Function to toggle between light and dark themes
- `isLight`: Boolean indicating if the current theme is light
- `isDark`: Boolean indicating if the current theme is dark

### useWindowSize

A hook for tracking window dimensions, useful for responsive components.

```tsx
import { useWindowSize } from '../hooks';

const MyResponsiveComponent = () => {
  const { width, height } = useWindowSize();
  
  return (
    <div>
      <p>Window dimensions: {width} x {height}</p>
      {width < 768 ? (
        <p>Mobile view</p>
      ) : (
        <p>Desktop view</p>
      )}
    </div>
  );
};
```

#### Returns

- `width`: The current window width in pixels
- `height`: The current window height in pixels

## Usage Examples

For complete usage examples, see:

- `ThemeToggle.tsx`: Demonstrates the useTheme hook
- `ResponsiveInfo.tsx`: Demonstrates the useWindowSize hook
- `Background.tsx`: Demonstrates using useWindowSize for canvas dimensions