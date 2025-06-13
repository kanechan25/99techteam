import { ThemeToggle } from '@/components/ThemeToggle'
import { useTheme } from '@/hooks/useTheme'

export const Header = () => {
  const { theme } = useTheme()

  return (
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
  )
}
