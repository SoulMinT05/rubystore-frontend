import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

import '../HomeCatSlider/HomeCatSlider.css';
const HomeCatSlider = () => {
    return (
        <div className="homeCatSlider">
            <div className="container">
                <Swiper
                    slidesPerView={8}
                    spaceBetween={10}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img
                                    className="w-[60px] transition-all"
                                    src="src/assets/electronic-slider.png"
                                    alt=""
                                />
                                <h3 className="link text-[15px] font-[500] mt-3">Thời trang</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img
                                    className="w-[60px] transition-all"
                                    src="src/assets/electronic-slider.png"
                                    alt=""
                                />
                                <h3 className="link text-[15px] font-[500] mt-3">Thời trang</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img
                                    className="w-[60px] transition-all"
                                    src="src/assets/electronic-slider.png"
                                    alt=""
                                />
                                <h3 className="link text-[15px] font-[500] mt-3">Thời trang</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img
                                    className="w-[60px] transition-all"
                                    src="src/assets/electronic-slider.png"
                                    alt=""
                                />
                                <h3 className="link text-[15px] font-[500] mt-3">Thời trang</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img
                                    className="w-[60px] transition-all"
                                    src="src/assets/electronic-slider.png"
                                    alt=""
                                />
                                <h3 className="link text-[15px] font-[500] mt-3">Thời trang</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img
                                    className="w-[60px] transition-all"
                                    src="src/assets/electronic-slider.png"
                                    alt=""
                                />
                                <h3 className="link text-[15px] font-[500] mt-3">Thời trang</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img
                                    className="w-[60px] transition-all"
                                    src="src/assets/electronic-slider.png"
                                    alt=""
                                />
                                <h3 className="link text-[15px] font-[500] mt-3">Thời trang</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img
                                    className="w-[60px] transition-all"
                                    src="src/assets/electronic-slider.png"
                                    alt=""
                                />
                                <h3 className="link text-[15px] font-[500] mt-3">Thời trang</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img
                                    className="w-[60px] transition-all"
                                    src="src/assets/electronic-slider.png"
                                    alt=""
                                />
                                <h3 className="link text-[15px] font-[500] mt-3">Thời trang</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img
                                    className="w-[60px] transition-all"
                                    src="src/assets/electronic-slider.png"
                                    alt=""
                                />
                                <h3 className="link text-[15px] font-[500] mt-3">Thời trang</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img
                                    className="w-[60px] transition-all"
                                    src="src/assets/electronic-slider.png"
                                    alt=""
                                />
                                <h3 className="link text-[15px] font-[500] mt-3">Thời trang</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default HomeCatSlider;
