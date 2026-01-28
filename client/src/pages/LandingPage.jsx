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
            {/* --- HERO SECTION --- */}
            <header className="hero-landing">
                <div className="hero-glow-main"></div>

                <nav className="main-navbar">
                    <div className="nav-container">
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
                </nav>

                <div className="hero-main-container">
                    <div className="hero-text-content">
                        <p className="hero-pill-small">All-in-One Wealth Management</p>
                        <h1 className="hero-title-giant">
                            Your Partner in<br />
                            Smart Investing
                        </h1>
                        <p className="hero-subtitle-muted">
                            Explore Stocks, F&O, Mutual Funds,and IPOs with Ease.<br />
                            Your Financial Growth Starts Here!
                        </p>

                        <button className="btn-neon-large" onClick={() => navigate('/register')}>
                            Open Demat account
                        </button>

                        <div className="hero-stats-line">
                            <span className="stat-text">21 million+ investors</span>
                            <div className="vertical-divider"></div>
                            <span className="stat-text rating">
                                4.4 <span className="star-gold">★</span> App store rating
                            </span>
                        </div>
                    </div>

                    <div className="hero-mockup-visual">
                        <img src={heroImage} alt="App Interface Mockup" className="mockup-img-main" />
                    </div>
                </div>
            </header>

            {/* --- INVESTMENT OPTIONS SECTION --- */}
            <section className="investment-section">
                <div className="section-header-block">
                    <h2 className="section-title-main">Explore Diverse Investment Options</h2>
                    <p className="section-subtitle-muted">
                        We bring you a seamless, easy-to-navigate platform to manage your investments,
                    </p>
                </div>

                <div className="marquee-strip-outer">
                    <div className="marquee-strip-inner">
                        {[...Array(2)].map((_, i) => (
                            <React.Fragment key={i}>
                                <div className="invest-card">
                                    <img src={stocksIcon} alt="Stocks" className="card-symbol" />
                                    <h3 className="card-headline">Stocks</h3>
                                    <p className="card-para">Invest or trade in stocks and build your portfolio.</p>
                                    <button className="card-action-link">Know more</button>
                                </div>
                                <div className="invest-card">
                                    <img src={fnoIcon} alt="F&O" className="card-symbol" />
                                    <h3 className="card-headline">F&O</h3>
                                    <p className="card-para">Leverage market views using futures and options smartly.</p>
                                    <button className="card-action-link">Know more</button>
                                </div>
                                <div className="invest-card">
                                    <img src={payLaterIcon} alt="Pay Later" className="card-symbol" />
                                    <h3 className="card-headline">Pay Later (MTF)</h3>
                                    <p className="card-para">Get up to 4x leverage to trade in stocks.</p>
                                    <button className="card-action-link">Know more</button>
                                </div>
                                <div className="invest-card">
                                    <img src={mutualFundsIcon} alt="Mutual Funds" className="card-symbol" />
                                    <h3 className="card-headline">Mutual Funds</h3>
                                    <p className="card-para">Diversify your investments with top fund choices.</p>
                                    <button className="card-action-link">Know more</button>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- ZERO FEES SECTION --- */}
            <section className="zero-fees-wrap">
                <div className="zero-text-area">
                    <h2 className="zero-headline">Start your journey,<br />absolutely free</h2>
                    <p className="zero-sub-p">No hidden fees, no upfront costs. Start your investment journey today.</p>

                    <div className="zero-benefit-list">
                        <div className="benefit-item-row">
                            <img src={accountOpeningIcon} alt="Account Opening" className="benefit-img" />
                            <div className="benefit-details">
                                <h4>No Account Opening Fee</h4>
                                <p>Begin your investment journey without any initial cost</p>
                            </div>
                        </div>
                        <div className="benefit-item-row">
                            <img src={zeroAmcIcon} alt="Zero AMC" className="benefit-img" />
                            <div className="benefit-details">
                                <h4>Zero AMC for Life</h4>
                                <p>Keep your account for a lifetime without maintenance charges</p>
                            </div>
                        </div>
                        <div className="benefit-item-row">
                            <div className="big-zero-icon">₹0</div>
                            <div className="benefit-details">
                                <h4>Zero Brokerage for 1 Month</h4>
                                <p>Trade without fees for your first month.</p>
                            </div>
                        </div>
                    </div>

                    <button className="btn-get-started-dark" onClick={() => navigate('/register')}>
                        Get Started
                    </button>
                </div>

                <div className="zero-image-area">
                    <img src={accountOpenImg} alt="Zero Fees Visual" className="zero-main-img" />
                </div>
            </section>

            {/* --- FLOATING QR BUTTON --- */}
            <div className="fixed-qr-trigger">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
            </div>
        </div>
    );
};

export default LandingPage;
