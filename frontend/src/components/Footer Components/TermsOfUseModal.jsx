import { useState } from "react";
import img1 from "../../assets/pictures/1920_happytravel1-5.jpg";
import img2 from "../../assets/pictures/ACHIEVE_Team.jpeg";

function TermsOfUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Terms Of Use Button */}
      <button
        className="link link-hover"
        onClick={openModal}
      >
        Terms Of Use
      </button>

      {/* Modal */}
      {isModalOpen && (
        <dialog
          id="TermsOfUse"
          className="fixed inset-0 w-full max-w-4xl flex items-center justify-center bg-transparent z-50"
        >
          <div className="modal-box w-full max-w-4xl rounded-2xl shadow-lg border border-gray-700 p-8 lg:p-16 overflow-auto">
            <div className="container mx-auto px-4 py-8 text-black">
              <h1 className="text-4xl font-bold mb-6">Terms of Use</h1>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Welcome to Trailblazers
                </h2>
                <p>
                  Thank you for choosing Trailblazers for your travel and tour
                  needs. By accessing and using our website, you agree to comply
                  with and be bound by the following Terms of Use. Please read
                  them carefully before proceeding.
                </p>
              </section>

              <hr className="my-6" />

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">1. General Terms</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    These Terms of Use ("Terms") govern your access to and use
                    of the services provided by Trailblazers ("we," "us," or
                    "our"), including booking tours, travel packages, and
                    related services.
                  </li>
                  <li>
                    By using our website, you represent that you are at least 18
                    years old or have the permission of a parent or guardian to
                    use our services.
                  </li>
                  <li>
                    We reserve the right to update or modify these Terms at any
                    time without prior notice. Your continued use of the website
                    constitutes your acceptance of such changes.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  2. Booking Policy
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    All bookings made through our website are subject to
                    availability and confirmation.
                  </li>
                  <li>
                    Prices and availability of tours and travel packages are
                    subject to change without notice until the booking is
                    confirmed.
                  </li>
                  <li>
                    Once a booking is confirmed, you will receive a confirmation
                    email detailing the booking reference, itinerary, and
                    payment receipt.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  3. Payment Policy
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Full payment is required at the time of booking unless
                    otherwise specified.
                  </li>
                  <li>
                    Payments must be made through the secure payment gateway
                    integrated into our website. We accept major credit cards
                    and other payment methods as displayed on our checkout page.
                  </li>
                  <li>
                    All payments are processed securely, and we do not store
                    your payment information.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  4. Cancellation and Refund Policy
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    All bookings are <strong>non-refundable</strong> after
                    confirmation. By proceeding with your booking, you
                    acknowledge and agree to this no-refund policy.
                  </li>
                  <li>
                    In exceptional circumstances (e.g., natural disasters or
                    unforeseen events), we may offer alternative solutions, such
                    as rescheduling or credit for future bookings, at our sole
                    discretion.
                  </li>
                  <li>
                    If a booking is canceled due to circumstances beyond our
                    control (force majeure), we will notify you promptly and
                    work to provide an alternative solution. Refunds will not be
                    provided in such cases.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  5. User Responsibilities
                </h3>
                <p>
                  Your responsibilities include providing accurate information
                  and adhering to our policies.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  6. Limitation of Liability
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    We act solely as an intermediary between you and the service
                    providers (e.g., tour operators, hotels, transportation
                    companies). We are not responsible for any acts, omissions,
                    or errors on the part of these providers.
                  </li>
                  <li>
                    To the maximum extent permitted by law, we are not liable
                    for any direct, indirect, incidental, or consequential
                    damages arising from your use of our website or services.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  7. Intellectual Property
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    All content on our website, including text, images,
                    graphics, logos, and design, is the property of Trailblazers
                    or its licensors and is protected by copyright and
                    intellectual property laws.
                  </li>
                  <li>
                    You may not reproduce, distribute, or use any content from
                    our website without our prior written consent.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">8. Governing Law</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    These Terms are governed by and construed in accordance with
                    the laws of Myanmar.
                  </li>
                  <li>
                    Any disputes arising out of or related to these Terms shall
                    be resolved exclusively in the courts of Myanmar.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  9. Contact Information
                </h3>
                <p>
                  If you have any questions or concerns about these Terms,
                  please contact us at:
                </p>
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

              <p className="text-sm text-gray-600">
                Thank you for choosing Trailblazers. We look forward to
                providing you with exceptional travel experiences!
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

export default TermsOfUs;
