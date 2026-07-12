import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    // Check if the user has a token in their browser storage
    const token = localStorage.getItem("token");

    if (!token) {
        // If no token exists, redirect them immediately to the login page
        return <Navigate to="/login" replace />;
    }

    // If token exists, allow them to see the wrapped component (the chat)
    return children;
}

export default ProtectedRoute;