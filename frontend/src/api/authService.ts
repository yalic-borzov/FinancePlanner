import axios from './axiosConfig';

const API_BASE_URL = 'http://localhost:5000/api/auth';

class AuthService {
    async register(username: string, email: string, password: string) {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, {
                username,
                email,
                password
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async login(username: string, password: string) {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                username,
                password
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export const authService = new AuthService();
