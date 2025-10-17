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
import { TIME_OUT_LOADING, LIMIT_PER_PAGE } from '@/constants/ui';

const ProductDetailsPage = () => {
    const context = useContext(MyContext);
    const { slug } = useParams();
    const { reviews } = useSelector((state) => state?.review);
    const dispatch = useDispatch();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [activeTab, setActiveTab] = useState(0);

    const tab = searchParams.get('tab');

    const [categorySlug, setCategorySlug] = useState('');
    const [subCategorySlug, setSubCategorySlug] = useState('');
    const [thirdSubCategorySlug, setThirdSubCategorySlug] = useState('');
    const [product, setProduct] = useState();
    const [averageRating, setAverageRating] = useState('');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const sanitizedDescription = DOMPurify.sanitize(product?.description, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'span', 'img'],
        ALLOWED_ATTR: ['src', 'alt', 'title', 'width', 'height', 'style'],
    });
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [isLoadingProductDetails, setIsLoadingProductDetails] = useState(false);

    const itemsPerPage = LIMIT_PER_PAGE;
    const [currentPage, setCurrentPage] = useState(1); // State lưu trang hiện tại
    const [totalPages, setTotalPages] = useState(1);
    const [totalReviews, setTotalReviews] = useState(1);
    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

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
        const getReviewsFromDetailsProduct = async () => {
            let url = `/api/user/reviews/getReviewsBySlugProduct/${slug}?page=${currentPage}&perPage=${itemsPerPage}`;
            try {
                const { data } = await axiosAuth.get(url);
                console.log('reviewsFromDetailsProduct: ', data);
                if (data.success) {
                    dispatch(fetchReviews(data?.reviews));
                    setTotalPages(data?.totalPages);
                    setTotalReviews(data?.totalReviews);
                    setAverageRating(data?.product?.averageRating);
                }
            } catch (error) {
                console.log(error);
                context.openAlertBox('error', error.response.data.message);
            }
        };
        getReviewsFromDetailsProduct();
    }, [slug, currentPage, itemsPerPage, context, dispatch]);

    useEffect(() => {
        if (product) {
            const updatedProduct = { ...product, review: reviews, averageRating };
            setProduct(updatedProduct);
        }
    }, [reviews, averageRating]);

    useEffect(() => {
        setIsLoadingProductDetails(true);

        const fetchProductDetails = async () => {
            try {
                const { data } = await axiosAuth.get(`/api/product/getDetailsProductFromUserBySlug/${slug}`);
                if (data?.success) {
                    setProduct(data?.product);
                    setCategorySlug(data?.product?.categorySlug);
                    setSubCategorySlug(data?.product?.subCategorySlug);
                    setThirdSubCategorySlug(data?.product?.thirdSubCategorySlug);

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
        }, TIME_OUT_LOADING);

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
                            to={`/${categorySlug}`}
                            className="link transition !text-[14px] lg:!text-[16px]"
                        >
                            {product?.categoryName}
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            to={`/${subCategorySlug}`}
                            className="link transition !text-[14px] lg:!text-[16px]"
                        >
                            {product?.subCategoryName}
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            to={`/${thirdSubCategorySlug}`}
                            className="link transition !text-[14px] lg:!text-[16px] pointer-events-none cursor-default"
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

                        <div className="container pt-7 lg:pt-10 px-4 ">
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
                                    Đánh giá ({totalReviews || 0})
                                </span>
                            </div>

                            {activeTab === 0 && (
                                <div className="">
                                    <div
                                        className={`w-full description-content ${isLoadMore ? '' : 'line-clamp-3'}`}
                                        style={{
                                            maxWidth: '100%',
                                            wordWrap: 'break-word',
                                        }}
                                        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                                    />
                                    <div className="text-center my-4">
                                        <button
                                            onClick={() => setIsLoadMore(!isLoadMore)}
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            {isLoadMore ? 'Thu gọn' : 'Xem thêm'}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 1 && (
                                <div id="review-section" className="shadow-md w-[100%] py-5 px-8 rounded-md">
                                    {product?._id && (
                                        <ReviewComponent
                                            productId={product?._id}
                                            totalPages={totalPages}
                                            currentPage={currentPage}
                                            handleChangePage={handleChangePage}
                                        />
                                    )}
                                </div>
                            )}
                        </div>

                        {relatedProducts?.length !== 0 && (
                            <div className="container pt-8 px-[16px]">
                                <h2 className="text-[16px] lg:text-[17px] text-black pb-0">Sản phẩm liên quan</h2>
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
