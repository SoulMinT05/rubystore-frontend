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
        updateOrderStatus: (state, action) => {
            const { orderId, newStatus } = action.payload;
            const orderIndex = state.orders.findIndex((order) => order._id === orderId);
            if (orderIndex !== -1) {
                state.orders[orderIndex].orderStatus = newStatus;
            }
        },
    },
});

export const { fetchOrders, cancelOrderStatus, updateOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;
