import axios from 'axios';

const axiosRefreshToken = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true, // để gửi cookie refreshToken
});

export default axiosRefreshToken;
