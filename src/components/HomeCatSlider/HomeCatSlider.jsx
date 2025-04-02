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
        <div className="homeCatSlider pt-4 py-8">
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
                                <img className="w-[60px] transition-all" src="src/assets/fashion-slider.png" alt="" />
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
                                <h3 className="link text-[15px] font-[500] mt-3">Đồ điện tử</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="w-[60px] transition-all" src="src/assets/bags-slider.png" alt="" />
                                <h3 className="link text-[15px] font-[500] mt-3">Túi</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="w-[60px] transition-all" src="src/assets/footwear-slider.png" alt="" />
                                <h3 className="link text-[15px] font-[500] mt-3">Giày dép</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="w-[60px] transition-all" src="src/assets/groceries-slider.png" alt="" />
                                <h3 className="link text-[15px] font-[500] mt-3">Thực phẩm</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="w-[60px] transition-all" src="src/assets/beauty-slider.png" alt="" />
                                <h3 className="link text-[15px] font-[500] mt-3">Sắc đẹp</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="w-[60px] transition-all" src="src/assets/wellness-slider.png" alt="" />
                                <h3 className="link text-[15px] font-[500] mt-3">Sức khoẻ</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="w-[60px] transition-all" src="src/assets/jewellery-slider.png" alt="" />
                                <h3 className="link text-[15px] font-[500] mt-3">Trang sức</h3>
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
