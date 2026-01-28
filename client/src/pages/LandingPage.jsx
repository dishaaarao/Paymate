import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import heroImage from '../assets/paytm-hero.png';
import stocksIcon from '../assets/stocks-icon.png';
import fnoIcon from '../assets/fno-icon.png';
import payLaterIcon from '../assets/pay-later-icon.png';
import mutualFundsIcon from '../assets/mutual-funds-icon.png';
import accountOpeningIcon from '../assets/account-opening-icon.png';
import zeroAmcIcon from '../assets/zero-amc-icon.png';
import accountOpenImg from '../assets/account-open.png';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page-root">
            {/* 1. Hero & Navbar Section */}
            <header className="hero-landing">
                <div className="hero-glow-top"></div>

                <nav className="main-navbar">
                    <div className="container-fixed">
                        <div className="nav-flex">
                            <div className="nav-left">
                                <div className="brand-logo" onClick={() => navigate('/')}>
                                    <div className="logo-triangle">
                                        <span>₹</span>
                                    </div>
                                    <div className="logo-text-group">
                                        <span className="logo-main">PayMate</span>
                                        <span className="logo-sub">Money</span>
                                    </div>
                                </div>

                                <div className="search-bar-wrap">
                                    <span className="search-icon">🔍</span>
                                    <input type="text" placeholder="Search Stocks" />
                                </div>
                            </div>

                            <div className="nav-middle">
                                <span className="nav-item">Products</span>
                                <span className="nav-item">Pricing</span>
                                <span className="nav-item">Company</span>
                                <span className="nav-item">Contact Us</span>
                            </div>

                            <div className="nav-right">
                                <button className="btn-login-outline" onClick={() => navigate('/login')}>Login</button>
                                <button className="btn-signup-solid" onClick={() => navigate('/register')}>Sign up</button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="container-fixed">
                    <div className="hero-content-grid">
                        <div className="hero-text-area">
                            <p className="hero-pill-label">All-in-One Wealth Management</p>
                            <h1 className="hero-headline">
                                Your Partner in<br />
                                Smart Investing
                            </h1>
                            <p className="hero-description">
                                Explore Stocks, F&O, Mutual Funds,and IPOs with Ease.<br />
                                Your Financial Growth Starts Here!
                            </p>

                            <button className="btn-primary-neon" onClick={() => navigate('/register')}>
                                Open Demat account
                            </button>

                            <div className="hero-footer-stats">
                                <span>21 million+ investors</span>
                                <span className="stat-divider">|</span>
                                <span className="rating-wrap">
                                    4.4 <span className="star-gold">★</span> App store rating
                                </span>
                            </div>
                        </div>

                        <div className="hero-mockup-wrapper">
                            <img src={heroImage} alt="App Interface" className="mockup-img-main" />
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. Options Section */}
            <section className="light-section">
                <div className="container-fixed">
                    <h2 className="section-headline">Explore Diverse Investment Options</h2>
                    <p className="section-subtext">
                        We bring you a seamless, easy-to-navigate platform to manage your investments across various asset classes.
                    </p>

                    <div className="marquee-container">
                        <div className="marquee-inner">
                            {[...Array(2)].map((_, i) => (
                                <React.Fragment key={i}>
                                    <div className="invest-card">
                                        <img src={stocksIcon} alt="Stocks" className="card-icon" />
                                        <h3 className="card-title">Stocks</h3>
                                        <p className="card-body">Invest or trade in stocks and build your portfolio effortlessly.</p>
                                        <button className="btn-card-link">Know more</button>
                                    </div>
                                    <div className="invest-card">
                                        <img src={fnoIcon} alt="F&O" className="card-icon" />
                                        <h3 className="card-title">F&O</h3>
                                        <p className="card-body">Leverage market views using futures and options smartly.</p>
                                        <button className="btn-card-link">Know more</button>
                                    </div>
                                    <div className="invest-card">
                                        <img src={payLaterIcon} alt="Pay Later" className="card-icon" />
                                        <h3 className="card-title">Pay Later (MTF)</h3>
                                        <p className="card-body">Get up to 4x leverage to trade in your favorite stocks.</p>
                                        <button className="btn-card-link">Know more</button>
                                    </div>
                                    <div className="invest-card">
                                        <img src={mutualFundsIcon} alt="Mutual Funds" className="card-icon" />
                                        <h3 className="card-title">Mutual Funds</h3>
                                        <p className="card-body">Diversify your investments with our top fund curated choices.</p>
                                        <button className="btn-card-link">Know more</button>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Journey (Zero Fees) Section Refined */}
            <section className="journey-section">
                <div className="container-fixed">
                    <div className="journey-grid">
                        <div className="journey-content">
                            <h2 className="journey-title">Start your journey,<br />absolutely free</h2>
                            <p className="section-subtext" style={{ textAlign: 'left', marginLeft: 0, marginBottom: '40px' }}>
                                No hidden fees, no upfront costs. Start your investment journey today.
                            </p>

                            <div className="benefit-item">
                                <img src={accountOpeningIcon} alt="Free" className="benefit-icon-img" />
                                <div className="benefit-info">
                                    <h4>No Account Opening Fee</h4>
                                    <p>Begin your investment journey without any initial cost</p>
                                </div>
                            </div>

                            <div className="benefit-item">
                                <img src={zeroAmcIcon} alt="AMC" className="benefit-icon-img" />
                                <div className="benefit-info">
                                    <h4>Zero AMC for Life</h4>
                                    <p>Keep your account for a lifetime without maintenance charges</p>
                                </div>
                            </div>

                            <div className="benefit-item">
                                <div className="benefit-price">₹0</div>
                                <div className="benefit-info">
                                    <h4>Zero Brokerage for 1 Month</h4>
                                    <p>Trade without fees for your first month.</p>
                                </div>
                            </div>

                            <button className="btn-dark-cta" onClick={() => navigate('/register')}>
                                Get Started
                            </button>
                        </div>

                        <div className="journey-visual">
                            {/* CSS-Built Replica of user's screenshot */}
                            <div className="journey-visual-card">
                                <div className="floating-pill pill-account">Account opening</div>
                                <div className="floating-pill pill-brokerage">Brokerage*</div>
                                <div className="floating-pill pill-amc">AMC</div>

                                <div className="zero-main-display">
                                    <span className="zero-symbol">₹</span>
                                    <span className="zero-number">0</span>
                                </div>

                                {/* Decorative Elements */}
                                <div className="deco-dots">
                                    <div className="dot-circle"></div>
                                </div>
                                <div className="deco-waves">
                                    <div className="wave-line"></div>
                                    <div className="wave-line"></div>
                                    <div className="wave-line"></div>
                                </div>
                                <div className="deco-lines">
                                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.3">
                                        <path d="M10 10L50 50M10 50L50 10" stroke="#fff" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating QR Refined */}
            <div className="floating-qr-code">
                <div className="qr-grid-icon">
                    <div className="qr-dot"></div>
                    <div className="qr-dot"></div>
                    <div className="qr-dot"></div>
                    <div className="qr-dot"></div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
