import React, { useContext } from 'react';
import { MyContext } from '../App';
import axiosClient from '../apis/axiosClient';
import { useDispatch } from 'react-redux';
import { addWishlist, fetchWishlists, removeItemWishlist } from '../redux/wishlistSlice';

const useWishlist = () => {
    const context = useContext(MyContext);
    const dispatch = useDispatch();

    const getWishlists = async () => {
        try {
            const { data } = await axiosClient.get('/api/user/getAllWishlists');
            console.log('wishtlists: ', data);
            if (data?.success) {
                dispatch(fetchWishlists(data?.wishlists));
            }
        } catch (error) {
            console.log('error: ', error);
            context?.openAlertBox('error', error?.response?.data?.message);
        }
    };

    const addToWishlist = async (productId) => {
        if (!productId) {
            context?.openAlertBox('error', 'Cần chọn sản phẩm');
        }
        try {
            const { data } = await axiosClient.post('/api/user/addToWishlist', {
                productId,
            });
            console.log('dataAddWS: ', data);
            if (data?.success) {
                context?.openAlertBox('success', data?.message);
                dispatch(addWishlist(data?.wishlist));
            }
        } catch (error) {
            console.log('error: ', error);
            context?.openAlertBox('error', error?.response?.data?.message);
        }
    };

    const removeToWishlist = async (productId) => {
        if (!productId) {
            context?.openAlertBox('error', 'Cần chọn sản phẩm');
        }
        try {
            const { data } = await axiosClient.delete(`/api/user/removeFromWishlist/${productId}`);
            console.log('dataRemoveWS: ', data);
            if (data?.success) {
                context?.openAlertBox('success', data?.message);
                dispatch(
                    removeItemWishlist({
                        wishlistId: data?.wishlistId,
                    })
                );
            }
        } catch (error) {
            console.log('error: ', error);
            context?.openAlertBox('error', error?.response?.data?.message);
        }
    };

    return { getWishlists, addToWishlist, removeToWishlist };
};

export default useWishlist;
