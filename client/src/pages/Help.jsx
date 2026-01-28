import { useState } from 'react';
import UserLayout from '../components/UserLayout';

const Help = () => {
    const [ticket, setTicket] = useState({ subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const faqs = [
        { q: 'How do I reset my transaction PIN?', a: 'Go to Profile > Security > Reset PIN to securely change your transaction credentials.' },
        { q: 'What is the limit for daily transfers?', a: 'Standard accounts have a limit of $5,000 per day. You can upgrade to Platinum for higher limits.' },
        { q: 'How long do international transfers take?', a: 'Most international transfers are processed within 24-48 hours depending on the destination country.' },
        { q: 'Is my data secure?', a: 'PayMate uses bank-grade 256-bit encryption and multi-factor authentication to protect your assets.' },
    ];

    const handleSubmitTicket = (e) => {
        e.preventDefault();
        if (!ticket.subject || !ticket.message) return;

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setTicket({ subject: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        }, 1500);
    };

    return (
        <UserLayout title="Help & Support">
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                <div style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginBottom: '2rem', fontSize: '1.25rem', fontWeight: '800' }}>Frequently Asked Questions</h3>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #F1F5F9' }}>
                                <h4 style={{ marginBottom: '0.75rem', fontSize: '1.05rem', fontWeight: '700', color: '#1e293b' }}>{faq.q}</h4>
                                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gap: '2rem', alignContent: 'start' }}>
                    <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)', color: 'white', padding: '2.5rem', borderRadius: '32px', boxShadow: '0 10px 20px rgba(79, 70, 229, 0.2)' }}>
                        <h3 style={{ marginBottom: '1rem', fontWeight: '800' }}>Contact Us</h3>
                        <p style={{ opacity: 0.8, marginBottom: '2.5rem', fontSize: '0.95rem', lineHeight: '1.5' }}>Our support team is available 24/7 to help you with any issues or queries.</p>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <button
                                onClick={() => alert('Live Chat is currently connecting...')}
                                style={{ background: 'white', color: '#4F46E5', padding: '1rem', borderRadius: '16px', fontWeight: '800', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                            >
                                Start Live Chat
                            </button>
                            <button
                                onClick={() => window.location.href = 'mailto:support@paymate.com'}
                                style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.25)', fontWeight: '800', cursor: 'pointer', backdropFilter: 'blur(5px)' }}
                            >
                                Email Support
                            </button>
                        </div>
                    </div>

                    <div style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: '800' }}>Submit a Support Ticket</h4>
                        {submitted ? (
                            <div style={{ background: '#DEF7EC', color: '#03543F', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', fontWeight: '700' }}>
                                ✅ Ticket submitted successfully! Our team will reach out to you within 24 hours.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitTicket} style={{ display: 'grid', gap: '1rem' }}>
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    required
                                    value={ticket.subject}
                                    onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', background: '#F8FAFC' }}
                                />
                                <textarea
                                    placeholder="Describe your issue in detail..."
                                    required
                                    value={ticket.message}
                                    onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0', minHeight: '120px', outline: 'none', background: '#F8FAFC', resize: 'none' }}
                                ></textarea>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%',
                                        background: '#111827',
                                        color: 'white',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        fontWeight: '800',
                                        border: 'none',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s',
                                        opacity: isSubmitting ? 0.7 : 1
                                    }}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Send Ticket'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Help;
