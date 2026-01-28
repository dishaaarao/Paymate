import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Products.css';

const Products = () => {
    const [activeTab, setActiveTab] = useState('Equity');

    return (
        <div className="products-page-root">
            <Navbar />

            {/* Hero Section */}
            <section className="products-hero">
                <div className="container">
                    <h1 className="products-hero-headline">
                        Enjoy lifetime access with Zero cost
                    </h1>

                    <div className="pricing-cards-grid">
                        <div className="pricing-card-unit">
                            <h3 className="pricing-card-title">Delivery</h3>
                            <div className="pricing-badge-white">
                                <div className="badge-amount">
                                    <span className="badge-currency">₹</span>0
                                </div>
                            </div>
                            <p className="pricing-card-subtext">For all your trades</p>
                        </div>

                        <div className="pricing-card-unit">
                            <h3 className="pricing-card-title">Intraday</h3>
                            <div className="pricing-badge-white">
                                <div className="badge-amount">
                                    <span className="badge-currency">₹</span>20
                                </div>
                            </div>
                            <p className="pricing-card-subtext">or 0.05% (whichever is lower)</p>
                        </div>

                        <div className="pricing-card-unit">
                            <h3 className="pricing-card-title">Futures & Options</h3>
                            <div className="pricing-badge-white">
                                <div className="badge-amount">
                                    <span className="badge-currency">₹</span>20
                                </div>
                            </div>
                            <p className="pricing-card-subtext">Per executed order</p>
                        </div>

                        <div className="pricing-card-unit">
                            <h3 className="pricing-card-title">Depository</h3>
                            <div className="pricing-badge-white">
                                <div className="badge-amount">
                                    <span className="badge-currency">₹</span>0
                                </div>
                            </div>
                            <p className="pricing-card-subtext">Zero annual maintenance charges</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trade Charges Section */}
            <section className="trade-charges-section">
                <div className="container">
                    <h2 className="charges-headline">Trade Charges</h2>

                    <div className="charges-tabs">
                        {['Equity', 'Future & Options', 'Mutual Funds'].map((tab) => (
                            <button
                                key={tab}
                                className={`tab-pill ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="pricing-table-container">
                        <table className="pricing-table">
                            <thead>
                                <tr>
                                    <th>Charges</th>
                                    <th>Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Account Opening</td>
                                    <td style={{ fontWeight: 'bold' }}>Rs. 0</td>
                                </tr>
                                <tr>
                                    <td>Digital KYC & Onboarding</td>
                                    <td style={{ fontWeight: 'bold' }}>Rs. 0</td>
                                </tr>
                                <tr>
                                    <td>Annual Maintenance Charges (AMC)</td>
                                    <td style={{ fontWeight: 'bold' }}>Rs. 0</td>
                                </tr>
                                <tr>
                                    <td>Platform Fee</td>
                                    <td style={{ fontWeight: 'bold' }}>Rs. 0</td>
                                </tr>
                                <tr>
                                    <td>DP (Depository Participant) Charges</td>
                                    <td>Rs. 10 + GST per scrip (Debit)</td>
                                </tr>
                                <tr>
                                    <td>Pledge/Unpledge Charges</td>
                                    <td>Rs. 15 + GST per scrip</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
