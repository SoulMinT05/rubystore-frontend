import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import reviewReducer from './reviewSlice';
import notificationReducer from './notificationSlice';
import messageReducer from './messageSlice';
import wishlistReducer from './wishlistSlice';
import blogReducer from './blogSlice';
// import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        order: orderReducer,
        review: reviewReducer,
        notification: notificationReducer,
        message: messageReducer,
        wishlist: wishlistReducer,
        blog: blogReducer,
    },
});

export default store;
