import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import CartPage from '../pages/CartPage/CartPage';
import VerifyPage from '../pages/VerifyPage/VerifyPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage/ResetPasswordPage';
import VerifyPasswordPage from '../pages/VerifyPasswordPage/VerifyPasswordPage';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import MyAccountPage from '../pages/MyAccountPage/MyAccountPage';
import OrderHistoryPage from '../pages/OrderHistoryPage/OrderHistoryPage';
import WishlistPage from '../pages/WishlistPage/WishlistPage';
import ProductListPage from '../pages/ProductListPage/ProductListPage';
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage';
import PrivateRoute from './PrivateRoute';
import ChangePasswordPage from '../components/ChangePasswordPage/ChangePasswordPage';

const AppRoutes = () => (
    <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/register" exact element={<RegisterPage />} />
        <Route path="/cart" exact element={<CartPage />} />
        <Route path="/verify" exact element={<VerifyPage />} />
        <Route path="/verify-password" exact element={<VerifyPasswordPage />} />
        <Route path="/forgot-password" exact element={<ForgotPasswordPage />} />
        <Route path="/reset-password" exact element={<ResetPasswordPage />} />
        <Route path="/product/:id" exact element={<ProductDetailsPage />} />
        <Route path="/product" exact element={<ProductListPage />} />

        <Route
            path="/checkout"
            exact
            element={
                <PrivateRoute>
                    <CheckoutPage />
                </PrivateRoute>
            }
        />
        <Route
            path="/my-account"
            exact
            element={
                <PrivateRoute>
                    <MyAccountPage />
                </PrivateRoute>
            }
        />
        <Route
            path="/order-history"
            exact
            element={
                <PrivateRoute>
                    <OrderHistoryPage />
                </PrivateRoute>
            }
        />
        <Route
            path="/wishlist"
            exact
            element={
                <PrivateRoute>
                    <WishlistPage />
                </PrivateRoute>
            }
        />
        <Route
            path="/change-password"
            exact
            element={
                <PrivateRoute>
                    <ChangePasswordPage />
                </PrivateRoute>
            }
        />
    </Routes>
);

export default AppRoutes;
