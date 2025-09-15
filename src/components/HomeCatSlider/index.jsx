import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import './HomeCatSlider.scss';
import { MyContext } from '@/App';

const HomeCatSlider = ({ categories }) => {
    const context = useContext(MyContext);
    return (
        <div className="homeCatSlider pt-2 lg:pt-4 py-4 lg:py-8">
            <div className="container">
                <Swiper
                    slidesPerView={8}
                    spaceBetween={10}
                    navigation={context?.windowWidth <= 992 ? false : true}
                    modules={[Navigation, FreeMode]}
                    freeMode={true}
                    breakpoints={{
                        300: {
                            slidesPerView: 3,
                            spaceBetween: 5,
                        },
                        550: {
                            slidesPerView: 4,
                            spaceBetween: 5,
                        },
                        990: {
                            slidesPerView: 5,
                            spaceBetween: 5,
                        },
                        1100: {
                            slidesPerView: 6,
                            spaceBetween: 5,
                        },
                    }}
                    className="mySwiper"
                >
                    {categories?.length !== 0 &&
                        categories?.map((category, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Link to={`/product?categoryId=${category?._id}`}>
                                        <div className="item py-4 lg:py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                            <img
                                                className=" w-[40px] lg:w-[60px] transition-all"
                                                src={category?.images[0]}
                                                alt=""
                                            />
                                            <h3 className="link text-[12px] lg:text-[15px] line-clamp-1 text-center font-[500] mt-3">
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
