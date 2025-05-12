import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField, CircularProgress, Rating, Pagination } from '@mui/material';

import './ReviewComponent.scss';
import axiosClient from '../../apis/axiosClient';
import { MyContext } from '../../App';

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const ReviewComponent = ({ product, getDetailsReview }) => {
    const { reviews } = useContext(MyContext);
    const [review, setReview] = useState({
        userId: '',
        productId: product?._id,
        images: [],
        comment: '',
        rating: '5',
    });
    const context = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);
    const itemsPerPage = 10;
    // State lưu trang hiện tại
    const [currentPage, setCurrentPage] = useState(1);
    // Tính tổng số trang
    const totalPages = Math.ceil(reviews?.length / itemsPerPage);
    // Xử lý khi đổi trang
    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };
    // Cắt dữ liệu theo trang
    const currentReviews = reviews?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        getDetailsReview();
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [currentPage]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setReview((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleRatingChange = (event, newValue) => {
        setReview({ ...review, rating: newValue });
    };

    const handleAddReview = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await axiosClient.post('/api/user/addReview', review);
            if (data.success) {
                context.openAlertBox('success', data.message);
                setReview((prev) => ({
                    ...prev,
                    comment: '',
                }));
                await getDetailsReview();
            }
        } catch (err) {
            console.log(err);
            context.openAlertBox('error', err?.response?.data?.message || 'Đã xảy ra lỗi!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full productReviewsContainer">
            <div className="reviewForm py-4 rounded-none border-gray-250 border-b-[2px]">
                <h2 className="text-[18px]">Đánh giá</h2>
                <form onSubmit={handleAddReview} className="w-full mt-5">
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Viết đánh giá"
                        className="w-full mb-5"
                        multiline
                        rows={5}
                        name="comment"
                        value={review?.comment}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <Rating name="rating" value={review.rating} onChange={handleRatingChange} size="medium" />

                    <div className="flex items-center mt-2">
                        <Button type="submit" className="btn-org">
                            {isLoading === true ? <CircularProgress color="inherit" /> : 'Gửi đánh giá'}
                        </Button>
                    </div>
                </form>
            </div>

            <h2 className="text-[18px] mt-6">Đánh giá từ khách hàng</h2>
            <div className="reviewScroll w-full max-h-[1300px] over-x-hidden mt-5 pr-5">
                <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full ">
                    {currentReviews?.length !== 0 &&
                        currentReviews?.map((review, index) => {
                            return (
                                <div className="flex items-center justify-between mt-4 mb-8" key={index}>
                                    <div className="info w-[60%] flex items-center gap-3">
                                        <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                                            <img src={review?.userId?.avatar} alt="avatar" className="w-full" />
                                        </div>
                                        <div className="w-[80%]">
                                            <h4 className="text-[16px]">{review?.userId?.name}</h4>
                                            <h5 className="text-[13px] mb-0">{formatDate(review?.createdAt)}</h5>
                                            <p className="mt-0 mb-0">{review?.comment}</p>
                                        </div>
                                    </div>
                                    <Rating name="size-small" defaultValue={review?.rating} readOnly />
                                </div>
                            );
                        })}
                </div>

                <div className="flex items-center justify-center mt-8">
                    <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} />
                </div>
            </div>

            <br />
        </div>
    );
};

export default ReviewComponent;
