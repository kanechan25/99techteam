import { Counter } from '@/components/Counter/Counter'
import { ThemeToggle, ThemeToggleWithText } from '@/components/ThemeToggle'
import { useTheme } from '@/hooks/useTheme'

export default function Home() {
  const { theme } = useTheme()

  return (
    <div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
      {/* Header with theme toggle */}
      <header className='flex justify-between items-center p-6 border-b border-border'>
        <div>
          <h1 className='text-2xl font-bold text-foreground'>Fancy Form App</h1>
          <p className='text-sm text-muted-foreground mt-1'>
            Current theme: <span className='capitalize font-medium text-foreground'>{theme}</span>
          </p>
        </div>

        {/* Theme Toggle Buttons */}
        <div className='flex items-center gap-3'>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-6 py-8'>
        <div className='space-y-8'>
          {/* Welcome Section */}
          <section className='text-center py-12'>
            <h2 className='text-4xl font-bold text-foreground mb-4'>Welcome to Your App! 🌟</h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Your app now supports both light and dark themes! Try clicking the theme toggle buttons above to switch
              between them. The theme preference is automatically saved to your browser.
            </p>
          </section>

          {/* Counter Component */}
          <section className='bg-muted rounded-lg p-6 transition-colors duration-300'>
            <h3 className='text-xl font-semibold text-foreground mb-4'>Counter Component</h3>
            <Counter />
          </section>
        </div>
      </main>
    </div>
  )
}
