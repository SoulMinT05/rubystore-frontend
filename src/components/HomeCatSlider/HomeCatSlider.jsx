import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

import '../HomeCatSlider/HomeCatSlider.css';
const HomeCatSlider = ({ categories }) => {
    return (
        <div className="homeCatSlider pt-4 py-8">
            <div className="container">
                <Swiper
                    slidesPerView={8}
                    spaceBetween={10}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {categories?.length !== 0 &&
                        categories?.map((category, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Link to={`/product?categoryId=${category?._id}`}>
                                        <div className="item h-[176px] py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                            <img className="w-[60px] transition-all" src={category?.images[0]} alt="" />
                                            <h3 className="link text-[15px] line-clamp-1 text-center font-[500] mt-3">
                                                {category?.name}
                                            </h3>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeCatSlider;
