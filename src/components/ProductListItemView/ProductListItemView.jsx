import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { FaRegHeart } from 'react-icons/fa';
import { IoGitCompareOutline } from 'react-icons/io5';
import { MdZoomOutMap } from 'react-icons/md';
import { MdOutlineShoppingCart } from 'react-icons/md';

import '../ProductListItemView/ProductListItemView.css';
import { MyContext } from '../../App';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};
const ProductListItemView = ({ product }) => {
    const context = useContext(MyContext);
    const navigate = useNavigate();
    return (
        <div className="productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)] flex items-center">
            <div className="group imgWrapper w-[25%] overflow-hidden rounded-md relative">
                <Link to={`/product/${product?._id}`}>
                    <div className="img overflow-hidden">
                        <img src={product?.images[0]} alt="" className="w-full" />
                        <img
                            src={product?.images[1]}
                            alt=""
                            className="w-full transition-all duration-300 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-scale:105"
                        />
                    </div>
                </Link>
                <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">
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
                    <Tooltip title="So sánh" placement="left-start">
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group">
                            <IoGitCompareOutline className="text-[18px] !text-black group-hover:text-white" />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Yêu thích" placement="left-start">
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group">
                            <FaRegHeart className="text-[18px] !text-black group-hover:text-white" />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className="info p-3 py-5 px-8 w-[75%]">
                <h6 className="text-[15px] !font-[400]">
                    <Link to="/" className="link transition-all">
                        {product?.brand}
                    </Link>
                </h6>
                <h3 className="text-[18px] title mt-3 font-[500] mb-3 text-[#000]">
                    <Link to="/" className="link transition-all">
                        {product?.name}
                    </Link>
                </h3>
                <p className="text-[14px] mb-3 line-clamp-3">{product?.description}</p>
                <Rating name="size-small" value={Number(product?.rating) || 0} readOnly size="small" />

                <div className="flex items-center gap-4">
                    <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
                        {formatCurrency(product?.oldPrice)}
                    </span>
                    <span className="price text-primary text-[15px] font-[600]">{formatCurrency(product?.price)}</span>
                </div>

                <div className="mt-3">
                    <Button onClick={() => navigate(`/product/${product?._id}`)} className="btn-org flex gap-2">
                        <MdOutlineShoppingCart className="text-[20px]" />
                        Thêm vào giỏ hàng
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductListItemView;
