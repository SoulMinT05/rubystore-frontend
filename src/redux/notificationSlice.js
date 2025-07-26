import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: [],
    allNotifications: [],
    unreadCountNotifications: 0,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        fetchNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        fetchAllNotifications: (state, action) => {
            state.allNotifications = action.payload;
        },
        addNotification: (state, action) => {
            // Cho header
            state.notifications.unshift(action.payload);
            state.notifications = state.notifications.slice(0, 4);

            // Cho trang all (nếu đã có dữ liệu)
            state.allNotifications.unshift(action.payload);

            state.unreadCountNotifications += 1;
        },
        getUnreadCountNotifications: (state, action) => {
            state.unreadCountNotifications = action.payload;
        },
        markNotificationRead: (state, action) => {
            const { notificationId } = action.payload;

            // Cập nhật trong header
            const indexHeader = state.notifications.findIndex((notification) => notification._id === notificationId);
            if (indexHeader !== -1) {
                state.notifications[indexHeader].isRead = true;
            }

            // Cập nhật trong all
            const indexAll = state.allNotifications.findIndex((n) => n._id === notificationId);
            if (indexAll !== -1) {
                state.allNotifications[indexAll].isRead = true;
            }

            state.unreadCountNotifications = Math.max(state.unreadCountNotifications - 1, 0);
        },
        markAllNotificationsAsRead: (state) => {
            state.notifications = state.notifications.map((notification) => ({
                ...notification,
                isRead: true,
            }));
            state.allNotifications = state.allNotifications.map((notification) => ({
                ...notification,
                isRead: true,
            }));
            state.unreadCountNotifications = 0;
        },
    },
});

export const {
    fetchNotifications,
    fetchAllNotifications,
    addNotification,
    getUnreadCountNotifications,
    markNotificationRead,
    markAllNotificationsAsRead,
} = notificationSlice.actions;

export default notificationSlice.reducer;
