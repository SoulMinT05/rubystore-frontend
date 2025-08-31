import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress } from '@mui/material';

import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

import '../RegisterPage/RegisterPage.css';

import { MyContext } from '../../App';

const RegisterPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(MyContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateValue = Object.values(formFields).every((el) => el);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!validateValue) {
                context.openAlertBox('error', 'Vui lòng điền đầy đủ thông tin!');
                return;
            }

            const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formFields),
            });

            const data = await res.json();
            setFormFields({
                name: '',
                email: '',
                password: '',
            });
            if (data.success) {
                context.openAlertBox('success', data.message);
                sessionStorage.setItem('emailVerify', formFields?.email);
                sessionStorage.setItem('verifyToken', data.token);
                navigate('/verify');
            } else {
                context.openAlertBox('error', data.message);
            }
        } catch (err) {
            console.log(err);
            context.openAlertBox('err', err?.response?.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="section py-6 sm:py-10">
            <div className="container">
                <div className="card shadow-md w-full sm:w-[500px] m-auto rounded-md bg-white p-5 px-10">
                    <h3 className="text-center text-[17px] sm:text-[18px] text-black">Đăng ký</h3>
                    <form className="w-full mt-5" onSubmit={handleSubmit}>
                        <div className="form-group w-full mb-5">
                            <TextField
                                name="name"
                                value={formFields.name}
                                disabled={isLoading === true ? true : false}
                                type="text"
                                id="name"
                                label="Họ và tên"
                                variant="outlined"
                                className="w-full"
                                onChange={handleChange}
                            />
                        </div>
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
                        <div className="flex items-center w-full mt-3 mb-3">
                            <Button type="submit" className="btn-org btn-login w-full flex gap-3">
                                {isLoading === true ? (
                                    <CircularProgress
                                        className="circ-white"
                                        size={20}
                                        thickness={5}
                                        sx={{ color: 'white' }}
                                    />
                                ) : (
                                    <span className="text-[13px] sm:text-[14px]">Đăng ký</span>
                                )}
                            </Button>
                        </div>
                        <p className="text-center">
                            Đã có tài khoản?{'   '}
                            <Link to="/login" className="link text-[13px] sm:text-[14px] font-[600] ">
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
