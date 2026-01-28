import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../components/UserLayout';
import './Dashboard.css';

const Dashboard = () => {
    const [wallet, setWallet] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    const token = user?.token;

    const fetchData = useCallback(async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const [walletRes, txRes] = await Promise.all([
                axios.get('http://localhost:5001/api/wallet', config),
                axios.get('http://localhost:5001/api/transactions/history', config),
            ]);

            setWallet(walletRes.data);
            setTransactions(txRes.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    if (loading) {
        return <div className="loading-screen">Loading...</div>;
    }

    return (
        <UserLayout title="Dashboard">
            <div className="dashboard-grid">
                {/* Top Row: Balance and Stats */}
                <div className="grid-row top-row">
                    <div className="balance-card">
                        <div className="card-top">
                            <div className="balance-info">
                                <span className="card-label">Account balance</span>
                                <h2 className="card-amount">USD {wallet?.balance?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}</h2>
                                <div className="account-details">
                                    <p>{user?.username || 'User'} - 0123456789 <span className="copy-icon">📋</span></p>
                                </div>
                            </div>
                            <div className="card-icon-bg">
                                <button
                                    className="icon-action-btn"
                                    onClick={() => navigate('/wallet')}
                                    title="Add or Receive Money"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon-wrapper blue">📈</div>
                        <div className="stat-info">
                            <span className="stat-label">Total transaction amount</span>
                            <h3 className="stat-value">USD {transactions.reduce((acc, tx) => {
                                const isSender = tx.sender?._id === user?._id || tx.sender === user?._id;
                                if (tx.type === 'debit' || tx.type === 'withdrawal' || (tx.type === 'transfer' && isSender)) {
                                    return acc + tx.amount;
                                }
                                return acc;
                            }, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon-wrapper orange">📊</div>
                        <div className="stat-info">
                            <span className="stat-label">Total transaction count</span>
                            <h3 className="stat-value">{transactions.length}</h3>
                        </div>
                    </div>
                </div>

                {/* Middle Row: Loan and Flow */}
                <div className="grid-row middle-row">
                    <div className="loan-balance-card">
                        <div className="card-header">
                            <span className="card-label">Loan Balance</span>
                            <h3 className="loan-amount">$ 140,000.00</h3>
                            <div className="loan-change positive">+USD 2,090.23 <span className="info-icon">ℹ️</span></div>
                        </div>
                        <div className="loan-progress-bar">
                            <div className="progress-fill" style={{ width: '65%' }}></div>
                        </div>
                        <div className="loan-legend">
                            <div className="legend-item"><span className="dot navy"></span> Total debt <span className="percent">33%</span></div>
                            <div className="legend-item"><span className="dot blue"></span> Total credit <span className="percent">33%</span></div>
                            <div className="legend-item"><span className="dot sky"></span> Loan acquisition <span className="percent">34%</span></div>
                        </div>
                    </div>

                    <div className="flow-card">
                        <div className="card-header">
                            <span className="card-label">Transactions flow</span>
                            <div className="flow-filters">
                                <span>1D</span> <span>1W</span> <span>1M</span> <span className="active">3M</span> <span>6M</span> <span>1Y</span>
                            </div>
                        </div>
                        <div className="chart-placeholder">
                            <svg width="100%" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">
                                <path d="M0,180 Q100,120 200,150 T400,100 T500,80" fill="none" stroke="#4F46E5" strokeWidth="4" />
                                <path d="M0,180 Q100,120 200,150 T400,100 T500,80 L500,200 L0,200 Z" fill="url(#gradient)" opacity="0.1" />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#4F46E5" />
                                        <stop offset="100%" stopColor="#ffffff" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="chart-labels">
                                <span>Jan 01</span>
                                <span>Feb 01</span>
                                <span>Mar 01</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Transactions and Quick Transfer */}
                <div className="grid-row bottom-row">
                    <div className="recent-transactions-card">
                        <div className="card-header">
                            <h3 className="card-title">Recent transactions</h3>
                            <div className="header-actions">
                                <button className="text-link" onClick={() => navigate('/transactions')}>See all</button>
                                <button className="filter-btn">Filter ⚙️</button>
                                <button className="export-btn">Export 📤</button>
                            </div>
                        </div>
                        <table className="transactions-table">
                            <thead>
                                <tr>
                                    <th>Recipient name</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.slice(0, 5).map(tx => (
                                    <tr key={tx._id}>
                                        <td className="recipient-cell">
                                            <div className="avatar-mini">{tx.description?.charAt(0)}</div>
                                            {tx.description}
                                        </td>
                                        <td className="amount-cell">${tx.amount.toFixed(2)}</td>
                                        <td className="date-cell">{formatDate(tx.createdAt)}</td>
                                        <td className="type-cell">{tx.type}</td>
                                        <td className="status-cell">
                                            <span className="status-tag success">Successful</span>
                                        </td>
                                    </tr>
                                ))}
                                {transactions.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="empty-row">No transactions available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="quick-transfer-card">
                        <h3 className="card-title">Quick transfer</h3>
                        <div className="transfer-list">
                            {[
                                { name: 'Leslie Alexander', bank: 'Vemma bank', icon: '👩‍💼' },
                                { name: 'Annette Black', bank: 'Zenith bank', icon: '👩‍💻' },
                                { name: 'Jane Cooper', bank: 'GTBank', icon: '👩‍🎨' },
                                { name: 'Floyd Miles', bank: 'First bank', icon: '👨‍🔧' }
                            ].map((item, i) => (
                                <div key={i} className="transfer-item">
                                    <div className="transfer-avatar">{item.icon}</div>
                                    <div className="transfer-info">
                                        <p className="item-name">{item.name}</p>
                                        <p className="item-bank">0123456789 - {item.bank}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="send-now-btn" onClick={() => navigate('/send')}>Send Money</button>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Dashboard;
