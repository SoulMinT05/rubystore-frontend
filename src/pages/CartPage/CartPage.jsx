import React, { useContext, useEffect, useRef, useState } from 'react';

import '../CartPage/CartPage.css';

import { BsFillBagCheckFill } from 'react-icons/bs';
import { Breadcrumbs, Button, Checkbox, CircularProgress } from '@mui/material';
import CartItems from '../../components/CartItems/CartItems';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../apis/axiosClient';
import { applyVoucher, getCart, removeMultipleCartItems } from '../../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const CartPage = () => {
    const context = useContext(MyContext);
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);

    const [selectedCarts, setSelectedCarts] = useState([]);
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [isLoadingCarts, setIsLoadingCarts] = useState(false);
    const [openVoucher, setOpenVoucher] = useState(false);
    const [codeVoucher, setCodeVoucher] = useState('');
    const [isLoadingApplyVoucher, setIsLoadingApplyVoucher] = useState(false);
    const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);

    const sectionRef = useRef(null);
    const [sectionWidth, setSectionWidth] = useState(0);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const navigate = useNavigate();

    const selectedCartItems = cart?.products?.filter((item) => selectedCarts.includes(item._id));
    const totalQuantity = selectedCartItems.reduce((sum, item) => sum + item.quantityProduct, 0);
    const totalPrice = selectedCartItems.reduce((sum, item) => sum + item.quantityProduct * item.price, 0);
    const finalPrice = Math.max(totalPrice - cart.discountValue, 0) + (cart.shippingFee || 0);

    useEffect(() => {
        const fetchCart = async () => {
            setIsLoadingCarts(true);
            const { data } = await axiosClient.get('/api/user/cart');
            if (data?.success) {
                console.log('dataCart: ', data);
                dispatch(
                    getCart({
                        products: data?.cart?.items || [],
                        // totalQuantity: data?.cart?.totalQuantity || 0,
                        // totalPrice: data?.cart?.totalPrice || 0,
                    })
                );
            }
            setIsLoadingCarts(false);
        };
        fetchCart();
    }, [dispatch]);

    useEffect(() => {
        if (sectionRef.current) {
            setSectionWidth(sectionRef.current.offsetWidth);
        }
    }, []);

    const handleSelectCart = (cartId) => {
        setSelectedCarts((prevSelectedCarts) => {
            let updatedSelectedCarts;

            if (prevSelectedCarts.includes(cartId)) {
                // Nếu đã chọn thì bỏ chọn
                updatedSelectedCarts = prevSelectedCarts.filter((id) => id !== cartId);
            } else {
                // Nếu chưa chọn thì chọn
                updatedSelectedCarts = [...prevSelectedCarts, cartId];
            }
            const allSelected = updatedSelectedCarts.length === cart?.products?.length;
            setIsCheckedAll(allSelected);

            return updatedSelectedCarts;
        });
    };

    const handleSelectAll = () => {
        const currentPageIds = cart?.products?.map((product) => product._id);
        if (!isCheckedAll) {
            // Thêm các sản phẩm ở trang hiện tại
            const newSelected = Array.from(new Set([...selectedCarts, ...currentPageIds]));
            setSelectedCarts(newSelected);
            setIsCheckedAll(true);
        } else {
            // Bỏ các sản phẩm ở trang hiện tại
            const newSelected = selectedCarts.filter((id) => !currentPageIds.includes(id));
            setSelectedCarts(newSelected);
            setIsCheckedAll(false);
        }
    };
    useEffect(() => {
        const allSelectedOnPage = cart?.products?.every((product) => selectedCarts.includes(product._id));
        setIsCheckedAll(allSelectedOnPage);
    }, [cart?.products, selectedCarts]);

    const deleteMultipleCartItems = async () => {
        try {
            const { data } = await axiosClient.post('/api/user/deleteMultipleCartItems', {
                cartIds: selectedCarts,
            });
            console.log('dataDelteMultipleCart: ', data);
            if (data?.success) {
                context.openAlertBox('success', data.message);
                dispatch(removeMultipleCartItems(selectedCarts));
            } else {
                console.error('Không thể thêm vào giỏ hàng:', data.message);
            }
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error.message);
        }
    };

    const handleClickOpenVoucher = () => {
        setOpenVoucher(true);
    };

    const handleCloseVoucher = () => {
        setOpenVoucher(false);
    };

    const handleApplyVoucher = async (e) => {
        e.preventDefault();
        setIsLoadingApplyVoucher(true);
        try {
            const { data } = await axiosClient.post('/api/voucher/applyVoucher', {
                code: codeVoucher,
                totalPrice,
            });
            console.log('dataApplyVoucher: ', data);
            if (data?.success) {
                dispatch(
                    applyVoucher({
                        voucher: data?.voucher,
                        discountValue: data?.discountValue,
                        finalPrice: data?.finalPrice,
                    })
                );
                context.openAlertBox('success', data.message);
            }
            handleCloseVoucher();
        } catch (error) {
            console.log(error);
            context.openAlertBox('error', error.response.data.message);
        } finally {
            setIsLoadingApplyVoucher(false);
        }
    };

    const handleCheckout = async () => {
        if (selectedCartItems.length === 0) {
            context.openAlertBox('error', 'Vui lòng chọn sản phẩm để thanh toán!');
            return;
        }
        console.log('selectedCartItems: ', selectedCartItems);
        console.log('totalQuantity: ', totalQuantity);
        console.log('totalPrice: ', totalPrice);
        console.log('finalPrice: ', finalPrice);
        console.log('cart?.voucher?.discountType: ', cart?.voucher?.discountType);
        console.log('cart?.voucher?.discountValue: ', cart?.voucher?.discountValue);
        console.log('cart?.voucher: ', cart?.voucher);

        setIsLoadingCheckout(true);

        try {
            const { data } = await axiosClient.post('/api/checkoutToken/createCheckoutToken', {
                selectedCartItems,
                totalQuantity,
                totalPrice,
                finalPrice,
                discountType: cart?.voucher?.discountType || '',
                discountValue: cart?.voucher?.discountValue || 0,
                voucher: cart?.voucher || null,
            });
            console.log('dataCheckout: ', data);
            if (data?.success) {
                navigate(data.redirectUrl);
            } else {
                context.openAlertBox('error', data.message || 'Không thể tạo đơn thanh toán');
            }
        } catch (error) {
            console.error('Lỗi khi tạo token thanh toán:', error);
            context.openAlertBox('error', error?.response?.data?.message || 'Lỗi server');
        } finally {
            setIsLoadingCheckout(false);
        }
    };

    return (
        <section ref={sectionRef} className="section py-10 pb-10">
            <div className="pb-2 pt-0  container w-[80%] max-w-[80%] flex items-center justify-between">
                <div className="">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="/" className="link transition !text-[16px]">
                            Trang chủ
                        </Link>
                        <Link underline="hover" color="inherit" to="/cart" className="link transition !text-[16px]">
                            Giỏ hàng
                        </Link>
                    </Breadcrumbs>
                </div>
                {selectedCarts?.length > 1 && (
                    <div className="">
                        <Button onClick={deleteMultipleCartItems} className="btn-org btn-login w-full">
                            Xóa tất cả
                        </Button>
                    </div>
                )}
            </div>
            <div className="container w-[80%] max-w-[80%] mx-auto flex gap-5">
                <div className="relative overflow-x-auto mt-1 pb-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                        {!isLoadingCarts && cart?.products?.length > 0 && (
                            <thead className="text-xs text-gray-700 uppercase bg-white">
                                <tr>
                                    <th scope="col" className="px-6 pr-0 py-2 ">
                                        <div className="w-[60px]">
                                            <Checkbox
                                                {...label}
                                                checked={isCheckedAll}
                                                onChange={handleSelectAll}
                                                size="small"
                                            />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-0 py-3 whitespace-nowrap">
                                        Sản phẩm
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Size
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Đơn giá
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Số lượng
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Số tiền
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                        )}

                        <tbody>
                            {isLoadingCarts === false ? (
                                cart?.products?.length > 0 &&
                                cart?.products?.map((item) => {
                                    return (
                                        <CartItems
                                            key={item?._id}
                                            cart={cart}
                                            cartId={item?._id}
                                            product={item?.product}
                                            productId={item?.product?._id}
                                            name={item?.name}
                                            brand={item?.brand}
                                            images={item?.images}
                                            oldPrice={item?.oldPrice}
                                            price={item?.price}
                                            size={item?.sizeProduct}
                                            quantity={item?.quantityProduct}
                                            isSelected={selectedCarts.includes(item._id)}
                                            handleSelect={() => handleSelectCart(item._id)}
                                        />
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={999}>
                                        <div
                                            style={{ width: sectionWidth / 2 }}
                                            className="flex items-center justify-center mx-auto min-h-[400px]"
                                        >
                                            <CircularProgress color="inherit" />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="container w-[80%] max-w-[80%] mx-auto flex gap-5">
                <div className="leftPart w-[70%]">
                    <Dialog open={openVoucher} onClose={handleCloseVoucher}>
                        <DialogTitle>Nhập Mã Voucher </DialogTitle>
                        <DialogContent sx={{ paddingBottom: 0 }}>
                            <DialogContentText>
                                Để áp dụng Voucher khi thanh toán, người dùng cần nhập chính xác Voucher đã được cung
                                cấp
                            </DialogContentText>
                            <form onSubmit={handleApplyVoucher}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="voucher"
                                    name="voucher"
                                    label="Mã voucher"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    FormLabelProps={{ required: false }}
                                    value={codeVoucher}
                                    onChange={(e) => setCodeVoucher(e.target.value)}
                                />
                                <DialogActions>
                                    <Button onClick={handleCloseVoucher}>Quay lại</Button>
                                    <Button type="submit" className="!text-primary">
                                        {isLoadingApplyVoucher === true ? (
                                            <CircularProgress color="inherit" />
                                        ) : (
                                            'Áp dụng'
                                        )}
                                    </Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <div className="shadow-md rounded-md bg-white p-5 flex items-center justify-between ">
                        <span className="text-[14px] font-[500]">Mã Voucher</span>
                        <span
                            className="text-[14px] text-primary font-[500] cursor-pointer"
                            onClick={handleClickOpenVoucher}
                        >
                            Nhập mã
                        </span>
                    </div>
                    <div className="shadow-md rounded-md bg-white p-5 mt-4 flex items-center justify-between ">
                        <span className="text-[14px] font-[500]">
                            Giảm {formatCurrency(500000)} phí vận chuyển đơn tối thiểu {formatCurrency(0)}
                        </span>
                        <span className="text-[14px] text-[#0055aa] font-[500] ">Tìm hiểu thêm</span>
                    </div>
                </div>
                <div className="rightPart w-[30%]">
                    <div className="shadow-md rounded-md bg-white p-5 ">
                        <h3 className="py-3">Chi tiết</h3>
                        <hr />
                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Số lượng</span>
                            <span className="text-primary font-bold">{totalQuantity}</span>
                        </p>
                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Giá sản phẩm</span>
                            <span className="text-primary font-bold">{formatCurrency(totalPrice)}</span>
                        </p>
                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Phí vận chuyển</span>
                            <span className="text-primary font-bold">{formatCurrency(0)}</span>
                        </p>
                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Voucher</span>
                            <span className="text-primary font-bold">
                                {cart?.voucher
                                    ? cart?.voucher?.discountType === 'percent'
                                        ? `${cart?.voucher?.discountValue}%`
                                        : `${formatCurrency(cart?.voucher?.discountValue)}`
                                    : 'Chưa áp dụng'}
                            </span>
                        </p>
                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Tổng tiền</span>
                            <span className="text-primary font-bold">{formatCurrency(finalPrice)}</span>
                        </p>

                        <br />

                        <Button onClick={handleCheckout} className="btn-org btn-login w-full flex gap-2">
                            {isLoadingCheckout ? (
                                <div className="flex items-center justify-center mx-auto">
                                    <CircularProgress color="inherit" />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <BsFillBagCheckFill className="text-[20px]" />
                                    Thanh toán
                                </div>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartPage;
