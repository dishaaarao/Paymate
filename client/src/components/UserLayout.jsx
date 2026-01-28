import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './UserLayout.css';

const UserLayout = ({ children, title }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Transactions', path: '/transactions', icon: '📜' },
        { name: 'My wallet', path: '/wallet', icon: '💳' },
        { name: 'Profile', path: '/profile', icon: '👤' },
        { name: 'Bank branches', path: '/banks', icon: '🏦' },
        { name: 'Help', path: '/help', icon: '❓' },
        { name: 'Cards', path: '/cards', icon: '📇' },
    ];

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            navigate(`/transactions?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo" onClick={() => navigate('/')}>
                    <div className="logo-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                    </div>
                    <span className="logo-text">PayMate</span>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-group">
                        {navItems.map((item) => (
                            <div
                                key={item.path}
                                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                                onClick={() => navigate(item.path)}
                            >
                                <span className="nav-icon">{item.icon}</span> {item.name}
                            </div>
                        ))}
                    </div>

                    <div className="nav-logout" onClick={() => { logout(); navigate('/'); }}>
                        <span className="nav-icon">🚪</span> Log out
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="main-header">
                    <h1 className="header-title">{title || 'Dashboard'}</h1>
                    <div className="header-actions">
                        <div className="search-box">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>
                        <div className="header-icons">
                            <span className="icon-btn" title="Settings">⚙️</span>
                            <span className="icon-btn" title="Notifications">🔔</span>
                            <div className="user-profile">
                                <img src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=random`} alt="User" />
                                <span className="user-dropdown">▼</span>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="page-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default UserLayout;
