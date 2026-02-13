import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Data State
    const [balance, setBalance] = useState(0);
    const [rewards, setRewards] = useState({ points: 0, count: 0 });
    const [transactions, setTransactions] = useState([]);
    const [upiId, setUpiId] = useState(user?.upiId || '');
    const [verifiedUser, setVerifiedUser] = useState(null);
    const [verifying, setVerifying] = useState(false);

    // UI State
    const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' or 'history'
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSendModal, setShowSendModal] = useState(false);

    // Form State
    const [addAmount, setAddAmount] = useState('');
    const [sendRecipient, setSendRecipient] = useState('');
    const [sendAmount, setSendAmount] = useState('');
    const [sendDesc, setSendDesc] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const token = user?.token || localStorage.getItem('token');

    // Fetch Data
    const fetchData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const balanceRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/wallet`, config);
            setBalance(balanceRes.data.balance);
            setRewards({ points: balanceRes.data.points || 0, count: balanceRes.data.paymentCount || 0 });

            // Try to get UPI ID from either wallet response or user object
            const currentUpi = balanceRes.data.upiId || user?.upiId;
            if (currentUpi) {
                setUpiId(currentUpi);
            }

            const txRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/history`, config);
            setTransactions(txRes.data);

            setLoading(false);
        } catch (err) {
            console.error("Error fetching data", err);
            setLoading(false);
        }
    };

    // Explicitly fetch user profile if UPI ID is missing
    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/profile`, config);
                if (data.upiId) {
                    setUpiId(data.upiId);
                }
            } catch (err) {
                console.error("Profile fetch failed", err);
            }
        };
        fetchProfile();
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchData();
            // Poll for updates every 3 seconds (Real-time simulation)
            const interval = setInterval(() => {
                fetchData();
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [token]);

    // Verify recipient whenever input changes
    useEffect(() => {
        const verify = async () => {
            if (sendRecipient.length > 3 && sendRecipient.includes('@')) {
                setVerifying(true);
                try {
                    const config = { headers: { Authorization: `Bearer ${token}` } };
                    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/verify`, { identifier: sendRecipient }, config);
                    setVerifiedUser(data);
                    setVerifying(false);
                } catch (err) {
                    setVerifiedUser(null);
                    setVerifying(false);
                }
            } else {
                setVerifiedUser(null);
            }
        };
        const timer = setTimeout(verify, 500);
        return () => clearTimeout(timer);
    }, [sendRecipient, token]);

    // Handlers
    const handleAddFunds = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/wallet/add-funds`, { amount: Number(addAmount) }, config);

            setShowAddModal(false);
            setAddAmount('');
            fetchData(); // Refresh
            alert('Funds added successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add funds');
        }
    };

    const handleSendMoney = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/send`, {
                receiverEmail: sendRecipient,
                amount: Number(sendAmount),
                description: sendDesc
            }, config);

            setShowSendModal(false);
            setSendRecipient('');
            setSendAmount('');
            setSendDesc('');
            fetchData(); // Refresh
            alert('Money sent successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Transaction failed');
        }
    };

    if (loading) return <div className="dashboard-container">Loading...</div>;

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dash-header">
                {/* MoneyMap removed */}
                <div className="brand-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <div style={{ width: 24, height: 24, background: '#3b82f6', borderRadius: 4 }}></div>
                </div>

                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem', fontWeight: 500, color: '#64748b' }}>
                    <span
                        className={`nav-pill ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        Dashboard
                    </span>
                    <span
                        className={`nav-pill ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        History
                    </span>
                    <span
                        className={`nav-pill ${activeTab === 'rewards' ? 'active' : ''}`}
                        onClick={() => setActiveTab('rewards')}
                    >
                        Rewards
                    </span>
                    <span className="nav-pill">Contacts</span>
                    <span className="nav-pill">Bills</span>
                </div>

                {/* Emojis removed */}
                <div className="header-actions">
                    <button className="action-icon-btn" onClick={logout} style={{ fontSize: '0.9rem', width: 'auto', padding: '0.5rem 1rem' }}>Logout</button>
                </div>
            </header>

            {/* Main Content */}
            {activeTab === 'dashboard' && (
                <div className="dashboard-grid">
                    {/* Left Column */}
                    <div className="main-column">
                        <div className="stats-row">
                            {/* Balance Card with Add Button */}
                            <div className="stat-card blue" style={{ cursor: 'pointer' }} onClick={() => setShowAddModal(true)}>
                                <div className="stat-header">
                                    <span className="stat-label">Balance</span>
                                    <div className="stat-icon" title="Add Funds">+</div>
                                </div>
                                <div className="stat-value">₹{balance.toFixed(2)}</div>
                                <svg className="stat-wave" viewBox="0 0 100 25" preserveAspectRatio="none">
                                    <path d="M0,15 C20,25 50,0 80,20 L100,10 V25 H0 Z" fill="#3b82f6" fillOpacity="0.2" />
                                </svg>
                            </div>

                            {/* Debited (Total Money Sent) */}
                            <div className="stat-card green">
                                <div className="stat-header">
                                    <span className="stat-label">Debited</span>
                                    <div className="stat-icon">➕</div>
                                </div>
                                <div className="stat-value">
                                    ₹{transactions
                                        .filter(t => t.sender?._id?.toString() === user?._id?.toString() && t.type === 'transfer')
                                        .reduce((acc, t) => acc + t.amount, 0).toFixed(2)}
                                </div>
                                <svg className="stat-wave" viewBox="0 0 100 25" preserveAspectRatio="none">
                                    <path d="M0,20 C30,10 50,5 70,15 C90,25 100,10 120,15 V25 H0 Z" fill="#22c55e" fillOpacity="0.2" />
                                </svg>
                            </div>

                            {/* Credited (Total Money Received) */}
                            <div className="stat-card orange">
                                <div className="stat-header">
                                    <span className="stat-label">Credited</span>
                                    <div className="stat-icon">➖</div>
                                </div>
                                <div className="stat-value">
                                    ₹{transactions
                                        .filter(t => (t.receiver?._id?.toString() === user?._id?.toString() && t.type === 'transfer') || (t.receiver?._id?.toString() === user?._id?.toString() && t.type === 'deposit'))
                                        .reduce((acc, t) => acc + t.amount, 0).toFixed(2)}
                                </div>
                                <svg className="stat-wave" viewBox="0 0 100 25" preserveAspectRatio="none">
                                    <path d="M0,10 C20,20 40,5 60,15 C80,25 100,5 120,10 V25 H0 Z" fill="#f59e0b" fillOpacity="0.2" />
                                </svg>
                            </div>
                        </div>

                        {/* Recent Transactions List */}
                        <div className="section-title">
                            <span>Recent Transactions</span>
                            <span className="view-all-link" onClick={() => setActiveTab('history')}>View All</span>
                        </div>
                        <div className="tx-list">
                            {transactions.slice(0, 5).map((t) => {
                                const isDebit = t.sender?._id?.toString() === user?._id?.toString();
                                return (
                                    <div key={t._id} className="tx-item">
                                        <div className="tx-item-left">
                                            <div className={`tx-icon-circle ${isDebit ? 'debit' : 'credit'}`}>
                                                {isDebit ? '↑' : '↓'}
                                            </div>
                                            <div className="tx-info">
                                                <div className="tx-name">
                                                    {isDebit
                                                        ? (t.receiver?.upiId || t.receiver?.email || 'External')
                                                        : (t.sender?.upiId || t.sender?.email || 'External')}
                                                </div>
                                                <div className="tx-date">
                                                    {new Date(t.createdAt).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`tx-amount-value ${isDebit ? 'negative' : 'positive'}`}>
                                            {isDebit ? '-' : '+'}₹{t.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="side-column">
                        {/* Credit Card */}
                        <div className="credit-card-widget">
                            <div className="cc-header">
                                <div className="cc-chip"></div>
                                <div className="cc-upi-badge">UPI Enabled</div>
                            </div>
                            <div className="cc-number">4263 9826 4026 9299</div>
                            <div className="cc-upi-section">
                                <span className="cc-upi-label">Your PayMate UPI ID</span>
                                <div className="cc-upi-id-row">
                                    <span className="cc-upi-id">{upiId}</span>
                                    <button
                                        className="copy-btn"
                                        onClick={() => {
                                            if (upiId) {
                                                navigator.clipboard.writeText(upiId);
                                                alert('UPI ID Copied!');
                                            }
                                        }}
                                        title="Copy UPI ID"
                                    >
                                        📋
                                    </button>
                                </div>
                            </div>
                            <div className="cc-footer">
                                <span>{user?.username || 'User'}</span>
                                <span>exp. 9/26</span>
                            </div>
                        </div>

                        <div className="contacts-widget">
                            <div className="section-title">
                                <span>Contacts</span>
                                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>See All {'>'}</span>
                            </div>
                            <div className="avatar-row">
                                <div className="avatar-item" style={{ cursor: 'pointer' }} onClick={() => setShowSendModal(true)}>
                                    <div className="avatar-circle" style={{ background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        ⇄
                                    </div>
                                    <span className="avatar-name">Send</span>
                                </div>
                                <div className="avatar-item">
                                    <div className="avatar-circle">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Felix" />
                                    </div>
                                    <span className="avatar-name">Felix</span>
                                </div>
                                <div className="avatar-item">
                                    <div className="avatar-circle">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe" alt="Zoe" />
                                    </div>
                                    <span className="avatar-name">Zoe</span>
                                </div>
                                <div className="avatar-item">
                                    <div className="avatar-circle">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Leo" alt="Leo" />
                                    </div>
                                    <span className="avatar-name">Leo</span>
                                </div>
                            </div>
                        </div>

                        {/* Goals */}
                        <div className="goals-widget">
                            <div className="section-title">
                                <span>Goals</span>
                                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>See All {'>'}</span>
                            </div>
                            <div className="goal-row">
                                <div className="goal-card">
                                    <span style={{ fontSize: '1.5rem' }}>✈️</span>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Tours</span>
                                    <span className="goal-amount">₹1,250</span>
                                </div>
                                <div className="goal-card" style={{ background: '#dcfce7' }}>
                                    <span style={{ fontSize: '1.5rem' }}>🎮</span>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>PS5</span>
                                    <span className="goal-amount">₹620</span>
                                </div>
                                <div className="goal-card" style={{ background: '#ffedd5' }}>
                                    <span style={{ fontSize: '1.5rem' }}>🚗</span>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Cars</span>
                                    <span className="goal-amount">₹20k</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* History Tab View */}
            {activeTab === 'history' && (
                <div className="history-container">
                    <h2 className="section-title">Transaction History</h2>
                    <table className="full-history-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Type</th>
                                <th>Counterparty</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t) => {
                                const isDebit = t.sender?._id === user?._id;
                                return (
                                    <tr key={t._id}>
                                        <td style={{ fontFamily: 'monospace', color: '#64748b' }}>{t._id.substring(0, 8)}...</td>
                                        <td>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                background: isDebit ? '#fee2e2' : '#dcfce7',
                                                color: isDebit ? '#ef4444' : '#166534',
                                                fontSize: '0.8rem',
                                                fontWeight: 600
                                            }}>
                                                {isDebit ? 'DEBIT' : 'CREDIT'}
                                            </span>
                                        </td>
                                        <td>{isDebit ? (t.receiver?.email || 'External') : (t.sender?.email || 'External')}</td>
                                        <td>{t.description || '-'}</td>
                                        <td>{new Date(t.createdAt).toLocaleString()}</td>
                                        <td style={{ fontWeight: 600, color: isDebit ? '#ef4444' : '#22c55e' }}>
                                            {isDebit ? '-' : '+'}₹{t.amount.toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Rewards Tab View */}
            {activeTab === 'rewards' && (
                <div className="rewards-container">
                    {/* Rewards Banner */}
                    <div className="rewards-hero-card">
                        <div className="rewards-hero-top">
                            <div>
                                <div className="rewards-label">Total Reward Points</div>
                                <div className="rewards-value">{rewards.points}</div>
                            </div>
                            <div className="rewards-icon-badge">
                                <span>💰</span>
                            </div>
                        </div>

                        <div className="rewards-progress-section">
                            <div className="rewards-progress-info">
                                <span>Next Reward Milestone</span>
                                <span>{rewards.count}/10 payments</span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${(rewards.count / 10) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Rewards Grid */}
                    <h2 className="rewards-grid-title">Exclusive Rewards</h2>

                    <div className="rewards-grid">
                        {/* Card 1 */}
                        <div className="reward-card">
                            <div className="reward-top">
                                <span className="reward-emoji">🎁</span>
                                <span className="reward-tag">Limited</span>
                            </div>
                            <h3 className="reward-title">Mystery Box</h3>
                            <p className="reward-desc">Unlock a surprise cashback reward of up to ₹500 directly in your wallet.</p>
                            <button
                                className="reward-btn"
                                disabled={rewards.points < 100}
                            >
                                {rewards.points < 100 ? 'Need 100 pts' : 'Redeem (100 pts)'}
                            </button>
                        </div>

                        {/* Card 2 */}
                        <div className="reward-card">
                            <div className="reward-top">
                                <span className="reward-emoji">🎟️</span>
                                <span className="reward-tag">Popular</span>
                            </div>
                            <h3 className="reward-title">Movie Ticket</h3>
                            <p className="reward-desc">Get a flat 50% discount on your next movie booking via partner apps.</p>
                            <button
                                className="reward-btn"
                                disabled={rewards.points < 200}
                            >
                                {rewards.points < 200 ? 'Need 200 pts' : 'Redeem (200 pts)'}
                            </button>
                        </div>

                        {/* Card 3 */}
                        <div className="reward-card">
                            <div className="reward-top">
                                <span className="reward-emoji">🍕</span>
                                <span className="reward-tag">Foodie</span>
                            </div>
                            <h3 className="reward-title">Food Voucher</h3>
                            <p className="reward-desc">Enjoy a free meal worth ₹300 at your favorite partner restaurants.</p>
                            <button
                                className="reward-btn"
                                disabled={rewards.points < 300}
                            >
                                {rewards.points < 300 ? 'Need 300 pts' : 'Redeem (300 pts)'}
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Add Funds Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Add Funds</h3>
                            <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleAddFunds}>
                            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                            <input
                                type="number"
                                placeholder="Amount to add"
                                className="modal-input"
                                value={addAmount}
                                onChange={e => setAddAmount(e.target.value)}
                                required
                                min="1"
                            />
                            <button type="submit" className="modal-btn">Add Funds</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Send Money Modal */}
            {showSendModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Send Money</h3>
                            <button className="modal-close" onClick={() => setShowSendModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSendMoney}>
                            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        placeholder="Enter PayMate UPI ID (e.g. name1234@paymate)"
                                        className="modal-input"
                                        value={sendRecipient}
                                        onChange={e => setSendRecipient(e.target.value)}
                                        required
                                        style={{ marginBottom: '4px' }}
                                    />
                                    {verifying && <div style={{ fontSize: '0.75rem', color: '#3b82f6', marginLeft: '12px' }}>Verifying Identity...</div>}
                                    {verifiedUser && (
                                        <div style={{
                                            fontSize: '0.85rem',
                                            background: 'rgba(34, 197, 94, 0.1)',
                                            color: '#16a34a',
                                            padding: '8px 12px',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontWeight: 600,
                                            border: '1px solid rgba(34, 197, 94, 0.2)'
                                        }}>
                                            <span>👤 Sending to: </span>
                                            <span style={{ color: '#065f46' }}>{verifiedUser.username}</span>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="number"
                                    placeholder="Amount (₹)"
                                    className="modal-input"
                                    value={sendAmount}
                                    onChange={e => setSendAmount(e.target.value)}
                                    required
                                    min="1"
                                />
                                <input
                                    type="text"
                                    placeholder="Description (Optional)"
                                    className="modal-input"
                                    value={sendDesc}
                                    onChange={e => setSendDesc(e.target.value)}
                                />
                                <button type="submit" className="modal-btn">Send Securely</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
