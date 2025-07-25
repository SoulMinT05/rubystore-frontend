import React, { useContext, useEffect } from 'react';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { PiKeyReturnLight } from 'react-icons/pi';
import { BsWallet2 } from 'react-icons/bs';
import { LiaGiftSolid } from 'react-icons/lia';
import { BiSupport } from 'react-icons/bi';
import { IoChatboxOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineYoutube } from 'react-icons/ai';
import { FaPinterestP } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Drawer from '@mui/material/Drawer';

import CartPanel from '../CartPanel/CartPanel';

import './Footer.scss';
import { MyContext } from '../../App';
import bank1 from '../../assets/bank1.png';
import bank2 from '../../assets/bank2.png';
import bank3 from '../../assets/bank3.png';
import bank4 from '../../assets/bank4.png';
import bank5 from '../../assets/bank5.png';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../apis/axiosClient';
import { getCart } from '../../redux/cartSlice';

const Footer = () => {
    const context = useContext(MyContext);
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!context.isLogin) return;

        const fetchCart = async () => {
            const { data } = await axiosClient.get('/api/user/cart');
            dispatch(
                getCart({
                    products: data?.cart?.items || [],
                })
            );
        };
        fetchCart();
    }, [context?.isLogin, dispatch]);
    return (
        <>
            <footer className="pt-6 pb-0 lg:pb-6 bg-[#fafafa]">
                <div className="container">
                    <div className="flex items-center justify-center gap-2 pt-3 pb-0 lg:py-8 lg:pb-8 lg:px-0 px-5 scrollableBox footerBoxWrap">
                        <div className="col flex items-center justify-center flex-col group !w-[180px] lg:w-[18%] xl:w-[15%]">
                            <LiaShippingFastSolid className="text-[30px] lg:text-[40px] transition-all duration-300  group-hover:text-primary group-hover:-translate-y-1" />
                            <h3 className="text-[16px] font-[600] mt-3">Miễn phí giao hàng</h3>
                            <p className="text-[12px] font-[500]">Cho đơn hàng giá trên 700k</p>
                        </div>
                        <div className="col flex items-center justify-center flex-col group !w-[180px] lg:w-[18%] xl:w-[15%]">
                            <PiKeyReturnLight className="text-[30px] lg:text-[40px] transition-all duration-300  group-hover:text-primary group-hover:-translate-y-1" />
                            <h3 className="text-[16px] font-[600] mt-3">30 ngày đổi trả</h3>
                            <p className="text-[12px] font-[500]">Đổi trả sản phẩm</p>
                        </div>
                        <div className="col flex items-center justify-center flex-col group !w-[180px] lg:w-[18%] xl:w-[15%]">
                            <BsWallet2 className="text-[30px] lg:text-[40px] transition-all duration-300  group-hover:text-primary group-hover:-translate-y-1" />
                            <h3 className="text-[16px] font-[600] mt-3">Thanh toán an toàn</h3>
                            <p className="text-[12px] font-[500]">Chấp nhận thanh toán online</p>
                        </div>
                        <div className="col flex items-center justify-center flex-col group !w-[180px] lg:w-[18%] xl:w-[15%]">
                            <LiaGiftSolid className="text-[30px] lg:text-[40px] transition-all duration-300  group-hover:text-primary group-hover:-translate-y-1" />
                            <h3 className="text-[16px] font-[600] mt-3">Quà khuyến mãi</h3>
                            <p className="text-[12px] font-[500]">Cho đơn hàng đầu tiên</p>
                        </div>
                        <div className="col flex items-center justify-center flex-col group !w-[180px] lg:w-[18%] xl:w-[15%]">
                            <BiSupport className="text-[30px] lg:text-[40px] transition-all duration-300  group-hover:text-primary group-hover:-translate-y-1" />
                            <h3 className="text-[16px] font-[600] mt-3">Hỗ trợ 24/7</h3>
                            <p className="text-[12px] font-[500]">Liên hệ mọi lúc</p>
                        </div>
                    </div>

                    <br />
                    <hr />

                    <div className="footer flex px-3 lg:px-0 flex-col lg:flex-row py-8 ">
                        <div
                            className={`part1 w-full lg:w-[25%] ${
                                context?.windowWidth > 992 ? 'border-r' : ''
                            } border-[rgba(0,0,0,0.2)]`}
                        >
                            <h2 className="text-[18px] font-[600] mb-4">Liên hệ chúng tôi</h2>
                            <p className="text-[13px] font-[400] pb-4">
                                RubyStore - Cửa hàng lớn <br /> Sản phẩm quốc tế ngay trên đất Việt
                            </p>
                            <Link className="link text-[13px]" to="mailto:rubystore@gmail.com">
                                rubystore@gmail.com
                            </Link>
                            <span className="text-[22px] font-[600] block w-full mt-3 mb-5 text-primary">
                                (+84) 912-874-2025
                            </span>
                            <div className="flex items-center gap-2">
                                <IoChatboxOutline className="text-[40px] text-primary" />

                                <span className="text-[16px] font-[600]">
                                    Nhắn tin online <br /> Nhận sư hỗ trợ
                                </span>
                            </div>
                        </div>
                        <div className="part2 w-full lg:w-[40%] flex pl-0 lg:pl-8 mt-5 lg:mt-0">
                            <div className="part2_col1 w-[50%]">
                                <h2 className="text-[16px] lg:text-[18px] font-[600] mb-4">Về sản phẩm</h2>

                                <ul className="list">
                                    <li className="list-none text-[13px] lg:text-[14px] w-full mb-2">
                                        <Link to="/" className="link">
                                            Giá sốc
                                        </Link>
                                    </li>
                                    <li className="list-none text-[13px] lg:text-[14px] w-full mb-2">
                                        <Link to="/" className="link">
                                            Sản phẩm mới
                                        </Link>
                                    </li>
                                    <li className="list-none text-[13px] lg:text-[14px] w-full mb-2">
                                        <Link to="/" className="link">
                                            Nhiều ưu đãi
                                        </Link>
                                    </li>
                                    <li className="list-none text-[13px] lg:text-[14px] w-full mb-2">
                                        <Link to="/" className="link">
                                            Liên hệ chúng tôi
                                        </Link>
                                    </li>
                                    <li className="list-none text-[13px] lg:text-[14px] w-full mb-2">
                                        <Link to="/" className="link">
                                            Địa chỉ
                                        </Link>
                                    </li>
                                    <li className="list-none text-[13px] lg:text-[14px] w-full mb-2">
                                        <Link to="/" className="link">
                                            Các chi nhánh
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="part2_col2 w-[50%]">
                                <h2 className="text-[16px] lg:text-[18px] font-[600] mb-4">Công ty chúng tôi</h2>

                                <ul className="list">
                                    <li className="list-none text-[13px] lg:text-[14px] w-full mb-2">
                                        <Link to="/" className="link">
                                            Vận chuyển
                                        </Link>
                                    </li>
                                    <li className="list-none text-[13px] lg:text-[14px] w-full mb-2">
                                        <Link to="/" className="link">
                                            Thông báo pháp lý
                                        </Link>
                                    </li>
                                    <li className="list-none text-[13px] lg:text-[14px] w-full mb-2">
                                        <Link to="/" className="link">
                                            Điều khoản và điều kiện sử dụng
                                        </Link>
                                    </li>
                                    <li className="list-none text-[13px] lg:text-[14px] w-full mb-2">
                                        <Link to="/" className="link">
                                            Về chúng tôi
                                        </Link>
                                    </li>
                                    <li className="list-none text-[13px] lg:text-[14px] w-full mb-2">
                                        <Link to="/" className="link">
                                            Thanh toán an toàn
                                        </Link>
                                    </li>
                                    <li className="list-none text-[13px] lg:text-[14px] w-full mb-2">
                                        <Link to="/" className="link">
                                            Đăng nhập
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="part2 w-full lg:w-[35%] flex pl-0 lg:pl-8 flex-col pr-8 mt-5 lg:mt-0">
                            <h2 className="text-[16px] lg:text-[18px] font-[600] mb-1 lg:mb-4">Đăng ký nhận tin tức</h2>
                            <p className="text-[13px]">
                                Đăng ký nhận thông tin mới nhất về các chương trình giảm giá đặc biệt
                            </p>
                            <form className="mt-1 lg:mt-2">
                                <input
                                    type="text"
                                    className="w-full h-[45px] border outline-none pl-4 pr-4 rounded-sm mb-4 focus:border-[rgba(0,0,0,0.3)]"
                                    placeholder="Nhập địa chỉ email"
                                />
                                <Button className="btn-org !mb-4">Đăng ký</Button>

                                <FormControlLabel
                                    className="-mt-[6px] lg:mt-0 block w-full"
                                    control={<Checkbox />}
                                    label="Tôi đồng ý với các điều khoản và điều kiện và chính sách bảo mật"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="bottomStrip border-t border-[rgba(0,0,0,0.1)] pt-3 pb-[100px] lg:pb-3 bg-white">
                <div className="container flex items-center justify-between flex-col lg:flex-row gap-4 lg:gap-0">
                    <ul className="flex items-center gap-2">
                        <li className="list-none">
                            <Link
                                to="/"
                                target="_blank"
                                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] 
                                flex items-center justify-center group hover:bg-primary transition-all"
                            >
                                <FaFacebookF className="text-[15px] group-hover:text-white" />
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link
                                to="/"
                                target="_blank"
                                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] 
                                flex items-center justify-center group hover:bg-primary transition-all"
                            >
                                <AiOutlineYoutube className="text-[20px]  group-hover:text-white" />
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link
                                to="/"
                                target="_blank"
                                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] 
                                flex items-center justify-center group hover:bg-primary transition-all"
                            >
                                <FaPinterestP className="text-[15px]  group-hover:text-white" />
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link
                                to="/"
                                target="_blank"
                                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] 
                                flex items-center justify-center group hover:bg-primary transition-all"
                            >
                                <FaInstagram className="text-[18px]  group-hover:text-white" />
                            </Link>
                        </li>
                    </ul>
                    <p className="text-[13px] text-center my-0">
                        © 2025 - RubyStore - Uy tín và sự tin tưởng của khách hàng đặt lên hàng đầu
                    </p>

                    <div className="flex items-center">
                        <img src={bank1} alt="Image Payment 1" />
                        <img src={bank2} alt="Image Payment 2" />
                        <img src={bank3} alt="Image Payment 3" />
                        <img src={bank4} alt="Image Payment 4" />
                        <img src={bank5} alt="Image Payment 5" />
                    </div>
                </div>
            </div>

            {/* Cart Panel */}
            <Drawer
                className="cartPanel"
                open={context.openCartPanel}
                onClose={() => context.toggleCartPanel(false)}
                anchor={'right'}
            >
                <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)] overflow-hidden">
                    <h4>Giỏ hàng ({cart?.products?.length}) </h4>
                    <IoCloseSharp
                        className="text-[20px] cursor-pointer"
                        onClick={() => context.toggleCartPanel(false)}
                    />
                </div>

                <CartPanel cart={cart} />
            </Drawer>
        </>
    );
};

export default Footer;
