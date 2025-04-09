import { Button } from '@mui/material';
import React, { useState } from 'react';
import { RiMenu2Fill } from 'react-icons/ri';
import { LiaAngleDownSolid } from 'react-icons/lia';
import { GoRocket } from 'react-icons/go';
import { Link } from 'react-router-dom';
import CategoryPanel from '../CategoryPanel/CategoryPanel';

import '../Navigation/Navigation.css';

const Navigation = () => {
    const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
    const openCategoryPanel = () => {
        setIsOpenCatPanel(true);
    };
    return (
        <>
            <nav className="py-2">
                <div className="container flex items-center justify-end gap-8">
                    <div className="col_1 w-[18%]">
                        <Button className="!text-black gap-2 w-full" onClick={openCategoryPanel}>
                            <RiMenu2Fill className="text-[18px]" />
                            Danh mục
                            <LiaAngleDownSolid className="text-[13px] ml-auto font-bold cursor-pointer" />
                        </Button>
                    </div>
                    <div className="col_2 w-[62%]">
                        <ul className="flex items-center gap-5 nav">
                            <li className="list-none">
                                <Link to="/" className="link transition text-[14px] font-[500]">
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="list-none relative">
                                <Link to="/product-list" className="link transition text-[14px] font-[500]">
                                    Thời trang
                                </Link>
                                <div className="submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
                                    <ul>
                                        <li className="list-none w-full relative">
                                            <Link to="/" className="w-full">
                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                    Nam
                                                </Button>

                                                <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                                                    <ul>
                                                        <li className="list-none w-full">
                                                            <Link to="/" className="w-full">
                                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                                    Nam
                                                                </Button>
                                                            </Link>
                                                        </li>

                                                        <li className="list-none w-full">
                                                            <Link to="/" className="w-full">
                                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                                    Nữ
                                                                </Button>
                                                            </Link>
                                                        </li>
                                                        <li className="list-none w-full">
                                                            <Link to="/" className="w-full">
                                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                                    Trẻ em
                                                                </Button>
                                                            </Link>
                                                        </li>

                                                        <li className="list-none w-full">
                                                            <Link to="/" className="w-full">
                                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                                    Girls
                                                                </Button>
                                                            </Link>
                                                        </li>

                                                        <li className="list-none w-full">
                                                            <Link to="/" className="w-full">
                                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                                    Boys
                                                                </Button>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                                                    <ul>
                                                        <li className="list-none w-full">
                                                            <Link to="/" className="w-full">
                                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                                    Nam
                                                                </Button>
                                                            </Link>
                                                        </li>

                                                        <li className="list-none w-full">
                                                            <Link to="/" className="w-full">
                                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                                    Nữ
                                                                </Button>
                                                            </Link>
                                                        </li>
                                                        <li className="list-none w-full">
                                                            <Link to="/" className="w-full">
                                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                                    Trẻ em
                                                                </Button>
                                                            </Link>
                                                        </li>

                                                        <li className="list-none w-full">
                                                            <Link to="/" className="w-full">
                                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                                    Girls
                                                                </Button>
                                                            </Link>
                                                        </li>

                                                        <li className="list-none w-full">
                                                            <Link to="/" className="w-full">
                                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                                    Boys
                                                                </Button>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Link>
                                        </li>

                                        <li className="list-none w-full">
                                            <Link to="/" className="w-full">
                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                    Nữ
                                                </Button>
                                            </Link>
                                        </li>
                                        <li className="list-none w-full">
                                            <Link to="/" className="w-full">
                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                    Trẻ em
                                                </Button>
                                            </Link>
                                        </li>

                                        <li className="list-none w-full">
                                            <Link to="/" className="w-full">
                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                    Girls
                                                </Button>
                                            </Link>
                                        </li>

                                        <li className="list-none w-full">
                                            <Link to="/" className="w-full">
                                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                                    Boys
                                                </Button>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="list-none">
                                <Link to="/product-list" className="link transition text-[14px] font-[500]">
                                    Đồ điện tử
                                </Link>
                            </li>
                            <li className="list-none">
                                <Link to="/product-list" className="link transition text-[14px] font-[500]">
                                    Túi
                                </Link>
                            </li>
                            <li className="list-none">
                                <Link to="/product-list" className="link transition text-[14px] font-[500]">
                                    Giày dép
                                </Link>
                            </li>
                            <li className="list-none">
                                <Link to="/product-list" className="link transition text-[14px] font-[500]">
                                    Thực phẩm
                                </Link>
                            </li>
                            <li className="list-none">
                                <Link to="/product-list" className="link transition text-[14px] font-[500]">
                                    Sắc đẹp
                                </Link>
                            </li>
                            <li className="list-none">
                                <Link to="/product-list" className="link transition text-[14px] font-[500]">
                                    Sức khoẻ
                                </Link>
                            </li>
                            <li className="list-none">
                                <Link to="/product-list" className="link transition text-[14px] font-[500]">
                                    Trang sức
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col_3 w-[20%]">
                        <p className="text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0">
                            <GoRocket className="text-[18px]" />
                            Giao hàng quốc tế miễn phí
                        </p>
                    </div>
                </div>
            </nav>

            <CategoryPanel isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel} />
        </>
    );
};

export default Navigation;
