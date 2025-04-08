import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';

import { Link } from 'react-router-dom';

import { IoGridSharp } from 'react-icons/io5';
import { LuMenu } from 'react-icons/lu';

import ProductListSidebar from '../../components/ProductListSidebar/ProductListSidebar';
import HomeProductItem from '../../components/HomeProductsItem/HomeProductsItem';
import ProductListItemView from '../../components/ProductListItemView/ProductListItemView';

import '../ProductListPage/ProductListPage.css';

const ProductListPage = () => {
    const [itemView, setItemView] = useState('grid');

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <section className="py-5 pb-0">
            <div className="container">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/" className="link transition">
                        Trang chủ
                    </Link>
                    <Link underline="hover" color="inherit" to="/" className="link transition">
                        Thời trang
                    </Link>
                </Breadcrumbs>
            </div>

            <div className="bg-white p-2 mt-4">
                <div className="container flex gap-4">
                    <div className="sidebarWrapper w-[20%] h-full bg-white">
                        <ProductListSidebar />
                    </div>
                    <div className="rightContent w-[80%] py-3">
                        <div className="bg-[#f1f1f1] p-2 w-full mb-4 rounded-md flex items-center justify-between">
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
                                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                                    Có 26 sản phẩm
                                </span>
                            </div>

                            <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
                                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">Sắp xếp theo</span>

                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className="!bg-white !text-[12px] !text-[#000] !capitalize !border-2 !border-[#000]"
                                >
                                    Giảm giá: Cao đến thấp nhất
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
                                    <MenuItem onClick={handleClose} className="!text-[13px] !text-[#000] !capitalize">
                                        Giảm giá: Cao đến thấp nhất
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} className="!text-[13px] !text-[#000] !capitalize">
                                        Phổ biến
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} className="!text-[13px] !text-[#000] !capitalize">
                                        Thứ tự A đến Z
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} className="!text-[13px] !text-[#000] !capitalize">
                                        Thứ tự Z về A
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} className="!text-[13px] !text-[#000] !capitalize">
                                        Giá: thấp đến cao
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} className="!text-[13px] !text-[#000] !capitalize">
                                        Giá: cao đến thấp
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <div
                            className={`grid ${
                                itemView === 'grid' ? 'grid-cols-4 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-1'
                            } gap-4`}
                        >
                            {itemView === 'grid' ? (
                                <>
                                    <HomeProductItem />
                                    <HomeProductItem />
                                    <HomeProductItem />
                                    <HomeProductItem />
                                    <HomeProductItem />
                                    <HomeProductItem />
                                    <HomeProductItem />
                                </>
                            ) : (
                                <>
                                    <ProductListItemView />
                                    <ProductListItemView />
                                    <ProductListItemView />
                                    <ProductListItemView />
                                    <ProductListItemView />
                                    <ProductListItemView />
                                    <ProductListItemView />
                                </>
                            )}
                        </div>

                        <div className="flex items-center justify-center mt-10">
                            <Pagination count={10} showFirstButton showLastButton />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductListPage;
