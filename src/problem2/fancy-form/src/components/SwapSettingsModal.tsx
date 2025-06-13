import { useState } from 'react'

interface SwapSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  slippageTolerance: number
  onSlippageChange: (value: number) => void
  mevProtection: boolean
  onMevProtectionChange: (enabled: boolean) => void
}

export const SwapSettingsModal = ({
  isOpen,
  onClose,
  slippageTolerance,
  onSlippageChange,
  mevProtection,
  onMevProtectionChange,
}: SwapSettingsModalProps) => {
  const [customSlippage, setCustomSlippage] = useState('')

  const presetSlippages = [0.5, 1.0, 5.0]

  const handleCustomSlippageChange = (value: string) => {
    setCustomSlippage(value)
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 50) {
      onSlippageChange(numValue)
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' onClick={onClose} />

      {/* Modal */}
      <div className='relative bg-background border border-border rounded-2xl w-full max-w-md mx-4 shadow-2xl'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-border'>
          <h2 className='text-xl font-semibold text-foreground'>Settings</h2>
          <button onClick={onClose} className='text-muted-foreground hover:text-foreground transition-colors p-1'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M18 6L6 18M6 6L18 18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>

        <div className='p-6 space-y-6'>
          {/* Slippage Tolerance */}
          <div>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-medium text-foreground'>Slippage Tolerance</h3>
              <span className='text-yellow-500 font-semibold'>{slippageTolerance}%</span>
            </div>

            <div className='grid grid-cols-4 gap-2 mb-4'>
              {presetSlippages.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    onSlippageChange(preset)
                    setCustomSlippage('')
                  }}
                  className={`rounded-lg transition-colors ${
                    slippageTolerance === preset && !customSlippage
                      ? 'bg-yellow-500 text-black'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {preset}%
                </button>
              ))}

              <div className='relative'>
                <input
                  type='text'
                  value={customSlippage}
                  onChange={(e) => handleCustomSlippageChange(e.target.value)}
                  placeholder='Custom'
                  className={`w-full py-2 px-3 rounded-lg font-medium transition-colors text-center ${
                    customSlippage && !presetSlippages.includes(slippageTolerance)
                      ? 'bg-yellow-500 text-black'
                      : 'bg-muted text-foreground'
                  } border-none outline-none placeholder-muted-foreground`}
                />
              </div>
            </div>

            <p className='text-sm text-left text-muted-foreground'>
              Your transaction will revert if the price changes unfavorably by more than this percentage.
            </p>
          </div>

          {/* MEV Guard Protection */}
          <div className='border-t border-border pt-6'>
            <div className='flex items-center justify-between mb-3'>
              <div className='flex items-center space-x-3'>
                <div className='p-2 bg-muted rounded-lg'>
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z'
                      fill='currentColor'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='text-lg font-medium text-foreground'>MEV Guard Protection</h3>
                </div>
              </div>

              <button
                onClick={() => onMevProtectionChange(!mevProtection)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  mevProtection ? 'bg-blue-600' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    mevProtection ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <p className='text-sm text-left text-muted-foreground'>
              Enables protection against MEV attacks like front-running and sandwich attacks by routing transactions
              through protected RPC.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
