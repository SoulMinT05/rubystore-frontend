import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        fetchOrders: (state, action) => {
            state.orders = action.payload;
        },
        cancelOrderStatus: (state, action) => {
            const { orderId } = action.payload;

            state.orders = state.orders.map((order) => {
                return order?._id.toString() === orderId.toString()
                    ? {
                          ...order,
                          orderStatus: 'cancelled',
                      }
                    : order;
            });
        },
    },
});

export const { fetchOrders, cancelOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;
