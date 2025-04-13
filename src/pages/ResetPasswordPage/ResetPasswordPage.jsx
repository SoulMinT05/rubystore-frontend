import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

import '../ResetPasswordPage/ResetPasswordPage.css';
import { MyContext } from '../../App';

const ResetPasswordPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const context = useContext(MyContext);
    const navigate = useNavigate();

    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10">
                    <h3 className="text-center text-[18px] text-black">Đặt lại mật khẩu</h3>
                    <form className="w-full mt-5">
                        <div className="form-group w-full mb-5 relative">
                            <TextField
                                name="password"
                                type={isShowPassword === false ? 'password' : 'text'}
                                id="password"
                                label="Mật khẩu"
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
                        <div className="form-group w-full mb-5 relative">
                            <TextField
                                name="confirmPassword"
                                type={isShowConfirmPassword === false ? 'password' : 'text'}
                                id="confirmPassword"
                                label="Xác nhận mật khẩu"
                                variant="outlined"
                                className="w-full"
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
                        <p class="italic text-center">Mật khẩu và xác nhận mật khẩu phải giống nhau.</p>
                        <div className="flex items-center w-full mt-3 mb-3">
                            <Button className="btn-org btn-login w-full">Thực hiện</Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ResetPasswordPage;
