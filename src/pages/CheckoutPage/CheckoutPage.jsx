import React from 'react';

import { Button, TextField } from '@mui/material';
import { BsFillBagCheckFill } from 'react-icons/bs';

import './CheckoutPage.css';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const CheckoutPage = () => {
    return (
        <section className="py-10">
            <div className="container flex gap-5">
                <div className="leftCol w-[70%]">
                    <div className="card bg-white shadow-md p-5 rounded-md w-full">
                        <h1>Thông tin cá nhân</h1>
                        <div className="w-full mt-5">
                            <div className="flex items-center gap-5 pb-5">
                                <div className="col w-[50%]">
                                    <TextField className="w-full" label="Họ và tên" variant="outlined" size="small" />
                                </div>
                                <div className="col w-[50%]">
                                    <TextField
                                        className="w-full"
                                        label="Số điện thoại"
                                        variant="outlined"
                                        size="small"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-5 pb-5">
                                <div className="col w-full">
                                    <TextField
                                        type="email"
                                        className="w-full"
                                        label="Email"
                                        variant="outlined"
                                        size="small"
                                    />
                                </div>
                            </div>

                            <h6 className="text-[14px] font-[500] mb-3">Địa chỉ</h6>

                            <div className="flex items-center gap-5 pb-5">
                                <div className="col w-full">
                                    <TextField
                                        className="w-full"
                                        label="Số nhà, tên đường"
                                        variant="outlined"
                                        size="small"
                                    />
                                </div>
                            </div>

                            <h6 className="text-[14px] font-[500] mb-3">Thành phố</h6>
                            <div className="flex items-center gap-5 pb-5">
                                <div className="col w-full">
                                    <TextField
                                        className="w-full"
                                        label="Thành phố, tỉnh"
                                        variant="outlined"
                                        size="small"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rightCol w-[30%]">
                    <div className="card shadow-md bg-white p-5 rounded-md">
                        <h2 className="mb-4">Đơn hàng của bạn</h2>
                        <div className="flex items-center justify-between py-3 border-t  border-b border-[rgba(0,0,0,0.1)]">
                            <span className="text-[14px] font-[600]">Sản phẩm</span>
                            <span className="text-[14px] font-[600]">Subtotal</span>
                        </div>

                        <div className="mb-5 scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2">
                            <div className="flex items-center justify-between py-2">
                                <div className="part1 flex items-center gap-3">
                                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                                        <img
                                            src="src/assets/jisoo.webp"
                                            className="w-full transition-all group-hover:scale-105"
                                            alt=""
                                        />
                                    </div>
                                    <div className="info">
                                        <div className="text-[14px]">Áo khoác con khỉ Dior..</div>
                                        <span className="text-[13px]">Số lượng : 1</span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-[500]">{formatCurrency(240000)}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div className="part1 flex items-center gap-3">
                                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                                        <img
                                            src="src/assets/jisoo.webp"
                                            className="w-full transition-all group-hover:scale-105"
                                            alt=""
                                        />
                                    </div>
                                    <div className="info">
                                        <div className="text-[14px]">Áo khoác con khỉ Dior..</div>
                                        <span className="text-[13px]">Số lượng : 1</span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-[500]">{formatCurrency(240000)}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div className="part1 flex items-center gap-3">
                                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                                        <img
                                            src="src/assets/jisoo.webp"
                                            className="w-full transition-all group-hover:scale-105"
                                            alt=""
                                        />
                                    </div>
                                    <div className="info">
                                        <div className="text-[14px]">Áo khoác con khỉ Dior..</div>
                                        <span className="text-[13px]">Số lượng : 1</span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-[500]">{formatCurrency(240000)}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div className="part1 flex items-center gap-3">
                                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                                        <img
                                            src="src/assets/jisoo.webp"
                                            className="w-full transition-all group-hover:scale-105"
                                            alt=""
                                        />
                                    </div>
                                    <div className="info">
                                        <div className="text-[14px]">Áo khoác con khỉ Dior..</div>
                                        <span className="text-[13px]">Số lượng : 1</span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-[500]">{formatCurrency(240000)}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div className="part1 flex items-center gap-3">
                                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                                        <img
                                            src="src/assets/jisoo.webp"
                                            className="w-full transition-all group-hover:scale-105"
                                            alt=""
                                        />
                                    </div>
                                    <div className="info">
                                        <div className="text-[14px]">Áo khoác con khỉ Dior..</div>
                                        <span className="text-[13px]">Số lượng : 1</span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-[500]">{formatCurrency(240000)}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div className="part1 flex items-center gap-3">
                                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                                        <img
                                            src="src/assets/jisoo.webp"
                                            className="w-full transition-all group-hover:scale-105"
                                            alt=""
                                        />
                                    </div>
                                    <div className="info">
                                        <div className="text-[14px]">Áo khoác con khỉ Dior..</div>
                                        <span className="text-[13px]">Số lượng : 1</span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-[500]">{formatCurrency(240000)}</span>
                            </div>
                        </div>
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

export default CheckoutPage;
