import React from 'react';
import Header from "../components/Header.tsx";
import CardIcon from "../components/CardIcon.tsx";
import PrimaryButtonLink from "../components/PrimaryButtonLink.tsx";

const HomePage: React.FC = () => {
    return (
        <>
            <Header/>
            <div className="container my-5">
                <h1>Добро пожаловать в FinancePlanner!</h1>
                <p className="lead">Управляйте своими финансами легко и удобно.</p>

                <div className="row">
                    <div className="col">
                        <CardIcon icon={'/images/cursor.webp'} iconAlt={'Молния'} text={'Простой интерфейс'}/>
                    </div>
                    <div className="col">
                        <CardIcon icon={'/images/lightning.webp'} iconAlt={'Молния'} text={"Быстрый ввод транзакций"}/>
                    </div>
                </div>
                <div className="auth__block">
                    <PrimaryButtonLink text={'Войти'} link={"/login"}/> <br/>
                    <PrimaryButtonLink text={'Регистрироваться'} link={"/register"}/> <br/>
                </div>
            </div>
        </>
    );
};

export default HomePage;
