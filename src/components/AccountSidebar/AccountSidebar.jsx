import React from 'react';

import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { FaCloudUploadAlt } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { IoBagCheckOutline } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoIosLogOut } from 'react-icons/io';

import './AccountSidebar.css';

const AccountSidebar = () => {
    return (
        <div className="card bg-white shadow-md rounded-md sticky top-[10px]">
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
                    <NavLink to="/my-account" activeClassName="active">
                        <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <FaRegUser className="text-[17px]" />
                            <span>Trang cá nhân</span>
                        </Button>
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink to="/order-history" activeClassName="active">
                        <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <IoBagCheckOutline className="text-[17px]" />
                            <span>Lịch sử đơn hàng</span>
                        </Button>
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink to="/wishlist" activeClassName="active">
                        <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <IoMdHeartEmpty className="text-[17px]" />
                            <span>Danh sách yêu thích</span>
                        </Button>
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink activeClassName="active">
                        <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <IoIosLogOut className="text-[18px] text-[#ff5252]" />
                            <span className="text-[#ff5252]">Đăng xuất</span>
                        </Button>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AccountSidebar;
