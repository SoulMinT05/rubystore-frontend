import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './ForgotPasswordPage.scss';
import { MyContext } from '@/App';
import axiosAuth from '@/apis/axiosAuth';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const context = useContext(MyContext);
    const navigate = useNavigate();

    const forgotPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!email) {
                context.openAlertBox('error', 'Vui lòng điền email!');
                return;
            }

            const { data } = await axiosAuth.post('/api/user/forgot-password', { email });

            console.log('dataForgotPassword: ', data);

            if (data.success) {
                context.openAlertBox('success', 'Đã gửi mã xác nhận đến email của bạn!');
                sessionStorage.setItem('emailVerifyForgotPassword', email);
                navigate('/verify-password');
            } else {
                context.openAlertBox('error', data.message);
            }
        } catch (err) {
            console.log(err);
            context.openAlertBox('error', err?.response?.data?.message || 'Đã xảy ra lỗi!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="section py-6 sm:py-10">
            <div className="container">
                <div className="card shadow-md w-full sm:w-[500px] m-auto rounded-md bg-white p-5 px-10">
                    <h3 className="text-center text-[17px] sm:text-[18px] text-black">Quên mật khẩu</h3>
                    <form className="w-full mt-5">
                        <div className="form-group w-full mb-5">
                            <TextField
                                name="email"
                                value={email}
                                disabled={isLoading === true ? true : false}
                                type="email"
                                id="email"
                                label="Email"
                                variant="outlined"
                                className="w-full"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <p className="italic text-center">Nhập email để cấp lại mật khẩu.</p>
                        <div className="flex items-center w-full mt-3 mb-3">
                            <Button onClick={forgotPassword} className="btn-org btn-login w-full">
                                {isLoading === true ? (
                                    <CircularProgress color="inherit" />
                                ) : (
                                    <span className="text-[13px] sm:text-[14px]">Thực hiện</span>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ForgotPasswordPage;
