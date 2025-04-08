import React, { useRef, useState } from 'react';

import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import '../ProductZoom/ProductZoom.css';

const ProductZoom = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const zoomSliderBig = useRef();
    const zoomSliderSml = useRef();

    const goto = (index) => {
        setSlideIndex(index);
        zoomSliderSml.current.swiper.slideTo(index);
        zoomSliderBig.current.swiper.slideTo(index);
    };
    return (
        <>
            <div className="flex gap-3">
                <div className="slider w-[15%]">
                    <Swiper
                        ref={zoomSliderSml}
                        direction={'vertical'}
                        slidesPerView={5}
                        spaceBetween={0}
                        navigation={true}
                        modules={[Navigation]}
                        className="zoomProductSliderThumbs h-[500px] overflow-hidden"
                    >
                        <SwiperSlide>
                            <div
                                className={`item rounded-md overflow-hidden cursor-pointer group 
                                    ${slideIndex === 0 ? 'opacity-1' : 'opacity-30'}`}
                                onClick={() => goto(0)}
                            >
                                <img
                                    src="https://serviceapi.spicezgold.com/download/1742462552739_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp"
                                    alt=""
                                    className="w-full transition-all group-hover:scale-105"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`item rounded-md overflow-hidden cursor-pointer group 
                                    ${slideIndex === 1 ? 'opacity-1' : 'opacity-30'}`}
                                onClick={() => goto(1)}
                            >
                                <img
                                    src="https://serviceapi.spicezgold.com/download/1742439887417_miss-ayse-women-s-multicolor-crepe-printed-top-product-images-rvvlrud6qm-1-202410111253.webp"
                                    alt=""
                                    className="w-full transition-all group-hover:scale-105"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`item rounded-md overflow-hidden cursor-pointer group 
                                    ${slideIndex === 2 ? 'opacity-1' : 'opacity-30'}`}
                                onClick={() => goto(2)}
                            >
                                <img
                                    src="https://serviceapi.spicezgold.com/download/1742462552741_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-3-202308161432.webp"
                                    alt=""
                                    className="w-full transition-all group-hover:scale-105"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`item rounded-md overflow-hidden cursor-pointer group 
                                    ${slideIndex === 3 ? 'opacity-1' : 'opacity-30'}`}
                                onClick={() => goto(3)}
                            >
                                <img
                                    src="https://serviceapi.spicezgold.com/download/1742439887415_miss-ayse-women-s-multicolor-crepe-printed-top-product-images-rvvlrud6qm-0-202410111253.webp"
                                    alt=""
                                    className="w-full transition-all group-hover:scale-105"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`item rounded-md overflow-hidden cursor-pointer group 
                                    ${slideIndex === 4 ? 'opacity-1' : 'opacity-30'}`}
                                onClick={() => goto(4)}
                            >
                                <img
                                    src="https://serviceapi.spicezgold.com/download/1742462552744_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-1-202308161432.webp"
                                    alt=""
                                    className="w-full transition-all group-hover:scale-105"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`item rounded-md overflow-hidden cursor-pointer group 
                                    ${slideIndex === 5 ? 'opacity-1' : 'opacity-30'}`}
                                onClick={() => goto(5)}
                            >
                                <img
                                    src="https://serviceapi.spicezgold.com/download/1742462287664_siril-poly-silk-white-beige-color-saree-with-blouse-piece-product-images-rv2vcdkuly-2-202304220523.webp"
                                    alt=""
                                    className="w-full transition-all group-hover:scale-105"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`item rounded-md overflow-hidden cursor-pointer group 
                                    ${slideIndex === 6 ? 'opacity-1' : 'opacity-30'}`}
                                onClick={() => goto(6)}
                            >
                                <img
                                    src="https://serviceapi.spicezgold.com/download/1742462287664_siril-poly-silk-white-beige-color-saree-with-blouse-piece-product-images-rv2vcdkuly-0-202304220523.webp"
                                    alt=""
                                    className="w-full transition-all group-hover:scale-105"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide></SwiperSlide>
                    </Swiper>
                </div>

                <div className="zoomContainer w-[85%] h-[500px] overflow-hidden rounded-lg">
                    <Swiper ref={zoomSliderBig} slidesPerView={1} spaceBetween={0} navigation={false}>
                        <SwiperSlide>
                            <InnerImageZoom
                                zoomType="hover"
                                zoomScale={1}
                                src="https://serviceapi.spicezgold.com/download/1742462552739_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <InnerImageZoom
                                zoomType="hover"
                                zoomScale={1}
                                src="https://serviceapi.spicezgold.com/download/1742439887417_miss-ayse-women-s-multicolor-crepe-printed-top-product-images-rvvlrud6qm-1-202410111253.webp"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <InnerImageZoom
                                zoomType="hover"
                                zoomScale={1}
                                src="https://serviceapi.spicezgold.com/download/1742462552741_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-3-202308161432.webp"
                            />
                        </SwiperSlide>

                        <SwiperSlide>
                            <InnerImageZoom
                                zoomType="hover"
                                zoomScale={1}
                                src="https://serviceapi.spicezgold.com/download/1742439887415_miss-ayse-women-s-multicolor-crepe-printed-top-product-images-rvvlrud6qm-0-202410111253.webp"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <InnerImageZoom
                                zoomType="hover"
                                zoomScale={1}
                                src="https://serviceapi.spicezgold.com/download/1742462552744_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-1-202308161432.webp"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <InnerImageZoom
                                zoomType="hover"
                                zoomScale={1}
                                src="https://serviceapi.spicezgold.com/download/1742462287664_siril-poly-silk-white-beige-color-saree-with-blouse-piece-product-images-rv2vcdkuly-2-202304220523.webp"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <InnerImageZoom
                                zoomType="hover"
                                zoomScale={1}
                                src="https://serviceapi.spicezgold.com/download/1742462287664_siril-poly-silk-white-beige-color-saree-with-blouse-piece-product-images-rv2vcdkuly-0-202304220523.webp"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default ProductZoom;
