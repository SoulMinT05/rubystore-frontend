import React, { useContext, useEffect, useState } from 'react';

import { Button, CircularProgress, Divider, Tabs } from '@mui/material';
import { IoCloseSharp } from 'react-icons/io5';
import { IoKeyOutline } from 'react-icons/io5';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './OrderHistoryPage.scss';
import AccountSidebar from '../../components/AccountSidebar/AccountSidebar';
import BadgeOrderStatus from '../../components/BadgeOrderStatus/BadgeOrderStatus';
import axiosClient from '../../apis/axiosClient';
import { MyContext } from '../../App';
import { cancelOrderStatus, fetchOrders, updateOrderStatus } from '../../redux/orderSlice';
import { socket } from '../../config/socket';
import { addNotification } from '../../redux/notificationSlice';
import AccountSidebarLayout from '../../layouts/AccountSidebarLayout';
import noOrder from '../../assets/no-message.png';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const OrderHistoryPage = () => {
    const context = useContext(MyContext);
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);
    const [openOrderDetailsModal, setOpenOrderDetailsModal] = useState({
        open: false,
        order: null,
    });
    const [cancelOrder, setCancelOrder] = useState(false);
    const [orderStatus, setOrderStatus] = useState('Tất cả');
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        socket.on('updateOrderStatus', (data) => {
            console.log('Client nhận được sự kiện update order từ admin:', data);
            dispatch(
                updateOrderStatus({
                    orderId: data?.orderId,
                    newStatus: data?.newStatus,
                })
            );
        });
        return () => {
            socket.off('updateOrderStatus');
        };
    }, []);

    useEffect(() => {
        setIsLoadingOrders(true);

        const handleTimeout = setTimeout(() => {
            const getOrders = async () => {
                try {
                    let url = '/api/order';
                    if (orderStatus !== 'Tất cả') {
                        url += `?orderStatus=${orderStatus}`;
                    }

                    const { data } = await axiosClient.get(url);
                    if (data.success) {
                        dispatch(fetchOrders(data?.orders));
                    }
                } catch (error) {
                    console.log('error: ', error);
                    context.openAlertBox('error', error.response.data.message);
                } finally {
                    setIsLoadingOrders(false);
                }
            };
            getOrders();
        }, import.meta.env.VITE_TIME_OUT_LOADING);

        return () => {
            clearTimeout(handleTimeout);
        };
    }, [orderStatus]);

    const handleChangeOrderStatus = (event, newOrderStatus) => {
        setOrderStatus(newOrderStatus);
    };

    const handleCloseOrderDetailsModal = () => {
        setOpenOrderDetailsModal((prev) => ({
            ...prev,
            open: false,
        }));
        setTimeout(() => {
            setOpenOrderDetailsModal({
                open: false,
                order: null,
            });
        }, 300);
    };

    const printPDF = async () => {
        const element = document.getElementById('order-details');
        if (!element) {
            console.error('Không tìm thấy element');
            return;
        }

        // Đảm bảo ảnh đã load xong
        const images = element.querySelectorAll('img');
        await Promise.all(
            Array.from(images).map((img) => {
                if (img.complete) return Promise.resolve();
                return new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            })
        );

        // Delay nhỏ để chắc chắn ảnh được render hoàn chỉnh
        setTimeout(async () => {
            try {
                const canvas = await html2canvas(element, {
                    useCORS: true,
                    scale: 2,
                    backgroundColor: '#ffffff', // fix background nếu transparent
                });

                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                const pdf = new jsPDF('p', 'mm', 'a4');

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('order-details.pdf');
            } catch (err) {
                console.error('Lỗi tạo PDF:', err);
            }
        }, 300);
    };

    const handleCancelOrder = async (orderId) => {
        setCancelOrder(true);
        try {
            const { data } = await axiosClient.post('/api/order/cancelOrderFromUser', {
                orderId,
            });
            console.log('dataCancel: ', data);
            if (data?.success) {
                context.openAlertBox('success', data.message);
                dispatch(
                    cancelOrderStatus({
                        orderId: data?.order?._id,
                    })
                );
                dispatch(addNotification(data.newCancelNotification));
                handleCloseOrderDetailsModal();
            }
        } catch (error) {
            console.log('error: ', error);
            context.openAlertBox('error', error.response.data.message);
        } finally {
            setCancelOrder(false);
        }
    };

    return (
        <AccountSidebarLayout>
            <div className="bg-white p-5 shadow-md rounded-md">
                <div className="py-2 px-3">
                    <h2 className="pb-3">Lịch sử đơn hàng</h2>

                    <p className="mt-0">
                        Tổng tất cả {'  '}
                        <span className="font-bold text-primary">
                            {orders?.length}
                            <span> đơn hàng</span>
                        </span>
                    </p>

                    <hr />

                    <Box sx={{ width: '100%' }}>
                        <Tabs
                            value={orderStatus}
                            onChange={handleChangeOrderStatus}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="wrapped label tabs example"
                        >
                            <Tab className="link !px-10 " label="Tất cả" value="Tất cả" />
                            <Tab className="link !px-10 " label="Đang xử lý" value="pending" />
                            <Tab className="link !px-10 " label="Đang giao hàng" value="shipping" />
                            <Tab className="link !px-10 " label="Đã giao hàng" value="delivered" />
                            <Tab className="link !px-10 " label="Đã hủy" value="cancelled" />
                        </Tabs>
                    </Box>

                    <hr />

                    {isLoadingOrders ? (
                        <div className="flex items-center justify-center w-full min-h-[400px]">
                            <CircularProgress color="inherit" />
                        </div>
                    ) : (
                        <div className="relative overflow-x-auto mt-5">
                            {orders?.length > 0 ? (
                                <div className="">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                        <thead className="text-xs text-gray-700 uppercase bg-white">
                                            <tr>
                                                <th className="px-4 py-3 whitespace-nowrap">Mã đơn hàng</th>
                                                <th className="px-4 py-3 whitespace-nowrap">Sản phẩm</th>
                                                <th className="px-4 py-3 whitespace-nowrap">Size</th>
                                                <th className="px-4 py-3 whitespace-nowrap">Phương thức thanh toán</th>
                                                <th className="px-4 py-3 whitespace-nowrap">Thành tiền</th>
                                                <th className="px-4 py-3 whitespace-nowrap">Trạng thái đơn hàng</th>
                                                <th className="px-4 py-3 whitespace-nowrap">Ngày đặt</th>
                                                <th className="px-4 py-3 whitespace-nowrap">Thao tác</th>
                                                <th className="px-4 py-3 whitespace-nowrap">Đánh giá sản phẩm</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders?.slice(0, visibleCount)?.map((order) =>
                                                order.selectedCartItems.map((item, idx) => {
                                                    return (
                                                        <tr key={`${order._id}-${idx}`} className="bg-white border-b">
                                                            {idx === 0 && (
                                                                <>
                                                                    <td
                                                                        className="px-6 py-4"
                                                                        rowSpan={order.selectedCartItems.length}
                                                                    >
                                                                        <span
                                                                            onClick={() =>
                                                                                setOpenOrderDetailsModal({
                                                                                    open: true,
                                                                                    order: order,
                                                                                })
                                                                            }
                                                                            className="cursor-pointer text-primary"
                                                                        >
                                                                            {order._id}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <Link to={`/product/${item?.product?.slug}`}>
                                                                            <div className="flex gap-2 items-center rounded-md overflow-hidden group">
                                                                                <img
                                                                                    src={item?.images[0]}
                                                                                    alt=""
                                                                                    className="w-[70px] h-[70px] object-cover rounded-md group-hover:scale-105 transition-all cursor-pointer"
                                                                                />
                                                                            </div>
                                                                        </Link>
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <span className="text-blue">
                                                                            {item?.sizeProduct}
                                                                        </span>
                                                                    </td>
                                                                    <td
                                                                        className="px-6 py-4"
                                                                        rowSpan={order.selectedCartItems.length}
                                                                    >
                                                                        <span className="text-blue">
                                                                            {order.paymentMethod === 'cod' &&
                                                                                'Thanh toán khi nhận hàng'}
                                                                            {order.paymentMethod === 'momo' &&
                                                                                'Thanh toán bằng Momo'}
                                                                            {order.paymentMethod === 'vnpay' &&
                                                                                'Thanh toán bằng VnPay'}
                                                                        </span>
                                                                    </td>
                                                                    <td
                                                                        className="px-6 py-4"
                                                                        rowSpan={order.selectedCartItems.length}
                                                                    >
                                                                        <span className="text-primary">
                                                                            {formatCurrency(order.finalPrice)}
                                                                        </span>
                                                                    </td>
                                                                    <td
                                                                        className="px-6 py-4"
                                                                        rowSpan={order.selectedCartItems.length}
                                                                    >
                                                                        <BadgeOrderStatus status={order.orderStatus} />
                                                                    </td>
                                                                    <td
                                                                        className="px-6 py-4"
                                                                        rowSpan={order.selectedCartItems.length}
                                                                    >
                                                                        {formatDate(order.createdAt)}
                                                                    </td>
                                                                    <td
                                                                        className="px-6 py-4 whitespace-nowrap cursor-pointer"
                                                                        onClick={() =>
                                                                            setOpenOrderDetailsModal({
                                                                                open: true,
                                                                                order: order,
                                                                            })
                                                                        }
                                                                        rowSpan={order.selectedCartItems.length}
                                                                    >
                                                                        <span className="text-gray-500 link transition-all">
                                                                            Xem chi tiết
                                                                        </span>
                                                                    </td>
                                                                </>
                                                            )}

                                                            {idx !== 0 && (
                                                                <>
                                                                    <td className="px-6 py-4">
                                                                        <Link to={`/product/${item?.product?.slug}`}>
                                                                            <div className="flex gap-2 items-center rounded-md overflow-hidden group">
                                                                                <img
                                                                                    src={item?.images[0]}
                                                                                    alt=""
                                                                                    className="w-[70px] h-[70px] object-cover rounded-md group-hover:scale-105 transition-all cursor-pointer"
                                                                                />
                                                                            </div>
                                                                        </Link>
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <span className="text-blue">
                                                                            {item?.sizeProduct}
                                                                        </span>
                                                                    </td>
                                                                </>
                                                            )}
                                                            <td className="px-6 py-4 ">
                                                                {item?.isReviewed ? (
                                                                    <span className="text-green-500 font-medium">
                                                                        Đã đánh giá
                                                                    </span>
                                                                ) : order?.orderStatus === 'delivered' ? (
                                                                    <Link
                                                                        to={`/product/${item?.product?.slug}?tab=review&size=${item?.sizeProduct}`}
                                                                    >
                                                                        <span className="text-blue-500 cursor-pointer hover:underline transition-all">
                                                                            Đánh giá ngay
                                                                        </span>
                                                                    </Link>
                                                                ) : (
                                                                    <span className="text-gray-400 italic">
                                                                        Chờ giao hàng để đánh giá
                                                                    </span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                        </tbody>

                                        {/* Dialog */}
                                        {orders?.length > 0 && (
                                            <Dialog
                                                disableScrollLock
                                                fullWidth={true}
                                                maxWidth="lg"
                                                open={openOrderDetailsModal.open}
                                                onClose={handleCloseOrderDetailsModal}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                className="orderDetailsModal"
                                            >
                                                <DialogContent>
                                                    <div className="bg-[#fff] p-4 container">
                                                        <div className="w-full orderDetailsModalContainer relative">
                                                            <Button
                                                                className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[6px] right-[15px] !bg-[#f1f1f1]"
                                                                onClick={handleCloseOrderDetailsModal}
                                                            >
                                                                <IoCloseSharp className="text-[20px]" />
                                                            </Button>

                                                            <div
                                                                className="container bg-white p-6 rounded-lg shadow-md"
                                                                id="order-details"
                                                            >
                                                                <h2 className="text-gray-700 text-xl border-b pb-4 mb-4 font-[600]">
                                                                    Chi tiết đơn hàng
                                                                </h2>
                                                                <h3 className="text-gray-700 text-lg font-[600] mt-6 mb-4">
                                                                    Thông tin đơn hàng
                                                                </h3>
                                                                {/* Order Info */}
                                                                <div className="space-y-4">
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-gray-500">Order ID</span>
                                                                        <span className="text-primary">
                                                                            {openOrderDetailsModal?.order?._id}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-gray-500">
                                                                            Phương thức thanh toán
                                                                        </span>
                                                                        <span className="text-gray-700 text-blue">
                                                                            {openOrderDetailsModal?.order
                                                                                ?.paymentMethod === 'cod' &&
                                                                                'Thanh toán khi nhận hàng'}
                                                                            {openOrderDetailsModal?.order
                                                                                ?.paymentMethod === 'momo' &&
                                                                                'Thanh toán bằng Momo'}
                                                                            {openOrderDetailsModal?.order
                                                                                ?.paymentMethod === 'vnoay' &&
                                                                                'Thanh toán bằng VnPay'}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-gray-500">
                                                                            Ngày đặt hàng
                                                                        </span>
                                                                        <span className="text-gray-700">
                                                                            {formatDate(
                                                                                openOrderDetailsModal?.order?.createdAt
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-gray-500">
                                                                            Trạng thái
                                                                        </span>
                                                                        <span className="text-gray-700">
                                                                            <BadgeOrderStatus
                                                                                status={
                                                                                    openOrderDetailsModal?.order
                                                                                        ?.orderStatus
                                                                                }
                                                                            />
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* Customer Info */}
                                                                <h3 className="text-gray-700 text-xl pb-4 mb-1 mt-6 font-[600]">
                                                                    Thông tin khách hàng
                                                                </h3>
                                                                <div className="space-y-4">
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-gray-500">Họ và tên</span>
                                                                        <span className="text-gray-700">
                                                                            {openOrderDetailsModal?.order?.userId?.name}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-gray-500">Email</span>
                                                                        <span className="text-gray-700">
                                                                            {
                                                                                openOrderDetailsModal?.order?.userId
                                                                                    ?.email
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-gray-500">
                                                                            Số điện thoại
                                                                        </span>
                                                                        <span className="text-gray-700">
                                                                            {
                                                                                openOrderDetailsModal?.order?.userId
                                                                                    ?.phoneNumber
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-gray-500">Địa chỉ</span>
                                                                        <span className="text-gray-700">
                                                                            {`Đường ${
                                                                                openOrderDetailsModal?.order
                                                                                    ?.shippingAddress?.streetLine || ''
                                                                            }, Phường ${
                                                                                openOrderDetailsModal?.order
                                                                                    ?.shippingAddress?.ward || ''
                                                                            }, Quận ${
                                                                                openOrderDetailsModal?.order
                                                                                    ?.shippingAddress?.district || ''
                                                                            }, Thành phố ${
                                                                                openOrderDetailsModal?.order
                                                                                    ?.shippingAddress?.city || ''
                                                                            }`}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* Product Info */}
                                                                <h3 className="text-gray-700 text-xl pb-4 mb-1 mt-6 font-[600]">
                                                                    Thông tin sản phẩm
                                                                </h3>
                                                                <div className="mt-4">
                                                                    {openOrderDetailsModal?.order?.selectedCartItems
                                                                        ?.length > 0 &&
                                                                        openOrderDetailsModal?.order?.selectedCartItems?.map(
                                                                            (cartItem) => {
                                                                                return (
                                                                                    <div
                                                                                        key={cartItem?._id}
                                                                                        className="flex items-center bg-gray-50 p-4 rounded-lg"
                                                                                    >
                                                                                        <div className="w-[20%] group cursor-pointer">
                                                                                            <img
                                                                                                alt="Image of an Apple iMac"
                                                                                                className="w-[70px] h-[70px] object-cover rounded-md mr-4 group-hover:scale-105 transition-all"
                                                                                                src={
                                                                                                    cartItem?.images[0]
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                        <div className="mx-4 w-[47%]">
                                                                                            <p className="text-gray-700">
                                                                                                {cartItem?.name}
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className="w-[33%] flex items-center justify-end gap-5">
                                                                                            <p className="text-gray-700">
                                                                                                {cartItem?.sizeProduct}
                                                                                            </p>
                                                                                            <p className="text-gray-700">
                                                                                                {
                                                                                                    cartItem?.quantityProduct
                                                                                                }
                                                                                            </p>
                                                                                            <p className="text-gray-700 font-[600]">
                                                                                                {formatCurrency(
                                                                                                    cartItem?.price
                                                                                                )}
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )}

                                                                    {/* Price info */}
                                                                    <h3 className="text-gray-700 text-xl pb-4 mb-1 mt-6 font-[600]">
                                                                        Tổng quan giá
                                                                    </h3>
                                                                    <div className="space-y-4">
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="text-gray-500">
                                                                                Tổng số lượng
                                                                            </span>
                                                                            <span className="text-gray-700">
                                                                                {
                                                                                    openOrderDetailsModal?.order
                                                                                        ?.totalQuantity
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="text-gray-500">
                                                                                Tổng tiền đơn
                                                                            </span>
                                                                            <span className="text-gray-700">
                                                                                {formatCurrency(
                                                                                    openOrderDetailsModal?.order
                                                                                        ?.totalPrice
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="text-gray-500">
                                                                                Tổng tiền phí vận chuyển
                                                                            </span>
                                                                            <span className="text-gray-700">
                                                                                {formatCurrency(
                                                                                    openOrderDetailsModal?.order
                                                                                        ?.shippingFee
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="text-gray-500">
                                                                                Voucher
                                                                            </span>
                                                                            <span className="text-gray-700">
                                                                                {openOrderDetailsModal?.order
                                                                                    ?.discountType === 'percent'
                                                                                    ? `${openOrderDetailsModal?.order?.discountValue}%`
                                                                                    : `${formatCurrency(
                                                                                          openOrderDetailsModal?.order
                                                                                              ?.discountValue
                                                                                      )}`}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-1 mt-6">
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="text-gray-700 text-xl pb-4 font-[600]">
                                                                                Tổng thanh toán
                                                                            </span>
                                                                            <span className="font-[600] text-[28px] text-primary">
                                                                                {formatCurrency(
                                                                                    openOrderDetailsModal?.order
                                                                                        ?.finalPrice
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    <Divider />
                                                                </div>
                                                            </div>
                                                            <div className="p-6 rounded-lg">
                                                                <div className="flex items-center justify-between gap-3 mt-4">
                                                                    <Button
                                                                        className="btn-org btn-login"
                                                                        onClick={printPDF}
                                                                    >
                                                                        In đơn hàng
                                                                    </Button>
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleCancelOrder(
                                                                                openOrderDetailsModal?.order?._id
                                                                            )
                                                                        }
                                                                        className="btn-border btn-login"
                                                                    >
                                                                        {cancelOrder ? (
                                                                            <CircularProgress color="inherit" />
                                                                        ) : (
                                                                            'Huỷ đơn'
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </table>
                                    {visibleCount < orders?.length && (
                                        <div className="text-center my-4">
                                            <button
                                                onClick={() => setVisibleCount((prev) => prev + 10)}
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                Xem thêm
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center flex-col m-auto">
                                    <div className="">
                                        <img className="w-[100px] h-[100px] " src={noOrder} alt="" />
                                    </div>
                                    <span className="text-[14px] font-[500] my-[14px] ">Chưa có đơn hàng nào.</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* <div className="relative overflow-x-auto mt-5">
                        {orders?.length === 0 && (
                            <div className="flex items-center flex-col m-auto">
                                <div className="">
                                    <img className="w-[100px] h-[100px] " src={noOrder} alt="" />
                                </div>
                                <span className="text-[14px] font-[500] my-[14px] ">Chưa có đơn hàng nào.</span>
                            </div>
                        )}

                        {orders?.length > 0 && (
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                <thead className="text-xs text-gray-700 uppercase bg-white">
                                    <tr>
                                        <th className="px-4 py-3 whitespace-nowrap">Mã đơn hàng</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Sản phẩm</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Size</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Phương thức thanh toán</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Thành tiền</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Trạng thái đơn hàng</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Ngày đặt</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Thao tác</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Đánh giá sản phẩm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.slice(0, visibleCount)?.map((order) =>
                                        order.selectedCartItems.map((item, idx) => {
                                            return (
                                                <tr key={`${order._id}-${idx}`} className="bg-white border-b">
                                                    {idx === 0 && (
                                                        <>
                                                            <td
                                                                className="px-6 py-4"
                                                                rowSpan={order.selectedCartItems.length}
                                                            >
                                                                <span
                                                                    onClick={() =>
                                                                        setOpenOrderDetailsModal({
                                                                            open: true,
                                                                            order: order,
                                                                        })
                                                                    }
                                                                    className="cursor-pointer text-primary"
                                                                >
                                                                    {order._id}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <Link to={`/product/${item?.product?.slug}`}>
                                                                    <div className="flex gap-2 items-center rounded-md overflow-hidden group">
                                                                        <img
                                                                            src={item?.images[0]}
                                                                            alt=""
                                                                            className="w-[70px] h-[70px] object-cover rounded-md group-hover:scale-105 transition-all cursor-pointer"
                                                                        />
                                                                    </div>
                                                                </Link>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="text-blue">{item?.sizeProduct}</span>
                                                            </td>
                                                            <td
                                                                className="px-6 py-4"
                                                                rowSpan={order.selectedCartItems.length}
                                                            >
                                                                <span className="text-blue">
                                                                    {order.paymentMethod === 'cod' &&
                                                                        'Thanh toán khi nhận hàng'}
                                                                    {order.paymentMethod === 'momo' &&
                                                                        'Thanh toán bằng Momo'}
                                                                    {order.paymentMethod === 'vnpay' &&
                                                                        'Thanh toán bằng VnPay'}
                                                                </span>
                                                            </td>
                                                            <td
                                                                className="px-6 py-4"
                                                                rowSpan={order.selectedCartItems.length}
                                                            >
                                                                <span className="text-primary">
                                                                    {formatCurrency(order.finalPrice)}
                                                                </span>
                                                            </td>
                                                            <td
                                                                className="px-6 py-4"
                                                                rowSpan={order.selectedCartItems.length}
                                                            >
                                                                <BadgeOrderStatus status={order.orderStatus} />
                                                            </td>
                                                            <td
                                                                className="px-6 py-4"
                                                                rowSpan={order.selectedCartItems.length}
                                                            >
                                                                {formatDate(order.createdAt)}
                                                            </td>
                                                            <td
                                                                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                                                                onClick={() =>
                                                                    setOpenOrderDetailsModal({
                                                                        open: true,
                                                                        order: order,
                                                                    })
                                                                }
                                                                rowSpan={order.selectedCartItems.length}
                                                            >
                                                                <span className="text-gray-500 link transition-all">
                                                                    Xem chi tiết
                                                                </span>
                                                            </td>
                                                        </>
                                                    )}

                                                    {idx !== 0 && (
                                                        <>
                                                            <td className="px-6 py-4">
                                                                <Link to={`/product/${item?.product?.slug}`}>
                                                                    <div className="flex gap-2 items-center rounded-md overflow-hidden group">
                                                                        <img
                                                                            src={item?.images[0]}
                                                                            alt=""
                                                                            className="w-[70px] h-[70px] object-cover rounded-md group-hover:scale-105 transition-all cursor-pointer"
                                                                        />
                                                                    </div>
                                                                </Link>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="text-blue">{item?.sizeProduct}</span>
                                                            </td>
                                                        </>
                                                    )}
                                                    <td className="px-6 py-4 ">
                                                        {item?.isReviewed ? (
                                                            <span className="text-green-500 font-medium">
                                                                Đã đánh giá
                                                            </span>
                                                        ) : order?.orderStatus === 'delivered' ? (
                                                            <Link
                                                                to={`/product/${item?.product?.slug}?tab=review&size=${item?.sizeProduct}`}
                                                            >
                                                                <span className="text-blue-500 cursor-pointer hover:underline transition-all">
                                                                    Đánh giá ngay
                                                                </span>
                                                            </Link>
                                                        ) : (
                                                            <span className="text-gray-400 italic">
                                                                Chờ giao hàng để đánh giá
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>

                                {orders?.length > 0 && (
                                    <Dialog
                                        disableScrollLock
                                        fullWidth={true}
                                        maxWidth="lg"
                                        open={openOrderDetailsModal.open}
                                        onClose={handleCloseOrderDetailsModal}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        className="orderDetailsModal"
                                    >
                                        <DialogContent>
                                            <div className="bg-[#fff] p-4 container">
                                                <div className="w-full orderDetailsModalContainer relative">
                                                    <Button
                                                        className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[6px] right-[15px] !bg-[#f1f1f1]"
                                                        onClick={handleCloseOrderDetailsModal}
                                                    >
                                                        <IoCloseSharp className="text-[20px]" />
                                                    </Button>

                                                    <div
                                                        className="container bg-white p-6 rounded-lg shadow-md"
                                                        id="order-details"
                                                    >
                                                        <h2 className="text-gray-700 text-xl border-b pb-4 mb-4 font-[600]">
                                                            Chi tiết đơn hàng
                                                        </h2>
                                                        <h3 className="text-gray-700 text-lg font-[600] mt-6 mb-4">
                                                            Thông tin đơn hàng
                                                        </h3>
                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">Order ID</span>
                                                                <span className="text-primary">
                                                                    {openOrderDetailsModal?.order?._id}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">
                                                                    Phương thức thanh toán
                                                                </span>
                                                                <span className="text-gray-700 text-blue">
                                                                    {openOrderDetailsModal?.order?.paymentMethod ===
                                                                        'cod' && 'Thanh toán khi nhận hàng'}
                                                                    {openOrderDetailsModal?.order?.paymentMethod ===
                                                                        'momo' && 'Thanh toán bằng Momo'}
                                                                    {openOrderDetailsModal?.order?.paymentMethod ===
                                                                        'vnoay' && 'Thanh toán bằng VnPay'}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">Ngày đặt hàng</span>
                                                                <span className="text-gray-700">
                                                                    {formatDate(
                                                                        openOrderDetailsModal?.order?.createdAt
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">Trạng thái</span>
                                                                <span className="text-gray-700">
                                                                    <BadgeOrderStatus
                                                                        status={
                                                                            openOrderDetailsModal?.order?.orderStatus
                                                                        }
                                                                    />
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <h3 className="text-gray-700 text-xl pb-4 mb-1 mt-6 font-[600]">
                                                            Thông tin khách hàng
                                                        </h3>
                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">Họ và tên</span>
                                                                <span className="text-gray-700">
                                                                    {openOrderDetailsModal?.order?.userId?.name}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">Email</span>
                                                                <span className="text-gray-700">
                                                                    {openOrderDetailsModal?.order?.userId?.email}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">Số điện thoại</span>
                                                                <span className="text-gray-700">
                                                                    {openOrderDetailsModal?.order?.userId?.phoneNumber}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">Địa chỉ</span>
                                                                <span className="text-gray-700">
                                                                    {`Đường ${
                                                                        openOrderDetailsModal?.order?.shippingAddress
                                                                            ?.streetLine || ''
                                                                    }, Phường ${
                                                                        openOrderDetailsModal?.order?.shippingAddress
                                                                            ?.ward || ''
                                                                    }, Quận ${
                                                                        openOrderDetailsModal?.order?.shippingAddress
                                                                            ?.district || ''
                                                                    }, Thành phố ${
                                                                        openOrderDetailsModal?.order?.shippingAddress
                                                                            ?.city || ''
                                                                    }`}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <h3 className="text-gray-700 text-xl pb-4 mb-1 mt-6 font-[600]">
                                                            Thông tin sản phẩm
                                                        </h3>
                                                        <div className="mt-4">
                                                            {openOrderDetailsModal?.order?.selectedCartItems?.length >
                                                                0 &&
                                                                openOrderDetailsModal?.order?.selectedCartItems?.map(
                                                                    (cartItem) => {
                                                                        return (
                                                                            <div
                                                                                key={cartItem?._id}
                                                                                className="flex items-center bg-gray-50 p-4 rounded-lg"
                                                                            >
                                                                                <div className="w-[20%] group cursor-pointer">
                                                                                    <img
                                                                                        alt="Image of an Apple iMac"
                                                                                        className="w-[70px] h-[70px] object-cover rounded-md mr-4 group-hover:scale-105 transition-all"
                                                                                        src={cartItem?.images[0]}
                                                                                    />
                                                                                </div>
                                                                                <div className="mx-4 w-[47%]">
                                                                                    <p className="text-gray-700">
                                                                                        {cartItem?.name}
                                                                                    </p>
                                                                                </div>
                                                                                <div className="w-[33%] flex items-center justify-end gap-5">
                                                                                    <p className="text-gray-700">
                                                                                        {cartItem?.sizeProduct}
                                                                                    </p>
                                                                                    <p className="text-gray-700">
                                                                                        {cartItem?.quantityProduct}
                                                                                    </p>
                                                                                    <p className="text-gray-700 font-[600]">
                                                                                        {formatCurrency(
                                                                                            cartItem?.price
                                                                                        )}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                )}

                                                            <h3 className="text-gray-700 text-xl pb-4 mb-1 mt-6 font-[600]">
                                                                Tổng quan giá
                                                            </h3>
                                                            <div className="space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-gray-500">Tổng số lượng</span>
                                                                    <span className="text-gray-700">
                                                                        {openOrderDetailsModal?.order?.totalQuantity}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-gray-500">Tổng tiền đơn</span>
                                                                    <span className="text-gray-700">
                                                                        {formatCurrency(
                                                                            openOrderDetailsModal?.order?.totalPrice
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-gray-500">
                                                                        Tổng tiền phí vận chuyển
                                                                    </span>
                                                                    <span className="text-gray-700">
                                                                        {formatCurrency(
                                                                            openOrderDetailsModal?.order?.shippingFee
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-gray-500">Voucher</span>
                                                                    <span className="text-gray-700">
                                                                        {openOrderDetailsModal?.order?.discountType ===
                                                                        'percent'
                                                                            ? `${openOrderDetailsModal?.order?.discountValue}%`
                                                                            : `${formatCurrency(
                                                                                  openOrderDetailsModal?.order
                                                                                      ?.discountValue
                                                                              )}`}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="mb-1 mt-6">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-gray-700 text-xl pb-4 font-[600]">
                                                                        Tổng thanh toán
                                                                    </span>
                                                                    <span className="font-[600] text-[28px] text-primary">
                                                                        {formatCurrency(
                                                                            openOrderDetailsModal?.order?.finalPrice
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <Divider />
                                                        </div>
                                                    </div>
                                                    <div className="p-6 rounded-lg">
                                                        <div className="flex items-center justify-between gap-3 mt-4">
                                                            <Button className="btn-org btn-login" onClick={printPDF}>
                                                                In đơn hàng
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    handleCancelOrder(openOrderDetailsModal?.order?._id)
                                                                }
                                                                className="btn-border btn-login"
                                                            >
                                                                {cancelOrder ? (
                                                                    <CircularProgress color="inherit" />
                                                                ) : (
                                                                    'Huỷ đơn'
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </table>
                        )}

                        {visibleCount < orders?.length && (
                            <div className="text-center my-4">
                                <button
                                    onClick={() => setVisibleCount((prev) => prev + 10)}
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    Xem thêm
                                </button>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
        </AccountSidebarLayout>
    );
};

export default OrderHistoryPage;

// {orders?.length === 0 && (
//                             <div className="flex items-center flex-col m-auto">
//                                 <div className="">
//                                     <img className="w-[100px] h-[100px] " src={noOrder} alt="" />
//                                 </div>
//                                 <span className="text-[14px] font-[500] my-[14px] ">Chưa có đơn hàng nào.</span>
//                             </div>
//                         )}

//                         {orders?.length > 0 && (
//                             <table className="w-full text-sm text-left rtl:text-right text-gray-700">
//                                 <thead className="text-xs text-gray-700 uppercase bg-white">
//                                     <tr>
//                                         <th className="px-4 py-3 whitespace-nowrap">Mã đơn hàng</th>
//                                         <th className="px-4 py-3 whitespace-nowrap">Sản phẩm</th>
//                                         <th className="px-4 py-3 whitespace-nowrap">Size</th>
//                                         <th className="px-4 py-3 whitespace-nowrap">Phương thức thanh toán</th>
//                                         <th className="px-4 py-3 whitespace-nowrap">Thành tiền</th>
//                                         <th className="px-4 py-3 whitespace-nowrap">Trạng thái đơn hàng</th>
//                                         <th className="px-4 py-3 whitespace-nowrap">Ngày đặt</th>
//                                         <th className="px-4 py-3 whitespace-nowrap">Thao tác</th>
//                                         <th className="px-4 py-3 whitespace-nowrap">Đánh giá sản phẩm</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {orders?.slice(0, visibleCount)?.map((order) =>
//                                         order.selectedCartItems.map((item, idx) => {
//                                             return (
//                                                 <tr key={`${order._id}-${idx}`} className="bg-white border-b">
//                                                     {idx === 0 && (
//                                                         <>
//                                                             <td
//                                                                 className="px-6 py-4"
//                                                                 rowSpan={order.selectedCartItems.length}
//                                                             >
//                                                                 <span
//                                                                     onClick={() =>
//                                                                         setOpenOrderDetailsModal({
//                                                                             open: true,
//                                                                             order: order,
//                                                                         })
//                                                                     }
//                                                                     className="cursor-pointer text-primary"
//                                                                 >
//                                                                     {order._id}
//                                                                 </span>
//                                                             </td>
//                                                             <td className="px-6 py-4">
//                                                                 <Link to={`/product/${item?.product?.slug}`}>
//                                                                     <div className="flex gap-2 items-center rounded-md overflow-hidden group">
//                                                                         <img
//                                                                             src={item?.images[0]}
//                                                                             alt=""
//                                                                             className="w-[70px] h-[70px] object-cover rounded-md group-hover:scale-105 transition-all cursor-pointer"
//                                                                         />
//                                                                     </div>
//                                                                 </Link>
//                                                             </td>
//                                                             <td className="px-6 py-4">
//                                                                 <span className="text-blue">{item?.sizeProduct}</span>
//                                                             </td>
//                                                             <td
//                                                                 className="px-6 py-4"
//                                                                 rowSpan={order.selectedCartItems.length}
//                                                             >
//                                                                 <span className="text-blue">
//                                                                     {order.paymentMethod === 'cod' &&
//                                                                         'Thanh toán khi nhận hàng'}
//                                                                     {order.paymentMethod === 'momo' &&
//                                                                         'Thanh toán bằng Momo'}
//                                                                     {order.paymentMethod === 'vnpay' &&
//                                                                         'Thanh toán bằng VnPay'}
//                                                                 </span>
//                                                             </td>
//                                                             <td
//                                                                 className="px-6 py-4"
//                                                                 rowSpan={order.selectedCartItems.length}
//                                                             >
//                                                                 <span className="text-primary">
//                                                                     {formatCurrency(order.finalPrice)}
//                                                                 </span>
//                                                             </td>
//                                                             <td
//                                                                 className="px-6 py-4"
//                                                                 rowSpan={order.selectedCartItems.length}
//                                                             >
//                                                                 <BadgeOrderStatus status={order.orderStatus} />
//                                                             </td>
//                                                             <td
//                                                                 className="px-6 py-4"
//                                                                 rowSpan={order.selectedCartItems.length}
//                                                             >
//                                                                 {formatDate(order.createdAt)}
//                                                             </td>
//                                                             <td
//                                                                 className="px-6 py-4 whitespace-nowrap cursor-pointer"
//                                                                 onClick={() =>
//                                                                     setOpenOrderDetailsModal({
//                                                                         open: true,
//                                                                         order: order,
//                                                                     })
//                                                                 }
//                                                                 rowSpan={order.selectedCartItems.length}
//                                                             >
//                                                                 <span className="text-gray-500 link transition-all">
//                                                                     Xem chi tiết
//                                                                 </span>
//                                                             </td>
//                                                         </>
//                                                     )}

//                                                     {idx !== 0 && (
//                                                         <>
//                                                             <td className="px-6 py-4">
//                                                                 <Link to={`/product/${item?.product?.slug}`}>
//                                                                     <div className="flex gap-2 items-center rounded-md overflow-hidden group">
//                                                                         <img
//                                                                             src={item?.images[0]}
//                                                                             alt=""
//                                                                             className="w-[70px] h-[70px] object-cover rounded-md group-hover:scale-105 transition-all cursor-pointer"
//                                                                         />
//                                                                     </div>
//                                                                 </Link>
//                                                             </td>
//                                                             <td className="px-6 py-4">
//                                                                 <span className="text-blue">{item?.sizeProduct}</span>
//                                                             </td>
//                                                         </>
//                                                     )}
//                                                     <td className="px-6 py-4 ">
//                                                         {item?.isReviewed ? (
//                                                             <span className="text-green-500 font-medium">
//                                                                 Đã đánh giá
//                                                             </span>
//                                                         ) : order?.orderStatus === 'delivered' ? (
//                                                             <Link
//                                                                 to={`/product/${item?.product?.slug}?tab=review&size=${item?.sizeProduct}`}
//                                                             >
//                                                                 <span className="text-blue-500 cursor-pointer hover:underline transition-all">
//                                                                     Đánh giá ngay
//                                                                 </span>
//                                                             </Link>
//                                                         ) : (
//                                                             <span className="text-gray-400 italic">
//                                                                 Chờ giao hàng để đánh giá
//                                                             </span>
//                                                         )}
//                                                     </td>
//                                                 </tr>
//                                             );
//                                         })
//                                     )}
//                                 </tbody>

//                                 {/* Dialog */}
//                                 {orders?.length > 0 && (
//                                     <Dialog
//                                         disableScrollLock
//                                         fullWidth={true}
//                                         maxWidth="lg"
//                                         open={openOrderDetailsModal.open}
//                                         onClose={handleCloseOrderDetailsModal}
//                                         aria-labelledby="alert-dialog-title"
//                                         aria-describedby="alert-dialog-description"
//                                         className="orderDetailsModal"
//                                     >
//                                         <DialogContent>
//                                             <div className="bg-[#fff] p-4 container">
//                                                 <div className="w-full orderDetailsModalContainer relative">
//                                                     <Button
//                                                         className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[6px] right-[15px] !bg-[#f1f1f1]"
//                                                         onClick={handleCloseOrderDetailsModal}
//                                                     >
//                                                         <IoCloseSharp className="text-[20px]" />
//                                                     </Button>

//                                                     <div
//                                                         className="container bg-white p-6 rounded-lg shadow-md"
//                                                         id="order-details"
//                                                     >
//                                                         <h2 className="text-gray-700 text-xl border-b pb-4 mb-4 font-[600]">
//                                                             Chi tiết đơn hàng
//                                                         </h2>
//                                                         <h3 className="text-gray-700 text-lg font-[600] mt-6 mb-4">
//                                                             Thông tin đơn hàng
//                                                         </h3>
//                                                         {/* Order Info */}
//                                                         <div className="space-y-4">
//                                                             <div className="flex items-center justify-between">
//                                                                 <span className="text-gray-500">Order ID</span>
//                                                                 <span className="text-primary">
//                                                                     {openOrderDetailsModal?.order?._id}
//                                                                 </span>
//                                                             </div>
//                                                             <div className="flex items-center justify-between">
//                                                                 <span className="text-gray-500">
//                                                                     Phương thức thanh toán
//                                                                 </span>
//                                                                 <span className="text-gray-700 text-blue">
//                                                                     {openOrderDetailsModal?.order?.paymentMethod ===
//                                                                         'cod' && 'Thanh toán khi nhận hàng'}
//                                                                     {openOrderDetailsModal?.order?.paymentMethod ===
//                                                                         'momo' && 'Thanh toán bằng Momo'}
//                                                                     {openOrderDetailsModal?.order?.paymentMethod ===
//                                                                         'vnoay' && 'Thanh toán bằng VnPay'}
//                                                                 </span>
//                                                             </div>
//                                                             <div className="flex items-center justify-between">
//                                                                 <span className="text-gray-500">Ngày đặt hàng</span>
//                                                                 <span className="text-gray-700">
//                                                                     {formatDate(
//                                                                         openOrderDetailsModal?.order?.createdAt
//                                                                     )}
//                                                                 </span>
//                                                             </div>
//                                                             <div className="flex items-center justify-between">
//                                                                 <span className="text-gray-500">Trạng thái</span>
//                                                                 <span className="text-gray-700">
//                                                                     <BadgeOrderStatus
//                                                                         status={
//                                                                             openOrderDetailsModal?.order?.orderStatus
//                                                                         }
//                                                                     />
//                                                                 </span>
//                                                             </div>
//                                                         </div>

//                                                         {/* Customer Info */}
//                                                         <h3 className="text-gray-700 text-xl pb-4 mb-1 mt-6 font-[600]">
//                                                             Thông tin khách hàng
//                                                         </h3>
//                                                         <div className="space-y-4">
//                                                             <div className="flex items-center justify-between">
//                                                                 <span className="text-gray-500">Họ và tên</span>
//                                                                 <span className="text-gray-700">
//                                                                     {openOrderDetailsModal?.order?.userId?.name}
//                                                                 </span>
//                                                             </div>
//                                                             <div className="flex items-center justify-between">
//                                                                 <span className="text-gray-500">Email</span>
//                                                                 <span className="text-gray-700">
//                                                                     {openOrderDetailsModal?.order?.userId?.email}
//                                                                 </span>
//                                                             </div>
//                                                             <div className="flex items-center justify-between">
//                                                                 <span className="text-gray-500">Số điện thoại</span>
//                                                                 <span className="text-gray-700">
//                                                                     {openOrderDetailsModal?.order?.userId?.phoneNumber}
//                                                                 </span>
//                                                             </div>
//                                                             <div className="flex items-center justify-between">
//                                                                 <span className="text-gray-500">Địa chỉ</span>
//                                                                 <span className="text-gray-700">
//                                                                     {`Đường ${
//                                                                         openOrderDetailsModal?.order?.shippingAddress
//                                                                             ?.streetLine || ''
//                                                                     }, Phường ${
//                                                                         openOrderDetailsModal?.order?.shippingAddress
//                                                                             ?.ward || ''
//                                                                     }, Quận ${
//                                                                         openOrderDetailsModal?.order?.shippingAddress
//                                                                             ?.district || ''
//                                                                     }, Thành phố ${
//                                                                         openOrderDetailsModal?.order?.shippingAddress
//                                                                             ?.city || ''
//                                                                     }`}
//                                                                 </span>
//                                                             </div>
//                                                         </div>

//                                                         {/* Product Info */}
//                                                         <h3 className="text-gray-700 text-xl pb-4 mb-1 mt-6 font-[600]">
//                                                             Thông tin sản phẩm
//                                                         </h3>
//                                                         <div className="mt-4">
//                                                             {openOrderDetailsModal?.order?.selectedCartItems?.length >
//                                                                 0 &&
//                                                                 openOrderDetailsModal?.order?.selectedCartItems?.map(
//                                                                     (cartItem) => {
//                                                                         return (
//                                                                             <div
//                                                                                 key={cartItem?._id}
//                                                                                 className="flex items-center bg-gray-50 p-4 rounded-lg"
//                                                                             >
//                                                                                 <div className="w-[20%] group cursor-pointer">
//                                                                                     <img
//                                                                                         alt="Image of an Apple iMac"
//                                                                                         className="w-[70px] h-[70px] object-cover rounded-md mr-4 group-hover:scale-105 transition-all"
//                                                                                         src={cartItem?.images[0]}
//                                                                                     />
//                                                                                 </div>
//                                                                                 <div className="mx-4 w-[47%]">
//                                                                                     <p className="text-gray-700">
//                                                                                         {cartItem?.name}
//                                                                                     </p>
//                                                                                 </div>
//                                                                                 <div className="w-[33%] flex items-center justify-end gap-5">
//                                                                                     <p className="text-gray-700">
//                                                                                         {cartItem?.sizeProduct}
//                                                                                     </p>
//                                                                                     <p className="text-gray-700">
//                                                                                         {cartItem?.quantityProduct}
//                                                                                     </p>
//                                                                                     <p className="text-gray-700 font-[600]">
//                                                                                         {formatCurrency(
//                                                                                             cartItem?.price
//                                                                                         )}
//                                                                                     </p>
//                                                                                 </div>
//                                                                             </div>
//                                                                         );
//                                                                     }
//                                                                 )}

//                                                             {/* Price info */}
//                                                             <h3 className="text-gray-700 text-xl pb-4 mb-1 mt-6 font-[600]">
//                                                                 Tổng quan giá
//                                                             </h3>
//                                                             <div className="space-y-4">
//                                                                 <div className="flex items-center justify-between">
//                                                                     <span className="text-gray-500">Tổng số lượng</span>
//                                                                     <span className="text-gray-700">
//                                                                         {openOrderDetailsModal?.order?.totalQuantity}
//                                                                     </span>
//                                                                 </div>
//                                                                 <div className="flex items-center justify-between">
//                                                                     <span className="text-gray-500">Tổng tiền đơn</span>
//                                                                     <span className="text-gray-700">
//                                                                         {formatCurrency(
//                                                                             openOrderDetailsModal?.order?.totalPrice
//                                                                         )}
//                                                                     </span>
//                                                                 </div>
//                                                                 <div className="flex items-center justify-between">
//                                                                     <span className="text-gray-500">
//                                                                         Tổng tiền phí vận chuyển
//                                                                     </span>
//                                                                     <span className="text-gray-700">
//                                                                         {formatCurrency(
//                                                                             openOrderDetailsModal?.order?.shippingFee
//                                                                         )}
//                                                                     </span>
//                                                                 </div>
//                                                                 <div className="flex items-center justify-between">
//                                                                     <span className="text-gray-500">Voucher</span>
//                                                                     <span className="text-gray-700">
//                                                                         {openOrderDetailsModal?.order?.discountType ===
//                                                                         'percent'
//                                                                             ? `${openOrderDetailsModal?.order?.discountValue}%`
//                                                                             : `${formatCurrency(
//                                                                                   openOrderDetailsModal?.order
//                                                                                       ?.discountValue
//                                                                               )}`}
//                                                                     </span>
//                                                                 </div>
//                                                             </div>
//                                                             <div className="mb-1 mt-6">
//                                                                 <div className="flex items-center justify-between">
//                                                                     <span className="text-gray-700 text-xl pb-4 font-[600]">
//                                                                         Tổng thanh toán
//                                                                     </span>
//                                                                     <span className="font-[600] text-[28px] text-primary">
//                                                                         {formatCurrency(
//                                                                             openOrderDetailsModal?.order?.finalPrice
//                                                                         )}
//                                                                     </span>
//                                                                 </div>
//                                                             </div>

//                                                             <Divider />
//                                                         </div>
//                                                     </div>
//                                                     <div className="p-6 rounded-lg">
//                                                         <div className="flex items-center justify-between gap-3 mt-4">
//                                                             <Button className="btn-org btn-login" onClick={printPDF}>
//                                                                 In đơn hàng
//                                                             </Button>
//                                                             <Button
//                                                                 onClick={() =>
//                                                                     handleCancelOrder(openOrderDetailsModal?.order?._id)
//                                                                 }
//                                                                 className="btn-border btn-login"
//                                                             >
//                                                                 {cancelOrder ? (
//                                                                     <CircularProgress color="inherit" />
//                                                                 ) : (
//                                                                     'Huỷ đơn'
//                                                                 )}
//                                                             </Button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </DialogContent>
//                                     </Dialog>
//                                 )}
//                             </table>
//                         )}

//                         {visibleCount < orders?.length && (
//                             <div className="text-center my-4">
//                                 <button
//                                     onClick={() => setVisibleCount((prev) => prev + 10)}
//                                     className="text-blue-600 hover:underline text-sm"
//                                 >
//                                     Xem thêm
//                                 </button>
//                             </div>
//                         )}
