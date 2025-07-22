import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/Blog.css";

const Blog = () => {
  const blogPosts = [
    {
      title: "How Blockchain Is Changing Crowdfunding",
      date: "July 15, 2025",
      excerpt:
        "Blockchain introduces trustless funding, smart contract automation, and full transparency. Learn how Crypto-Crowd uses it to reshape campaign funding.",
    },
    {
      title: "Top 5 Mistakes to Avoid When Launching a Campaign",
      date: "July 10, 2025",
      excerpt:
        "Starting a blockchain-based campaign? Don’t let avoidable errors cost you funding. Discover tips from successful campaign creators on our platform.",
    },
    {
      title: "Why Web3 Donors Are More Committed",
      date: "July 5, 2025",
      excerpt:
        "Web3 donors aren’t just contributors — they become part of the journey. Here’s why blockchain-based support leads to higher engagement and better results.",
    },
  ];

  return (
    <div className="blog-page">
      <Navbar />

      <main className="blog-content">
        <div className="blog-wrapper">
          <h1 className="blog-title">
            Latest from Our <span className="highlight">Blog</span>
          </h1>
          <p className="blog-subtitle">
            Dive into insights, tips, and trends in the world of blockchain crowdfunding and Web3 innovations.
          </p>

          <div className="blog-posts">
            {blogPosts.map((post, index) => (
              <div key={index} className="blog-card">
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-date">{post.date}</p>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <a href="#" className="blog-card-link">Read More →</a>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
