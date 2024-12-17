import { cn, pressable, color, placeholder, border } from "@coinbase/onchainkit/theme"
import { useEffect, useRef, useState } from "react"

interface PromptBoxProps {
  callback: (value: string) => void
}

const PromptBox = ({ callback }: PromptBoxProps) => {
  const [value, setValue] = useState("")

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInput = (event) => {
    setValue(event.target.value)
    event.target.style.height = "auto"
    event.target.style.height = `${event.target.scrollHeight}px`
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setValue("")
      callback(event.target.value)
      event.preventDefault()
    }
  }

  return (
    <textarea
      ref={inputRef}
      className={cn(
        "hacker",
        pressable.alternate,
        color.foreground,
        placeholder.default,
        border.radius,
        "w-full py-2 px-5 outline-none resize-none overflow-hidden leading-6"
      )}
      onKeyDown={handleKeyDown}
      placeholder="Message Max"
      value={value}
      onChange={handleInput}
      style={{ height: "auto" }}
    />
  )
}

export default PromptBox
