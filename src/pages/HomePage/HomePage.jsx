import React, { useEffect, useState } from 'react';
import HomeSlider from '../../components/HomeSlider/HomeSlider';
import HomeCatSlider from '../../components/HomeCatSlider/HomeCatSlider';

import { LiaShippingFastSolid } from 'react-icons/lia';
import HomeAdsBannerSlider from '../../components/HomeAdsBannerSlider/HomeAdsBannerSlider';
import HomeAdsBannerSliderSecond from '../../components/HomeAdsBannerSliderSecond/HomeAdsBannerSliderSecond';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HomeProductsSlider from '../../components/HomeProductsSlider/HomeProductsSlider';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import axiosClient from '../../apis/axiosClient';
import Cookies from 'js-cookie';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import HomeBlogsItem from '../../components/HomeBlogsItem/HomeBlogsItem';
import HomeBannerSlider from '../../components/HomeBannerSlider/HomeBannerSlider';
import HomeBannerImage from '../../components/HomeBannerImage/HomeBannerImage';

const HomePage = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // useEffect(() => {
    //     const accessToken = Cookies.get('accessToken'); // Lấy token từ cookie
    //     if (accessToken) {
    //         axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    //     }
    // }, []);

    useEffect(() => {
        axiosClient.get('/api/user/user-details');
    }, []);
    return (
        <>
            <HomeSlider />

            <section className="py-6">
                <div className="container flex gap-5">
                    <div className="part1 w-[70%]">
                        <HomeBannerSlider />
                    </div>
                    <div className="part2 w-[30%] flex gap-5 items-center justify-between flex-col">
                        <HomeBannerImage info="left" image={'src/assets/homebannerimg1.jpg'} />
                        <HomeBannerImage info="right" image={'src/assets/homebannerimg2.jpg'} />
                    </div>
                </div>
            </section>

            <HomeCatSlider />

            <section className="bg-white py-8">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="leftSec">
                            <h2 className="text-[20px] font-[600]">Sản phẩm phổ biến</h2>
                            <p className="text-[14px] font-[400]">Đừng bỏ lỡ giá tốt vào cuối tháng 3</p>
                        </div>
                        <div className="rightSec w-[60%]">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs example"
                            >
                                <Tab label="Thời trang" />
                                <Tab label="Đồ điện tử" />
                                <Tab label="Túi" />
                                <Tab label="Giày dép" />
                                <Tab label="Thực phẩm" />
                                <Tab label="Sắc đẹp" />
                                <Tab label="Sức khoẻ" />
                                <Tab label="Trang sức" />
                            </Tabs>
                        </div>
                    </div>

                    <HomeProductsSlider items={6} />
                </div>
            </section>

            <section className="py-4 pt-2 bg-white">
                <div className="container">
                    <div className="freeShipping w-full py-4 p-4 border-2 border-[#ff5252] flex items-center justify-between rounded-md mb-7">
                        <div className="col1 flex items-center gap-4">
                            <LiaShippingFastSolid className="text-[50px]" />
                            <span className="text-[20px] font-[600] uppercase">Giao hàng miễn phí</span>
                        </div>
                        <div className="col2">
                            <p className="mb-0 font-[500]">Miễn phí giao hàng cho lần đầu tiên và đơn giá trên 400k</p>
                        </div>
                        <p className="font-bold text-[25px]">- Chỉ 400k</p>
                    </div>

                    {/* <HomeAdsBannerSlider items={4} /> */}
                    <HomeAdsBannerSliderSecond items={4} />
                </div>
            </section>

            <section className="py-5 pt-0 bg-white">
                <div className="container">
                    <h2 className="text-[20px] font-[600]">Sản phẩm mới nhất</h2>
                    <HomeProductsSlider items={6} />
                    <HomeAdsBannerSlider items={3} />
                </div>
            </section>

            <section className="py-5 pt-0 bg-white">
                <div className="container">
                    <h2 className="text-[20px] font-[600]">Sản phẩm đặc trưng</h2>
                    <HomeProductsSlider items={6} />
                    <HomeAdsBannerSlider items={3} />
                </div>
            </section>

            <section className="blogSection py-5 pb-8 pt-0 bg-white">
                <div className="container">
                    <h2 className="text-[20px] font-[600] mb-4">Bài viết mới nhất</h2>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        navigation={true}
                        modules={[Navigation]}
                        className="blogSwiper"
                    >
                        <SwiperSlide>
                            <HomeBlogsItem />
                        </SwiperSlide>
                        <SwiperSlide>
                            <HomeBlogsItem />
                        </SwiperSlide>
                        <SwiperSlide>
                            <HomeBlogsItem />
                        </SwiperSlide>
                        <SwiperSlide>
                            <HomeBlogsItem />
                        </SwiperSlide>
                        <SwiperSlide>
                            <HomeBlogsItem />
                        </SwiperSlide>
                        <SwiperSlide>
                            <HomeBlogsItem />
                        </SwiperSlide>
                        <SwiperSlide>
                            <HomeBlogsItem />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </>
    );
};

export default HomePage;
