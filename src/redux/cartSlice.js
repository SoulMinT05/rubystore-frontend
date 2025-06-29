import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: {
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
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

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart: (state, action) => {
            state.cart = action.payload;
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
                console.log('🔎 duplicateItem:', JSON.parse(JSON.stringify(duplicateItem)));
                duplicateItem.quantityProduct += foundItem.quantityProduct;
                console.log('🔎 duplicateItem after:', JSON.parse(JSON.stringify(duplicateItem)));
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
                const isMatch = itemProductId === payloadProductId && item.sizeProduct === action.payload.sizeProduct;

                // Optional: log chi tiết quá trình so sánh
                // console.log('🧩 So sánh sản phẩm:', {
                //     itemProductId,
                //     payloadProductId,
                //     itemSize: item.sizeProduct,
                //     payloadSize: action.payload.sizeProduct,
                //     isMatch,
                // });

                return isMatch;
            });

            if (foundItem) {
                foundItem.quantityProduct += 1;
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
export const { getCart, updateCartItemSize, addToCart, decreaseQuantity, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
