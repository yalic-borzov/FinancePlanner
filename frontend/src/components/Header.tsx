import React from 'react';
import {Link} from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand" to="/">FinancePlanner</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className={"nav-link"} to={"/dashboard"}>Траты</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={"nav-link"} to={"/categories"}>Категории</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Войти</Link>
                        </li>
                        {/* Добавь дополнительные ссылки по мере необходимости */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
