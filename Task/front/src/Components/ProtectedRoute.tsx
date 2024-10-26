import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, children }:any) {
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return children;
}

export default ProtectedRoute;
