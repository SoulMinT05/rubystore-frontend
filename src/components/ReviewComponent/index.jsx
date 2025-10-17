import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField, CircularProgress, Rating, Pagination } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import './ReviewComponent.scss';
import { MyContext } from '@/App';
import { socket } from '@/config/socket';
import axiosClient from '@/apis/axiosClient';
import { addReply, addReview, deleteReply, deleteReview } from '@/redux/reviewSlice';
import defaultAvatar from '@/assets/default_avatar.png';
import { timeAgo } from '@/utils/formatters';
import { FaCheckCircle } from 'react-icons/fa';

import replyReviewIcon from '../../assets/replyReviewIcon.png';
import { AiOutlineDelete } from 'react-icons/ai';

const ratingDescriptions = {
    5: 'Cực kỳ hài lòng',
    4: 'Hài lòng',
    3: 'Bình thường',
    2: 'Không hài lòng',
    1: 'Rất tệ',
};

const ReviewComponent = ({ productId, totalPages, currentPage, handleChangePage }) => {
    const context = useContext(MyContext);
    const { reviews } = useSelector((state) => state.review);
    const dispatch = useDispatch();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sizeFromUrl = queryParams.get('size') || '';

    const [review, setReview] = useState({
        userId: '',
        productId,
        sizeProduct: sizeFromUrl,
        images: [],
        comment: '',
        rating: '5',
    });

    const [openReview, setOpenReview] = useState(false);
    const [reviewId, setReviewId] = useState(null);

    const [isLoadingAddReview, setIsLoadingAddReview] = useState(false);
    const [isLoadingDeleteReview, setIsLoadingDeleteReview] = useState(false);

    const handleClickOpenReview = (id) => {
        setOpenReview(true);
        setReviewId(id);
    };

    const handleCloseReview = () => {
        setOpenReview(false);
    };

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

    return (
        <div className="w-full productReviewsContainer">
            {!context?.userInfo?._id ||
                (review?.productId && review?.sizeProduct && (
                    <div className="reviewForm py-4 rounded-none border-gray-250 border-b-[2px]">
                        <h2 className="text-[16px] lg:text-[17px]">Đánh giá</h2>
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
                            <Rating
                                name="rating"
                                value={Number(review?.rating) || 0}
                                onChange={handleRatingChange}
                                size="medium"
                            />

                            <div className="flex items-center mt-2">
                                <Button type="submit" className="btn-org">
                                    {isLoadingAddReview === true ? (
                                        <CircularProgress color="inherit" />
                                    ) : (
                                        'Gửi đánh giá'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                ))}

            <h2 className="text-[16px] lg:text-[17px] text-black mt-4">Đánh giá từ khách hàng</h2>
            <div className="">
                <span className="italic text-[12px] lg:text-[13px] text-gray-700 ">
                    Để đánh giá, quý khách cần đặt hàng thành công và chọn{' '}
                </span>
                <span className="text-[14px] lg:text-[16px] text-primary">Mục Đánh giá </span>
                <span className="italic text-[12px] lg:text-[13px] text-gray-700 ">trong những đơn ở mục </span>
                <span className="text-[14px] lg:text-[16px] text-primary">Lịch sử đơn hàng </span>
            </div>

            <div className="reviewScroll w-full max-h-[1000vh] over-x-hidden mt-2 sm:pr-5">
                <div className="review py-1 sm:py-5 border-b border-[rgba(0,0,0,0.1)] w-full ">
                    {reviews?.length > 0 ? (
                        reviews?.map((review) => {
                            return (
                                <div key={review._id} className="mt-7 mb-2">
                                    <div className="grid grid-cols-12 gap-4 items-start">
                                        {/* Cột 3: Avatar + thông tin */}
                                        <div className="col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-3 flex items-center md:items-start gap-3">
                                            <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                                                <img
                                                    src={review?.userId?.avatar || defaultAvatar}
                                                    alt="avatar"
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="">
                                                <h4 className="text-[14px] sm:text-[15px] font-[600] text-black">
                                                    {review?.userId?.name}
                                                </h4>
                                                <p className="text-[12px] sm:text-[13px] mt-0 text-gray">
                                                    Đã tham gia {timeAgo(review?.userId?.createdAt)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Cột 9: Nội dung */}
                                        <div className="col-span-12 md:col-span-7 lg:col-span-8 xl:col-span-9">
                                            <div className="">
                                                {/* Rating */}
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <Rating
                                                            name="size-small"
                                                            value={Number(review?.rating) || 0}
                                                            readOnly
                                                            className="[&_.MuiSvgIcon-root]:text-[20px] lg:[&_.MuiSvgIcon-root]:text-[24px]"
                                                        />
                                                        <span className="text-[13px] lg:text-[15px] text-black font-[600]">
                                                            {ratingDescriptions[Number(review?.rating)] || ''}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 font-[600]" />
                                                    <span className="text-[12px] sm:text-[13px] text-green-600 font-[500]">
                                                        Đã mua hàng
                                                    </span>
                                                </div>
                                                <p className="text-[12px] sm:text-[14px] text-black  mb-2">
                                                    {review?.comment}
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    <span className="text-[12px] sm:text-[13px] font-[500]">
                                                        Đánh giá vào {timeAgo(review?.createdAt)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-8 mt-4 h-[32px] text-gray-600  cursor-pointer">
                                                    <div className="flex items-center gap-1 sm:gap-2">
                                                        <img
                                                            src={replyReviewIcon}
                                                            className="h-5 w-5 sm:h-6 sm:w-6"
                                                            alt=""
                                                        />
                                                        <span className="text-[13px] font-[600]">
                                                            {review.replies?.length || 0}
                                                        </span>
                                                    </div>

                                                    {/* Nút xóa */}
                                                    <div className="flex items-center hover:text-primary">
                                                        {context?.userInfo?._id === review?.userId?._id && (
                                                            <AiOutlineDelete
                                                                onClick={() => handleClickOpenReview(review._id)}
                                                                className="h-5 w-5 sm:h-6 sm:w-6 "
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Danh sách reply */}
                                            {review.replies?.length > 0 && (
                                                <div className="mt-3 space-y-3">
                                                    {review.replies.map((reply, index) => (
                                                        <div
                                                            key={reply._id}
                                                            className={`gap-4 rounded-md p-4 ${
                                                                index !== 0 ? 'mt-16' : ''
                                                            }`}
                                                            style={{
                                                                background: 'rgb(245, 245, 250)',
                                                            }}
                                                        >
                                                            <div className="flex items-center">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="img w-[44px] h-[44px] sm:w-[60px] sm:h-[60px] overflow-hidden rounded-full">
                                                                        <img
                                                                            src={reply?.userId?.avatar || defaultAvatar}
                                                                            alt="avatar"
                                                                            className="w-full"
                                                                        />
                                                                    </div>
                                                                    <div className="flex items-center gap-1 -mt-5">
                                                                        <h4 className="text-[12px] sm:text-[13px] font-[600] text-black">
                                                                            {reply?.userId?.name}
                                                                        </h4>
                                                                        <FaCheckCircle className="w-3 h-3 text-blue-500 font-[600]" />
                                                                    </div>
                                                                </div>
                                                                {context.windowWidth > 400 && (
                                                                    <span className="mx-1 text-gray-400 -mt-5">|</span>
                                                                )}
                                                                <span className="text-[12px] sm:text-[13px] font-[500] ml-1 -mt-5">
                                                                    {timeAgo(reply?.createdAt)}
                                                                </span>
                                                            </div>
                                                            <div className="ml-[54px] sm:ml-[74px] -mt-[34px] sm:-mt-[38px]">
                                                                <p className="text-[12px] sm:text-[14px] ml-[3px] sm:-ml-[1px] leading-[18px]">
                                                                    {reply?.replyText}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-[14px] lg:text-[16px] flex flex-col items-center justify-center w-full">
                            <NoReview />
                            <p className="text-[13px] lg:text-[14px]">Chưa có đánh giá nào cho sản phẩm này</p>
                        </div>
                    )}
                </div>

                {reviews?.length > 0 && (
                    <div className="flex items-center justify-center mt-8">
                        <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} />
                    </div>
                )}
            </div>

            <br />

            <Dialog
                disableScrollLock
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
        </div>
    );
};

export default ReviewComponent;

const NoReview = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="64"
            height="64"
            viewBox="0 0 80 80"
        >
            <defs>
                <path
                    id="d1ba4b2f-d551-46a4-afcd-516e3b5d743b-a"
                    d="M43.716 5.432l2.859 10.239a7.29 7.29 0 004.228 4.796l9.682 3.99c5.349 2.204 6.112 9.605 1.327 12.87l-8.661 5.913a7.327 7.327 0 00-3.158 5.57l-.708 10.613c-.39 5.86-7.057 8.872-11.592 5.235l-8.212-6.585a7.085 7.085 0 00-6.18-1.354l-10.12 2.57c-5.59 1.418-10.473-4.122-8.492-9.635l3.585-9.982a7.441 7.441 0 00-.66-6.407L2.067 24.24c-3.064-4.985.584-11.419 6.344-11.189l10.428.415a7.106 7.106 0 005.772-2.606l6.692-8.147C35-1.787 42.136-.223 43.716 5.433z"
                ></path>
                <path
                    id="d1ba4b2f-d551-46a4-afcd-516e3b5d743b-c"
                    d="M28.34 5.431l2.86 10.24c.608 2.176 2.168 3.947 4.227 4.796l9.683 3.99c5.348 2.204 6.111 9.604 1.328 12.87l-8.662 5.913a7.326 7.326 0 00-3.158 5.57l-.709 10.613c-.026.39-.08.766-.159 1.13C12.394 55.609-1.723 35.19.251 13.338l3.213.127a7.1 7.1 0 005.77-2.606l6.694-8.147c3.696-4.499 10.834-2.935 12.412 2.72z"
                ></path>
                <path
                    id="d1ba4b2f-d551-46a4-afcd-516e3b5d743b-e"
                    d="M29.628 11.393c.658-3.136 3.67-5.132 6.73-4.458 3.06.673 5.007 3.761 4.35 6.897-.657 3.135-3.67 5.132-6.73 4.458-3.06-.674-5.007-3.761-4.35-6.897zM7.276.53c3.059.674 5.006 3.762 4.349 6.898-.657 3.135-3.67 5.132-6.729 4.457-3.06-.674-5.007-3.762-4.35-6.897.657-3.136 3.67-5.131 6.73-4.458z"
                ></path>
                <path
                    id="d1ba4b2f-d551-46a4-afcd-516e3b5d743b-g"
                    d="M.75 8.56c.165-.784.919-1.283 1.683-1.114l3.957.87c.765.169 1.252.942 1.087 1.725-.164.784-.917 1.283-1.682 1.114l-.499-.11c-.422 5.407 3.124 10.446 8.436 11.616 5.311 1.17 10.564-1.932 12.346-7.04l-.5-.11c-.764-.168-1.251-.94-1.086-1.724.163-.784.917-1.283 1.682-1.114l3.957.871c.765.169 1.252.94 1.087 1.724-.164.784-.918 1.283-1.682 1.114l-.666-.146c-2.126 6.674-8.892 10.77-15.734 9.264-6.84-1.506-11.369-8.09-10.633-15.069l-.665-.147C1.074 10.116.587 9.344.75 8.56zm21.025-4.917c.164-.783.917-1.282 1.683-1.114l.276.06c.765.17 1.252.941 1.087 1.725-.164.784-.917 1.283-1.682 1.114l-.277-.06c-.764-.169-1.251-.94-1.087-1.725zM12.655.15l.277.061c.765.168 1.252.941 1.087 1.724-.164.785-.917 1.284-1.682 1.115l-.278-.06c-.764-.17-1.25-.941-1.087-1.725.165-.785.918-1.283 1.683-1.115z"
                ></path>
            </defs>
            <g fill="none" fillRule="evenodd" opacity="0.997">
                <g transform="rotate(-12 67.32 3.796)">
                    <mask id="d1ba4b2f-d551-46a4-afcd-516e3b5d743b-b" fill="#fff">
                        <use xlinkHref="#d1ba4b2f-d551-46a4-afcd-516e3b5d743b-a"></use>
                    </mask>
                    <path
                        fill="#C7C7C7"
                        d="M-6.732-7.793h79.409v81.922H-6.732z"
                        mask="url(#d1ba4b2f-d551-46a4-afcd-516e3b5d743b-b)"
                    ></path>
                </g>
                <g transform="rotate(-12 59.633 -69.346)">
                    <mask id="d1ba4b2f-d551-46a4-afcd-516e3b5d743b-d" fill="#fff">
                        <use xlinkHref="#d1ba4b2f-d551-46a4-afcd-516e3b5d743b-c"></use>
                    </mask>
                    <path
                        fill="#E0E0E0"
                        d="M-7.62-7.793h64.921v76.236H-7.62z"
                        mask="url(#d1ba4b2f-d551-46a4-afcd-516e3b5d743b-d)"
                    ></path>
                </g>
                <g transform="rotate(-12 159.533 -57.659)">
                    <mask id="d1ba4b2f-d551-46a4-afcd-516e3b5d743b-f" fill="#fff">
                        <use xlinkHref="#d1ba4b2f-d551-46a4-afcd-516e3b5d743b-e"></use>
                    </mask>
                    <path
                        fill="#C7C7C7"
                        d="M-7.269-7.49h55.792v33.801H-7.269z"
                        mask="url(#d1ba4b2f-d551-46a4-afcd-516e3b5d743b-f)"
                    ></path>
                </g>
                <g transform="rotate(-12 162.44 -80.152)">
                    <mask id="d1ba4b2f-d551-46a4-afcd-516e3b5d743b-h" fill="#fff">
                        <use xlinkHref="#d1ba4b2f-d551-46a4-afcd-516e3b5d743b-g"></use>
                    </mask>
                    <path
                        fill="#000"
                        fillOpacity="0.54"
                        d="M-6.969-7.773h45.907v41.475H-6.969z"
                        mask="url(#d1ba4b2f-d551-46a4-afcd-516e3b5d743b-h)"
                    ></path>
                </g>
            </g>
        </svg>
    );
};
