import { useState } from 'react';
import UserLayout from '../components/UserLayout';

const Banks = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [isLocating, setIsLocating] = useState(false);

    const branches = [
        { name: 'Downtown Branch', address: '123 Finance Street, New York, NY', hours: '9:00 AM - 5:00 PM', status: 'Open', coords: { lat: 40.7128, lng: -74.0060 } },
        { name: 'Silicon Valley Hub', address: '500 Tech Lane, Palo Alto, CA', hours: '10:00 AM - 6:00 PM', status: 'Open', coords: { lat: 37.4419, lng: -122.1430 } },
        { name: 'Bay Area Express', address: '42 Waterfront Way, San Francisco, CA', hours: '9:00 AM - 4:00 PM', status: 'Closed', coords: { lat: 37.7749, lng: -122.4194 } },
        { name: 'Capital City Office', address: '900 Plaza Blvd, London, UK', hours: '24/7', status: 'Open', coords: { lat: 51.5074, lng: -0.1278 } },
    ];

    const handleUseLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    // Reverse geocoding using OpenStreetMap (Nominatim)
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();

                    setUserLocation({
                        address: data.display_name,
                        lat: latitude,
                        lng: longitude
                    });
                } catch (error) {
                    console.error('Error fetching address:', error);
                    setUserLocation({
                        address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
                        lat: latitude,
                        lng: longitude
                    });
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                setIsLocating(false);
                alert('Unable to retrieve your location');
                console.error(error);
            }
        );
    };

    const handleGetDirections = (address) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
        window.open(url, '_blank');
    };

    return (
        <UserLayout title="Bank Branches">
            <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Search & Location Bar */}
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '24px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>Find a Branch</h2>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Locate PayMate partner branches for personalized financial services.</p>
                        </div>
                        <button
                            onClick={handleUseLocation}
                            disabled={isLocating}
                            style={{
                                background: '#4F46E5',
                                color: 'white',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '12px',
                                fontWeight: '700',
                                border: 'none',
                                cursor: isLocating ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {isLocating ? 'Locating...' : '📍 Use My Location'}
                        </button>
                    </div>

                    {userLocation && (
                        <div style={{
                            background: '#F8FAFC',
                            padding: '1rem 1.5rem',
                            borderRadius: '16px',
                            border: '1px solid #E2E8F0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <span style={{ fontSize: '1.2rem' }}>🏠</span>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px' }}>Your Current Location</p>
                                <p style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '600' }}>{userLocation.address}</p>
                            </div>
                            <button
                                onClick={() => setUserLocation(null)}
                                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                &times;
                            </button>
                        </div>
                    )}
                </div>

                {/* Branches Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {branches.map((branch, i) => (
                        <div
                            key={i}
                            style={{
                                background: 'white',
                                padding: '2rem',
                                borderRadius: '24px',
                                border: '1px solid #E5E7EB',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#EEF2FF',
                                    borderRadius: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem'
                                }}>
                                    🏦
                                </div>
                                <span style={{
                                    padding: '0.35rem 0.8rem',
                                    borderRadius: '100px',
                                    fontSize: '0.75rem',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    background: branch.status === 'Open' ? '#DEF7EC' : '#FDE8E8',
                                    color: branch.status === 'Open' ? '#03543F' : '#9B1C1C'
                                }}>{branch.status}</span>
                            </div>

                            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem', color: '#1e293b' }}>{branch.name}</h3>

                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <span style={{ opacity: 0.6 }}>📍</span>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.4' }}>{branch.address}</p>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
                                <span style={{ opacity: 0.6 }}>🕒</span>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{branch.hours}</p>
                            </div>

                            <button
                                onClick={() => handleGetDirections(branch.address)}
                                style={{
                                    marginTop: 'auto',
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '14px',
                                    background: '#F8FAFC',
                                    border: '1px solid #E2E8F0',
                                    color: '#475569',
                                    fontWeight: '700',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={e => {
                                    e.target.style.background = '#F1F5F9';
                                    e.target.style.borderColor = '#CBD5E1';
                                }}
                                onMouseOut={e => {
                                    e.target.style.background = '#F8FAFC';
                                    e.target.style.borderColor = '#E2E8F0';
                                }}
                            >
                                Get Directions
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </UserLayout>
    );
};

export default Banks;
