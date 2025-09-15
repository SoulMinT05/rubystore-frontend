import React from 'react';
import { Link } from 'react-router-dom';

import './HomeBannerImageSecond.scss';
import { formatCurrency } from '@/utils/formatters';

const HomeBannerImageSecond = ({ banner }) => {
    return (
        <div className="homeBannerImageSecond w-full overflow-hidden rounded-md group relative">
            <img src={banner?.images[0]} alt="" className="w-full transition-all duration-150 group-hover:scale-105" />

            <div
                className={`info p-5 absolute top-0 w-[70%] h-[100%] z-50 flex items-center
                justify-center flex-col gap-2 ${banner?.align === 'left' ? 'left-0' : 'right-0'}  ${
                    banner?.align === 'left' ? '' : 'pl-14'
                } `}
            >
                <h2 className="text-[18px] text-primary font-[600] line-clamp-1">{banner?.name}</h2>
                <span className="text-[20px] text-primary font-[600] w-full">{formatCurrency(banner?.price)}</span>
                <div className="w-full">
                    <Link to="/" className="text-[16px] font-[600] link">
                        Mua sắm ngay
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomeBannerImageSecond;
