import { useState } from "react";
import { toast } from "react-toastify";

function ContactModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const submitHandler = (e) => {
    const toastFire = (message) => {
        toast.success(message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      };
      toastFire("Thanks for contacting us! We will get back to you soon.");
  }

  return (
    <div>
      {/* Contact Button */}
      <button
        className="link link-hover"
        onClick={openModal}
      >
        Contact Us
      </button>

      {/* Modal */}
      {isModalOpen && (
        <dialog
          id="ContactUs"
          className="fixed inset-0 w-full max-w-4xl flex items-center justify-center bg-transparent z-50"
        >
          <div className="modal-box w-full max-w-4xl rounded-2xl shadow-lg border border-gray-700 p-8 lg:p-16 overflow-auto">
            <div className="container mx-auto px-4 py-8 text-black">
              <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Get in Touch with Trailblazers
                </h2>
                <p>
                  We're here to assist you with your travel inquiries, bookings,
                  or any questions you may have. Please feel free to reach out to
                  us via the contact information below or by filling out the form.
                </p>
              </section>

              <hr className="my-6" />

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">1. Contact Information</h3>
                <ul className="list-none mt-2">
                  <li>
                    <strong>Email:</strong> support@trailblazers.com
                  </li>
                  <li>
                    <strong>Phone:</strong> 09 91891821918
                  </li>
                  <li>
                    <strong>Address:</strong> Hlaing, Yangon, Myanmar
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">2. Social Media</h3>
                <p>
                  You can also reach out to us via our social media channels:
                </p>
                <ul className="flex space-x-6 mt-4">
                  <li>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Twitter
                    </a>
                  </li>
                </ul>
              </section>

              <p className="text-sm text-gray-600">
                We value your feedback and will respond to your inquiry as soon as
                possible. Thank you for choosing Trailblazers!
              </p>
            </div>

            {/* Modal Close Button */}
            <div className="modal-action flex justify-end mt-8">
              <button
                className="btn bg-gray-900 text-white hover:bg-black transition duration-300"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default ContactModal;
