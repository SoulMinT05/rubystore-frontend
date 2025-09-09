import { BrowserRouter } from 'react-router-dom';
import { createContext, forwardRef, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { IoCloseSharp } from 'react-icons/io5';
import { AppBar, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import { IoMdClose } from 'react-icons/io';

import { Provider } from 'react-redux';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi'; // nếu muốn tiếng Việt

dayjs.extend(relativeTime);
dayjs.locale('vi'); // dùng nếu bạn muốn "2 phút trước" thay vì "2 minutes ago"

// SOCKET IO
import { socket } from './config/socket';

import './App.css';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';

import ProductZoom from './components/ProductZoom/ProductZoom';
import ProductDetailsComponent from './components/ProductDetailsComponent/ProductDetailsComponent';

import axiosClient from './apis/axiosClient';
import axiosAuth from './apis/axiosAuth';

import store from './redux/store';
import UpdateAddressComponent from './components/UpdateAddressComponent/UpdateAddressComponent';
import AppRoutes from './routes';

const MyContext = createContext();

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
    const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
        open: false,
        item: {},
    });
    const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
        open: false,
        model: '',
        id: '',
    });
    const [openCartPanel, setOpenCartPanel] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openFilterProducts, setOpenFilterProducts] = useState(false);
    const [isFilterProductsBtnShow, setIsFilterProductsBtnShow] = useState(false);
    const [openSearchPanel, setOpenSearchPanel] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const [isAuthChecking, setIsAuthChecking] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [emailVerify, setEmailVerify] = useState('');
    const [emailVerifyForgotPassword, setEmailVerifyForgotPassword] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [categories, setCategories] = useState([]);

    const handleOpenProductDetailsModal = (open, item) => {
        setOpenProductDetailsModal({
            open,
            item,
        });
    };
    const handleCloseProductDetailsModal = () => {
        setOpenProductDetailsModal({
            open: false,
            item: {},
        });
    };
    const toggleCartPanel = (newOpen) => {
        setOpenCartPanel(newOpen);
    };

    useEffect(() => {
        socket.emit('joinMessageRoom', userInfo?._id, userInfo?.role);
    }, [isLogin, userInfo?._id, userInfo?.role]);

    useEffect(() => {
        socket.emit('joinRoom', userInfo?._id, userInfo?.role);
    }, [isLogin, userInfo?._id, userInfo?.role]);

    useEffect(() => {
        socket.on('sendMessage', (message) => {
            console.log('message: ', message);
        });
        return () => {
            socket.off('sendMessage');
        };
    }, []);

    useEffect(() => {
        socket.on('notificationNewMessage', (data) => {
            console.log('ADmin nhan notificationNewMessage: ', data);
            // dispatch(addNotification(data));
        });
        return () => {
            socket.off('notificationNewMessage');
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // resize: Người dùng kéo thay đổi kích thước cửa sổ trình duyệt
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axiosClient.get('/api/user/check-login', {
                    withCredentials: true,
                });
                if (data.success) {
                    setIsLogin(true);
                }
            } catch (error) {
                setIsLogin(false);
                console.log(error);
            } finally {
                setIsAuthChecking(false);
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (!isLogin) return; // Không gọi API nếu chưa login

        const getUserDetails = async () => {
            try {
                const { data } = await axiosClient.get('/api/user/user-details');
                setUserInfo(data?.user);
                localStorage.setItem('userId', data?.user?._id);
                localStorage.setItem('role', data?.user?.role);
            } catch (error) {
                console.log(error);
            }
        };

        getUserDetails();
    }, [isLogin]);

    const openAlertBox = (status, message) => {
        if (status === 'success') {
            toast.success(message);
        }
        if (status === 'error') {
            toast.error(message);
        }
        if (status === 'warning') {
            toast.warning(message);
        }
    };
    const getCategories = async () => {
        try {
            const { data } = await axiosAuth.get('/api/category/all-categories');
            setCategories(data?.categories);
        } catch (error) {
            console.log(error);
        }
    };

    const values = {
        handleOpenProductDetailsModal,
        setOpenProductDetailsModal,
        isOpenFullScreenPanel,
        setIsOpenFullScreenPanel,
        setOpenCartPanel,
        toggleCartPanel,
        openCartPanel,
        openAlertBox,
        isLogin,
        setIsLogin,
        isAuthChecking,
        setIsAuthChecking,
        emailVerify,
        setEmailVerify,
        emailVerifyForgotPassword,
        setEmailVerifyForgotPassword,
        userInfo,
        setUserInfo,
        categories,
        setCategories,
        getCategories,
        windowWidth,
        openFilterProducts,
        setOpenFilterProducts,
        isFilterProductsBtnShow,
        setIsFilterProductsBtnShow,
        openSearchPanel,
        setOpenSearchPanel,
        isChatOpen,
        setIsChatOpen,
    };
    return (
        <>
            <Provider store={store}>
                <MyContext.Provider value={values}>
                    <BrowserRouter>
                        <AppRoutes />
                        <ToastContainer />

                        <ScrollToTopButton />

                        <Dialog
                            disableScrollLock
                            fullWidth={true}
                            maxWidth="lg"
                            open={openProductDetailsModal.open}
                            onClose={handleCloseProductDetailsModal}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            className="productDetailsModal"
                        >
                            <DialogContent>
                                <div className="flex items-center w-full productDetailsModalContainer relative">
                                    <Button
                                        className="closeProductDetailsIcon !w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[15px] !bg-[#f1f1f1]"
                                        onClick={handleCloseProductDetailsModal}
                                    >
                                        <IoCloseSharp className=" text-[20px]" />
                                    </Button>
                                    {openProductDetailsModal?.item?._id && (
                                        <div className="container flex flex-col lg:flex-row gap-4 lg:gap-8">
                                            <div className="col1 w-full lg:w-[40%] pt-4 lg:pt-0 px-3">
                                                <ProductZoom images={openProductDetailsModal?.item?.images} />
                                            </div>

                                            <div className="col2 productContent pt-0 pb-4 lg:py-8 w-full lg:w-[60%] px-4 lg:px-10">
                                                <ProductDetailsComponent product={openProductDetailsModal?.item} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Dialog
                            disableScrollLock
                            fullScreen
                            open={isOpenFullScreenPanel.open}
                            onClose={() =>
                                setIsOpenFullScreenPanel({
                                    open: false,
                                })
                            }
                            TransitionComponent={Transition}
                        >
                            <AppBar sx={{ position: 'relative' }}>
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={() =>
                                            setIsOpenFullScreenPanel({
                                                open: false,
                                            })
                                        }
                                        aria-label="close"
                                    >
                                        <IoMdClose className="text-gray-800" />
                                    </IconButton>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                        <span className="text-gray-800">{isOpenFullScreenPanel?.model}</span>
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            {isOpenFullScreenPanel?.model === 'Cập nhật địa chỉ' && <UpdateAddressComponent />}
                        </Dialog>
                    </BrowserRouter>
                </MyContext.Provider>
            </Provider>
        </>
    );
}

export default App;
export { MyContext };
