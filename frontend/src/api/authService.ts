import axiosInstance from "./axiosConfig";
import config from '../config.json'

const API_BASE_URL = `${config.API_BASE_URL}/auth`;

class AuthService {
    async register(username: string, email: string, password: string) {
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}/register`, {
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
            const response = await axiosInstance.post(`${API_BASE_URL}/login`, {
                username,
                password
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getUser() {
        try {
            const response = await axiosInstance.get(`${API_BASE_URL}/user`)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export const authService = new AuthService();
