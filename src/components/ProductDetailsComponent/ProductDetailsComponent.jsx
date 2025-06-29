import React, { useContext, useEffect, useState } from 'react';

import '../ProductDetailsComponent/ProductDetailsComponent.css';
import QuantityBox from '../QuantityBox/QuantityBox';

import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { IoGitCompareOutline } from 'react-icons/io5';
import { Button, Rating } from '@mui/material';
import { MyContext } from '../../App';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../apis/axiosClient';
import { getCart } from '../../redux/cartSlice';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const ProductDetailsComponent = ({ product, reviews }) => {
    const context = useContext(MyContext);
    const [productActionIndex, setProductActionIndex] = useState(null);
    const [quantityProduct, setQuantityProduct] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('quantityProduct: ', quantityProduct);
    }, [quantityProduct]);

    const handleAddToCart = async () => {
        if (!context.isLogin) {
            context.openAlertBox('warning', 'Vui lòng đăng nhập!');
            navigate('/login');
            return;
        }

        const sizeProduct = product?.productSize[productActionIndex];
        if (!sizeProduct) {
            context.openAlertBox('error', 'Vui lòng chọn kích cỡ trước khi thêm vào giỏ hàng!');
            return;
        }

        try {
            const { data } = await axiosClient.post('/api/user/addToCart', {
                productId: product._id,
                sizeProduct,
                quantityProduct,
            });
            console.log('dataAddToCart: ', data);
            if (data?.success) {
                context.openAlertBox('success', data.message);
                dispatch(getCart(data.cart));
            } else {
                console.error('Không thể thêm vào giỏ hàng:', data.message);
            }
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error.message);
        }
    };
    return (
        <>
            <h1 className="text-[24px] font-[600] mb-2">{product?.name}</h1>
            <div className="flex items-center gap-3">
                <span className="text-gray-400 text-[13px]">
                    Thương hiệu : <span className="font-[500] text-black opacity-75">{product?.brand}</span>
                </span>
                <Rating name="size-small" defaultValue={product?.averageRating} readOnly size="small" />
                <span className="text-[13px] cursor-pointer">
                    Đánh giá ({reviews?.length || product?.reviewCount || 0})
                </span>
            </div>

            <div className="flex items-center gap-4 mt-4">
                <span className="oldPrice line-through text-gray-500 text-[18px] font-[500]">
                    {formatCurrency(product?.oldPrice)}
                </span>
                <span className="price text-primary text-[18px] font-[600]">{formatCurrency(product?.price)}</span>
                <span className="text-[14px]">
                    Trạng thái:{' '}
                    <span className="text-green-600 text-[14px] font-bold">
                        Còn hàng ({product?.countInStock} sản phẩm)
                    </span>
                </span>
            </div>

            <div className="flex items-center gap-3 mt-4">
                <span className="text-[16px]">Kích cỡ: </span>
                <div className="flex items-center gap-2 actions">
                    {product?.productSize?.length !== 0 &&
                        product?.productSize.map((item, index) => {
                            return (
                                <Button
                                    key={index}
                                    className={`${productActionIndex === index ? '!bg-primary !text-white' : ''}`}
                                    onClick={() => setProductActionIndex(index)}
                                >
                                    {item}
                                </Button>
                            );
                        })}
                </div>
            </div>

            <p className="text-[14px] mt-5 mb-2 text-[#000]">Miễn phí giao hàng cho đơn trên 400K (Giao từ 2-4 ngày)</p>

            <div className="flex items-center gap-4 py-4">
                <div className="quantityBoxWrapper w-[70px]">
                    <QuantityBox onQuantityChange={setQuantityProduct} />
                </div>

                <Button onClick={handleAddToCart} className="btn-org flex gap-2">
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
