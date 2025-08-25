import React, { useContext, useState } from 'react';

import QuantityBox from '../QuantityBox/QuantityBox';

import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { IoGitCompareOutline } from 'react-icons/io5';
import { Button, Rating } from '@mui/material';
import { MyContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../apis/axiosClient';
import { addToCart } from '../../redux/cartSlice';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const ProductDetailsComponent = ({ product }) => {
    const context = useContext(MyContext);
    const [productActionIndex, setProductActionIndex] = useState(null);
    const [quantityProduct, setQuantityProduct] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { reviews } = useSelector((state) => state.review);

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
                productId: product?._id,
                sizeProduct,
                quantityProduct,
            });
            if (data?.success) {
                // context.openAlertBox('success', data.message);

                const updatedItem = data.shoppingCart.find(
                    (item) => item?.product.toString() === product._id.toString() && item.sizeProduct === sizeProduct
                );
                if (updatedItem) {
                    dispatch(addToCart(updatedItem));
                }
            } else {
                console.error('Không thể thêm vào giỏ hàng:', data.message);
            }
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error.message);
            context.openAlertBox('error', error.response.data.message);
        }
    };
    return (
        <>
            <h1 className="text-[18px] sm:text-[20px] lg:text-[22px] font-[600] mb-2">{product?.name}</h1>
            <div className="flex items-start sm:items-center gap-3 flex-col sm:flex-row">
                <span className="text-gray-400 text-[13px]">
                    Thương hiệu : <span className="font-[500] text-black opacity-75">{product?.brand}</span>
                </span>
                <Rating name="size-small" value={Number(product?.averageRating) || 0} readOnly size="small" />
                <span className="text-[13px] sm:text-[13px] cursor-pointer">Đánh giá ({reviews?.length || 0})</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                    <span className="oldPrice line-through text-gray-500 text-[13px] sm:text-[15px] md:text-[16px] font-[500]">
                        {formatCurrency(product?.oldPrice)}
                    </span>
                    <span className="price text-primary text-[13px] sm:text-[15px] md:text-[16px] font-[600]">
                        {formatCurrency(product?.price)}
                    </span>
                </div>
                <span className="text-[13px] sm:text-[14px]">
                    Trạng thái:{' '}
                    {product?.countInStock > 0 && (
                        <span className="text-green-600 text-[13px] sm:text-[14px] font-bold">
                            Còn hàng ({product?.countInStock} sản phẩm)
                        </span>
                    )}
                    {product?.countInStock === 0 && (
                        <span className="text-red-400 text-[13px] sm:text-[14px] font-bold">
                            Tạm thời hết hàng ({product?.countInStock} sản phẩm)
                        </span>
                    )}
                </span>
            </div>

            <div className="flex items-center gap-3 mt-4">
                <span className="text-[13px] sm:text-[14px]">Kích cỡ: </span>
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

            <p className="text-[13px] sm:text-[14px] mt-5 mb-2 text-[#000]">
                Miễn phí giao hàng cho đơn trên 700k (Giao từ 2-4 ngày)
            </p>

            <div className="flex items-center gap-4 py-4">
                <div className="quantityBoxWrapper w-[70px]">
                    <QuantityBox onQuantityChange={setQuantityProduct} />
                </div>

                <Button onClick={handleAddToCart} className="btn-org flex gap-2">
                    <MdOutlineShoppingCart className="text-[16px] sm:text-[18px]" />
                    <span className="text-[13px] sm:text-[14px]">Thêm vào giỏ hàng </span>
                </Button>
            </div>

            <div className="flex items-center gap-4 mt-4">
                <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
                    <FaRegHeart className="text-[18px]" />
                    <span className="text-[13px] sm:text-[14px]">Yêu thích</span>
                </span>
                {/* <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
                    <IoGitCompareOutline className="text-[18px]" />
                    <span className="text-[13px] sm:text-[14px]">So sánh</span>
                </span> */}
            </div>
        </>
    );
};

export default ProductDetailsComponent;
