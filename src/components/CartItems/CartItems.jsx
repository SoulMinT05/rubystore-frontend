import React, { useContext, useState } from 'react';

import '../CartItems/CartItems.css';
import { Link } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { GoTriangleDown } from 'react-icons/go';
import { Button, Checkbox, Menu, MenuItem, Rating } from '@mui/material';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { MyContext } from '../../App';
import axiosClient from '../../apis/axiosClient';
import { addToCart, getCart } from '../../redux/cartSlice';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const CartItems = ({ cart, product, size, quantity, isSelected, handleSelect }) => {
    console.log('cart: ', cart);
    console.log('productCartItems: ', product);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
    const [selectedSize, setSelectedSize] = useState(size);
    const openSize = Boolean(sizeAnchorEl);
    const dispatch = useDispatch();
    const context = useContext(MyContext);

    const [selectedQuantity, setSelectedQuantity] = useState(quantity);

    const handleClickSize = (event) => {
        setSizeAnchorEl(event.currentTarget);
    };
    const handleCloseSize = (value) => {
        setSizeAnchorEl(null);
        if (value !== null) {
            setSelectedSize(value);
        }
    };

    const handleIncreaseQuantity = async (productId) => {
        setSelectedQuantity((prev) => prev + 1);
        try {
            const { data } = await axiosClient.post('/api/user/addToCart', {
                productId,
            });
            console.log('dataAdd: ', data);
            if (data?.success) {
                context.openAlertBox('success', 'Tăng số lượng sản phẩm thành công');
                const response = await axiosClient.get('/api/user/cart');
                if (response.data.success) {
                    dispatch(getCart(response.data.cart));
                }
            } else {
                console.error('Không thể thêm vào giỏ hàng:', data.message);
            }
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error.message);
        }
    };
    const handleDecreaseQuantity = async (productId) => {
        if (selectedQuantity > 1) {
            setSelectedQuantity((prev) => prev - 1);
        }
        try {
            const { data } = await axiosClient.post('/api/user/decreaseQuantityCart', {
                productId,
            });
            if (data?.success) {
                context.openAlertBox('success', 'Giảm số lượng sản phẩm thành công');
                const response = await axiosClient.get('/api/user/cart');
                if (response.data.success) {
                    dispatch(getCart(response.data.cart));
                }
            } else {
                console.error('Không thể thêm vào giỏ hàng:', data.message);
            }
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error.message);
        }
    };
    const handleDeleteCartItem = async (productId) => {
        try {
            const { data } = await axiosClient.post('/api/user/removeProductCart', {
                productId,
            });
            if (data?.success) {
                context.openAlertBox('success', data.message);
                const response = await axiosClient.get('/api/user/cart');
                if (response.data.success) {
                    dispatch(getCart(response.data.cart));
                }
            } else {
                console.error('Không thể thêm vào giỏ hàng:', data.message);
            }
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error.message);
        }
    };
    return (
        <tr className="border-b border-[rgba(0,0,0,0.1)]">
            <td className="px-6 pr-0 py-2">
                <div className="w-[36px]">
                    <Checkbox {...label} checked={isSelected} onChange={handleSelect} size="small" />
                </div>
            </td>
            <td className="px-4 py-2">
                <div className="flex items-center gap-4">
                    <div className="img w-[15%] rounded-md overflow-hidden">
                        <Link to={`/product/${product?.id?._id}`} className="group">
                            <img
                                src={product?.images[0]}
                                className="w-full group-hover:scale-105 transition-all"
                                alt="Product Image Cart"
                            />
                        </Link>
                    </div>
                    <div className="info w-[85%] relative">
                        <IoCloseSharp
                            onClick={() => handleDeleteCartItem(product?.id?._id)}
                            className="cursor-pointer absolute top-[0px] right-[4px] text-[22px] link transition-all"
                        />
                        <span className="text-[13px]">{product?.brand}</span>
                        <h3 className="text-[15px] pr-[32px]">
                            <Link className="link">{product?.name}</Link>
                        </h3>

                        <Rating name="size-small" defaultValue={product?.rating || 5} readOnly size="small" />

                        <div className="flex items-center gap-4 mt-2">
                            <div className="relative">
                                <span
                                    className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
                                    onClick={handleClickSize}
                                >
                                    Size: {selectedSize} <GoTriangleDown />
                                </span>

                                <Menu
                                    id="size-menu"
                                    anchorEl={sizeAnchorEl}
                                    open={openSize}
                                    onClose={() => handleCloseSize(null)}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={() => handleCloseSize('S')}>S</MenuItem>
                                    <MenuItem onClick={() => handleCloseSize('M')}>M</MenuItem>
                                    <MenuItem onClick={() => handleCloseSize('L')}>L</MenuItem>
                                    <MenuItem onClick={() => handleCloseSize('XL')}>XL</MenuItem>
                                    <MenuItem onClick={() => handleCloseSize('XXL')}>XXL</MenuItem>
                                </Menu>
                            </div>
                            <div className="flex items-center gap-2">
                                <span
                                    className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-2 px-3 rounded-md cursor-pointer"
                                    onClick={() => handleDecreaseQuantity(product?.id?._id)}
                                >
                                    <FaMinus className="text-[11px]" />
                                </span>
                                <span className="text-[12px] font-[600] py-1 rounded-md cursor-pointer">
                                    {selectedQuantity}
                                </span>
                                <span
                                    className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-2 px-3 rounded-md cursor-pointer"
                                    onClick={() => handleIncreaseQuantity(product?.id?._id)}
                                >
                                    <FaPlus className="text-[11px]" />
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-2">
                            <span className="oldPrice line-through text-gray-500 text-[15px] font-[]500">
                                {formatCurrency(product?.oldPrice)}
                            </span>
                            <span className="price text-[14px] font-[600]">{formatCurrency(product?.price)}</span>
                            <span className="price text-primary text-[14px] font-[600]">Giảm {product?.discount}%</span>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default CartItems;
