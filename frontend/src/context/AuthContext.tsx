import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authService} from "../api/authService.ts";

interface AuthContextType {
    isLoggedIn: boolean;
    isAuthReady: boolean;
    username: string
    login: (token: string) => void;
    logout: () => void;
    verifyToken: () => Promise<void>;
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
    const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
    const [username, setUsername] = useState('')
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

    const verifyToken = async () => {
        try {
            const response = await authService.getUser();

            if (!response.username) {
                // Обработка случаев, когда токен недействителен
                setIsLoggedIn(false);
            } else {
                setUsername(response.username)
            }
        } catch (error) {
            setIsLoggedIn(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, isAuthReady, login, logout, verifyToken, username}}>
            {children}
        </AuthContext.Provider>
    );
};
