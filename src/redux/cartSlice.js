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
        decreaseQuantity: (state, action) => {
            const { product, sizeProduct } = action.payload;
            const payloadProductId = extractProductId(product);

            const foundItem = state.cart.products.find((item) => {
                const itemProductId = extractProductId(item.product._id);
                return itemProductId === payloadProductId && item.sizeProduct === sizeProduct;
            });
            if (foundItem) {
                if (foundItem.quantityProduct > 1) {
                    foundItem.quantityProduct -= 1;
                    state.cart.totalQuantity -= 1;
                    state.cart.totalPrice -= foundItem.price;
                } else {
                    // Nếu quantity = 1 thì xóa khỏi cart
                    state.cart.products = state.cart.products.filter(
                        (item) =>
                            !(
                                extractProductId(item.product._id) === payloadProductId &&
                                item.sizeProduct === sizeProduct
                            )
                    );
                    state.cart.totalQuantity -= 1;
                    state.cart.totalPrice -= foundItem.price;
                }
            }
        },
        removeCart: (state, action) => {
            const cartItemId = action.payload; // chính là item._id từ MongoDB

            const index = state.cart.products.findIndex((item) => item._id === cartItemId);
            if (index !== -1) {
                const removedItem = state.cart.products[index];
                state.cart.totalQuantity -= removedItem.quantityProduct;
                state.cart.totalPrice -= removedItem.price * removedItem.quantityProduct;
                state.cart.products.splice(index, 1);
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
