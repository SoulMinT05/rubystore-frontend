import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: {
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
        voucher: null, // thông tin voucher đang áp dụng (nếu có)
        discountValue: 0, // số tiền giảm
        finalPrice: 0, // = totalPrice - discountValue + shippingFee
        shippingFee: 0,
    },
};

const extractProductId = (product) => {
    if (!product) return null;

    // Nếu là string hoặc ObjectId có toString()
    if (typeof product === 'string' || typeof product.toString === 'function') {
        // console.log('productId là string');
        return product.toString();
    }
    // Nếu là object có _id
    if (typeof product === 'object' && product._id) {
        // console.log('productId là object');
        return product._id.toString();
    }

    return null;
};

const calculateFinalPrice = (totalPrice, voucher) => {
    if (!voucher) return totalPrice;

    let discount = 0;
    if (voucher.discountType === 'percent') {
        discount = (voucher.discountValue / 100) * totalPrice;
    } else if (voucher.discountType === 'fixed') {
        discount = voucher.discountValue;
    }

    return Math.max(totalPrice - discount, 0);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart: (state, action) => {
            const { products, totalQuantity, totalPrice } = action.payload;

            console.log('action.payload: ', action.payload);

            state.cart.products = products;
            state.cart.totalQuantity = totalQuantity;
            state.cart.totalPrice = totalPrice;

            // Reset lại thông tin tính giá theo style Shopee
            state.cart.voucher = null;
            state.cart.discountValue = 0;
            state.cart.shippingFee = 0;
            state.cart.finalPrice = totalPrice;
        },

        applyVoucher: (state, action) => {
            const { voucher, discountValue, finalPrice } = action.payload;
            state.cart.voucher = voucher;
            state.cart.discountValue = discountValue;
            state.cart.finalPrice = finalPrice + state.cart.shippingFee;
        },
        updateCartItemSize: (state, action) => {
            const { productId, oldSize, newSize } = action.payload;

            const foundItem = state.cart.products.find((item) => {
                const itemProductId = extractProductId(item.product._id);
                return itemProductId === productId && item.sizeProduct === oldSize;
            });

            const duplicateItem = state.cart.products.find((item) => {
                const itemProductId = extractProductId(item.product._id);
                return itemProductId === productId && item.sizeProduct === newSize;
            });
            console.log('🔎 foundItem:', JSON.parse(JSON.stringify(foundItem)));

            if (!foundItem) return;

            if (duplicateItem) {
                // ✅ Gộp quantity vào duplicateItem

                duplicateItem.quantityProduct += foundItem.quantityProduct;

                // ❌ Xoá foundItem khỏi danh sách
                state.cart.products = state.cart.products.filter(
                    (item) => !(extractProductId(item.product._id) === productId && item.sizeProduct === oldSize)
                );
            } else {
                // ✅ Không có duplicate thì chỉ đổi size
                foundItem.sizeProduct = newSize;
                console.log('🔎 foundItem after:', JSON.parse(JSON.stringify(foundItem)));
            }
        },
        addToCart: (state, action) => {
            const payloadProductId = extractProductId(action.payload.product);
            const foundItem = state.cart.products.find((item) => {
                const itemProductId = extractProductId(item.product._id);
                return itemProductId === payloadProductId && item.sizeProduct === action.payload.sizeProduct;
            });

            if (foundItem) {
                foundItem.quantityProduct += 1;
            } else {
                state.cart.products.push({
                    ...action.payload,
                    quantityProduct: 1,
                });
            }
            state.cart.totalQuantity += 1;
            state.cart.totalPrice += action.payload.price * 1;
            state.cart.finalPrice = calculateFinalPrice(state.cart.totalPrice, state.cart.voucher);
        },
        decreaseQuantity: (state, action) => {
            const payloadProductId = extractProductId(action.payload.product);

            const foundItemIndex = state.cart.products.findIndex((item) => {
                const itemProductId = extractProductId(item.product._id);
                return itemProductId === payloadProductId && item.sizeProduct === action.payload.sizeProduct;
            });

            if (foundItemIndex !== -1) {
                const foundItem = state.cart.products[foundItemIndex];
                if (foundItem.quantityProduct > 1) {
                    foundItem.quantityProduct -= 1;
                    state.cart.totalQuantity -= 1;
                    state.cart.totalPrice -= foundItem.price;
                } else {
                    state.cart.totalQuantity -= 1;
                    state.cart.totalPrice -= foundItem.price;

                    state.cart.products.splice(foundItemIndex, 1);
                }
            }
            state.cart.finalPrice = calculateFinalPrice(state.cart.totalPrice, state.cart.voucher);
        },
        removeCart: (state, action) => {
            const cartItemId = action.payload; // chính là item._id từ MongoDB

            const index = state.cart.products.findIndex((item) => item._id === cartItemId);
            if (index !== -1) {
                const removedItem = state.cart.products[index];
                state.cart.totalQuantity -= removedItem.quantityProduct;
                state.cart.totalPrice -= removedItem.price * removedItem.quantityProduct;
                state.cart.finalPrice = calculateFinalPrice(state.cart.totalPrice, state.cart.voucher);
                state.cart.products.splice(index, 1);
            }
        },
        removeMultipleCartItems: (state, action) => {
            const cartIdsToRemove = action.payload; // Mảng cartId (item._id từ MongoDB)

            const itemsToKeep = [];
            let removedQuantity = 0;
            let removedPrice = 0;

            for (const item of state.cart.products) {
                if (cartIdsToRemove.includes(item._id)) {
                    removedQuantity += item.quantityProduct;
                    removedPrice += item.price * item.quantityProduct;
                } else {
                    itemsToKeep.push(item);
                }
            }

            state.cart.products = itemsToKeep;
            state.cart.totalQuantity -= removedQuantity;
            state.cart.totalPrice -= removedPrice;
            state.cart.finalPrice = calculateFinalPrice(state.cart.totalPrice, state.cart.voucher);
        },
    },
});
export const {
    getCart,
    applyVoucher,
    updateCartItemSize,
    addToCart,
    decreaseQuantity,
    removeCart,
    removeMultipleCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
