import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import HomeBannerBox from '../HomeBannerBox/HomeBannerBox';

import '../HomeAdsBannerSlider/HomeAdsBannerSlider.css';

const HomeAdsBannerSlider = ({ items }) => {
    return (
        <div className="py-5 w-full">
            <Swiper slidesPerView={items} spaceBetween={10} navigation={true} modules={[Navigation]} className="smlBtn">
                <SwiperSlide>
                    <HomeBannerBox img={'src/assets/banner1.webp'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={'src/assets/banner2.webp'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={'src/assets/banner3.webp'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={'src/assets/banner4.webp'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={'src/assets/banner1.webp'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={'src/assets/banner2.webp'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={'src/assets/banner3.webp'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={'src/assets/banner4.webp'} link="/" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HomeAdsBannerSlider;
