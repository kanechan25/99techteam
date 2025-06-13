import { useEffect } from 'react'
import { fetchTokenPrices } from '@/services'
import { useTokenStore, Token } from '@/stores/tokens'

const useTokens = () => {
  const { tokens, isLoading, error, setTokens, setLoading, setError } = useTokenStore()

  useEffect(() => {
    const checkImageExists = async (url: string): Promise<boolean> => {
      try {
        const response = await fetch(url, { method: 'HEAD' })
        return response.ok
      } catch {
        return false
      }
    }

    const loadTokens = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await fetchTokenPrices()
        if (data) {
          // First, remove duplicates by currency from raw data
          const uniqueRawTokens = data.filter(
            (token: Token, index: number, self: Token[]) =>
              index === self.findIndex((t: Token) => t.currency === token.currency),
          )

          // Check image availability for each unique token
          const tokenValidationPromises = uniqueRawTokens.map(async (token: Token) => {
            const imageUrl = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token?.currency}.svg`
            const hasValidImage = await checkImageExists(imageUrl)

            return hasValidImage
              ? {
                  currency: token?.currency,
                  imageUrl,
                  price: token?.price,
                }
              : null
          })

          // Wait for all validations and filter out null values
          const validationResults = await Promise.all(tokenValidationPromises)
          const validTokens = validationResults.filter((token): token is Token => token !== null)

          setTokens(validTokens)
        } else {
          setError('Failed to fetch token data')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }

    // Only load tokens if they haven't been loaded yet
    if (tokens.length === 0 && !isLoading) {
      loadTokens()
    }
  }, [tokens.length, isLoading, setTokens, setLoading, setError])

  return { tokens, isLoading, error }
}

export default useTokens
