import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const SendMoneyForm = ({ onUpdate }) => {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const { user } = useAuth();
    const token = user?.token;

    const handleSend = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.post(
                'http://localhost:5001/api/transactions/send',
                { receiverEmail: email, amount, description },
                config
            );

            setMessage({ type: 'success', text: 'Transfer successful!' });
            setEmail('');
            setAmount('');
            setDescription('');
            onUpdate();
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Transfer failed'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Send Money</h3>

            {message && (
                <div style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem',
                    background: message.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                    color: message.type === 'error' ? 'var(--danger)' : 'var(--success)',
                    border: `1px solid ${message.type === 'error' ? 'var(--danger)' : 'var(--success)'}`
                }}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSend}>
                <div className="input-group">
                    <label className="input-label">Recipient Email</label>
                    <input
                        type="email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="user@example.com"
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Amount (₹)</label>
                    <input
                        type="number"
                        className="input-field"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="1"
                        placeholder="0.00"
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Description (Optional)</label>
                    <input
                        type="text"
                        className="input-field"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Dinner, Rent, etc."
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Send Money'}
                </button>
            </form>
        </div>
    );
};

export default SendMoneyForm;
