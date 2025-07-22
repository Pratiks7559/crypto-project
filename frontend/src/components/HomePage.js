import React, { useState } from "react";
import {
  FaRocket,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaLightbulb,
  FaHandHoldingUsd,
  FaGlobe,
  FaMobileAlt,
  FaLock,
  FaCode,
  FaExchangeAlt
} from "react-icons/fa";
import { MdCampaign, MdExplore, MdTrendingUp, MdAttachMoney } from "react-icons/md";
import { RiRefund2Fill } from "react-icons/ri";
import { BsGraphUp, BsClockHistory } from "react-icons/bs";
import '../styles/HomePage.css';
import Navbar from "./Navbar";
import Footer from "./Footer";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('trending');

  const featuredCampaigns = [
    {
      id: 1,
      title: "Solar Village Project",
      description: "Bringing solar power to rural communities",
      progress: 75,
      amount: "₹25,00,000",
      category: "Environment"
    },
    {
      id: 2,
      title: "Blockchain Education",
      description: "Free blockchain courses for students",
      progress: 45,
      amount: "₹12,50,000",
      category: "Education"
    },
    {
      id: 3,
      title: "Medical Research Fund",
      description: "Developing new cancer treatments",
      progress: 90,
      amount: "₹50,00,000",
      category: "Health"
    }
  ];

  const successStories = [
    {
      id: 1,
      title: "Clean Water Initiative",
      raised: "₹30,00,000",
      backers: 1200,
      impact: "Provided clean water to 50 villages"
    },
    {
      id: 2,
      title: "Tech for Farmers",
      raised: "₹18,00,000",
      backers: 850,
      impact: "Equipped 200 farms with smart sensors"
    }
  ];

  return (
    <div className="homepage">
      <Navbar/>

      {/* HERO SECTION */}
      <header className="homepage__hero">
        <div className="homepage__heroContent">
          <h1 className="homepage__title">Empower Ideas with <span className="highlight">Blockchain Crowdfunding</span></h1>
          <p className="homepage__subtitle">
            Launch, manage, and support projects with transparency and trust through blockchain.
          </p>
          <div className="homepage__heroButtons">
            <button className="homepage__btn"><MdCampaign /> Start Campaign</button>
            <button className="homepage__btn homepage__btn--outline"><MdExplore /> Explore</button>
          </div>
        </div>

        <div className="homepage__stats">
          <div className="homepage__statCard">
            <FaChartLine size={24} />
            <h3>₹40,00,000+</h3>
            <p>Total Raised</p>
          </div>
          <div className="homepage__statCard">
            <FaUsers size={24} />
            <h3>2,000+</h3>
            <p>Global Donors</p>
          </div>
          <div className="homepage__statCard">
            <FaRocket size={24} />
            <h3>85</h3>
            <p>Live Campaigns</p>
          </div>
        </div>
      </header>

      {/* HOW IT WORKS SECTION */}
      <section className="homepage__section homepage__howItWorks">
        <h2 className="homepage__sectionTitle">How It Works</h2>
        <div className="homepage__steps">
          <div className="homepage__step">
            <div className="homepage__stepIcon"><FaLightbulb size={32} /></div>
            <h3>1. Submit Your Idea</h3>
            <p>Create a campaign for your project with details and funding goal</p>
          </div>
          <div className="homepage__step">
            <div className="homepage__stepIcon"><FaHandHoldingUsd size={32} /></div>
            <h3>2. Get Backers</h3>
            <p>Share your campaign and get support from our community</p>
          </div>
          <div className="homepage__step">
            <div className="homepage__stepIcon"><FaGlobe size={32} /></div>
            <h3>3. Reach Your Goal</h3>
            <p>Funds are released only when campaign succeeds</p>
          </div>
        </div>
      </section>

      {/* FEATURED CAMPAIGNS */}
      <section className="homepage__section homepage__campaigns">
        <div className="homepage__sectionHeader">
          <h2 className="homepage__sectionTitle">Featured Campaigns</h2>
          <div className="homepage__tabs">
            <button 
              className={`homepage__tab ${activeTab === 'trending' ? 'active' : ''}`}
              onClick={() => setActiveTab('trending')}
            >
              <MdTrendingUp /> Trending
            </button>
            <button 
              className={`homepage__tab ${activeTab === 'newest' ? 'active' : ''}`}
              onClick={() => setActiveTab('newest')}
            >
              <BsClockHistory /> Newest
            </button>
            <button 
              className={`homepage__tab ${activeTab === 'ending' ? 'active' : ''}`}
              onClick={() => setActiveTab('ending')}
            >
              <RiRefund2Fill /> Ending Soon
            </button>
          </div>
        </div>

        <div className="homepage__campaignGrid">
          {featuredCampaigns.map(campaign => (
            <div key={campaign.id} className="homepage__campaignCard">
              <div className="homepage__campaignImage"></div>
              <div className="homepage__campaignContent">
                <span className="homepage__campaignCategory">{campaign.category}</span>
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
                <div className="homepage__progressBar">
                  <div style={{width: `${campaign.progress}%`}}></div>
                </div>
                <div className="homepage__campaignStats">
                  <span><strong>{campaign.progress}%</strong> funded</span>
                  <span><strong>{campaign.amount}</strong> raised</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="homepage__section homepage__benefits">
        <h2 className="homepage__sectionTitle">Why Choose Blockchain Crowdfunding?</h2>
        <div className="homepage__benefitsGrid">
          <div className="homepage__benefitCard">
            <FaShieldAlt size={40} className="homepage__benefitIcon" />
            <h3>Transparent</h3>
            <p>All transactions are recorded on the blockchain for complete transparency</p>
          </div>
          <div className="homepage__benefitCard">
            <FaLock size={40} className="homepage__benefitIcon" />
            <h3>Secure</h3>
            <p>Smart contracts ensure funds are only released when conditions are met</p>
          </div>
          <div className="homepage__benefitCard">
            <MdAttachMoney size={40} className="homepage__benefitIcon" />
            <h3>Low Fees</h3>
            <p>Eliminate middlemen with direct peer-to-peer funding</p>
          </div>
          <div className="homepage__benefitCard">
            <FaMobileAlt size={40} className="homepage__benefitIcon" />
            <h3>Global Access</h3>
            <p>Anyone can participate from anywhere in the world</p>
          </div>
          {/* New Benefit Cards */}
          <div className="homepage__benefitCard">
            <FaCode size={40} className="homepage__benefitIcon" />
            <h3>Decentralized</h3>
            <p>No single point of failure with distributed ledger technology</p>
          </div>
          <div className="homepage__benefitCard">
            <FaExchangeAlt size={40} className="homepage__benefitIcon" />
            <h3>Instant Settlements</h3>
            <p>Fast and efficient fund transfers without banking delays</p>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="homepage__section homepage__success">
        <h2 className="homepage__sectionTitle">Success Stories</h2>
        <div className="homepage__successGrid">
          {successStories.map(story => (
            <div key={story.id} className="homepage__successCard">
              <div className="homepage__successContent">
                <h3>{story.title}</h3>
                <div className="homepage__successStats">
                  <p><BsGraphUp /> ₹{story.raised} raised</p>
                  <p><FaUsers /> {story.backers} backers</p>
                </div>
                <p className="homepage__successImpact">{story.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="homepage__section homepage__cta">
        <div className="homepage__ctaContent">
          <h2>Ready to Launch Your Project?</h2>
          <p>Join thousands of creators who've brought their ideas to life through our platform</p>
          <button className="homepage__btn homepage__btn--large"><FaRocket /> Start Your Campaign</button>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default HomePage;