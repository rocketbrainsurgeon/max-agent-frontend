import { border, cn, line, pressable } from "@coinbase/onchainkit/theme"

const Bubble = ({children}) => {
    return (
        <div className={cn(
            border.default,
            border.radius,
            pressable.default,
            line.default,
            "px-4 py-1 my-1 mx-2 text-center"
        )}>
            {children}
        </div>
    )
}

export default Bubble