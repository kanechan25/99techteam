import { create } from 'zustand'
import { Token } from './tokens'

export type SwapStatus = 'idle' | 'finalizing' | 'ready' | 'swapping' | 'success' | 'error'

interface SwapStore {
  inputToken: Token | null
  outputToken: Token | null
  inputAmount: string
  outputAmount: string
  status: SwapStatus
  isLoading: boolean
  error: string | null
  slippageTolerance: number
  mevProtection: boolean

  setInputToken: (token: Token | null) => void
  setOutputToken: (token: Token | null) => void
  setInputAmount: (amount: string) => void
  setOutputAmount: (amount: string) => void
  setStatus: (status: SwapStatus) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSlippageTolerance: (tolerance: number) => void
  setMevProtection: (enabled: boolean) => void
  swapTokens: () => void
  resetSwap: () => void
}

export const useSwapStore = create<SwapStore>((set, get) => ({
  inputToken: null,
  outputToken: null,
  inputAmount: '',
  outputAmount: '',
  status: 'idle',
  isLoading: false,
  error: null,
  slippageTolerance: 5.0,
  mevProtection: false,

  setInputToken: (token) => set({ inputToken: token }),
  setOutputToken: (token) => set({ outputToken: token }),
  setInputAmount: (amount) => set({ inputAmount: amount }),
  setOutputAmount: (amount) => set({ outputAmount: amount }),
  setStatus: (status) => set({ status }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSlippageTolerance: (tolerance) => set({ slippageTolerance: tolerance }),
  setMevProtection: (enabled) => set({ mevProtection: enabled }),

  swapTokens: () => {
    const { inputToken, outputToken } = get()
    set({
      inputToken: outputToken,
      outputToken: inputToken,
      inputAmount: '',
      outputAmount: '',
      status: 'idle',
    })
  },

  resetSwap: () =>
    set({
      inputAmount: '',
      outputAmount: '',
      status: 'idle',
      isLoading: false,
      error: null,
    }),
}))
