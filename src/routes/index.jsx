import { Route, Routes } from 'react-router-dom';
// Layouts
import DefaultLayout from '@/layouts/DefaultLayout';
// Route
import PrivateRoute from './PrivateRoute';
// Pages
import HomePage from '@/pages/HomePage/HomePage';
import LoginPage from '@/pages/LoginPage/LoginPage';
import RegisterPage from '@/pages/RegisterPage/RegisterPage';
import CartPage from '@/pages/CartPage/CartPage';
import VerifyPage from '@/pages/VerifyPage/VerifyPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage/ResetPasswordPage';
import VerifyPasswordPage from '@/pages/VerifyPasswordPage/VerifyPasswordPage';
import CheckoutPage from '@/pages/CheckoutPage/CheckoutPage';
import MyAccountPage from '@/pages/MyAccountPage/MyAccountPage';
import OrderHistoryPage from '@/pages/OrderHistoryPage/OrderHistoryPage';
import WishlistPage from '@/pages/WishlistPage/WishlistPage';
import ProductListPage from '@/pages/ProductListPage/ProductListPage';
import ProductDetailsPage from '@/pages/ProductDetailsPage/ProductDetailsPage';
import ChangePasswordPage from '@/pages/ChangePasswordPage/ChangePasswordPage';
import SearchResultsPage from '@/pages/SearchResultsPage/SearchResultsPage';
import MessagePage from '@/pages/MessagePage/MessagePage';
import MessagePageDetails from '@/pages/MessagePageDetails/MessagePageDetails';
import BlogDetailsPage from '@/pages/BlogDetailsPage/BlogDetailsPage';
import NotificationPage from '@/pages/NotificationPage/NotificationPage';
// Components
import ScrollToTopComponent from '@/components/ScrollToTopComponent/ScrollToTopComponent';

const AppRoutes = () => (
    <>
        <ScrollToTopComponent />
        <Routes>
            {/* Default Layout */}
            <Route element={<DefaultLayout />}>
                {/* Not login */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify" element={<VerifyPage />} />
                <Route path="/verify-password" element={<VerifyPasswordPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                {/* Already login */}
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:slug" element={<ProductDetailsPage />} />
                <Route path="/product" element={<ProductListPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route
                    path="/checkout"
                    element={
                        <PrivateRoute>
                            <CheckoutPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/my-account"
                    element={
                        <PrivateRoute>
                            <MyAccountPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/order-history"
                    element={
                        <PrivateRoute>
                            <OrderHistoryPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/wishlist"
                    element={
                        <PrivateRoute>
                            <WishlistPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/notification"
                    element={
                        <PrivateRoute>
                            <NotificationPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/change-password"
                    element={
                        <PrivateRoute>
                            <ChangePasswordPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/blog/:slug"
                    element={
                        <PrivateRoute>
                            <BlogDetailsPage />
                        </PrivateRoute>
                    }
                />
            </Route>

            {/* No layout */}
            <Route
                path="/message"
                element={
                    <PrivateRoute>
                        <MessagePage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/message/:id"
                element={
                    <PrivateRoute>
                        <MessagePageDetails />
                    </PrivateRoute>
                }
            />
        </Routes>
    </>
);

export default AppRoutes;
