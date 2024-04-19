import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

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
    return Promise.reject(error);
});

export default axiosInstance;
