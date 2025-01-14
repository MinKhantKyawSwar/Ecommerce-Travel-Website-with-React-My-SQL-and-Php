import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (!userInput) return;

    // Add user message to chat
    setMessages([...messages, { sender: "user", text: userInput }]);

    // Send message to PHP backend using POST
    try {
      const response = await axios.post(
        "http://localhost:3000/backend/chatbot.php",
        {
          message: userInput, // Sending the message in the body
        },{
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;

      // Add bot response to chat
      setMessages([
        ...messages,
        { sender: "user", text: userInput },
        { sender: "bot", text: data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }

    setUserInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents form submission or page reload
      handleSendMessage();
       setUserInput("");
    }
  };

  return (
    <div className="flex flex-col w-96 h-[500px] bg-gray-100 p-4 rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-green-200 self-end transition-all"
                : "bg-gray-200 self-start"
            }`}
            style={msg.sender === "bot" ? { transitionDelay: "2s" } : {}}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
