# Theme Toggle Components

This directory contains theme-related components for implementing dark/light mode functionality.

## Components

### ThemeToggle

A compact theme toggle button that displays a sun/moon icon with smooth animations.

```tsx
import { ThemeToggle } from '@/components/ThemeToggle'
;<ThemeToggle className='custom-styles' />
```

### ThemeToggleWithText

A larger theme toggle button that includes text labels and icons.

```tsx
import { ThemeToggleWithText } from '@/components/ThemeToggle'
;<ThemeToggleWithText className='custom-styles' />
```

## Usage with Theme Provider

Make sure your app is wrapped with the `ThemeProvider`:

```tsx
import { ThemeProvider } from '@/provider/themeProvider'

function App() {
  return <ThemeProvider>{/* Your app content */}</ThemeProvider>
}
```

## Hook Usage

Use the `useTheme` hook to access theme state and controls:

```tsx
import { useTheme } from '@/hooks/useTheme'

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme()

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme('dark')}>Force Dark</button>
      <button onClick={() => setTheme('light')}>Force Light</button>
    </div>
  )
}
```

## Features

- 🌓 Automatic system preference detection
- 💾 Persistent theme storage in localStorage
- 🎨 Smooth animations and transitions
- ♿ Full accessibility support
- 📱 Responsive design
- �� TypeScript support
