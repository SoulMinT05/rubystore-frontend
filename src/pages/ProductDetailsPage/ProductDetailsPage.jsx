import React, { useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Rating from '@mui/material/Rating';
import { Button, TextField, CircularProgress } from '@mui/material';
import Pagination from '@mui/material/Pagination';

import { Link, useLocation, useParams } from 'react-router-dom';

import ProductZoom from '../../components/ProductZoom/ProductZoom';

import '../ProductDetailsPage/ProductDetailsPage.css';
import HomeProductsSlider from '../../components/HomeProductsSlider/HomeProductsSlider';
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent';
import axiosAuth from '../../apis/axiosAuth';
import DOMPurify from 'dompurify';
import ReviewComponent from '../../components/ReviewComponent/ReviewComponent';
import { MyContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../redux/reviewSlice';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { reviews } = useSelector((state) => state?.review);
    const dispatch = useDispatch();

    const location = useLocation();
    const [activeTab, setActiveTab] = useState(0);
    const searchParams = new URLSearchParams(location.search);

    const tab = searchParams.get('tab');

    const [product, setProduct] = useState();
    const [averageRating, setAverageRating] = useState('');
    const [relatedProducts, setRelatedProducts] = useState([]);

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
        getDetailsReview();
    }, []);

    useEffect(() => {
        if (product) {
            const updatedProduct = { ...product, review: reviews, averageRating };
            setProduct(updatedProduct);
        }
    }, [reviews]);

    const sanitizedDescription = DOMPurify.sanitize(product?.description, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'span', 'img'],
        ALLOWED_ATTR: ['src', 'alt', 'title', 'width', 'height', 'style'],
    });
    const [isLoading, setIsLoading] = useState(false);

    const getDetailsReview = async () => {
        try {
            const { data } = await axiosAuth.get(`/api/user/reviews/${id}`);
            console.log('dataDetailsRv: ', data);
            dispatch(fetchReviews(data?.product?.review));
            setAverageRating(data?.product?.averageRating);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchProductDetails = async () => {
            const { data } = await axiosAuth.get(`/api/product/${id}`);
            if (data?.success) {
                setProduct(data?.product);
                setIsLoading(false);

                const relatedProducts = await axiosAuth.get(
                    `/api/product/all-products-sub-category-id/${data?.product?.subCategoryId}`
                );
                if (relatedProducts?.data?.success) {
                    const filteredProducts = relatedProducts?.data?.products.filter((product) => product?._id !== id);
                    setRelatedProducts(filteredProducts);
                }
            }
        };
        fetchProductDetails();
    }, [id]);

    return (
        <>
            <div className="py-5">
                <div className="container">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="/" className="link transition !text-[14px]s">
                            Trang chủ
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            to={`/product?categoryId=${product?.category?._id}`}
                            className="link transition !text-[14px]s"
                        >
                            {product?.categoryName}
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            to={`/product?subCategoryId=${product?.subCategoryId}`}
                            className="link transition !text-[14px]s"
                        >
                            {product?.subCategoryName}
                        </Link>
                        <Link underline="hover" color="inherit" className="link transition !text-[14px]s">
                            {product?.name?.length > 50 ? `${product?.name?.substring(0, 50)}...` : product?.name}
                        </Link>
                    </Breadcrumbs>
                </div>
            </div>

            <section className="bg-white py-5">
                {isLoading === true ? (
                    <div className="flex items-center justify-center min-h-[300px]">
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <div className="container flex gap-8 ">
                            <div className="productZoomContainer w-[40%]">
                                <ProductZoom images={product?.images} />
                            </div>

                            <div className="productContent w-[60%] pr-10 pl-10">
                                <ProductDetailsComponent product={product} />
                            </div>
                        </div>

                        <div className="container pt-10">
                            <div className="flex items-center gap-8 mb-5">
                                <span
                                    className={`link text-[17px] cursor-pointer font-[500] ${
                                        activeTab === 0 ? 'text-[#ff5252]' : ''
                                    }`}
                                    onClick={() => setActiveTab(0)}
                                >
                                    Mô tả sản phẩm
                                </span>
                                <span
                                    className={`link text-[17px] cursor-pointer font-[500] ${
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
                            <div className="container pt-8">
                                <h2 className="text-[20px] font-[600] pb-0">Sản phẩm liên quan</h2>
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
