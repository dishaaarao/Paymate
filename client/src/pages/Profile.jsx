import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../components/UserLayout';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const { user, login } = useAuth(); // We use login just to update local state/storage
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        password: '' // Optional password change
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                    'Content-Type': 'application/json'
                },
            };
            const { data } = await axios.put('http://localhost:5001/api/auth/profile', formData, config);

            // Update local storage and context state
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location.reload(); // Simplest way to refresh all components with new user data

            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserLayout title="Profile Settings">
            <div className="profile-content-inner">
                <div className="profile-card">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar">
                            {user?.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <h2 className="profile-name">{user?.username || 'User'}</h2>
                        <p className="profile-email">{user?.email || 'user@example.com'}</p>
                        <button
                            className="edit-btn"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>

                    <div className="profile-info-section">
                        <form onSubmit={handleSubmit} className="profile-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="password">New Password (Leave blank to keep current)</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <button type="submit" className="save-btn" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                <div className="settings-card">
                    <h3 className="settings-title">Account Security</h3>

                    <div className="settings-list">
                        <div className="setting-item">
                            <div className="setting-info">
                                <div className="setting-label">Two-Factor Authentication</div>
                                <div className="setting-desc">Add an extra layer of security</div>
                            </div>
                            <button className="setting-action">Enable</button>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <div className="setting-label">Session Management</div>
                                <div className="setting-desc">View and manage your active devices</div>
                            </div>
                            <button className="setting-action">View</button>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Profile;
