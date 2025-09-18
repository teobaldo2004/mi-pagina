import React, { useState } from "react";

export default function ChatBot({ token }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error de conexión." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.from === "user" ? "user" : "bot"}`}
          >
            <b>{msg.from === "user" ? "Tú" : "Bot"}:</b> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          Enviar
        </button>
      </form>
    </div>
  );
}