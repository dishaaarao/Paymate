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
            height: '80px',
            background: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            position: 'relative',
            zIndex: 1000
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                        {/* Triangle Logo */}
                        <div style={{
                            width: '28px',
                            height: '28px',
                            background: 'linear-gradient(135deg, #00baf2 0%, #00c376 100%)',
                            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{ color: 'white', fontWeight: '900', fontSize: '14px', marginTop: '3px' }}>₹</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                            <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'white' }}>PayMate</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#00baf2' }}>Money</span>
                        </div>
                    </div>

                    {/* Shared Links */}
                    <div style={{ display: 'flex', gap: '32px', marginLeft: '20px' }}>
                        <span style={{ color: '#d1d5db', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }} onClick={() => navigate('/products')}>Products</span>
                        <span style={{ color: '#d1d5db', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>Pricing</span>
                        <span style={{ color: '#d1d5db', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>Company</span>
                        <span style={{ color: '#d1d5db', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }} onClick={() => navigate('/about')}>About Us</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    {user ? (
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{user.username}</span>
                            <Link to="/dashboard" style={{
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '600',
                                border: '1px solid rgba(255,255,255,0.3)',
                                padding: '8px 20px',
                                borderRadius: '6px'
                            }}>
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: 'transparent',
                                    color: '#ef4444',
                                    fontSize: '14px',
                                    fontWeight: '600'
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <button
                                onClick={() => navigate('/login')}
                                style={{
                                    background: 'transparent',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    padding: '8px 20px',
                                    borderRadius: '6px',
                                    fontWeight: '600',
                                    fontSize: '14px'
                                }}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                style={{
                                    backgroundColor: 'white',
                                    color: '#0f1118',
                                    padding: '8px 20px',
                                    borderRadius: '6px',
                                    fontWeight: '700',
                                    fontSize: '14px'
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
