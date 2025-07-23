import React, { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';

import { Link, useSearchParams } from 'react-router-dom';

import { IoGridSharp } from 'react-icons/io5';
import { LuMenu } from 'react-icons/lu';

import ProductListSidebar from '../../components/ProductListSidebar/ProductListSidebar';
import HomeProductItem from '../../components/HomeProductsItem/HomeProductsItem';
import ProductListItemView from '../../components/ProductListItemView/ProductListItemView';

import '../ProductListPage/ProductListPage.css';
import ProductLoading from '../../components/ProductLoading/ProductLoading';
import axiosAuth from '../../apis/axiosAuth';
import { MyContext } from '../../App';

const ProductListPage = () => {
    const context = useContext(MyContext);
    const [itemView, setItemView] = useState('grid');
    const [anchorEl, setAnchorEl] = useState(null);
    const [productsList, setProductsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('categoryId');
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        context?.setIsFilterProductsBtnShow(true);
    }, [context?.isFilterProductsBtnShow]);

    useEffect(() => {
        if (categoryId) {
            axiosAuth
                .get(`/api/product/all-products-category-id/${categoryId}`)
                .then((res) => {
                    setCategoryName(res?.data?.products[0]?.categoryName);
                })
                .catch((error) => {
                    console.error('Lỗi khi fetch category:', error);
                });
        }
    }, [categoryId]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedSortValue, setSelectedSortValue] = useState('Thứ tự A đến Z');

    useEffect(() => {
        if (productsList?.length > 0) {
            handleSortBy('name', 'asc', productsList, 'Thứ tự A đến Z');
        }
    }, []);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSortBy = async (name, order, products, value) => {
        if (!Array.isArray(products) || products.length === 0) {
            console.error('Products không phải là mảng hoặc rỗng.');
            return;
        }

        setSelectedSortValue(value);
        const { data } = await axiosAuth.post('/api/product/sort', {
            products,
            sortBy: name,
            order,
        });
        if (data.success) {
            setProductsList(data?.products);
            setAnchorEl(null);
        }
    };
    return (
        <section className="py-5 pb-0">
            <div className="container p-2">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        color="inherit"
                        to="/"
                        className="link transition text-[14px] lg:text-[16px] "
                    >
                        Trang chủ
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        to={`/product?categoryId=${categoryId}`}
                        className="link transition text-[14px] lg:text-[16px] "
                    >
                        {categoryName}
                    </Link>
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
                            productsList={productsList}
                            setProductsList={setProductsList}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            page={page}
                            setPage={setPage}
                            setTotalPages={setTotalPages}
                        />
                    </div>

                    {context?.windowWidth < 992 && (
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
                                    Tổng {productsList?.length !== 0 ? productsList?.length : 0} sản phẩm
                                </span>
                            </div>

                            <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
                                <span className="text-[12px] lg:text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                                    Sắp xếp theo
                                </span>

                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className="!bg-white !text-[12px] !text-[#000] !capitalize !border-2 !border-[#000]"
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
                                    {/* <MenuItem className="!text-[13px] !text-[#000] !capitalize">
                                        Giảm giá: Cao đến thấp nhất
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} className="!text-[13px] !text-[#000] !capitalize">
                                        Phổ biến
                                    </MenuItem> */}
                                    <MenuItem
                                        onClick={() => handleSortBy('name', 'asc', productsList, 'Thứ tự A đến Z')}
                                        className="!text-[12px] !lg:text-[14px] !text-[#000] !capitalize"
                                    >
                                        Thứ tự A đến Z
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleSortBy('name', 'desc', productsList, 'Thứ tự Z đến A')}
                                        className="!text-[12px] !lg:text-[14px] !text-[#000] !capitalize"
                                    >
                                        Thứ tự Z về A
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleSortBy('price', 'asc', productsList, 'Giá: thấp đến cao')}
                                        className="!text-[12px] !lg:text-[14px] !text-[#000] !capitalize"
                                    >
                                        Giá: thấp đến cao
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleSortBy('price', 'desc', productsList, 'Giá: cao đến thấp')}
                                        className="!text-[12px] !lg:text-[14px] !text-[#000] !capitalize"
                                    >
                                        Giá: cao đến thấp
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <div
                            className={`grid ${
                                itemView === 'grid'
                                    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5'
                                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1'
                            } gap-4`}
                        >
                            {itemView === 'grid' ? (
                                <>
                                    {isLoading === true ? (
                                        <ProductLoading view={itemView} />
                                    ) : (
                                        productsList?.length !== 0 &&
                                        productsList?.map((product, index) => {
                                            return <HomeProductItem key={index} product={product} />;
                                        })
                                    )}
                                </>
                            ) : (
                                <>
                                    {isLoading === true ? (
                                        <ProductLoading view={itemView} />
                                    ) : (
                                        productsList?.products?.length !== 0 &&
                                        productsList?.map((product, index) => {
                                            return <ProductListItemView key={index} product={product} />;
                                        })
                                    )}
                                </>
                            )}
                        </div>

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
