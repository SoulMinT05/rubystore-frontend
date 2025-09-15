import React from 'react';

import { IoMdTime } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';

import { formatDate } from '@/utils/formatters';

const HomeBlogsItem = ({ blog }) => {
    const sanitizedDescription = DOMPurify.sanitize(blog.description, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'span'],
    });

    const navigate = useNavigate();

    return (
        <div className="blogItem group">
            <div
                onClick={() => navigate(`/blog/${blog?.slug}`)}
                className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative"
            >
                <img
                    src={blog?.images[0]}
                    alt="Blog Image"
                    className="w-full h-[220px] object-cover transition-all group-hover:scale-105 group-hover:rotate-1"
                />
                <div
                    className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-primary rounded-md p-1 text-[11px] font-[500]
                    gap-1"
                >
                    <IoMdTime className="text-[13px] lg:text-[16px]" />
                    <span>{formatDate(blog?.createdAt)}</span>
                </div>
            </div>
            <div className="info py-4">
                <h2 className="text-[12px] lg:text-[14px] font-[600] text-black mb-1 lg:mb-3 line-clamp-1">
                    <Link to={`/blog/${blog?.slug}`} className="link">
                        {blog?.name}
                    </Link>
                </h2>
                <div
                    className="line-clamp-2 mb-4 text-[12px] lg:text-[13px]"
                    dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />
                <Link
                    to={`/blog/${blog?.slug}`}
                    className="link font-[500] text-[12px] lg:text-[13px] flex items-center gap-1"
                >
                    Xem thêm <IoIosArrowForward />
                </Link>
            </div>
        </div>
    );
};

export default HomeBlogsItem;
