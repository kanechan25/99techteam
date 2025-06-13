import { ThemeToggle } from '@/components/ThemeToggle'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const Header = () => {
  return (
    <header className='flex justify-between items-center p-6 border-b border-border'>
      <div>
        <h1 className='text-2xl font-bold text-foreground'>Fancy Form</h1>
        <div className='text-sm text-muted-foreground mt-1'>
          <span className='capitalize font-medium text-foreground'>Currency Swap</span>
        </div>
      </div>

      {/* Connect Wallet and Theme Toggle Buttons */}
      <div className='flex items-center gap-3'>
        <ThemeToggle />
        <ConnectButton />
      </div>
    </header>
  )
}
