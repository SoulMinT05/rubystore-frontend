import React, { useContext } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import HomeProductsItem from '../HomeProductsItem/HomeProductsItem';

import '../HomeProductsSlider/HomeProductsSlider.css';
import { MyContext } from '../../App';

const HomeProductsSlider = ({ items, products }) => {
    const context = useContext(MyContext);
    return (
        <div className="productsSlider pb-3">
            <Swiper
                slidesPerView={items}
                spaceBetween={10}
                // slidesPerGroup={4}
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
