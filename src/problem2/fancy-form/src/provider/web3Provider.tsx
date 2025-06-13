import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { mainnet, bsc } from 'wagmi/chains'
import { ReactNode } from 'react'

const config = getDefaultConfig({
  appName: 'Fancy Form',
  projectId: 'YOUR_PROJECT_ID', // You'll need to get this from WalletConnect Cloud
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
