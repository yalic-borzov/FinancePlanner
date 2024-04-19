import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import PrivateRoute from "./pages/PrivateRoute.tsx";
import {ExpensesProvider} from "./context/ExpensesContext.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <ExpensesProvider>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path={"/dashboard"} element={<PrivateRoute>
                        <DashboardPage/>
                    </PrivateRoute>}/>
                </Routes>
            </ExpensesProvider>
        </Router>
    );
};

export default App;
