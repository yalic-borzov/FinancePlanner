import React, {useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "../context/AuthContext.tsx";

interface ProtectedRouteProps {
    path?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
    const {isLoggedIn} = useAuth();
    const [isCheckingToken, setIsCheckingToken] = useState(true);
    const {verifyToken} = useAuth();
    useEffect(() => {
        const checkToken = async () => {
            try {
                // Предполагается, что функция verifyToken в вашем AuthContext делает запрос на сервер
                // и обновляет состояние isLoggedIn в зависимости от ответа сервера.
                await verifyToken();
            } catch (error) {
                console.error('Token verification failed:', error);
            } finally {
                setIsCheckingToken(false);
            }
        };

        if (isLoggedIn) {
            checkToken();
        } else {
            setIsCheckingToken(false); // Если не вошли, не нужно проверять токен
        }
    }, [isLoggedIn, verifyToken]);
    if (!isLoggedIn) {
        return <Navigate to="/login" replace/>;
    }
    if (isCheckingToken) {
        return <div>Loading...</div>; // или индикатор загрузки
    }

    return <Outlet/>;  // Используем Outlet для рендеринга потомков
};
export default ProtectedRoute;