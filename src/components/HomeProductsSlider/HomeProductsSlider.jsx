import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import HomeProductsItem from '../HomeProductsItem/HomeProductsItem';

import '../HomeProductsSlider/HomeProductsSlider.css';

const HomeProductsSlider = ({ items }) => {
    return (
        <div className="productsSlider py-3">
            <Swiper
                slidesPerView={items}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <HomeProductsItem />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeProductsItem />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeProductsItem />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeProductsItem />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeProductsItem />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeProductsItem />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeProductsItem />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeProductsItem />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeProductsItem />
                </SwiperSlide>
                <SwiperSlide>
                    <HomeProductsItem />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HomeProductsSlider;
