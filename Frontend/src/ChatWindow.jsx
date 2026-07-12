import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

// Import your modal components
import SettingsModal from "./components/SettingsModal.jsx";
import UpgradeModal from "./components/UpgradeModal.jsx";

function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    
    // UI Dropdown & Modal States
    const [isOpen, setIsOpen] = useState(false);             // Profile Dropdown
    const [isModelOpen, setIsModelOpen] = useState(false);   // SigmaGPT Model Dropdown
    const [showSettings, setShowSettings] = useState(false); // Settings Modal
    const [showUpgrade, setShowUpgrade] = useState(false);   // Upgrade Modal
    
    // Active Model State
    const [selectedModel, setSelectedModel] = useState("SigmaGPT-4o");

    // Theme State
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const navigate = useNavigate();

    // Persist Theme across reloads
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    };

    const getReply = async () => {
        if (!prompt.trim()) return;
        
        setLoading(true);
        setNewChat(false);
        const token = localStorage.getItem("token");

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch("https://sigmagpt-backend-dn0n.onrender.com/api/chat", options);
            const res = await response.json();
            setReply(res.reply);
        } catch(err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, { role: "user", content: prompt }, { role: "assistant", content: reply }]
            ));
        }
        setPrompt("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reply]);

    const handleLogout = () => {
        setIsOpen(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    // Handler for changing the model
    const handleModelChange = (modelName) => {
        setSelectedModel(modelName);
        setIsModelOpen(false);
    };

    return (
        <div className="chatWindow">
            <div className="navbar">
                {/* --- Interactive Model Selector --- */}
                <span 
                    className="modelSelector" 
                    onClick={() => {
                        setIsModelOpen(!isModelOpen);
                        setIsOpen(false); // Close profile dropdown if open
                    }}
                >
                    {selectedModel} <i className={`fa-solid fa-chevron-${isModelOpen ? 'up' : 'down'}`}></i>
                </span>
                
                {/* --- Profile Icon --- */}
                <div 
                    className="userIconDiv" 
                    onClick={() => {
                        setIsOpen(!isOpen);
                        setIsModelOpen(false); // Close model dropdown if open
                    }}
                >
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            
            {/* --- Model Selector Dropdown --- */}
            {isModelOpen && (
                <div className="modelDropDown">
                    <div className={`modelItem ${selectedModel === "SigmaGPT-4o" ? "active" : ""}`} onClick={() => handleModelChange("SigmaGPT-4o")}>
                        <i className="fa-solid fa-bolt" style={{color: "var(--text-main)"}}></i>
                        <div className="modelDetails">
                            <span className="modelName">SigmaGPT-4o</span>
                            <span className="modelDesc">Great for everyday tasks</span>
                        </div>
                    </div>
                    <div className={`modelItem ${selectedModel === "SigmaGPT-4 Pro" ? "active" : ""}`} onClick={() => handleModelChange("SigmaGPT-4 Pro")}>
                        <i className="fa-solid fa-brain" style={{color: "#a855f7"}}></i>
                        <div className="modelDetails">
                            <span className="modelName">SigmaGPT-4 Pro</span>
                            <span className="modelDesc">Complex reasoning & coding</span>
                        </div>
                    </div>
                </div>
            )}
            
            {/* --- Profile Dropdown --- */}
            {isOpen && (
                <div className="dropDown">
                    <div className="dropDownItem" onClick={toggleTheme}>
                        {theme === "dark" ? (
                            <><i className="fa-solid fa-sun"></i> Light Mode</>
                        ) : (
                            <><i className="fa-solid fa-moon"></i> Dark Mode</>
                        )}
                    </div>
                    <div className="dropDownItem" onClick={() => { setIsOpen(false); setShowSettings(true); }}>
                        <i className="fa-solid fa-gear"></i> Settings
                    </div>
                    <div className="dropDownItem" onClick={() => { setIsOpen(false); setShowUpgrade(true); }}>
                        <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
                    </div>
                    <div className="dropDownItem" onClick={handleLogout}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                    </div>
                </div>
            )}
            
            <Chat />

            <ScaleLoader color="var(--accent)" loading={loading} />
            
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
                    />
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    SigmaGPT can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>

            {/* --- Modals --- */}
            {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
            {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
        </div>
    );
}

export default ChatWindow;