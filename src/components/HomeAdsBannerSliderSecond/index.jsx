import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './HomeAdsBannerSliderSecond.scss';
import HomeBannerImageSecond from '../HomeBannerImageSecond';

const HomeAdsBannerSliderSecond = ({ items, banners }) => {
    return (
        <div className="py-5 w-full">
            <Swiper slidesPerView={items} spaceBetween={10} navigation={true} modules={[Navigation]} className="smlBtn">
                {banners?.map((banner, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <HomeBannerImageSecond banner={banner} link="/" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default HomeAdsBannerSliderSecond;
