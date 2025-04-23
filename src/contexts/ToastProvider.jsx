import React, { createContext } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const openAlertBox = (status, message) => {
        if (status === 'success') {
            toast.success(message);
        }
        if (status === 'error') {
            toast.error(message);
        }
    };

    const value = {
        openAlertBox, // 👈 Export hàm này qua context
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};
