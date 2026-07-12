import React from 'react';
import './Modals.css';

function SettingsModal({ onClose }) {
    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                
                <div className="modalHeader">
                    <h2>Settings</h2>
                    <button className="closeBtn" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="modalBody">
                    <div className="settingItem">
                        <span>Theme Preference</span>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                            Managed via Dropdown Menu
                        </span>
                    </div>
                    <div className="settingItem">
                        <span>Display Name</span>
                        <input type="text" placeholder="Update name..." style={{ width: "150px", padding: "8px" }} />
                    </div>
                    <div className="settingItem">
                        <span>Clear All Chats</span>
                        <button className="dangerBtn" onClick={() => alert("Delete API logic goes here!")}>
                            Delete Data
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SettingsModal;