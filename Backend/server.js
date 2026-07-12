import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js"; // Import new auth routes

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

// Wire up the new endpoints
app.use("/api/auth", authRoutes); // Routes for register & login
app.use("/api", chatRoutes);       // Routes for chat history and threads

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    connectDB();
});

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch(err) {
        console.log("Failed to connect with Db", err);
    }
}