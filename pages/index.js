import React from 'react';
import { bsc } from 'wagmi/chains';
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { Profile } from '@/components/Profile';
import Participate from '@/components/Participate';

// using the public provider instead of my own api key
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, bsc],
  [
    jsonRpcProvider({
      rpc: () => ({
        http:"https://smart-serene-county.bsc-testnet.quiknode.pro/0311dc2ef709914d244ad8e32adaefd4a70c9735/"
      }),
    })
  ]
);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '...',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

// Pass config to React Context Provider
export default function Home() {
  return (
    <WagmiConfig config={config}>
      <Profile />
      <Participate />
    </WagmiConfig>
  )
}
