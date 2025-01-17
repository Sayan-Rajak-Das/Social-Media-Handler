import React from "react";

const Footer = () => {
    return (
        <footer className="footer-section py-5 bg-dark text-white mt-5">
            <div className="container">
                <div className="row">
                    {/* Brand and Description */}
                    <div className="col-md-4 mb-4">
                        <h4 className="text-uppercase">SocialMediaHandler</h4>
                        <p className="small">
                            The ultimate platform to manage your social media effortlessly.
                            Stay connected, grow your network, and share your moments with ease.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 mb-4">
                        <h5 className="text-uppercase">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/" className="text-white text-decoration-none">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-white text-decoration-none">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/features" className="text-white text-decoration-none">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/sayan-rajak-das/" className="text-white text-decoration-none">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div className="col-md-4">
                        <h5 className="text-uppercase">Follow Us</h5>
                        <div className="d-flex">
                            <a
                                href="https://facebook.com"
                                className="text-white me-3"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="bi bi-facebook fs-4"></i>
                            </a>
                            <a
                                href="https://twitter.com"
                                className="text-white me-3"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="bi bi-twitter fs-4"></i>
                            </a>
                            <a
                                href="https://instagram.com"
                                className="text-white me-3"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="bi bi-instagram fs-4"></i>
                            </a>
                            <a
                                href="https://linkedin.com"
                                className="text-white"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="bi bi-linkedin fs-4"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="border-secondary" />
                {/* Bottom Copyright */}
                <div className="text-center">
                    <p className="mb-0 small">
                        &copy; {new Date().getFullYear()} SocialMediaHandler. Created by
                        &nbsp; <a href="https://www.linkedin.com/in/sayan-rajak-das/" target="_blank" className="text-decoration-none fw-bold">Sayan Rajak Das.</a> &nbsp;
                        All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
