import React, { useContext, useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { CircularProgress } from '@mui/material';
import { Link, useLocation, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';

import './ProductDetailsPage.scss';
import ProductZoom from '@/components/ProductZoom';
import axiosAuth from '@/apis/axiosAuth';
import { MyContext } from '@/App';
import { fetchReviews } from '@/redux/reviewSlice';
import HomeProductsSlider from '@/components/HomeProductsSlider';
import ProductDetailsComponent from '@/components/ProductDetailsComponent';
import ReviewComponent from '@/components/ReviewComponent';

const ProductDetailsPage = () => {
    const context = useContext(MyContext);
    const { slug } = useParams();
    const { reviews } = useSelector((state) => state?.review);
    const dispatch = useDispatch();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [activeTab, setActiveTab] = useState(0);

    const tab = searchParams.get('tab');

    const [product, setProduct] = useState();
    const [averageRating, setAverageRating] = useState('');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const sanitizedDescription = DOMPurify.sanitize(product?.description, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'span', 'img'],
        ALLOWED_ATTR: ['src', 'alt', 'title', 'width', 'height', 'style'],
    });
    const [isLoadingProductDetails, setIsLoadingProductDetails] = useState(false);

    // Scroll when tab is review
    useEffect(() => {
        if (tab === 'review') {
            setActiveTab(1);

            // Scroll đến phần review sau khi tab được active
            setTimeout(() => {
                document.getElementById('review-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }, [tab]);

    useEffect(() => {
        // setIsLoadingReviews(true);

        const getDetailsReview = async () => {
            try {
                const { data } = await axiosAuth.get(`/api/user/reviews/getReviewsBySlugProduct/${slug}`);
                console.log('detailsRevie: ', data);
                if (data.success) {
                    dispatch(fetchReviews(data?.product?.review));
                    setAverageRating(data?.product?.averageRating);
                }
            } catch (error) {
                console.log(error);
                context.openAlertBox('error', error.response.data.message);
            }
            //  finally {
            //     setIsLoadingReviews(false);
            // }
        };
        getDetailsReview();
    }, []);

    useEffect(() => {
        if (product) {
            const updatedProduct = { ...product, review: reviews, averageRating };
            setProduct(updatedProduct);
        }
    }, [reviews]);

    useEffect(() => {
        setIsLoadingProductDetails(true);

        const fetchProductDetails = async () => {
            try {
                const { data } = await axiosAuth.get(`/api/product/getDetailsProductFromUserBySlug/${slug}`);
                console.log('productDetails: ', data);
                if (data?.success) {
                    setProduct(data?.product);

                    const relatedProducts = await axiosAuth.get(
                        `/api/product/all-products-sub-category-id/${data?.product?.subCategoryId}`
                    );
                    if (relatedProducts?.data?.success) {
                        const filteredProducts = relatedProducts?.data?.products.filter(
                            (product) => product?.slug !== slug
                        );
                        setRelatedProducts(filteredProducts);
                    }
                }
            } catch (error) {
                console.log('error: ', error);
                context.openAlertBox('error', error.response.data.message);
            } finally {
                setIsLoadingProductDetails(false);
            }
        };

        const timeout = setTimeout(() => {
            fetchProductDetails();
        }, import.meta.env.VITE_TIME_OUT_LOADING);

        return () => {
            clearTimeout(timeout);
        };
    }, [slug]);

    return (
        <>
            <div className="py-5">
                <div className="container p-2 lg:p-0">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            to="/"
                            className="link transition !text-[14px] lg:!text-[16px]"
                        >
                            Trang chủ
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            to={`/product?categoryId=${product?.category?._id}`}
                            className="link transition !text-[14px] lg:!text-[16px]"
                        >
                            {product?.categoryName}
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            to={`/product?subCategoryId=${product?.subCategoryId}`}
                            className="link transition !text-[14px] lg:!text-[16px]"
                        >
                            {product?.subCategoryName}
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            className="link transition !text-[14px] lg:!text-[16px]"
                        >
                            {product?.name?.length > 50 ? `${product?.name?.substring(0, 50)}...` : product?.name}
                        </Link>
                    </Breadcrumbs>
                </div>
            </div>

            <section className="bg-white py-5">
                {isLoadingProductDetails ? (
                    <div className="flex items-center justify-center min-h-[300px]">
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <div className="container flex flex-col lg:flex-row gap-8">
                            <div className="productZoomContainer w-full lg:w-[40%]">
                                <ProductZoom images={product?.images} />
                            </div>

                            <div className="productContent -mt-[24px] lg:mt-0 w-full lg:w-[60%] px-4 lg:px-10">
                                <ProductDetailsComponent product={product} />
                            </div>
                        </div>

                        <div className="container pt-7 lg:pt-10 px-4 lg:px-0">
                            <div className="flex items-center gap-8 mb-3 lg:mb-5">
                                <span
                                    className={`link text-[16px] lg:text-[17px] cursor-pointer font-[500] ${
                                        activeTab === 0 ? 'text-[#ff5252]' : ''
                                    }`}
                                    onClick={() => setActiveTab(0)}
                                >
                                    Mô tả sản phẩm
                                </span>
                                <span
                                    className={`link text-[16px] lg:text-[17px] cursor-pointer font-[500] ${
                                        activeTab === 1 ? 'text-[#ff5252]' : ''
                                    }`}
                                    onClick={() => setActiveTab(1)}
                                >
                                    Đánh giá ({reviews?.length || 0})
                                </span>
                            </div>

                            {activeTab === 0 && (
                                <div
                                    className="w-full description-content"
                                    style={{
                                        maxWidth: '100%',
                                        wordWrap: 'break-word',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                                />
                            )}
                            {activeTab === 1 && (
                                <div id="review-section" className="shadow-md w-[100%] py-5 px-8 rounded-md">
                                    {product?._id && <ReviewComponent product={product} />}
                                </div>
                            )}
                        </div>

                        {relatedProducts?.length !== 0 && (
                            <div className="container pt-8 px-[16px]">
                                <h2 className="text-[18px] sm:text-[20px] lg:text-[22px] font-[600] pb-0">
                                    Sản phẩm liên quan
                                </h2>
                                <HomeProductsSlider items={6} products={relatedProducts} />
                            </div>
                        )}
                    </>
                )}
            </section>
        </>
    );
};

export default ProductDetailsPage;
