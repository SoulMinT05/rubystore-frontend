import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
// import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        order: orderReducer,
    },
});

export default store;
