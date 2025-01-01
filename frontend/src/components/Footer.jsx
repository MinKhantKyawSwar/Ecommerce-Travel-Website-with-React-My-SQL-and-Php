import React from "react";
import TermsOfUseModal from "./Footer Components/TermsOfUseModal";
import AboutUsModal from "./Footer Components/AboutUsModal";
import ContactModal from "./Footer Components/ContactModal";

const Footer = () => {
  return (
    <>
      <footer className=" p-10 bg-gray-800 text-white py-7">
        <div className="footer">
          <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover" href="/">Home</a>
            <a className="link link-hover" href="/Explore">Explore</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <AboutUsModal/>
            <ContactModal/>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
           <TermsOfUseModal/>
          </nav>
          <form>
            <h6 className="footer-title">Newsletter</h6>
            <fieldset className="form-control w-80">
              <label className="label">
                <span className="label-text">Enter your email address</span>
              </label>
              <div className="join">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered join-item text-black"
                />
                <button className="btn btn-primary join-item">Subscribe</button>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="w-full px-4 text-center mt-10">
          <p className="text-sm">
            &copy; 2024 Trailblazers. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
