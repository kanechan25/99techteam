import { create } from 'zustand'
import { TokenStore } from '@/models/types'

export const useTokenStore = create<TokenStore>((set) => ({
  tokens: [],
  isLoading: false,
  error: null,
  setTokens: (tokens) => set({ tokens }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearTokens: () => set({ tokens: [], error: null }),
}))
