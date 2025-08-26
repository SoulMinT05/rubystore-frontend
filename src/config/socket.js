import { io } from 'socket.io-client';

const userId = localStorage.getItem('userId');
const role = localStorage.getItem('role');

export const socket = io(import.meta.env.VITE_BACKEND_URL, {
    withCredentials: true,
    transports: ['websocket'],
    query: { userId, role },
});
