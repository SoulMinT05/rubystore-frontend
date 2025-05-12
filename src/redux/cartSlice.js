import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: {
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
    },
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart: (state, action) => {
            state.cart = action.payload;
        },
        addToCart: (state, action) => {
            const existingItem = state.cart.products.find((item) => item.id === action.payload._id);
            if (existingItem) {
                existingItem.quantityProduct += action.payload.quantityProduct || 1;
            } else {
                state.cart.products.push({
                    ...action.payload,
                    quantityProduct: action.payload.quantityProduct || 1,
                });
            }
            state.cart.totalQuantity += action.payload.quantityProduct || 1;
            state.cart.totalPrice += action.payload.price * (action.payload.quantityProduct || 1);
        },
        removeCart: (state, action) => {
            const index = state.cart.products.findIndex((item) => item.id === action.payload);

            if (index !== -1) {
                state.cart.totalQuantity -= state.cart.products[index].quantityProduct;
                state.cart.totalPrice -= state.cart.products[index].price * state.cart.products[index].quantityProduct;
                state.cart.products.splice(index, 1);
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.cart.products.find((item) => item.id === action.payload);

            if (item && item.quantityProduct > 1) {
                item.quantityProduct -= 1;
                state.cart.totalQuantity -= 1;
                state.cart.totalPrice -= item.price;
            }
        },
        clearCart: (state) => {
            state.cart = {
                products: [],
                totalQuantity: 0,
                totalPrice: 0,
            };
        },
    },
});
export const { getCart, addToCart, decreaseQuantity, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
