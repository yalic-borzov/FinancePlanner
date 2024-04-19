import React from 'react';
import {Navigate,} from "react-router-dom";
import {isTokenValid} from "../utils/checkAuth.ts";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    return isTokenValid() ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;