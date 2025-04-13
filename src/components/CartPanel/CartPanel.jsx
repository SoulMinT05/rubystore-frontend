import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { MdOutlineDeleteOutline } from 'react-icons/md';

import '../CartPanel/CartPanel.css';
import { Button } from '@mui/material';
import { MyContext } from '../../App';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const CartPanel = () => {
    const context = useContext(MyContext);
    return (
        <>
            <div className="scroll w-full max-h-[380px] overflow-y-scroll overflow-x-hidden py-3 px-4">
                <div className="cartItem w-full flex items-center gap-4  border-[rgba(0,0,0,0.1)] pb-4">
                    <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
                        <Link to="/product/2" className="block group">
                            <img
                                src="https://vtimes.com.au/up/images/10-24/4039381-jisoo-blackpink-me-dong-p-0.jpg"
                                alt=""
                                className="w-full group-hover:scale-105"
                            />
                        </Link>
                    </div>
                    <div className="info w-[75%] pr-8 relative">
                        <h4 className="text-[14px] font-[500]">
                            <Link className="link transition-all" to="/product/2">
                                Áo khoác xanh nhạt con khỉ Dior
                            </Link>
                        </h4>
                        <p className="flex items-center gap-5 mt-2 mb-2">
                            <span>
                                Số lượng:
                                <span>2</span>
                            </span>
                            <span className="text-primary font-bold">
                                Giá: <span>{formatCurrency(250000)}</span>
                            </span>
                        </p>

                        <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all " />
                    </div>
                </div>
                <div className="cartItem w-full flex items-center gap-4  border-[rgba(0,0,0,0.1)] pb-4">
                    <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
                        <Link to="/product/2" className="block group">
                            <img
                                src="https://vtimes.com.au/up/images/10-24/4039381-jisoo-blackpink-me-dong-p-0.jpg"
                                alt=""
                                className="w-full group-hover:scale-105"
                            />
                        </Link>
                    </div>
                    <div className="info w-[75%] pr-8 relative">
                        <h4 className="text-[14px] font-[500]">
                            <Link className="link transition-all" to="/product/2">
                                Áo khoác xanh nhạt con khỉ Dior
                            </Link>
                        </h4>
                        <p className="flex items-center gap-5 mt-2 mb-2">
                            <span>
                                Số lượng: <span>2</span>
                            </span>
                            <span className="text-primary font-bold">
                                Giá: <span>{formatCurrency(250000)}</span>
                            </span>
                        </p>

                        <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all " />
                    </div>
                </div>
                <div className="cartItem w-full flex items-center gap-4  border-[rgba(0,0,0,0.1)] pb-4">
                    <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
                        <Link to="/product/2" className="block group">
                            <img
                                src="https://vtimes.com.au/up/images/10-24/4039381-jisoo-blackpink-me-dong-p-0.jpg"
                                alt=""
                                className="w-full group-hover:scale-105"
                            />
                        </Link>
                    </div>
                    <div className="info w-[75%] pr-8 relative">
                        <h4 className="text-[14px] font-[500]">
                            <Link className="link transition-all" to="/product/2">
                                Áo khoác xanh nhạt con khỉ Dior
                            </Link>
                        </h4>
                        <p className="flex items-center gap-5 mt-2 mb-2">
                            <span>
                                Số lượng: <span>2</span>
                            </span>
                            <span className="text-primary font-bold">
                                Giá: <span>{formatCurrency(250000)}</span>
                            </span>
                        </p>

                        <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all " />
                    </div>
                </div>

                <div className="cartItem w-full flex items-center gap-4  border-[rgba(0,0,0,0.1)] pb-4">
                    <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
                        <Link to="/product/2" className="block group">
                            <img
                                src="https://vtimes.com.au/up/images/10-24/4039381-jisoo-blackpink-me-dong-p-0.jpg"
                                alt=""
                                className="w-full group-hover:scale-105"
                            />
                        </Link>
                    </div>
                    <div className="info w-[75%] pr-8 relative">
                        <h4 className="text-[14px] font-[500]">
                            <Link className="link transition-all" to="/product/2">
                                Áo khoác xanh nhạt con khỉ Dior
                            </Link>
                        </h4>
                        <p className="flex items-center gap-5 mt-2 mb-2">
                            <span>
                                Số lượng: <span>2</span>
                            </span>
                            <span className="text-primary font-bold">
                                Giá: <span>{formatCurrency(250000)}</span>
                            </span>
                        </p>

                        <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all " />
                    </div>
                </div>
                <div className="cartItem w-full flex items-center gap-4  border-[rgba(0,0,0,0.1)] pb-4">
                    <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
                        <Link to="/product/2" className="block group">
                            <img
                                src="https://vtimes.com.au/up/images/10-24/4039381-jisoo-blackpink-me-dong-p-0.jpg"
                                alt=""
                                className="w-full group-hover:scale-105"
                            />
                        </Link>
                    </div>
                    <div className="info w-[75%] pr-8 relative">
                        <h4 className="text-[14px] font-[500]">
                            <Link className="link transition-all" to="/product/2">
                                Áo khoác xanh nhạt con khỉ Dior
                            </Link>
                        </h4>
                        <p className="flex items-center gap-5 mt-2 mb-2">
                            <span>
                                Số lượng: <span>2</span>
                            </span>
                            <span className="text-primary font-bold">
                                Giá: <span>{formatCurrency(250000)}</span>
                            </span>
                        </p>

                        <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all " />
                    </div>
                </div>
                <div className="cartItem w-full flex items-center gap-4  border-[rgba(0,0,0,0.1)] pb-4">
                    <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
                        <Link to="/product/2" className="block group">
                            <img
                                src="https://vtimes.com.au/up/images/10-24/4039381-jisoo-blackpink-me-dong-p-0.jpg"
                                alt=""
                                className="w-full group-hover:scale-105"
                            />
                        </Link>
                    </div>
                    <div className="info w-[75%] pr-8 relative">
                        <h4 className="text-[14px] font-[500]">
                            <Link className="link transition-all" to="/product/2">
                                Áo khoác xanh nhạt con khỉ Dior
                            </Link>
                        </h4>
                        <p className="flex items-center gap-5 mt-2 mb-2">
                            <span>
                                Số lượng: <span>2</span>
                            </span>
                            <span className="text-primary font-bold">
                                Giá: <span>{formatCurrency(250000)}</span>
                            </span>
                        </p>

                        <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all " />
                    </div>
                </div>
            </div>

            <br />

            <div className="bottomSec absolute bottom-[10px] left-[10px] w-full overflow-hidden pr-5">
                <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col">
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[14px] font-[600]">Tổng số lượng</span>
                        <span className="text-primary font-bold">5</span>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[14px] font-[600]">Tổng giá</span>
                        <span className="text-primary font-bold">{formatCurrency(500000)}</span>
                    </div>
                </div>
                <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col">
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[14px] font-[600]">Phí giao hàng</span>
                        <span className="text-primary font-bold">{formatCurrency(20000)}</span>
                    </div>
                </div>
                <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col">
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[14px] font-[600]">Tổng tiền</span>
                        <span className="text-primary font-bold">{formatCurrency(1400000)}</span>
                    </div>
                </div>

                <br />

                <div className="flex items-center justify-between gap-5 px-3">
                    <Button className="btn-org btn-login w-[50%]" onClick={() => context.toggleCartPanel(false)}>
                        <Link to="/cart" className="text-[16px]">
                            Xem giỏ hàng
                        </Link>
                    </Button>
                    <Button className="btn-org btn-login w-[50%]" onClick={() => context.toggleCartPanel(false)}>
                        <Link to="/checkout" className="text-[16px]">
                            Thanh toán
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CartPanel;
