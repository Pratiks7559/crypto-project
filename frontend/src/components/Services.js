// Services.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/Services.css";

const Services = () => {
  return (
    <div className="services-page">
      <Navbar />
      <main className="services-content">
        <div className="services-container">
          <h1 className="services-title">
            Our <span className="services-highlight">Services</span>
          </h1>
          <p className="services-subtitle">
            At <strong>Crypto-Crowd</strong>, we offer a suite of blockchain-powered crowdfunding services designed to empower creators and protect supporters. Here’s what you can expect:
          </p>

          <section className="services-section">
            <h2 className="services-heading">🚀 Campaign Creation & Management</h2>
            <ul className="services-list">
              <li>🔹 Launch personalized campaigns with goal tracking, media uploads, and milestones.</li>
              <li>🔹 Real-time dashboard to monitor donations and user engagement.</li>
              <li>🔹 Auto-generated smart contracts for secure funding and refund logic.</li>
            </ul>
          </section>

          <section className="services-section">
            <h2 className="services-heading">🔐 Blockchain Security & Transparency</h2>
            <ul className="services-list">
              <li>🔹 Immutable smart contracts ensure transparency and decentralization.</li>
              <li>🔹 All donations are visible on-chain — no hidden fees or manipulation.</li>
              <li>🔹 Smart refund system ensures backers get money back if the campaign fails.</li>
            </ul>
          </section>

          <section className="services-section">
            <h2 className="services-heading">🌍 Global Donor Access & Wallet Integration</h2>
            <ul className="services-list">
              <li>🔹 Accept donations from any part of the world using crypto wallets (MetaMask, WalletConnect, etc.).</li>
              <li>🔹 Support for ETH, MATIC, and stablecoins (like USDT/USDC).</li>
              <li>🔹 Quick and gas-efficient transaction handling on Polygon network (or compatible chains).</li>
            </ul>
          </section>

          <section className="services-section">
            <h2 className="services-heading">📊 Analytics & Campaign Insights</h2>
            <ul className="services-list">
              <li>🔹 Visual insights on how your campaign is performing: reach, funding pace, donor geography.</li>
              <li>🔹 Identify top referrers and best-performing strategies.</li>
              <li>🔹 Optimize your content based on engagement data.</li>
            </ul>
          </section>

          <section className="services-section">
            <h2 className="services-heading">🎓 Education & Community Support</h2>
            <ul className="services-list">
              <li>🔹 Webinars and tutorials on launching successful campaigns.</li>
              <li>🔹 24/7 community support from Web3 experts and backers.</li>
              <li>🔹 Help with marketing, social promotion, and campaign growth strategies.</li>
            </ul>
          </section>

          <p className="services-footer-note">
            Whether you’re a startup, non-profit, student innovator, or artist — Crypto-Crowd gives you all the tools to fund your vision with the power of blockchain.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;