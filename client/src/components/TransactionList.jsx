import { useAuth } from '../context/AuthContext';

const TransactionList = ({ transactions }) => {
    const { user } = useAuth();

    return (
        <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Recent Transactions</h3>

            {transactions.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
                    No transactions yet.
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {transactions.map((tx) => {
                        const isSender = tx.sender?._id === user._id;
                        const isDeposit = tx.type === 'deposit';

                        // Logic to display relevant info
                        let displayTitle = 'Transfer';
                        let displayAmount = tx.amount;
                        let amountColor = 'var(--text-primary)';
                        let sign = '';

                        if (isDeposit) {
                            displayTitle = 'Funds Added';
                            amountColor = 'var(--success)';
                            sign = '+';
                        } else if (isSender) {
                            displayTitle = `Sent to ${tx.receiver?.username || 'User'}`;
                            amountColor = 'var(--danger)';
                            sign = '-';
                        } else {
                            displayTitle = `Received from ${tx.sender?.username || 'User'}`;
                            amountColor = 'var(--success)';
                            sign = '+';
                        }

                        return (
                            <div
                                key={tx._id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: 'var(--radius-md)',
                                    border: 'var(--glass-border)'
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                                        {displayTitle}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {new Date(tx.createdAt).toLocaleDateString()} • {tx.description || tx.type}
                                    </div>
                                </div>

                                <div style={{
                                    fontWeight: 'bold',
                                    color: amountColor,
                                    fontSize: '1.1rem'
                                }}>
                                    {sign}₹{displayAmount}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TransactionList;
