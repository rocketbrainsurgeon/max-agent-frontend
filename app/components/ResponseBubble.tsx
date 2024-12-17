import { background, border, cn } from "@coinbase/onchainkit/theme"

const ResponseBubble = ({ children }) => {
  return (
    <div
      className={cn(
        "hacker",
        background.washed,
        border.radius,
        "max-w-lg self-end px-5 py-2 my-5"
      )}
    >
      {children}
    </div>
  )
}

export default ResponseBubble
