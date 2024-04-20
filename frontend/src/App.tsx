import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import {ExpensesProvider} from "./context/ExpensesContext.tsx";
import CategoriesPage from "./pages/CategoriesPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <ProtectedRoute>
                        <ExpensesProvider>
                            <Route path={"/dashboard"} element={
                                <DashboardPage/>}
                            ></Route>
                            <Route path={"/categories"} element={<CategoriesPage/>}></Route>
                        </ExpensesProvider>
                    </ProtectedRoute>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
