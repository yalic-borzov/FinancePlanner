import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from "../context/AuthContext.tsx"; // Импортируйте AuthContext из соответствующего файла

const Header: React.FC = () => {
    // Используйте useContext для доступа к AuthContext
    const {isLoggedIn, logout} = useAuth();
    const {username} = useAuth();
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand" to="/">FinancePlanner</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Траты</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categories">Категории</Link>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">Привет, {username}!</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/" onClick={logout}>Выйти</Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Войти</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
