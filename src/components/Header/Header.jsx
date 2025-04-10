import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import { Button } from '@mui/material';
import { Badge } from '@mui/material';
import { Tooltip } from '@mui/material';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoGitCompareOutline } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa6';
import Navigation from '../Navigation/Navigation';
import { MyContext } from '../../App';

const Header = () => {
    const context = useContext(MyContext);
    return (
        <header className="bg-white">
            <div className="top-strip py-2 border-t-[1px] border-gray-250 border-b-[1px] ">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="col1 w-[50%]">
                            <p className="text-[12px] font-[500]">Sale to 50% off new season styles, limited time</p>
                        </div>
                        <div className="col2 flex items-center justify-end">
                            <ul className="flex items-center gap-3">
                                <li className="list-none">
                                    <Link to="/help-center" className="text-[12px] link font-[500]">
                                        Help Center
                                    </Link>
                                </li>
                                <li className="list-none">
                                    <Link to="/order-tracking" className="text-[12px] link font-[500]">
                                        Order Tracking
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header py-4 border-b-[1px] border-gray-250">
                <div className="container flex items-center justify-between">
                    <div className="col1 w-[30%]">
                        <Link to={'/'}>
                            <img src="src/assets/logo.jpg" alt="" />
                        </Link>
                    </div>
                    <div className="col2 w-[40%]">
                        <Search />
                    </div>
                    <div className="col3 w-[30%] flex items-center pl-7">
                        <ul className="flex items-center justify-end gap-3 w-full">
                            <li className="list-none">
                                <Link to="/login" className="link transition text-[15px] font-[500]">
                                    Đăng nhập
                                </Link>
                            </li>
                            <li className="mx-2">
                                <Tooltip title="So sánh" placement="top">
                                    <Badge className="icon-header" badgeContent={4} color="primary">
                                        <IoGitCompareOutline className="text-2xl" />
                                    </Badge>
                                </Tooltip>
                            </li>
                            <li className="mx-2">
                                <Tooltip title="Yêu thích" placement="top">
                                    <Badge className="icon-header" badgeContent={4} color="primary">
                                        <FaRegHeart className="text-2xl" />
                                    </Badge>
                                </Tooltip>
                            </li>
                            <li className="mx-2">
                                <Tooltip title="Giỏ hàng" placement="top">
                                    <Badge
                                        onClick={() => context.setOpenCartPanel(true)}
                                        className="icon-header"
                                        badgeContent={4}
                                        color="primary"
                                    >
                                        <MdOutlineShoppingCart className="text-2xl" />
                                    </Badge>
                                </Tooltip>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Navigation />
        </header>
    );
};

export default Header;
