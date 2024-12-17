"use client"

import '@rainbow-me/rainbowkit/styles.css';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { base } from "wagmi/chains"
import { OnchainKitProvider } from "@coinbase/onchainkit"
import { type ReactNode, useState } from "react"
import { type State, WagmiProvider } from "wagmi"
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"

const configRainbow = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [base],
  ssr: false, // If your dApp uses server side rendering (SSR)
})

export function Providers(props: {
  children: ReactNode
  initialState?: State
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={configRainbow} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
          config={{
            appearance: {
              mode: "light",
              theme: "hacker",
            },
          }}
        >
          <RainbowKitProvider modalSize="compact">
            {props.children}
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
