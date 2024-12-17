"use client"

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet"
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity"
import { Token } from "@coinbase/onchainkit/token"
import { useEffect, useRef, useState } from "react"
import ResponseBubble from "./components/ResponseBubble"
import TypingEffect from "./components/TypingEffect"
import { cn, text } from "@coinbase/onchainkit/theme"
import PromptBox from "./components/PromptBox"
import Bubble from "./components/Bubble"

const eth: Token = {
  name: "ETH",
  address: "",
  symbol: "ETH",
  decimals: 18,
  image:
    "https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png",
  chainId: 8453,
}

const usdc: Token = {
  name: "USDC",
  address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
  symbol: "USDC",
  decimals: 6,
  image:
    "https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/44/2b/442b80bd16af0c0d9b22e03a16753823fe826e5bfd457292b55fa0ba8c1ba213-ZWUzYjJmZGUtMDYxNy00NDcyLTg0NjQtMWI4OGEwYjBiODE2",
  chainId: 8453,
}

export default function App() {
  const boxRef = useRef(null)
  const [value, setValue] = useState("")

  const [content, setContent] = useState<JSX.Element[]>([])

  const addContent = (content: JSX.Element) => {
    setContent((prevContent) => [...prevContent, content])
  }

  useEffect(() => {
    boxRef?.current?.scrollIntoView({ behavior: "smooth" })
  }, [content])

  const ActionRow = () => {
    return (
      <div className="max-w-3xl w-full p-4 grid grid-cols-2 sm:grid-cols-4">
          <Bubble>What can you do?</Bubble>
          <Bubble>Swap</Bubble>
          <Bubble>Provide Liquidity</Bubble>
          <Bubble>Borrow/Lend</Bubble>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-black">
      <header className="pt-4 pr-4">
        <div className="flex justify-end">
          <div className="wallet-container">
            <Wallet>
              <ConnectWallet withWalletAggregator>
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownLink
                  icon="wallet"
                  href="https://keys.coinbase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wallet
                </WalletDropdownLink>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </div>
      </header>

      {content.length === 0 && (
        <main className="flex flex-grow flex-col items-center justify-center">
          <div className="max-w-3xl w-full p-4">
            <div
              className={cn(text.headline, "flex justify-center mb-8 text-2xl")}
            >
              <TypingEffect text={"What would you like to do?"} />
            </div>
            <PromptBox
              callback={(s: string) =>
                addContent(<ResponseBubble>{s}</ResponseBubble>)
              }
            />
          </div>
          <ActionRow />
        </main>
      )}

      {content.length > 0 && (
        <main className="flex-grow flex items-center justify-center overflow-y-auto">
          <div className="max-w-3xl w-full p-4 flex flex-col">
            {content.map((c) => c)}
          </div>
        </main>
      )}

      {content.length > 0 && (
        <div className="flex-grow flex flex-col justify-end items-center">
          <div ref={boxRef} className="max-w-3xl w-full p-4">
            <PromptBox
              callback={(s: string) =>
                addContent(<ResponseBubble>{s}</ResponseBubble>)
              }
            />
          </div>
          <ActionRow />
        </div>
      )}
    </div>
  )
}
