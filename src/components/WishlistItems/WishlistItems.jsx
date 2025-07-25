import React from 'react';

import './WishlistItems.scss';
import { Link, useNavigate } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { GoTriangleDown } from 'react-icons/go';
import { Button, Menu, MenuItem, Rating } from '@mui/material';

import useWishlist from '../../hooks/useWishlist';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const WishlistItems = ({ wishlists }) => {
    const navigate = useNavigate();
    const { removeToWishlist } = useWishlist();

    return (
        wishlists?.length > 0 &&
        wishlists?.map((wishlist) => {
            return (
                <div
                    key={wishlist?._id?.toString()}
                    className="cartItem w-full px-0 sm:px-3 p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]"
                >
                    <div className="img w-[20%] rounded-md overflow-hidden">
                        <Link to={`/product/${wishlist?.product?.toString()}`} className="group">
                            <img
                                src={wishlist?.images[0]}
                                className="w-full group-hover:scale-105 transition-all"
                                alt="Product Image Cart"
                            />
                        </Link>
                    </div>

                    <div className="info w-[80%] relative">
                        <IoCloseSharp
                            onClick={() => removeToWishlist(wishlist?.product?.toString())}
                            className="cursor-pointer absolute top-[0px] right-[0px] text-[18px] link transition-all"
                        />
                        <span className="text-[12px] sm:text-[12px]">{wishlist?.brand}</span>
                        <h3 className="text-[13px] sm:text-[13px] lg:text-[14px] w-[80%]">
                            <Link className="link line-clamp-1">{wishlist?.name}</Link>
                        </h3>

                        <div className="flex gap-3 mt-3 sm:mt-3 md:mt-4 lg:mt-5 items-center">
                            <span className="text-[12px] sm:text-[13px] md:text-[14px] oldPrice line-through leading-3 text-gray-500  font-[500]">
                                {formatCurrency(wishlist?.oldPrice)}
                            </span>
                            <span className="text-[12px] sm:text-[13px] md:text-[14px] price text-primary font-[600]">
                                {formatCurrency(wishlist?.price)}
                            </span>
                        </div>

                        <div className="mt-2 sm:mt-3 lg:mt-4">
                            <Button
                                onClick={() => navigate(`/product/${wishlist?.product?.toString()}`)}
                                className="btn-org !text-[13px] !lg:text-[14px]"
                            >
                                Xem chi tiết
                            </Button>
                        </div>
                    </div>
                </div>
            );
        })
    );
};

export default WishlistItems;
