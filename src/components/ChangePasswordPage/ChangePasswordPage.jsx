import { Button, TextField, CircularProgress } from '@mui/material';
import React, { useContext, useState } from 'react';

import './ChangePasswordPage.scss';
import AccountSidebar from '../../components/AccountSidebar/AccountSidebar';
import { MyContext } from '../../App';
import axiosClient from '../../apis/axiosClient';

const ChangePasswordPage = () => {
    const context = useContext(MyContext);

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const changePassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await axiosClient.post('/api/user/change-password', {
                email: context?.userInfo?.email,
                oldPassword,
                password,
                confirmPassword,
            });
            if (data.success) {
                context.openAlertBox('success', data.message);
                context.setUserInfo(data);
            } else {
                context.openAlertBox('error', data.message);
            }
        } catch (error) {
            console.log(error);
            context.openAlertBox('error', error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <section className="py-10 w-full">
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSidebar context={context} />
                </div>
                <div className="col2 w-[80%]">
                    <div className="card bg-white p-5 shadow-md rounded-md">
                        <h2 className="pb-3">Cập nhật mật khẩu</h2>
                        <hr />

                        <form className="mt-5" onSubmit={changePassword}>
                            <div className="flex items-center gap-5">
                                {context?.userInfo?.signInWithGoogle === false && (
                                    <div className="w-[100%]">
                                        <TextField
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            label="Mật khẩu cũ"
                                            variant="outlined"
                                            size="small"
                                            className="w-full"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-5 mt-4">
                                <div className="w-[100%]">
                                    <TextField
                                        onChange={(e) => setPassword(e.target.value)}
                                        label="Mật khẩu mới"
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-5 mt-4">
                                <div className="w-[100%]">
                                    <TextField
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        label="Xác nhận mật khẩu"
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <p className="italic text-left text-[13px]">
                                Mật khẩu và xác nhận mật khẩu phải giống nhau
                            </p>

                            <br />
                            <div className="flex items-center justify-end gap-4">
                                <Button type="submit" className="btn-org btn-login w-full flex gap-3">
                                    {isLoading === true ? <CircularProgress color="inherit" /> : 'Đổi mật khẩu'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangePasswordPage;
