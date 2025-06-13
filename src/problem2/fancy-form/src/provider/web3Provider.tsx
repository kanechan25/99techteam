import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { mainnet, bsc } from 'wagmi/chains'
import { ReactNode } from 'react'

const config = getDefaultConfig({
  appName: 'Fancy Form',
  projectId: '2e47c4ff5a1bd2b72cbe1b5e8e4c5d6e', // Get your own from https://cloud.walletconnect.com/
  chains: [mainnet, bsc],
  ssr: false,
})

interface Web3ProviderProps {
  children: ReactNode
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider theme={darkTheme()} modalSize='compact'>
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  )
}
