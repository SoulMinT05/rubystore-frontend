import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

import '../ForgotPasswordPage/ForgotPasswordPage.css';
import { MyContext } from '../../App';

const ForgotPasswordPage = () => {
    const [formFields, setFormFields] = useState({
        email: '',
        password: '',
    });
    const context = useContext(MyContext);
    const navigate = useNavigate();

    const forgotPassword = () => {
        context.openAlertBox('success', 'Đã gửi mã xác nhận đến email của bạn!');
        navigate('/verify');
    };

    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10">
                    <h3 className="text-center text-[18px] text-black">Quên mật khẩu</h3>
                    <form className="w-full mt-5">
                        <div className="form-group w-full mb-5">
                            <TextField
                                name="name"
                                type="email"
                                id="email"
                                label="Email"
                                variant="outlined"
                                className="w-full"
                            />
                        </div>
                        <p class="italic text-center">Nhập email để cấp lại mật khẩu.</p>
                        <div className="flex items-center w-full mt-3 mb-3">
                            <Button onClick={forgotPassword} className="btn-org btn-login w-full">
                                Thực hiện
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ForgotPasswordPage;
