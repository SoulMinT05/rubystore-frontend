import React, { useState } from 'react';

import '../CartItems/CartItems.css';
import { Link } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { GoTriangleDown } from 'react-icons/go';
import { Button, Menu, MenuItem, Rating } from '@mui/material';
import { FaPlus, FaMinus } from 'react-icons/fa';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const CartItems = ({ size, quantity }) => {
    const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
    const [selectedSize, setSelectedSize] = useState(size);
    const openSize = Boolean(sizeAnchorEl);

    const [selectedQuantity, setSelectedQuantity] = useState(quantity);

    const handleClickSize = (event) => {
        setSizeAnchorEl(event.currentTarget);
    };
    const handleCloseSize = (value) => {
        setSizeAnchorEl(null);
        if (value !== null) {
            setSelectedSize(value);
        }
    };

    const handleIncreaseQuantity = () => {
        setSelectedQuantity((prev) => prev + 1);
    };
    const handleDecreaseQuantity = () => {
        if (selectedQuantity > 1) {
            setSelectedQuantity((prev) => prev - 1);
        }
    };
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

                <div className="flex items-center gap-4 mt-2">
                    <div className="relative">
                        <span
                            className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
                            onClick={handleClickSize}
                        >
                            Size: {selectedSize} <GoTriangleDown />
                        </span>

                        <Menu
                            id="size-menu"
                            anchorEl={sizeAnchorEl}
                            open={openSize}
                            onClose={() => handleCloseSize(null)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => handleCloseSize('S')}>S</MenuItem>
                            <MenuItem onClick={() => handleCloseSize('M')}>M</MenuItem>
                            <MenuItem onClick={() => handleCloseSize('L')}>L</MenuItem>
                            <MenuItem onClick={() => handleCloseSize('XL')}>XL</MenuItem>
                            <MenuItem onClick={() => handleCloseSize('XXL')}>XXL</MenuItem>
                        </Menu>
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-2 px-3 rounded-md cursor-pointer"
                            onClick={handleDecreaseQuantity}
                        >
                            <FaMinus className="text-[11px]" />
                        </span>
                        <span className="text-[12px] font-[600] py-1 rounded-md cursor-pointer">
                            {selectedQuantity}
                        </span>
                        <span
                            className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-2 px-3 rounded-md cursor-pointer"
                            onClick={handleIncreaseQuantity}
                        >
                            <FaPlus className="text-[11px]" />
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                    <span className="oldPrice line-through text-gray-500 text-[15px] font-[]500">
                        {formatCurrency(200000)}
                    </span>
                    <span className="price text-[14px] font-[600]">{formatCurrency(180000)}</span>
                    <span className="price text-primary text-[14px] font-[600]">Giảm 55%</span>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
