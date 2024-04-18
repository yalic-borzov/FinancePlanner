import React, {FormEvent, useState} from 'react';
import api from "../../api";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await api.post('/auth/login', {username, password});
            localStorage.setItem('token', response.data.access_token);
            alert('Login Successful');
        } catch (error) {
            alert('Login Failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;