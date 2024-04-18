import React from 'react';
import './App.css';
import Login from "./components/Auth/Login";

function App() {
    const handleLoginSuccess = (token: string) => {
        console.log('Logged in with token:', token);
        // Здесь может быть код для переадресации пользователя или обновления состояния приложения
    };

    return (
        <div className="App">
            <Login/>
        </div>
    );
}

export default App;
