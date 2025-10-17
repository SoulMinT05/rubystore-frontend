import React, { useContext, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import './HomeProductsSlider.scss';
import { MyContext } from '@/App';
import HomeProductsItem from '../HomeProductsItem';

const HomeProductsSlider = ({ products }) => {
    const context = useContext(MyContext);
    const [slidesPerView, setSlidesPerView] = useState(1);
    return (
        <div className="productsSlider pb-3">
            <Swiper
                slidesPerView={slidesPerView}
                slidesPerGroup={slidesPerView}
                spaceBetween={10}
                navigation={context?.windowWidth > 992 ? true : false}
                modules={[Navigation, FreeMode]}
                freeMode={true}
                breakpoints={{
                    250: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    300: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    550: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    600: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    800: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    990: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1100: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                }}
                onSwiper={(swiper) => {
                    console.log('onSwiper: ', swiper.params.slidesPerView);
                    // lấy slidesPerView ban đầu
                    setSlidesPerView(swiper.params.slidesPerView);
                }}
                onBreakpoint={(swiper) => {
                    // cập nhật khi thay đổi breakpoint
                    console.log('onBreakpoint: ', swiper.params.slidesPerView);
                    setSlidesPerView(swiper.params.slidesPerView);
                }}
                className="mySwiper"
            >
                {products?.map((product, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <HomeProductsItem product={product} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default HomeProductsSlider;
