import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import AppRoutes from '../routes';
import Footer from '../components/Footer/Footer';

const LayoutAppContent = () => {
    const location = useLocation();
    return (
        <>
            {!location?.pathname?.includes('message') && <Header />}
            <AppRoutes />
            <Footer />
        </>
    );
};

export default LayoutAppContent;
