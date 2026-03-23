import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import gsap from "gsap";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I am your YCCE AI Assistant. Ask me about library timings, college rules, or your fee structure!" }
  ]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const pageRef = useRef(null);

  // Entrance Animation
  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Point this to your Render URL once hosted
      const response = await axios.post("https://college-portal-backend-xi64.onrender.com/api/ai/chat", {
        message: input,
        studentInfo: {
          caste: user?.caste || "Open",
          admissionType: user?.admissionType || "Regular",
        },
      });

      setMessages((prev) => [...prev, { role: "bot", text: response.data.text }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", text: "I'm having trouble connecting to the server. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[80vh]">
        
        {/* Header */}
        <div className="bg-indigo-700 p-4 text-white flex items-center gap-3">
          <div className="bg-white p-2 rounded-full text-indigo-700 text-xl">✨</div>
          <div>
            <h1 className="font-bold">YCCE AI Assistant</h1>
            <p className="text-xs opacity-80">Online | Powered by Gemini</p>
          </div>
        </div>

        {/* Chat Area */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                msg.role === "user" 
                ? "bg-indigo-600 text-white rounded-tr-none" 
                : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-500 p-3 rounded-2xl text-xs animate-pulse">
                AI is thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white flex gap-2">
          <input
            type="text"
            className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Ask about library, fees, or rules..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-indigo-700 text-white p-2 rounded-full hover:bg-indigo-800 transition-all"
          >
            <i className="ri-send-plane-fill text-xl px-2"></i>
          </button>
        </form>
      </div>
    </div>
  );
}