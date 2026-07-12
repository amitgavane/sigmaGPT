import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
import verifyToken from "../middleware/auth.js"; // Import the auth guard middleware

const router = express.Router();

// Apply the verifyToken middleware to all chat endpoints below
router.use(verifyToken);

// 1. Get all threads belonging strictly to the logged-in user
router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({ userId: req.user.id }).sort({ updatedAt: -1 });
        res.json(threads);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch threads" });
    }
});

// 2. Get messages for a specific thread (ensuring it belongs to the user)
router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;

    try {
        const thread = await Thread.findOne({ threadId, userId: req.user.id });

        if (!thread) {
            return res.status(404).json({ error: "Thread not found or unauthorized" });
        }

        res.json(thread.messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch chat" });
    }
});

// 3. Delete a specific thread (ensuring ownership)
router.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;

    try {
        const deletedThread = await Thread.findOneAndDelete({ threadId, userId: req.user.id });

        if (!deletedThread) {
            return res.status(404).json({ error: "Thread not found or unauthorized" });
        }

        res.status(200).json({ success: "Thread deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete thread" });
    }
});

// 4. Post a message to a thread (automatically attaches userId)
router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        let thread = await Thread.findOne({ threadId, userId: req.user.id });

        if (!thread) {
            // Create a completely new thread for this explicit user
            thread = new Thread({
                userId: req.user.id,
                threadId,
                title: message,
                messages: [{ role: "user", content: message }]
            });
        } else {
            thread.messages.push({ role: "user", content: message });
        }

        const assistantReply = await getOpenAIAPIResponse(message);

        thread.messages.push({ role: "assistant", content: assistantReply });
        thread.updatedAt = new Date();

        await thread.save();
        res.json({ reply: assistantReply });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

export default router;