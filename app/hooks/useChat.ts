interface ChatGPTResponse {
  content: string
  refusal: string
  role: string
  function_call: string
  tool_calls: string[]
  sender: string
}

const useChat = () => {
  const chat = async (message: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    )
    const data: ChatGPTResponse = await response.json()
    return data
  }

  return { chat }
}

export default useChat
