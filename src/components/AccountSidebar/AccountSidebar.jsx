import React, { useContext, useEffect, useState } from 'react';

import { Button, CircularProgress } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { FaCloudUploadAlt } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { IoBagCheckOutline } from 'react-icons/io5';
import { IoMdHeartEmpty, IoMdNotificationsOutline } from 'react-icons/io';
import { IoIosLogOut } from 'react-icons/io';
import { IoKeyOutline } from 'react-icons/io5';
import { LuSend } from 'react-icons/lu';

import { MyContext } from '@/App';
import axiosClient from '@/apis/axiosClient';
import defaultAvatar from '@/assets/default_avatar.png';
import { TIME_OUT_LOADING } from '@/constants/ui';

const AccountSidebar = () => {
    const context = useContext(MyContext);
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        setIsLoadingAvatar(true);

        const fetchAvatar = async () => {
            console.log('fetch avatar');

            try {
                const { data } = await axiosClient.get('/api/user/user-details');
                if (data?.success && data?.user?.avatar) {
                    setPreview(data?.user?.avatar); // Set avatar từ backend
                    context.setUserInfo(data?.user);
                }
            } catch (error) {
                console.error('Không thể lấy avatar', error);
            } finally {
                setTimeout(() => {
                    setIsLoadingAvatar(false);
                }, TIME_OUT_LOADING);
            }
        };

        fetchAvatar();
    }, []);

    const handleChangeFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
            context.openAlertBox('error', 'Chỉ chấp nhận ảnh định dạng jpeg, jpg, png, webp');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', file);

        setIsUploading(true);
        try {
            const { data } = await axiosClient.put('/api/user/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (data.success) {
                setPreview(data?.avatar);
                context.openAlertBox('success', 'Cập nhật ảnh đại diện thành công');
            } else {
                context.openAlertBox('error', data.message || 'Tải ảnh thất bại');
            }
        } catch (error) {
            console.log(error);
            context.openAlertBox('error', 'Lỗi mạng khi upload');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="card bg-white shadow-md rounded-md sticky top-[10px]">
            <div className="w-full p-5 flex items-center justify-center flex-col">
                <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200">
                    {isUploading || isLoadingAvatar ? (
                        <CircularProgress color="inherit" />
                    ) : (
                        <img src={preview || defaultAvatar} alt="Avatar" className="w-full h-full object-cover" />
                    )}

                    <div
                        className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer
                opacity-0 transition-all group-hover:opacity-100"
                    >
                        <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
                        <input
                            type="file"
                            accept="image/*"
                            name="avatar"
                            className="absolute top-0 left-0 w-full h-full opacity-0"
                            onChange={handleChangeFile}
                        />
                    </div>
                </div>
                <h3 className="text-[15px] lg:text-[16px]">{context?.userInfo?.name}</h3>
                <h6 className="text-[13px] lg:text-[13px] font-[500]">{context?.userInfo?.email}</h6>
            </div>
            <ul className="list-none pb-0 lg:pb-5 bg-[#f1f1f1] myAccountTabs">
                <li className="w-full">
                    <NavLink
                        to="/my-account"
                        className={({ isActive }) =>
                            isActive
                                ? 'active w-full' // hoặc bất kỳ class nào bạn muốn thêm
                                : 'w-full'
                        }
                    >
                        <Button className="w-full !text-left !py-2 !px-3 !xl:!px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <FaRegUser className="text-[17px]" />
                            <span className="text-[13px] xl:text-[14px]">Trang cá nhân</span>
                        </Button>
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink
                        to="/order-history"
                        className={({ isActive }) =>
                            isActive
                                ? 'active w-full' // hoặc bất kỳ class nào bạn muốn thêm
                                : 'w-full'
                        }
                    >
                        <Button className="w-full !text-left !py-2 !px-3 !xl:!px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <IoBagCheckOutline className="text-[17px]" />
                            <span className="text-[13px] xl:text-[14px]">Lịch sử đơn hàng</span>
                        </Button>
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink
                        to="/wishlist"
                        className={({ isActive }) =>
                            isActive
                                ? 'active w-full' // hoặc bất kỳ class nào bạn muốn thêm
                                : 'w-full'
                        }
                    >
                        <Button className="w-full !text-left !py-2 !px-3 !xl:px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <IoMdHeartEmpty className="text-[17px]" />
                            <span className="text-[13px] xl:text-[14px]">Sản phẩm yêu thích</span>
                        </Button>
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink
                        to="/notification"
                        className={({ isActive }) =>
                            isActive
                                ? 'active w-full' // hoặc bất kỳ class nào bạn muốn thêm
                                : 'w-full'
                        }
                    >
                        <Button className="w-full !text-left !py-2 !px-3 !xl:px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <IoMdNotificationsOutline className="text-[17px]" />
                            <span className="text-[13px] xl:text-[14px]">Thông báo</span>
                        </Button>
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink
                        to="/message"
                        className={({ isActive }) =>
                            isActive
                                ? 'active w-full' // hoặc bất kỳ class nào bạn muốn thêm
                                : 'w-full'
                        }
                    >
                        <Button className="w-full !text-left !py-2 !px-3 !xl:px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <LuSend className="text-[17px]" />
                            <span className="text-[13px] xl:text-[14px]">Tin nhắn</span>
                        </Button>
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink
                        to="/change-password"
                        className={({ isActive }) =>
                            isActive
                                ? 'active w-full' // hoặc bất kỳ class nào bạn muốn thêm
                                : 'w-full'
                        }
                    >
                        <Button className="w-full !text-left !py-2 !px-3 !xl:!px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <IoKeyOutline className="text-[17px]" />
                            <span className="text-[13px] xl:text-[14px]">Đổi mật khẩu</span>
                        </Button>
                    </NavLink>
                </li>

                <li className="w-full">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? 'active w-full' // hoặc bất kỳ class nào bạn muốn thêm
                                : 'w-full'
                        }
                    >
                        <Button className="w-full !text-left !py-2 !px-3 !xl:!px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <IoIosLogOut className="text-[18px] text-[#ff5252]" />
                            <span className="text-[13px] xl:text-[14px] text-[#ff5252]">Đăng xuất</span>
                        </Button>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AccountSidebar;
