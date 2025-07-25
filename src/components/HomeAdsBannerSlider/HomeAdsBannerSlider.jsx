import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import { Link } from 'react-router-dom';
import HomeBannerBox from '../HomeBannerBox/HomeBannerBox';

import '../HomeAdsBannerSlider/HomeAdsBannerSlider.css';
import { MyContext } from '../../App';

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
                    <HomeBannerBox img={'src/assets/shopee_1.jpeg'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={'src/assets/shopee_2.jpeg'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={'src/assets/shopee_3.jpeg'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={'src/assets/shopee_1.jpeg'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={'src/assets/shopee_2.jpeg'} link="/" />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeBannerBox img={'src/assets/shopee_3.jpeg'} link="/" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HomeAdsBannerSlider;
