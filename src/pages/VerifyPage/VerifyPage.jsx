import React, { useContext, useState } from 'react';

import '../VerifyPage/VerifyPage.css';
import OtpBox from '../../components/OtpBox/OtpBox';
import { Button, CircularProgress } from '@mui/material';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const VerifyPage = () => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(MyContext);
    const navigate = useNavigate();

    const handleOtpChange = (value) => {
        setOtp(value);
    };
    const verifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = sessionStorage.getItem('verifyToken');
            const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/verify-email', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    otp,
                }),
            });

            const data = await res.json();
            console.log('data: ', data);

            if (data.success) {
                context.openAlertBox('success', data.message);
                sessionStorage.removeItem('verifyToken');
                navigate('/login');
            }
        } catch (err) {
            console.log(err);
            context.openAlertBox('error', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10">
                    <div className="text-center flex items-center justify-center">
                        <img src="src/assets/verify.png" alt="" width="80" />
                    </div>
                    <h3 className="text-center text-[18px] text-black mt-4 mb-1">Xác minh OTP</h3>

                    <p className="text-center mt-0 mb-4">
                        OTP đã được gửi đến {'  '}
                        <span className="text-primary font-bold">{context?.emailVerify}</span>
                    </p>

                    <form onSubmit={verifyOtp}>
                        <OtpBox length={6} onChange={handleOtpChange} />

                        <div className="flex items-center justify-center mt-5 px-5">
                            <Button type="submit" className="w-full btn-org btn-lg flex gap-3">
                                {isLoading === true ? <CircularProgress color="inherit" /> : 'Gửi OTP'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default VerifyPage;
