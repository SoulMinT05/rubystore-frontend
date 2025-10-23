import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import './HomeAdsBannerSlider.scss';
import { MyContext } from '@/App';
import HomeBannerBox from '../HomeBannerBox';

import adsBanner1 from '@/assets/shopee_1.jpeg';
import adsBanner2 from '@/assets/shopee_2.jpeg';
import adsBanner3 from '@/assets/shopee_3.jpeg';

import adsBanner4 from '@/assets/shopee_4.png';
import adsBanner5 from '@/assets/shopee_5.png';
import adsBanner7 from '@/assets/shopee_7.png';

import adsBanner6 from '@/assets/shopee_6.jpg';

const HomeAdsBannerSlider = ({ items }) => {
    const context = useContext(MyContext);
    return (
        <div className="py-5 w-full">
            <Swiper
                slidesPerView={items}
                spaceBetween={10}
                navigation={context?.windowWidth <= 992 ? false : true}
                modules={[Navigation, FreeMode]}
                freeMode={true}
                breakpoints={{
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 5,
                    },
                    550: {
                        slidesPerView: 2,
                        spaceBetween: 5,
                    },
                    800: {
                        slidesPerView: 2,
                        spaceBetween: 5,
                    },
                    990: {
                        slidesPerView: 3,
                        spaceBetween: 5,
                    },
                    1100: {
                        slidesPerView: 3,
                        spaceBetween: 5,
                    },
                }}
                className="smlBtn"
            >
                <SwiperSlide>
                    <HomeBannerBox img={adsBanner4} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={adsBanner5} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={adsBanner7} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={adsBanner6} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={adsBanner1} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={adsBanner2} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={adsBanner3} link="/" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HomeAdsBannerSlider;
