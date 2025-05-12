import React, { useEffect, useState } from 'react';

import '../CartPage/CartPage.css';

import { BsFillBagCheckFill } from 'react-icons/bs';
import { Button, Checkbox } from '@mui/material';
import CartItems from '../../components/CartItems/CartItems';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../apis/axiosClient';
import { getCart } from '../../redux/cartSlice';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};
const CartPage = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [selectedCarts, setSelectedCarts] = useState([]);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    useEffect(() => {
        const fetchCart = async () => {
            const { data } = await axiosClient.get('/api/user/cart');
            dispatch(
                getCart({
                    products: data?.cart?.products,
                    totalQuantity: data?.cart?.totalQuantity,
                    totalPrice: data?.cart?.totalPrice,
                }),
            );
        };
        fetchCart();
    }, [dispatch]);

    const handleSelectCart = (cartId) => {
        setSelectedCarts((prevSelectedCarts) => {
            let updatedSelectedCarts;

            if (prevSelectedCarts.includes(cartId)) {
                // Nếu đã chọn thì bỏ chọn
                updatedSelectedCarts = prevSelectedCarts.filter((id) => id !== cartId);
            } else {
                // Nếu chưa chọn thì chọn
                updatedSelectedCarts = [...prevSelectedCarts, cartId];
            }

            const allSelected = updatedSelectedCarts.length === cart?.products?.length;
            setIsCheckedAll(allSelected);

            return updatedSelectedCarts;
        });
    };

    const handleSelectAll = () => {
        const currentPageIds = cart.products.map((product) => product.id);
        if (!isCheckedAll) {
            // Thêm các sản phẩm ở trang hiện tại
            const newSelected = Array.from(new Set([...selectedCarts, ...currentPageIds]));
            setSelectedCarts(newSelected);
            setIsCheckedAll(true);
        } else {
            // Bỏ các sản phẩm ở trang hiện tại
            const newSelected = selectedCarts.filter((id) => !currentPageIds.includes(id));
            setSelectedCarts(newSelected);
            setIsCheckedAll(false);
        }
    };
    useEffect(() => {
        const allSelectedOnPage = cart.products.every((product) => selectedCarts.includes(product.id));
        setIsCheckedAll(allSelectedOnPage);
    }, [cart.products, selectedCarts]);
    return (
        <section className="section py-10 pb-10">
            <div className="container w-[80%] max-w-[80%] flex gap-5">
                <div className="leftPart w-[70%]">
                    <div className="shadow-md rounded-md bg-white">
                        <div className="py-2 px-3">
                            <h2>Giỏ hàng</h2>
                            <p className="mt-0">
                                Tổng {'  '}
                                <span className="font-bold text-primary">
                                    {cart?.products?.length}
                                    <span> sản phẩm trong giỏ hàng</span>
                                </span>
                            </p>
                        </div>

                        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                            <thead className="text-xs text-gray-700 uppercase bg-white">
                                <tr>
                                    <th scope="col" className="px-6 pr-0 py-2 ">
                                        <div className="w-[60px]">
                                            <Checkbox
                                                {...label}
                                                checked={isCheckedAll}
                                                onChange={handleSelectAll}
                                                size="small"
                                            />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-5 py-3 whitespace-nowrap">
                                        Sản phẩm
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart?.products?.length !== 0 &&
                                    cart?.products?.map((product, index) => {
                                        return (
                                            <CartItems
                                                key={index}
                                                cart={cart}
                                                product={product}
                                                size={product?.id?.productSize}
                                                quantity={product?.quantityProduct}
                                                isSelected={selectedCarts.includes(product.id)}
                                                handleSelect={() => handleSelectCart(product.id)}
                                            />
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="rightPart w-[30%]">
                    <div className="shadow-md rounded-md bg-white p-5 ">
                        <h3 className="py-3">Chi tiết</h3>
                        <hr />
                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Giá sản phẩm</span>
                            <span className="text-primary font-bold">{formatCurrency(200000)}</span>
                        </p>
                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Phí ship</span>
                            <span className="text-primary font-bold">{formatCurrency(0)}</span>
                        </p>
                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Áp dụng ở</span>
                            <span className="text-primary font-bold">Việt Nam</span>
                        </p>
                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Tổng tiền</span>
                            <span className="text-primary font-bold">{formatCurrency(200000)} </span>
                        </p>

                        <br />

                        <Button className="btn-org btn-login w-full flex gap-2">
                            <BsFillBagCheckFill className="text-[20px]" />
                            Thanh toán
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartPage;
