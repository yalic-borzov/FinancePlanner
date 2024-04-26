import axios from 'axios';
import config from '../config.json';

const API_BASE_URL = config.API_BASE_URL;

// Функция для получения сохраненного токена
function getToken() {
    return localStorage.getItem('token');
}

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Добавляем интерсептор для вставки токена в каждый запрос
axiosInstance.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    console.log(API_BASE_URL);
    return Promise.reject(error);
});
axiosInstance.defaults.baseURL = API_BASE_URL;

export default axiosInstance;
