import React, { useContext, useState } from 'react';

import './NotificationItems.scss';
import { Link, useNavigate } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { GoTriangleDown } from 'react-icons/go';
import { Avatar, Button, CircularProgress, Menu, MenuItem, Rating } from '@mui/material';
import { Popper, Paper, ClickAwayListener, List, ListItem, IconButton } from '@mui/material';
import { IoBagCheckOutline } from 'react-icons/io5';
import { FaRegComments } from 'react-icons/fa';
import { MyContext } from '../../App';
import { useDispatch } from 'react-redux';
import axiosClient from '../../apis/axiosClient';
import { markNotificationRead } from '../../redux/notificationSlice';
import defaultAvatar from '../../assets/default_avatar.png';

const tailwindColorMap = {
    'bg-blue-500': '#3b82f6',
    'bg-green-500': '#22c55e',
    'bg-yellow-500': '#eab308',
    'bg-purple-500': '#8b5cf6',
    'bg-red-500': '#ef4444',
    'bg-gray-500': '#6b7280',
};

const getNotificationAvatar = (type, bgColor) => {
    const hexColor = tailwindColorMap[bgColor] || '#6b7280';

    switch (type) {
        case 'order':
            return (
                <Avatar sx={{ bgcolor: hexColor }}>
                    <IoBagCheckOutline size={20} color="white" />
                </Avatar>
            );
        case 'review':
            return (
                <Avatar sx={{ bgcolor: hexColor }}>
                    <FaRegComments size={18} color="white" />
                </Avatar>
            );
        default:
            return <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />;
    }
};

const NotificationItems = ({ isLoadingNotifications, allNotifications }) => {
    const context = useContext(MyContext);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [visibleCount, setVisibleCount] = useState(10); // Hiển thị ban đầu 10 cái
    const visibleNotifications = allNotifications?.slice(0, visibleCount);

    const markNotificationAsRead = async (notificationId) => {
        try {
            const { data } = await axiosClient.post(`/api/notification/markNotificationAsRead/${notificationId}`);
            if (data.success) {
                // context.openAlertBox('success', data.message);
                dispatch(markNotificationRead({ notificationId: data?.notificationId }));
            }
        } catch (error) {
            console.log(error);
            context.openAlertBox('error', error?.response?.data?.message || 'Đã xảy ra lỗi!');
        }
    };

    const handleMarkAsReadAndNavigate = async (notificationId) => {
        try {
            const { data } = await axiosClient.post(`/api/notification/markNotificationAsRead/${notificationId}`);
            if (data.success) {
                dispatch(markNotificationRead({ notificationId: data?.notificationId }));
                navigate(`${data.targetUrl}`);
            }
        } catch (error) {
            console.log(error);
            context.openAlertBox('error', error?.response?.data?.message || 'Đã xảy ra lỗi!');
        }
    };

    return (
        <div className="pt-6 pb-2">
            {isLoadingNotifications ? (
                <div className="flex items-center justify-center w-full min-h-[400px]">
                    <CircularProgress color="inherit" />
                </div>
            ) : (
                <>
                    {visibleNotifications?.length === 0 && (
                        <div className="text-center">
                            <span className="p-4 text-gray-500 text-sm">Chưa có thông báo nào</span>
                        </div>
                    )}
                    {visibleNotifications?.length > 0 && (
                        <ul className="divide-y divide-gray-200 rounded-md bg-white shadow-md">
                            {visibleNotifications?.map((notification) => (
                                <li
                                    key={notification._id}
                                    onClick={() => handleMarkAsReadAndNavigate(notification._id)}
                                    className={`p-4 cursor-pointer hover:bg-gray-100 transition ${
                                        !notification.isRead ? 'bg-red-50' : ''
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div>
                                            {notification?.type === 'order' ? (
                                                getNotificationAvatar(notification?.type, notification?.bgColor)
                                            ) : (
                                                <Avatar src={notification?.avatarSender || defaultAvatar} />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-[14px] sm:text-[15px] font-[500]">
                                                {notification?.title}
                                            </h3>
                                            <p
                                                className="text-[12px] sm:text-[13px] text-gray-600 mt-1 overflow-hidden 
                                        text-ellipsis line-clamp-2"
                                            >
                                                {notification?.description}
                                            </p>
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mt-2">
                                                <span className="text-xs text-gray-400">
                                                    {formatDateUTCPlus7(notification?.createdAt)}
                                                </span>
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        markNotificationAsRead(notification._id);
                                                    }}
                                                    className={`text-xs mt-2 sm:mt-0 italic ${
                                                        notification?.isRead
                                                            ? 'text-gray-500'
                                                            : 'text-blue-500 hover:underline cursor-pointer'
                                                    }`}
                                                >
                                                    {notification?.isRead ? 'Đã đọc' : 'Đánh dấu là đã đọc'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Nút "Xem thêm" nếu còn thông báo chưa hiển thị */}
                    {visibleCount < allNotifications?.length && (
                        <div className="text-center mt-3">
                            <button
                                onClick={() => setVisibleCount((prev) => prev + 10)}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                Xem thêm
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default NotificationItems;

function formatDateUTCPlus7(dateString) {
    const date = new Date(dateString);
    date.setHours(date.getHours());

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year} `;
}
