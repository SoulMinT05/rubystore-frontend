import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

import '../RegisterPage/RegisterPage.css';

const RegisterPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10">
                    <h3 className="text-center text-[18px] text-black">Đăng ký</h3>
                    <form className="w-full mt-5">
                        <div className="form-group w-full mb-5">
                            <TextField type="text" id="name" label="Họ và tên" variant="outlined" className="w-full" />
                        </div>
                        <div className="form-group w-full mb-5">
                            <TextField type="email" id="email" label="Email" variant="outlined" className="w-full" />
                        </div>
                        <div className="form-group w-full mb-5 relative">
                            <TextField
                                type={isShowPassword === false ? 'password' : 'text'}
                                id="password"
                                label="Password"
                                variant="outlined"
                                className="w-full"
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
                        <div className="flex items-center w-full mt-3 mb-3">
                            <Button className="btn-org btn-login w-full">Đăng ký</Button>
                        </div>
                        <p className="text-center">
                            Đã có tài khoản?{'   '}
                            <Link to="/login" className="link text-[14px] font-[600] ">
                                Đăng nhập
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
