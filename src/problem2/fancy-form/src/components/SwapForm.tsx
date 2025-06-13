import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import { Token } from '@/stores/tokens'
import { useSwapStore } from '@/stores/swap'
import { useSwapDefaults } from '@/hooks/useSwapDefaults'
import { TokenSelectModal } from './TokenSelectModal'
import { formatNumberInput, isValidAmount, formatDisplayAmount } from '@/utils/validation'

interface SwapFormProps {
  tokens: Token[]
}

export const SwapForm = ({ tokens }: SwapFormProps) => {
  const { isConnected } = useAccount()
  useSwapDefaults(tokens)
  const {
    inputToken,
    outputToken,
    inputAmount,
    outputAmount,
    status,
    isLoading,
    setInputToken,
    setOutputToken,
    setInputAmount,
    setOutputAmount,
    setStatus,
    setLoading,
    swapTokens,
    resetSwap,
  } = useSwapStore()

  const [showInputTokenModal, setShowInputTokenModal] = useState(false)
  const [showOutputTokenModal, setShowOutputTokenModal] = useState(false)

  // Calculate output amount when input changes
  useEffect(() => {
    if (inputToken && outputToken && inputAmount && parseFloat(inputAmount) > 0) {
      setStatus('finalizing')
      setLoading(true)

      // Simulate API call delay
      const timeout = setTimeout(() => {
        const inputValue = parseFloat(inputAmount)
        const exchangeRate = inputToken.price / outputToken.price
        const outputValue = inputValue * exchangeRate

        setOutputAmount(outputValue.toString())
        setStatus('ready')
        setLoading(false)
      }, 500)

      return () => clearTimeout(timeout)
    } else {
      setOutputAmount('')
      setStatus('idle')
    }
  }, [inputToken, outputToken, inputAmount, setOutputAmount, setStatus, setLoading])

  const handleInputAmountChange = (value: string) => {
    const formatted = formatNumberInput(value)
    setInputAmount(formatted)
  }

  const handleMaxClick = () => {
    // Simulate max balance - using a mock value
    setInputAmount('1000')
  }

  const handleSwap = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    if (!inputToken || !outputToken) {
      toast.error('Please select both tokens')
      return
    }

    if (!isValidAmount(inputAmount)) {
      toast.error('Please enter a valid amount')
      return
    }

    setStatus('swapping')
    setLoading(true)

    try {
      // Simulate swap transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setStatus('success')
      toast.success(
        `Successfully swapped ${inputAmount} ${inputToken.currency} for ${formatDisplayAmount(outputAmount, 4)} ${outputToken.currency}`,
      )

      // Reset after success
      setTimeout(() => {
        resetSwap()
      }, 1000)
    } catch {
      setStatus('error')
      toast.error('Swap failed. Please try again.')
      setLoading(false)
    }
  }

  const getButtonText = () => {
    if (!isConnected) return 'Connect wallet'
    if (!inputToken || !outputToken) return 'Select tokens'
    if (!inputAmount || parseFloat(inputAmount) <= 0) return 'Enter an amount'
    if (status === 'finalizing') return 'Finalizing quote...'
    if (status === 'swapping') return 'Swapping...'
    if (status === 'success') return 'Swap Successful!'
    return 'Swap'
  }

  const isButtonDisabled = () => {
    if (!isConnected) return false // Allow clicking to connect
    if (status === 'swapping' || status === 'success') return true
    if (!inputToken || !outputToken || !isValidAmount(inputAmount)) return true
    return false
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='bg-background border border-border rounded-2xl p-4 space-y-4'>
        {/* Input Token Section */}
        <div className='bg-muted rounded-xl p-4'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm text-muted-foreground font-medium'>Sell</span>
            {inputToken && (
              <div className='flex items-center text-sm text-muted-foreground'>
                <span>0.001 {inputToken.currency}</span>
                <button onClick={handleMaxClick} className='ml-2 text-blue-500 hover:text-blue-600 font-medium'>
                  Max
                </button>
              </div>
            )}
          </div>

          <div className='flex items-center justify-between'>
            <input
              type='text'
              value={inputAmount}
              onChange={(e) => handleInputAmountChange(e.target.value)}
              placeholder='0'
              className='bg-transparent text-left text-4xl font-bold text-foreground placeholder-muted-foreground border-none outline-none flex-1 min-w-0'
            />

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
          </div>

          <div className='flex items-center justify-between'>
            <div className='text-left text-4xl font-bold text-foreground flex-1'>
              {status === 'finalizing' && isLoading ? (
                <div className='flex items-center space-x-2'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-foreground'></div>
                </div>
              ) : outputAmount ? (
                formatDisplayAmount(outputAmount, 6)
              ) : (
                '0'
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
        {status === 'finalizing' && (
          <div className='flex items-center justify-center space-x-2 text-sm text-muted-foreground'>
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-current'></div>
            <span>Finalizing quote...</span>
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
                : !isConnected
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : isButtonDisabled()
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
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
    </div>
  )
}
