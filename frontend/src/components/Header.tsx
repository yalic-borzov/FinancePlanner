import React from 'react';
import {useAuth} from "../context/AuthContext.tsx";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom"; // Импортируйте AuthContext из соответствующего файла

const Header: React.FC = () => {
    // Используйте useContext для доступа к AuthContext
    const {isLoggedIn, logout, username} = useAuth();
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="#home">FinancePlanner</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Item><Link className={"nav-link"} to={"/dashboard"}>Траты</Link></Nav.Item>
                        <Nav.Item><Link className={"nav-link"} to={"/categories"}>Категории</Link></Nav.Item>
                        {isLoggedIn ? (
                            <>
                                <Nav.Item> <span className="nav-link">Привет, {username}!</span></Nav.Item>
                                <Nav.Item><Link className={"nav-link"} to={"/"} onClick={logout}>Выйти</Link></Nav.Item>
                            </>
                        ) : (

                            <Nav.Link href={"/login"}>Войти</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
};

export default Header;
