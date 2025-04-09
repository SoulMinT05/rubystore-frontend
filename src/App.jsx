import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import HomePage from './pages/HomePage/HomePage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { createContext, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const MyContext = createContext();

function App() {
    const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);

    const handleClickOpenProductDetailsModal = () => {
        setOpenProductDetailsModal(true);
    };

    const handleCloseProductDetailsModal = () => {
        setOpenProductDetailsModal(false);
    };

    const values = {};
    return (
        <>
            <BrowserRouter>
                <MyContext.Provider value={values}>
                    <Header />
                    <Routes>
                        <Route path={'/'} exact={true} element={<HomePage />} />
                        <Route path={'/product-list'} exact={true} element={<ProductListPage />} />
                        <Route path={'/product/:id'} exact={true} element={<ProductDetailsPage />} />
                    </Routes>
                    <Footer />
                </MyContext.Provider>
            </BrowserRouter>

            <Button variant="outlined" onClick={handleClickOpenProductDetailsModal}>
                Open alert dialog
            </Button>
            <Dialog
                open={openProductDetailsModal}
                onClose={handleCloseProductDetailsModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <div className="flex items-center"></div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default App;
