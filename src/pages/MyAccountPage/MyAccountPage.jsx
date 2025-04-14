import { Button, TextField } from '@mui/material';
import React from 'react';

import './MyAccountPage.css';
import AccountSidebar from '../../components/AccountSidebar/AccountSidebar';

const MyAccountPage = () => {
    return (
        <section className="py-10 w-full">
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSidebar />
                </div>
                <div className="col2 w-[80%]">
                    <div className="card bg-white p-5 shadow-md rounded-md">
                        <h2 className="pb-3">Trang cá nhân</h2>
                        <hr />

                        <form className="mt-5">
                            <div className="flex items-center gap-5">
                                <div className="w-[50%]">
                                    <TextField label="Họ và tên" variant="outlined" size="small" className="w-full" />
                                </div>
                                <div className="w-[50%]">
                                    <TextField
                                        label="Số điện thoại"
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-5 mt-4">
                                <div className="w-[100%]">
                                    <TextField label="Email" variant="outlined" size="small" className="w-full" />
                                </div>
                            </div>
                            <br />
                            <div className="flex items-center justify-end gap-4">
                                <Button className="btn-org btn-login">Lưu thông tin</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyAccountPage;
