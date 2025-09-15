import React, { useContext } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { MyContext } from '@/App';

const HomeSlider = ({ homeSlides }) => {
    const context = useContext(MyContext);
    return (
        <div className="homeSlider pb-2 lg:py-4">
            <div className="container">
                <Swiper
                    loop={true}
                    spaceBetween={10}
                    autoplay={{
                        delay: 25500,
                        disableOnInteraction: false,
                    }}
                    navigation={context?.windowWidth <= 992 ? false : true}
                    modules={[Autoplay, Navigation]}
                    className="homeSwiper"
                >
                    {homeSlides?.length !== 0 &&
                        homeSlides?.map((homeSlide, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className="item rounded-[10px] overflow-hidden">
                                        <img
                                            src={homeSlide?.image}
                                            alt="Banner slide"
                                            className="w-full max-h-[380px] object-cover"
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeSlider;
