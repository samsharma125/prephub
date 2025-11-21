"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setMessages((m) => [...m, { role: "user", text: input }]);

    const res = await fetch("/api/ai/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages((m) => [...m, { role: "assistant", text: data.reply }]);
    setInput("");
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 active:scale-95 transition"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Widget */}
      {open && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white/80 backdrop-blur-xl border border-gray-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg shadow flex justify-between items-center">
            PrepHub Copilot
            <button onClick={() => setOpen(false)}>
              <X size={22} className="text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto bg-white/70">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span
                  className={
                    m.role === "user"
                      ? "inline-block bg-blue-600 text-white px-3 py-2 rounded-2xl rounded-tr-sm text-sm shadow"
                      : "inline-block bg-gray-200 text-gray-800 px-3 py-2 rounded-2xl rounded-tl-sm text-sm shadow"
                  }
                >
                  {m.text}
                </span>
              </div>
            ))}

            {loading && (
              <div className="text-gray-500 text-sm italic animate-pulse">
                Thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition active:scale-95"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
