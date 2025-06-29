import React, { useEffect, useState } from 'react';

import '../CartPage/CartPage.css';

import { BsFillBagCheckFill } from 'react-icons/bs';
import { Button, Checkbox } from '@mui/material';
import CartItems from '../../components/CartItems/CartItems';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../apis/axiosClient';
import { getCart } from '../../redux/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [selectedCarts, setSelectedCarts] = useState([]);
    const [isLoadingCarts, setIsLoadingCarts] = useState(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    useEffect(() => {
        const fetchCart = async () => {
            const { data } = await axiosClient.get('/api/user/cart');
            dispatch(
                getCart({
                    products: data?.cart?.shoppingCart || [],
                    totalQuantity: data?.cart?.totalQuantity || 0,
                    totalPrice: data?.cart?.totalPrice || 0,
                })
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
        const currentPageIds = cart?.products?.map((product) => product._id);
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
        const allSelectedOnPage = cart?.products?.every((product) => selectedCarts.includes(product._id));
        setIsCheckedAll(allSelectedOnPage);
    }, [cart?.products, selectedCarts]);

    return (
        <section className="section py-10 pb-10">
            <div className="container w-[80%] max-w-[80%] flex gap-5">
                {/* <div className="leftPart w-[70%]">
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
                                                // product={product}
                                                // size={product?.id?.productSize}
                                                // quantity={product?.quantityProduct}
                                                // isSelected={selectedCarts.includes(product.id)}
                                                // handleSelect={() => handleSelectCart(product.id)}

                                                product={product?.product}
                                                productId={product?.product?._id}
                                                name={product?.name}
                                                brand={product?.brand}
                                                images={product?.images}
                                                oldPrice={product?.oldPrice}
                                                price={product?.price}
                                                size={product?.sizeProduct}
                                                quantity={product?.quantityProduct}
                                                isSelected={selectedCarts.includes(product.product._id)}
                                                handleSelect={() => handleSelectCart(product.product._id)}
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
                </div> */}
                <div className="relative overflow-x-auto mt-1 pb-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                        {!isLoadingCarts && cart?.products?.length > 0 && (
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
                                    <th scope="col" className="px-0 py-3 whitespace-nowrap">
                                        Sản phẩm
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Size
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Đơn giá
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Số lượng
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Số tiền
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                        )}

                        <tbody>
                            {isLoadingCarts === false ? (
                                cart?.products?.length > 0 &&
                                cart?.products?.map((item) => {
                                    return (
                                        <CartItems
                                            key={item?._id}
                                            cart={cart}
                                            cartId={item?._id}
                                            product={item?.product}
                                            productId={item?.product?._id}
                                            name={item?.name}
                                            brand={item?.brand}
                                            images={item?.images}
                                            oldPrice={item?.oldPrice}
                                            price={item?.price}
                                            size={item?.sizeProduct}
                                            quantity={item?.quantityProduct}
                                            isSelected={selectedCarts.includes(item._id)}
                                            handleSelect={() => handleSelectCart(item._id)}
                                        />
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={999}>
                                        <div className="flex items-center justify-center w-full min-h-[400px]">
                                            <CircularProgress color="inherit" />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default CartPage;
