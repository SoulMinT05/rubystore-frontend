import React, { useContext, useEffect, useState } from 'react';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { FaAngleDown } from 'react-icons/fa6';
import { FaAngleUp } from 'react-icons/fa6';

import './SearchResultsProductListSidebar.scss';
import { MyContext } from '@/App';
import axiosAuth from '@/apis/axiosAuth';
import { formatCurrency } from '@/utils/formatters';
import {
    LIMIT_PRODUCTS,
    MIN_PRICE_PRODUCTS_SIDEBAR,
    MAX_PRICE_PRODUCTS_SIDEBAR,
    TIME_OUT_LOADING,
} from '@/constants/ui';

const SearchResultsProductListSidebar = ({
    setProductsList,
    setIsLoading,
    page,
    setPage,
    setTotalProducts,
    setTotalPages,
}) => {
    const context = useContext(MyContext);
    // const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
    const [isOpenAvailFilter, setIsOpenAvailFilter] = useState(true);
    // const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);

    const [filterProducts, setFilterProducts] = useState({
        keyword: '',
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
    });
    const [price, setPrice] = useState([MIN_PRICE_PRODUCTS_SIDEBAR, MAX_PRICE_PRODUCTS_SIDEBAR]);
    const location = useLocation(); // Là Object có pathname là /product

    const handleCheckboxChange = (field, value) => {
        const currentValues = filterProducts[field] || [];
        const updatedValues = currentValues?.includes(value)
            ? currentValues?.filter((item) => item !== value)
            : [...currentValues, value];

        setFilterProducts((prev) => ({
            ...prev,
            [field]: updatedValues,
            page: 1,
        }));
        if (field === 'categoryId') {
            setFilterProducts((prev) => ({
                ...prev,
                subCategoryId: [],
                thirdSubCategoryId: [],
                stockStatus: '',
                page: 1,
            }));
        }

        setPage(1);
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axiosAuth.get('/api/category/all-categories');
                if (data.success) {
                    context.setCategories(data?.categories);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getCategories();
    }, []);

    useEffect(() => {
        // const url = window.location.href; // http://localhost:30213/product?categoryId=681751c5db78565c8d98e823
        const queryParameters = new URLSearchParams(location.search); // ?categoryId=681751c5db78565c8d98e823
        const keyword = queryParameters.get('keyword');

        if (keyword) {
            setFilterProducts((prev) => ({
                ...prev,
                keyword: decodeURIComponent(keyword),
                page: 1,
            }));
            setPage(1);
        }
        filterProducts.page = 1;
    }, [location]);

    useEffect(() => {
        setIsLoading(true);
        const fetchFilterProducts = async () => {
            try {
                const { data } = await axiosAuth.post('/api/product/filter-product', filterProducts);
                if (data.success) {
                    setProductsList(data?.products);
                    setTotalProducts(data?.total);
                    setTotalPages(data?.totalPages);
                    window.scrollTo({
                        top: 0,
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        filterProducts.page = page;
        const timeout = setTimeout(() => {
            fetchFilterProducts();
        }, TIME_OUT_LOADING);

        return () => {
            clearTimeout(timeout);
        };
    }, [filterProducts, page]);

    useEffect(() => {
        const debouncedTimeout = setTimeout(() => {
            setFilterProducts((prev) => ({
                ...prev,
                minPrice: price[0],
                maxPrice: price[1],
            }));
        }, 500);

        return () => {
            clearTimeout(debouncedTimeout);
        };
    }, [price]);

    // const handleApplyFilter = () => {
    //     // setPage(1); // Reset lại page về 1
    //     // fetchFilterProducts();
    //     // setIsFilterApplied(true);
    //     context?.setOpenFilterProducts(false);
    // };

    // Nếu người dùng xác nhận, thì gọi API
    // useEffect(() => {
    //     if (isFilterApplied) {
    //         fetchFilterProducts();
    //         setIsFilterApplied(false); // Reset lại
    //     }
    // }, [isFilterApplied]);

    return (
        <aside className="sidebar pt-0 pb-6 lg:py-5 static lg:sticky top-[130px] z-[50]">
            <div className="max-h-[60vh] lg:max-h-[150vh] overflow-auto lg:overflow-hidden">
                <div className="box">
                    <h3 className="w-full mt-3 mb-[2px] text-[14px] lg:text-[15px] font-[600] flex items-center pr-0 lg:pr-5">
                        Loại sản phẩm
                        <Button
                            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
                            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
                        >
                            {isOpenCategoryFilter === true ? <FaAngleUp /> : <FaAngleDown />}
                        </Button>
                    </h3>
                    <Collapse isOpened={isOpenCategoryFilter}>
                        <div className="scroll px-4 relative -left-[13px]">
                            {context?.categories?.length !== 0 &&
                                context?.categories?.map((category, index) => {
                                    return (
                                        <FormControlLabel
                                            key={index}
                                            value={category?._id}
                                            control={<Checkbox size="small" />}
                                            checked={filterProducts?.categoryId?.includes(category?._id)}
                                            onChange={() => handleCheckboxChange('categoryId', category?._id)}
                                            label={category?.name}
                                            className="w-full"
                                        />
                                    );
                                })}
                        </div>
                    </Collapse>
                </div>

                <div className="box">
                    <h3 className="w-full mt-3 mb-[2px] text-[14px] lg:text-[15px] font-[600] flex items-center pr-0 lg:pr-5">
                        Trạng thái
                        <Button
                            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
                            onClick={() => setIsOpenAvailFilter(!isOpenAvailFilter)}
                        >
                            {isOpenAvailFilter === true ? <FaAngleUp /> : <FaAngleDown />}
                        </Button>
                    </h3>
                    <Collapse isOpened={isOpenAvailFilter}>
                        <div className="scroll px-4 relative -left-[13px]">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={filterProducts.stockStatus === 'available'}
                                        onChange={() => {
                                            setFilterProducts((prev) => ({
                                                ...prev,
                                                stockStatus: prev.stockStatus === 'available' ? '' : 'available',
                                                page: 1,
                                            }));
                                            setPage(1);
                                        }}
                                    />
                                }
                                label="Còn hàng"
                                className="w-full"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={filterProducts.stockStatus === 'unavailable'}
                                        onChange={() => {
                                            setFilterProducts((prev) => ({
                                                ...prev,
                                                stockStatus: prev.stockStatus === 'unavailable' ? '' : 'unavailable',
                                                page: 1,
                                            }));
                                            setPage(1);
                                        }}
                                    />
                                }
                                label="Hết hàng"
                                className="w-full"
                            />
                        </div>
                    </Collapse>
                </div>

                {/* <div className="box mt-3">
                    <h3 className="w-full mt-3 mb-[2px] text-[14px] lg:text-[15px] font-[600] flex items-center pr-0 lg:pr-5">
                        Kích cỡ
                        <Button
                            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
                            onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}
                        >
                            {isOpenSizeFilter === true ? <FaAngleUp /> : <FaAngleDown />}
                        </Button>
                    </h3>
                    <Collapse isOpened={isOpenSizeFilter}>
                        <div className="scroll px-4 relative -left-[13px]">
                            <FormControlLabel control={<Checkbox size="small" />} label="Nhỏ (16)" className="w-full" />
                            <FormControlLabel control={<Checkbox size="small" />} label="Vừa (20)" className="w-full" />
                            <FormControlLabel control={<Checkbox size="small" />} label="Lớn (15)" className="w-full" />
                            <FormControlLabel control={<Checkbox size="small" />} label="XL (15)" className="w-full" />
                            <FormControlLabel control={<Checkbox size="small" />} label="XXL (15)" className="w-full" />
                        </div>
                    </Collapse>
                </div> */}

                {/* Price */}
                <div className="box mt-4">
                    <h3 className="w-full mb-3 text-[14px] lg:text-[15px] font-[600] flex items-center pr-0 lg:pr-5">
                        Giá
                    </h3>
                    <RangeSlider
                        value={price}
                        onInput={setPrice}
                        min={MIN_PRICE_PRODUCTS_SIDEBAR}
                        max={MAX_PRICE_PRODUCTS_SIDEBAR}
                        step={5}
                    />
                    <div className="flex pt-4 pb-2 priceRange">
                        <span className="text-[12px] lg:text-[12px]">
                            Từ <strong className="text-dark"> {formatCurrency(price[0])}</strong>
                        </span>
                        <span className="ml-auto text-[12px] lg:text-[12px]">
                            Đến <strong className="text-dark"> {formatCurrency(price[1])}</strong>
                        </span>
                    </div>
                </div>

                <div className="box mt-4">
                    <h3 className="w-full mt-3 mb-[2px] text-[14px] lg:text-[15px] font-[600] flex items-center pr-0 lg:pr-5">
                        Đánh giá
                    </h3>
                    <div className="flex items-center -ml-[4px] lg:ml-[4px] xl:ml-[2px] 2xl:ml-[4px]">
                        <FormControlLabel
                            className="pl-2 lg:pl-0"
                            value={5}
                            control={<Checkbox size="small" />}
                            checked={filterProducts?.rating?.includes(5)}
                            onChange={() => handleCheckboxChange('rating', 5)}
                        />
                        <Rating name="size-small" defaultValue={5} readOnly size="small" />
                    </div>
                    <div className="flex items-center -ml-[4px] lg:ml-[4px] xl:ml-[2px] 2xl:ml-[4px]">
                        <FormControlLabel
                            className="pl-2 lg:pl-0"
                            value={4}
                            control={<Checkbox size="small" />}
                            checked={filterProducts?.rating?.includes(4)}
                            onChange={() => handleCheckboxChange('rating', 4)}
                        />
                        <Rating name="size-small" defaultValue={4} readOnly size="small" />
                    </div>
                    <div className="flex items-center -ml-[4px] lg:ml-[4px] xl:ml-[2px] 2xl:ml-[4px]">
                        <FormControlLabel
                            className="pl-2 lg:pl-0"
                            value={3}
                            control={<Checkbox size="small" />}
                            checked={filterProducts?.rating?.includes(3)}
                            onChange={() => handleCheckboxChange('rating', 3)}
                        />
                        <Rating name="size-small" defaultValue={3} readOnly size="small" />
                    </div>
                    <div className="flex items-center -ml-[4px] lg:ml-[4px] xl:ml-[2px] 2xl:ml-[4px]">
                        <FormControlLabel
                            className="pl-2 lg:pl-0"
                            value={2}
                            control={<Checkbox size="small" />}
                            checked={filterProducts?.rating?.includes(2)}
                            onChange={() => handleCheckboxChange('rating', 2)}
                        />
                        <Rating name="size-small" defaultValue={2} readOnly size="small" />
                    </div>
                    <div className="flex items-center -ml-[4px] lg:ml-[4px] xl:ml-[2px] 2xl:ml-[4px]">
                        <FormControlLabel
                            className="pl-2 lg:pl-0"
                            value={1}
                            control={<Checkbox size="small" />}
                            checked={filterProducts?.rating?.includes(1)}
                            onChange={() => handleCheckboxChange('rating', 1)}
                        />
                        <Rating name="size-small" defaultValue={1} readOnly size="small" />
                    </div>
                </div>
            </div>

            {/* {context?.windowWidth <= 992 && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApplyFilter}
                    className="!bg-primary !text-white !mt-4 !w-full !normal-case"
                >
                    Xác nhận
                </Button>
            )} */}
        </aside>
    );
};

export default SearchResultsProductListSidebar;
