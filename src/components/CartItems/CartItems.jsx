import React, { useContext, useEffect, useState } from 'react';

import '../CartItems/CartItems.css';
import { Link } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { GoTriangleDown } from 'react-icons/go';
import { Button, Checkbox, Menu, MenuItem, Rating } from '@mui/material';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { MyContext } from '../../App';
import axiosClient from '../../apis/axiosClient';
import { addToCart, decreaseQuantity, removeCart, updateCartItemSize } from '../../redux/cartSlice';

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
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
    const [selectedSize, setSelectedSize] = useState(size);
    const openSize = Boolean(sizeAnchorEl);
    const dispatch = useDispatch();
    const [selectedQuantity, setSelectedQuantity] = useState(quantity);

    useEffect(() => {
        const currentItem = cart.products.find((item) => {
            const itemProductId = item?.product?._id || item?.product;
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
                console.log('dataUpdateSize: ', data);
                if (data?.success) {
                    context.openAlertBox('success', 'Cập nhật size sản phẩm thành công');
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

    useEffect(() => {
        // console.log('selectedSize: ', selectedSize);
    }, [selectedSize]);

    useEffect(() => {
        // console.log('📦 Redux cart state:', cart);
        // console.log('selectedQuantity: ', selectedQuantity);
    }, [cart]);

    const handleIncreaseQuantity = async (productId) => {
        setSelectedQuantity((prev) => prev + 1);
        try {
            const { data } = await axiosClient.post('/api/user/addToCart', {
                productId,
                sizeProduct: selectedSize,
            });
            console.log('dataAdd: ', data);
            if (data?.success) {
                context.openAlertBox('success', 'Tăng số lượng sản phẩm thành công');

                const updatedItem = data.shoppingCart.find(
                    (item) => item?.product.toString() === productId.toString() && item.sizeProduct === selectedSize
                );
                if (updatedItem) {
                    dispatch(addToCart(updatedItem));
                }
            } else {
                console.error('Không thể thêm vào giỏ hàng:', data.message);
            }
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
        }
    };
    const handleDecreaseQuantity = async (productId) => {
        if (selectedQuantity > 1) {
            setSelectedQuantity((prev) => prev - 1);
        }
        try {
            const { data } = await axiosClient.post('/api/user/decreaseQuantityCart', {
                productId,
                sizeProduct: selectedSize,
            });
            console.log('dataDecrease: ', data);
            if (data?.success) {
                context.openAlertBox('success', 'Giảm số lượng sản phẩm thành công');
                const updatedItem = data.shoppingCart.find(
                    (item) => item?.product.toString() === productId.toString() && item.sizeProduct === selectedSize
                );
                if (updatedItem) {
                    dispatch(decreaseQuantity(updatedItem));
                }
            } else {
                console.error('Không thể thêm vào giỏ hàng:', data.message);
            }
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error.message);
        }
    };
    const handleDeleteCartItem = async (cartId) => {
        try {
            const { data } = await axiosClient.post('/api/user/removeProductCart', {
                cartId,
            });
            console.log('dataRemoveCart: ', data);
            if (data?.success) {
                context.openAlertBox('success', data.message);
                dispatch(removeCart(cartId));
            } else {
                console.error('Không thể thêm vào giỏ hàng:', data.message);
            }
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error.message);
        }
    };
    return (
        <tr key={cartId} className="odd:bg-white  even:bg-gray-50 border-b">
            <td className="px-6 pr-0 py-2">
                <div className="w-[60px]">
                    <Checkbox {...label} checked={isSelected} onChange={handleSelect} size="small" />
                </div>
            </td>
            <td className="px-0 py-2">
                <div className="flex items-center gap-4 w-[330px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                        <Link to={`/product/${productId}`}>
                            <img src={images[0]} className="w-full group-hover:scale-105 transition-all" alt="" />
                        </Link>
                    </div>
                    <div className="info w-[75%]">
                        <h3 className="text-[12px] font-[600] leading-4 hover:text-primary transition-all">
                            <Link to={`/product/${productId}`}>{name}</Link>
                        </h3>
                    </div>
                </div>
            </td>
            <td className="px-6 py-2">
                <div className="relative">
                    <button
                        id="basic-button"
                        onClick={handleClickSize}
                        aria-controls={openSize ? 'size-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openSize ? 'true' : undefined}
                        className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
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
                <div className="flex gap-3 items-center w-[200px]">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[12px] font-[500]">
                        {formatCurrency(oldPrice)}
                    </span>
                    <span className="price text-primary text-[12px] font-[600]">{formatCurrency(price)}</span>
                </div>
            </td>
            <td className="px-6 py-2">
                <p className="w-[80px] text-[12px]">
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
                </p>
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
    );
};

export default CartItems;

// <tr className="border-b border-[rgba(0,0,0,0.1)]">
//     <td className="px-6 pr-0 py-2">
//         <div className="w-[36px]">
//             <Checkbox {...label} checked={isSelected} onChange={handleSelect} size="small" />
//         </div>
//     </td>
//     <td className="px-4 py-2">
//         <div className="flex items-center gap-4">
//             <div className="img w-[15%] rounded-md overflow-hidden">
//                 <Link to={`/product/${productId}`} className="group">
//                     <img
//                         src={images[0]}
//                         className="w-full group-hover:scale-105 transition-all"
//                         alt="Product Image Cart"
//                     />
//                 </Link>
//             </div>
//             <div className="info w-[85%] relative">
//                 <IoCloseSharp
//                     onClick={() => handleDeleteCartItem(product?.id?._id)}
//                     className="cursor-pointer absolute top-[0px] right-[4px] text-[22px] link transition-all"
//                 />
//                 <span className="text-[13px]">{brand}</span>
//                 <h3 className="text-[15px] pr-[32px]">
//                     <Link className="link">{name}</Link>
//                 </h3>

//                 <Rating name="size-small" defaultValue={product?.rating || 5} readOnly size="small" />

//                 <div className="flex items-center gap-4 mt-2">
//                     <div className="relative">
//                         <span
//                             className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
//                             onClick={handleClickSize}
//                         >
//                             Size: {selectedSize} <GoTriangleDown />
//                         </span>

//                         <Menu
//                             id="size-menu"
//                             anchorEl={sizeAnchorEl}
//                             open={openSize}
//                             onClose={() => handleCloseSize(null)}
//                             MenuListProps={{
//                                 'aria-labelledby': 'basic-button',
//                             }}
//                         >
//                             <MenuItem onClick={() => handleCloseSize('S')}>S</MenuItem>
//                             <MenuItem onClick={() => handleCloseSize('M')}>M</MenuItem>
//                             <MenuItem onClick={() => handleCloseSize('L')}>L</MenuItem>
//                             <MenuItem onClick={() => handleCloseSize('XL')}>XL</MenuItem>
//                             <MenuItem onClick={() => handleCloseSize('XXL')}>XXL</MenuItem>
//                         </Menu>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <span
//                             className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-2 px-3 rounded-md cursor-pointer"
//                             onClick={() => handleDecreaseQuantity(product._id)}
//                         >
//                             <FaMinus className="text-[11px]" />
//                         </span>
//                         <span className="text-[12px] font-[600] py-1 rounded-md cursor-pointer">
//                             {selectedQuantity}
//                         </span>
//                         <span
//                             className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-2 px-3 rounded-md cursor-pointer"
//                             onClick={() => handleIncreaseQuantity(product._id)}
//                         >
//                             <FaPlus className="text-[11px]" />
//                         </span>
//                     </div>
//                 </div>

//                 <div className="flex items-center gap-4 mt-2">
//                     <span className="oldPrice line-through text-gray-500 text-[15px] font-[]500">
//                         {formatCurrency(oldPrice)}
//                     </span>
//                     <span className="price text-[14px] font-[600]">{formatCurrency(price)}</span>
//                     <span className="price text-primary text-[14px] font-[600]">Giảm {product?.discount}%</span>
//                 </div>
//             </div>
//         </div>
//     </td>
// </tr>
