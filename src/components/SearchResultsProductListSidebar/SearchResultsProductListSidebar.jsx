import React, { useContext, useEffect, useState } from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';

import { Collapse } from 'react-collapse';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import { FaAngleDown } from 'react-icons/fa6';
import { FaAngleUp } from 'react-icons/fa6';

import '../SearchResultsProductListSidebar/SearchResultsProductListSidebar.css';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { MyContext } from '../../App';
import axiosAuth from '../../apis/axiosAuth';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

const SearchResultsProductListSidebar = ({ setProductsList, setIsLoading, page, setPage, setTotalPages }) => {
    const context = useContext(MyContext);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
    const [isOpenAvailFilter, setIsOpenAvailFilter] = useState(true);
    const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);

    const [filterProducts, setFilterProducts] = useState({
        keyword: '',
        categoryId: [],
        subCategoryId: [],
        thirdSubCategoryId: [],
        minPrice: '',
        maxPrice: '',
        rating: '',
        stockStatus: '',
        page: 1,
        limit: 12,
    });
    const [price, setPrice] = useState([10000, 10000000]);
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
        // const url = window.location.href; // http://localhost:5173/product?categoryId=681751c5db78565c8d98e823
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

        // if (url.includes('categoryId')) {
        //     const queryCategoryId = queryParameters.get('categoryId');
        //     setFilterProducts((prev) => ({
        //         ...prev,
        //         categoryId: [queryCategoryId],
        //         subCategoryId: [],
        //         thirdSubCategoryId: [],
        //         rating: [],
        //         page: 1,
        //     }));
        //     setPage(1);
        // }
        // if (url.includes('subCategoryId')) {
        //     const querySubCategoryId = queryParameters.get('subCategoryId');
        //     setFilterProducts((prev) => ({
        //         ...prev,
        //         categoryId: [],
        //         subCategoryId: [querySubCategoryId],
        //         thirdSubCategoryId: [],
        //         rating: [],
        //         page: 1,
        //     }));
        //     setPage(1);
        // }
        // if (url.includes('thirdSubCategoryId')) {
        //     const queryThirdSubCategoryId = queryParameters.get('thirdSubCategoryId');
        //     setFilterProducts((prev) => ({
        //         ...prev,
        //         categoryId: [],
        //         subCategoryId: [],
        //         thirdSubCategoryId: [queryThirdSubCategoryId],
        //         rating: [],
        //         page: 1,
        //     }));
        //     setPage(1);
        // }
        filterProducts.page = 1;
    }, [location]);

    const fetchFilterProducts = async () => {
        setIsLoading(true);
        try {
            const { data } = await axiosAuth.post('/api/product/filter-product', filterProducts);
            if (data.success) {
                setProductsList(data?.products);
                setTotalPages(data?.totalPages);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        filterProducts.page = page;
        fetchFilterProducts();
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

    const handleApplyFilter = () => {
        setPage(1); // Reset lại page về 1
        fetchFilterProducts();
        setIsFilterApplied(true);
    };

    // Nếu người dùng xác nhận, thì gọi API
    useEffect(() => {
        if (isFilterApplied) {
            fetchFilterProducts();
            setIsFilterApplied(false); // Reset lại
        }
    }, [isFilterApplied]);

    return (
        <aside className="sidebar py-5 sticky top-[130px] z-[50]">
            <div className="box">
                <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
                    Phân loại sản phẩm
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
                                        label={category?.name}
                                        onChange={() => handleCheckboxChange('categoryId', category?._id)}
                                        className="w-full"
                                    />
                                );
                            })}
                    </div>
                </Collapse>
            </div>

            <div className="box">
                <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
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

            <div className="box mt-3">
                <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
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
            </div>

            {/* Price */}
            <div className="box mt-4">
                <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Giá</h3>
                <RangeSlider value={price} onInput={setPrice} min={10000} max={10000000} step={5} />
                <div className="flex pt-4 pb-2 priceRange">
                    <span className="text-[13px]">
                        Từ <strong className="text-dark">: {formatCurrency(price[0])}</strong>
                    </span>
                    <span className="ml-auto text-[13px]">
                        Từ <strong className="text-dark">: {formatCurrency(price[1])}</strong>
                    </span>
                </div>
            </div>

            <div className="box mt-4">
                <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Đánh giá</h3>

                <div className="flex items-center">
                    <FormControlLabel
                        value={5}
                        control={<Checkbox size="small" />}
                        checked={filterProducts?.rating?.includes(5)}
                        onChange={() => handleCheckboxChange('rating', 5)}
                    />
                    <Rating name="size-small" defaultValue={5} readOnly size="small" />
                </div>
                <div className="flex items-center">
                    <FormControlLabel
                        value={4}
                        control={<Checkbox size="small" />}
                        checked={filterProducts?.rating?.includes(4)}
                        onChange={() => handleCheckboxChange('rating', 4)}
                    />
                    <Rating name="size-small" defaultValue={4} readOnly size="small" />
                </div>
                <div className="flex items-center">
                    <FormControlLabel
                        value={3}
                        control={<Checkbox size="small" />}
                        checked={filterProducts?.rating?.includes(3)}
                        onChange={() => handleCheckboxChange('rating', 3)}
                    />
                    <Rating name="size-small" defaultValue={3} readOnly size="small" />
                </div>
                <div className="flex items-center">
                    <FormControlLabel
                        value={2}
                        control={<Checkbox size="small" />}
                        checked={filterProducts?.rating?.includes(2)}
                        onChange={() => handleCheckboxChange('rating', 2)}
                    />
                    <Rating name="size-small" defaultValue={2} readOnly size="small" />
                </div>
                <div className="flex items-center">
                    <FormControlLabel
                        value={1}
                        control={<Checkbox size="small" />}
                        checked={filterProducts?.rating?.includes(1)}
                        onChange={() => handleCheckboxChange('rating', 1)}
                    />
                    <Rating name="size-small" defaultValue={1} readOnly size="small" />
                </div>
            </div>
            <div className="box mt-4 flex justify-end">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApplyFilter}
                    className="!bg-primary !text-white !w-full !normal-case"
                >
                    Xác nhận
                </Button>
            </div>
        </aside>
    );
};

export default SearchResultsProductListSidebar;
