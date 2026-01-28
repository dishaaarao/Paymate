import { useState } from 'react';
import UserLayout from '../components/UserLayout';

const Cards = () => {
    const [cards, setCards] = useState([
        { id: 1, type: 'Platinum Credit', number: '•••• •••• •••• 4242', balance: '12,500.00', color: '#111827', status: 'Active' },
        { id: 2, type: 'Business Debit', number: '•••• •••• •••• 8899', balance: '4,200.00', color: '#1e3a8a', status: 'Active' },
        { id: 3, type: 'Travel Card', number: '•••• •••• •••• 1122', balance: '850.00', color: '#4338CA', status: 'Inactive' },
    ]);

    const toggleFreeze = (id) => {
        setCards(cards.map(card => {
            if (card.id === id) {
                return { ...card, status: card.status === 'Active' ? 'Frozen' : 'Active' };
            }
            return card;
        }));
    };

    return (
        <UserLayout title="Manage Cards">
            <div style={{ display: 'grid', gap: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ color: '#6B7280' }}>Securely manage your physical and virtual payment cards.</p>
                    <button style={{ background: '#4F46E5', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => alert('Ordering functionality coming soon!')}>+ Order New Card</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                    {cards.map((card) => (
                        <div key={card.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E5E7EB', opacity: card.status === 'Frozen' ? 0.7 : 1 }}>
                            <div style={{ background: card.color, color: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '1.5rem', position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                                    <span style={{ fontWeight: 'bold' }}>{card.type}</span>
                                    <span style={{ fontSize: '1.2rem' }}>Visa</span>
                                </div>
                                <div style={{ fontSize: '1.3rem', letterSpacing: '4px', marginBottom: '1.5rem' }}>{card.number}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <p style={{ fontSize: '0.7rem', opacity: 0.6, textTransform: 'uppercase' }}>Available Limit</p>
                                        <p style={{ fontWeight: 'bold' }}>${card.balance}</p>
                                    </div>
                                    <span style={{ opacity: 0.8, fontSize: '0.7rem' }}>Exp: 10/27</span>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Card Status</span>
                                    <span style={{
                                        color: card.status === 'Active' ? '#10B981' : card.status === 'Frozen' ? '#F59E0B' : '#EF4444',
                                        fontWeight: 'bold',
                                        fontSize: '0.85rem'
                                    }}>● {card.status}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button
                                        onClick={() => toggleFreeze(card.id)}
                                        style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: '1px solid #E5E7EB', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', background: card.status === 'Frozen' ? '#F3F4F6' : 'white' }}
                                    >
                                        {card.status === 'Frozen' ? 'Unfreeze' : 'Freeze Card'}
                                    </button>
                                    <button style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: '1px solid #E5E7EB', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}>Settings</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </UserLayout>
    );
};

export default Cards;
