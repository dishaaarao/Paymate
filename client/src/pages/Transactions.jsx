import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import UserLayout from '../components/UserLayout';
import './Transactions.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, sent, received
    const { user } = useAuth();
    const location = useLocation();
    const token = user?.token;

    // Get search term from URL
    const queryParams = new URLSearchParams(location.search);
    const searchFromUrl = queryParams.get('search') || '';

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                const response = await axios.get('http://localhost:5001/api/transactions/history', config);
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [token]);

    const processedTransactions = transactions.map(tx => {
        // Determine if current user is sender or receiver
        const isSender = tx.sender?._id === user?._id || tx.sender === user?._id;
        const isReceiver = tx.receiver?._id === user?._id || tx.receiver === user?._id;

        // Logical type for display: 'debit' for sent, 'credit' for received
        let logicalType = 'debit';
        if (tx.type === 'credit' || (tx.type === 'transfer' && isReceiver) || tx.type === 'deposit') {
            logicalType = 'credit';
        }

        return { ...tx, logicalType };
    });

    const filteredTransactions = processedTransactions.filter(tx => {
        // Filter by type (Sent/Received)
        const matchesType =
            filter === 'all' ||
            (filter === 'sent' && tx.logicalType === 'debit') ||
            (filter === 'received' && tx.logicalType === 'credit');

        // Filter by search term
        const matchesSearch =
            !searchFromUrl ||
            tx.description.toLowerCase().includes(searchFromUrl.toLowerCase()) ||
            tx.amount.toString().includes(searchFromUrl);

        return matchesType && matchesSearch;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return <div className="loading">Loading transactions...</div>;
    }

    return (
        <UserLayout title={searchFromUrl ? `Search results for "${searchFromUrl}"` : "Transaction History"}>
            <div className="transactions-container-inner">
                <div className="filter-tabs">
                    <button
                        className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All Transactions
                    </button>
                    <button
                        className={`filter-tab ${filter === 'sent' ? 'active' : ''}`}
                        onClick={() => setFilter('sent')}
                    >
                        Sent
                    </button>
                    <button
                        className={`filter-tab ${filter === 'received' ? 'active' : ''}`}
                        onClick={() => setFilter('received')}
                    >
                        Received
                    </button>
                </div>

                <div className="transactions-list">
                    {filteredTransactions.length === 0 ? (
                        <div className="empty-state">
                            <p>{searchFromUrl ? "No items match your search." : "No transactions found"}</p>
                        </div>
                    ) : (
                        filteredTransactions.map((tx) => (
                            <div key={tx._id} className="transaction-card">
                                <div className="tx-icon">
                                    {tx.logicalType === 'credit' ? '↓' : '↑'}
                                </div>
                                <div className="tx-details">
                                    <div className="tx-description">{tx.description}</div>
                                    <div className="tx-date">{formatDate(tx.createdAt)}</div>
                                </div>
                                <div className={`tx-amount ${tx.logicalType === 'debit' ? 'negative' : 'positive'}`}>
                                    {tx.logicalType === 'credit' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </UserLayout>
    );
};

export default Transactions;
