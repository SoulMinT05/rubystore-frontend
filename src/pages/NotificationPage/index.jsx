import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './NotificationPage.scss';
import axiosClient from '@/apis/axiosClient';
import {
    fetchAllNotifications,
    getUnreadCountNotifications,
    markAllNotificationsAsRead,
} from '@/redux/notificationSlice';
import { MyContext } from '@/App';
import NotificationItems from '@/components/NotificationItems';
import AccountSidebarLayout from '@/components/AccountSidebar/AccountSidebarLayout';
import { TIME_OUT_LOADING } from '@/constants/ui';

const NotificationPage = () => {
    const context = useContext(MyContext);
    const dispatch = useDispatch();
    const { allNotifications } = useSelector((state) => state.notification);
    const { unreadCountNotifications } = useSelector((state) => state.notification);

    const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);

    useEffect(() => {
        setIsLoadingNotifications(true);

        const handleTimeout = setTimeout(() => {
            const getNotifications = async () => {
                try {
                    const { data } = await axiosClient.get('/api/notification/getNotifications');
                    if (data.success) {
                        dispatch(fetchAllNotifications(data?.notifications));
                        dispatch(getUnreadCountNotifications(data?.unreadCountNotifications));
                    }
                } catch (error) {
                    console.log('error: ', error);
                    context.openAlertBox('error', error.response.data.message);
                } finally {
                    setIsLoadingNotifications(false);
                }
            };
            getNotifications();
        }, TIME_OUT_LOADING);

        return () => {
            clearTimeout(handleTimeout);
        };
    }, [context?.isLogin, dispatch]);

    const handleMarkAllNotificationsAsRead = async () => {
        if (unreadCountNotifications === 0) return;
        try {
            const { data } = await axiosClient.post(`/api/notification/markAllNotificationsAsRead`);
            if (data.success) {
                context.openAlertBox('success', data.message);
                dispatch(markAllNotificationsAsRead());
            }
        } catch (error) {
            console.log(error);
            context.openAlertBox('error', error?.response?.data?.message || 'Đã xảy ra lỗi!');
        }
    };

    return (
        <AccountSidebarLayout>
            <div className="bg-white pt-5 py-2 shadow-md rounded-md">
                <div className="py-2 px-5">
                    <h2 className="pb-1 text-[15px] lg:text-[16px]">Thông báo ({allNotifications?.length || 0}) </h2>
                </div>
                <div className="py-1 px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <span className="mt-0 text-[12px] sm:text-[13px] md:text-[14px]">
                        <span className="font-bold text-primary">
                            {unreadCountNotifications || 0} <span> </span>
                        </span>
                        <span className="">thông báo chưa đọc</span>
                    </span>
                    <span
                        onClick={handleMarkAllNotificationsAsRead}
                        className="mt-2 sm:mt-0 text-[12px] sm:text-[13px] md:text-[14px] text-blue-500 hover:underline cursor-pointer"
                    >
                        Đánh dấu tất cả đã đọc
                    </span>
                </div>

                <hr />

                <NotificationItems
                    isLoadingNotifications={isLoadingNotifications}
                    allNotifications={allNotifications}
                    unreadCountNotifications={unreadCountNotifications}
                />
            </div>
        </AccountSidebarLayout>
    );
};

export default NotificationPage;
