import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';
import promoImage from '../assets/paytm-hero.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
        if (res.success) {
            navigate('/dashboard');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="auth-page-root">
            <div className="auth-main-card">
                {/* Left Side: Form Section */}
                <div className="auth-form-side">
                    <div className="auth-brand-logo" onClick={() => navigate('/')}>
                        <div className="auth-logo-triangle">
                            <span>₹</span>
                        </div>
                        <div className="auth-logo-text-group">
                            <span className="auth-logo-main">PayMate</span>
                            <span className="auth-logo-sub">Money</span>
                        </div>
                    </div>

                    <h2 className="auth-page-title">Login or Create an Account</h2>

                    {error && (
                        <div style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="auth-input-wrapper">
                            <div className="auth-label-link">
                                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748b' }}>Email Address</label>
                            </div>
                            <input
                                type="email"
                                className="auth-field-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="auth-input-wrapper">
                            <div className="auth-label-link">
                                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748b' }}>Password</label>
                                <Link to="#">Login with OTP</Link>
                            </div>
                            <input
                                type="password"
                                className="auth-field-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                        </div>

                        <button type="submit" className="btn-auth-submit">
                            Proceed Securely
                        </button>
                    </form>

                    <div className="auth-divider-wrap">
                        <div className="auth-divider-line"></div>
                        <span className="auth-divider-text">Or</span>
                        <div className="auth-divider-line"></div>
                    </div>

                    <button className="btn-auth-secondary" onClick={() => navigate('/register')}>
                        Login with QR code
                    </button>

                    <div className="auth-page-footer">
                        By proceeding, you agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a> of PayMate.
                    </div>
                </div>

                {/* Right Side: Promo Section */}
                <div className="auth-promo-side">
                    <p className="promo-title-small">Switch to PayMate Money. Pay Less, Trade More.</p>
                    <h1 className="promo-headline-large">Margin Trading Facility (MTF)<br />From 7.99% p.a.</h1>

                    <div className="promo-stats-bar">
                        4X Buying Power | 1200+ Stocks
                    </div>

                    <div className="btn-promo-action">
                        Invest With MTF <span>→</span>
                    </div>

                    <img src={promoImage} alt="Dashboard Preview" className="promo-phone-mockup" />

                    <div style={{ marginTop: 'auto', fontSize: '0.75rem', color: '#94a3b8', textAlign: 'left', lineHeight: '1.4' }}>
                        Investments in securities markets are subject to market risks, read all the related documents carefully before investing.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
