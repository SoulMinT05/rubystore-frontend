import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { Button } from '@mui/material';

import { MyContext } from '../../App';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const CartPanel = ({ cart }) => {
    const context = useContext(MyContext);

    return (
        <>
            <div className="scroll w-full max-h-[580px] overflow-y-scroll overflow-x-hidden py-3 px-4">
                {cart?.products?.length > 0 &&
                    cart?.products?.map((item) => {
                        return (
                            <div
                                key={item?._id}
                                className="cartItem w-full flex items-center gap-4  border-[rgba(0,0,0,0.1)] pb-4"
                            >
                                <div className="cartItem w-full flex items-center gap-4  border-[rgba(0,0,0,0.1)] pb-4">
                                    <div
                                        onClick={() => context.toggleCartPanel(false)}
                                        className="img w-[25%] overflow-hidden h-[80px] rounded-md"
                                    >
                                        <Link to={`/product/${item?.product?.slug}`} className="block group">
                                            <img
                                                src={item?.images[0]}
                                                alt=""
                                                className="w-full group-hover:scale-105"
                                            />
                                        </Link>
                                    </div>
                                    <div className="info w-[75%] pr-4 relative">
                                        <h4
                                            onClick={() => context.toggleCartPanel(false)}
                                            className="text-[13px] lg:text-[14px] font-[500]"
                                        >
                                            <Link
                                                className="link transition-all"
                                                to={`/product/${item?.product?.slug}`}
                                            >
                                                {item?.name}
                                            </Link>
                                        </h4>
                                        <p className="flex items-center gap-5 mt-2 mb-2">
                                            <span className="text-[13px] lg:text-[14px]">
                                                Số lượng: {'    '}
                                                <span>{item?.quantityProduct}</span>
                                            </span>
                                            <span className="text-primary text-[13px] lg:text-[14px] font-bold">
                                                Giá: <span>{formatCurrency(item?.price)}</span>
                                            </span>
                                        </p>

                                        {/* <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all " /> */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <br />

            <div className="bottomSec absolute bottom-[10px] left-[10px] w-full overflow-hidden pr-5">
                <div className="flex items-center justify-between gap-5 px-3">
                    <Link to="/cart" className="text-[16px] w-full">
                        <Button className="btn-org btn-login w-full" onClick={() => context.toggleCartPanel(false)}>
                            Xem giỏ hàng
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default CartPanel;
