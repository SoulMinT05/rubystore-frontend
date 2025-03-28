import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
const HomeSlider = () => {
    return (
        <div className="homeSlider py-4">
            <div className="container">
                <Swiper spaceBetween={10} navigation={true} modules={[Navigation]} className="homeSwiper">
                    <SwiperSlide>
                        <div className="item rounded-[20px] overflow-hidden">
                            <img src="src/assets/slider-3.jpg" alt="Banner slide" className="w-full" />
                        </div>
                    </SwiperSlide>
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
