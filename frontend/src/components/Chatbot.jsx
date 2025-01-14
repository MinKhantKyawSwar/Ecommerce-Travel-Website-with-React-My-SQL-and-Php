import React, { useEffect, useState } from "react";
import axios from "axios";
import { DNA } from 'react-loader-spinner';
import botIcon from "../assets/pictures/bot.png"

const faq = [
  "What is the booking process?",
  "How can I pay for the tours?",
  "What is included in the tour package?",
  "Can I customize my tour?",
  "What if I need to cancel my booking?",
  "Are there group discounts available?",
  "What should I pack for the tour?",
  "Can I book a tour as a gift?",
  "Are flights included in the tour package?",
  "Do I need a visa for the tour destination?",
  "How long does the tour last?",
  "Can I make changes to my booking after confirmation?",
  "Do I need a passport for the tour destination?",
  "Is travel insurance included?",
  "Are there any age restrictions for tours?",
  "Do you offer tours for solo travelers?",
  "Can I bring my pet on the tour?",
  "Can you recommend me a trip?",
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);

  const handleSendMessage = async (input) => {
    if (!input) return;
    setShowQuestions(false);
    setLoading(true);

    // Optimistically add user message to chat
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Send message to PHP backend using POST
    try {
      const response = await axios.post(
        "http://localhost:3000/backend/chatbot.php",
        { message: input },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;

      // If the response contains destination data
      if (data.destination_image && data.destination_id) {
        // Add bot response with destination info
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: data.message,
            destination: {
              image: data.destination_image,
              link: data.destination_link
            }
          }
        ]);
      } else {
        // Regular FAQ or other message response
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.message },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    }
    setLoading(false);
    setUserInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage(userInput);
    }
  };

  const handleQuestionClick = (question) => {
    handleSendMessage(question);
  };

  // Function to shuffle and select 4 random questions
  useEffect(() => {
    const shuffled = faq.sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 4));
  }, []);

  return (
    <div className="flex  justify-center">
      <div className="flex h-full flex-col w-3/4 h-[500px] p-6 rounded-xl shadow-lg border border-gray-300">
        {/* Random Questions */}
        {showQuestions && (
          <div className="mb-6 space-y-4">
            <h3 className="font-semibold text-xl text-black">Suggested Questions:</h3>
            <ul className="space-y-3">
              {questions.map((question, index) => (
                <li
                  key={index}
                  className="p-3 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
                  onClick={() => handleQuestionClick(question)}
                >
                  {question}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 mb-6 space-y-4 ">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="p-4 rounded-lg flex flex-col space-y-2"
            >
              {
                !msg.destination ? (
                  <div className="flex items-start space-x-2">
                    {
                      msg.sender === "user" ? (
                        <div className="absolute right-60 pr-4">
                          <div className="flex items-end space-x-2">
                            <p className="bg-neutral-700 text-white p-2 rounded-lg max-w-xs break-words shadow-lg">
                              {msg.text}
                            </p>
                            <img
                              src={botIcon}
                              alt="User Logo"
                              className="w-8 h-8 rounded-full border-2 border-white"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start space-x-2">
                          <img
                            src={botIcon}
                            alt="Bot Logo"
                            className="w-8 h-8 rounded-full border-2 border-white"
                          />
                          <p className="bg-gray-100 text-black p-2 rounded-lg max-w-xs break-words shadow-lg">
                            {msg.text}
                          </p>
                        </div>
                      )
                    }
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <img
                        src={botIcon}
                        alt="Bot Logo"
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                      <p className="bg-gray-100 text-black p-2 rounded-lg max-w-xs break-words shadow-lg">
                        {msg.text}
                      </p>
                    </div>
                    <div className="ml-11">
                      <img
                        src={`http://localhost:3000/backend/${msg.destination.image}`}
                        alt="Destination"
                        className="w-80 h-52 object-cover rounded-lg rounded-b-none shadow-md"
                      />
                      <a
                        href={msg.destination.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn rounded-t-none pt-4 w-80 text-neutral-700 hover:underline block"
                      >
                        click here to view details
                      </a>
                    </div>

                  </div>
                )
              }
            </div>

          ))}
          {loading && (
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          )}
        </div>

        {/* User Input */}
        <div className="flex items-center space-x-4 mt-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-4 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            placeholder="Type a message..."
          />
          <button
            onClick={() => handleSendMessage(userInput)}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>

  );
};

export default Chatbot;
