import React, { useContext, useEffect } from 'react';
import './MobileNavigation.scss';
import { Button } from '@mui/material';
import { IoHomeOutline, IoSearch } from 'react-icons/io5';
import { LuHeart } from 'react-icons/lu';
import { FiUser } from 'react-icons/fi';
import { BsBagCheck } from 'react-icons/bs';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdOutlineFilterAlt } from 'react-icons/md';
import { MyContext } from '../../../App';

const MobileNavigation = () => {
    const context = useContext(MyContext);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/product' || location.pathname === '/search') {
            context.setIsFilterProductsBtnShow(true);
        } else {
            context.setIsFilterProductsBtnShow(false);
        }
    }, [location]);

    const handleOpenFilterProducts = () => {
        context.setOpenFilterProducts(true);
    };

    return (
        <div
            className={`mobileNav bg-white p-1 px-3 w-full 
                grid ${context?.isFilterProductsBtnShow ? 'grid-cols-5' : 'grid-cols-4'} place-items-center 
            fixed bottom-0 left-0  z-[51]`}
        >
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? 'active w-full' // hoặc bất kỳ class nào bạn muốn thêm
                        : 'w-full'
                }
            >
                <Button
                    onClick={() => context?.setOpenSearchPanel(false)}
                    className="flex-col !w-[80px] !min-w-[80px] !text-gray-700"
                >
                    <IoHomeOutline size={18} />
                    <span className="text-[12px]">Trang chủ</span>
                </Button>
            </NavLink>

            {context?.isFilterProductsBtnShow === true && (
                <Button
                    onClick={handleOpenFilterProducts}
                    className="flex-col !w-[40px] !h-[40px] !min-w-[40px] !text-gray-700 !bg-primary !rounded-full "
                >
                    <MdOutlineFilterAlt size={18} className="text-white" />
                </Button>
            )}

            <div className="w-full">
                <Button
                    onClick={() => context?.setOpenSearchPanel(true)}
                    className="flex-col !w-[80px] !min-w-[80px] !text-gray-700"
                >
                    <IoSearch size={18} />
                    <span className="text-[12px]">Tìm kiếm</span>
                </Button>
            </div>

            <NavLink
                to="/notification"
                className={({ isActive }) =>
                    isActive
                        ? 'active w-full' // hoặc bất kỳ class nào bạn muốn thêm
                        : 'w-full'
                }
            >
                <Button
                    onClick={() => context?.setOpenSearchPanel(false)}
                    className="flex-col !w-[80px] !min-w-[80px] !text-gray-700"
                >
                    <IoMdNotificationsOutline size={18} />
                    <span className="text-[12px]">Thông báo</span>
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
                <Button
                    onClick={() => context?.setOpenSearchPanel(false)}
                    className="flex-col !w-[80px] !min-w-[80px] !text-gray-700"
                >
                    <FiUser size={18} />
                    <span className="text-[12px]">Tài khoản</span>
                </Button>
            </NavLink>
        </div>
    );
};

export default MobileNavigation;
