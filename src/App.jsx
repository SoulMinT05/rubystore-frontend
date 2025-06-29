import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { BrowserRouter } from 'react-router-dom';
import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import ProductZoom from './components/ProductZoom/ProductZoom';
import ProductDetailsComponent from './components/ProductDetailsComponent/ProductDetailsComponent';

import { IoCloseSharp } from 'react-icons/io5';
import axiosClient from './apis/axiosClient';
import { StoreProvider } from './contexts/StoreProvider';
import AppRoutes from './routes';
import axiosAuth from './apis/axiosAuth';
import { Provider } from 'react-redux';
import store from './redux/store';

const MyContext = createContext();

function App() {
    const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
        open: false,
        item: {},
    });

    const [openCartPanel, setOpenCartPanel] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [emailVerify, setEmailVerify] = useState('');
    const [emailVerifyForgotPassword, setEmailVerifyForgotPassword] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [reviews, setReviews] = useState([]);

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
        if (!isLogin) return; // Không gọi API nếu chưa login

        const getUserDetails = async () => {
            try {
                const { data } = await axiosClient.get('/api/user/user-details');
                setUserInfo(data?.user);
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
    const getBlogs = async () => {
        try {
            const { data } = await axiosClient.get('/api/blog/all-blogs');
            setBlogs(data?.blogs);
        } catch (error) {
            console.log(error);
        }
    };
    const values = {
        handleOpenProductDetailsModal,
        setOpenProductDetailsModal,
        setOpenCartPanel,
        toggleCartPanel,
        openCartPanel,
        openAlertBox,
        isLogin,
        setIsLogin,
        emailVerify,
        setEmailVerify,
        emailVerifyForgotPassword,
        setEmailVerifyForgotPassword,
        userInfo,
        setUserInfo,
        categories,
        setCategories,
        getCategories,
        blogs,
        setBlogs,
        getBlogs,
        reviews,
        setReviews,
    };
    return (
        <>
            <StoreProvider>
                <BrowserRouter>
                    <Provider store={store}>
                        <MyContext.Provider value={values}>
                            <Header />
                            <AppRoutes />
                            <Footer />
                        </MyContext.Provider>
                    </Provider>
                </BrowserRouter>
                <ToastContainer />

                <Dialog
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
                                className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[15px] !bg-[#f1f1f1]"
                                onClick={handleCloseProductDetailsModal}
                            >
                                <IoCloseSharp className="text-[20px]" />
                            </Button>
                            {openProductDetailsModal?.item?._id && (
                                <>
                                    <div className="col1 w-[40%] px-3">
                                        <ProductZoom images={openProductDetailsModal?.item?.images} />
                                    </div>

                                    <div className="col2 w-[60%] py-8 px-8 pr-16 productContent">
                                        <ProductDetailsComponent product={openProductDetailsModal?.item} />
                                    </div>
                                </>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </StoreProvider>
        </>
    );
}

export default App;
export { MyContext };
