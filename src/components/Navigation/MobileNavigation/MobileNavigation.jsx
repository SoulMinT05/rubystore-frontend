import React from 'react';
import './MobileNavigation.scss';
import { Button } from '@mui/material';
import { IoHomeOutline, IoSearch } from 'react-icons/io5';
import { LuHeart } from 'react-icons/lu';
import { FiUser } from 'react-icons/fi';
import { BsBagCheck } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';
import { IoMdNotificationsOutline } from 'react-icons/io';

const MobileNavigation = () => {
    return (
        <div className="mobileNav bg-white p-1 px-3 w-full grid grid-cols-5 fixed bottom-0 left-0 place-items-center z-[51] ">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? 'active w-full' // hoặc bất kỳ class nào bạn muốn thêm
                        : 'w-full'
                }
            >
                <Button className="flex-col !w-[80px] !min-w-[80px] !text-gray-700">
                    <IoHomeOutline size={18} />
                    <span className="text-[12px]">Trang chủ</span>
                </Button>
            </NavLink>

            <div className="w-full">
                <Button className="flex-col !w-[80px] !min-w-[80px] !text-gray-700">
                    <IoSearch size={18} />
                    <span className="text-[12px]">Tìm kiếm</span>
                </Button>
            </div>

            <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                    isActive
                        ? 'active w-full' // hoặc bất kỳ class nào bạn muốn thêm
                        : 'w-full'
                }
            >
                <Button className="flex-col !w-[80px] !min-w-[80px] !text-gray-700">
                    <IoMdNotificationsOutline size={18} />
                    <span className="text-[12px]">Thông báo</span>
                </Button>
            </NavLink>
            <NavLink
                to="/order-history"
                className={({ isActive }) =>
                    isActive
                        ? 'active w-full' // hoặc bất kỳ class nào bạn muốn thêm
                        : 'w-full'
                }
            >
                <Button className="flex-col !w-[80px] !min-w-[80px] !text-gray-700">
                    <BsBagCheck size={18} />
                    <span className="text-[12px]">Đơn hàng</span>
                </Button>
            </NavLink>
            <NavLink
                to="/my-account"
                className={({ isActive }) =>
                    isActive
                        ? 'active w-full' // hoặc bất kỳ class nào bạn muốn thêm
                        : 'w-full'
                }
            >
                <Button className="flex-col !w-[80px] !min-w-[80px] !text-gray-700">
                    <FiUser size={18} />
                    <span className="text-[12px]">Tài khoản</span>
                </Button>
            </NavLink>
        </div>
    );
};

export default MobileNavigation;
