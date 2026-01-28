import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../components/UserLayout';
import './SendMoney.css';

const SendMoney = () => {
    const [formData, setFormData] = useState({
        recipientEmail: '',
        amount: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const { user } = useAuth();
    const navigate = useNavigate();
    const token = user?.token;

    const recentRecipients = [
        { email: 'john@example.com', name: 'John Doe', avatar: 'JD' },
        { email: 'sarah@example.com', name: 'Sarah Smith', avatar: 'SS' },
        { email: 'mike@example.com', name: 'Mike Johnson', avatar: 'MJ' }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleQuickSelect = (recipient) => {
        setFormData({
            ...formData,
            recipientEmail: recipient.email,
            description: `Payment to ${recipient.name}`
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            await axios.post(
                'http://localhost:5001/api/transactions/send',
                {
                    recipientEmail: formData.recipientEmail,
                    amount: parseFloat(formData.amount),
                    description: formData.description || 'Payment'
                },
                config
            );

            setMessage({ type: 'success', text: `Successfully sent $${formData.amount} to ${formData.recipientEmail}` });
            setFormData({ recipientEmail: '', amount: '', description: '' });

            setTimeout(() => {
                navigate('/dashboard');
            }, 2500);
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to send money. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserLayout title="Send Money">
            <div className="send-money-content-wrapper">
                <div className="send-money-grid">
                    {/* Left Panel: Form */}
                    <div className="form-panel">
                        <div className="panel-header">
                            <h2 className="panel-title">Transfer Funds</h2>
                            <p className="panel-subtitle">Enter recipient details and amount below.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="premium-form">
                            <div className="form-group">
                                <label>Recipient Email</label>
                                <div className="input-with-icon">
                                    <span className="icon">📧</span>
                                    <input
                                        type="email"
                                        name="recipientEmail"
                                        value={formData.recipientEmail}
                                        onChange={handleChange}
                                        placeholder="example@mail.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Amount to Send</label>
                                <div className="input-with-icon amount">
                                    <span className="icon">$</span>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        min="0.01"
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Description (Optional)</label>
                                <div className="input-with-icon">
                                    <span className="icon">📝</span>
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="What's this for?"
                                    />
                                </div>
                            </div>

                            {message.text && (
                                <div className={`status-message ${message.type}`}>
                                    {message.type === 'success' ? '✅' : '❌'} {message.text}
                                </div>
                            )}

                            <button
                                type="submit"
                                className={`send-btn ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Processing Transfer...' : 'Send Money Now'}
                            </button>
                        </form>
                    </div>

                    {/* Right Panel: Quick Select */}
                    <div className="quick-panel">
                        <h3 className="quick-title">Quick Transfer</h3>
                        <p className="quick-desc">Select a recent recipient to speed up your transfer.</p>

                        <div className="recipients-list">
                            {recentRecipients.map((recipient, index) => (
                                <div
                                    key={index}
                                    className={`recipient-pill ${formData.recipientEmail === recipient.email ? 'active' : ''}`}
                                    onClick={() => handleQuickSelect(recipient)}
                                >
                                    <div className="pill-avatar">{recipient.avatar}</div>
                                    <div className="pill-info">
                                        <div className="pill-name">{recipient.name}</div>
                                        <div className="pill-email">{recipient.email}</div>
                                    </div>
                                    {formData.recipientEmail === recipient.email && (
                                        <div className="check-mark">✓</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="security-note">
                            <span className="security-icon">🛡️</span>
                            <p>All transfers are encrypted and monitored for your security.</p>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default SendMoney;
