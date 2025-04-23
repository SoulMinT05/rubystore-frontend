import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosClient.interceptors.request.use(
    async (config) => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

axiosClient.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalRequest = err.config;

        if (err.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = Cookies.get('refreshToken');
            if (!refreshToken) {
                return Promise.reject(err);
            }

            try {
                // const { data } = await axiosClient.get('/api/user/refreshToken');
                const { data } = await axiosClient.post('/api/user/refreshToken', {
                    token: refreshToken,
                });
                console.log('dataRefreshToken: ', data);

                const newAccessToken = data?.data?.accessToken;

                if (newAccessToken) {
                    Cookies.set('accessToken', newAccessToken); // Lưu lại token mới
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                    const retryRequest = await axiosClient(originalRequest);
                    console.log('retryRequest: ', retryRequest);
                    return retryRequest;
                } else {
                    throw new Error('No access token received');
                }
            } catch (error) {
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                return Promise.reject(error);
            }
        }
        // Nếu không phải lỗi 401 hoặc đã thử refresh token
        return Promise.reject(err);
    },
);

export default axiosClient;
