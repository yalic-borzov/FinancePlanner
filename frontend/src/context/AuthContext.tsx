import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

interface AuthContextType {
    isLoggedIn: boolean;
    isAuthReady: boolean; // Новое состояние для отслеживания готовности аутентификации
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAuthReady, setIsAuthReady] = useState<boolean>(false); // Индикатор готовности аутентификации
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        setIsAuthReady(true); // Установить в true после проверки токена
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, isAuthReady, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
