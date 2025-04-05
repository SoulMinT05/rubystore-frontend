import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Button } from '@mui/material';

import '../HomeBannerSlider/HomeBannerSlider.css';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const HomeBannerSlider = () => {
    return (
        <Swiper
            loop={true}
            spaceBetween={30}
            effect={'fade'}
            navigation={true}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            className="homeBannerSlider"
        >
            <SwiperSlide>
                <div className="item w-full rounded-md overflow-hidden relative">
                    <img src="src/assets/bannerimg1.jpg" />

                    <div
                        className="info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center justify-center flex-col
                        transition-all duration-500"
                    >
                        <h4 className="text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0">
                            Giảm giá ngày tiết kiệm lớn
                        </h4>
                        <h2 className="text-[35px] font-[700] w-full relative -right-[100%] opacity-0">
                            Iphone 13 Pro Max
                        </h2>
                        <h3 className="flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0">
                            Sở hữu với giá chỉ
                            <span className="text-primary text-[30px] font-[700]">{formatCurrency(16400000)}</span>
                        </h3>
                        <div className="w-full relative -right-[100%] opacity-0 btnShopping">
                            <Button className="btn-org">Mua sắm ngay</Button>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item w-full rounded-md overflow-hidden">
                    <img src="src/assets/bannerimg2.jpg" />
                    <div
                        className="info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center justify-center flex-col
                        transition-all duration-500"
                    >
                        <h4 className="text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0">
                            Giảm giá ngày tiết kiệm lớn
                        </h4>
                        <h2 className="text-[35px] font-[700] w-full relative -right-[100%] opacity-0">
                            Iphone 13 Pro Max
                        </h2>
                        <h3 className="flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0">
                            Sở hữu với giá chỉ
                            <span className="text-primary text-[30px] font-[700]">{formatCurrency(16400000)}</span>
                        </h3>
                        <div className="w-full relative -right-[100%] opacity-0 btnShopping">
                            <Button className="btn-org">Mua sắm ngay</Button>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default HomeBannerSlider;
