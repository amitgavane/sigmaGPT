import React from 'react';
import './Modals.css';

function UpgradeModal({ onClose }) {
    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent upgradeModal" onClick={(e) => e.stopPropagation()}>
                
                <div className="modalHeader">
                    <h2>Upgrade to SigmaGPT Pro</h2>
                    <button className="closeBtn" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="modalBody pricingTable">
                    <div className="tier freeTier">
                        <h3>Free</h3>
                        <p className="price">$0<span>/mo</span></p>
                        <ul>
                            <li><i className="fa-solid fa-check"></i> Standard API Model</li>
                            <li><i className="fa-solid fa-check"></i> Basic response speed</li>
                            <li><i className="fa-solid fa-check"></i> Standard chat limits</li>
                        </ul>
                        <button className="tierBtn disabled" disabled>Current Plan</button>
                    </div>

                    <div className="tier proTier">
                        <h3>Pro <i className="fa-solid fa-star" style={{color: "#fbbf24"}}></i></h3>
                        <p className="price">$20<span>/mo</span></p>
                        <ul>
                            <li><i className="fa-solid fa-check"></i> Premium AI Models</li>
                            <li><i className="fa-solid fa-check"></i> Faster response times</li>
                            <li><i className="fa-solid fa-check"></i> Priority API access</li>
                        </ul>
                        <button className="tierBtn active" onClick={() => alert("Stripe Integration coming soon!")}>
                            Subscribe Now
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default UpgradeModal;