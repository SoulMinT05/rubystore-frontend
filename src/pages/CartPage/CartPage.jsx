import React from 'react';

import '../CartPage/CartPage.css';

import { BsFillBagCheckFill } from 'react-icons/bs';
import { Button } from '@mui/material';
import CartItems from '../../components/CartItems/CartItems';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};
const CartPage = () => {
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
                                    2<span> sản phẩm trong giỏ hàng</span>
                                </span>
                            </p>
                        </div>

                        <CartItems size="S" quantity={1} />
                        <CartItems size="S" quantity={1} />
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
