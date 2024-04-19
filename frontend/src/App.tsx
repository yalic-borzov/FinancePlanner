import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path={"/dashboard"} element={<DashboardPage/>}/>
                {/* Другие маршруты могут быть добавлены здесь */}
            </Routes>
        </Router>
    );
};

export default App;
