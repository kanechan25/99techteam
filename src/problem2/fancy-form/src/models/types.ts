import { ReactNode } from 'react'

export type Routes = {
  href: string
  id: string
  name: string
  element: React.ReactNode
}

export interface Token {
  currency: string
  imageUrl: string
  price: number
}

export interface TokenStore {
  tokens: Token[]
  isLoading: boolean
  error: string | null
  setTokens: (tokens: Token[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearTokens: () => void
}

export interface SwapFormProps {
  tokens: Token[]
}

export interface SwapSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  slippageTolerance: number
  onSlippageChange: (value: number) => void
  mevProtection: boolean
  onMevProtectionChange: (enabled: boolean) => void
}

export interface ThemeToggleProps {
  className?: string
}

export interface TokenSelectModalProps {
  isOpen: boolean
  onClose: () => void
  tokens: Token[]
  onSelectToken: (token: Token) => void
  disabledToken?: Token | null
  title: string
}

export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export interface ThemeProviderProps {
  children: React.ReactNode
}

export interface Web3ProviderProps {
  children: ReactNode
}

export type SwapStatus = 'idle' | 'finalizing' | 'ready' | 'swapping' | 'success' | 'error'

export interface SwapStore {
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
