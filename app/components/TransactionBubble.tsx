import { background, cn, color } from "@coinbase/onchainkit/theme"

const TransactionBubble = ({ children }) => {
  return (
    <div
      className={cn(
        "hacker",
        background.primary,
        color.inverse,
        "px-5 py-2 w-full my-5"
      )}
    >
      {children}
    </div>
  )
}

export default TransactionBubble