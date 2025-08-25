import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { RiMenu2Fill } from 'react-icons/ri';
import { LiaAngleDownSolid } from 'react-icons/lia';
import { GoRocket } from 'react-icons/go';
import { Link } from 'react-router-dom';
import CategoryPanel from '../CategoryPanel/CategoryPanel';

import './Navigation.scss';
import axiosAuth from '../../apis/axiosAuth';
import { MyContext } from '../../App';
import MobileNavigation from './MobileNavigation/MobileNavigation';

const Navigation = ({ isOpenCatPanel, setIsOpenCatPanel }) => {
    const context = useContext(MyContext);
    const [categories, setCategories] = useState([]);
    const openCategoryPanel = () => {
        setIsOpenCatPanel(true);
    };

    useEffect(() => {
        setIsOpenCatPanel(isOpenCatPanel);
    }, [isOpenCatPanel, setIsOpenCatPanel]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axiosAuth.get('/api/category/all-categories');
                if (data.success) {
                    setCategories(data?.categories);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getCategories();
    }, []);

    return (
        <>
            <nav className="navigation py-4 xl:py-2">
                <div className="container flex items-center justify-start gap-2 !mx-4 xl:mx-0">
                    {context?.windowWidth > 1279 && (
                        <div className="col_1 w-[14%] xl:w-[14%]">
                            <Button className="!text-black gap-2 w-full" onClick={openCategoryPanel}>
                                <RiMenu2Fill className="!text-[18px]" />
                                Danh mục
                                <LiaAngleDownSolid className="!text-[13px] ml-auto font-bold cursor-pointer" />
                            </Button>
                        </div>
                    )}
                    <div className="col_2 w-full xl:w-[86%]">
                        <ul className="flex items-center gap-3 xl:gap-8 nav">
                            <li className="list-none">
                                <Link
                                    to="/"
                                    className="link transition text-black text-[12px] lg:text-[13px] xl:text-[14px] font-[500]"
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            {categories?.length !== 0 &&
                                categories?.map((category, index) => {
                                    return (
                                        <li key={index} className="list-none relative">
                                            <Link
                                                to={`/product?categoryId=${category?._id}`}
                                                className="link transition text-black text-[12px] lg:text-[13px] xl:text-[14px] font-[500]"
                                            >
                                                {category?.name}
                                            </Link>
                                            {category?.children?.length !== 0 && (
                                                <div className="submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
                                                    <ul>
                                                        {category?.children?.map((subCategory, subIndex) => {
                                                            return (
                                                                <li
                                                                    key={subIndex}
                                                                    className="list-none w-full relative"
                                                                >
                                                                    <Link
                                                                        // to={`/product?subCategoryId=${subCategory?._id}`}
                                                                        to={`/product?categoryId=${category?._id}&subCategoryId=${subCategory?._id}`}
                                                                        className="w-full"
                                                                    >
                                                                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                                            {subCategory?.name}
                                                                        </Button>
                                                                    </Link>

                                                                    {subCategory?.children?.length !== 0 && (
                                                                        <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                                                                            <ul>
                                                                                {subCategory?.children?.map(
                                                                                    (thirdSubCategory, thirdIndex) => {
                                                                                        return (
                                                                                            <li
                                                                                                key={thirdIndex}
                                                                                                className="list-none w-full"
                                                                                            >
                                                                                                <Link
                                                                                                    // to={`/product?thirdSubCategoryId=${thirdSubCategory?._id}`}
                                                                                                    to={`/product?categoryId=${category?._id}&subCategoryId=${subCategory?._id}&thirdSubCategoryId=${thirdSubCategory?._id}`}
                                                                                                    className="w-full"
                                                                                                >
                                                                                                    <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                                                                        {
                                                                                                            thirdSubCategory?.name
                                                                                                        }
                                                                                                    </Button>
                                                                                                </Link>
                                                                                            </li>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    )}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                    <div className="col_3 hidden lg:block lg:w-[30%] xl:hidden ">
                        <p className="text-[12px] md:text-[13px] lg:text-[13px] xl:text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0">
                            <GoRocket className="text-[18px]" />
                            Giao hàng quốc tế miễn phí
                        </p>
                    </div>
                </div>
            </nav>

            {categories?.length !== 0 && (
                <CategoryPanel
                    categories={categories}
                    isOpenCatPanel={isOpenCatPanel}
                    setIsOpenCatPanel={setIsOpenCatPanel}
                />
            )}

            {context.userInfo?._id && context.windowWidth <= 1023 && <MobileNavigation />}
        </>
    );
};

export default Navigation;
