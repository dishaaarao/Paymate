import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';
// Reusing the hero image as it likely fits the 'app interface' look
import bannerImage from '../assets/paytm-hero.png';

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
        <div className="login-page-wrapper">
            <div className="login-container">
                {/* Left Side: Login Form */}
                <div className="login-form-section">
                    <div className="paymate-logo-wrapper" onClick={() => navigate('/')}>
                        <div className="paymate-logo-icon">
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginTop: '5px' }}>₹</span>
                        </div>
                        <div className="paymate-logo-text">PayMate</div>
                    </div>

                    <h2 className="login-title">Login or Create an Account</h2>

                    {error && (
                        <div style={{
                            background: 'rgba(255, 107, 107, 0.2)',
                            border: '1px solid #ff6b6b',
                            color: '#ff6b6b',
                            padding: '0.75rem',
                            borderRadius: '10px',
                            marginBottom: '1rem',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                        </div>

                        <button type="submit" className="btn-proceed">
                            Proceed Securely
                        </button>
                    </form>

                    <div className="divider-container">
                        <div className="divider-line"></div>
                        <span className="divider-text">Or</span>
                        <div className="divider-line"></div>
                    </div>

                    <button className="qr-login-btn" onClick={() => navigate('/register')}>
                        Create a New Account
                    </button>

                    <div className="login-footer">
                        By proceeding, you agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a> of PayMate.
                    </div>
                </div>

                {/* Right Side: Marketing Banner */}
                <div className="login-banner-section">
                    <div className="banner-content">
                        <h3 className="banner-headline">Switch to PayMate. Pay Less, Trade More.</h3>
                        <h2 className="banner-subheadline">Margin Trading Facility (MTF)<br />From 7.99% p.a.</h2>

                        <div className="banner-highlight-btn">
                            Invest With MTF →
                        </div>
                    </div>
                    {/* Using the hero image as a placeholder for the phone mockup */}
                    <img src={bannerImage} alt="App Interface" className="banner-image" />
                </div>
            </div>
        </div>
    );
};

export default Login;
