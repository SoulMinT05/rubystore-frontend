import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress } from '@mui/material';

import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import '../LoginPage/LoginPage.css';
import { MyContext } from '../../App';
import axiosAuth from '../../apis/axiosAuth';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { firebaseApp } from '../../services/firebase';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const LoginPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        email: '',
        password: '',
    });
    const context = useContext(MyContext);
    const navigate = useNavigate();
    const forgotPassword = () => {
        navigate('/forgot-password');
    };

    const validateValue = Object.values(formFields).every((el) => el);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!validateValue) {
                context.openAlertBox('error', 'Vui lòng điền đầy đủ thông tin!');
                return;
            }

            const { data } = await axiosAuth.post('/api/user/login', formFields);
            if (data.success) {
                context.openAlertBox('success', data.message);

                Cookies.set('accessToken', data?.data?.accessToken);

                context.setIsLogin(true);

                navigate('/');
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

    const handleAuthWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);

            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            const user = result.user;

            const fields = {
                name: user?.providerData[0]?.displayName,
                email: user?.providerData[0]?.email,
                password: null,
                avatar: user?.providerData[0]?.photoURL,
                phoneNumber: user?.providerData[0]?.phoneNumber,
                role: 'user',
            };

            const { data } = await axiosAuth.post('/api/user/auth-google', fields);
            if (data.success) {
                context.openAlertBox('success', data.message);

                Cookies.set('accessToken', data?.data?.accessToken);

                context.setIsLogin(true);

                navigate('/');
            } else {
                context.openAlertBox('error', data.message);
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error.message);
        }
    };
    const handleAuthWithFacebook = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);

            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            const user = result.user;
            console.log('user: ', user);

            // const fields = {
            //     name: user?.providerData[0]?.displayName,
            //     email: user?.providerData[0]?.email,
            //     password: null,
            //     avatar: user?.providerData[0]?.photoURL,
            //     phoneNumber: user?.providerData[0]?.phoneNumber,
            //     role: 'user',
            // };

            // const { data } = await axiosAuth.post('/api/user/auth-google', fields);
            // if (data.success) {
            //     context.openAlertBox('success', data.message);

            //     Cookies.set('accessToken', data?.data?.accessToken);

            //     context.setIsLogin(true);

            //     navigate('/');
            // } else {
            //     context.openAlertBox('error', data.message);
            // }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error.message);
        }
    };
    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10">
                    <h3 className="text-center text-[18px] text-black">Đăng nhập</h3>
                    <form className="w-full mt-5" onSubmit={handleLogin}>
                        <div className="form-group w-full mb-5">
                            <TextField
                                name="email"
                                value={formFields.email}
                                disabled={isLoading === true ? true : false}
                                type="email"
                                id="email"
                                label="Email"
                                variant="outlined"
                                className="w-full"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group w-full mb-5 relative">
                            <TextField
                                name="password"
                                value={formFields.password}
                                disabled={isLoading === true ? true : false}
                                type={isShowPassword === false ? 'password' : 'text'}
                                id="password"
                                label="Password"
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
                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="link cursor-pointer text-[14px] font-[600] text-right"
                                onClick={forgotPassword}
                            >
                                Quên mật khẩu
                            </Link>
                        </div>
                        <div className="flex items-center w-full mt-3 mb-3">
                            <Button type="submit" className="btn-org btn-login w-full flex gap-3">
                                {isLoading === true ? <CircularProgress color="inherit" /> : 'Đăng nhập'}
                            </Button>
                        </div>
                        <p className="text-center">
                            Chưa có tài khoản?{'   '}
                            <Link to="/register" className="link text-[14px] font-[600] ">
                                Đăng ký
                            </Link>
                        </p>
                        <p className="text-center font-[500]">Hoặc đăng nhập bằng</p>
                        <Button
                            onClick={handleAuthWithGoogle}
                            className="btn-login flex gap-3 !bg-[#f1f1f1] w-full !text-black"
                        >
                            <FcGoogle className="text-[20px]" />
                            Đăng nhập bằng Google
                        </Button>
                        <Button
                            onClick={handleAuthWithFacebook}
                            className="btn-login !mt-4 flex gap-3 !bg-[#f1f1f1] w-full !text-black"
                        >
                            <BsFacebook className="text-[20px]" />
                            Đăng nhập bằng Facebook
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
