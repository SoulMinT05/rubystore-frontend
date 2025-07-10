import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import reviewReducer from './reviewSlice';
// import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        order: orderReducer,
        review: reviewReducer,
    },
});

export default store;
