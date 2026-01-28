import UserLayout from '../components/UserLayout';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Wallet = () => {
    const { user } = useAuth();
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [senderName, setSenderName] = useState('John Doe');

    const fetchWallet = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` },
            };
            const res = await axios.get('http://localhost:5001/api/wallet', config);
            setWallet(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWallet();
    }, [user]);

    const handleConfirmAdd = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        setActionLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` },
            };
            await axios.post('http://localhost:5001/api/wallet/add-funds', { amount: Number(amount) }, config);
            setIsAddModalOpen(false);
            setAmount('');
            fetchWallet();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to add funds');
        } finally {
            setActionLoading(false);
        }
    };

    const handleConfirmWithdraw = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        setActionLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` },
            };
            await axios.post('http://localhost:5001/api/wallet/withdraw', { amount: Number(amount) }, config);
            setIsWithdrawModalOpen(false);
            setAmount('');
            fetchWallet();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to withdraw funds');
        } finally {
            setActionLoading(false);
        }
    };

    const handleConfirmReceive = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        setActionLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` },
            };
            await axios.post('http://localhost:5001/api/wallet/receive', {
                amount: Number(amount),
                senderName: senderName
            }, config);
            setIsReceiveModalOpen(false);
            setAmount('');
            fetchWallet();
            alert(`Simulation: You received $${amount} from ${senderName}!`);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to receive funds');
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <UserLayout title="My Wallet">
            <div style={{ display: 'grid', gap: '2rem' }}>
                <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', padding: '3.5rem', borderRadius: '32px', color: 'white', position: 'relative', boxShadow: '0 10px 30px rgba(0, 50, 150, 0.2)' }}>
                    <span style={{ opacity: 0.8, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700' }}>Available Balance</span>
                    <h1 style={{ fontSize: '4rem', margin: '0.75rem 0', fontWeight: '800', letterSpacing: '-2px' }}>
                        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem', opacity: 0.6, verticalAlign: 'middle' }}>USD</span>
                        {wallet?.balance?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}
                    </h1>
                    <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            style={{ background: 'white', color: '#1e3a8a', padding: '1rem 2.5rem', borderRadius: '16px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s', border: 'none' }}
                        >
                            Add Funds
                        </button>
                        <button
                            onClick={() => setIsWithdrawModalOpen(true)}
                            style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '1rem 2.5rem', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s', backdropFilter: 'blur(5px)' }}
                        >
                            Withdraw
                        </button>
                        <button
                            onClick={() => setIsReceiveModalOpen(true)}
                            style={{ background: '#10B981', color: 'white', padding: '1rem 2.5rem', borderRadius: '16px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s', border: 'none' }}
                        >
                            Receive Money
                        </button>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginBottom: '2rem', fontSize: '1.25rem', fontWeight: '800' }}>Card Details</h3>
                    <div className="card-viz" style={{ background: '#111827', color: 'white', padding: '2.5rem', borderRadius: '24px', maxWidth: '420px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', borderRadius: '50%' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '1px' }}>PayMate <span style={{ color: '#aaa', fontWeight: '400' }}>PLATINUM</span></span>
                            <div style={{ width: '40px', height: '25px', background: '#f59e0b', borderRadius: '4px', opacity: 0.8 }}></div>
                        </div>
                        <div style={{ fontSize: '1.6rem', letterSpacing: '4px', marginBottom: '2.5rem', position: 'relative', zIndex: 1, fontFamily: 'monospace' }}>
                            4242 4242 4242 4242
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                            <div>
                                <p style={{ fontSize: '0.6rem', opacity: 0.5, textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '1px' }}>Card Holder</p>
                                <p style={{ fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase' }}>{user?.username || 'User Name'}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '0.6rem', opacity: 0.5, textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '1px' }}>Expires</p>
                                <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>12/28</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Modals */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add Funds"
                confirmText="Add to Wallet"
                onConfirm={handleConfirmAdd}
                isLoading={actionLoading}
            >
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Enter the amount you would like to securely add to your PayMate wallet.</p>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', fontWeight: '700', color: '#1e293b' }}>$</span>
                        <input
                            type="number"
                            autoFocus
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 2.5rem', borderRadius: '16px', border: '2px solid #e2e8f0', fontSize: '1.25rem', fontWeight: '700', outline: 'none' }}
                        />
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isWithdrawModalOpen}
                onClose={() => setIsWithdrawModalOpen(false)}
                title="Withdraw Funds"
                confirmText="Withdraw Now"
                onConfirm={handleConfirmWithdraw}
                isLoading={actionLoading}
            >
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Enter the amount you would like to withdraw from your available balance.</p>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', fontWeight: '700', color: '#1e293b' }}>$</span>
                        <input
                            type="number"
                            autoFocus
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 2.5rem', borderRadius: '16px', border: '2px solid #e2e8f0', fontSize: '1.25rem', fontWeight: '700', outline: 'none' }}
                        />
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Available: ${wallet?.balance?.toLocaleString()}</p>
                </div>
            </Modal>

            <Modal
                isOpen={isReceiveModalOpen}
                onClose={() => setIsReceiveModalOpen(false)}
                title="Simulate Receiving Money"
                confirmText="Receive Money"
                onConfirm={handleConfirmReceive}
                isLoading={actionLoading}
            >
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Choose who is sending you money and how much. This will create a 'Received' transaction.</p>

                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Sender Name</label>
                        <select
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}
                        >
                            <option value="Leslie Alexander">Leslie Alexander</option>
                            <option value="John Doe">John Doe</option>
                            <option value="Sarah Smith">Sarah Smith</option>
                            <option value="Mock Corporate">Mock Corporate</option>
                        </select>
                    </div>

                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Amount</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', fontWeight: '700', color: '#1e293b' }}>$</span>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                style={{ width: '100%', padding: '1rem 1rem 1rem 2.5rem', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1.1rem', fontWeight: '700', outline: 'none' }}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </UserLayout>
    );
};

export default Wallet;
