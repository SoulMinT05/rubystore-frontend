import { io } from 'socket.io-client';
import { getBackendUrl } from './envConfig';

export const socket = io(getBackendUrl(), {
    withCredentials: true,
    transports: ['websocket'],
});
