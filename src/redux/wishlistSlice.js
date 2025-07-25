import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishlists: [],
    wishlistProductIds: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        fetchWishlists: (state, action) => {
            state.wishlists = action.payload;
            state.wishlistProductIds = action.payload.map((item) => item.product.toString());
        },
        addWishlist: (state, action) => {
            state.wishlists.push(action.payload);
            state.wishlistProductIds.push(action.payload.product.toString());
        },
        removeItemWishlist: (state, action) => {
            const { wishlistId } = action.payload;
            state.wishlists = state.wishlists.filter((wishlist) => wishlist._id !== wishlistId);
        },
    },
});

export const { fetchWishlists, addWishlist, removeItemWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
