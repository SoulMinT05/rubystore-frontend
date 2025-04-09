import React, { useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Rating from '@mui/material/Rating';
import { Button, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';

import { Link } from 'react-router-dom';

import ProductZoom from '../../components/ProductZoom/ProductZoom';

import '../ProductDetailsPage/ProductDetailsPage.css';
import HomeProductsSlider from '../../components/HomeProductsSlider/HomeProductsSlider';
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const ProductDetailsPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [reviewText, setReviewText] = useState('');

    return (
        <>
            <div className="py-5">
                <div className="container">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="/" className="link transition !text-[14px]s">
                            Trang chủ
                        </Link>
                        <Link underline="hover" color="inherit" to="/" className="link transition !text-[14px]s">
                            Chi tiết sản phẩm
                        </Link>
                        <Link underline="hover" color="inherit" className="link transition !text-[14px]s">
                            Áo dài cát tân
                        </Link>
                    </Breadcrumbs>
                </div>
            </div>

            <section className="bg-white py-5">
                <div className="container flex gap-8 ">
                    <div className="productZoomContainer w-[40%]">
                        <ProductZoom />
                    </div>

                    <div className="productContent w-[60%] pr-10 pl-10">
                        <ProductDetailsComponent />
                    </div>
                </div>

                <div className="container pt-10">
                    <div className="flex items-center gap-8 mb-5">
                        <span
                            className={`link text-[17px] cursor-pointer font-[500] ${
                                activeTab === 0 ? 'text-[#ff5252]' : ''
                            }`}
                            onClick={() => setActiveTab(0)}
                        >
                            Mô tả
                        </span>
                        <span
                            className={`link text-[17px] cursor-pointer font-[500] ${
                                activeTab === 1 ? 'text-[#ff5252]' : ''
                            }`}
                            onClick={() => setActiveTab(1)}
                        >
                            Chi tiết sản phẩm
                        </span>
                        <span
                            className={`link text-[17px] cursor-pointer font-[500] ${
                                activeTab === 2 ? 'text-[#ff5252]' : ''
                            }`}
                            onClick={() => setActiveTab(2)}
                        >
                            Đánh giá (5)
                        </span>
                    </div>

                    {activeTab === 0 && (
                        <div className="shadow-md w-full py-5 px-8 rounded-md">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            <h4>Thiết kế nhỏ gọn</h4>
                            <p>
                                Sản phẩm được thiết kế nhỏ gọn, phù hợp với xu hướng thời trang ngày nay. Dễ dàng phối
                                với các món đồ khác
                            </p>
                            <h4>Miễn phí giao hàng cho đơn 400K</h4>
                            <p>
                                Chúng tôi sẽ miễn phí giao hàng cho những đơn hàng trên 400k và áp dụng cho tất cả đơn
                                hàng tại Việt Nam
                            </p>

                            <h4>Đảm bảo hoàn lại tiền</h4>
                            <p>
                                Chúng tôi đảm bảo sản phẩm chất lượng và bạn sẽ được hoàn tiền nếu sản phẩm không chất
                                lượng trong 30 ngày
                            </p>
                            <h4>Hỗ trợ online</h4>
                            <p>Chúng tôi sẽ cố gắng hỗ trợ các yêu cầu và trả lời các câu hỏi của khách hàng 24/7</p>
                        </div>
                    )}
                    {activeTab === 1 && (
                        <div className="shadow-md w-full py-5 px-8 rounded-md">
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-700">
                                    <thead class="text-xs text-gray-700 uppercase bg-white">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Stand Up
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Folded (w/o wheels)
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Folded (w/ wheels)
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Door Pass Through
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4">35''L x 24''W x 37-45''H</td>
                                            <td class="px-6 py-4">32.5''L x 18.5''W x 16.5''H</td>
                                            <td class="px-6 py-4">32.5''L x 24''W x 17.5''H</td>
                                            <td class="px-6 py-4">{formatCurrency(300000)}</td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4">35''L x 24''W x 37-45''H</td>
                                            <td class="px-6 py-4">32.5''L x 18.5''W x 16.5''H</td>
                                            <td class="px-6 py-4">32.5''L x 24''W x 17.5''H</td>
                                            <td class="px-6 py-4">{formatCurrency(300000)}</td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4">35''L x 24''W x 37-45''H</td>
                                            <td class="px-6 py-4">32.5''L x 18.5''W x 16.5''H</td>
                                            <td class="px-6 py-4">32.5''L x 24''W x 17.5''H</td>
                                            <td class="px-6 py-4">{formatCurrency(300000)}</td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4">35''L x 24''W x 37-45''H</td>
                                            <td class="px-6 py-4">32.5''L x 18.5''W x 16.5''H</td>
                                            <td class="px-6 py-4">32.5''L x 24''W x 17.5''H</td>
                                            <td class="px-6 py-4">{formatCurrency(300000)}</td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4">35''L x 24''W x 37-45''H</td>
                                            <td class="px-6 py-4">32.5''L x 18.5''W x 16.5''H</td>
                                            <td class="px-6 py-4">32.5''L x 24''W x 17.5''H</td>
                                            <td class="px-6 py-4">{formatCurrency(300000)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {activeTab === 2 && (
                        <div className="shadow-md w-[100%] py-5 px-8 rounded-md">
                            <div className="w-full productReviewsContainer">
                                <div className="reviewForm py-4 rounded-none border-gray-250 border-b-[2px]">
                                    <h2 className="text-[18px]">Đánh giá</h2>
                                    <form className="w-full mt-5">
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Viết đánh giá"
                                            className="w-full mb-5"
                                            multiline
                                            rows={5}
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                        />
                                        <br />
                                        <br />
                                        <Rating name="size-small" defaultValue={5} />

                                        <div className="flex items-center mt-2">
                                            <Button className="btn-org">Gửi đánh giá</Button>
                                        </div>
                                    </form>
                                </div>

                                <h2 className="text-[18px] mt-6">Đánh giá từ khách hàng</h2>
                                <div className="reviewScroll w-full max-h-[440px] over-x-hidden mt-5 pr-5">
                                    <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                                        <div className="info w-[60%] flex items-center gap-3">
                                            <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                                                <img
                                                    src="https://images2.thanhnien.vn/528068263637045248/2025/2/4/jisooblackpinksangvietnam1-1738649066603340568665.png"
                                                    alt="avatar"
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="w-[80%]">
                                                <h4 className="text-[16px]">Jisoo Sooyaa</h4>
                                                <h5 className="text-[13px] mb-0">2024-12-12</h5>
                                                <p className="mt-0 mb-0">Sản phẩm tuyệt, mãi keo</p>
                                            </div>
                                        </div>
                                        <Rating name="size-small" defaultValue={5} readOnly />
                                    </div>
                                    <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                                        <div className="info w-[60%] flex items-center gap-3">
                                            <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                                                <img
                                                    src="https://images2.thanhnien.vn/528068263637045248/2025/2/4/jisooblackpinksangvietnam1-1738649066603340568665.png"
                                                    alt="avatar"
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="w-[80%]">
                                                <h4 className="text-[16px]">Jisoo Sooyaa</h4>
                                                <h5 className="text-[13px] mb-0">2024-12-12</h5>
                                                <p className="mt-0 mb-0">Sản phẩm tuyệt, mãi keo</p>
                                            </div>
                                        </div>
                                        <Rating name="size-small" defaultValue={5} readOnly />
                                    </div>
                                    <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                                        <div className="info w-[60%] flex items-center gap-3">
                                            <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                                                <img
                                                    src="https://images2.thanhnien.vn/528068263637045248/2025/2/4/jisooblackpinksangvietnam1-1738649066603340568665.png"
                                                    alt="avatar"
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="w-[80%]">
                                                <h4 className="text-[16px]">Jisoo Sooyaa</h4>
                                                <h5 className="text-[13px] mb-0">2024-12-12</h5>
                                                <p className="mt-0 mb-0">Sản phẩm tuyệt, mãi keo</p>
                                            </div>
                                        </div>
                                        <Rating name="size-small" defaultValue={5} readOnly />
                                    </div>
                                    <div className="flex items-center justify-center mt-8">
                                        <Pagination count={10} />
                                    </div>
                                </div>

                                <br />
                            </div>
                        </div>
                    )}
                </div>

                <div className="container pt-8">
                    <h2 className="text-[20px] font-[600] pb-0">Sản phẩm liên quan</h2>
                    <HomeProductsSlider items={6} />
                </div>
            </section>
        </>
    );
};

export default ProductDetailsPage;
