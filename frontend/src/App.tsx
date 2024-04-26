import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import {ExpensesProvider} from "./context/ExpensesContext.tsx";
import CategoriesPage from "./pages/CategoriesPage.tsx";
import {AuthProvider, useAuth} from "./context/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AccountPage from "./pages/AccountPage.tsx";

const AppContent: React.FC = () => {
    const {isLoggedIn, isAuthReady} = useAuth();

    if (!isAuthReady) {
        return <div>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    return (
        <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard"/> : <HomePage/>}/>
            <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard"/> : <LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route element={<ProtectedRoute/>}>
                <Route path="/dashboard" element={!isLoggedIn ? <Navigate to="/login"/> : <DashboardPage/>}/>
                <Route path="/categories" element={<CategoriesPage/>}/>
                <Route path="/account/:accountId" element={<AccountPage/>}/>
            </Route>
        </Routes>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <ExpensesProvider>
                    <AppContent/>
                </ExpensesProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
