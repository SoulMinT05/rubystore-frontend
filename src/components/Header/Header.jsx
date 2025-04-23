import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../Search/Search';
import { Button } from '@mui/material';
import { Badge } from '@mui/material';
import { Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoGitCompareOutline } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa6';
import { FaRegUser } from 'react-icons/fa';
import { IoBagCheckOutline } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoIosLogOut } from 'react-icons/io';
import Cookies from 'js-cookie';

import Navigation from '../Navigation/Navigation';
import { MyContext } from '../../App';
import logo from '../../assets/logo.jpg';

import './Header.css';

import axiosToken from '../../apis/axiosToken';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const open = Boolean(anchorEl);
    const context = useContext(MyContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        setAnchorEl(null);
        setIsLoading(true);
        try {
            const { data } = await axiosToken.post('/api/user/logout', {
                withCredentials: true,
            });

            console.log('dataLogout: ', data);

            if (data.success) {
                context.openAlertBox('success', data.message);

                Cookies.remove('accessToken');

                context.setIsLogin(false);

                context.openAlertBox('success', data.message);
                navigate('/login');
            } else {
                context.openAlertBox('error', data.message);
            }
        } catch (err) {
            console.log(err);
            context.openAlertBox('error', err?.response?.data?.message || 'Đã xảy ra lỗi!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <header className="bg-white">
            <div className="top-strip py-2 border-t-[1px] border-gray-250 border-b-[1px] ">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="col1 w-[50%]">
                            <p className="text-[12px] font-[500]">Sale to 50% off new season styles, limited time</p>
                        </div>
                        <div className="col2 flex items-center justify-end">
                            <ul className="flex items-center gap-3">
                                <li className="list-none">
                                    <Link to="/help-center" className="text-[12px] link font-[500]">
                                        Help Center
                                    </Link>
                                </li>
                                <li className="list-none">
                                    <Link to="/order-tracking" className="text-[12px] link font-[500]">
                                        Order Tracking
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header py-4 border-b-[1px] border-gray-250">
                <div className="container flex items-center justify-between">
                    <div className="col1 w-[25%]">
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="col2 w-[40%]">
                        <Search />
                    </div>
                    <div className="col3 w-[35%] flex items-center pl-7">
                        <ul className="flex items-center justify-end gap-3 w-full">
                            {context.isLogin === false ? (
                                <li className="list-none">
                                    <Link to="/login" className="link transition text-[15px] font-[500]">
                                        Đăng nhập
                                    </Link>
                                </li>
                            ) : (
                                <>
                                    <Button
                                        className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer"
                                        onClick={handleClick}
                                    >
                                        <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1]">
                                            <FaRegUser className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                                        </Button>
                                        <div className="info flex flex-col gap-1">
                                            <h4 className="leading-3 text-[14px] text-[rgba(0,0,0,0.7)] mb-0 font-[500] capitalize text-left justify-start">
                                                {context.userInfo?.name}
                                            </h4>
                                            <span className="text-[13px] text-[rgba(0,0,0,0.7)] font-[400] text-left justify-start">
                                                {context.userInfo?.email}
                                            </span>
                                        </div>
                                    </Button>

                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        slotProps={{
                                            paper: {
                                                elevation: 0,
                                                sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1.5,
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    '&::before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <Link to="/my-account" className="w-full block">
                                            <MenuItem onClick={handleClose} className="flex gap-2 !py-2">
                                                <FaRegUser className="text-[18px]" />
                                                <span className="text-[14px]">Tài khoản</span>
                                            </MenuItem>
                                        </Link>
                                        <Link to="/order-history" className="w-full block">
                                            <MenuItem onClick={handleClose} className="flex gap-2 !py-2">
                                                <IoBagCheckOutline className="text-[18px]" />
                                                <span className="text-[14px]">Lịch sử đơn hàng</span>
                                            </MenuItem>
                                        </Link>
                                        <Link to="/wishlist" className="w-full block">
                                            <MenuItem onClick={handleClose} className="flex gap-2 !py-2">
                                                <IoMdHeartEmpty className="text-[18px]" />
                                                <span className="text-[14px]">Danh sách yêu thích</span>
                                            </MenuItem>
                                        </Link>
                                        <Link to="/logout" className="w-full block">
                                            <MenuItem onClick={handleClose} className="flex gap-2 !py-2">
                                                {isLoading === true ? (
                                                    <CircularProgress color="inherit" />
                                                ) : (
                                                    <>
                                                        <IoIosLogOut className="text-[18px] text-[#ff5252]" />
                                                        <span
                                                            className="text-[14px] text-[#ff5252]"
                                                            onClick={handleLogout}
                                                        >
                                                            Đăng xuất
                                                        </span>
                                                    </>
                                                )}
                                            </MenuItem>
                                        </Link>
                                    </Menu>
                                </>
                            )}
                            <li className="mx-2">
                                <Tooltip title="So sánh" placement="top">
                                    <Badge className="icon-header" badgeContent={4} color="primary">
                                        <IoGitCompareOutline className="text-2xl" />
                                    </Badge>
                                </Tooltip>
                            </li>
                            <li className="mx-2">
                                <Tooltip title="Yêu thích" placement="top">
                                    <Badge className="icon-header" badgeContent={4} color="primary">
                                        <FaRegHeart className="text-2xl" />
                                    </Badge>
                                </Tooltip>
                            </li>
                            <li className="mx-2">
                                <Tooltip title="Giỏ hàng" placement="top">
                                    <Badge
                                        onClick={() => context.setOpenCartPanel(true)}
                                        className="icon-header"
                                        badgeContent={4}
                                        color="primary"
                                    >
                                        <MdOutlineShoppingCart className="text-2xl" />
                                    </Badge>
                                </Tooltip>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Navigation />
        </header>
    );
};

export default Header;
