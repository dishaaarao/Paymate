import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';
import promoImage from '../assets/paytm-hero.png';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        const res = await register(formData.username, formData.email, formData.password);
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

                    <h2 className="auth-page-title">Create a New Account</h2>

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
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>Username</label>
                            <input
                                type="text"
                                name="username"
                                className="auth-field-input"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                placeholder="Choose a username"
                            />
                        </div>

                        <div className="auth-input-wrapper">
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="auth-field-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className="auth-input-wrapper" style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="auth-field-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Create password"
                                />
                            </div>
                            <div className="auth-input-wrapper" style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>Confirm</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="auth-field-input"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="Confirm password"
                                />
                            </div>
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

                    <button className="btn-auth-secondary" onClick={() => navigate('/login')}>
                        Login to Existing Account
                    </button>

                    <div className="auth-page-footer">
                        By proceeding, you agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a> of PayMate.
                    </div>
                </div>

                {/* Right Side: Promo Section */}
                <div className="auth-promo-side">
                    <p className="promo-title-small">Join PayMate Money Today.</p>
                    <h1 className="promo-headline-large">Start Your Investment<br />Journey for Free</h1>

                    <div className="promo-stats-bar">
                        Join 21 Million+ Investors
                    </div>

                    <div className="btn-promo-action">
                        Open Free Demat account <span>→</span>
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

export default Register;
