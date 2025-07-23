import React, { useContext, useRef, useState } from 'react';

import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import '../ProductZoom/ProductZoom.css';
import { MyContext } from '../../App';

const ProductZoom = ({ images }) => {
    const context = useContext(MyContext);

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
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="slider w-full lg:w-[15%] order-2 lg:order-1">
                    <Swiper
                        ref={zoomSliderSml}
                        direction={context?.windowWidth > 1023 ? 'vertical' : 'horizontal'}
                        slidesPerView={5}
                        spaceBetween={context?.windowWidth > 1023 ? 0 : 10}
                        navigation={true}
                        modules={[Navigation]}
                        className={`zoomProductSliderThumbs  lg:h-[420px] overflow-hidden ${
                            images?.length > 5 && 'space'
                        }`}
                    >
                        {images?.length !== 0 &&
                            images?.map((image, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div
                                            className={`item rounded-md overflow-hidden cursor-pointer group
                                    ${slideIndex === index ? 'opacity-1' : 'opacity-30'}`}
                                            onClick={() => goto(index)}
                                        >
                                            <img
                                                src={image}
                                                alt=""
                                                className="w-full transition-all
                                                    object-cover group-hover:scale-105"
                                            />
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>

                <div className="zoomContainer w-full lg:w-[85%] h-[420px] overflow-hidden rounded-lg order-1 lg:order-2">
                    <Swiper ref={zoomSliderBig} slidesPerView={1} spaceBetween={0} navigation={false}>
                        {images?.length !== 0 &&
                            images?.map((image, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <InnerImageZoom zoomType="hover" zoomScale={1} src={image} />
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default ProductZoom;
