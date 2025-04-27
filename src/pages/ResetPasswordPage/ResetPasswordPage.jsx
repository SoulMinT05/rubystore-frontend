import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress } from '@mui/material';

import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

import '../ResetPasswordPage/ResetPasswordPage.css';
import { MyContext } from '../../App';
import axiosAuth from '../../apis/axiosAuth';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const context = useContext(MyContext);
    const [formFields, setFormFields] = useState({
        email: sessionStorage.getItem('emailVerifyForgotPassword'),
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const validateValue = Object.values(formFields).every((el) => el?.trim() !== '');
            if (!validateValue) {
                context.openAlertBox('error', 'Vui lòng điền đầy đủ thông tin!');
                return;
            }

            if (formFields.password !== formFields.confirmPassword) {
                context.openAlertBox('error', 'Mật khẩu xác nhận không khớp!');
                return;
            }

            const { data } = await axiosAuth.post('/api/user/reset-password', formFields);

            console.log('dataResetPassword: ', data);

            if (data.success) {
                context.openAlertBox('success', data.message);
                sessionStorage.removeItem('emailVerifyForgotPassword');
                navigate('/login');
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
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10">
                    <h3 className="text-center text-[18px] text-black">Đặt lại mật khẩu</h3>
                    <form className="w-full mt-5" onSubmit={resetPassword}>
                        <div className="form-group w-full mb-5 relative">
                            <TextField
                                name="password"
                                value={formFields.password}
                                disabled={isLoading === true ? true : false}
                                type={isShowPassword === false ? 'password' : 'text'}
                                id="password"
                                label="Mật khẩu mới"
                                variant="outlined"
                                className="w-full"
                                onChange={handleChange}
                            />
                            <Button
                                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            >
                                {isShowPassword === false ? (
                                    <IoMdEye className="text-[20px] opacity-75" />
                                ) : (
                                    <IoMdEyeOff className="text-[20px] opacity-75" />
                                )}
                            </Button>
                        </div>
                        <div className="form-group w-full mb-5 relative">
                            <TextField
                                name="confirmPassword"
                                value={formFields.confirmPassword}
                                disabled={isLoading === true ? true : false}
                                type={isShowConfirmPassword === false ? 'password' : 'text'}
                                label="Xác nhận mật khẩu"
                                variant="outlined"
                                className="w-full"
                                onChange={handleChange}
                            />
                            <Button
                                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            >
                                {isShowConfirmPassword === false ? (
                                    <IoMdEye className="text-[20px] opacity-75" />
                                ) : (
                                    <IoMdEyeOff className="text-[20px] opacity-75" />
                                )}
                            </Button>
                        </div>
                        <p className="italic text-center">Mật khẩu và xác nhận mật khẩu phải giống nhau.</p>
                        <div className="flex items-center w-full mt-3 mb-3">
                            <Button type="submit" className="btn-org btn-login w-full flex gap-3">
                                {isLoading === true ? <CircularProgress color="inherit" /> : 'Đặt lại mật khẩu'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ResetPasswordPage;
