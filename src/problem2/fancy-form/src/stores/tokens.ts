import { create } from 'zustand'

export interface Token {
  currency: string
  imageUrl: string
  price: number
}

interface TokenStore {
  tokens: Token[]
  isLoading: boolean
  error: string | null
  setTokens: (tokens: Token[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearTokens: () => void
}

export const useTokenStore = create<TokenStore>((set) => ({
  tokens: [],
  isLoading: false,
  error: null,
  setTokens: (tokens) => set({ tokens }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearTokens: () => set({ tokens: [], error: null }),
}))
