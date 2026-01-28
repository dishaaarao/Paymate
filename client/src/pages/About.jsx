import React from 'react';
import Navbar from '../components/Navbar';
import './About.css';

const teamImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

const About = () => {
    return (
        <div className="about-page">
            <Navbar />

            {/* Breadcrumb section */}
            <div className="about-header-bg">
                <div className="container">
                    <div className="breadcrumb">Home {'>'} About us</div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="about-hero">
                <div className="container">
                    <h1 className="about-title">
                        Built for Every<br />
                        <span>Investor & Trader</span>
                        to Invest Smarter
                    </h1>

                    <p className="about-description">
                        At PayMate, our vision has always been to simplify investing and trading for everyone,
                        from first-time investors to seasoned traders. We believe financial freedom is not just a
                        goal but a journey, and our platform is designed to empower you every step of the way.
                    </p>

                    <div className="ceo-quote">
                        <div className="quote-author" style={{ color: '#012a72', fontWeight: 'bold' }}>Sandeep Bhardwaj</div>
                        <div className="quote-role" style={{ color: '#64748b' }}>CEO</div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="values-section">
                <div className="container">
                    <h2 className="section-headline">Our Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">👤</div>
                            <h3 className="value-title">Customer First</h3>
                            <p className="value-desc">We prioritize your financial goals and needs above all else with dedicated support.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">📄</div>
                            <h3 className="value-title">Transparency</h3>
                            <p className="value-desc">Clear, honest, and upfront in everything we do. We believe in absolute zero hidden fees.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">💡</div>
                            <h3 className="value-title">Innovation</h3>
                            <p className="value-desc">Constantly evolving to provide cutting-edge trading tools and wealth management services.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">🤝</div>
                            <h3 className="value-title">Collaboration</h3>
                            <p className="value-desc">Fostering teamwork and strategic partnerships to create sustainable long-term value.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="story-section">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-content">
                            <h2>Our Story</h2>
                            <span className="story-subtitle">From Humble Beginnings to Transformative Growth</span>

                            <p className="story-text">
                                Our journey began in 2016 with a single vision: to make investing accessible to everyone.
                                Founded by a team of passionate innovators, PayMate was born out of a desire to simplify
                                the complex world of finance.
                            </p>
                            <p className="story-text">
                                Today, we proudly serve a community of over 21 million customers, providing them with
                                the tools they need to achieve their financial dreams.
                            </p>
                        </div>
                        <div className="story-image-wrapper">
                            <img src={teamImage} alt="Team" className="story-image" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Careers CTA */}
            <div className="revolution-section">
                <div className="container">
                    <h2 className="section-headline" style={{ color: 'white' }}>Be Part of a Financial Revolution</h2>
                    <p className="about-description">
                        At PayMate, we're on a mission to transform how people invest. If you're passionate about
                        innovation and customer success, join our fast-growing team.
                    </p>
                    <button className="btn-join-team">Join Our Team Today</button>
                </div>
            </div>

            {/* Community Section */}
            <div className="community-section">
                <div className="container">
                    <h2 className="section-headline">Join the 21 million+ community<br />of empowered investors</h2>
                    <p className="about-description">
                        Open a demat & trading account and start investing in equity, F&O, Mutual Funds, IPOs today.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
