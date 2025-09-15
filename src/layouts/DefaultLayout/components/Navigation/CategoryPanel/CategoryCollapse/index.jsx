import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { FiMinusSquare } from 'react-icons/fi';

const CategoryCollapse = ({ categories, toggleDrawer }) => {
    const [submenuIndex, setSubmenuIndex] = useState(null);
    const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

    const openSubmenu = (index) => {
        if (submenuIndex === index) {
            setSubmenuIndex(null);
        } else {
            setSubmenuIndex(index);
        }
    };
    const openInnerSubmenu = (index) => {
        if (innerSubmenuIndex === index) {
            setInnerSubmenuIndex(null);
        } else {
            setInnerSubmenuIndex(index);
        }
    };

    return (
        <>
            <div className="scroll">
                <ul className="w-full">
                    {categories?.length !== 0 &&
                        categories?.map((category, index) => {
                            return (
                                <li key={index} className="list-none flex items-center relative flex-col">
                                    <Link
                                        to={`/product?categoryId=${category?._id}`}
                                        onClick={toggleDrawer(false)}
                                        className="w-full "
                                    >
                                        <Button className="w-full !text-[13px] !lg:text-[14px] !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                                            {category?.name}
                                        </Button>
                                    </Link>
                                    {submenuIndex === index ? (
                                        <FiMinusSquare
                                            onClick={() => openSubmenu(index)}
                                            className="absolute top-[10px] right-[15px] cursor-pointer"
                                        />
                                    ) : (
                                        <FaRegSquarePlus
                                            onClick={() => openSubmenu(index)}
                                            className="absolute top-[10px] right-[15px] cursor-pointer"
                                        />
                                    )}

                                    {submenuIndex === index && (
                                        <ul className="submenu w-full pl-3">
                                            {category?.children?.length !== 0 &&
                                                category?.children?.map((subCategory, index_) => {
                                                    return (
                                                        <li key={index_} className="list-none relative">
                                                            <Link
                                                                to={`/product?subCategoryId=${subCategory?._id}`}
                                                                onClick={toggleDrawer(false)}
                                                                className="w-full"
                                                            >
                                                                <Button className="w-full !text-[13px] !lg:text-[14px] !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                                                                    {subCategory?.name}
                                                                </Button>
                                                            </Link>
                                                            {innerSubmenuIndex === index_ ? (
                                                                <FiMinusSquare
                                                                    onClick={() => openInnerSubmenu(index_)}
                                                                    className="absolute top-[10px] right-[15px] cursor-pointer"
                                                                />
                                                            ) : (
                                                                <FaRegSquarePlus
                                                                    onClick={() => openInnerSubmenu(index_)}
                                                                    className="absolute top-[10px] right-[15px] cursor-pointer"
                                                                />
                                                            )}

                                                            {innerSubmenuIndex === index_ && (
                                                                <ul className="inner_submenu w-full pl-3">
                                                                    {subCategory?.children?.length !== 0 &&
                                                                        subCategory?.children?.map(
                                                                            (thirdSubCategory, index_) => {
                                                                                return (
                                                                                    <li
                                                                                        key={index_}
                                                                                        onClick={toggleDrawer(false)}
                                                                                        className="list-none relative mb-1"
                                                                                    >
                                                                                        <Link
                                                                                            to={`/product?thirdSubCategoryId=${thirdSubCategory?._id}`}
                                                                                            className="link w-full !text-[12px] !lg:text-[13px] !text-left !justify-start !px-3 transition"
                                                                                        >
                                                                                            {thirdSubCategory?.name}
                                                                                        </Link>
                                                                                    </li>
                                                                                );
                                                                            }
                                                                        )}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                </ul>
            </div>
        </>
    );
};

export default CategoryCollapse;
