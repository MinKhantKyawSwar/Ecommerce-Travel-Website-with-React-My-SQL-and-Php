import { useState } from "react";
import img1 from "../../assets/pictures/1920_happytravel1-5.jpg";
import img2 from "../../assets/pictures/ACHIEVE_Team.jpeg";

function AboutUsModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* About Us Button */}
      <button
        className="link link-hover "
        onClick={openModal}
      >
        About Us
      </button>

      {/* Modal */}
      {isModalOpen && (
        <dialog
          id="AboutUs"
          className="fixed inset-0 w-full max-w-4xl flex items-center justify-center bg-transparent z-50"
        >
          <div className="modal-box w-full max-w-4xl rounded-2xl shadow-lg border border-gray-700 p-8 lg:p-16 overflow-auto">
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="text-center">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-6">
                  About Us
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 mb-8">
                  Welcome to{" "}
                  <span className="font-semibold text-blue-600">Trailblazers</span>, your trusted partner in unforgettable travel adventures. We
                  believe traveling is not just about reaching destinations—it's
                  about creating experiences, memories, and stories to cherish
                  forever.
                </p>
                <img
                  src={img1}
                  alt="Travel inspiration"
                  className="w-full rounded-lg shadow-xl"
                />
              </div>

              {/* Our Mission Section */}
              <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Our Mission
                  </h2>
                  <p className="text-lg text-gray-600 mb-4">
                    Our mission is to provide personalized travel experiences
                    tailored to your unique needs. Whether you're seeking
                    adventure, relaxation, or cultural immersion, we are here
                    to make your journey seamless and memorable.
                  </p>
                  <p className="text-lg text-gray-600">
                    Let us handle the logistics while you focus on exploring
                    the world. With our expert team and curated packages, your
                    next adventure is just a click away.
                  </p>
                </div>
                <div>
                  <img
                    src={img2}
                    alt="Mission"
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>

              {/* Why Choose Us Section */}
              <div className="mt-16 lg:mt-24 bg-white rounded-lg p-8 lg:p-16 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                  Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="text-center">
                    <div className="text-5xl text-blue-500 mb-4">🌍</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Global Expertise
                    </h3>
                    <p className="text-gray-600">
                      Our team of travel experts brings years of experience
                      and in-depth knowledge of destinations worldwide.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl text-blue-500 mb-4">✨</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Unforgettable Experiences
                    </h3>
                    <p className="text-gray-600">
                      We craft itineraries that go beyond the ordinary,
                      creating unique moments for every traveler.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl text-blue-500 mb-4">💼</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Seamless Planning
                    </h3>
                    <p className="text-gray-600">
                      From booking to travel, we take care of every detail,
                      making your journey smooth and hassle-free.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-16 bg-blue-500 text-white rounded-lg py-12 text-center shadow-xl">
                <h2 className="text-4xl font-bold mb-4">
                  Start Your Adventure Today!
                </h2>
                <p className="text-lg mb-8">
                  Discover the extraordinary with{" "}
                  <span className="font-semibold">Trailblazers</span>. Let us
                  create your next travel story together.
                </p>
              </div>
            </div>

            {/* Modal Close Button */}
            <div className="modal-action flex justify-end mt-8">
              <button
                className="btn bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
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

export default AboutUsModal;
