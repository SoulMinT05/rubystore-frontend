import React, { useState } from 'react';

import './OrderHistoryPage.css';
import AccountSidebar from '../../components/AccountSidebar/AccountSidebar';
import { Button, Divider } from '@mui/material';
import BadgeOrderStatus from '../../components/BadgeOrderStatus/BadgeOrderStatus';
import { IoCloseSharp } from 'react-icons/io5';
import { IoKeyOutline } from 'react-icons/io5';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

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
    const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);

    const handleCloseProductDetailsModal = () => {
        setOpenProductDetailsModal(false);
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
            }),
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

    return (
        <section className="py-10 w-full">
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSidebar />
                </div>
                <div className="col2 w-[80%]">
                    <div className="bg-white p-5 shadow-md rounded-md">
                        <div className="py-2 px-3">
                            <h2 className="pb-3">Lịch sử đơn hàng</h2>

                            <p className="mt-0">
                                Tổng {'  '}
                                <span className="font-bold text-primary">
                                    3<span> đơn hàng đã đặt</span>
                                </span>
                            </p>

                            <hr />

                            <div className="relative overflow-x-auto mt-5">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                    <thead className="text-xs text-gray-700 uppercase bg-white">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Sản phẩm
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Order ID
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Phương thức thanh toán
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Họ và tên
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Số điện thoại
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Địa chỉ
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Tổng tiền
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Trạng thái
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Ngày đặt hàng
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b">
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2 items-center rounded-md overflow-hidden group">
                                                    <img
                                                        src="https://image.tienphong.vn/w1000/Uploaded/2025/neg-sleclyr/2023_03_23/cd1617e3ac74acc9dac4766027234fd8-2045.jpeg"
                                                        alt=""
                                                        className="w-[70px] h-[70px] object-cover rounded-md group-hover:scale-105 transition-all cursor-pointer"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-primary">6b9283273230ase</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-primary">Tiền mặt</span>
                                            </td>
                                            <td className="px-6 py-4">Tam Nguyen</td>
                                            <td className="px-6 py-4">tamnguyenforwork@gmail.com</td>
                                            <td className="px-6 py-4">02199232323</td>
                                            <td className="px-6 py-4">
                                                <span className="block w-[400px]">
                                                    137 Trần Hoà Bình, Phường 17, Quận Gò Vấp, Thành phố Hồ Chí Minh
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{formatCurrency(250000)}</td>
                                            <td className="px-6 py-4">
                                                <BadgeOrderStatus status="success" />
                                            </td>
                                            <td className="px-6 py-4">{formatDate('2025-04-10')}</td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                                                onClick={() => setOpenProductDetailsModal(true)}
                                            >
                                                <span className="text-gray-500 link transition-all">Xem chi tiết</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <Dialog
                                        fullWidth={true}
                                        maxWidth="lg"
                                        open={openProductDetailsModal}
                                        onClose={handleCloseProductDetailsModal}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        className="productDetailsModal"
                                    >
                                        <DialogContent>
                                            <div className="bg-[#fff] p-4 container">
                                                <div className="flex items-center w-full productDetailsModalContainer relative">
                                                    <Button
                                                        className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[6px] right-[15px] !bg-[#f1f1f1]"
                                                        onClick={handleCloseProductDetailsModal}
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
                                                                <span className="text-gray-700">6b9283273230ase</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">
                                                                    Phương thức thanh toán
                                                                </span>
                                                                <span className="text-gray-700">Tiền mặt</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">Ngày đặt hàng</span>
                                                                <span className="text-gray-700">24 November 2023</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">Trạng thái</span>
                                                                <span className="text-gray-700">
                                                                    <BadgeOrderStatus status="success" />
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
                                                                <span className="text-gray-700">Tam Soo</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">Email</span>
                                                                <span className="text-gray-700">name@example.com</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">Số điện thoại</span>
                                                                <span className="text-gray-700">+123 456 7890</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">Địa chỉ</span>
                                                                <span className="text-gray-700">
                                                                    62 Miles Drive St, Newark, NJ 07103, California
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Product Info */}
                                                        <h3 className="text-gray-700 text-xl pb-4 mb-1 mt-6 font-[600]">
                                                            Thông tin sản phẩm
                                                        </h3>
                                                        <div className="mt-4">
                                                            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                                                                <div className="w-[20%] group cursor-pointer">
                                                                    <img
                                                                        alt="Image of an Apple iMac"
                                                                        className="w-[70px] h-[70px] object-cover rounded-md mr-4 group-hover:scale-105 transition-all"
                                                                        src="https://image.tienphong.vn/w1000/Uploaded/2025/neg-sleclyr/2023_03_23/cd1617e3ac74acc9dac4766027234fd8-2045.jpeg"
                                                                    />
                                                                </div>
                                                                <div className="mx-4 w-[60%]">
                                                                    <p className="text-gray-700">
                                                                        PC system All in One APPLE iMac (2023)
                                                                        mqrq3ro/a, Apple M3, 24" Retina 4.5K, 8GB, SSD
                                                                        256GB, 10-core GPU, macOS Sonoma, Blue, Keyboard
                                                                        layout INT
                                                                    </p>
                                                                </div>
                                                                <div className="w-[20%] flex items-center justify-end gap-5">
                                                                    <p className="text-gray-700">x1</p>
                                                                    <p className="text-gray-700 font-[600]">
                                                                        {formatCurrency(3000000)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                                                                <div className="w-[20%] group cursor-pointer">
                                                                    <img
                                                                        alt="Image of an Apple iMac"
                                                                        className="w-[70px] h-[70px] object-cover rounded-md mr-4 group-hover:scale-105 transition-all"
                                                                        src="https://image.tienphong.vn/w1000/Uploaded/2025/neg-sleclyr/2023_03_23/cd1617e3ac74acc9dac4766027234fd8-2045.jpeg"
                                                                    />
                                                                </div>
                                                                <div className="mx-4 w-[60%]">
                                                                    <p className="text-gray-700">
                                                                        PC system All in One APPLE iMac (2023)
                                                                        mqrq3ro/a, Apple M3, 24" Retina 4.5K, 8GB, SSD
                                                                        256GB, 10-core GPU, macOS Sonoma, Blue, Keyboard
                                                                        layout INT
                                                                    </p>
                                                                </div>
                                                                <div className="w-[20%] flex items-center justify-end gap-5">
                                                                    <p className="text-gray-700">x1</p>
                                                                    <p className="text-gray-700 font-[600]">
                                                                        {formatCurrency(3000000)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                                                                <div className="w-[20%] group cursor-pointer">
                                                                    <img
                                                                        alt="Image of an Apple iMac"
                                                                        className="w-[70px] h-[70px] object-cover rounded-md mr-4 group-hover:scale-105 transition-all"
                                                                        src="https://image.tienphong.vn/w1000/Uploaded/2025/neg-sleclyr/2023_03_23/cd1617e3ac74acc9dac4766027234fd8-2045.jpeg"
                                                                    />
                                                                </div>
                                                                <div className="mx-4 w-[60%]">
                                                                    <p className="text-gray-700">
                                                                        PC system All in One APPLE iMac (2023)
                                                                        mqrq3ro/a, Apple M3, 24" Retina 4.5K, 8GB, SSD
                                                                        256GB, 10-core GPU, macOS Sonoma, Blue, Keyboard
                                                                        layout INT
                                                                    </p>
                                                                </div>
                                                                <div className="w-[20%] flex items-center justify-end gap-5">
                                                                    <p className="text-gray-700">x1</p>
                                                                    <p className="text-gray-700 font-[600]">
                                                                        {formatCurrency(3000000)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Price info */}
                                                        <h3 className="text-gray-700 text-xl pb-4 mb-1 mt-6 font-[600]">
                                                            Tổng quan giá
                                                        </h3>
                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">Giá sản phẩm</span>
                                                                <span className="text-gray-700">
                                                                    {formatCurrency(3000000)}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-500">Phí ship</span>
                                                                <span className="text-gray-700">
                                                                    {formatCurrency(0)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="mb-1 mt-6">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-700 text-xl pb-4 font-[600]">
                                                                    Tổng giá
                                                                </span>
                                                                <span className="font-[600]">
                                                                    {formatCurrency(3000000)}
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
                                                        <Button className="btn-border btn-login">Huỷ đơn</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderHistoryPage;
