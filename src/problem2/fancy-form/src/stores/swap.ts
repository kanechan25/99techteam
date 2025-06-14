import { create } from 'zustand'
import { SwapStore } from '@/models/types'

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
