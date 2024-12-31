import React, { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Trailblaze?",
      answer:
        "Trailblaze is a global travel and tour platform that helps you book unique travel experiences, guided tours, and accommodations with ease.",
    },
    {
      question: "How can I book a tour?",
      answer:
        "You can browse through our available tours, select your preferred option, and complete the booking process online through our secure payment system.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major all types of payment methods, including credit cards, PayPal, and bank transfers. However, we only accept with only one payment via this website to prevent from further errors.",
    },
    {
        question: "Do I need to pay for extra after booking?",
        answer:
          "You don't need to pay for extra after booking . We have included all the costs in the booking price including tax and passport price. However, you have to pay for extra charges from the packages of your chosen.",
      },
    {
      question: "Can I cancel or reschedule my booking?",
      answer:
        "No. You cannot cancel or reschedule your booking. If you cancel, you will not be able to refund your money so please be sure to book carefully.",
    },
    {
      question: "Is travel insurance included?",
      answer:
        "Travel insurance is not included in our packages. We recommend purchasing travel insurance separately for a safe and secure journey.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        FAQs
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border rounded-lg p-4 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{faq.question}</h3>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ⌄
        </span>
      </div>
      {isOpen && <p className="mt-2 text-gray-700">{faq.answer}</p>}
    </div>
  );
};

export default FAQ;
