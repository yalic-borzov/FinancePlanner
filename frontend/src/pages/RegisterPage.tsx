import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from "../components/Header.tsx";
import InputField from "../components/InputField.tsx";
import PrimaryButton from "../components/PrimaryButton.tsx";
import {authService} from "../api/authService.ts";

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await authService.register(username, email, password);
            console.log('Registration successful', response.data);
            navigate('/login');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Registration failed', error.response?.data);
                alert('Registration failed: ' + error.response?.data.message);
            } else {
                console.error('Unexpected error', error);
                alert('An unexpected error occurred');
            }
        }
    };

    return (
        <>
            <Header/>
            <div className="d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
                <div className="w-100" style={{maxWidth: '320px'}}>
                    <h1 className="mb-3">Register</h1>
                    <InputField
                        type="text"
                        value={username}
                        onChange={setUsername}
                        placeholder="Username"
                    />
                    <InputField
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="Email"
                    />
                    <InputField
                        type="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="Password"
                    />
                    <InputField
                        type="password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        placeholder="Confirm Password"
                    />
                    <PrimaryButton onClick={handleRegister} text={'Создать аккаунт'}/>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
