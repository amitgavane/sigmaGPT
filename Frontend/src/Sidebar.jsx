import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";


function Sidebar() {
    const { 
        allThreads, 
        setAllThreads, 
        currThreadId, 
        setNewChat, 
        setPrompt, 
        setReply, 
        setCurrThreadId, 
        setPrevChats 
    } = useContext(MyContext);

    // Loads historical threads when the application mounts
    useEffect(() => {
        const loadThreads = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch("https://sigmagpt-backend-dn0n.onrender.com/api/thread", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                
                if (response.ok) {
                    const res = await response.json();
                    const filteredData = res.map(thread => ({ 
                        threadId: thread.threadId, 
                        title: thread.title 
                    }));
                    setAllThreads(filteredData);
                }
            } catch (err) {
                console.error("Network error:", err);
            }
        };

        loadThreads();
    }, [setAllThreads]); // Secure dependency alignment

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setPrevChats([]);
        setCurrThreadId(uuidv1());
    };

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`https://sigmagpt-backend-dn0n.onrender.com/api/thread/${newThreadId}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            
            if (response.ok) {
                const res = await response.json();
                setPrevChats(res);
                setNewChat(false);
                setReply(null);
            }
        } catch (err) {
            console.error(err);
        }
    };   

    const deleteThread = async (threadId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`https://sigmagpt-backend-dn0n.onrender.com/api/thread/${threadId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            
            if (response.ok) {
                setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));
                if (threadId === currThreadId) {
                    createNewChat();
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className="sidebar">
            <button onClick={createNewChat}>
                {/* FIXED: Path optimized for production deployment Vercel builds */}
                <img src="/blacklogo.png" alt="gpt logo" className="logo" />
                <span className="sidebarBrand"><b>SigmaGPT</b></span>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx} 
                            onClick={() => changeThread(thread.threadId)}
                            className={thread.threadId === currThreadId ? "highlighted" : ""}
                        >
                            {thread.title}
                            <i className="fa-solid fa-trash"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteThread(thread.threadId);
                                }}
                            ></i>
                        </li>
                    ))
                }
            </ul>
 
            <div className="sign">
                <p>By Amit Gavane</p>
            </div>
        </section>
    );
}

export default Sidebar;