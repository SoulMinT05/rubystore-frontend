import React, { useEffect } from 'react';

import './WishlistPage.scss';

import { BsFillBagCheckFill } from 'react-icons/bs';
import { Button } from '@mui/material';
import CartItems from '../../components/CartItems/CartItems';
import WishlistItems from '../../components/WishlistItems/WishlistItems';
import AccountSidebar from '../../components/AccountSidebar/AccountSidebar';
import { useSelector } from 'react-redux';

import useWishlist from '../../hooks/useWishlist';

const WishlistPage = () => {
    const { wishlists } = useSelector((state) => state.wishlist);

    const { getWishlists } = useWishlist();
    useEffect(() => {
        getWishlists();
    }, []);

    return (
        <section className="py-3 lg:py-10 w-full">
            <div className="container flex flex-col lg:flex-row gap-5">
                <div className="col1 w-full lg:w-[20%]">
                    <AccountSidebar />
                </div>
                <div className="col2 w-full lg:w-[80%]">
                    <div className="bg-white p-5 shadow-md rounded-md">
                        <div className="py-2 px-3">
                            <h2 className="pb-3 text-[15px] lg:text-[16px]">Sản phẩm yêu thích</h2>
                            <p className="mt-0 text-[13px] lg:text-[14px]">
                                Tổng {'  '}
                                <span className="font-bold text-primary">
                                    {wishlists?.length} <span> sản phẩm yêu thích</span>
                                </span>
                            </p>
                        </div>

                        <hr />

                        <WishlistItems wishlists={wishlists} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WishlistPage;
