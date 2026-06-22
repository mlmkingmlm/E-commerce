import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NewsLetter from "./NewsLetter";
import { getSetting } from "../Redux/ActionCreators/SettingActionCreator";
import { useDispatch, useSelector } from "react-redux";

function Footer() {
  const SettingStateData = useSelector((state) => state.SettingStateData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);

  return (
    <>
      {/* Newsletter */}
      <NewsLetter />

      {/* Start footer */}
      <section className="footer-section bg-section-2 section-padding bg-dark">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-4 g-4">
            
            {/* About Us */}
            <div className="col">
              <div className="footer-widget-6">
                <img
                  src="assets/images/logo.png"
                  className="logo-img mb-3"
                  alt="Logo"
                  style={{ width: "200px" }}
                />
                <h5 className="mb-3 fw-bold text-light">About Us</h5>
                <p className="mb-2 text-light">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don’t look
                  even slightly believable.
                </p>
                <a className="link-dark text-light" href="#">
                  Read More
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col">
              <div className="footer-widget-7">
                <h5 className="mb-3 fw-bold text-light">Quick Links</h5>
                <ul className="widget-link list-unstyled">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Profile</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Company Links */}
            <div className="col">
              <div className="footer-widget-8">
                <h5 className="mb-3 fw-bold text-light">Company</h5>
                <ul className="widget-link list-unstyled">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Privacy</a>
                  </li>
                  <li>
                    <a href="#">Terms</a>
                  </li>
                  <li>
                    <a href="#">Complaints</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Follow Us + Contact */}
            <div className="col">
              <div className="footer-widget-9">
                <h5 className="mb-3 fw-bold text-light">Follow Us</h5>
                <div className="social-link d-flex align-items-center gap-2">
                  <a href="#"><i className="bi bi-facebook" /></a>
                  <a href="#"><i className="bi bi-twitter" /></a>
                  <a href="#"><i className="bi bi-linkedin" /></a>
                  <a href="#"><i className="bi bi-youtube" /></a>
                  <a href="#"><i className="bi bi-instagram" /></a>
                </div>

                {/* Support */}
                <div className="mb-3 mt-3">
                  <h5 className="mb-0 fw-bold text-light">Support</h5>
                  <p className="mb-0 text-muted">
                    <a href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`}>
                      {import.meta.env.VITE_SITE_EMAIL}
                    </a>
                  </p>
                </div>

                {/* Contact */}
                <div>
                  <h5 className="mb-0 fw-bold text-light">Contact</h5>
                  <p className="mb-0 text-muted">
                    <a
                      href={`tel:${
                        SettingStateData[0]?.phone ||
                        import.meta.env.VITE_SITE_NUMBER
                      }`}
                    >
                      {SettingStateData[0]?.phone ||
                        import.meta.env.VITE_SITE_NUMBER}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile App Section */}
          <div className="my-5" />
          <div className="row">
            <div className="col-12 text-center">
              <h5 className="fw-bold mb-3 text-light">Download Mobile App</h5>
              <div className="app-icon d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2">
                <div>
                  <a href={`${import.meta.env.VITE_SITE_MAP1}`}>
                    Visit Our Location
                  </a>
                </div>
                <div>
                  <a href="#">
                    <img
                      src="assets/images/play-store.webp"
                      width={160}
                      alt="Play Store"
                    />
                  </a>
                </div>
                <div>
                  <a href="#">
                    <img
                      src="assets/images/apple-store.webp"
                      width={160}
                      alt="Apple Store"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Strip */}
      <footer className="footer-strip text-center py-3 bg-section-2 border-top">
        <p className="mb-0 text-muted">
          © {new Date().getFullYear()}. www.example.com | All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default Footer;
