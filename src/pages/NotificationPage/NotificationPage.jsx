import React, { useContext, useEffect } from 'react';

import './NotificationPage.scss';

import { BsFillBagCheckFill } from 'react-icons/bs';
import { Button } from '@mui/material';
import CartItems from '../../components/CartItems/CartItems';
import WishlistItems from '../../components/WishlistItems/WishlistItems';
import AccountSidebar from '../../components/AccountSidebar/AccountSidebar';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../apis/axiosClient';
import {
    fetchAllNotifications,
    getUnreadCountNotifications,
    markAllNotificationsAsRead,
} from '../../redux/notificationSlice';
import { MyContext } from '../../App';
import NotificationItems from '../../components/NotificationItems/NotificationItems';
import AccountSidebarLayout from '../../layouts/AccountSidebarLayout';

const NotificationPage = () => {
    const context = useContext(MyContext);
    const dispatch = useDispatch();
    const { allNotifications } = useSelector((state) => state.notification);
    const { unreadCountNotifications } = useSelector((state) => state.notification);

    useEffect(() => {
        const getNotification = async () => {
            const { data } = await axiosClient.get('/api/notification/getNotifications');
            if (data.success) {
                dispatch(fetchAllNotifications(data?.notifications));
                dispatch(getUnreadCountNotifications(data?.unreadCountNotifications));
            }
        };
        getNotification();
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
                            {unreadCountNotifications?.length || 0} <span> </span>
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
                    allNotifications={allNotifications}
                    unreadCountNotifications={unreadCountNotifications}
                />
            </div>
        </AccountSidebarLayout>
        // <section className="py-3 lg:py-10 w-full">
        //     <div className="container flex flex-col lg:flex-row gap-5">
        //         <div className="col1 w-full lg:w-[20%]">
        //             <AccountSidebar />
        //         </div>
        //         <div className="col2 w-full lg:w-[80%]">
        //             <div className="bg-white pt-5 py-2 shadow-md rounded-md">
        //                 <div className="py-2 px-5">
        //                     <h2 className="pb-1 text-[15px] lg:text-[16px]">
        //                         Thông báo ({allNotifications?.length || 0}){' '}
        //                     </h2>
        //                 </div>
        //                 <div className="py-1 px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        //                     <span className="mt-0 text-[12px] sm:text-[13px] md:text-[14px]">
        //                         <span className="font-bold text-primary">
        //                             {unreadCountNotifications?.length || 0} <span> </span>
        //                         </span>
        //                         <span className="">thông báo chưa đọc</span>
        //                     </span>
        //                     <span
        //                         onClick={handleMarkAllNotificationsAsRead}
        //                         className="mt-2 sm:mt-0 text-[12px] sm:text-[13px] md:text-[14px] text-blue-500 hover:underline cursor-pointer"
        //                     >
        //                         Đánh dấu tất cả đã đọc
        //                     </span>
        //                 </div>

        //                 <hr />

        //                 <NotificationItems
        //                     allNotifications={allNotifications}
        //                     unreadCountNotifications={unreadCountNotifications}
        //                 />
        //             </div>
        //         </div>
        //     </div>
        // </section>
    );
};

export default NotificationPage;
