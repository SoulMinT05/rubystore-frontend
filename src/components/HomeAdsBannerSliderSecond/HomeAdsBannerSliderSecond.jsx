import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import HomeBannerImage from '../HomeBannerImage/HomeBannerImage';

import '../HomeAdsBannerSliderSecond/HomeAdsBannerSliderSecond.css';

const HomeAdsBannerSliderSecond = ({ items }) => {
    return (
        <div className="py-5 w-full">
            <Swiper slidesPerView={items} spaceBetween={10} navigation={true} modules={[Navigation]} className="smlBtn">
                <SwiperSlide>
                    <HomeBannerImage info="left" image={'src/assets/homebannerimg1.jpg'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerImage info="right" image={'src/assets/homebannerimg2.jpg'} link="/" />
                </SwiperSlide>
                {/* <SwiperSlide>
                    <HomeBannerImage info="right" image={'src/assets/homebannerimg3.jpg'} link="/" />
                </SwiperSlide> */}
                <SwiperSlide>
                    <HomeBannerImage info="right" image={'src/assets/homebannerimg4.jpg'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerImage info="left" image={'src/assets/homebannerimg1.jpg'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerImage info="right" image={'src/assets/homebannerimg2.jpg'} link="/" />
                </SwiperSlide>
                {/* <SwiperSlide>
                    <HomeBannerImage info="right" image={'src/assets/homebannerimg3.jpg'} link="/" />
                </SwiperSlide> */}
                <SwiperSlide>
                    <HomeBannerImage info="right" image={'src/assets/homebannerimg4.jpg'} link="/" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HomeAdsBannerSliderSecond;
