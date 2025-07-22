import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/About.css"; // New CSS file for About Page

const About = () => {
  return (
    <div className="about-page">
      <Navbar />

      <main className="about-section">
        <div className="about-content">
          <h1 className="about-title">
            About <span className="highlight">Crypto-Crowd</span>
          </h1>
          <p className="about-description">
            Crypto-Crowd is a next-generation crowdfunding platform powered by
            blockchain. Our mission is to bring transparency, security, and
            decentralization to the fundraising ecosystem.
            <br />
            <br />
            Unlike traditional platforms, we leverage smart contracts to ensure
            that every contribution is traceable, tamper-proof, and goes exactly
            where it's intended. Whether you're an innovator with a
            world-changing idea or a donor looking to support meaningful causes,
            Crypto-Crowd provides the trust and efficiency you need.
            <br />
            <br />
            <strong>🚀 Why Choose Crypto-Crowd?</strong>
          </p>

          <ul className="about-list">
            <li>✅ 100% Transparent Smart Contract-based Funding</li>
            <li>✅ Global Access to Donors and Innovators</li>
            <li>✅ Fast, Low-Fee Transactions with Crypto Payments</li>
            <li>✅ Full Project Lifecycle Management</li>
          </ul>

          <p className="about-description">
            Join the revolution of decentralized giving. At Crypto-Crowd, we
            believe the future of crowdfunding belongs to the people — open,
            fair, and on the blockchain.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
