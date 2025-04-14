import { Button, TextField } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { FaCloudUploadAlt } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { IoBagCheckOutline } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoIosLogOut } from 'react-icons/io';

import './MyAccountPage.css';

const MyAccountPage = () => {
    return (
        <section className="py-10 w-full">
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <div className="card bg-white shadow-md rounded-md">
                        <div className="w-full p-5 flex items-center justify-center flex-col">
                            <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group">
                                <img
                                    src="https://images2.thanhnien.vn/528068263637045248/2025/2/4/jisooblackpinksangvietnam1-1738649066603340568665.png"
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer
                                    opacity-0 transition-all group-hover:opacity-100"
                                >
                                    <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
                                    <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0" />
                                </div>
                            </div>
                            <h3>Kim Jisoo</h3>
                            <h6 className="text-[13px] font-[500]">tamnguyenforwork@gmail.com</h6>
                        </div>
                        <ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">
                            <li className="w-full">
                                <NavLink to="/my-account" exact={true} activeClassName="active">
                                    <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                                        <FaRegUser className="text-[17px]" />
                                        <span>Trang cá nhân</span>
                                    </Button>
                                </NavLink>
                            </li>
                            <li className="w-full">
                                <NavLink to="/order-history" exact={true} activeClassName="active">
                                    <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                                        <IoBagCheckOutline className="text-[17px]" />
                                        <span>Lịch sử đơn hàng</span>
                                    </Button>
                                </NavLink>
                            </li>
                            <li className="w-full">
                                <NavLink to="/wishlist" exact={true} activeClassName="active">
                                    <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                                        <IoMdHeartEmpty className="text-[17px]" />
                                        <span>Danh sách yêu thích</span>
                                    </Button>
                                </NavLink>
                            </li>
                            <li className="w-full">
                                <NavLink to="/logout" exact={true} activeClassName="active">
                                    <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                                        <IoIosLogOut className="text-[18px] text-[#ff5252]" />
                                        <span className="text-[#ff5252]">Đăng xuất</span>
                                    </Button>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col2 w-[50%]">
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
