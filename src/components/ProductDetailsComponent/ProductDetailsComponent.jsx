import React, { useState } from 'react';

import '../ProductDetailsComponent/ProductDetailsComponent.css';
import QuantityBox from '../QuantityBox/QuantityBox';

import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { IoGitCompareOutline } from 'react-icons/io5';
import { Button, Rating } from '@mui/material';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const ProductDetailsComponent = () => {
    const [productActionIndex, setProductActionIndex] = useState(null);
    return (
        <>
            <h1 className="text-[24px] font-[600] mb-2">Áo dài cát tân</h1>
            <div className="flex items-center gap-3">
                <span className="text-gray-400 text-[13px]">
                    Thương hiệu : <span className="font-[500] text-black opacity-75">Louis Vuiton</span>
                </span>
                <Rating name="size-small" defaultValue={5} readOnly size="small" />
                <span className="text-[13px] cursor-pointer">Đánh giá (5)</span>
            </div>

            <div className="flex items-center gap-4 mt-4">
                <span className="oldPrice line-through text-gray-500 text-[18px] font-[500]">
                    {formatCurrency(200000)}
                </span>
                <span className="price text-primary text-[18px] font-[600]">{formatCurrency(180000)}</span>
                <span className="text-[14px]">
                    Trạng thái: <span className="text-green-600 text-[14px] font-bold">Còn hàng (147 sản phẩm)</span>
                </span>
            </div>

            <p className="mt-3 pr-10 mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia praesentium corporis reiciendis quasi
                quod architecto ea aperiam aut quia excepturi incidunt explicabo illum obcaecati, dicta optio soluta
                fugit ad dolore laborum assumenda, quo qui aliquid. Necessitatibus accusantium nemo quo cupiditate!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia praesentium corporis reiciendis quasi
                quod architecto ea aperiam aut quia excepturi incidunt explicabo illum obcaecati, dicta optio soluta
                fugit ad dolore laborum assumenda, quo qui aliquid. Necessitatibus accusantium nemo quo cupiditate!
            </p>

            <div className="flex items-center gap-3">
                <span className="text-[16px]">Kích cỡ: </span>
                <div className="flex items-center gap-2 actions">
                    <Button
                        className={`${productActionIndex === 0 ? '!bg-primary !text-white' : ''}`}
                        onClick={() => setProductActionIndex(0)}
                    >
                        S
                    </Button>
                    <Button
                        className={`${productActionIndex === 1 ? '!bg-primary !text-white' : ''}`}
                        onClick={() => setProductActionIndex(1)}
                    >
                        M
                    </Button>
                    <Button
                        className={`${productActionIndex === 2 ? '!bg-primary !text-white' : ''}`}
                        onClick={() => setProductActionIndex(2)}
                    >
                        L
                    </Button>
                    <Button
                        className={`${productActionIndex === 3 ? '!bg-primary !text-white' : ''}`}
                        onClick={() => setProductActionIndex(3)}
                    >
                        XL
                    </Button>
                </div>
            </div>

            <p className="text-[14px] mt-5 mb-2 text-[#000]">Miễn phí giao hàng cho đơn trên 400K (Giao từ 2-4 ngày)</p>

            <div className="flex items-center gap-4 py-4">
                <div className="quantityBoxWrapper w-[70px]">
                    <QuantityBox />
                </div>

                <Button className="btn-org flex gap-2">
                    <MdOutlineShoppingCart className="text-[22px]" />
                    Thêm vào giỏ hàng{' '}
                </Button>
            </div>

            <div className="flex items-center gap-4 mt-4">
                <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
                    <FaRegHeart className="text-[18px]" />
                    Yêu thích
                </span>
                <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
                    <IoGitCompareOutline className="text-[18px]" />
                    So sánh
                </span>
            </div>
        </>
    );
};

export default ProductDetailsComponent;
