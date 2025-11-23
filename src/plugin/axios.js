import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur qui ajoute automatiquement le token JWT dans l’en-tête
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
