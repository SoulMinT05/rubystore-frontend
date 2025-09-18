import React, { useContext, useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Button, CircularProgress } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import { Link, useParams } from 'react-router-dom';
import { IoGridSharp } from 'react-icons/io5';
import { LuMenu } from 'react-icons/lu';

import './ProductListPage.scss';
import ProductListSidebar from '@/components/ProductListSidebar';
import HomeProductItem from '@/components/HomeProductsItem';
import ProductListItemView from '@/components/ProductListItemView';
import axiosAuth from '@/apis/axiosAuth';
import { MyContext } from '@/App';
import { LIMIT_PRODUCTS, TIME_OUT_LOADING } from '@/constants/ui';

const ProductListPage = () => {
    const context = useContext(MyContext);
    const { slug } = useParams();

    const [itemView, setItemView] = useState('grid');
    const [anchorEl, setAnchorEl] = useState(null);
    const [productsList, setProductsList] = useState([]);
    const [isLoadingProductsSlug, setIsProductsSlug] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [breadcrumb, setBreadcrumb] = useState({
        categoryName: '',
        categorySlug: '',
        subCategoryName: '',
        subCategorySlug: '',
        thirdSubCategoryName: '',
        thirdSubCategorySlug: '',
    });

    // Page
    const [page, setPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Sort
    const [selectedSortValue, setSelectedSortValue] = useState('Thứ tự A đến Z');

    // 🔑 Nâng state filterProducts lên cha
    const [filterProducts, setFilterProducts] = useState({
        categoryId: [],
        subCategoryId: [],
        thirdSubCategoryId: [],
        slug: '',
        minPrice: '',
        maxPrice: '',
        rating: '',
        stockStatus: '',
        page: 1,
        limit: LIMIT_PRODUCTS,
        sortBy: 'name', // default sort
        order: 'asc',
    });

    useEffect(() => {
        context?.setIsFilterProductsBtnShow(true);
    }, [context?.isFilterProductsBtnShow]);

    useEffect(() => {
        setIsProductsSlug(true);
        const handleTimeout = setTimeout(() => {
            const fetchProductsSlug = async () => {
                try {
                    const { data } = await axiosAuth.get(`/api/product/getProductsByCategorySlug/${slug}`);
                    console.log('productsSlug: ', data);
                    if (data?.products?.length > 0) {
                        const firstProduct = data?.products[0];
                        const {
                            categoryName,
                            subCategoryName,
                            thirdSubCategoryName,
                            categorySlug,
                            subCategorySlug,
                            thirdSubCategorySlug,
                        } = firstProduct;
                        if (data?.searchLevel === 'category') {
                            setBreadcrumb({
                                categoryName,
                                categorySlug,
                                subCategoryName: '',
                                subCategorySlug: '',
                                thirdSubCategoryName: '',
                                thirdSubCategorySlug: '',
                            });
                        } else if (data?.searchLevel === 'subCategory') {
                            setBreadcrumb({
                                categoryName,
                                categorySlug,
                                subCategoryName,
                                subCategorySlug,
                                thirdSubCategoryName: '',
                                thirdSubCategorySlug: '',
                            });
                        } else if (data?.searchLevel === 'thirdSubCategory') {
                            setBreadcrumb({
                                categoryName,
                                categorySlug,
                                subCategoryName,
                                subCategorySlug,
                                thirdSubCategoryName,
                                thirdSubCategorySlug,
                            });
                        }
                    }
                } catch (error) {
                    context.openAlertBox('error', error.response.data.message);
                } finally {
                    setIsProductsSlug(false);
                }
            };
            fetchProductsSlug();
        }, TIME_OUT_LOADING);

        return () => {
            clearTimeout(handleTimeout);
        };
    }, [slug]);

    useEffect(() => {
        handleSortBy('createdAt', 'desc', 'Mới nhất');
    }, []);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSortBy = (name, order, value) => {
        setSelectedSortValue(value);
        setFilterProducts((prev) => ({
            ...prev,
            sortBy: name,
            order: order,
            page: 1, // reset page khi đổi sort
        }));
        setPage(1);
    };

    return (
        <section className="py-5 pb-0">
            <div className="container p-2 lg:p-0">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        color="inherit"
                        to="/"
                        className="link transition text-[14px] lg:text-[16px] "
                    >
                        Trang chủ
                    </Link>
                    {breadcrumb?.categoryName && (
                        <Link
                            underline="hover"
                            color="inherit"
                            to={`/${breadcrumb?.categorySlug}`}
                            className={`link transition text-[14px] lg:text-[16px] ${
                                breadcrumb?.subCategoryName ? '' : 'pointer-events-none cursor-default'
                            }`}
                        >
                            {breadcrumb?.categoryName}
                        </Link>
                    )}
                    {breadcrumb?.subCategoryName && (
                        <Link
                            underline="hover"
                            color="inherit"
                            to={`/${breadcrumb?.subCategorySlug}`}
                            className={`link transition text-[14px] lg:text-[16px] ${
                                breadcrumb?.thirdSubCategoryName ? '' : 'pointer-events-none cursor-default'
                            }`}
                        >
                            {breadcrumb?.subCategoryName}
                        </Link>
                    )}
                    {breadcrumb?.thirdSubCategoryName && (
                        <Link
                            underline="hover"
                            color="inherit"
                            to={`/${breadcrumb?.thirdSubCategorySlug}`}
                            className="link transition text-[14px] lg:text-[16px] pointer-events-none cursor-default"
                        >
                            {breadcrumb?.thirdSubCategoryName}
                        </Link>
                    )}
                </Breadcrumbs>
            </div>

            <div className="bg-white p-2 mt-4">
                <div className="container flex gap-4">
                    <div
                        className={`sidebarWrapper fixed -bottom-[100%] left-0 w-full
                        lg:h-full lg:static lg:w-[20%] bg-white z-[102] lg:z-[99] p-3 lg:p-0 transition-all 
                        opacity-0 lg:opacity-100 ${context?.openFilterProducts ? 'open' : ''}`}
                    >
                        <ProductListSidebar
                            filterProducts={filterProducts}
                            setFilterProducts={setFilterProducts}
                            productsList={productsList}
                            setProductsList={setProductsList}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            page={page}
                            setPage={setPage}
                            setTotalProducts={setTotalProducts}
                            setTotalPages={setTotalPages}
                        />
                    </div>

                    {context?.windowWidth <= 992 && (
                        <div
                            onClick={() => context.setOpenFilterProducts(false)}
                            className={`filter_overlay top-0 left-0 fixed h-full w-full bg-[rgba(0,0,0,0.5)] z-[101] ${
                                context?.openFilterProducts ? '' : 'hidden'
                            } `}
                        ></div>
                    )}

                    <div className="rightContent w-full lg:w-[80%] py-3">
                        <div
                            className="bg-[#f1f1f1] p-2 w-full mb-4 rounded-md flex items-center justify-between
                            sticky top-[130px] z-[99]"
                        >
                            <div className="col1 flex items-center itemViewActions">
                                <Button
                                    className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]
                                        ${itemView === 'list' && 'active'}`}
                                    onClick={() => setItemView('list')}
                                >
                                    <LuMenu className="text-[rgba(0,0,0,0.7)]" />
                                </Button>
                                <Button
                                    className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]
                                        ${itemView === 'grid' && 'active'}`}
                                    onClick={() => setItemView('grid')}
                                >
                                    <IoGridSharp className="text-[rgba(0,0,0,0.7)]" />
                                </Button>
                                <span className="text-[12px] lg:text-[14px] hidden sm:block font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                                    Tổng {totalProducts !== 0 ? totalProducts : 0} sản phẩm
                                </span>
                            </div>

                            <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
                                <span className="text-[12px] lg:!text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                                    Sắp xếp theo
                                </span>

                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className="!bg-white !text-[12px] lg:!text-[14px] !text-[#000] !normal-case !border-2 !border-[#000]"
                                >
                                    {selectedSortValue}
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {/* <MenuItem
                                        onClick={() => handleSortBy('name', 'asc', 'Thứ tự A đến Z')}
                                        className="!text-[12px] lg:!text-[14px] !text-[#000] !normal-case"
                                    >
                                        Thứ tự A đến Z
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleSortBy('name', 'desc', 'Thứ tự Z đến A')}
                                        className="!text-[12px] lg:!text-[14px] !text-[#000] !normal-case"
                                    >
                                        Thứ tự Z về A
                                    </MenuItem> */}
                                    <MenuItem
                                        onClick={() => handleSortBy('isFeatured', 'desc', 'Phổ biến')}
                                        className="!text-[12px] lg:!text-[14px] !text-[#000] !normal-case"
                                    >
                                        Phổ biến
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleSortBy('createdAt', 'desc', 'Mới nhất')}
                                        className="!text-[12px] lg:!text-[14px] !text-[#000] !normal-case"
                                    >
                                        Mới nhất
                                    </MenuItem>
                                    {/* <MenuItem
                                        onClick={() => handleSortBy('createdAt', 'asc', 'Cũ nhất')}
                                        className="!text-[12px] lg:!text-[14px] !text-[#000] !normal-case"
                                    >
                                        Cũ nhất
                                    </MenuItem> */}
                                    <MenuItem
                                        onClick={() => handleSortBy('quantitySold', 'desc', 'Bán chạy')}
                                        className="!text-[12px] lg:!text-[14px] !text-[#000] !normal-case"
                                    >
                                        Bán chạy
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleSortBy('price', 'asc', 'Giá thấp đến cao')}
                                        className="!text-[12px] lg:!text-[14px] !text-[#000] !normal-case"
                                    >
                                        Giá thấp đến cao
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleSortBy('price', 'desc', 'Giá cao đến thấp')}
                                        className="!text-[12px] lg:!text-[14px] !text-[#000] !normal-case"
                                    >
                                        Giá cao đến thấp
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>

                        {isLoadingProductsSlug || isLoading ? (
                            <div className="flex items-center justify-center w-full min-h-[400px]">
                                <CircularProgress color="inherit" />
                            </div>
                        ) : (
                            <>
                                {productsList?.length > 0 ? (
                                    <div
                                        className={`grid ${
                                            itemView === 'grid'
                                                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5'
                                                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1'
                                        } gap-4`}
                                    >
                                        {productsList.map((product, index) =>
                                            itemView === 'grid' ? (
                                                <HomeProductItem key={index} product={product} />
                                            ) : (
                                                <ProductListItemView key={index} product={product} />
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center w-full min-h-[400px]">
                                        Không có sản phẩm
                                    </div>
                                )}
                            </>
                        )}

                        {totalPages > 1 && (
                            <div className="flex items-center justify-center mt-10">
                                <Pagination
                                    showFirstButton
                                    showLastButton
                                    count={totalPages}
                                    page={page}
                                    onChange={(e, value) => setPage(value)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductListPage;
