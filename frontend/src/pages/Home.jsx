import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <header className="hero-section d-flex align-items-center text-white bg-secondary mt-3" style={{ height: "100vh" }}>
        <div className="container text-center">
          <h1 className="display-3">Welcome to SocialMediaHandler</h1>
          <p className="lead">
            Manage your social media profiles and posts effortlessly with our intuitive platform.
          </p>
          <div className="mt-4">
            <Link to="/register" className="btn btn-primary btn-lg me-3">
              Get Started
            </Link>
            <Link to="/" className="btn btn-outline-light btn-lg">
              Learn More
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container text-center">
          <h2 className="mb-4">Features</h2>
          <div className="row">
            <div className="col-md-4">
              <i className="bi bi-upload display-4 text-primary"></i>
              <h3 className="mt-3">Upload Images</h3>
              <p>Share your best moments seamlessly with our advanced upload tools.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-bar-chart-line display-4 text-success"></i>
              <h3 className="mt-3">Analyze Growth</h3>
              <p>Track your social media engagement and grow your online presence.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-shield-lock display-4 text-warning"></i>
              <h3 className="mt-3">Secure & Private</h3>
              <p>Your data is safe with our industry-standard security measures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4">What Our Users Say</h2>
          <div className="row">
            <div className="col-md-4">
              <blockquote className="blockquote">
                <p>"The best tool to manage all my social accounts in one place."</p>
                <footer className="blockquote-footer">Jane Doe</footer>
              </blockquote>
            </div>
            <div className="col-md-4">
              <blockquote className="blockquote">
                <p>"Absolutely amazing! It makes my workflow so much easier."</p>
                <footer className="blockquote-footer">John Smith</footer>
              </blockquote>
            </div>
            <div className="col-md-4">
              <blockquote className="blockquote">
                <p>"A must-have tool for anyone serious about social media."</p>
                <footer className="blockquote-footer">Emily Johnson</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section py-5 bg-dark text-white text-center">
        <div className="container">
          <h2 className="mb-4">Ready to Elevate Your Social Media Game?</h2>
          <Link to="/register" className="btn btn-success btn-lg">
            Join Us Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
