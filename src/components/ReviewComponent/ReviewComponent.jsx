import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField, CircularProgress, Rating, Pagination } from '@mui/material';

import './ReviewComponent.scss';
import axiosClient from '../../apis/axiosClient';
import { MyContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { addReply, addReview, deleteReply, deleteReview } from '../../redux/reviewSlice';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { socket } from '../../config/socket';
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const ReviewComponent = ({ product }) => {
    const context = useContext(MyContext);
    const { reviews } = useSelector((state) => state.review);
    const dispatch = useDispatch();

    const [review, setReview] = useState({
        userId: '',
        productId: product?._id,
        images: [],
        comment: '',
        rating: '5',
    });
    const [replyText, setReplyText] = useState('');
    const [selectedReplyIndex, setSelectedReplyIndex] = useState(null);

    const [isLoadingAddReview, setIsLoadingAddReview] = useState(false);
    const [isLoadingAddReply, setIsLoadingAddReply] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [openReply, setOpenReply] = useState(false);
    const [reviewId, setReviewId] = useState(null);
    const [replyId, setReplyId] = useState(null);
    const [isLoadingDeleteReview, setIsLoadingDeleteReview] = useState(false);
    const [isLoadingDeleteReply, setIsLoadingDeleteReply] = useState(false);

    const handleClickOpenReview = (id) => {
        setOpenReview(true);
        setReviewId(id);
    };

    const handleCloseReview = () => {
        setOpenReview(false);
    };

    const handleClickOpenReply = (reviewId, replyId) => {
        setOpenReply(true);
        setReviewId(reviewId);
        setReplyId(replyId);
    };
    const handleCloseReply = () => {
        setOpenReply(false);
    };

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

    useEffect(() => {
        socket.on('newReview', (newReview) => {
            dispatch(addReview(newReview));
        });
        socket.on('newReply', (data) => {
            dispatch(
                addReply({
                    reviewId: data?.reviewId,
                    newReply: data?.newReply,
                })
            );
        });
        socket.on('deletedReview', (reviewId) => {
            dispatch(deleteReview({ reviewId }));
        });
        socket.on('deletedReply', (data) => {
            dispatch(
                deleteReply({
                    reviewId: data?.reviewId,
                    replyId: data?.replyId,
                })
            );
        });
        return () => {
            socket.off('newReview');
            socket.off('newReply');
            socket.off('deletedReview');
            socket.off('deletedReply');
        };
    }, []);

    const handleAddReview = async (e) => {
        e.preventDefault();
        setIsLoadingAddReview(true);
        try {
            const { data } = await axiosClient.post('/api/user/addReview', review);
            console.log('dataAdd: ', data);
            if (data.success) {
                context.openAlertBox('success', data.message);
                setReview((prev) => ({
                    ...prev,
                    comment: '',
                }));
            }
        } catch (err) {
            console.log(err);
            context.openAlertBox('error', err?.response?.data?.message || 'Đã xảy ra lỗi!');
        } finally {
            setIsLoadingAddReview(false);
        }
    };

    const handleAddReply = async (reviewId) => {
        setIsLoadingAddReply(true);
        try {
            const { data } = await axiosClient.post(`/api/user/addReplyToReview/${reviewId}`, {
                replyText,
            });
            console.log('dataAddReply: ', data);
            if (data.success) {
                context.openAlertBox('success', data.message);
                setSelectedReplyIndex(null);
                setReplyText('');
            }
        } catch (err) {
            console.log(err);
            context.openAlertBox('error', err?.response?.data?.message || 'Đã xảy ra lỗi!');
        } finally {
            setIsLoadingAddReply(false);
        }
    };

    const handleDeleteReview = async () => {
        setIsLoadingDeleteReview(true);
        try {
            const { data } = await axiosClient.delete(`/api/user/deleteReview/${reviewId}`);
            console.log('dataDelete: ', data);
            if (data.success) {
                context.openAlertBox('success', data.message);
                handleCloseReview();
            }
        } catch (err) {
            console.log(err);
            context.openAlertBox('error', err?.response?.data?.message || 'Đã xảy ra lỗi!');
        } finally {
            setIsLoadingDeleteReview(false);
        }
    };

    const handleDeleteReply = async () => {
        setIsLoadingDeleteReply(true);

        try {
            const { data } = await axiosClient.delete(`/api/user/deleteReplyFromReview/${reviewId}/${replyId}`);
            console.log('dataDeleteReply: ', data);
            if (data.success) {
                context.openAlertBox('success', data.message);
                handleCloseReply();
            }
        } catch (err) {
            console.log(err);
            context.openAlertBox('error', err?.response?.data?.message || 'Đã xảy ra lỗi!');
        } finally {
            setIsLoadingDeleteReply(false);
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
                    <Rating name="rating" value={review?.rating} onChange={handleRatingChange} size="medium" />

                    <div className="flex items-center mt-2">
                        <Button type="submit" className="btn-org">
                            {isLoadingAddReview === true ? <CircularProgress color="inherit" /> : 'Gửi đánh giá'}
                        </Button>
                    </div>
                </form>
            </div>

            <h2 className="text-[18px] mt-6">Đánh giá từ khách hàng</h2>
            <div className="reviewScroll w-full max-h-[1000vh] over-x-hidden mt-5 pr-5">
                <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full ">
                    {currentReviews?.length !== 0 &&
                        currentReviews?.map((review, index) => {
                            return (
                                <div key={review._id}>
                                    <div className="flex items-center justify-between mt-4 mb-2">
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
                                        <Rating name="size-small" value={review?.rating} readOnly />
                                    </div>
                                    {/* Nút trả lời */}
                                    <div className="flex items-center gap-4">
                                        <span
                                            className="text-blue-600 cursor-pointer text-sm mt-2 ml-[90px]"
                                            onClick={() =>
                                                setSelectedReplyIndex(index === selectedReplyIndex ? null : index)
                                            }
                                        >
                                            Phản hồi
                                        </span>
                                        {context?.userInfo?._id === review?.userId?._id && (
                                            <span
                                                className="text-primary cursor-pointer text-sm mt-2"
                                                onClick={() => handleClickOpenReview(review._id)}
                                            >
                                                Xóa
                                            </span>
                                        )}
                                    </div>

                                    {/* Danh sách reply */}
                                    {review.replies?.length > 0 && (
                                        <div key={review._id}>
                                            {review.replies.map((reply) => (
                                                <div key={reply._id} className="ml-[90px] mt-0 space-y-3">
                                                    <div className="flex items-center justify-between mt-4 mb-2">
                                                        <div className="info w-[60%] flex items-center gap-3">
                                                            <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                                                                <img
                                                                    src={reply?.userId?.avatar}
                                                                    alt="avatar"
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                            <div className="w-[80%]">
                                                                <h4 className="text-[16px]">{reply?.userId?.name}</h4>
                                                                <h5 className="text-[13px] mb-0">
                                                                    {formatDate(reply?.createdAt)}
                                                                </h5>
                                                                <p className="mt-0 mb-0">{reply?.replyText}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 ">
                                                        {reply?.userId?._id === context?.userInfo?._id && (
                                                            <span
                                                                className="text-primary ml-[90px] cursor-pointer text-sm mt-2"
                                                                onClick={() =>
                                                                    handleClickOpenReply(review._id, reply._id)
                                                                }
                                                            >
                                                                Xóa
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Ô nhập trả lời */}
                                    {index === selectedReplyIndex && (
                                        <div className="ml-[90px] mt-2">
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label="Viết phản hồi..."
                                                className="w-full mb-5"
                                                multiline
                                                rows={5}
                                                name="replyText"
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                            />
                                            <Button
                                                className="!mt-4 btn-org text-white px-3 py-1 rounded text-sm"
                                                onClick={() => handleAddReply(review?._id)}
                                            >
                                                {isLoadingAddReply === true ? (
                                                    <CircularProgress color="inherit" />
                                                ) : (
                                                    'Gửi phản hồi'
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </div>

                <div className="flex items-center justify-center mt-8">
                    <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} />
                </div>
            </div>

            <br />

            <Dialog
                open={openReview}
                onClose={handleCloseReview}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Xoá đánh giá?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn xoá đánh giá này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReview}>Huỷ</Button>
                    {isLoadingDeleteReview === true ? (
                        <CircularProgress color="inherit" />
                    ) : (
                        <Button className="btn-red" onClick={handleDeleteReview} autoFocus>
                            Xác nhận
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
            <Dialog
                open={openReply}
                onClose={handleCloseReply}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Xoá phản hồi?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn xoá phản hồi này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReply}>Huỷ</Button>
                    {isLoadingDeleteReply === true ? (
                        <CircularProgress color="inherit" />
                    ) : (
                        <Button className="btn-red" onClick={handleDeleteReply} autoFocus>
                            Xác nhận
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ReviewComponent;
