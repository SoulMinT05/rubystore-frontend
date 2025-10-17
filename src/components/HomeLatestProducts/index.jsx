import React, { useContext, useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import './HomeLatestProducts.scss';
import { MyContext } from '@/App';
import HomeProductsItem from '../HomeProductsItem';
import axiosAuth from '@/apis/axiosAuth';
import ProductLoading from '../ProductLoading';
import { LIMIT_SWIPER_PRODUCTS } from '@/constants/ui';

const HomeLatestProducts = () => {
    const context = useContext(MyContext);

    const [slidesPerView, setSlidesPerView] = useState(null);
    const [latestProducts, setLatestProducts] = useState([]);
    // const [page, setPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    // const pageRef = useRef(page);

    // useEffect(() => {
    //     pageRef.current = page;
    // }, [page]);

    useEffect(() => {
        const getSlidesPerView = () => {
            const width = window.innerWidth;
            if (width < 300) return 1;
            if (width < 550) return 2;
            if (width < 600) return 2;
            if (width < 800) return 3;
            if (width < 990) return 4;
            if (width < 1100) return 4;
            return 6;
        };
        setSlidesPerView(getSlidesPerView());
    }, []);

    useEffect(() => {
        console.log({ slidesPerView });
    }, [slidesPerView]);

    useEffect(() => {
        if (slidesPerView !== null) {
            const getLatestProducts = async () => {
                console.log({ slidesPerView });
                const { data } = await axiosAuth.get('/api/product/latest-products', {
                    params: {
                        // page: pageRef.current,
                        // perPage: slidesPerView * 2,
                        perPage: LIMIT_SWIPER_PRODUCTS,
                    },
                });
                console.log('latestProducts: ', data);
                if (data.success) {
                    setLatestProducts(data?.products);
                    // setTotalPages(data.totalPages);
                }
            };
            getLatestProducts();
        }
    }, [slidesPerView]);

    // const handleNext = () => {
    //     console.log('Next Before:', pageRef.current);
    //     if (pageRef.current < totalPages) setPage((prev) => prev + 1);
    // };

    // const handlePrev = () => {
    //     console.log('Prev Before:', pageRef.current);
    //     if (pageRef.current > 1) setPage((prev) => prev - 1);
    // };

    return (
        <div className="relative p-[15px] -my-[15px]">
            {latestProducts?.length === 0 ? (
                <ProductLoading />
            ) : (
                <Swiper
                    slidesPerView={slidesPerView}
                    slidesPerGroup={slidesPerView}
                    spaceBetween={10}
                    navigation={context?.windowWidth > 992 ? true : false}
                    modules={[Navigation, FreeMode]}
                    freeMode={true}
                    breakpoints={{
                        250: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        300: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        550: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        600: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        800: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        990: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        1100: {
                            slidesPerView: 6,
                            spaceBetween: 10,
                        },
                    }}
                    // onSwiper={(swiper) => {
                    //     const view = swiper.params.slidesPerView;
                    //     setSlidesPerView(view);

                    //     const nextBtn = swiper.navigation?.nextEl;
                    //     const prevBtn = swiper.navigation?.prevEl;

                    //     nextBtn?.classList.remove('swiper-button-disabled');
                    //     prevBtn?.classList.remove('swiper-button-disabled');

                    //     console.log({ nextBtn, prevBtn });
                    //     // Xóa listener cũ nếu có (tránh bị gắn chồng)
                    //     nextBtn?.removeEventListener('click', handleNext);
                    //     prevBtn?.removeEventListener('click', handlePrev);

                    //     // Gắn mới
                    //     nextBtn?.addEventListener('click', (e) => {
                    //         e.stopPropagation();
                    //         console.log('Next button clicked');
                    //         handleNext();
                    //     });

                    //     prevBtn?.addEventListener('click', (e) => {
                    //         e.stopPropagation();
                    //         console.log('Prev button clicked');
                    //         handlePrev();
                    //     });
                    // }}
                    // onBreakpoint={(swiper) => {
                    //     const view = swiper.params.slidesPerView;
                    //     setSlidesPerView(view);
                    // }}
                    className="mySwiper"
                >
                    {latestProducts?.map((product, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <HomeProductsItem product={product} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </div>
    );
};

export default HomeLatestProducts;
