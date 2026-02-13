import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LandingPage.css';
import './LandingPageWhite.css'; // New styles
import heroImage from '../assets/paytm-hero.png';
import accountOpenImg from '../assets/account-open.png';
import stocksIcon from '../assets/stocks-icon.png';
import fnoIcon from '../assets/fno-icon.png';
import payLaterIcon from '../assets/pay-later-icon.png';
import mutualFundsIcon from '../assets/mutual-funds-icon.png';
import accountOpeningIcon from '../assets/account-opening-icon.png';
import zeroAmcIcon from '../assets/zero-amc-icon.png';

const LandingPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div style={{ width: '100%', overflowX: 'hidden' }}>
            {/* 1. Hero Section (Dark Theme) */}
            <div className="landing-container">
                {/* Paytm Money style Navigation */}
                <nav className="landing-nav">
                    <div className="logo-container" onClick={() => navigate('/')}>
                        {/* Triangle Logo */}
                        <div style={{
                            width: '32px',
                            height: '32px',
                            background: 'linear-gradient(135deg, #00baf2 0%, #00d09c 100%)',
                            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                        }}>
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginTop: '5px' }}>₹</span>
                        </div>
                        <div className="logo">PayMate</div>
                    </div>

                    <div className="nav-links">
                        <span className="nav-link-item">Products</span>
                        <span className="nav-link-item">Pricing</span>
                        <span className="nav-link-item">Company</span>
                        <span className="nav-link-item" onClick={() => navigate('/about')}>About Us</span>
                    </div>

                    <div className="nav-buttons">
                        {user ? (
                            <button className="btn-login" onClick={() => navigate('/dashboard')}>Dashboard</button>
                        ) : (
                            <>
                                <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
                                <button className="btn-signup" onClick={() => navigate('/register')}>Sign Up</button>
                            </>
                        )}
                    </div>
                </nav>

                {/* Content Section (Left) */}
                <div className="content-section">
                    <div style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '-1rem', fontWeight: 400 }}>
                        All-in-One Wealth Management
                    </div>
                    <h1 className="headline">
                        Your Partner in<br />
                        Smart Investing
                    </h1>
                    <p className="subheadline">
                        Explore Stocks, F&O, Mutual Funds,and IPOs with Ease.<br />
                        Your Financial Growth Starts Here!
                    </p>

                    <div className="cta-group">
                        <button
                            className="btn-get-started"
                            onClick={() => navigate('/register')}
                        >
                            Open Demat account
                        </button>

                        {/* Stats Footer */}
                        <div className="stats-container">
                            <span>21 million+ investors</span>
                            <div className="stats-divider"></div>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                4.4 <span className="star-icon">★</span> App store rating
                            </span>
                        </div>
                    </div>
                </div>

                {/* Hero Image Section (Right) */}
                <div className="hero-section">
                    <div className="hero-image-wrapper">
                        <img src={heroImage} alt="Stock Trading App Interface" className="hero-image" />
                    </div>
                </div>
            </div>

            {/* 2. Explore Diverse Options Section (Light Theme) */}
            <div className="sections-wrapper">
                <div className="section-container" style={{ position: 'relative' }}>
                    <h2 className="section-title">Explore Diverse Investment Options</h2>
                    <p className="section-subtitle">We bring you a seamless, easy-to-navigate platform to manage your investments,</p>

                    {/* Floating QR Code Button */}


                    {/* Scrolling Options Marquee */}
                    <div className="marquee-container">
                        <div className="marquee-content">
                            {/* Duplicate the items to create a seamless loop */}
                            {[...Array(2)].map((_, i) => (
                                <React.Fragment key={i}>
                                    {/* Card 1: Stocks */}
                                    <div className="option-card">
                                        <img src={stocksIcon} alt="Stocks" className="option-icon" />
                                        <h3 className="option-title">Stocks</h3>
                                        <p className="option-desc">Invest or trade in stocks and build your portfolio.</p>
                                        <button className="btn-know-more">Know more</button>
                                    </div>

                                    {/* Card 2: F&O */}
                                    <div className="option-card">
                                        <img src={fnoIcon} alt="F&O" className="option-icon" />
                                        <h3 className="option-title">F&O</h3>
                                        <p className="option-desc">Leverage market views using futures and options smartly.</p>
                                        <button className="btn-know-more">Know more</button>
                                    </div>

                                    {/* Card 3: Pay Later (MTF) */}
                                    <div className="option-card">
                                        <img src={payLaterIcon} alt="Pay Later (MTF)" className="option-icon" />
                                        <h3 className="option-title">Pay Later (MTF)</h3>
                                        <p className="option-desc">Get up to 4x leverage to trade in stocks.</p>
                                        <button className="btn-know-more">Know more</button>
                                    </div>

                                    {/* Card 4: Mutual Funds */}
                                    <div className="option-card">
                                        <img src={mutualFundsIcon} alt="Mutual Funds" className="option-icon" />
                                        <h3 className="option-title">Mutual Funds</h3>
                                        <p className="option-desc">Diversify your investments with top fund choices.</p>
                                        <button className="btn-know-more">Know more</button>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Start Journey Section (Light Theme) */}
            <div className="journey-section">
                <div className="journey-content">
                    <h2 className="journey-headline">Start your journey,<br />absolutely free</h2>
                    <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No hidden fees, no upfront costs. Start your investment journey today.</p>

                    <div className="benefit-item">
                        <img src={accountOpeningIcon} className="benefit-icon" alt="Free" />
                        <div className="benefit-text">
                            <h4>No Account Opening Fee</h4>
                            <p>Begin your investment journey without any initial cost</p>
                        </div>
                    </div>

                    <div className="benefit-item">
                        <img src={zeroAmcIcon} className="benefit-icon" alt="Zero AMC" />
                        <div className="benefit-text">
                            <h4>Zero AMC for Life</h4>
                            <p>Keep your account for a lifetime without maintenance charges</p>
                        </div>
                    </div>

                    <div className="benefit-item">
                        <span style={{ fontSize: '2.5rem', marginRight: '1rem', color: '#00baf2', fontWeight: 'bold' }}>₹0</span>
                        <div className="benefit-text">
                            <h4>Zero Brokerage for 1 Month</h4>
                            <p>Trade without fees for your first month.</p>
                        </div>
                    </div>

                    <button
                        className="btn-get-started"
                        style={{ width: 'fit-content', marginTop: '1rem' }}
                        onClick={() => navigate('/register')}
                    >
                        Get Started
                    </button>
                </div>

                <div className="journey-image-wrapper">
                    <img src={accountOpenImg} alt="Zero Brokerage" className="journey-image" />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
