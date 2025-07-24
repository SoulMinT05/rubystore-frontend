import React from 'react';

import './WishlistItems.scss';
import { Link } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { GoTriangleDown } from 'react-icons/go';
import { Button, Menu, MenuItem, Rating } from '@mui/material';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const WishlistItems = () => {
    return (
        <div className="cartItem w-full px-0 sm:px-3 p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
            <div className="img w-[20%] rounded-md overflow-hidden">
                <Link to="/product/2" className="group">
                    <img
                        src="https://vtimes.com.au/up/images/10-24/4039381-jisoo-blackpink-me-dong-p-0.jpg"
                        className="w-full group-hover:scale-105 transition-all"
                        alt="Product Image Cart"
                    />
                </Link>
            </div>

            <div className="info w-[80%] relative">
                <IoCloseSharp className="cursor-pointer absolute top-[0px] right-[0px] text-[18px] link transition-all" />
                <span className="text-[12px] sm:text-[12px]">Louis Vutton</span>
                <h3 className="text-[13px] sm:text-[13px] lg:text-[14px] w-[80%]">
                    <Link className="link line-clamp-1">Áo khoác xanh nhạt con khỉ Dior</Link>
                </h3>

                <div className="flex gap-3 mt-3 sm:mt-3 md:mt-4 lg:mt-5 items-center">
                    <div className="relative w-[48%] sm:w-[32%] md:w-[26%]">
                        <button
                            id="size-button"
                            aria-haspopup="true"
                            className="w-[90px] md:w-[96px] flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
                        >
                            <span className="text-[12px] sm:text-[12px] lg:text-[13px]">Size: XXL</span>
                            <span className="text-[12px] sm:text-[12px] lg:text-[13px]">
                                <GoTriangleDown />
                            </span>
                        </button>
                    </div>
                </div>

                <div className="flex gap-3 mt-3 sm:mt-3 md:mt-4 lg:mt-5 items-center">
                    <span className="text-[12px] sm:text-[13px] md:text-[14px] oldPrice line-through leading-3 text-gray-500  font-[500]">
                        {formatCurrency(20000000)}
                    </span>
                    <span className="text-[12px] sm:text-[13px] md:text-[14px] price text-primary font-[600]">
                        {formatCurrency(18000000)}
                    </span>
                </div>

                <div className="mt-2 sm:mt-3 lg:mt-4">
                    <Button className="btn-org !text-[13px] !lg:text-[14px]">Thêm vào giỏ hàng</Button>
                </div>
            </div>
        </div>
    );
};

export default WishlistItems;
