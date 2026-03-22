import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';

const ChatBot = ({ userProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Hi ${userProfile?.name || 'Student'}! How can I help you with library or fee details today?` }
  ]);
  
  const chatRef = useRef(null);
  const msgContainerRef = useRef(null);

  // GSAP: Open/Close Animation
  useEffect(() => {
    if (isOpen) {
      gsap.to(chatRef.current, { 
        duration: 0.5, 
        y: 0, 
        opacity: 1, 
        display: 'flex', 
        ease: 'back.out(1.7)' 
      });
    } else {
      gsap.to(chatRef.current, { 
        duration: 0.3, 
        y: 50, 
        opacity: 0, 
        display: 'none', 
        ease: 'power2.in' 
      });
    }
  }, [isOpen]);

  // GSAP: Animate new messages
  useEffect(() => {
    if (messages.length > 1) {
      const lastMsg = msgContainerRef.current.lastElementChild;
      gsap.fromTo(lastMsg, 
        { opacity: 0, x: 20 }, 
        { opacity: 1, x: 0, duration: 0.4, ease: 'power1.out' }
      );
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/ai/chat", {
        message: input,
        studentInfo: { 
          caste: userProfile?.caste || 'Open', 
          admissionType: userProfile?.admissionType || 'Regular' 
        }
      });
      setMessages(prev => [...prev, { role: 'bot', text: data.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting to the office right now." }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isOpen ? '✖' : '💬'}
      </button>

      {/* Chat Window */}
      <div 
        ref={chatRef}
        className="absolute bottom-20 right-0 w-80 h-96 bg-white border border-gray-200 rounded-xl shadow-2xl flex-col hidden overflow-hidden"
      >
        <div className="bg-blue-600 p-4 text-white font-bold">YCCE AI Assistant</div>
        
        <div ref={msgContainerRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
          {messages.map((m, i) => (
            <div key={i} className={`p-2 rounded-lg text-sm max-w-[80%] ${m.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-white border'}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="p-3 border-t flex gap-2">
          <input 
            className="flex-1 border p-2 rounded text-sm focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about fees..."
          />
          <button onClick={handleSend} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;