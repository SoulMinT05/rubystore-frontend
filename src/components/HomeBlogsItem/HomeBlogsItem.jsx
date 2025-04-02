import React from 'react';

import { IoMdTime } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const HomeBlogsItem = () => {
    return (
        <div className="blogItem group">
            <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
                <img
                    src="src/assets/blog1.jpg"
                    alt="Blog Image"
                    className="w-full transition-all group-hover:scale-105 group-hover:rotate-1"
                />
                <span
                    className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-primary rounded-md p-1 text-[11px] font-[500]
                    gap-1"
                >
                    <IoMdTime className="text-[16px]" /> 05/04/2025
                </span>
            </div>
            <div className="info py-4">
                <h2 className="text-[15px] font-[600] text-black mb-1">
                    <Link to="/" className="link">
                        Tin tức hôm nay có gì, cùng đọc nhé!
                    </Link>
                </h2>
                <p className="text-[13px] font-[400] text-[rgba(0,0,0,0.8)] mb-4">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                    professor at Hampden-Sydney College in Virginia
                </p>
                <Link to="/" className="link font-[500] text-[14px] flex items-center gap-1">
                    Xem thêm <IoIosArrowForward />
                </Link>
            </div>
        </div>
    );
};

export default HomeBlogsItem;
