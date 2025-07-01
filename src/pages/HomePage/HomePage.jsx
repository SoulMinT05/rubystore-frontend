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
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import HomeBlogsItem from '../../components/HomeBlogsItem/HomeBlogsItem';
import HomeBannerSlider from '../../components/HomeBannerSlider/HomeBannerSlider';
import HomeBannerImage from '../../components/HomeBannerImage/HomeBannerImage';
import axiosAuth from '../../apis/axiosAuth';
import { MyContext } from '../../App';
import ProductLoading from '../../components/ProductLoading/ProductLoading';

const HomePage = () => {
    const context = useContext(MyContext);
    const [value, setValue] = useState(0);
    const [banners, setBanners] = useState([]);
    const [homeSlides, setHomeSlides] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const getBanners = async () => {
            const { data } = await axiosAuth.get('/api/banner/all-banners');
            if (data.success) {
                setBanners(data?.banners);
            }
        };

        getBanners();
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
                setFeaturedProducts(data?.featuredProducts);
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
                console.log('dataCategoryByProducts: ', data);
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

    const { blogs, setBlogs } = useContext(MyContext);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const { data } = await axiosAuth.get('/api/blog/all-blogs');
                if (data.success) {
                    setBlogs(data?.blogs);
                } else {
                    console.error('Lỗi lấy bài viết:', data.message);
                }
            } catch (error) {
                console.error('Lỗi API:', error);
                return [];
            }
        };
        getBlogs();
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
            {homeSlides?.length !== 0 && <HomeSlider homeSlides={homeSlides} />}

            {context?.categories?.length !== 0 && <HomeCatSlider categories={context?.categories} />}

            <section className="bg-white py-8">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="leftSec">
                            <h2 className="text-[20px] font-[600]">Sản phẩm phổ biến</h2>
                            <p className="text-[14px] font-[400] mt-0 mb-0">Đừng bỏ lỡ giá tốt vào cuối tháng 3</p>
                        </div>
                        <div className="rightSec w-[60%]">
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

            <section className="py-6">
                <div className="container flex gap-2">
                    <div className="part1 w-[70%] h-[230px]">
                        <HomeBannerSlider />
                    </div>
                    <div className="part2 w-[30%] h-[230px] flex items-center justify-between flex-col">
                        <HomeBannerImage info="left" image={'src/assets/banner_1.jpeg'} />
                        <HomeBannerImage info="right" image={'src/assets/banner_2.jpeg'} />
                    </div>
                </div>
            </section>

            <section className="py-4 pt-6 bg-white">
                <div className="container">
                    <div className="freeShipping w-full py-4 p-4 border-2 border-[#ff5252] flex items-center justify-between rounded-md mb-7">
                        <div className="col1 flex items-center gap-4">
                            <LiaShippingFastSolid className="text-[50px]" />
                            <span className="text-[20px] font-[600] uppercase">Giao hàng miễn phí</span>
                        </div>
                        <div className="col2">
                            <p className="mb-0 font-[500]">Miễn phí giao hàng cho lần đầu tiên và đơn giá trên 700k</p>
                        </div>
                        <p className="font-bold text-[25px]">- Chỉ 700k</p>
                    </div>

                    {/* <HomeAdsBannerSlider items={4} /> */}
                    <HomeAdsBannerSliderSecond items={4} banners={banners} />
                </div>
            </section>

            {/* Latest Products */}
            <section className="py-5 pt-0 bg-white">
                <div className="container">
                    <h2 className="text-[20px] font-[600]">Sản phẩm mới nhất</h2>
                    {products?.length === 0 && <ProductLoading />}
                    {products?.length !== 0 && <HomeProductsSlider items={6} products={products} />}

                    <HomeAdsBannerSlider items={3} />
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-5 pt-0 bg-white">
                <div className="container">
                    <h2 className="text-[20px] font-[600]">Sản phẩm đặc trưng</h2>
                    {featuredProducts?.length === 0 && <ProductLoading />}
                    {featuredProducts?.length !== 0 && <HomeProductsSlider items={6} products={featuredProducts} />}

                    <HomeAdsBannerSlider items={3} />
                </div>
            </section>

            {blogs?.length !== 0 && (
                <section className="blogSection py-5 pb-8 pt-0 bg-white">
                    <div className="container">
                        <h2 className="text-[20px] font-[600] mb-4">Bài viết mới nhất</h2>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={30}
                            navigation={true}
                            modules={[Navigation]}
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
