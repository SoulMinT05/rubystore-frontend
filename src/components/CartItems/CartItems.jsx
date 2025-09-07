import React, { useContext, useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { GoTriangleDown } from 'react-icons/go';
import { Button, Checkbox, Menu, MenuItem, Rating } from '@mui/material';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { MyContext } from '../../App';
import axiosClient from '../../apis/axiosClient';
import {
    removeCart,
    removeCartItemInDecrease,
    updateCartItemQuantity,
    updateCartItemSize,
} from '../../redux/cartSlice';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const CartItems = ({
    cart,
    cartId,
    product,
    productId,
    name,
    images,
    oldPrice,
    price,
    size,
    quantity,
    isSelected,
    handleSelect,
}) => {
    const context = useContext(MyContext);
    const dispatch = useDispatch();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
    const [selectedSize, setSelectedSize] = useState(size);
    const openSize = Boolean(sizeAnchorEl);

    const [selectedQuantity, setSelectedQuantity] = useState(quantity);
    const debounceTimeoutRef = useRef(null);

    useEffect(() => {
        const currentItem = cart.products.find((item) => {
            const itemProductId = item?.product?.slug || item?.product;
            return itemProductId === productId && item.sizeProduct === selectedSize;
        });
        if (currentItem && typeof currentItem.quantityProduct === 'number') {
            setSelectedQuantity(currentItem.quantityProduct);
        }
    }, [selectedSize, cart.products, productId]);

    const handleClickSize = (event) => {
        setSizeAnchorEl(event.currentTarget);
    };
    const handleCloseSize = async (value) => {
        setSizeAnchorEl(null);
        if (value !== null && productId && selectedSize) {
            try {
                const { data } = await axiosClient.post('/api/user/updateCartItemSize', {
                    productId,
                    oldSize: selectedSize, // 🟡 đang chọn hiện tại
                    newSize: value, // 🟢 size vừa click chọn
                });
                // console.log('dataUpdateSize: ', data);
                if (data?.success) {
                    // context.openAlertBox('success', 'Cập nhật size sản phẩm thành công');
                    dispatch(
                        updateCartItemSize({
                            productId,
                            oldSize: selectedSize, // size cũ
                            newSize: value, // size mới vừa chọn
                        })
                    );
                    setSelectedSize(value);
                }
            } catch (error) {
                console.error('Lỗi khi cập nhật size:', error.message);
            }
        }
    };

    const handleIncreaseQuantity = async (productId) => {
        const newQuantity = selectedQuantity + 1; // ✅ luôn đúng giá trị mới
        setSelectedQuantity(newQuantity); // ✅ cập nhật lên UI

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(async () => {
            try {
                const { data } = await axiosClient.post('/api/user/updateQuantityItemsCart', {
                    productId,
                    sizeProduct: selectedSize,
                    quantityProduct: newQuantity, // ✅ dùng biến newQuantity chứ KHÔNG phải selectedQuantity
                });

                if (data?.success) {
                    // context.openAlertBox('success', 'Tăng số lượng sản phẩm thành công');

                    const updatedItem = data.shoppingCart.find(
                        (item) => item?.product.toString() === productId.toString() && item.sizeProduct === selectedSize
                    );

                    if (updatedItem) {
                        dispatch(updateCartItemQuantity(updatedItem)); // ✅ dùng action update tuyệt đối
                    }
                } else {
                    console.error('Không thể thêm vào giỏ hàng:', data.message);
                }
            } catch (error) {
                console.error('Lỗi khi thêm vào giỏ hàng:', error);
                context.openAlertBox('error', error.response.data.message);
            }
        }, 500);
    };

    const handleDecreaseQuantity = async (productId) => {
        const newQuantity = selectedQuantity - 1;

        // Không cho giảm về dưới 1 (tuỳ rule bạn muốn giữ hay cho xóa)
        // if (newQuantity < 1) return;

        setSelectedQuantity(newQuantity);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(async () => {
            try {
                const { data } = await axiosClient.post('/api/user/updateQuantityItemsCart', {
                    productId,
                    sizeProduct: selectedSize,
                    quantityProduct: newQuantity,
                });
                // console.log('dataDecrease: ', data);

                if (data?.success) {
                    // context.openAlertBox('success', 'Giảm số lượng sản phẩm thành công');

                    const updatedItem = data.shoppingCart.find(
                        (item) => item?.product.toString() === productId.toString() && item.sizeProduct === selectedSize
                    );

                    if (updatedItem) {
                        dispatch(updateCartItemQuantity(updatedItem));
                    } else {
                        // Nếu không tìm thấy item trong giỏ => bị xoá do về 0
                        dispatch(removeCartItemInDecrease({ product: productId, sizeProduct: selectedSize }));
                    }
                } else {
                    console.error('Không thể giảm số lượng:', data.message);
                }
            } catch (error) {
                console.error('Lỗi khi giảm sản phẩm:', error.message);
            }
        }, 500);
    };

    const handleDeleteCartItem = async (cartId) => {
        try {
            const { data } = await axiosClient.post('/api/user/removeProductCart', {
                cartId,
            });
            // console.log('dataRemoveCart: ', data);
            if (data?.success) {
                // context.openAlertBox('success', data.message);
                dispatch(removeCart(cartId));
            } else {
                console.error('Không thể thêm vào giỏ hàng:', data.message);
            }
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error.message);
        }
    };
    return context?.windowWidth >= 1280 ? (
        <tr key={cartId} className="odd:bg-white even:bg-gray-50 border-b">
            <td className="px-6 pr-0 py-2">
                <div className="w-[60px]">
                    <Checkbox {...label} checked={isSelected} onChange={handleSelect} size="small" />
                </div>
            </td>
            <td className="px-0 py-2">
                <div className="flex items-center gap-4 w-[370px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                        <Link to={`/product/${product?.slug}`}>
                            <img src={images[0]} className="w-full group-hover:scale-105 transition-all" alt="" />
                        </Link>
                    </div>
                    <div className="info w-[75%]">
                        <h3 className="text-[12px] font-[600] leading-4 line-clamp-2 hover:text-primary transition-all">
                            <Link to={`/product/${product?.slug}`}>{name}</Link>
                        </h3>
                    </div>
                </div>
            </td>
            <td className="px-3 py-2 w-[300px]">
                <div className="relative w-full">
                    <button
                        id="size-button"
                        onClick={handleClickSize}
                        aria-controls={openSize ? 'size-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openSize ? 'true' : undefined}
                        className="min-w-[80px] flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
                    >
                        Size: {selectedSize} <GoTriangleDown />
                    </button>

                    <Menu
                        id="size-menu"
                        anchorEl={sizeAnchorEl}
                        open={openSize}
                        onClose={() => handleCloseSize(null)}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {product?.productSize?.map((item, index) => {
                            return (
                                <MenuItem key={index} onClick={() => handleCloseSize(item)}>
                                    {item}
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </div>
            </td>
            <td className="px-6 py-2">
                <div className="flex gap-3 items-center w-[220px]">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[12px] font-[500]">
                        {formatCurrency(oldPrice)}
                    </span>
                    <span className="price text-primary text-[12px] font-[600]">{formatCurrency(price)}</span>
                </div>
            </td>
            <td className="px-6 py-2">
                <div className="w-[80px] text-[12px]">
                    <div className="flex items-center gap-2">
                        <span
                            className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-2 px-3 rounded-md cursor-pointer"
                            onClick={() => handleDecreaseQuantity(product._id)}
                        >
                            <FaMinus className="text-[11px]" />
                        </span>
                        <span className="text-[12px] font-[600] py-1 rounded-md cursor-pointer">
                            {selectedQuantity}
                        </span>
                        <span
                            className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-2 px-3 rounded-md cursor-pointer"
                            onClick={() => handleIncreaseQuantity(product._id)}
                        >
                            <FaPlus className="text-[11px]" />
                        </span>
                    </div>
                </div>
            </td>
            <td className="px-6 py-2">
                <p className="w-[80px] text-[12px]">{formatCurrency(quantity * price)}</p>
            </td>
            <td className="px-6 py-2">
                <p
                    className="w-[80px] hover:text-primary transition-all cursor-pointer"
                    onClick={() => handleDeleteCartItem(cartId)}
                >
                    Xóa
                </p>
            </td>
        </tr>
    ) : (
        <tr key={cartId} className="odd:bg-white even:bg-gray-50 border-b">
            <td className="px-2 pr-0 py-2">
                <div className="w-[50px]">
                    <Checkbox {...label} checked={isSelected} onChange={handleSelect} size="small" />
                </div>
            </td>
            <td className="">
                <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-rgba(0,0,0,0.1)">
                    <div className="img w-[20%] rounded-md overflow-hidden ">
                        <Link to={`/product/${product?.slug}`} className="group">
                            <img src={images[0]} className="w-full group-hover:scale-105 transition-all" alt="" />
                        </Link>
                    </div>
                    <div className="info w-[80%] relative ">
                        <IoCloseSharp
                            className="cursor-pointer absolute top-0 right-0 text-[18px] link transition-all"
                            onClick={() => handleDeleteCartItem(cartId)}
                        />
                        <h3 className="text-[13px] sm:text-[13px] lg:text-[14px] xl:text-[16px] w-[80%]">
                            <Link to={`/product/${product?.slug}`} className="link line-clamp-1 ">
                                {/* {name?.substr(0, 24) + '...'} */}
                                {name}
                            </Link>
                        </h3>
                        <div className="flex mt-3 sm:mt-3 md:mt-4 lg:mt-5 items-center">
                            <div className="relative w-[48%] sm:w-[32%] md:w-[26%]">
                                <button
                                    id="size-button"
                                    onClick={handleClickSize}
                                    aria-controls={openSize ? 'size-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openSize ? 'true' : undefined}
                                    className="w-[90px] md:w-[96px] flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
                                >
                                    <span className="text-[11px] sm:text-[12px] md:text-[12px] lg:text-[13px] xl:text-[14px]">
                                        Size: {selectedSize}
                                    </span>
                                    <span className="text-[11px] sm:text-[12px] md:text-[12px] lg:text-[13px] xl:text-[14px]">
                                        <GoTriangleDown />
                                    </span>
                                </button>

                                <Menu
                                    id="size-menu"
                                    anchorEl={sizeAnchorEl}
                                    open={openSize}
                                    onClose={() => handleCloseSize(null)}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {product?.productSize?.map((item, index) => {
                                        return (
                                            <MenuItem key={index} onClick={() => handleCloseSize(item)}>
                                                {item}
                                            </MenuItem>
                                        );
                                    })}
                                </Menu>
                            </div>
                            <div className="flex items-center gap-2">
                                <span
                                    className="text-[11px] flex items-center justify-center bg-[#f1f1f1]  font-[600] py-2 px-3 rounded-md cursor-pointer"
                                    onClick={() => handleDecreaseQuantity(product._id)}
                                >
                                    <FaMinus className="text-[11px]" />
                                </span>
                                <span className="text-[11px] sm:text-[12px] md:text-[12px] lg:text-[13px] xl:text-[14px] font-[600] py-1 rounded-md cursor-pointer">
                                    {selectedQuantity}
                                </span>
                                <span
                                    className="text-[11px] flex items-center justify-center bg-[#f1f1f1]  font-[600] py-2 px-3 rounded-md cursor-pointer"
                                    onClick={() => handleIncreaseQuantity(product._id)}
                                >
                                    <FaPlus className="text-[11px]" />
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-3 sm:mt-3 md:mt-4 lg:mt-5 items-center">
                            <span className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13px] xl:text-[14px] oldPrice line-through leading-3 text-gray-500  font-[500]">
                                {formatCurrency(oldPrice)}
                            </span>
                            <span className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13px] xl:text-[14px] price text-primary font-[600]">
                                {formatCurrency(price)}
                            </span>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default CartItems;
