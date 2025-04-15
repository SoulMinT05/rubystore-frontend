import React from 'react';

import './WishlistPage.css';

import { BsFillBagCheckFill } from 'react-icons/bs';
import { Button } from '@mui/material';
import CartItems from '../../components/CartItems/CartItems';
import WishlistItems from '../../components/WishlistItems/WishlistItems';
import AccountSidebar from '../../components/AccountSidebar/AccountSidebar';

const WishlistPage = () => {
    return (
        <section className="py-10 w-full">
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSidebar />
                </div>
                <div className="col2 w-[80%]">
                    <div className="bg-white p-5 shadow-md rounded-md">
                        <div className="py-2 px-3">
                            <h2 className="pb-3">Sản phẩm yêu thích</h2>
                            <p className="mt-0">
                                Tổng {'  '}
                                <span className="font-bold text-primary">
                                    3<span> sản phẩm yêu thích</span>
                                </span>
                            </p>
                        </div>

                        <hr />

                        <WishlistItems />
                        <WishlistItems />
                        <WishlistItems />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WishlistPage;
