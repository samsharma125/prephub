"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      {/* Floating Open Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg 
          hover:bg-blue-700 transition active:scale-90 backdrop-blur-xl border border-white/10
          animate-bounce-slow"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Widget */}
      {open && (
        <div
          className="fixed bottom-6 right-6 w-80 md:w-96 
          bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl 
          flex flex-col overflow-hidden animate-scale-in"
        >
          {/* Header */}
          <div className="px-5 py-3 bg-gradient-to-r from-blue-700 to-indigo-800 text-white 
          font-semibold text-lg shadow flex justify-between items-center">
            PrepHub Copilot
            <button onClick={() => setOpen(false)} className="hover:opacity-80">
              <X size={22} />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span
                  className={
                    m.role === "user"
                      ? "inline-block bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm text-sm shadow-lg"
                      : "inline-block bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-2xl rounded-tl-sm text-sm shadow-lg border border-white/10"
                  }
                >
                  {m.text}
                </span>
              </div>
            ))}

            {loading && (
              <div className="text-gray-300 text-sm italic animate-pulse">Thinking...</div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/20 bg-white/10 backdrop-blur-xl flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 border border-white/30 rounded-xl bg-white/20 
              backdrop-blur-md text-white placeholder-gray-300 focus:ring-2 
              focus:ring-blue-400 outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg 
              hover:bg-blue-700 transition active:scale-95 flex items-center gap-1"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        .animate-scale-in {
          animation: scaleIn 0.25s ease forwards;
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-bounce-slow {
          animation: bounceSlow 2.4s infinite ease-in-out;
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}
