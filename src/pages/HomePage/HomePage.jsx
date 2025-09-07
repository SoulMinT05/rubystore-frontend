import React, { useContext, useEffect, useState } from 'react';
import HomeSlider from '../../components/HomeSlider/HomeSlider';
import HomeCatSlider from '../../components/HomeCatSlider/HomeCatSlider';

import { LiaShippingFastSolid } from 'react-icons/lia';
import HomeAdsBannerSlider from '../../components/HomeAdsBannerSlider/HomeAdsBannerSlider';
import HomeAdsBannerSliderSecond from '../../components/HomeAdsBannerSliderSecond/HomeAdsBannerSliderSecond';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HomeProductsSlider from '../../components/HomeProductsSlider/HomeProductsSlider';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import HomeBlogsItem from '../../components/HomeBlogsItem/HomeBlogsItem';
import HomeBannerSlider from '../../components/HomeBannerSlider/HomeBannerSlider';
import HomeBannerImage from '../../components/HomeBannerImage/HomeBannerImage';
import axiosAuth from '../../apis/axiosAuth';
import { MyContext } from '../../App';
import ProductLoading from '../../components/ProductLoading/ProductLoading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/blogSlice';

const HomePage = () => {
    const context = useContext(MyContext);

    const { blogs } = useSelector((state) => state.blog);
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);
    const [homeSlides, setHomeSlides] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const { data } = await axiosAuth.get('/api/blog/all-blogs');
                if (data.success) {
                    dispatch(fetchBlogs(data?.blogs));
                }
            } catch (error) {
                console.error('Lỗi API:', error);
                return [];
            }
        };
        getBlogs();
    }, []);

    useEffect(() => {
        const getHomeSlides = async () => {
            const { data } = await axiosAuth.get('/api/homeSlide/all-home-slides');
            if (data.success) {
                setHomeSlides(data?.homeSlides);
            }
        };

        getHomeSlides();
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axiosAuth.get('/api/product/all-products-user');
            if (data.success) {
                setProducts(data?.products);
            }
        };

        getProducts();
    }, []);
    useEffect(() => {
        const getFeaturedProducts = async () => {
            const { data } = await axiosAuth.get('/api/product/feature');
            if (data.success) {
                setLatestProducts(data?.products);
            }
        };

        getFeaturedProducts();
    }, []);

    useEffect(() => {
        if (context?.categories?.length > 0) {
            const getCategoryByProducts = async () => {
                const { data } = await axiosAuth.get(
                    `/api/product/all-products-category-id/${context?.categories[0]?._id}`
                );
                if (data.success) {
                    setPopularProducts(data?.products);
                }
            };
            getCategoryByProducts();
        }
    }, [context?.categories[0]?._id]);

    useEffect(() => {
        context?.getCategories();
    }, []);

    const handleFilterByCategoryId = (id) => {
        setPopularProducts([]);
        const getCategoryByProducts = async () => {
            const { data } = await axiosAuth.get(`/api/product/all-products-category-id/${id}`);
            if (data.success) {
                setPopularProducts(data?.products);
            }
        };
        getCategoryByProducts();
    };

    return (
        <>
            <div className=" ">{homeSlides?.length !== 0 && <HomeSlider homeSlides={homeSlides} />}</div>

            {context?.categories?.length !== 0 && <HomeCatSlider categories={context?.categories} />}

            <section className="bg-white py-8">
                <div className="container">
                    <div className="flex items-center justify-between flex-col lg:flex-row">
                        <div className="leftSec w-full lg:w-[40%]">
                            <h2 className="text-[14px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-[600]">
                                Sản phẩm phổ biến
                            </h2>
                            <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[14px] font-[400] mt-0 mb-0">
                                Đừng bỏ lỡ giá tốt vào cuối tháng 3
                            </p>
                        </div>
                        <div className="rightSec w-full lg:w-[60%]">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs example"
                            >
                                {context?.categories?.length !== 0 &&
                                    context?.categories?.map((category, index) => {
                                        return (
                                            <Tab
                                                key={index}
                                                label={category?.name}
                                                onClick={() => handleFilterByCategoryId(category?._id)}
                                            />
                                        );
                                    })}
                            </Tabs>
                        </div>
                    </div>

                    {popularProducts?.length === 0 && <ProductLoading />}
                    {popularProducts?.length !== 0 && <HomeProductsSlider items={6} products={popularProducts} />}
                </div>
            </section>

            <section className="py-6 pt-0 bg-white">
                <div className="container flex flex-col lg:flex-row gap-2">
                    <div className="part1 w-full lg:w-[70%] lg:h-[230px]">
                        <HomeBannerSlider />
                    </div>
                    <div className="part2 w-full lg:w-[30%] lg:h-[230px] flex items-center gap-2 justify-between flex-row lg:flex-col">
                        <HomeBannerImage image="src/assets/banner_1.jpeg" />
                        {/* <HomeBannerImage image="src/assets/banner_2.jpeg" /> */}
                        <HomeBannerImage image="src/assets/banner_3.png" />
                    </div>
                </div>
            </section>

            <section className="py-4 lg:pt-6 bg-white">
                <div className="container">
                    <div className="freeShipping w-full py-4 p-4 border-2 border-[#ff5252] flex flex-col lg:flex-row items-center justify-center lg:justify-between rounded-md lg:mb-7">
                        <div className="col1 flex items-center gap-4">
                            <LiaShippingFastSolid className="text-[30px] lg:text-[50px]" />
                            <span className="text-[16px] lg:text-[20px] font-[600] uppercase">Giao hàng miễn phí</span>
                        </div>
                        <div className="col2">
                            <p className="mb-0 font-[500] text-center">
                                Miễn phí giao hàng cho lần đầu tiên và đơn giá trên 700k
                            </p>
                        </div>
                        <p className="font-bold text-[20px] lg:text-[25px]">- Chỉ 700k</p>
                    </div>

                    {/* <HomeAdsBannerSlider items={4} /> */}
                    {/* <HomeAdsBannerSliderSecond items={4} banners={banners} /> */}
                </div>
            </section>

            {/* Latest Products */}
            <section className="py-5 pt-0 bg-white">
                <div className="container">
                    <h2 className="text-[14px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-[600]">
                        Sản phẩm mới nhất
                    </h2>
                    {latestProducts?.length === 0 && <ProductLoading />}
                    {latestProducts?.length !== 0 && <HomeProductsSlider items={6} products={latestProducts} />}

                    <HomeAdsBannerSlider items={3} />
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-5 pt-0 bg-white">
                <div className="container">
                    <h2 className="text-[14px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-[600] -pb-2">
                        Sản phẩm đặc trưng
                    </h2>
                    {products?.length === 0 && <ProductLoading />}
                    {products?.length !== 0 && <HomeProductsSlider items={6} products={products} />}

                    <HomeAdsBannerSlider items={3} />
                </div>
            </section>

            {/* BLOGS */}
            {blogs?.length !== 0 && (
                <section className="blogSection py-5 pb-8 pt-0 bg-white">
                    <div className="container">
                        <h2 className="text-[14px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-[600] mb-4">
                            Bài viết mới nhất
                        </h2>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={30}
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
                                530: {
                                    slidesPerView: 3,
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
                                    spaceBetween: 20,
                                },
                            }}
                            className="blogSwiper"
                        >
                            {blogs?.map((blog, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <HomeBlogsItem blog={blog} />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </section>
            )}
        </>
    );
};

export default HomePage;
