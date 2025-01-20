import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import botIcon from "../assets/pictures/bot.png";
import { useState, useEffect } from "react";
import Chatbot from "../components/Chatbot"; // Import the Chatbot component

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Effect to disable body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Ensure scroll is re-enabled when the component is unmounted
    };
  }, [isModalOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Nav />

      <div className="right-16 bottom-20 fixed z-50">
        <img
          src={botIcon}
          alt="chatbot"
          className="w-14 hover:scale-110 hover:cursor-pointer transition-transform duration-200 ease-in-out"
          onClick={openModal}
        />
      </div>

      {/* Chatbot Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
          <div className=" w-full max-w-4xl p-6 rounded-lg relative z-50">
            <button
              onClick={closeModal}
              className="absolute text-2xl top-8 right-36 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <Chatbot /> {/* Include the Chatbot component here */}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-20 px-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Main;
