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

const MyContext = createContext();

function App() {
    const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);

    const [openCartPanel, setOpenCartPanel] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [emailVerify, setEmailVerify] = useState('');
    const [emailVerifyForgotPassword, setEmailVerifyForgotPassword] = useState('');
    const [userInfo, setUserInfo] = useState(null);

    const handleCloseProductDetailsModal = () => {
        setOpenProductDetailsModal(false);
    };

    const toggleCartPanel = (newOpen) => {
        setOpenCartPanel(newOpen);
    };

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const { data } = await axiosClient.get('/api/user/user-details');
                setUserInfo(data?.user);
            } catch (error) {
                console.log(error);
            }
        };
        getUserDetails();
    }, []);

    const openAlertBox = (status, message) => {
        if (status === 'success') {
            toast.success(message);
        }
        if (status === 'error') {
            toast.error(message);
        }
    };

    const values = {
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
    };
    return (
        <>
            <StoreProvider>
                <BrowserRouter>
                    <MyContext.Provider value={values}>
                        <Header />
                        <AppRoutes />
                        <Footer />
                    </MyContext.Provider>
                </BrowserRouter>

                <ToastContainer />

                <Dialog
                    fullWidth={true}
                    maxWidth="lg"
                    open={openProductDetailsModal}
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
                            <div className="col1 w-[40%] px-3">
                                <ProductZoom />
                            </div>

                            <div className="col2 w-[60%] py-8 px-8 pr-16 productContent">
                                <ProductDetailsComponent />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </StoreProvider>
        </>
    );
}

export default App;
export { MyContext };
