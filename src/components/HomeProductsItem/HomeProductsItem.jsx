import React, { useContext } from 'react';

import './HomeProductsItem.scss';
import { Link, useNavigate } from 'react-router-dom';

import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';

import { IoGitCompareOutline } from 'react-icons/io5';
import { MdZoomOutMap } from 'react-icons/md';
import { MyContext } from '../../App';
import { MdOutlineShoppingCart } from 'react-icons/md';
import useWishlist from '../../hooks/useWishlist';
import { useSelector } from 'react-redux';
import { IoMdHeart } from 'react-icons/io';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};
const HomeProductsItem = ({ product }) => {
    const context = useContext(MyContext);
    const navigate = useNavigate();

    const { addToWishlist } = useWishlist();
    const { wishlists } = useSelector((state) => state.wishlist);

    const isInWishlist = wishlists?.some((item) => item?.product?.toString() === product?._id);

    return (
        <div className="productItem min-h-[424px] sm:min-h-[430px] lg:min-h-[448px] shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]">
            <div className="group imgWrapper w-[100%] overflow-hidden rounded-md relative">
                <Link to={`/product/${product?._id}`}>
                    <div className="img h-[220px] overflow-hidden">
                        <img src={product?.images[0]} alt="" className="w-full" />
                        <img
                            src={product?.images[1]}
                            alt=""
                            className="w-full transition-all duration-300 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-scale:105"
                        />
                    </div>
                </Link>
                <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">
                    {product?.discount + '%'}
                </span>
                <div
                    className="actions absolute top-[-200px] right-[5px] flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px]
                    opacity-0 group-hover:opacity-100
                "
                >
                    <Tooltip title="Xem chi tiết" placement="left-start">
                        <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group"
                            onClick={() => context.handleOpenProductDetailsModal(true, product)}
                        >
                            <MdZoomOutMap className="text-[18px] !text-black group-hover:text-white" />
                        </Button>
                    </Tooltip>
                    <Tooltip title="So sánh" placement="left-start">
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group">
                            <IoGitCompareOutline className="text-[18px] !text-black group-hover:text-white" />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Yêu thích" placement="left-start">
                        <Button
                            onClick={() => addToWishlist(product?._id)}
                            className={`!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group`}
                        >
                            {isInWishlist ? (
                                <IoMdHeart className="text-[20px] !text-primary group-hover:text-white" />
                            ) : (
                                <FaRegHeart className="text-[18px] !text-black group-hover:text-white" />
                            )}
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className="info p-3 py-5 relative pb-[50px] min-h-[184px] sm:min-h-[205px] lg:min-h-[220px] ">
                <h6 className="text-[12px] lg:text-[13px] line-clamp-1 !font-[400]">
                    <span className="link transition-all">{product?.brand}</span>
                </h6>
                <h3 className="text-[12px] lg:text-[13px] min-h-[36px] line-clamp-2 lg:min-h-[52px] lg:line-clamp-3  title mt-1 font-[500] mb-1 text-[#000]">
                    <Link to={`/product/${product?._id}`} className="link transition-all">
                        {product?.name}
                    </Link>
                </h3>
                <Rating name="size-small" value={Number(product?.rating) || 0} readOnly size="small" />

                <div
                    className={`flex items-center gap-3 ${
                        context?.windowWidth <= 422
                            ? 'min-h-[48px] h-[48px]'
                            : context?.windowWidth >= 600 && context?.windowWidth < 992
                            ? 'min-h-[50px]'
                            : context?.windowWidth > 992
                            ? 'h-[54px] mb-[6px]'
                            : ''
                    }  flex-wrap`}
                >
                    <span className="oldPrice line-through text-gray-500 text-[12px] lg:text-[14px] font-[500] whitespace-nowrap">
                        {formatCurrency(product?.oldPrice)}
                    </span>
                    <span className="price text-primary text-[12px] lg:text-[14px] font-[600] whitespace-nowrap">
                        {formatCurrency(product?.price)}
                    </span>
                </div>
                <div className="!absolute bottom-[15px] left-0 pl-3 pr-3 w-full">
                    <Button
                        className="btn-border flex w-full btn-sm gap-1 !px-1 overflow-hidden text-ellipsis whitespace-nowrap"
                        size="small"
                        onClick={() => navigate(`/product/${product?._id}`)}
                    >
                        <MdOutlineShoppingCart className="text-[18px]" />
                        <span className="text-[13px] !normal-case">Thêm vào giỏ hàng</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HomeProductsItem;
