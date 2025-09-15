import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

import './HomeBannerSlider.scss';
import { MyContext } from '@/App';
import bigBanner1 from '@/assets/big_banner_1.png';
import bigBanner2 from '@/assets/big_banner_2.png';
import bigBanner3 from '@/assets/big_banner_3.png';
import bigBanner4 from '@/assets/big_banner_4.jpg';

const HomeBannerSlider = () => {
    const context = useContext(MyContext);
    return (
        <Swiper
            loop={true}
            spaceBetween={30}
            effect={'fade'}
            navigation={context?.windowWidth <= 992 ? false : true}
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
                    <img src={bigBanner1} className="lg:h-[230px] w-full" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item w-full rounded-md overflow-hidden">
                    <img className="lg:h-[230px] w-full" src={bigBanner3} />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item w-full rounded-md overflow-hidden">
                    <img className="lg:h-[230px] w-full" src={bigBanner2} />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item w-full rounded-md overflow-hidden">
                    <img className="lg:h-[230px] w-full" src={bigBanner4} />
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default HomeBannerSlider;
