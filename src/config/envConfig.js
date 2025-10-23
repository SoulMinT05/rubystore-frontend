export const getBackendUrl = () => {
    // Nếu trình duyệt đang chạy trong Docker network (có hostname 'backend')
    if (window.location.hostname === 'localhost') {
        // chua co ten mien
        return import.meta.env.VITE_BACKEND_URL;
    }
    return import.meta.env.VITE_BACKEND_URL_DOCKER; // co ten mien
};
