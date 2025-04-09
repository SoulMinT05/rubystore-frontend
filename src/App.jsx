import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import HomePage from './pages/HomePage/HomePage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { createContext, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ProductZoom from './components/ProductZoom/ProductZoom';
import ProductDetailsComponent from './components/ProductDetailsComponent/ProductDetailsComponent';

import { IoCloseSharp } from 'react-icons/io5';
const MyContext = createContext();

function App() {
    const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
    // const [fullWidth, setFullWidth] = useState(true);
    // const [maxWidth, setMaxWidth] = useState('lg');

    const handleCloseProductDetailsModal = () => {
        setOpenProductDetailsModal(false);
    };

    const values = {
        setOpenProductDetailsModal,
    };
    return (
        <>
            <BrowserRouter>
                <MyContext.Provider value={values}>
                    <Header />
                    <Routes>
                        <Route path={'/'} exact={true} element={<HomePage />} />
                        <Route path={'/login'} exact={true} element={<LoginPage />} />
                        <Route path={'/register'} exact={true} element={<RegisterPage />} />
                        <Route path={'/product-list'} exact={true} element={<ProductListPage />} />
                        <Route path={'/product/:id'} exact={true} element={<ProductDetailsPage />} />
                    </Routes>
                    <Footer />
                </MyContext.Provider>
            </BrowserRouter>
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
        </>
    );
}

export default App;
export { MyContext };
