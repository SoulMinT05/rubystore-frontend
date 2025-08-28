import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { FaRegHeart } from 'react-icons/fa';
import { IoGitCompareOutline } from 'react-icons/io5';
import { MdZoomOutMap } from 'react-icons/md';
import { MdOutlineShoppingCart } from 'react-icons/md';

import './ProductListItemView.scss';
import { MyContext } from '../../App';
import useWishlist from '../../hooks/useWishlist';
import { useSelector } from 'react-redux';
import { IoMdHeart } from 'react-icons/io';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};
const ProductListItemView = ({ product }) => {
    const context = useContext(MyContext);
    const navigate = useNavigate();

    const { addToWishlist } = useWishlist();
    const { wishlists } = useSelector((state) => state.wishlist);

    const isInWishlist = wishlists?.some((item) => item?.product?.toString() === product?._id);
    return (
        <div className="productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)] flex flex-col lg:flex-row items-center">
            <div className="group imgWrapper w-full lg:w-[30%] overflow-hidden rounded-md relative">
                <Link to={`/product/${product?._id}`}>
                    <div className="img item_view_image h-[380px] sm:w-full sm:h-[320px] md:h-[300px] xl:h-[360px] overflow-hidden lg:py-4 lg:pl-2">
                        <img src={product?.images[0]} alt="" className="w-full h-full object-cover lg:rounded-md " />
                        <img
                            src={product?.images[1]}
                            alt=""
                            className="w-full h-full object-cover lg:rounded-md transition-all duration-300 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-scale:105"
                        />
                    </div>
                </Link>
                <span className="discount item_view_discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">
                    {product?.discount}%
                </span>
                <div
                    className="actions absolute top-[-200px] right-[5px] flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px]
                    opacity-0 group-hover:opacity-100
                "
                >
                    <Tooltip title="Xem chi tiết" placement="left-start">
                        <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group"
                            onClick={() => context.setOpenProductDetailsModal(true)}
                        >
                            <MdZoomOutMap className="text-[18px] !text-black group-hover:text-white" />
                        </Button>
                    </Tooltip>
                    {/* <Tooltip title="So sánh" placement="left-start">
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group">
                            <IoGitCompareOutline className="text-[18px] !text-black group-hover:text-white" />
                        </Button>
                    </Tooltip> */}
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
            <div className="info py-5 px-3 lg:px-8 w-full lg:w-[70%]">
                <h6 className="text-[12px] lg:text-[13px] !font-[400]">
                    <Link to="/" className="link transition-all">
                        {product?.brand}
                    </Link>
                </h6>
                <h3 className="text-[12px] lg:text-[13px] min-h-[36px] lg:min-h-[0] line-clamp-2 title mt-3 font-[500] mb-3 text-[#000]">
                    <Link to="/" className="link transition-all">
                        {product?.name}
                    </Link>
                </h3>
                <p className="text-[12px] lg:text-[13px] mb-3 line-clamp-2">{product?.description}</p>
                <Rating name="size-small" value={Number(product?.rating) || 0} readOnly size="small" />

                <div
                    className={`flex items-center gap-3 
                        ${
                            context?.windowWidth <= 422
                                ? 'min-h-[48px] h-[48px]'
                                : context?.windowWidth >= 600 && context?.windowWidth < 992
                                ? 'min-h-[50px]'
                                : ''
                        }  
                    flex-wrap`}
                >
                    <span className="oldPrice line-through text-gray-500 text-[12px] lg:text-[14px] font-[500]">
                        {formatCurrency(product?.oldPrice)}
                    </span>
                    <span className="price text-primary text-[12px] lg:text-[14px] font-[600]">
                        {formatCurrency(product?.price)}
                    </span>
                </div>
                <div className="mt-3">
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

export default ProductListItemView;
