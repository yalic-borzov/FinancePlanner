import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputField from "../components/InputField.tsx";
import PrimaryButton from "../components/PrimaryButton.tsx";
import {authService} from "../api/authService.ts";
import {useAuth} from "../context/AuthContext.tsx";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {login} = useAuth();
    const handleLogin = async () => {
        try {
            let response = await authService.login(username, password);
            const {access_token} = response;
            console.log('Login successful:', access_token);
            login(access_token);
            navigate('/dashboard');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Failed to login', error.response.data);
                alert('Login failed: ' + error.response.data.message);
            }
            throw error;
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
            <div className="w-100" style={{maxWidth: '320px'}}>
                <h1 className="mb-3">Войти</h1>
                <InputField
                    type="text"
                    value={username}
                    onChange={setUsername}
                    placeholder="Username"
                />
                <InputField
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Password"
                />
                <PrimaryButton onClick={handleLogin} text={'Войти'}/><br/><br/>
                <Link to={"/"}>Назад, на главную</Link>
            </div>
        </div>
    );
};

export default LoginPage;
