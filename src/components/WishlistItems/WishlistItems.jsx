import React from 'react';

import '../WishlistItems/WishlistItems.css';
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
        <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
            <div className="img w-[15%] rounded-md overflow-hidden">
                <Link to="/product/2" className="group">
                    <img
                        src="https://vtimes.com.au/up/images/10-24/4039381-jisoo-blackpink-me-dong-p-0.jpg"
                        className="w-full group-hover:scale-105 transition-all"
                        alt="Product Image Cart"
                    />
                </Link>
            </div>

            <div className="info w-[85%] relative">
                <IoCloseSharp className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all" />
                <span className="text-[13px]">Louis Vutton</span>
                <h3 className="text-[15px]">
                    <Link className="link">Áo khoác xanh nhạt con khỉ Dior</Link>
                </h3>

                <Rating name="size-small" defaultValue={5} readOnly size="small" />

                <div className="flex items-center gap-4 mt-2 mb-2">
                    <span className="oldPrice line-through text-gray-500 text-[15px] font-[]500">
                        {formatCurrency(200000)}
                    </span>
                    <span className="price text-[14px] font-[600]">{formatCurrency(180000)}</span>
                    <span className="price text-primary text-[14px] font-[600]">Giảm 55%</span>
                </div>

                <div className="flex items-center gap-3">
                    <Button className="btn-org btn-login">Thêm vào giỏ hàng</Button>
                    {/* <Button className="btn-border btn-login">Tiếp tục mua hàng</Button> */}
                </div>
            </div>
        </div>
    );
};

export default WishlistItems;
