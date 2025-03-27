import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import { IoCloseSharp } from 'react-icons/io5';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { FiMinusSquare } from 'react-icons/fi';

import '../CategoryPanel/CategoryPanel.css';

const CategoryPanel = ({ isOpenCatPanel, setIsOpenCatPanel }) => {
    const [submenuIndex, setSubmenuIndex] = useState(null);
    const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

    const toggleDrawer = (newOpen) => () => {
        setIsOpenCatPanel(newOpen);
    };
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

    const DrawerList = (
        <Box className="categoryPanel" sx={{ width: 250 }} role="presentation">
            <h3 className="p-3 text-[16px] font-[500] flex items-center justify-between">
                Danh mục sản phẩm
                <IoCloseSharp onClick={toggleDrawer(false)} className="cursor-pointer text-[20px]" />
            </h3>
            <div className="scroll">
                <ul className="w-full">
                    <li className="list-none flex items-center relative flex-col">
                        <Link to="/" className="w-full">
                            <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                                Thời trang
                            </Button>
                        </Link>
                        {submenuIndex === 0 ? (
                            <FiMinusSquare
                                onClick={() => openSubmenu(0)}
                                className="absolute top-[10px] right-[15px] cursor-pointer"
                            />
                        ) : (
                            <FaRegSquarePlus
                                onClick={() => openSubmenu(0)}
                                className="absolute top-[10px] right-[15px] cursor-pointer"
                            />
                        )}

                        {submenuIndex === 0 && (
                            <ul className="submenu w-full pl-3">
                                <li className="list-none relative">
                                    <Link to="/" className="w-full">
                                        <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                                            Áo
                                        </Button>
                                    </Link>
                                    {innerSubmenuIndex === 0 ? (
                                        <FiMinusSquare
                                            onClick={() => openInnerSubmenu(0)}
                                            className="absolute top-[10px] right-[15px] cursor-pointer"
                                        />
                                    ) : (
                                        <FaRegSquarePlus
                                            onClick={() => openInnerSubmenu(0)}
                                            className="absolute top-[10px] right-[15px] cursor-pointer"
                                        />
                                    )}

                                    {innerSubmenuIndex === 0 && (
                                        <ul className="inner_submenu w-full pl-3">
                                            <li className="list-none relative mb-1">
                                                <Link
                                                    to="/"
                                                    className="link w-full !text-left !justify-start !px-3 transition text-[14px]"
                                                >
                                                    Áo thun
                                                </Link>
                                            </li>
                                            <li className="list-none relative mb-1">
                                                <Link
                                                    to="/"
                                                    className="link w-full !text-left !justify-start !px-3 transition text-[14px]"
                                                >
                                                    Áo khoác
                                                </Link>
                                            </li>
                                            <li className="list-none relative mb-1">
                                                <Link
                                                    to="/"
                                                    className="link w-full !text-left !justify-start !px-3 transition text-[14px]"
                                                >
                                                    Áo sơ mi
                                                </Link>
                                            </li>
                                            <li className="list-none relative mb-1">
                                                <Link
                                                    to="/"
                                                    className="link w-full !text-left !justify-start !px-3 transition text-[14px]"
                                                >
                                                    Áo Vest
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        )}
                    </li>

                    <li className="list-none flex items-center relative flex-col">
                        <Link to="/" className="w-full">
                            <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                                Giày dép
                            </Button>
                        </Link>
                        {submenuIndex === 1 ? (
                            <FiMinusSquare
                                onClick={() => openSubmenu(1)}
                                className="absolute top-[10px] right-[15px] cursor-pointer"
                            />
                        ) : (
                            <FaRegSquarePlus
                                onClick={() => openSubmenu(1)}
                                className="absolute top-[10px] right-[15px] cursor-pointer"
                            />
                        )}

                        {submenuIndex === 1 && (
                            <ul className="submenu  w-full pl-3">
                                <li className="list-none relative">
                                    <Link to="/" className="w-full">
                                        <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                                            Áo
                                        </Button>
                                    </Link>
                                    {innerSubmenuIndex === 1 ? (
                                        <FiMinusSquare
                                            onClick={() => openInnerSubmenu(1)}
                                            className="absolute top-[10px] right-[15px] cursor-pointer"
                                        />
                                    ) : (
                                        <FaRegSquarePlus
                                            onClick={() => openInnerSubmenu(1)}
                                            className="absolute top-[10px] right-[15px] cursor-pointer"
                                        />
                                    )}

                                    {innerSubmenuIndex === 1 && (
                                        <ul className="inner_submenu  w-full pl-3">
                                            <li className="list-none relative mb-1">
                                                <Link
                                                    to="/"
                                                    className="link w-full !text-left !justify-start !px-3 transition text-[14px]"
                                                >
                                                    Áo thun
                                                </Link>
                                            </li>
                                            <li className="list-none relative mb-1">
                                                <Link
                                                    to="/"
                                                    className="link w-full !text-left !justify-start !px-3 transition text-[14px]"
                                                >
                                                    Áo khoác
                                                </Link>
                                            </li>
                                            <li className="list-none relative mb-1">
                                                <Link
                                                    to="/"
                                                    className="link w-full !text-left !justify-start !px-3 transition text-[14px]"
                                                >
                                                    Áo sơ mi
                                                </Link>
                                            </li>
                                            <li className="list-none relative mb-1">
                                                <Link
                                                    to="/"
                                                    className="link w-full !text-left !justify-start !px-3 transition text-[14px]"
                                                >
                                                    Áo Vest
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </Box>
    );

    return (
        <>
            <Drawer open={isOpenCatPanel} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
};

export default CategoryPanel;
