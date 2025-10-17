import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';

import './WishlistPage.scss';
import { MyContext } from '@/App';
import useWishlist from '@/hooks/useWishlist';
import axiosClient from '@/apis/axiosClient';
import { fetchWishlists } from '@/redux/wishlistSlice';
import AccountSidebarLayout from '@/components/AccountSidebar/AccountSidebarLayout';
import { formatCurrency } from '@/utils/formatters';
import { TIME_OUT_LOADING } from '@/constants/ui';

const WishlistPage = () => {
    const context = useContext(MyContext);

    const dispatch = useDispatch();
    const { wishlists } = useSelector((state) => state.wishlist);
    const { removeToWishlist } = useWishlist();

    const navigate = useNavigate();

    const [visibleCount, setVisibleCount] = useState(5);
    const [isLoadingWishlists, setIsLoadingWishlists] = useState(false);

    useEffect(() => {
        setIsLoadingWishlists(true);

        const handleTimeout = setTimeout(() => {
            const getWishlists = async () => {
                try {
                    const { data } = await axiosClient.get('/api/user/getAllWishlists');
                    console.log('wishtlists: ', data);
                    if (data?.success) {
                        dispatch(fetchWishlists(data?.wishlists));
                    }
                } catch (error) {
                    console.log('error: ', error);
                    context?.openAlertBox('error', error?.response?.data?.message);
                } finally {
                    setIsLoadingWishlists(false);
                }
            };
            getWishlists();
        }, TIME_OUT_LOADING);

        return () => {
            clearTimeout(handleTimeout);
        };
    }, []);

    return (
        <AccountSidebarLayout>
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

                {isLoadingWishlists ? (
                    <div className="flex items-center justify-center w-full min-h-[400px]">
                        <CircularProgress color="inherit" />
                    </div>
                ) : wishlists.length > 0 ? (
                    <>
                        {wishlists.slice(0, visibleCount).map((wishlist) => (
                            <div
                                key={wishlist?._id?.toString()}
                                className="cartItem w-full px-0 sm:px-3 p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]"
                            >
                                <div className="img w-[20%] rounded-md overflow-hidden">
                                    <Link to={`/product/${wishlist?.product?.slug}`} className="group">
                                        <img
                                            src={wishlist?.images[0]}
                                            className="w-full group-hover:scale-105 transition-all"
                                            alt="Product Image Cart"
                                        />
                                    </Link>
                                </div>

                                <div className="info w-[80%] relative">
                                    <IoCloseSharp
                                        onClick={() => removeToWishlist(wishlist?.product?._id)}
                                        className="cursor-pointer absolute top-[0px] right-[0px] text-[18px] link transition-all"
                                    />
                                    <span className="text-[12px] sm:text-[12px]">{wishlist?.brand}</span>

                                    <h3 className="text-[13px] sm:text-[13px] lg:text-[14px] w-[80%]">
                                        <Link
                                            to={`/product/${wishlist?.product?.slug}`}
                                            className="link transition-all line-clamp-1"
                                        >
                                            {wishlist?.productName}
                                        </Link>
                                    </h3>

                                    <div className="flex gap-3 mt-3 sm:mt-3 md:mt-4 lg:mt-5 items-center">
                                        <span className="text-[12px] sm:text-[13px] md:text-[14px] oldPrice line-through leading-3 text-gray-500 font-[500]">
                                            {formatCurrency(wishlist?.oldPrice)}
                                        </span>
                                        <span className="text-[12px] sm:text-[13px] md:text-[14px] price text-primary font-[600]">
                                            {formatCurrency(wishlist?.price)}
                                        </span>
                                    </div>

                                    <div className="mt-2 sm:mt-3 lg:mt-4">
                                        <Button
                                            onClick={() => navigate(`/product/${wishlist?.product?.slug}`)}
                                            className="btn-org !text-[13px] !lg:text-[14px]"
                                        >
                                            Xem chi tiết
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {visibleCount < wishlists.length && (
                            <div className="text-center my-4">
                                <button
                                    onClick={() => setVisibleCount((prev) => prev + 10)}
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    Xem thêm
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex items-center justify-center w-full min-h-[400px]">
                        Chưa có sản phẩm yêu thích
                    </div>
                )}
            </div>
        </AccountSidebarLayout>
    );
};

export default WishlistPage;
