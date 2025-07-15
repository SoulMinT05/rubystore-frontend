import React, { useContext, useEffect, useState } from 'react';

import { Breadcrumbs, Button, CircularProgress, Divider, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { BsFillBagCheckFill } from 'react-icons/bs';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MyContext } from '../../App';
import axiosClient from '../../apis/axiosClient';

import './CheckoutPage.scss';
import { useDispatch } from 'react-redux';
import { removeOrderedItems } from '../../redux/cartSlice';
import { addNotification } from '../../redux/notificationSlice';
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const CheckoutPage = () => {
    const [searchParams] = useSearchParams();
    const tokenId = searchParams.get('state');

    const context = useContext(MyContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [checkoutData, setCheckoutData] = useState(null);
    const [isLoadingCheckoutToken, setIsLoadingCheckoutToken] = useState(true);
    const [note, setNote] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [isLoadingCreateOrder, setIsLoadingCreateOrder] = useState(false);

    useEffect(() => {
        const fetchCheckoutToken = async () => {
            if (!tokenId) return;

            setIsLoadingCheckoutToken(true);
            try {
                const { data } = await axiosClient.get(`/api/checkoutToken/${tokenId}`);
                if (data?.success) {
                    setCheckoutData(data.checkoutData); // hoặc data.checkoutToken
                }
            } catch (error) {
                console.error('Lỗi fetch checkout token:', error);
                context.openAlertBox('error', 'Đơn thanh toán đã hết hạn, hãy chọn lại sản phẩm');
                navigate('/cart');
            } finally {
                setIsLoadingCheckoutToken(false);
            }
        };

        fetchCheckoutToken();
    }, [tokenId]);

    const handleCreateOrder = async () => {
        setIsLoadingCreateOrder(true);
        try {
            const { data } = await axiosClient.post('/api/order/createOrder', {
                tokenId,
                paymentMethod,
                note,
            });
            if (data?.success) {
                context.openAlertBox('success', data?.message);
                dispatch(removeOrderedItems(data?.orderedItemIds));
                dispatch(addNotification(data?.newNotification));
                navigate('/cart');
            }
        } catch (error) {
            console.error('error: ', error);
        } finally {
            setIsLoadingCreateOrder(false);
        }
    };

    return (
        <section className="py-10">
            <div className="pb-2 pt-0  container w-[80%] max-w-[80%] flex items-center justify-between">
                <div className="">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="/" className="link transition !text-[16px]">
                            Trang chủ
                        </Link>
                        <Link underline="hover" color="inherit" className="link transition !text-[16px]">
                            Thanh toán
                        </Link>
                    </Breadcrumbs>
                </div>
            </div>
            <div style={{ marginTop: '16px' }} className="container w-[80%] max-w-[80%] mx-auto flex gap-5 my-4">
                <div className="shadow-md rounded-md bg-white p-5 w-full ">
                    <h1 className="text-[16px] text-primary font-[500]">Địa chỉ nhận hàng</h1>
                    <div className="mt-4 flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-[14px] font-[600]">{context.userInfo?.name}</span>
                            <span className="text-[14px] font-[600]">{context.userInfo?.phoneNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[14px] font-[400]">
                                Đường {context.userInfo?.address?.streetLine},
                            </span>
                            <span className="text-[14px] font-[400]">Phường {context.userInfo?.address?.ward},</span>
                            <span className="text-[14px] font-[400]">Quận {context.userInfo?.address?.district},</span>
                            <span className="text-[14px] font-[400]">Thành phố {context.userInfo?.address?.city}</span>
                        </div>
                        <span
                            onClick={() => {
                                context.setIsOpenFullScreenPanel({
                                    open: true,
                                    model: 'Cập nhật địa chỉ',
                                });
                            }}
                            className="text-[14px] font-[500] ml-4 text-primary cursor-pointer"
                        >
                            Thay đổi
                        </span>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '16px' }} className="container w-[80%] max-w-[80%] mx-auto flex gap-5">
                <div className="relative overflow-x-auto mt-1 pb-5 w-full ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                        {!isLoadingCheckoutToken && checkoutData?.selectedCartItems?.length > 0 && (
                            <thead className="text-xs text-gray-700 uppercase bg-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
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
                                        Thành tiền
                                    </th>
                                </tr>
                            </thead>
                        )}
                        <tbody>
                            {isLoadingCheckoutToken === false ? (
                                checkoutData?.selectedCartItems?.length > 0 &&
                                checkoutData?.selectedCartItems?.map((item) => {
                                    return (
                                        <tr key={item?._id} className="odd:bg-white  even:bg-gray-50 border-b">
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-4 w-[470px]">
                                                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                                        <Link to={`/product/${item?.product?._id}`}>
                                                            <img
                                                                src={item?.images[0]}
                                                                className="w-full group-hover:scale-105 transition-all"
                                                                alt=""
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="info w-[75%]">
                                                        <h3 className="text-[12px] font-[600] leading-4 hover:text-primary transition-all">
                                                            <Link to={`/product/${item?.product?._id}`}>
                                                                {item?.name}
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-3 w-[120px]">
                                                <div className="relative w-full">
                                                    <button
                                                        id="size-button"
                                                        aria-haspopup="true"
                                                        className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md"
                                                    >
                                                        Size: {item?.sizeProduct}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex gap-3 items-center w-[220px]">
                                                    <span className="oldPrice line-through leading-3 text-gray-500 text-[12px] font-[500]">
                                                        {formatCurrency(item?.oldPrice)}
                                                    </span>
                                                    <span className="price text-primary text-[12px] font-[600]">
                                                        {formatCurrency(item?.price)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <p className="w-[80px] text-[12px]">{item?.quantityProduct}</p>
                                            </td>
                                            <td className="px-6 py-3">
                                                <p className="w-[160px] text-[12px]">
                                                    {formatCurrency(item?.quantityProduct * item?.price)}
                                                </p>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={999}>
                                        <div
                                            // style={{ width: sectionWidth / 2 }}
                                            className="flex items-center justify-center mx-auto min-h-[400px]"
                                        >
                                            <CircularProgress color="inherit" />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{ marginTop: '16px' }} className="container w-[80%] max-w-[80%] mx-auto flex gap-5 my-4">
                <div className="shadow-md rounded-md bg-white p-5 w-full flex items-center gap-4 ">
                    <h1 className="text-[16px] font-[500] whitespace-nowrap">Lời nhắn:</h1>
                    <TextField
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        label="Lưu ý cho người bán"
                        variant="outlined"
                        size="small"
                        className="w-full ml-4"
                    />
                </div>
            </div>
            <div style={{ marginTop: '8px' }} className="container w-[80%] max-w-[80%] mx-auto flex gap-5 my-4">
                <div className="shadow-md rounded-md bg-white p-5 w-full  ">
                    <div className="flex items-center justify-between min-h-[90px] ">
                        <h1 className="text-[16px] font-[500] whitespace-nowrap">Phương thức thanh toán</h1>
                        <Select
                            labelId="demo-simple-select-label"
                            id="paymentMethods"
                            size="small"
                            className="w-full ml-4"
                            label="Phương thức thanh toán"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <MenuItem value="cod">Thanh toán khi nhận hàng</MenuItem>
                            <MenuItem value="momo">Ví Momo</MenuItem>
                            <MenuItem value="vnpay">VNPay</MenuItem>
                        </Select>
                    </div>
                    <Divider />
                    <div className="py-4">
                        <div className="ml-auto min-h-[40px] w-fit text-right flex items-center gap-12">
                            <span className="text-[14px] font-[400]">Tổng số lượng</span>
                            <span className="text-[14px] font-[400] w-[202px]">{checkoutData?.totalQuantity}</span>
                        </div>
                        <div className="ml-auto min-h-[40px] w-fit text-right flex items-center gap-12">
                            <span className="text-[14px] font-[400]">Tổng tiền đơn</span>
                            <span className="text-[14px] font-[400] w-[202px]">
                                {formatCurrency(checkoutData?.totalPrice)}
                            </span>
                        </div>
                        <div className="ml-auto min-h-[40px] w-fit text-right flex items-center gap-12">
                            <span className="text-[14px] font-[400]">Tổng tiền phí vận chuyển</span>
                            <span className="text-[14px] font-[400] w-[202px]">{formatCurrency(0)}</span>
                        </div>
                        <div className="ml-auto min-h-[40px] w-fit text-right flex items-center gap-12">
                            <span className="text-[14px] font-[400]">Voucher</span>
                            <span className="text-[14px] font-[400] w-[202px]">
                                {checkoutData?.discountType === 'percent'
                                    ? `${checkoutData?.discountValue}%`
                                    : `${formatCurrency(checkoutData?.discountValue)}`}
                            </span>
                        </div>
                        <div className="ml-auto min-h-[40px] w-fit text-right flex items-center gap-12">
                            <span className="text-[14px] font-[400]">Tổng thanh toán</span>
                            <span className="text-[28px] font-[500] text-primary w-[202px]">
                                {formatCurrency(checkoutData?.finalPrice)}
                            </span>
                        </div>
                    </div>
                    <Divider />
                    <div className="flex items-center justify-between min-h-[90px] ">
                        <h1 className="text-[14px] font-[400]">
                            Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
                            <Link className="text-[#4080ee]"> Điều khoản RubyStore</Link>
                        </h1>
                        <Button onClick={handleCreateOrder} className="btn-primary btn-md !w-[210px] !h-[40px] ">
                            {isLoadingCreateOrder ? (
                                <CircularProgress
                                    className="circ-white"
                                    size={20}
                                    thickness={5}
                                    sx={{ color: 'white' }}
                                />
                            ) : (
                                'Đặt hàng'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
