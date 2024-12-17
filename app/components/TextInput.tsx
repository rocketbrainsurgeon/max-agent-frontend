import { useCallback } from "react"
import type { ChangeEvent } from "react"
import { useDebounce } from "../hooks/useDebounce"
import {
  cn,
  color,
  pressable,
  placeholder as defaultPlaceholder,
} from "@coinbase/onchainkit/theme"

type TextInputReact = {
  "aria-label"?: string
  className: string
  delayMs: number
  disabled?: boolean
  onBlur?: () => void
  onChange: (s: string) => void
  placeholder: string
  value: string
}

export function TextInput({
  "aria-label": ariaLabel,
  className,
  delayMs,
  disabled = false,
  onBlur,
  onChange,
  placeholder,
  value,
}: TextInputReact) {
  const handleDebounce = useDebounce((value) => {
    onChange(value)
  }, delayMs)

  const handleChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const value = evt.target.value

      if (delayMs > 0) {
        handleDebounce(value)
      } else {
        onChange(value)
      }
    },
    [onChange, handleDebounce, delayMs]
  )

  return (
    <input
      aria-label={ariaLabel}
      data-testid="ockTextInput_Input"
      type="text"
      className={cn(
        "hacker",
        pressable.alternate,
        color.foreground,
        defaultPlaceholder.default,
        "w-full rounded-xl py-2 px-5 outline-none",
        className
      )}
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      onChange={handleChange}
      disabled={disabled}
    />
  )
}
