import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css'; // Reusing Login styles for consistent Auth design
import bannerImage from '../assets/paytm-hero.png';

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
        <div className="login-page-wrapper">
            <div className="login-container">
                {/* Left Side: Form */}
                <div className="login-form-section">
                    <div className="paymate-logo-wrapper" onClick={() => navigate('/')}>
                        <div className="paymate-logo-icon">
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginTop: '5px' }}>₹</span>
                        </div>
                        <div className="paymate-logo-text">PayMate</div>
                    </div>

                    <h2 className="login-title">Create a New Account</h2>

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
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="form-input"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                placeholder="Choose a username"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Create password"
                                />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-input"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="Confirm password"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-proceed">
                            Sign Up
                        </button>
                    </form>

                    <div className="divider-container">
                        <div className="divider-line"></div>
                        <span className="divider-text">Or</span>
                        <div className="divider-line"></div>
                    </div>

                    <button className="qr-login-btn" onClick={() => navigate('/login')}>
                        Login to Existing Account
                    </button>

                    <div className="login-footer">
                        By proceeding, you agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a> of PayMate.
                    </div>
                </div>

                {/* Right Side: Marketing Banner */}
                <div className="login-banner-section">
                    <div className="banner-content">
                        <h3 className="banner-headline">Join PayMate Today.</h3>
                        <h2 className="banner-subheadline">Start Your Investment<br />Journey for Free</h2>

                        <div className="banner-highlight-btn">
                            Open Free Demat Account →
                        </div>
                    </div>

                    <img src={bannerImage} alt="App Interface" className="banner-image" />
                </div>
            </div>
        </div>
    );
};

export default Register;
