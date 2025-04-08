import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={'/'} exact={true} element={<HomePage />} />
                    <Route path={'/product-list'} exact={true} element={<ProductListPage />} />
                    <Route path={'/product/:id'} exact={true} element={<ProductDetailsPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
