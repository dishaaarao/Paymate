import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            background: 'var(--bg-secondary)',
            padding: '1rem',
            borderBottom: 'var(--glass-border)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    {/* Triangle Logo */}
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #00baf2 0%, #00d09c 100%)',
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginTop: '5px' }}>₹</span>
                    </div>
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'white' // Updated to match PayMate brand (White text)
                    }}>
                        PayMate
                    </span>
                </div>

                <div>
                    {user ? (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Hello, {user.username}</span>
                            <Link to="/dashboard" style={{ color: 'white' }}>Dashboard</Link>
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: 'transparent',
                                    color: 'var(--danger)',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <Link to="/login" style={{
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: '500'
                            }}>
                                Login
                            </Link>
                            <Link to="/register" style={{
                                backgroundColor: 'var(--accent-primary)',
                                color: 'white',
                                padding: '0.6rem 1.8rem',
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '1rem'
                            }}>
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
