import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "../context/AuthContext.tsx";

interface ProtectedRouteProps {
    path?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
    const {isLoggedIn} = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;  // Используем Outlet для рендеринга потомков
};
export default ProtectedRoute;