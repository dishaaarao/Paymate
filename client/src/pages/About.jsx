import React from 'react';
import Navbar from '../components/Navbar';
import './About.css';

// Using placeholder images for the "Story" team image since exact asset isn't available
// In a real scenario, this would be an import from assets
const teamImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

const About = () => {
    return (
        <div className="about-page">
            <Navbar />

            {/* Header Background Area */}
            <div className="about-header-bg">
                <div className="breadcrumb">Home {'>'} About us</div>
            </div>

            {/* Hero Section */}
            <div className="about-hero">
                <h1 className="about-title">
                    Built for Every<br />
                    <span>Investor & Trader</span>
                    to Invest Smarter
                </h1>

                <p className="about-description">
                    At PayMate, our vision has always been to simplify investing and trading for everyone,
                    from first-time investors to seasoned traders. We believe financial freedom is not just a
                    goal but a journey, and our platform is designed to empower you every step of the way.
                    Thank you for trusting us to be part of your financial journey. Together, let's build a future
                    of wealth and opportunity.
                </p>

                <div className="ceo-quote">
                    <div className="quote-author">Sandeep Bhardwaj</div>
                    <div className="quote-role">CEO</div>
                </div>
            </div>

            {/* Our Values Section */}
            <div className="values-section">
                <h2 className="section-headline">Our Values</h2>

                <div className="values-grid">
                    <div className="value-card">
                        <div className="value-icon">👤</div>
                        <h3 className="value-title">Customer First</h3>
                        <p className="value-desc">We prioritize your financial goals and needs above all else.</p>
                    </div>

                    <div className="value-card">
                        <div className="value-icon">📄</div>
                        <h3 className="value-title">Transparency</h3>
                        <p className="value-desc">Clear, honest, and upfront in everything we do. No hidden fees.</p>
                    </div>

                    <div className="value-card">
                        <div className="value-icon">💡</div>
                        <h3 className="value-title">Innovation</h3>
                        <p className="value-desc">Constantly evolving to provide cutting-edge tools and services.</p>
                    </div>

                    <div className="value-card">
                        <div className="value-icon">🤝</div>
                        <h3 className="value-title">Collaboration</h3>
                        <p className="value-desc">Fostering teamwork and partnerships to create true value.</p>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="story-section">
                <div className="story-content">
                    <h2>Our Story</h2>
                    <span className="story-subtitle">From Humble Beginnings to Transformative Growth</span>

                    <p className="story-text">
                        Our journey began in 2016 with a single vision: to make investing accessible to everyone,
                        regardless of their background or experience. Founded by a team of passionate innovators and
                        financial experts, PayMate was born out of a desire to simplify the complex world of investments.
                    </p>
                    <p className="story-text">
                        In our early days, we started small, but our ambition was limitless. Over the years, we focused on
                        building a platform that combined advanced technology with user-friendly solutions. Today, we
                        proudly serve a community of over 4 million customers.
                    </p>
                    <p className="story-text">
                        Thank you for being a part of our story. Together, we'll continue to redefine what's possible in the
                        world of investments.
                    </p>
                </div>
                <div className="story-image-wrapper">
                    <img src={teamImage} alt="Team Collaboration" className="story-image" />
                </div>
            </div>

            {/* Revolution / Career Section */}
            <div className="revolution-section">
                <h2 className="section-headline">Be Part of a Financial Revolution</h2>
                <p className="about-description">
                    At PayMate, we're on a mission to transform how people invest and trade. If you're passionate about
                    innovation, customer success, and making a real impact, we'd love to have you on our team.
                </p>
                <button className="btn-join-team">Join Our Team Today</button>
            </div>

            {/* Community Section */}
            <div className="community-section">
                <h2 className="section-headline">Join the 21 million+ community<br />of empowered investors</h2>
                <p className="about-description">
                    Open a demat & trading account and start investing in equity, F&O, Mutual Funds, IPOs today.
                </p>
            </div>
        </div>
    );
};

export default About;
