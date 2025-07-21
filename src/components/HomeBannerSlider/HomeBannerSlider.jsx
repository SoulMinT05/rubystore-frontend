import React, { useContext } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Button } from '@mui/material';

import '../HomeBannerSlider/HomeBannerSlider.css';
import { MyContext } from '../../App';

const HomeBannerSlider = () => {
    const context = useContext(MyContext);
    return (
        <Swiper
            loop={true}
            spaceBetween={30}
            effect={'fade'}
            navigation={context?.windowWidth < 992 ? false : true}
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            className="homeBannerSlider"
        >
            <SwiperSlide>
                <div className="item w-full rounded-md overflow-hidden relative">
                    <img
                        src="https://cf.shopee.vn/file/vn-11134258-7ras8-m5184szf0klz56_xxhdpi"
                        className="lg:h-[230px] w-full"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item w-full rounded-md overflow-hidden">
                    <img
                        className="lg:h-[230px] w-full"
                        src="https://cf.shopee.vn/file/sg-11134258-7rffa-m9a09twreqw9d7_xxhdpi"
                    />
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default HomeBannerSlider;
