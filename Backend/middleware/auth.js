import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    // Look for token in the Authorization header (Format: Bearer <token>)
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || "your_fallback_secret_key");
        req.user = verified; // Contains the payload (e.g., { id: "user_id" })
        next(); // Pass control to the next route handler
    } catch (err) {
        res.status(403).json({ error: "Invalid or expired token." });
    }
};

export default verifyToken;