import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Token } from '@/stores/tokens'
import { useSwapStore } from '@/stores/swap'
import { useSwapDefaults } from '@/hooks/useSwapDefaults'
import { TokenSelectModal } from './TokenSelectModal'
import { SwapSettingsModal } from './SwapSettingsModal'
import { formatNumberInput, isValidAmount, formatDisplayAmount } from '@/utils/validation'

interface SwapFormProps {
  tokens: Token[]
}

export const SwapForm = ({ tokens }: SwapFormProps) => {
  useSwapDefaults(tokens)
  const {
    inputToken,
    outputToken,
    inputAmount,
    outputAmount,
    status,
    isLoading,
    slippageTolerance,
    mevProtection,
    setInputToken,
    setOutputToken,
    setInputAmount,
    setOutputAmount,
    setStatus,
    setLoading,
    setSlippageTolerance,
    setMevProtection,
    swapTokens,
    resetSwap,
  } = useSwapStore()

  const [showInputTokenModal, setShowInputTokenModal] = useState(false)
  const [showOutputTokenModal, setShowOutputTokenModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [lastChangedSide, setLastChangedSide] = useState<'input' | 'output'>('input')
  const mockBalance = 1

  // Calculate amounts when input changes (bidirectional)
  useEffect(() => {
    if (inputToken && outputToken) {
      // Only calculate if there's a valid amount on the changed side
      const hasInputAmount = inputAmount !== '' && !isNaN(parseFloat(inputAmount))
      const hasOutputAmount = outputAmount !== '' && !isNaN(parseFloat(outputAmount))

      if (lastChangedSide === 'input' && hasInputAmount) {
        setStatus('finalizing')
        setLoading(true)

        // Calculate output from input
        const timeout = setTimeout(() => {
          const inputValue = parseFloat(inputAmount)
          const exchangeRate = inputToken.price / outputToken.price
          const outputValue = inputValue * exchangeRate

          setOutputAmount(parseFloat(outputValue.toFixed(6)).toString())
          setStatus('ready')
          setLoading(false)
        }, 500)

        return () => clearTimeout(timeout)
      } else if (lastChangedSide === 'output' && hasOutputAmount) {
        setStatus('finalizing')
        setLoading(true)

        // Calculate input from output
        const timeout = setTimeout(() => {
          const outputValue = parseFloat(outputAmount)
          const exchangeRate = outputToken.price / inputToken.price
          const inputValue = outputValue * exchangeRate

          setInputAmount(parseFloat(inputValue.toFixed(6)).toString())
          setStatus('ready')
          setLoading(false)
        }, 500)

        return () => clearTimeout(timeout)
      } else if (!hasInputAmount && !hasOutputAmount) {
        setStatus('idle')
      }
    } else {
      if (lastChangedSide === 'input') {
        setOutputAmount('')
      } else {
        setInputAmount('')
      }
      setStatus('idle')
    }
  }, [
    inputToken,
    outputToken,
    inputAmount,
    outputAmount,
    lastChangedSide,
    setInputAmount,
    setOutputAmount,
    setStatus,
    setLoading,
  ])

  const handleInputAmountChange = (value: string) => {
    const formatted = formatNumberInput(value)
    setInputAmount(formatted)
    setLastChangedSide('input')
  }

  const handleOutputAmountChange = (value: string) => {
    const formatted = formatNumberInput(value)
    setOutputAmount(formatted)
    setLastChangedSide('output')
  }

  const handleMaxClick = (side: 'input' | 'output') => {
    // Simulate max balance - using a mock value
    if (side === 'input') {
      setInputAmount(mockBalance.toFixed(2).toString())
      setLastChangedSide('input')
    } else {
      setOutputAmount(mockBalance.toFixed(2).toString())
      setLastChangedSide('output')
    }
  }

  const handleSwap = async () => {
    if (!inputToken || !outputToken) {
      toast.error('Please select both tokens')
      return
    }

    if (!isValidAmount(inputAmount) && !isValidAmount(outputAmount)) {
      toast.error('Please enter a valid amount')
      return
    }

    setStatus('swapping')
    setLoading(true)

    try {
      // Simulate swap transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setStatus('success')
      const displayInputAmount = formatDisplayAmount(inputAmount, 4)
      const displayOutputAmount = formatDisplayAmount(outputAmount, 4)
      toast.success(
        `Successfully swapped ${displayInputAmount} ${inputToken.currency} for ${displayOutputAmount} ${outputToken.currency}`,
      )

      // Reset after success
      setTimeout(() => {
        resetSwap()
      }, 600)
    } catch {
      setStatus('error')
      toast.error('Swap failed. Please try again.')
      setLoading(false)
    }
  }

  const getButtonText = () => {
    if (!inputToken || !outputToken) return 'Select tokens'
    const hasValidInput = inputAmount !== '' && !isNaN(parseFloat(inputAmount)) && parseFloat(inputAmount) > 0
    const hasValidOutput = outputAmount !== '' && !isNaN(parseFloat(outputAmount)) && parseFloat(outputAmount) > 0
    if (!hasValidInput && !hasValidOutput) return 'Enter an amount'
    if (status === 'finalizing') return 'Finalizing quote...'
    if (status === 'swapping') return 'Swapping...'
    if (status === 'success') return 'Swap Successful!'
    return 'Swap'
  }

  const isButtonDisabled = () => {
    if (status === 'swapping' || status === 'success') return true
    if (!inputToken || !outputToken) return true
    const hasValidInput = inputAmount !== '' && !isNaN(parseFloat(inputAmount)) && parseFloat(inputAmount) > 0
    const hasValidOutput = outputAmount !== '' && !isNaN(parseFloat(outputAmount)) && parseFloat(outputAmount) > 0
    if (!hasValidInput && !hasValidOutput) return true
    return false
  }

  return (
    <div className='w-full relative max-w-md mx-auto'>
      {/* Settings Button */}
      <div className='bg-background border border-border rounded-2xl p-4 pt-8 space-y-4 relative'>
        <div
          onClick={() => setShowSettingsModal(true)}
          className='absolute top-2 right-2 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50 cursor-pointer'
        >
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        {/* Input Token Section */}
        <div className='bg-muted rounded-xl p-4'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm text-muted-foreground font-medium'>Sell</span>
            {inputToken && (
              <div className='flex items-center text-sm text-muted-foreground'>
                <span>
                  {mockBalance.toFixed(2)} {inputToken.currency}
                </span>
                <div
                  onClick={() => handleMaxClick('input')}
                  className='ml-2 text-blue-500 hover:text-blue-600 font-bold cursor-pointer'
                >
                  Max
                </div>
              </div>
            )}
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex-1 relative'>
              {status === 'finalizing' && isLoading && lastChangedSide === 'output' ? (
                <div className='flex items-center space-x-2 text-3xl font-bold text-foreground'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-foreground'></div>
                </div>
              ) : (
                <input
                  type='text'
                  value={inputAmount}
                  onChange={(e) => handleInputAmountChange(e.target.value)}
                  placeholder='0'
                  className='bg-transparent text-left text-3xl font-bold text-foreground placeholder-muted-foreground border-none outline-none w-full'
                />
              )}
            </div>

            <button
              onClick={() => setShowInputTokenModal(true)}
              className='flex items-center space-x-2 bg-background hover:bg-muted border border-border rounded-full px-3 py-2 transition-colors'
            >
              {inputToken ? (
                <>
                  <img src={inputToken.imageUrl} alt={inputToken.currency} className='w-6 h-6 rounded-full' />
                  <span className='font-semibold text-foreground'>{inputToken.currency}</span>
                </>
              ) : (
                <span className='font-semibold text-foreground'>Select token</span>
              )}
              <svg width='12' height='12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M6 9L12 15L18 9'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>

          <div className='mt-2 text-sm text-left text-muted-foreground'>
            {inputAmount && inputToken ? `$${(parseFloat(inputAmount) * inputToken.price).toFixed(2)}` : '$0'}
          </div>
        </div>

        {/* Swap Button */}
        <div className='flex justify-center'>
          <button
            onClick={swapTokens}
            className='bg-muted hover:bg-muted/80 border border-border rounded-full p-3 transition-colors'
          >
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M7 16L17 16M17 16L13 12M17 16L13 20M17 8L7 8M7 8L11 4M7 8L11 12'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>

        {/* Output Token Section */}
        <div className='bg-muted rounded-xl p-4'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm text-muted-foreground font-medium'>Buy</span>
            {outputToken && (
              <div className='flex items-center text-sm text-muted-foreground'>
                <span>
                  {mockBalance.toFixed(2)} {outputToken.currency}
                </span>
                <div
                  onClick={() => handleMaxClick('output')}
                  className='ml-2 text-blue-500 hover:text-blue-600 font-bold cursor-pointer'
                >
                  Max
                </div>
              </div>
            )}
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex-1 relative'>
              {status === 'finalizing' && isLoading && lastChangedSide === 'input' ? (
                <div className='flex items-center space-x-2 text-3xl font-bold text-foreground'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-foreground'></div>
                </div>
              ) : (
                <input
                  type='text'
                  value={outputAmount}
                  onChange={(e) => handleOutputAmountChange(e.target.value)}
                  placeholder='0'
                  className='bg-transparent text-left text-3xl font-bold text-foreground placeholder-muted-foreground border-none outline-none w-full'
                />
              )}
            </div>

            <button
              onClick={() => setShowOutputTokenModal(true)}
              className='flex items-center space-x-2 bg-background hover:bg-muted border border-border rounded-full px-3 py-2 transition-colors'
            >
              {outputToken ? (
                <>
                  <img src={outputToken.imageUrl} alt={outputToken.currency} className='w-6 h-6 rounded-full' />
                  <span className='font-semibold text-foreground'>{outputToken.currency}</span>
                </>
              ) : (
                <span className='font-semibold text-foreground'>Select token</span>
              )}
              <svg width='12' height='12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M6 9L12 15L18 9'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>

          <div className='mt-2 text-sm text-left text-muted-foreground'>
            {outputAmount && outputToken ? `$${(parseFloat(outputAmount) * outputToken.price).toFixed(2)}` : '$0'}
          </div>
        </div>

        {/* Finalizing Quote */}
        {status === 'finalizing' && isLoading && (
          <div className='flex items-center justify-center space-x-2 text-sm text-muted-foreground'>
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-current'></div>
            <span>{lastChangedSide === 'input' ? 'Calculating output amount...' : 'Calculating input amount...'}</span>
          </div>
        )}

        {/* Swap Button */}

        <button
          onClick={handleSwap}
          disabled={isButtonDisabled()}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors ${
            status === 'success'
              ? 'bg-green-600 text-white'
              : status === 'swapping'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {getButtonText()}
        </button>
      </div>

      {/* Token Selection Modals */}
      <TokenSelectModal
        isOpen={showInputTokenModal}
        onClose={() => setShowInputTokenModal(false)}
        tokens={tokens}
        onSelectToken={setInputToken}
        disabledToken={outputToken}
        title='Select a token'
      />

      <TokenSelectModal
        isOpen={showOutputTokenModal}
        onClose={() => setShowOutputTokenModal(false)}
        tokens={tokens}
        onSelectToken={setOutputToken}
        disabledToken={inputToken}
        title='Select a token'
      />

      {/* Settings Modal */}
      <SwapSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        slippageTolerance={slippageTolerance}
        onSlippageChange={setSlippageTolerance}
        mevProtection={mevProtection}
        onMevProtectionChange={setMevProtection}
      />
    </div>
  )
}
