import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/HowItWorks.css";

const HowItWorks = () => {
  return (
    <div className="howitworks-page">
      <Navbar />

      <main className="howitworks-main">
        <div className="howitworks-content">
          <h1 className="howitworks-title">
            How <span className="howitworks-highlight">Crypto-Crowd</span> Works
          </h1>
          <p className="howitworks-subtitle">
            Crypto-Crowd is a blockchain-based crowdfunding platform that empowers entrepreneurs and change-makers to launch projects and raise funds in a secure, decentralized manner.
            <br /><br />
            Here’s a simple breakdown of how the platform works from both creator and supporter perspectives:
          </p>

          <h2 className="howitworks-heading">🔶 For Campaign Creators</h2>
          <ol className="howitworks-list">
            <li><strong> Register:</strong> Sign up on the platform and verify your wallet.</li>
            <li><strong> Create Campaign:</strong> Define your campaign goals, timeline, funding target, and add media like videos, descriptions, etc.</li>
            <li><strong> Smart Contract Deployment:</strong> Our platform auto-generates a smart contract for your campaign — ensuring funds can only be accessed if goals are met.</li>
            <li><strong> Promote:</strong> Share your campaign via social media, newsletters, and crypto communities.</li>
            <li><strong> Receive Funds:</strong> If the campaign succeeds, funds are automatically transferred to your wallet.</li>
          </ol>

          <h2 className="howitworks-heading">🔷 For Supporters & Donors</h2>
          <ol className="howitworks-list">
            <li><strong> Browse Projects:</strong> Explore live campaigns across categories — tech, environment, health, education, etc.</li>
            <li><strong> Contribute via Crypto:</strong> Select the project and send crypto (ETH, MATIC, or USDT) using your Web3 wallet (e.g., MetaMask).</li>
            <li><strong> Track Impact:</strong> All transactions and milestones are recorded on the blockchain. Get notified when goals are reached.</li>
            <li><strong> Refundable Contributions:</strong> If a project fails to meet its goal, your funds are automatically refunded via smart contract.</li>
          </ol>

          <h2 className="howitworks-heading">💡 Features that Make It Work</h2>
          <ul className="howitworks-features">
            <li>✅ Web3 integration for secure crypto transactions</li>
            <li>✅ Real-time campaign analytics and transparency</li>
            <li>✅ Immutable smart contracts ensure trustless execution</li>
            <li>✅ No third-party handling of funds</li>
            <li>✅ Support from a global community of backers</li>
          </ul>

          <p className="howitworks-ending">
            At Crypto-Crowd, your ideas don’t just stay ideas — they turn into powerful, decentralized movements. Start your journey today.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
