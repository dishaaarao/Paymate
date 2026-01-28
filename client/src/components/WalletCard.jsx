import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const WalletCard = ({ wallet, onUpdate }) => {
    const [addingFunds, setAddingFunds] = useState(false);
    const [amount, setAmount] = useState('');
    const { user } = useAuth();
    const token = user?.token;

    const handleAddFunds = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.post(
                'http://localhost:5001/api/wallet/add-funds',
                { amount },
                config
            );

            setAmount('');
            setAddingFunds(false);
            onUpdate();
        } catch (error) {
            alert(error.response?.data?.message || 'Error adding funds');
        }
    };

    return (
        <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                    <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Current Balance
                    </h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                        ₹{wallet?.balance?.toFixed(2) || '0.00'}
                    </div>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setAddingFunds(!addingFunds)}
                >
                    {addingFunds ? 'Cancel' : 'Add Funds'}
                </button>
            </div>

            {addingFunds && (
                <form onSubmit={handleAddFunds} className="animate-fade-in" style={{ marginTop: '1rem', borderTop: 'var(--glass-border)', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="number"
                            className="input-field"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            min="1"
                        />
                        <button type="submit" className="btn btn-primary">
                            Confirm
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default WalletCard;
