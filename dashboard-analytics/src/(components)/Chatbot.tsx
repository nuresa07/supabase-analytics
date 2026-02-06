import { useState } from "react";
import { MessageSquare, X, } from "lucide-react";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner";
import { Message } from "@/types";




const Chatbot = ({ darkMode }: { darkMode: boolean }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: "Hi! Can i help you ?" }])
  const [input, setInput] = useState("")

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }])
    const userInput = input;
    setInput("")

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userInput },
          ],
        })
      })

      const data = await response.json();
      console.log("data from AI = ", data);
      // Pastikan API memberikan respons dengan struktur yang benar
      const botReply = data.choices?.[0]?.message?.content || "maaf terjadi error";
      console.log("botReply = ", botReply);

      setMessages((prev) => [...prev, { role: "assistant", text: botReply }])
    } catch (error) {
      console.log("Error calling OpenAI API: ", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Maaf, terjadi error saat menghubungi server." },
      ])
    }
  }

  return (
    <div className={clsx(
      darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800",
      "fixed bottom-6 right-6 flex flex-col items-end rounded-lg",
    )}>
      {open ? (
        <div className="shadow-lg rounded-lg w-72 p-4 border border-purple-300">
          <div className="flex justify-between mb-2">
            <h2 className="text-lg font-bold">Chatbot AI 🤖</h2>
            <button onClick={() => setOpen(false)}><X /></button>
          </div>
          <div className="h-48 overflow-y-auto border p-2 mb-2">
            {messages.map((msg, i) => (
              <div key={i} className={`my-3 ${msg.role === "user" ? "text-right" : "text-left"}`} >
                <span className={`px-2 py-1 ${msg.role === "user" ? "bg-blue-500 text-white rounded-l" : "bg-gray-200 text-black rounded-r"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-1">
            <input className="bg-gray-200 text-black flex-1 border px-2 py-1 rounded-l"
              type="text"
              placeholder="read your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white px-2 rounded-r cursor-pointer">Send</button>
          </div>
          <hr className="border my-4 border-gray-300" />

          <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
            onClick={() => {
              toast("Are you sure you want to clear the chat?", {
                action: {
                  label: (
                    <span>
                      🗑 Confirm
                    </span>
                  ),
                  onClick: () => setMessages([]),
                },
                cancel: {
                  label: "❌ Cancel",
                  onClick: () => { },
                }
              })
            }}
          >
            Clear Chat
          </button>
        </div>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-blue-600 text-white p-3 rounded-lg shadow-lg cursor-pointer" onClick={() => setOpen(true)}>
                <MessageSquare />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chat with AI</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}

export default Chatbot