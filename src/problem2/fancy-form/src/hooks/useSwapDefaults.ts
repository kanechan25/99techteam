import { useEffect } from 'react'
import { Token } from '@/stores/tokens'
import { useSwapStore } from '@/stores/swap'

export const useSwapDefaults = (tokens: Token[]) => {
  const { inputToken, outputToken, setInputToken, setOutputToken } = useSwapStore()

  useEffect(() => {
    if (tokens.length > 0 && !inputToken && !outputToken) {
      // Find ETH-like token for input (prioritize ETH)
      const ethToken = tokens.find(
        (token) => token.currency.toUpperCase() === 'ETH' || token.currency.toUpperCase().includes('ETH'),
      )

      // Find USDC-like token for output (prioritize USDC)
      const usdcToken = tokens.find(
        (token) =>
          token.currency.toUpperCase() === 'USDC' ||
          token.currency.toUpperCase().includes('USDC') ||
          token.currency.toUpperCase().includes('USD'),
      )

      // Set defaults if found
      if (ethToken) {
        setInputToken(ethToken)
      }

      if (usdcToken && (!ethToken || usdcToken.currency !== ethToken.currency)) {
        setOutputToken(usdcToken)
      } else if (tokens.length > 1) {
        // Fallback to second token if USDC not found
        const fallbackToken = tokens.find((token) => token.currency !== ethToken?.currency)
        if (fallbackToken) {
          setOutputToken(fallbackToken)
        }
      }
    }
  }, [tokens, inputToken, outputToken, setInputToken, setOutputToken])
}
