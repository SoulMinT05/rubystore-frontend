import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';
import { Avatar, Box, Button, Divider, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { Badge } from '@mui/material';
import { Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoGitCompareOutline, IoMenuOutline } from 'react-icons/io5';
import { HiOutlineMenu } from 'react-icons/hi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaRegHeart } from 'react-icons/fa6';
import { FaRegUser } from 'react-icons/fa';
import { IoBagCheckOutline } from 'react-icons/io5';
import { FaRegComments } from 'react-icons/fa';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoIosLogOut } from 'react-icons/io';
import { IoKeyOutline } from 'react-icons/io5';
import { LuSend } from 'react-icons/lu';

import Cookies from 'js-cookie';

import { Popper, Paper, ClickAwayListener, List, ListItem, IconButton } from '@mui/material';

import Navigation from '../Navigation/Navigation';
import { MyContext } from '../../App';
import logo from '../../assets/logo.jpg';

import './Header.css';

import axiosToken from '../../apis/axiosToken';
import axiosClient from '../../apis/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../redux/cartSlice';
import {
    addNotification,
    fetchNotifications,
    getUnreadCountNotifications,
    markNotificationRead,
} from '../../redux/notificationSlice';
import { socket } from '../../config/socket';

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
        //   case 'system':
        //   return (
        //     <Avatar sx={{ bgcolor: 'primary.main' }}>
        //       <IoInformationCircleOutline size={20} color="white" />
        //     </Avatar>
        //   );
        default:
            return <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />;
    }
};

const Header = () => {
    const context = useContext(MyContext);
    const dispatch = useDispatch();

    const { cart } = useSelector((state) => state.cart);
    const { notifications } = useSelector((state) => state.notification);
    const { unreadCountNotifications } = useSelector((state) => state.notification);

    const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const open = Boolean(anchorEl);
    const anchorRef = useRef(null);
    const [openNotifications, setOpenNotifications] = useState(false);

    useEffect(() => {
        socket.emit('joinRoom', context.userInfo?._id);
    }, [context.isLogin, context.userInfo?._id]);

    useEffect(() => {
        socket.emit('joinMessageRoom', context.userInfo?._id);
    }, [context.isLogin, context.userInfo?._id]);

    useEffect(() => {
        socket.on('notificationNewMessage', (data) => {
            console.log('Client nhan notificationNewMessage: ', data);
            dispatch(addNotification(data));
        });
        return () => {
            socket.off('notificationNewMessage');
        };
    }, []);

    useEffect(() => {
        socket.on('notificationOrder', (newUpdateNotification) => {
            console.log('Client nhận được sự kiện update notification từ admin:', newUpdateNotification);
            dispatch(addNotification(newUpdateNotification));
        });
        socket.on('notificationReplyToReview', (data) => {
            console.log('dataReplyToReview: ', data);
            dispatch(addNotification(data));
        });
        return () => {
            socket.off('notificationOrder');
            socket.off('notificationReplyToReview');
        };
    }, []);

    useEffect(() => {
        const getNotification = async () => {
            const { data } = await axiosClient.get('/api/notification/getNotifications?limit=4');
            if (data.success) {
                dispatch(fetchNotifications(data?.notifications));
                dispatch(getUnreadCountNotifications(data?.unreadCountNotifications));
            }
        };
        getNotification();
    }, []);

    useEffect(() => {
        const fetchCart = async () => {
            const { data } = await axiosClient.get('/api/user/cart');
            if (data.success) {
                dispatch(
                    getCart({
                        products: data?.cart?.items || [],
                    })
                );
            }
        };
        fetchCart();
    }, [context?.isLogin, dispatch]);

    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (!context?.isLogin) return;

        const fetchAvatar = async () => {
            try {
                const { data } = await axiosClient.get('/api/user/user-details');
                if (data?.success && data?.user?.avatar) {
                    context.setUserInfo(data?.user);
                }
            } catch (error) {
                console.error('Không thể lấy avatar', error);
            }
        };

        fetchAvatar();
    }, [context?.userInfo?.avatar]);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const { data } = await axiosClient.get('/api/user/check-login', {
                    withCredentials: true,
                });
                if (data?.success) {
                    context.setIsLogin(true);
                }
            } catch (error) {
                console.log('errorCheckLogin: ', error);
                context.setIsLogin(false);
            }
        };
        checkLogin();
    }, [context?.isLogin]);

    useEffect(() => {
        if (!context?.isLogin) return;

        const getUserDetails = async () => {
            try {
                const { data } = await axiosClient.get('/api/user/user-details');
                context.setUserInfo(data?.user);
            } catch (error) {
                console.log(error);
            }
        };
        getUserDetails();
    }, [context?.isLogin]);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const { data } = await axiosToken.post('/api/user/logout', {
                withCredentials: true,
            });

            console.log('dataLogout: ', data);

            if (data.success) {
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
            setAnchorEl(null);
        }
    };

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
                // context.openAlertBox('success', data.message);
                dispatch(markNotificationRead({ notificationId: data?.notificationId }));
                setOpenNotifications(false);
                navigate(`${data.targetUrl}`);
            }
        } catch (error) {
            console.log(error);
            context.openAlertBox('error', error?.response?.data?.message || 'Đã xảy ra lỗi!');
        }
    };

    return (
        <header className="bg-white sticky -top-[47px] z-[100]">
            <div className="top-strip py-2 border-t-[1px] border-gray-250 border-b-[1px] ">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="col1 w-[50%] hidden lg:block ">
                            <p className="text-[13px] !lg:text-[13px] font-[500]">
                                Sale to 50% off new season styles, limited time
                            </p>
                        </div>
                        <div className="col2 flex items-center justify-between w-full lg:w-[50%] lg:justify-end ">
                            <ul className="flex items-center gap-3 w-full justify-between lg:w-[280px]   ">
                                <li className="list-none">
                                    <Link to="/help-center" className="text-[12px] lg:text-[13px] link font-[500]">
                                        Trung tâm trợ giúp
                                    </Link>
                                </li>
                                <li className="list-none">
                                    <Link to="/order-tracking" className="text-[12px] lg:text-[13px] link font-[500]">
                                        Tra cứu đơn hàng
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header py-2 lg:py-4 border-b-[1px] border-gray-250">
                <div className="container flex items-center justify-between">
                    {context?.windowWidth < 992 && (
                        <Button
                            onClick={() => setIsOpenCatPanel(true)}
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-gray-800"
                        >
                            <HiOutlineMenu size={22} />
                        </Button>
                    )}
                    <div className="col1 w-[40%] lg:w-[25%]">
                        <Link to="/">
                            <img src={logo} alt="" className="h-[38px] lg:h-[44px]" />
                        </Link>
                    </div>
                    <div className="col2 fixed top-0 left-0 w-full h-full lg:w-[40%] lg:static p-2 lg:p-0 bg-white z-50 hidden lg:block ">
                        <SearchBox />
                    </div>
                    <div className="col3 sm:w-[17%] lg:w-[35%] flex items-center pl-7">
                        <ul className="flex items-center justify-end gap-0 lg:gap-3 w-full">
                            {context.isLogin === false ? (
                                <li className="list-none">
                                    <Link to="/login" className="link transition text-[13px] lg:text-[15px] font-[500]">
                                        Đăng nhập
                                    </Link>
                                </li>
                            ) : (
                                <>
                                    {context?.windowWidth > 992 && (
                                        <>
                                            <Button
                                                className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer"
                                                onClick={handleClick}
                                            >
                                                <img
                                                    src={context?.userInfo?.avatar}
                                                    alt=""
                                                    className="!w-[52px] !h-[52px] !min-w-[52px] rounded-full object-cover"
                                                />
                                                {context?.windowWidth > 992 && (
                                                    <div className="info flex flex-col gap-1">
                                                        <h4 className="leading-3 text-[14px] text-[rgba(0,0,0,0.7)] mb-0 font-[500] capitalize text-left justify-start">
                                                            {context.userInfo?.name}
                                                        </h4>
                                                        <span className="text-[13px] text-[rgba(0,0,0,0.7)] font-[400] text-left justify-start">
                                                            {context.userInfo?.email}
                                                        </span>
                                                    </div>
                                                )}
                                            </Button>

                                            <Menu
                                                anchorEl={anchorEl}
                                                disableScrollLock={true}
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
                                                <Link to="/message" className="w-full block">
                                                    <MenuItem onClick={handleClose} className="flex gap-2 !py-2">
                                                        <LuSend className="text-[18px]" />
                                                        <span className="text-[14px]">Tin nhắn</span>
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
                                                        <span className="text-[14px]">Sản phẩm yêu thích</span>
                                                    </MenuItem>
                                                </Link>
                                                <Link to="/change-password" className="w-full block">
                                                    <MenuItem onClick={handleClose} className="flex gap-2 !py-2">
                                                        <IoKeyOutline className="text-[18px]" />
                                                        <span className="text-[14px]">Đổi mật khẩu</span>
                                                    </MenuItem>
                                                </Link>
                                                <Link className="w-full block">
                                                    <MenuItem onClick={handleClose} className="flex gap-2 !py-2">
                                                        {isLoading === true ? (
                                                            <CircularProgress color="inherit" />
                                                        ) : (
                                                            <div className="flex gap-2" onClick={handleLogout}>
                                                                <IoIosLogOut className="text-[18px] text-[#ff5252]" />
                                                                <span className="text-[14px] text-[#ff5252]">
                                                                    Đăng xuất
                                                                </span>
                                                            </div>
                                                        )}
                                                    </MenuItem>
                                                </Link>
                                            </Menu>
                                        </>
                                    )}
                                </>
                            )}
                            {context?.userInfo?._id && (
                                <>
                                    {context?.windowWidth > 992 && (
                                        <>
                                            <li
                                                onMouseEnter={() => setOpenNotifications(true)}
                                                onMouseLeave={() => setOpenNotifications(false)}
                                                className="relative mx-2 cursor-pointer z-2000"
                                            >
                                                <Tooltip title="Thông báo" placement="top">
                                                    <Badge
                                                        className="icon-header"
                                                        ref={anchorRef}
                                                        badgeContent={unreadCountNotifications}
                                                        color="primary"
                                                        sx={{
                                                            '& .MuiBadge-badge': {
                                                                right: 2,
                                                                top: 2,
                                                            },
                                                        }}
                                                    >
                                                        <span className="w-[28px] h-[28px] flex items-center justify-center">
                                                            <IoMdNotificationsOutline className="text-3xl" />
                                                        </span>
                                                    </Badge>
                                                </Tooltip>

                                                {/* Pseudo hover bridge */}
                                                <span className="absolute -left-[8px] right-0 w-[48px] h-[24px] -bottom-[24px] z-10" />

                                                <Popper
                                                    open={openNotifications}
                                                    anchorEl={anchorRef.current}
                                                    placement="bottom"
                                                    disablePortal
                                                    modifiers={[
                                                        {
                                                            name: 'offset',
                                                            options: {
                                                                offset: [0, 8],
                                                            },
                                                        },
                                                    ]}
                                                    sx={{ cursor: 'pointer', zIndex: 1500 }}
                                                >
                                                    <Paper
                                                        elevation={3}
                                                        sx={{
                                                            width: 500,
                                                            mt: 1,
                                                            mr: 4,
                                                            position: 'relative',
                                                        }}
                                                        tabIndex={-1} // ✅ Tránh lỗi focus gây aria-hidden
                                                    >
                                                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                                            {notifications?.length > 0 &&
                                                                notifications?.map((notification) => {
                                                                    return (
                                                                        <ListItem
                                                                            onClick={() =>
                                                                                handleMarkAsReadAndNavigate(
                                                                                    notification._id
                                                                                )
                                                                            }
                                                                            key={notification._id}
                                                                            alignItems="flex-start"
                                                                            className={`cursor-pointer hover:bg-gray-100 ${
                                                                                notification?.isRead === false
                                                                                    ? 'bg-red-50 transition-colors'
                                                                                    : ''
                                                                            } `}
                                                                        >
                                                                            <ListItemAvatar>
                                                                                {notification?.type === 'order' ? (
                                                                                    getNotificationAvatar(
                                                                                        notification?.type,
                                                                                        notification?.bgColor
                                                                                    )
                                                                                ) : (
                                                                                    <Avatar
                                                                                        src={notification?.avatarSender}
                                                                                    />
                                                                                )}
                                                                            </ListItemAvatar>
                                                                            <Box className="flex flex-col justify-center w-full">
                                                                                <Typography
                                                                                    variant="body1"
                                                                                    fontWeight={500}
                                                                                >
                                                                                    {notification?.title}
                                                                                </Typography>
                                                                                <Typography
                                                                                    variant="body2"
                                                                                    color="text.secondary"
                                                                                    className="mt-1"
                                                                                >
                                                                                    {notification?.description}
                                                                                </Typography>

                                                                                <Box
                                                                                    sx={{
                                                                                        display: 'flex',
                                                                                        justifyContent: 'space-between',
                                                                                        alignItems: 'center',
                                                                                        marginTop: '12px',
                                                                                    }}
                                                                                >
                                                                                    <Typography
                                                                                        variant="caption"
                                                                                        color="text.disabled"
                                                                                        className="!text-[13px]"
                                                                                    >
                                                                                        {formatDateUTCPlus7(
                                                                                            notification?.createdAt
                                                                                        )}
                                                                                    </Typography>
                                                                                    <Typography
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            markNotificationAsRead(
                                                                                                notification?._id
                                                                                            );
                                                                                        }}
                                                                                        variant="caption"
                                                                                        className={`!text-[13px] italic ${
                                                                                            notification?.isRead
                                                                                                ? 'text-gray-500'
                                                                                                : 'text-blue-500 hover:underline cursor-pointer'
                                                                                        }`}
                                                                                    >
                                                                                        {/* {isNotificationAsRead
                                                                                    ? 'Đang đánh dấu'
                                                                                    : notification?.isRead
                                                                                    ? 'Đã đọc'
                                                                                    : 'Đánh dấu là đã đọc'} */}
                                                                                        {notification?.isRead
                                                                                            ? 'Đã đọc'
                                                                                            : 'Đánh dấu là đã đọc'}
                                                                                    </Typography>
                                                                                </Box>
                                                                            </Box>
                                                                        </ListItem>
                                                                    );
                                                                })}
                                                            <Divider
                                                                sx={{ marginLeft: 0 }}
                                                                variant="inset"
                                                                component="li"
                                                            />

                                                            <ListItem
                                                                className="justify-center hover:underline text-blue-600 cursor-pointer py-2"
                                                                onClick={() => navigate('/notifications')} // Hoặc gọi hàm gì đó nếu có
                                                            >
                                                                <Typography
                                                                    variant="body2"
                                                                    className="font-medium !mx-auto"
                                                                >
                                                                    Xem tất cả
                                                                </Typography>
                                                            </ListItem>
                                                        </List>
                                                    </Paper>
                                                </Popper>
                                            </li>
                                            <li className="mx-2">
                                                <Tooltip title="Yêu thích" placement="top">
                                                    <Badge className="icon-header" badgeContent={4} color="primary">
                                                        <FaRegHeart className="text-2xl" />
                                                    </Badge>
                                                </Tooltip>
                                            </li>
                                        </>
                                    )}

                                    <li className="mx-2">
                                        <Tooltip title="Giỏ hàng" placement="top">
                                            <Badge
                                                onClick={() => context.setOpenCartPanel(true)}
                                                className="icon-header"
                                                badgeContent={cart?.products?.length}
                                                color="primary"
                                            >
                                                <MdOutlineShoppingCart className="text-2xl" />
                                            </Badge>
                                        </Tooltip>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <Navigation isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel} />
        </header>
    );
};

export default Header;

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
