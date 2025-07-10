import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reviews: [],
};

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        fetchReviews: (state, action) => {
            state.reviews = action.payload;
        },
        addReview: (state, action) => {
            state.reviews.push(action.payload);
        },
        addReply: (state, action) => {
            const { reviewId, newReply } = action.payload;
            const reviewIndex = state.reviews.findIndex((review) => review._id === reviewId);
            if (reviewIndex !== -1) {
                if (!state.reviews[reviewIndex].replies) {
                    state.reviews[reviewIndex].replies = [];
                }
                state.reviews[reviewIndex].replies.push(newReply);
            }
        },
        deleteReview: (state, action) => {
            const { reviewId } = action.payload;
            state.reviews = state.reviews.filter((review) => review._id !== reviewId);
        },
        deleteReply: (state, action) => {
            const { reviewId, replyId } = action.payload;
            const review = state.reviews.find((review) => review._id === reviewId);
            if (review) {
                review.replies = review.replies.filter((reply) => reply._id !== replyId);
            }
        },
    },
});

export const { fetchReviews, addReview, addReply, deleteReview, deleteReply } = reviewSlice.actions;

export default reviewSlice.reducer;
