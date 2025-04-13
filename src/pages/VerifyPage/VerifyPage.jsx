import React, { useState } from 'react';

import '../VerifyPage/VerifyPage.css';
import OtpBox from '../../components/OtpBox/OtpBox';
import { Button } from '@mui/material';
const VerifyPage = () => {
    const [otp, setOtp] = useState('');
    const handleOtpChange = (value) => {
        setOtp(value);
    };
    const verifyOtp = (e) => {
        e.preventDefault();
        alert(otp);
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
                        OTP đã được gửi đến
                        <span className="text-primary font-bold"> tamnguyenforwork@gmail.com</span>
                    </p>

                    <form onSubmit={verifyOtp}>
                        <OtpBox length={6} onChange={handleOtpChange} />

                        <div className="flex items-center justify-center mt-5 px-5">
                            <Button type="submit" className="w-full btn-org btn-lg">
                                Gửi OTP
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default VerifyPage;
