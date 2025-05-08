import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
const HomeSlider = ({ homeSlides }) => {
    return (
        <div className="homeSlider py-4">
            <div className="container">
                <Swiper
                    loop={true}
                    spaceBetween={10}
                    autoplay={{
                        delay: 25500,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    className="homeSwiper"
                >
                    {homeSlides?.length !== 0 &&
                        homeSlides?.map((homeSlide, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className="item rounded-[20px] overflow-hidden">
                                        <img
                                            src={homeSlide?.image}
                                            alt="Banner slide"
                                            className="w-full max-h-[380px] object-cover"
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}

                    <SwiperSlide>
                        <div className="item rounded-[20px] overflow-hidden">
                            <img src="src/assets/slider-2.jpg" alt="Banner slide" className="w-full" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item rounded-[20px] overflow-hidden">
                            <img src="src/assets/slider-3.jpg" alt="Banner slide" className="w-full" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item rounded-[20px] overflow-hidden">
                            <img src="src/assets/slider-4.jpg" alt="Banner slide" className="w-full" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default HomeSlider;
