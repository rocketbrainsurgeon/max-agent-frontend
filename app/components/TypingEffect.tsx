import React, { useState, useEffect } from "react"

const TypingEffect = ({ text, speed = 25 }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setDisplayedText("")
    setIndex(0)
  }, [text])

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index])
        setIndex((prevIndex) => prevIndex + 1)
      }, speed)

      return () => clearTimeout(timeoutId) // Cleanup timeout on re-render or unmount
    }
  }, [index, text, speed])

  return <div>{displayedText}</div>
}

export default TypingEffect
