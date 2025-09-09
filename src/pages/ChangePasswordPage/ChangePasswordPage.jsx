import { Button, TextField, CircularProgress } from '@mui/material';
import React, { useContext, useState } from 'react';

import './ChangePasswordPage.scss';
import { MyContext } from '../../App';
import axiosClient from '../../apis/axiosClient';
import AccountSidebarLayout from '../../components/AccountSidebar/AccountSidebarLayout';

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
        <AccountSidebarLayout>
            <div className="card bg-white p-5 shadow-md rounded-md">
                <h2 className="pb-3 text-[15px] lg:text-[16px]">Cập nhật mật khẩu</h2>
                <hr />

                <form className="mt-0" onSubmit={changePassword}>
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

                    <p className="italic text-left text-[12px] sm:text-[13px] md:text-[14px] lg:text-[14px]">
                        Mật khẩu và xác nhận mật khẩu phải giống nhau
                    </p>

                    <div className="flex items-center justify-end gap-4">
                        <Button type="submit" className="btn-org btn-login w-full flex gap-3">
                            {isLoading === true ? (
                                <CircularProgress color="inherit" />
                            ) : (
                                <span className="text-[14px] lg:text-[15px] ">Đổi mật khẩu</span>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AccountSidebarLayout>
        // <section className="py-3 lg:py-10 w-full">
        //     <div className="container flex flex-col lg:flex-row gap-5">
        //         <div className="w-full lg:w-[20%]">
        //             <AccountSidebar />
        //         </div>
        //         <div className="w-full lg:w-[80%]">
        //             <div className="card bg-white p-5 shadow-md rounded-md">
        //                 <h2 className="pb-3 text-[15px] lg:text-[16px]">Cập nhật mật khẩu</h2>
        //                 <hr />

        //                 <form className="mt-0" onSubmit={changePassword}>
        //                     <div className="flex items-center gap-5">
        //                         {context?.userInfo?.signInWithGoogle === false && (
        //                             <div className="w-[100%]">
        //                                 <TextField
        //                                     onChange={(e) => setOldPassword(e.target.value)}
        //                                     label="Mật khẩu cũ"
        //                                     variant="outlined"
        //                                     size="small"
        //                                     className="w-full"
        //                                 />
        //                             </div>
        //                         )}
        //                     </div>
        //                     <div className="flex items-center gap-5 mt-4">
        //                         <div className="w-[100%]">
        //                             <TextField
        //                                 onChange={(e) => setPassword(e.target.value)}
        //                                 label="Mật khẩu mới"
        //                                 variant="outlined"
        //                                 size="small"
        //                                 className="w-full"
        //                             />
        //                         </div>
        //                     </div>
        //                     <div className="flex items-center gap-5 mt-4">
        //                         <div className="w-[100%]">
        //                             <TextField
        //                                 onChange={(e) => setConfirmPassword(e.target.value)}
        //                                 label="Xác nhận mật khẩu"
        //                                 variant="outlined"
        //                                 size="small"
        //                                 className="w-full"
        //                             />
        //                         </div>
        //                     </div>

        //                     <p className="italic text-left text-[12px] sm:text-[13px] md:text-[14px] lg:text-[14px]">
        //                         Mật khẩu và xác nhận mật khẩu phải giống nhau
        //                     </p>

        //                     <div className="flex items-center justify-end gap-4">
        //                         <Button type="submit" className="btn-org btn-login w-full flex gap-3">
        //                             {isLoading === true ? (
        //                                 <CircularProgress color="inherit" />
        //                             ) : (
        //                                 <span className="text-[14px] lg:text-[15px] ">Đổi mật khẩu</span>
        //                             )}
        //                         </Button>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </section>
    );
};

export default ChangePasswordPage;
